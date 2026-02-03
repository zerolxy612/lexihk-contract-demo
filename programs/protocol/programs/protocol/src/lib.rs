use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};
use pyth_sdk_solana::load_price_feed_from_account_info;

declare_id!("FBLSTTxCeuLDYZKFzaVBkN72dUcZqxeY5YaXpcj9ZZEm");

#[program]
pub mod protocol {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        total_supply: u64,
        reserve_bps: u16,
    ) -> Result<()> {
        require!(
            reserve_bps >= MIN_RESERVE_BPS && reserve_bps <= MAX_RESERVE_BPS,
            ProtocolError::InvalidReserveBps
        );

        let config = &mut ctx.accounts.config;
        config.authority = ctx.accounts.payer.key();
        config.total_supply = total_supply;
        config.reserve_bps = reserve_bps;
        config.mint = ctx.accounts.mint.key();
        config.unlock_pool_vault = ctx.accounts.unlock_pool_vault.key();
        config.treasury_vault = ctx.accounts.treasury_vault.key();
        config.marketing_vault = ctx.accounts.marketing_vault.key();
        config.content_vault = ctx.accounts.content_vault.key();
        config.community_vault = ctx.accounts.community_vault.key();
        config.oracle_authority = ctx.accounts.payer.key();
        config.min_price_update_interval = 0;
        config.max_price_age = 0;
        config.max_price_change_bps = 0;
        config.pyth_price_account = Pubkey::default();
        config.max_pyth_price_age = 0;
        config.max_pyth_deviation_bps = 0;
        config.price = 0;
        config.price_updated_at = 0;

        ctx.accounts.marketing_vault_authority.bump = ctx.bumps.marketing_vault_authority;
        ctx.accounts.content_vault_authority.bump = ctx.bumps.content_vault_authority;
        ctx.accounts.community_vault_authority.bump = ctx.bumps.community_vault_authority;

        let unlock_pool = &mut ctx.accounts.unlock_pool;
        unlock_pool.unlocked_cumulative = 0;
        unlock_pool.last_unlock_at = 0;

        let treasury = &mut ctx.accounts.treasury;
        treasury.virtual_balance = 0;

        msg!("Protocol initialized");
        Ok(())
    }

    pub fn update_price(ctx: Context<UpdatePrice>, price: u64) -> Result<()> {
        require!(price > 0, ProtocolError::InvalidPrice);

        let config = &mut ctx.accounts.config;
        apply_price_update(config, price)?;

        Ok(())
    }

    pub fn update_price_with_pyth(
        ctx: Context<UpdatePriceWithPyth>,
        twap_price_e6: u64,
    ) -> Result<()> {
        require!(twap_price_e6 > 0, ProtocolError::InvalidPrice);

        let config = &mut ctx.accounts.config;
        require!(
            ctx.accounts.pyth_price_account.key() == config.pyth_price_account,
            ProtocolError::PythPriceAccountMismatch
        );
        require!(config.max_pyth_price_age >= 0, ProtocolError::InvalidPythConfig);

        let now = Clock::get()?.unix_timestamp;
        let max_pyth_price_age = config.max_pyth_price_age as u64;
        let price_feed =
            load_price_feed_from_account_info(&ctx.accounts.pyth_price_account.to_account_info())
                .map_err(|_| ProtocolError::PythPriceUnavailable)?;
        let pyth_price = price_feed
            .get_price_no_older_than(now, max_pyth_price_age)
            .ok_or(ProtocolError::PythPriceTooStale)?;
        let pyth_price_e6 = pyth_price_to_e6(pyth_price.price, pyth_price.expo)?;

        if config.max_pyth_deviation_bps > 0 {
            let diff = if twap_price_e6 >= pyth_price_e6 {
                twap_price_e6 - pyth_price_e6
            } else {
                pyth_price_e6 - twap_price_e6
            };
            let diff_bps = (diff as u128)
                .saturating_mul(10_000)
                .checked_div(pyth_price_e6 as u128)
                .unwrap_or(u128::MAX);
            require!(
                diff_bps <= config.max_pyth_deviation_bps as u128,
                ProtocolError::PythDeviationTooLarge
            );
        }

        apply_price_update(config, twap_price_e6)?;
        Ok(())
    }

    pub fn set_oracle_config(
        ctx: Context<SetOracleConfig>,
        oracle_authority: Pubkey,
        min_price_update_interval: i64,
        max_price_age: i64,
        max_price_change_bps: u16,
    ) -> Result<()> {
        require!(min_price_update_interval >= 0, ProtocolError::InvalidOracleConfig);
        require!(max_price_age >= 0, ProtocolError::InvalidOracleConfig);

        let config = &mut ctx.accounts.config;
        config.oracle_authority = oracle_authority;
        config.min_price_update_interval = min_price_update_interval;
        config.max_price_age = max_price_age;
        config.max_price_change_bps = max_price_change_bps;
        Ok(())
    }

    pub fn set_pyth_config(
        ctx: Context<SetPythConfig>,
        pyth_price_account: Pubkey,
        max_pyth_price_age: i64,
        max_pyth_deviation_bps: u16,
    ) -> Result<()> {
        require!(max_pyth_price_age >= 0, ProtocolError::InvalidPythConfig);

        let config = &mut ctx.accounts.config;
        config.pyth_price_account = pyth_price_account;
        config.max_pyth_price_age = max_pyth_price_age;
        config.max_pyth_deviation_bps = max_pyth_deviation_bps;
        Ok(())
    }

    pub fn deposit_unlock_pool(ctx: Context<DepositUnlockPool>, amount: u64) -> Result<()> {
        require!(amount > 0, ProtocolError::InvalidAmount);

        let cpi_accounts = Transfer {
            from: ctx.accounts.source.to_account_info(),
            to: ctx.accounts.unlock_pool_vault.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        Ok(())
    }

    pub fn unlock_to_treasury(ctx: Context<UnlockToTreasury>) -> Result<()> {
        let now = Clock::get()?.unix_timestamp;

        let config = &ctx.accounts.config;
        require!(config.price > 0, ProtocolError::PriceNotSet);
        if config.max_price_age > 0 {
            require!(
                now - config.price_updated_at <= config.max_price_age,
                ProtocolError::PriceTooStale
            );
        }

        let unlock_pool = &mut ctx.accounts.unlock_pool;
        if unlock_pool.last_unlock_at != 0 {
            require!(
                now - unlock_pool.last_unlock_at >= SECONDS_PER_DAY,
                ProtocolError::UnlockTooFrequent
            );
        }

        let fdv = fdv_usd_e6(config.total_supply, config.price);
        let target_unlock_bps = milestone_unlock_bps(fdv);
        let reserve_amount = bps_of(config.total_supply, config.reserve_bps);
        let reserve_cap = config.total_supply.saturating_sub(reserve_amount);
        let max_unlockable = bps_of(config.total_supply, target_unlock_bps).min(reserve_cap);

        if unlock_pool.unlocked_cumulative >= max_unlockable {
            return Err(ProtocolError::NothingToUnlock.into());
        }

        let unlocked_remaining = max_unlockable - unlock_pool.unlocked_cumulative;
        let rate_bps = daily_rate_bps(fdv);
        let tier_cap = fdv_rate_cap_tokens(fdv, config.price, rate_bps);
        let hard_cap = bps_of(config.total_supply, DAILY_HARD_CAP_BPS);
        let daily_cap = unlocked_remaining.min(tier_cap.min(hard_cap));

        require!(daily_cap > 0, ProtocolError::NothingToUnlock);

        if ctx.accounts.unlock_pool_vault.amount < daily_cap {
            return Err(ProtocolError::InsufficientUnlockPoolBalance.into());
        }

        unlock_pool.unlocked_cumulative = unlock_pool
            .unlocked_cumulative
            .checked_add(daily_cap)
            .ok_or(ProtocolError::MathOverflow)?;
        unlock_pool.last_unlock_at = now;

        let bump = ctx.bumps.unlock_pool;
        let signer_seeds: &[&[u8]] = &[
            b"unlock_pool",
            config.authority.as_ref(),
            &[bump],
        ];
        let cpi_accounts = Transfer {
            from: ctx.accounts.unlock_pool_vault.to_account_info(),
            to: ctx.accounts.treasury_vault.to_account_info(),
            authority: ctx.accounts.unlock_pool.to_account_info(),
        };
        let signer = &[signer_seeds];
        let cpi_ctx =
            CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(), cpi_accounts, signer);
        token::transfer(cpi_ctx, daily_cap)?;

        let treasury = &mut ctx.accounts.treasury;
        treasury.virtual_balance = treasury
            .virtual_balance
            .checked_add(daily_cap)
            .ok_or(ProtocolError::MathOverflow)?;

        Ok(())
    }

    pub fn treasury_distribute(
        ctx: Context<TreasuryDistribute>,
        marketing_amount: u64,
        content_amount: u64,
        community_amount: u64,
    ) -> Result<()> {
        let total = marketing_amount
            .checked_add(content_amount)
            .and_then(|v| v.checked_add(community_amount))
            .ok_or(ProtocolError::MathOverflow)?;
        require!(total > 0, ProtocolError::InvalidAmount);

        let treasury_balance = ctx.accounts.treasury.virtual_balance;
        require!(
            treasury_balance >= total,
            ProtocolError::InsufficientTreasuryBalance
        );

        if ctx.accounts.treasury_vault.amount < total {
            return Err(ProtocolError::InsufficientTreasuryBalance.into());
        }

        let bump = ctx.bumps.treasury;
        let signer_seeds: &[&[u8]] = &[
            b"treasury",
            ctx.accounts.config.authority.as_ref(),
            &[bump],
        ];

        let signer = &[signer_seeds];

        if marketing_amount > 0 {
            let cpi_accounts = Transfer {
                from: ctx.accounts.treasury_vault.to_account_info(),
                to: ctx.accounts.marketing_vault.to_account_info(),
                authority: ctx.accounts.treasury.to_account_info(),
            };
            let cpi_ctx = CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                cpi_accounts,
                signer,
            );
            token::transfer(cpi_ctx, marketing_amount)?;
        }

        if content_amount > 0 {
            let cpi_accounts = Transfer {
                from: ctx.accounts.treasury_vault.to_account_info(),
                to: ctx.accounts.content_vault.to_account_info(),
                authority: ctx.accounts.treasury.to_account_info(),
            };
            let cpi_ctx = CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                cpi_accounts,
                signer,
            );
            token::transfer(cpi_ctx, content_amount)?;
        }

        if community_amount > 0 {
            let cpi_accounts = Transfer {
                from: ctx.accounts.treasury_vault.to_account_info(),
                to: ctx.accounts.community_vault.to_account_info(),
                authority: ctx.accounts.treasury.to_account_info(),
            };
            let cpi_ctx = CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                cpi_accounts,
                signer,
            );
            token::transfer(cpi_ctx, community_amount)?;
        }

        let treasury = &mut ctx.accounts.treasury;
        treasury.virtual_balance = treasury
            .virtual_balance
            .checked_sub(total)
            .ok_or(ProtocolError::MathOverflow)?;

        Ok(())
    }

    pub fn init_lp_locker(ctx: Context<InitLpLocker>, unlock_ts: i64) -> Result<()> {
        require!(unlock_ts > 0, ProtocolError::InvalidUnlockTimestamp);

        let locker = &mut ctx.accounts.lp_locker;
        locker.authority = ctx.accounts.config.authority;
        locker.lp_mint = ctx.accounts.lp_mint.key();
        locker.lp_vault = ctx.accounts.lp_vault.key();
        locker.unlock_ts = unlock_ts;
        locker.locked_amount = 0;
        locker.bump = ctx.bumps.lp_locker;

        Ok(())
    }

    pub fn lock_lp(ctx: Context<LockLp>, amount: u64) -> Result<()> {
        require!(amount > 0, ProtocolError::InvalidAmount);
        require!(
            ctx.accounts.lp_locker.lp_mint == ctx.accounts.lp_mint.key(),
            ProtocolError::InvalidLpMint
        );
        require!(
            ctx.accounts.lp_locker.lp_vault == ctx.accounts.lp_vault.key(),
            ProtocolError::InvalidVault
        );

        let cpi_accounts = Transfer {
            from: ctx.accounts.source.to_account_info(),
            to: ctx.accounts.lp_vault.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        let locker = &mut ctx.accounts.lp_locker;
        locker.locked_amount = locker
            .locked_amount
            .checked_add(amount)
            .ok_or(ProtocolError::MathOverflow)?;

        Ok(())
    }

    pub fn unlock_lp(ctx: Context<UnlockLp>, amount: u64) -> Result<()> {
        require!(amount > 0, ProtocolError::InvalidAmount);
        let now = Clock::get()?.unix_timestamp;

        let locker = &ctx.accounts.lp_locker;
        require!(now >= locker.unlock_ts, ProtocolError::LockNotExpired);
        require!(
            locker.lp_mint == ctx.accounts.lp_mint.key(),
            ProtocolError::InvalidLpMint
        );
        require!(
            locker.lp_vault == ctx.accounts.lp_vault.key(),
            ProtocolError::InvalidVault
        );
        require!(locker.locked_amount >= amount, ProtocolError::InsufficientLpBalance);

        let bump = ctx.bumps.lp_locker;
        let lp_mint_key = ctx.accounts.lp_mint.key();
        let signer_seeds: &[&[u8]] = &[
            b"lp_locker",
            ctx.accounts.config.authority.as_ref(),
            lp_mint_key.as_ref(),
            &[bump],
        ];
        let signer = &[signer_seeds];
        let cpi_accounts = Transfer {
            from: ctx.accounts.lp_vault.to_account_info(),
            to: ctx.accounts.destination.to_account_info(),
            authority: ctx.accounts.lp_locker.to_account_info(),
        };
        let cpi_ctx =
            CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(), cpi_accounts, signer);
        token::transfer(cpi_ctx, amount)?;

        let locker = &mut ctx.accounts.lp_locker;
        locker.locked_amount = locker
            .locked_amount
            .checked_sub(amount)
            .ok_or(ProtocolError::MathOverflow)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init,
        payer = payer,
        space = 8 + Config::SIZE,
        seeds = [b"config", payer.key().as_ref()],
        bump
    )]
    pub config: Account<'info, Config>,
    #[account(
        init,
        payer = payer,
        space = 8 + UnlockPool::SIZE,
        seeds = [b"unlock_pool", payer.key().as_ref()],
        bump
    )]
    pub unlock_pool: Account<'info, UnlockPool>,
    #[account(
        init,
        payer = payer,
        space = 8 + Treasury::SIZE,
        seeds = [b"treasury", payer.key().as_ref()],
        bump
    )]
    pub treasury: Account<'info, Treasury>,
    #[account(
        init,
        payer = payer,
        space = 8 + Vault::SIZE,
        seeds = [b"vault_marketing", payer.key().as_ref()],
        bump
    )]
    pub marketing_vault_authority: Account<'info, Vault>,
    #[account(
        init,
        payer = payer,
        space = 8 + Vault::SIZE,
        seeds = [b"vault_content", payer.key().as_ref()],
        bump
    )]
    pub content_vault_authority: Account<'info, Vault>,
    #[account(
        init,
        payer = payer,
        space = 8 + Vault::SIZE,
        seeds = [b"vault_community", payer.key().as_ref()],
        bump
    )]
    pub community_vault_authority: Account<'info, Vault>,
    pub mint: Box<Account<'info, Mint>>,
    #[account(
        init,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = unlock_pool
    )]
    pub unlock_pool_vault: Box<Account<'info, TokenAccount>>,
    #[account(
        init,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = treasury
    )]
    pub treasury_vault: Box<Account<'info, TokenAccount>>,
    #[account(
        init,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = marketing_vault_authority
    )]
    pub marketing_vault: Box<Account<'info, TokenAccount>>,
    #[account(
        init,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = content_vault_authority
    )]
    pub content_vault: Box<Account<'info, TokenAccount>>,
    #[account(
        init,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = community_vault_authority
    )]
    pub community_vault: Box<Account<'info, TokenAccount>>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct UpdatePrice<'info> {
    #[account(mut, has_one = oracle_authority)]
    pub config: Account<'info, Config>,
    pub oracle_authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct UpdatePriceWithPyth<'info> {
    #[account(mut, has_one = oracle_authority)]
    pub config: Account<'info, Config>,
    pub oracle_authority: Signer<'info>,
    /// CHECK: validated against config.pyth_price_account
    pub pyth_price_account: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct SetOracleConfig<'info> {
    #[account(mut, has_one = authority)]
    pub config: Account<'info, Config>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct SetPythConfig<'info> {
    #[account(mut, has_one = authority)]
    pub config: Account<'info, Config>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct UnlockToTreasury<'info> {
    #[account(has_one = authority)]
    pub config: Account<'info, Config>,
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"unlock_pool", config.authority.as_ref()], bump)]
    pub unlock_pool: Account<'info, UnlockPool>,
    #[account(mut, seeds = [b"treasury", config.authority.as_ref()], bump)]
    pub treasury: Account<'info, Treasury>,
    #[account(
        mut,
        address = config.unlock_pool_vault,
        token::mint = config.mint,
        token::authority = unlock_pool
    )]
    pub unlock_pool_vault: Account<'info, TokenAccount>,
    #[account(
        mut,
        address = config.treasury_vault,
        token::mint = config.mint,
        token::authority = treasury
    )]
    pub treasury_vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct TreasuryDistribute<'info> {
    #[account(has_one = authority)]
    pub config: Account<'info, Config>,
    pub authority: Signer<'info>,
    #[account(mut, seeds = [b"treasury", config.authority.as_ref()], bump)]
    pub treasury: Account<'info, Treasury>,
    #[account(
        mut,
        address = config.treasury_vault,
        token::mint = config.mint,
        token::authority = treasury
    )]
    pub treasury_vault: Account<'info, TokenAccount>,
    #[account(
        mut,
        address = config.marketing_vault,
        token::mint = config.mint
    )]
    pub marketing_vault: Account<'info, TokenAccount>,
    #[account(
        mut,
        address = config.content_vault,
        token::mint = config.mint
    )]
    pub content_vault: Account<'info, TokenAccount>,
    #[account(
        mut,
        address = config.community_vault,
        token::mint = config.mint
    )]
    pub community_vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct DepositUnlockPool<'info> {
    #[account(has_one = authority)]
    pub config: Account<'info, Config>,
    pub authority: Signer<'info>,
    #[account(seeds = [b"unlock_pool", config.authority.as_ref()], bump)]
    pub unlock_pool: Account<'info, UnlockPool>,
    #[account(
        mut,
        token::mint = config.mint,
        token::authority = authority
    )]
    pub source: Account<'info, TokenAccount>,
    #[account(
        mut,
        address = config.unlock_pool_vault,
        token::mint = config.mint,
        token::authority = unlock_pool
    )]
    pub unlock_pool_vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct InitLpLocker<'info> {
    #[account(mut, has_one = authority)]
    pub config: Account<'info, Config>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub lp_mint: Account<'info, Mint>,
    #[account(
        init,
        payer = authority,
        space = 8 + LpLocker::SIZE,
        seeds = [b"lp_locker", config.authority.as_ref(), lp_mint.key().as_ref()],
        bump
    )]
    pub lp_locker: Account<'info, LpLocker>,
    #[account(
        init,
        payer = authority,
        associated_token::mint = lp_mint,
        associated_token::authority = lp_locker
    )]
    pub lp_vault: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct LockLp<'info> {
    #[account(has_one = authority)]
    pub config: Account<'info, Config>,
    pub authority: Signer<'info>,
    pub lp_mint: Account<'info, Mint>,
    #[account(seeds = [b"lp_locker", config.authority.as_ref(), lp_mint.key().as_ref()], bump)]
    pub lp_locker: Account<'info, LpLocker>,
    #[account(
        mut,
        token::mint = lp_mint,
        token::authority = authority
    )]
    pub source: Account<'info, TokenAccount>,
    #[account(
        mut,
        address = lp_locker.lp_vault,
        token::mint = lp_mint,
        token::authority = lp_locker
    )]
    pub lp_vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct UnlockLp<'info> {
    #[account(has_one = authority)]
    pub config: Account<'info, Config>,
    pub authority: Signer<'info>,
    pub lp_mint: Account<'info, Mint>,
    #[account(mut, seeds = [b"lp_locker", config.authority.as_ref(), lp_mint.key().as_ref()], bump)]
    pub lp_locker: Account<'info, LpLocker>,
    #[account(
        mut,
        address = lp_locker.lp_vault,
        token::mint = lp_mint,
        token::authority = lp_locker
    )]
    pub lp_vault: Account<'info, TokenAccount>,
    #[account(
        mut,
        token::mint = lp_mint,
        token::authority = authority
    )]
    pub destination: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Config {
    pub authority: Pubkey,
    pub total_supply: u64,
    pub reserve_bps: u16,
    pub mint: Pubkey,
    pub unlock_pool_vault: Pubkey,
    pub treasury_vault: Pubkey,
    pub marketing_vault: Pubkey,
    pub content_vault: Pubkey,
    pub community_vault: Pubkey,
    pub oracle_authority: Pubkey,
    pub min_price_update_interval: i64,
    pub max_price_age: i64,
    pub max_price_change_bps: u16,
    pub pyth_price_account: Pubkey,
    pub max_pyth_price_age: i64,
    pub max_pyth_deviation_bps: u16,
    pub price: u64,
    pub price_updated_at: i64,
}

impl Config {
    pub const SIZE: usize = 342;
}

#[account]
pub struct UnlockPool {
    pub unlocked_cumulative: u64,
    pub last_unlock_at: i64,
}

impl UnlockPool {
    pub const SIZE: usize = 8 + 8;
}

#[account]
pub struct Treasury {
    pub virtual_balance: u64,
}

impl Treasury {
    pub const SIZE: usize = 8;
}

#[account]
pub struct Vault {
    pub bump: u8,
}

impl Vault {
    pub const SIZE: usize = 1;
}

#[account]
pub struct LpLocker {
    pub authority: Pubkey,
    pub lp_mint: Pubkey,
    pub lp_vault: Pubkey,
    pub unlock_ts: i64,
    pub locked_amount: u64,
    pub bump: u8,
}

impl LpLocker {
    pub const SIZE: usize = 32 + 32 + 32 + 8 + 8 + 1;
}

#[error_code]
pub enum ProtocolError {
    #[msg("Reserve bps must be between 4000 and 5000")]
    InvalidReserveBps,
    #[msg("Price must be greater than zero")]
    InvalidPrice,
    #[msg("Amount must be greater than zero")]
    InvalidAmount,
    #[msg("Price not set")]
    PriceNotSet,
    #[msg("Price update too frequent")]
    PriceUpdateTooFrequent,
    #[msg("Price change exceeds max bps")]
    PriceChangeTooLarge,
    #[msg("Price too stale")]
    PriceTooStale,
    #[msg("Invalid oracle config")]
    InvalidOracleConfig,
    #[msg("Pyth price account mismatch")]
    PythPriceAccountMismatch,
    #[msg("Pyth price unavailable")]
    PythPriceUnavailable,
    #[msg("Pyth price too stale")]
    PythPriceTooStale,
    #[msg("Pyth deviation too large")]
    PythDeviationTooLarge,
    #[msg("Invalid pyth config")]
    InvalidPythConfig,
    #[msg("Unlock can only happen once per 24 hours")]
    UnlockTooFrequent,
    #[msg("Nothing to unlock")]
    NothingToUnlock,
    #[msg("Unlock pool vault has insufficient balance")]
    InsufficientUnlockPoolBalance,
    #[msg("Treasury vault has insufficient balance")]
    InsufficientTreasuryBalance,
    #[msg("LP locker not expired")]
    LockNotExpired,
    #[msg("Invalid LP mint")]
    InvalidLpMint,
    #[msg("Invalid vault")]
    InvalidVault,
    #[msg("Invalid unlock timestamp")]
    InvalidUnlockTimestamp,
    #[msg("LP vault has insufficient balance")]
    InsufficientLpBalance,
    #[msg("Math overflow")]
    MathOverflow,
    #[msg("Missing bump")]
    MissingBump,
}

const SECONDS_PER_DAY: i64 = 86_400;
const MIN_RESERVE_BPS: u16 = 4_000;
const MAX_RESERVE_BPS: u16 = 5_000;
const DAILY_HARD_CAP_BPS: u16 = 30; // 0.30%

const FDV_M1_USD: u64 = 5_000_000;
const FDV_M2_USD: u64 = 10_000_000;
const FDV_M3_USD: u64 = 50_000_000;
const FDV_M4_USD: u64 = 100_000_000;

const FDV_SCALE: u128 = 1_000_000; // price is USD with 6 decimals

fn fdv_usd_e6(total_supply: u64, price_e6: u64) -> u128 {
    (total_supply as u128)
        .checked_mul(price_e6 as u128)
        .unwrap_or(u128::MAX)
}

fn milestone_unlock_bps(fdv_e6: u128) -> u16 {
    let fdv_usd = fdv_e6 / FDV_SCALE;
    if fdv_usd >= FDV_M4_USD as u128 {
        3_000
    } else if fdv_usd >= FDV_M3_USD as u128 {
        2_000
    } else if fdv_usd >= FDV_M2_USD as u128 {
        1_000
    } else if fdv_usd >= FDV_M1_USD as u128 {
        500
    } else {
        0
    }
}

fn daily_rate_bps(fdv_e6: u128) -> u16 {
    let fdv_usd = fdv_e6 / FDV_SCALE;
    if fdv_usd >= FDV_M4_USD as u128 {
        25
    } else if fdv_usd >= FDV_M3_USD as u128 {
        33
    } else if fdv_usd >= FDV_M2_USD as u128 {
        33
    } else if fdv_usd >= FDV_M1_USD as u128 {
        50
    } else {
        100
    }
}

fn bps_of(amount: u64, bps: u16) -> u64 {
    let numerator = (amount as u128).saturating_mul(bps as u128);
    (numerator / 10_000) as u64
}

fn fdv_rate_cap_tokens(fdv_e6: u128, price_e6: u64, rate_bps: u16) -> u64 {
    if rate_bps == 0 || price_e6 == 0 {
        return 0;
    }
    let numerator = fdv_e6
        .saturating_mul(rate_bps as u128)
        .checked_div(10_000)
        .unwrap_or(u128::MAX);
    (numerator / price_e6 as u128) as u64
}

fn apply_price_update(config: &mut Account<Config>, price: u64) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    if config.price_updated_at != 0 && config.min_price_update_interval > 0 {
        require!(
            now - config.price_updated_at >= config.min_price_update_interval,
            ProtocolError::PriceUpdateTooFrequent
        );
    }

    if config.price > 0 && config.max_price_change_bps > 0 {
        let diff = if price >= config.price {
            price - config.price
        } else {
            config.price - price
        };
        let diff_bps = (diff as u128)
            .saturating_mul(10_000)
            .checked_div(config.price as u128)
            .unwrap_or(u128::MAX);
        require!(
            diff_bps <= config.max_price_change_bps as u128,
            ProtocolError::PriceChangeTooLarge
        );
    }

    config.price = price;
    config.price_updated_at = now;
    Ok(())
}

fn pyth_price_to_e6(price: i64, expo: i32) -> Result<u64> {
    require!(price > 0, ProtocolError::InvalidPrice);
    let scale = 6_i32 + expo;
    let price_i128 = price as i128;

    let result = if scale >= 0 {
        let factor = pow10_u128(scale as u32) as i128;
        price_i128
            .checked_mul(factor)
            .ok_or(ProtocolError::MathOverflow)?
    } else {
        let factor = pow10_u128((-scale) as u32) as i128;
        price_i128
            .checked_div(factor)
            .ok_or(ProtocolError::MathOverflow)?
    };

    require!(result > 0, ProtocolError::InvalidPrice);
    Ok(result as u64)
}

fn pow10_u128(exp: u32) -> u128 {
    let mut result: u128 = 1;
    for _ in 0..exp {
        result = result.saturating_mul(10);
    }
    result
}

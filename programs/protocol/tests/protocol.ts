import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Protocol } from "../target/types/protocol";
import { expect } from "chai";
import {
  createMint,
  getAccount,
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";

describe("protocol", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.protocol as Program<Protocol>;

  const provider = anchor.getProvider() as anchor.AnchorProvider;

  async function airdrop(pubkey: anchor.web3.PublicKey, lamports = 2_000_000_000) {
    const signature = await provider.connection.requestAirdrop(pubkey, lamports);
    const latest = await provider.connection.getLatestBlockhash();
    await provider.connection.confirmTransaction(
      {
        signature,
        ...latest,
      },
      "confirmed"
    );
  }

  function derivePdas(authority: anchor.web3.PublicKey) {
    const [config] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("config"), authority.toBuffer()],
      program.programId
    );
    const [unlockPool] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("unlock_pool"), authority.toBuffer()],
      program.programId
    );
    const [treasury] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("treasury"), authority.toBuffer()],
      program.programId
    );
    const [marketingVaultAuthority] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault_marketing"), authority.toBuffer()],
      program.programId
    );
    const [contentVaultAuthority] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault_content"), authority.toBuffer()],
      program.programId
    );
    const [communityVaultAuthority] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault_community"), authority.toBuffer()],
      program.programId
    );
    return {
      config,
      unlockPool,
      treasury,
      marketingVaultAuthority,
      contentVaultAuthority,
      communityVaultAuthority,
    };
  }

  async function setupInstance(params: {
    totalSupply: number;
    reserveBps: number;
    depositAmount: number;
  }) {
    const authority = anchor.web3.Keypair.generate();
    await airdrop(authority.publicKey);

    const {
      config,
      unlockPool,
      treasury,
      marketingVaultAuthority,
      contentVaultAuthority,
      communityVaultAuthority,
    } = derivePdas(authority.publicKey);

    const mint = await createMint(
      provider.connection,
      authority,
      authority.publicKey,
      null,
      6
    );

    const unlockPoolVault = getAssociatedTokenAddressSync(
      mint,
      unlockPool,
      true
    );
    const treasuryVault = getAssociatedTokenAddressSync(mint, treasury, true);
    const marketingVault = getAssociatedTokenAddressSync(
      mint,
      marketingVaultAuthority,
      true
    );
    const contentVault = getAssociatedTokenAddressSync(
      mint,
      contentVaultAuthority,
      true
    );
    const communityVault = getAssociatedTokenAddressSync(
      mint,
      communityVaultAuthority,
      true
    );

    await program.methods
      .initialize(new anchor.BN(params.totalSupply), params.reserveBps)
      .accounts({
        payer: authority.publicKey,
        config,
        unlockPool,
        treasury,
        marketingVaultAuthority,
        contentVaultAuthority,
        communityVaultAuthority,
        mint,
        unlockPoolVault,
        treasuryVault,
        marketingVault,
        contentVault,
        communityVault,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([authority])
      .rpc();

    const sourceAta = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      authority,
      mint,
      authority.publicKey
    );

    await mintTo(
      provider.connection,
      authority,
      mint,
      sourceAta.address,
      authority.publicKey,
      params.depositAmount
    );

    await program.methods
      .depositUnlockPool(new anchor.BN(params.depositAmount))
      .accounts({
        config,
        authority: authority.publicKey,
        unlockPool,
        source: sourceAta.address,
        unlockPoolVault,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .signers([authority])
      .rpc();

    return {
      authority,
      config,
      unlockPool,
      treasury,
      marketingVaultAuthority,
      contentVaultAuthority,
      communityVaultAuthority,
      mint,
      unlockPoolVault,
      treasuryVault,
      marketingVault,
      contentVault,
      communityVault,
    };
  }

  it("unlocks and transfers tokens to treasury vault", async () => {
    const instance = await setupInstance({
      totalSupply: 1_000_000_000,
      reserveBps: 4000,
      depositAmount: 200_000_000,
    });

    const price = new anchor.BN(10_000); // $0.01 with 6 decimals => $10M FDV
    await program.methods
      .updatePrice(price)
      .accounts({
        config: instance.config,
        oracleAuthority: instance.authority.publicKey,
      })
      .signers([instance.authority])
      .rpc();

    await program.methods
      .unlockToTreasury()
      .accounts({
        config: instance.config,
        authority: instance.authority.publicKey,
        unlockPool: instance.unlockPool,
        treasury: instance.treasury,
        unlockPoolVault: instance.unlockPoolVault,
        treasuryVault: instance.treasuryVault,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .signers([instance.authority])
      .rpc();

    const treasuryVaultAccount = await getAccount(
      provider.connection,
      instance.treasuryVault
    );

    const expectedDailyCap = 3_000_000; // 0.3% hard cap for $10M FDV
    expect(Number(treasuryVaultAccount.amount)).to.equal(expectedDailyCap);

    const treasuryAccount = await program.account.treasury.fetch(
      instance.treasury
    );
    expect(treasuryAccount.virtualBalance.toNumber()).to.equal(
      expectedDailyCap
    );

    let threw = false;
    try {
      await program.methods
        .unlockToTreasury()
        .accounts({
          config: instance.config,
          authority: instance.authority.publicKey,
          unlockPool: instance.unlockPool,
          treasury: instance.treasury,
          unlockPoolVault: instance.unlockPoolVault,
          treasuryVault: instance.treasuryVault,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        })
        .signers([instance.authority])
        .rpc();
    } catch {
      threw = true;
    }
    expect(threw).to.equal(true);
  });

  it("uses 0.25% rate at >= $100M FDV", async () => {
    const instance = await setupInstance({
      totalSupply: 1_000_000_000,
      reserveBps: 4000,
      depositAmount: 200_000_000,
    });

    const price = new anchor.BN(100_000); // $0.10 with 6 decimals => $100M FDV
    await program.methods
      .updatePrice(price)
      .accounts({
        config: instance.config,
        oracleAuthority: instance.authority.publicKey,
      })
      .signers([instance.authority])
      .rpc();

    await program.methods
      .unlockToTreasury()
      .accounts({
        config: instance.config,
        authority: instance.authority.publicKey,
        unlockPool: instance.unlockPool,
        treasury: instance.treasury,
        unlockPoolVault: instance.unlockPoolVault,
        treasuryVault: instance.treasuryVault,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .signers([instance.authority])
      .rpc();

    const treasuryVaultAccount = await getAccount(
      provider.connection,
      instance.treasuryVault
    );

    const expectedDailyCap = 2_500_000; // 0.25% of total supply
    expect(Number(treasuryVaultAccount.amount)).to.equal(expectedDailyCap);
  });

  it("fails to unlock before milestone is reached", async () => {
    const instance = await setupInstance({
      totalSupply: 1_000_000_000,
      reserveBps: 4000,
      depositAmount: 200_000_000,
    });

    const price = new anchor.BN(1_000); // $0.001 => $1M FDV
    await program.methods
      .updatePrice(price)
      .accounts({
        config: instance.config,
        oracleAuthority: instance.authority.publicKey,
      })
      .signers([instance.authority])
      .rpc();

    let threw = false;
    try {
      await program.methods
        .unlockToTreasury()
        .accounts({
          config: instance.config,
          authority: instance.authority.publicKey,
          unlockPool: instance.unlockPool,
          treasury: instance.treasury,
          unlockPoolVault: instance.unlockPoolVault,
          treasuryVault: instance.treasuryVault,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        })
        .signers([instance.authority])
        .rpc();
    } catch {
      threw = true;
    }

    expect(threw).to.equal(true);
  });
});

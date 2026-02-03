export type Language = 'en' | 'zh-CN' | 'zh-TW';

export interface WhitepaperContent {
  meta: {
    badge: string;
    version: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  toc: {
    title: string;
    items: string[];
  };
  sections: {
    overview: {
      title: string;
      intro: string;
      goals: {
        title: string;
        items: string[];
      };
    };
    roles: {
      title: string;
      rolesTitle: string;
      roles: { name: string; desc: string }[];
      flowTitle: string;
      flows: string[];
    };
    tokenomics: {
      title: string;
      params: {
        title: string;
        items: { label: string; value: string; desc: string }[];
      };
      distribution: {
        title: string;
        note: string;
        items: { category: string; percent: string; usage: string }[];
      };
    };
    ico: {
      title: string;
      rounds: {
        title: string;
        headers: string[];
        rows: { round: string; percent: string; amount: string }[];
        total: { label: string; percent: string; amount: string };
      };
      budget: {
        title: string;
        note: string;
        items: { usage: string; amount: string; desc: string }[];
      };
    };
    fdv: {
      title: string;
      intro: string;
      definition: {
        title: string;
        formula: string;
        note: string;
      };
      oracle: {
        title: string;
        intro: string;
        primary: { label: string; desc: string };
        secondary: { label: string; desc: string };
        purpose: string;
      };
    };
    unlock: {
      title: string;
      mechanism: {
        title: string;
        desc: string;
        warning: string;
      };
      highWaterMark: {
        title: string;
        rule: string;
        reason: string;
        note: string;
      };
      milestones: {
        title: string;
        headers: string[];
        rows: { fdv: string; unlockable: string; locked: string; rate: string; logic: string }[];
        note: string;
      };
    };
    dailyCap: {
      title: string;
      goals: {
        title: string;
        items: string[];
      };
      executionFlow: {
        title: string;
        steps: { step: string; desc: string }[];
      };
      formula: {
        title: string;
        intro: string;
        formula: string;
        params: { name: string; desc: string }[];
      };
      priority: {
        title: string;
        intro: string;
        items: { order: string; name: string; reason: string }[];
      };
      cooldown: {
        title: string;
        items: string[];
      };
    };
    treasury: {
      title: string;
      duties: {
        title: string;
        items: string[];
      };
      vaults: {
        title: string;
        items: { name: string; purpose: string; color: string }[];
      };
      transparency: {
        title: string;
        items: string[];
      };
    };
    reserve: {
      title: string;
      definition: {
        title: string;
        intro: string;
        target: string;
        targetNote: string;
        desc: string;
      };
      methods: {
        title: string;
        hardLock: { title: string; desc: string; recommend: string };
        multisig: { title: string; desc: string; recommend: string };
      };
    };
    liquidity: {
      title: string;
      launch: {
        title: string;
        desc: string;
      };
      lock: {
        title: string;
        duration: string;
        durationNote: string;
        requirements: string;
        items: string[];
      };
    };
    buyback: {
      title: string;
      distribution: {
        title: string;
        intro: string;
        company: { percent: string; label: string };
        buyback: { percent: string; label: string };
      };
      flywheel: {
        title: string;
        desc: string;
        highlight: string;
        mechanism: string;
      };
      execution: {
        title: string;
        intro: string;
        uses: string[];
        note: string;
      };
    };
    governance: {
      title: string;
      multisig: {
        title: string;
        items: string[];
      };
      pause: {
        title: string;
        trigger: string;
        effect: string;
      };
    };
    risks: {
      title: string;
      disclaimer: string;
      items: { type: string; desc: string }[];
    };
    roadmap: {
      title: string;
      phases: { phase: string; name: string; items: string }[];
    };
    glossary: {
      title: string;
      terms: { term: string; full?: string; desc: string }[];
    };
  };
  footer: string;
}

export const whitepaperContent: Record<Language, WhitepaperContent> = {
  'en': {
    meta: {
      badge: 'Whitepaper',
      version: 'v1.0',
    },
    hero: {
      title: 'AI Drama Protocol',
      subtitle: 'Tokenomics & System Design',
      description: 'A sustainable system combining AI comic drama creation, crowdfunding, and growth marketing',
    },
    toc: {
      title: 'Contents',
      items: [
        'Project Overview',
        'System Roles & Fund Flow',
        'Tokenomics',
        'ICO Rules',
        'FDV & Price Mechanism',
        'Milestone Unlock',
        'Daily Release Cap',
        'Treasury & Vaults',
        'Reserve',
        'Liquidity & Lock',
        'Buyback Flywheel',
        'Governance & Security',
        'Risk Disclosure',
        'Roadmap',
        'Glossary',
      ],
    },
    sections: {
      overview: {
        title: 'Project Overview',
        intro: 'This project integrates AI comic drama creation, crowdfunding financing, and growth marketing into a sustainable operational system.',
        goals: {
          title: 'Core Objectives',
          items: [
            'Provide sustainable production funding for creators/producers',
            'Make marketing fund usage transparent, traceable, and auditable',
            'Control token release pace through on-chain rules to reduce selling pressure and enhance market trust',
            'Establish a growth flywheel: Content → Traffic → Ad Revenue → Buyback → Re-invest',
          ],
        },
      },
      roles: {
        title: 'System Roles & Fund Flow',
        rolesTitle: 'Roles',
        roles: [
          { name: 'Users/Supporters', desc: 'Support works with USDC or tokens, participate in interactions and consumption' },
          { name: 'Creators/Producers', desc: 'Produce AI comic drama content, receive production funds according to budget' },
          { name: 'Platform', desc: 'Operate products, manage growth marketing, maintain protocol parameters and security' },
          { name: 'Advertisers', desc: 'Pay for traffic, generating ad revenue' },
          { name: 'Protocol Treasury', desc: 'Receive fundraising and revenue, allocate according to budget' },
        ],
        flowTitle: 'Fund Flow',
        flows: [
          'ICO funds (USDC) enter Treasury',
          'Treasury allocates funds to multiple budget Vaults by purpose',
          'Marketing Vault for growth; Content Vault for production; Community Vault for operations',
          'Ad revenue enters Treasury: 50% company revenue, 50% for token buyback, then re-invest in marketing/ecosystem',
        ],
      },
      tokenomics: {
        title: 'Tokenomics',
        params: {
          title: 'Basic Parameters',
          items: [
            { label: 'Total Supply', value: 'Fixed', desc: 'Non-inflationary' },
            { label: 'Fundraising', value: 'USDC', desc: 'Stablecoin' },
            { label: 'Goal', value: 'Discipline', desc: 'Treasury Transparency' },
          ],
        },
        distribution: {
          title: 'Distribution Structure',
          note: 'Note: Unlock Pool tokens are not released at once, but constrained by "milestone + daily cap" dual mechanism.',
          items: [
            { category: 'LP Liquidity', percent: '2%', usage: 'Establish main trading pool (LP locked)' },
            { category: 'ICO Public Sale', percent: '8%', usage: 'Three rounds of fundraising' },
            { category: 'Unlock Pool', percent: '90%', usage: 'Gradually unlocked by FDV milestones' },
            { category: 'Reserve', percent: '≥50%', usage: 'Long-term lock to reduce dilution risk' },
          ],
        },
      },
      ico: {
        title: 'ICO Fundraising Rules',
        rounds: {
          title: 'Fundraising Rounds',
          headers: ['Round', 'Allocation', 'Amount (USDC)'],
          rows: [
            { round: 'R1', percent: '5%', amount: '50,000' },
            { round: 'R2', percent: '2%', amount: '40,000' },
            { round: 'R3', percent: '1%', amount: '40,000' },
          ],
          total: { label: 'Total', percent: '8%', amount: '130,000' },
        },
        budget: {
          title: 'Fund Usage (Budget)',
          note: 'All raised funds enter Treasury and are allocated through budget Vaults, trackable on-chain.',
          items: [
            { usage: 'Premium Content', amount: '50,000', desc: 'Produce high-quality content assets' },
            { usage: 'TikTok Marketing', amount: '40,000', desc: 'Growth campaigns (e.g., 5,000×8 batches)' },
            { usage: 'Community Building', amount: '40,000', desc: 'Community events, incentives & operations' },
          ],
        },
      },
      fdv: {
        title: 'FDV & Price Mechanism',
        intro: 'This project\'s unlock and daily release rate are tied to FDV (Fully Diluted Valuation).',
        definition: {
          title: 'FDV Definition',
          formula: 'FDV = Total Supply × Price',
          note: 'Where Price uses Time-Weighted Average Price (TWAP), not spot price, to reduce manipulation risk.',
        },
        oracle: {
          title: 'Price Source (Oracle)',
          intro: 'To reduce "price manipulation" disputes, price source uses a combined approach:',
          primary: { label: 'Primary', desc: 'DEX main pool TWAP (officially designated trading pool)' },
          secondary: { label: 'Secondary', desc: 'Oracle (e.g., Pyth) for anomaly filtering and backup verification' },
          purpose: 'Purpose: Reduce false unlock triggers from short-term pumps/dumps, enhance rule credibility.',
        },
      },
      unlock: {
        title: 'Milestone Unlock Mechanism',
        mechanism: {
          title: 'Mechanism Overview',
          desc: 'When FDV reaches preset thresholds, part of the Unlock Pool becomes "unlockable quota".',
          warning: 'Note: Reaching a milestone does NOT mean immediate full release; final release is still limited by "daily release cap".',
        },
        highWaterMark: {
          title: 'High-Water Mark Mechanism',
          rule: 'Unlock only references historical highest FDV (24h TWAP average)',
          reason: 'Prevents program from stopping release due to short-term price drops, avoiding community panic.',
          note: 'Once unlock permission is granted, even if price drops, release permission is retained, but daily cap will auto-slow due to rate increase or LP decrease.',
        },
        milestones: {
          title: 'FDV Milestones & Release Rates',
          headers: ['FDV Range', 'Cumulative Unlock', 'Still Locked', 'Daily Rate', 'Logic'],
          rows: [
            { fdv: '<$5M', unlockable: '15%', locked: '85%', rate: '1.00%', logic: 'Early circulation for consensus' },
            { fdv: '$5M - $20M', unlockable: '20%', locked: '80%', rate: '0.50%', logic: 'Price rising, tighten release' },
            { fdv: '$20M - $50M', unlockable: '30%', locked: '70%', rate: '0.33%', logic: 'Growth phase, absolute increase' },
            { fdv: '$50M - $100M', unlockable: '40%', locked: '60%', rate: '0.25%', logic: 'Stable phase, prevent dumps' },
            { fdv: '>$100M', unlockable: '50%', locked: '50%', rate: '0.20%', logic: 'Long-term reserve state' },
          ],
          note: 'Note: This table is based on lock ratio (85%...50%) and rate design. Final parameters are determined by on-chain config.',
        },
      },
      dailyCap: {
        title: 'Daily Release Cap',
        goals: {
          title: 'Design Goals',
          items: [
            'Prevent market panic and price collapse from concentrated short-term release after unlock',
            'Link release pace to project scale (FDV); higher FDV = more conservative release',
            'Match marketing budget with market absorption capacity',
          ],
        },
        executionFlow: {
          title: 'Execution Flow',
          steps: [
            { step: 'Milestone Detection', desc: 'Contract checks 24h TWAP FDV every 24 hours' },
            { step: 'Quota Archive', desc: 'If FDV hits new high (e.g. $8M→$12M), auto-raise unlockedRemaining from 15% to 20%' },
            { step: 'Calculate DailyCap', desc: 'Base quota = current FDV tier rate × TotalSupply' },
            { step: 'Safety Calibration', desc: 'Compare LP depth to ensure dumps won\'t break the market' },
            { step: 'Execute Release', desc: 'Transfer calculated quota from lock contract to target accounts' },
          ],
        },
        formula: {
          title: 'Core Formula',
          intro: 'Maximum daily release from Unlock Pool to Treasury (dailyCap) is defined as:',
          formula: 'dailyCap = min(unlockedRemaining, TotalSupply × rate, LP_depth × k)',
          params: [
            { name: 'unlockedRemaining', desc: 'Remaining releasable quota under current milestone' },
            { name: 'TotalSupply × rate', desc: 'Dynamic release ratio determined by FDV tier' },
            { name: 'LP_depth × k', desc: 'Safety coefficient to prevent market dump' },
          ],
        },
        priority: {
          title: 'Release Priority Queue',
          intro: 'When dailyCap quota is generated, release follows this priority:',
          items: [
            { order: '1st', name: 'Content Vault (Creator Incentives)', reason: 'Ensure ecosystem productivity' },
            { order: '2nd', name: 'ICO Investors', reason: 'Honor commitments to early supporters' },
            { order: '3rd', name: 'Team/Reserve', reason: 'Last priority, maximize external confidence' },
          ],
        },
        cooldown: {
          title: 'Frequency Limits & Cooldown',
          items: [
            'Only one release execution allowed per 24 hours (cooldown)',
            'Over-frequency execution fails directly',
            'All release events recorded on-chain for Dashboard display',
          ],
        },
      },
      treasury: {
        title: 'Treasury & Budget Vaults',
        duties: {
          title: 'Treasury Responsibilities',
          items: [
            'Receive ICO funds (USDC)',
            'Receive tokens released from Unlock Pool',
            'Receive ad revenue (USDC)',
            'Allocate funds to different purpose Vaults according to budget',
          ],
        },
        vaults: {
          title: 'Vault Structure',
          items: [
            { name: 'Marketing Vault', purpose: 'Marketing Budget', color: 'blue' },
            { name: 'Content Vault', purpose: 'Content Production', color: 'green' },
            { name: 'Community Vault', purpose: 'Community Building', color: 'purple' },
          ],
        },
        transparency: {
          title: 'Allocation & Transparency',
          items: [
            'Each allocation can configure amount and approval threshold',
            'Support on-chain event recording and public query',
            'Dashboard: Display balances, allocation history, and remaining budget',
          ],
        },
      },
      reserve: {
        title: 'Reserve & Long-term Supply Discipline',
        definition: {
          title: 'Reserve Definition',
          intro: 'Reserve is the portion of total supply that is ultimately retained long-term, targeting:',
          target: '≥ 50%',
          targetNote: '(minimum 50%)',
          desc: 'Not entering market circulation long-term',
        },
        methods: {
          title: 'Implementation Methods',
          hardLock: {
            title: 'Hard Lock',
            desc: 'Written into contract constraints, never releasable',
            recommend: '✓ Recommended when strong external trust narrative is needed',
          },
          multisig: {
            title: 'Multisig + Timelock',
            desc: 'Can be used but requires delay and public approval, emphasizing auditability',
            recommend: '✓ Recommended when long-term operational flexibility is needed',
          },
        },
      },
      liquidity: {
        title: 'Liquidity (LP) Launch & Lock',
        launch: {
          title: 'LP Launch',
          desc: 'Use 2% tokens + USDC to establish the official main trading pool (as price benchmark pool).',
        },
        lock: {
          title: 'LP Lock',
          duration: '12 months',
          durationNote: 'LP assets locked to reduce "rug pull" risk.',
          requirements: 'Pool migration/adjustment requires:',
          items: [
            'Multisig approval',
            'Timelock delay',
            'Public on-chain record',
          ],
        },
      },
      buyback: {
        title: 'Ad Revenue & Buyback Flywheel',
        distribution: {
          title: 'Revenue Distribution',
          intro: 'After ad revenue enters Treasury, split by rules:',
          company: { percent: '50%', label: 'Company Revenue' },
          buyback: { percent: '50%', label: 'Buyback Budget' },
        },
        flywheel: {
          title: 'Buyback Flywheel Mechanism',
          desc: '50% of ad revenue is used for buyback.',
          highlight: 'Bought-back tokens are directly burned, or injected into Reserve to extend protocol lifespan.',
          mechanism: 'This creates dynamic equilibrium: while "daily release" increases supply, buyback reduces supply.',
        },
        execution: {
          title: 'Buyback Execution',
          intro: 'Buyback budget is used to buy back tokens on the market. Bought-back tokens are used for:',
          uses: [
            'Direct burn (reduce total supply)',
            'Inject into Reserve (extend protocol runway)',
          ],
          note: 'Buyback execution can initially be performed by centralized operations with on-chain public records, later upgraded to on-chain automatic executor.',
        },
      },
      governance: {
        title: 'Governance & Security',
        multisig: {
          title: 'Multisig & Permissions',
          items: [
            'Treasury and key parameters controlled by multisig wallet',
            'Critical operations (pool migration, parameter upgrades) should add Timelock',
          ],
        },
        pause: {
          title: 'Emergency Pause',
          trigger: 'Can be triggered when anomalies occur (Oracle anomaly, vulnerability risk, market attack)',
          effect: 'During pause, release/critical transfers are prohibited until governance lifts it.',
        },
      },
      risks: {
        title: 'Risk Disclosure',
        disclaimer: 'This project carries the following risks (not investment advice):',
        items: [
          { type: 'Market Risk', desc: 'Price volatility, insufficient liquidity' },
          { type: 'Oracle Risk', desc: 'TWAP and Oracle may have anomalies or delays' },
          { type: 'Contract Risk', desc: 'Potential vulnerabilities, upgrade risks' },
          { type: 'Operational Risk', desc: 'Uncertain marketing effectiveness, unstable content production' },
          { type: 'Regulatory Risk', desc: 'Different regions have different regulations on tokens and ad settlements' },
        ],
      },
      roadmap: {
        title: 'Roadmap',
        phases: [
          { phase: 'Phase 1', name: 'MVP', items: 'Unlock Pool + Daily Cap + Treasury Basic Vault + Basic Price Source' },
          { phase: 'Phase 2', name: 'Fundraising & Liquidity', items: 'ICO Contract + Multi-Vault Allocation + LP Lock' },
          { phase: 'Phase 3', name: 'Security & Automation', items: 'Buyback Executor + Multi-pool Price Aggregation + Full Security Module (Timelock/Multisig/Pause)' },
          { phase: 'Phase 4', name: 'Decentralization', items: 'DAO Governance and Parameter Upgrade Process Improvement' },
        ],
      },
      glossary: {
        title: 'Glossary',
        terms: [
          { term: 'FDV', full: 'Fully Diluted Valuation', desc: '= Total Supply × Price' },
          { term: 'TWAP', full: 'Time-Weighted Average Price', desc: 'Average price weighted by time' },
          { term: 'High-Water Mark', desc: 'Historical highest FDV, unlock reference point' },
          { term: 'Unlock Pool', desc: 'Pool storing tokens pending release' },
          { term: 'Treasury', desc: 'Protocol vault receiving funds and managing budget allocation' },
          { term: 'Vault', desc: 'Purpose-specific vault (Marketing/Content/Community)' },
          { term: 'LP', full: 'Liquidity Provider', desc: 'Trading pool funds' },
          { term: 'Multisig', desc: 'Multi-signature wallet, requiring multiple authorizations' },
          { term: 'Timelock', desc: 'Delayed execution mechanism' },
          { term: 'Emergency Pause', desc: 'Emergency stop mechanism' },
        ],
      },
    },
    footer: '© 2026 AI Drama Protocol · This document is for reference only, not investment advice',
  },
  'zh-CN': {
    meta: {
      badge: '白皮书',
      version: 'v1.0',
    },
    hero: {
      title: 'AI漫剧创投协议',
      subtitle: '代币经济学与系统设计',
      description: '将 AI 漫剧创作、众筹融资与增长投流结合为可持续运营系统',
    },
    toc: {
      title: '目录',
      items: [
        '项目概述',
        '系统角色与资金流',
        '代币与供应结构',
        'ICO 募资规则',
        '市值与价格机制',
        '市值里程碑解锁',
        '每日释放上限',
        'Treasury 与预算金库',
        'Reserve（最终保留）',
        '流动性启动与锁仓',
        '广告收入与回购飞轮',
        '治理与安全机制',
        '风险披露',
        '路线图',
        '术语表',
      ],
    },
    sections: {
      overview: {
        title: '项目概述',
        intro: '本项目旨在将 AI 漫剧创作、众筹融资、与增长投流结合为一个可持续运营的系统。',
        goals: {
          title: '核心目标',
          items: [
            '让创作者/制作方获得可持续的内容制作资金',
            '让推广投流的资金使用透明、可追踪、可审计',
            '通过链上规则控制代币释放节奏，降低短期抛压、增强市场信任',
            '建立"内容 → 流量 → 广告收入 → 回购 → 再投流"的增长飞轮',
          ],
        },
      },
      roles: {
        title: '系统角色与资金流',
        rolesTitle: '角色',
        roles: [
          { name: '用户/支持者', desc: '用 USDC 或代币支持作品、参与互动与消费' },
          { name: '创作者/制作方', desc: '产出 AI 漫剧内容，按预算获得制作资金' },
          { name: '平台方', desc: '运营产品、投流增长，维护协议参数与安全' },
          { name: '广告主', desc: '为流量付费形成广告收入' },
          { name: '协议国库', desc: '承接募资与收入，按预算拨付' },
        ],
        flowTitle: '资金流',
        flows: [
          'ICO 募资资金（USDC）进入 Treasury',
          'Treasury 将资金按用途分配到多个预算金库（Vault）',
          '增长投流消耗 Marketing Vault；内容制作消耗 Content Vault；社区运营消耗 Community Vault',
          '广告收入进入 Treasury：50% 作为公司收入，50% 用于回购代币，回购后再用于投流/生态激励',
        ],
      },
      tokenomics: {
        title: '代币与供应结构',
        params: {
          title: '基本参数',
          items: [
            { label: '总供应量', value: '固定', desc: '不可增发' },
            { label: '募资币种', value: 'USDC', desc: '稳定币' },
            { label: '目标', value: '供应纪律', desc: '国库透明' },
          ],
        },
        distribution: {
          title: '分配结构',
          note: '注：Unlock Pool 中的代币并非一次性释放，而是受"里程碑 + 日释放上限"双重约束。',
          items: [
            { category: 'LP 启动流动性', percent: '2%', usage: '建立主交易池流动性（LP 锁仓）' },
            { category: 'ICO 公开募集', percent: '8%', usage: '分三轮募资' },
            { category: 'Unlock Pool', percent: '90%', usage: '按市值里程碑逐步解锁' },
            { category: 'Reserve', percent: '≥50%', usage: '长期锁定、降低无限稀释风险' },
          ],
        },
      },
      ico: {
        title: 'ICO 募资规则',
        rounds: {
          title: '募资轮次',
          headers: ['轮次', '出售比例', '募资金额 (USDC)'],
          rows: [
            { round: 'R1', percent: '5%', amount: '50,000' },
            { round: 'R2', percent: '2%', amount: '40,000' },
            { round: 'R3', percent: '1%', amount: '40,000' },
          ],
          total: { label: '合计', percent: '8%', amount: '130,000' },
        },
        budget: {
          title: '募资资金用途（预算）',
          note: '所有募资资金进入 Treasury，并通过预算金库（Vault）拨付，链上可追踪。',
          items: [
            { usage: '精品内容制作', amount: '50,000', desc: '用于制作高质量内容资产' },
            { usage: 'TikTok 投流', amount: '40,000', desc: '用于增长投放（例如 5,000×8 批次）' },
            { usage: '社区建设', amount: '40,000', desc: '用于社区活动、激励与运营' },
          ],
        },
      },
      fdv: {
        title: '市值与价格机制',
        intro: '本项目的解锁与日释放速率与 FDV（完全稀释估值）相关。',
        definition: {
          title: 'FDV 定义',
          formula: 'FDV = TotalSupply × Price',
          note: '其中 Price 取时间加权平均价格（TWAP），而非瞬时价格，以降低操纵风险。',
        },
        oracle: {
          title: '价格来源（Oracle）',
          intro: '为减少"人为写价"争议，价格来源采用组合方案：',
          primary: { label: '主价格源', desc: 'DEX 主池 TWAP（官方指定交易池）' },
          secondary: { label: '二级校验', desc: 'Oracle（例如 Pyth）用于异常过滤与备份校验' },
          purpose: '目的：减少短期拉盘/砸盘导致的错误触发解锁，提升规则可信度。',
        },
      },
      unlock: {
        title: '市值里程碑解锁机制',
        mechanism: {
          title: '机制概览',
          desc: '当 FDV 达到预设档位时，Unlock Pool 的一部分变为"可解锁额度"。',
          warning: '注意：达到里程碑并不意味着可以一次性释放全部额度，最终释放仍受"每日释放上限"限制。',
        },
        highWaterMark: {
          title: '高水位机制 (High-Water Mark)',
          rule: '市值解锁只参考历史最高 FDV（24h TWAP 平均值）',
          reason: '防止币价短期回调导致程序停止释放，引发社区恐慌。',
          note: '一旦解锁权限获得，即使币价下跌，释放权依然保留，但日释放上限会因为 rate 的回升或 LP 的减小而自动调慢。',
        },
        milestones: {
          title: '敲定参数表：市值阶梯与释放速率',
          headers: ['市值阶段 (FDV)', '累计可解锁上限', '剩余锁仓', '日释放速率', '逻辑说明'],
          rows: [
            { fdv: '<$5M', unlockable: '15% (含ICO)', locked: '85%', rate: '1.00%', logic: '早期需要流通量建立共识' },
            { fdv: '$5M - $20M', unlockable: '20%', locked: '80%', rate: '0.50%', logic: '价格上升，收紧释放百分比' },
            { fdv: '$20M - $50M', unlockable: '30%', locked: '70%', rate: '0.33%', logic: '进入成长期，绝对金额增加' },
            { fdv: '$50M - $100M', unlockable: '40%', locked: '60%', rate: '0.25%', logic: '稳定期，极致防抛压' },
            { fdv: '>$100M', unlockable: '50%', locked: '50%', rate: '0.20%', logic: '最终长期储备形态' },
          ],
          note: '注：该表基于锁仓比例 (85%...50%) 和 rate 设计。最终参数以链上配置为准。',
        },
      },
      dailyCap: {
        title: '每日释放上限（日抛机制）',
        goals: {
          title: '设计目标',
          items: [
            '防止解锁后短期集中释放造成市场恐慌与价格崩塌',
            '将释放节奏与项目体量（FDV）挂钩，FDV 越高，释放越保守',
            '使投流预算与市场承受能力更匹配',
          ],
        },
        executionFlow: {
          title: '执行流程',
          steps: [
            { step: '里程碑检测', desc: '合约每 24 小时检查一次过去 24 小时的 TWAP 折算的 FDV' },
            { step: '解锁额度归档', desc: '如果 FDV 触达新高（如从 $8M 涨到 $12M），系统自动将 unlockedRemaining 从 15% 提升至 20%' },
            { step: '计算当日额度', desc: '基础额度 = 当前 FDV 档位对应的 rate × TotalSupply' },
            { step: '安全校准', desc: '对比流动性池（LP）深度，确保抛压不会瞬间击穿盘面' },
            { step: '执行释放', desc: '将计算出的额度从锁定合约拨付给对应账户' },
          ],
        },
        formula: {
          title: '核心公式',
          intro: '每日从 Unlock Pool 释放到 Treasury 的最大额度（dailyCap）定义为：',
          formula: 'dailyCap = min(unlockedRemaining, TotalSupply × rate, LP_depth × k)',
          params: [
            { name: 'unlockedRemaining', desc: '当前已达里程碑下，剩余可释放额度' },
            { name: 'TotalSupply × rate', desc: '按 FDV 分段决定的动态释放比例' },
            { name: 'LP_depth × k', desc: '流动性安全系数，防止击穿盘面' },
          ],
        },
        priority: {
          title: '"日抛"队列优先级',
          intro: '当 dailyCap 额度生成后，释放顺序为：',
          items: [
            { order: '第一', name: '创作者激励 (Content Vault)', reason: '优先保证生态生产力的活跃' },
            { order: '第二', name: 'ICO 投资者', reason: '兑现对早期支持者的承诺' },
            { order: '第三', name: '团队/储备', reason: '最后释放，增强外部信心' },
          ],
        },
        cooldown: {
          title: '频率限制与冷却',
          items: [
            '每 24 小时仅允许执行一次释放（cooldown）',
            '超频执行直接失败',
            '所有释放事件链上记录，用于 Dashboard 展示',
          ],
        },
      },
      treasury: {
        title: 'Treasury 与预算金库',
        duties: {
          title: 'Treasury 的职责',
          items: [
            '接收 ICO 募资（USDC）',
            '接收 Unlock Pool 释放来的代币',
            '接收广告收入（USDC）',
            '将资金按预算拨付到不同用途的 Vault',
          ],
        },
        vaults: {
          title: 'Vault 结构',
          items: [
            { name: 'Marketing Vault', purpose: '投流预算', color: 'blue' },
            { name: 'Content Vault', purpose: '内容制作', color: 'green' },
            { name: 'Community Vault', purpose: '社区建设', color: 'purple' },
          ],
        },
        transparency: {
          title: '拨付与透明度',
          items: [
            '每笔拨付可配置额度与审批门槛',
            '支持链上事件记录与公开查询',
            '配套 Dashboard：显示余额、拨付历史与预算剩余',
          ],
        },
      },
      reserve: {
        title: 'Reserve 与长期供应纪律',
        definition: {
          title: 'Reserve 的定义',
          intro: 'Reserve 是总供应量中最终长期保留的一部分，目标为：',
          target: '≥ 50%',
          targetNote: '（最低50%）',
          desc: '长期不进入市场流通',
        },
        methods: {
          title: '实施方式',
          hardLock: {
            title: '永久锁死（Hard Lock）',
            desc: '写入合约约束，永远不可释放',
            recommend: '✓ 推荐：对外需要强信任叙事时',
          },
          multisig: {
            title: '多签 + Timelock 锁定',
            desc: '可动用但需延迟与公开审批，强调可审计性',
            recommend: '✓ 推荐：需要长期运营弹性时',
          },
        },
      },
      liquidity: {
        title: '流动性启动与锁仓',
        launch: {
          title: 'LP 启动',
          desc: '使用 2% 代币 + USDC 建立官方主交易池（作为价格基准池）。',
        },
        lock: {
          title: 'LP 锁仓',
          duration: '12 个月',
          durationNote: 'LP 资产锁仓，以降低"撤池"风险。',
          requirements: '迁池/调整需满足：',
          items: [
            '多签批准',
            'Timelock 延迟',
            '公开链上记录',
          ],
        },
      },
      buyback: {
        title: '广告收入与回购飞轮',
        distribution: {
          title: '收入分配',
          intro: '广告收入进入 Treasury 后按规则拆分：',
          company: { percent: '50%', label: '公司运营收入' },
          buyback: { percent: '50%', label: '回购预算' },
        },
        flywheel: {
          title: '回购飞轮联动机制',
          desc: '广告收入的 50% 用于回购。',
          highlight: '回购的代币直接销毁，或注入 Reserve 延长协议寿命。',
          mechanism: '这样在"日抛"增加供应的同时，通过回购减少供应，形成动态博弈平衡。',
        },
        execution: {
          title: '回购执行',
          intro: '回购预算用于在市场上买回代币，回购所得代币用于：',
          uses: [
            '直接销毁（减少总供应量）',
            '注入 Reserve（延长协议运营周期）',
          ],
          note: '回购执行可以先由中心化运营执行并链上公开记录，后续再升级为链上自动执行器。',
        },
      },
      governance: {
        title: '治理与安全机制',
        multisig: {
          title: '多签与权限',
          items: [
            'Treasury 与关键参数由多签钱包控制',
            '关键操作（如迁池、参数升级）建议加 Timelock',
          ],
        },
        pause: {
          title: '紧急暂停',
          trigger: '出现异常（Oracle 异常、漏洞风险、市场攻击）可触发紧急暂停',
          effect: '暂停期间禁止释放/关键转账，直到治理解除。',
        },
      },
      risks: {
        title: '风险披露',
        disclaimer: '本项目存在以下风险（不构成投资建议）：',
        items: [
          { type: '市场风险', desc: '价格波动、流动性不足' },
          { type: '预言机风险', desc: 'TWAP 与 Oracle 可能异常或延迟' },
          { type: '合约风险', desc: '潜在漏洞、升级风险' },
          { type: '运营风险', desc: '投流效果不确定、内容生产不稳定' },
          { type: '监管风险', desc: '不同地区对代币与广告结算监管不同' },
        ],
      },
      roadmap: {
        title: '路线图',
        phases: [
          { phase: 'Phase 1', name: 'MVP', items: '解锁池 + 日释放上限 + Treasury 基础金库 + 价格源基础版' },
          { phase: 'Phase 2', name: '募资与流动性', items: 'ICO 合约 + 多 Vault 分账拨付 + LP 锁仓' },
          { phase: 'Phase 3', name: '安全与自动化', items: '回购执行器 + 多池价格聚合 + 完整安全模块（Timelock/Multisig/Pause）' },
          { phase: 'Phase 4', name: '去中心化', items: 'DAO 治理与参数升级流程完善' },
        ],
      },
      glossary: {
        title: '术语表',
        terms: [
          { term: 'FDV', full: 'Fully Diluted Valuation', desc: '完全稀释估值 = 总供应量 × 价格' },
          { term: 'TWAP', full: 'Time-Weighted Average Price', desc: '时间加权平均价' },
          { term: 'High-Water Mark', desc: '高水位机制，解锁参考历史最高 FDV' },
          { term: 'Unlock Pool', desc: '锁仓/解锁池，储存待释放代币的池' },
          { term: 'Treasury', desc: '国库金库，承接资金与预算拨付' },
          { term: 'Vault', desc: '用途金库（投流/内容/社区）' },
          { term: 'LP', full: 'Liquidity Provider', desc: '流动性提供，交易池资金' },
          { term: 'Multisig', desc: '多签钱包，多人共同授权' },
          { term: 'Timelock', desc: '延迟执行机制' },
          { term: 'Emergency Pause', desc: '紧急暂停机制' },
        ],
      },
    },
    footer: '© 2026 AI漫剧创投协议 · 本文档仅供参考，不构成投资建议',
  },
  'zh-TW': {
    meta: {
      badge: '白皮書',
      version: 'v1.0',
    },
    hero: {
      title: 'AI漫劇創投協議',
      subtitle: '代幣經濟學與系統設計',
      description: '將 AI 漫劇創作、眾籌融資與增長投流結合為可持續運營系統',
    },
    toc: {
      title: '目錄',
      items: [
        '項目概述',
        '系統角色與資金流',
        '代幣與供應結構',
        'ICO 募資規則',
        '市值與價格機制',
        '市值里程碑解鎖',
        '每日釋放上限',
        'Treasury 與預算金庫',
        'Reserve（最終保留）',
        '流動性啟動與鎖倉',
        '廣告收入與回購飛輪',
        '治理與安全機制',
        '風險披露',
        '路線圖',
        '術語表',
      ],
    },
    sections: {
      overview: {
        title: '項目概述',
        intro: '本項目旨在將 AI 漫劇創作、眾籌融資、與增長投流結合為一個可持續運營的系統。',
        goals: {
          title: '核心目標',
          items: [
            '讓創作者/製作方獲得可持續的內容製作資金',
            '讓推廣投流的資金使用透明、可追蹤、可審計',
            '通過鏈上規則控制代幣釋放節奏，降低短期拋壓、增強市場信任',
            '建立「內容 → 流量 → 廣告收入 → 回購 → 再投流」的增長飛輪',
          ],
        },
      },
      roles: {
        title: '系統角色與資金流',
        rolesTitle: '角色',
        roles: [
          { name: '用戶/支持者', desc: '用 USDC 或代幣支持作品、參與互動與消費' },
          { name: '創作者/製作方', desc: '產出 AI 漫劇內容，按預算獲得製作資金' },
          { name: '平台方', desc: '運營產品、投流增長，維護協議參數與安全' },
          { name: '廣告主', desc: '為流量付費形成廣告收入' },
          { name: '協議國庫', desc: '承接募資與收入，按預算撥付' },
        ],
        flowTitle: '資金流',
        flows: [
          'ICO 募資資金（USDC）進入 Treasury',
          'Treasury 將資金按用途分配到多個預算金庫（Vault）',
          '增長投流消耗 Marketing Vault；內容製作消耗 Content Vault；社區運營消耗 Community Vault',
          '廣告收入進入 Treasury：50% 作為公司收入，50% 用於回購代幣，回購後再用於投流/生態激勵',
        ],
      },
      tokenomics: {
        title: '代幣與供應結構',
        params: {
          title: '基本參數',
          items: [
            { label: '總供應量', value: '固定', desc: '不可增發' },
            { label: '募資幣種', value: 'USDC', desc: '穩定幣' },
            { label: '目標', value: '供應紀律', desc: '國庫透明' },
          ],
        },
        distribution: {
          title: '分配結構',
          note: '注：Unlock Pool 中的代幣並非一次性釋放，而是受「里程碑 + 日釋放上限」雙重約束。',
          items: [
            { category: 'LP 啟動流動性', percent: '2%', usage: '建立主交易池流動性（LP 鎖倉）' },
            { category: 'ICO 公開募集', percent: '8%', usage: '分三輪募資' },
            { category: 'Unlock Pool', percent: '90%', usage: '按市值里程碑逐步解鎖' },
            { category: 'Reserve', percent: '≥50%', usage: '長期鎖定、降低無限稀釋風險' },
          ],
        },
      },
      ico: {
        title: 'ICO 募資規則',
        rounds: {
          title: '募資輪次',
          headers: ['輪次', '出售比例', '募資金額 (USDC)'],
          rows: [
            { round: 'R1', percent: '5%', amount: '50,000' },
            { round: 'R2', percent: '2%', amount: '40,000' },
            { round: 'R3', percent: '1%', amount: '40,000' },
          ],
          total: { label: '合計', percent: '8%', amount: '130,000' },
        },
        budget: {
          title: '募資資金用途（預算）',
          note: '所有募資資金進入 Treasury，並通過預算金庫（Vault）撥付，鏈上可追蹤。',
          items: [
            { usage: '精品內容製作', amount: '50,000', desc: '用於製作高質量內容資產' },
            { usage: 'TikTok 投流', amount: '40,000', desc: '用於增長投放（例如 5,000×8 批次）' },
            { usage: '社區建設', amount: '40,000', desc: '用於社區活動、激勵與運營' },
          ],
        },
      },
      fdv: {
        title: '市值與價格機制',
        intro: '本項目的解鎖與日釋放速率與 FDV（完全稀釋估值）相關。',
        definition: {
          title: 'FDV 定義',
          formula: 'FDV = TotalSupply × Price',
          note: '其中 Price 取時間加權平均價格（TWAP），而非瞬時價格，以降低操縱風險。',
        },
        oracle: {
          title: '價格來源（Oracle）',
          intro: '為減少「人為寫價」爭議，價格來源採用組合方案：',
          primary: { label: '主價格源', desc: 'DEX 主池 TWAP（官方指定交易池）' },
          secondary: { label: '二級校驗', desc: 'Oracle（例如 Pyth）用於異常過濾與備份校驗' },
          purpose: '目的：減少短期拉盤/砸盤導致的錯誤觸發解鎖，提升規則可信度。',
        },
      },
      unlock: {
        title: '市值里程碑解鎖機制',
        mechanism: {
          title: '機制概覽',
          desc: '當 FDV 達到預設檔位時，Unlock Pool 的一部分變為「可解鎖額度」。',
          warning: '注意：達到里程碑並不意味著可以一次性釋放全部額度，最終釋放仍受「每日釋放上限」限制。',
        },
        highWaterMark: {
          title: '高水位機制 (High-Water Mark)',
          rule: '市值解鎖只參考歷史最高 FDV（24h TWAP 平均值）',
          reason: '防止幣價短期回調導致程序停止釋放，引發社區恐慌。',
          note: '一旦解鎖權限獲得，即使幣價下跌，釋放權依然保留，但日釋放上限會因為 rate 的回升或 LP 的減小而自動調慢。',
        },
        milestones: {
          title: '敲定參數表：市值階梯與釋放速率',
          headers: ['市值階段 (FDV)', '累計可解鎖上限', '剩餘鎖倉', '日釋放速率', '邏輯說明'],
          rows: [
            { fdv: '<$5M', unlockable: '15% (含ICO)', locked: '85%', rate: '1.00%', logic: '早期需要流通量建立共識' },
            { fdv: '$5M - $20M', unlockable: '20%', locked: '80%', rate: '0.50%', logic: '價格上升，收緊釋放百分比' },
            { fdv: '$20M - $50M', unlockable: '30%', locked: '70%', rate: '0.33%', logic: '進入成長期，絕對金額增加' },
            { fdv: '$50M - $100M', unlockable: '40%', locked: '60%', rate: '0.25%', logic: '穩定期，極致防拋壓' },
            { fdv: '>$100M', unlockable: '50%', locked: '50%', rate: '0.20%', logic: '最終長期儲備形態' },
          ],
          note: '注：該表基於鎖倉比例 (85%...50%) 和 rate 設計。最終參數以鏈上配置為準。',
        },
      },
      dailyCap: {
        title: '每日釋放上限（日拋機制）',
        goals: {
          title: '設計目標',
          items: [
            '防止解鎖後短期集中釋放造成市場恐慌與價格崩塌',
            '將釋放節奏與項目體量（FDV）掛鈎，FDV 越高，釋放越保守',
            '使投流預算與市場承受能力更匹配',
          ],
        },
        executionFlow: {
          title: '執行流程',
          steps: [
            { step: '里程碑檢測', desc: '合約每 24 小時檢查一次過去 24 小時的 TWAP 折算的 FDV' },
            { step: '解鎖額度歸檔', desc: '如果 FDV 觸達新高（如從 $8M 漲到 $12M），系統自動將 unlockedRemaining 從 15% 提升至 20%' },
            { step: '計算當日額度', desc: '基礎額度 = 當前 FDV 檔位對應的 rate × TotalSupply' },
            { step: '安全校準', desc: '對比流動性池（LP）深度，確保拋壓不會瞬間擊穿盤面' },
            { step: '執行釋放', desc: '將計算出的額度從鎖定合約撥付給對應賬戶' },
          ],
        },
        formula: {
          title: '核心公式',
          intro: '每日從 Unlock Pool 釋放到 Treasury 的最大額度（dailyCap）定義為：',
          formula: 'dailyCap = min(unlockedRemaining, TotalSupply × rate, LP_depth × k)',
          params: [
            { name: 'unlockedRemaining', desc: '當前已達里程碑下，剩餘可釋放額度' },
            { name: 'TotalSupply × rate', desc: '按 FDV 分段決定的動態釋放比例' },
            { name: 'LP_depth × k', desc: '流動性安全係數，防止擊穿盤面' },
          ],
        },
        priority: {
          title: '「日拋」隊列優先級',
          intro: '當 dailyCap 額度生成後，釋放順序為：',
          items: [
            { order: '第一', name: '創作者激勵 (Content Vault)', reason: '優先保證生態生產力的活躍' },
            { order: '第二', name: 'ICO 投資者', reason: '兌現對早期支持者的承諾' },
            { order: '第三', name: '團隊/儲備', reason: '最後釋放，增強外部信心' },
          ],
        },
        cooldown: {
          title: '頻率限制與冷卻',
          items: [
            '每 24 小時僅允許執行一次釋放（cooldown）',
            '超頻執行直接失敗',
            '所有釋放事件鏈上記錄，用於 Dashboard 展示',
          ],
        },
      },
      treasury: {
        title: 'Treasury 與預算金庫',
        duties: {
          title: 'Treasury 的職責',
          items: [
            '接收 ICO 募資（USDC）',
            '接收 Unlock Pool 釋放來的代幣',
            '接收廣告收入（USDC）',
            '將資金按預算撥付到不同用途的 Vault',
          ],
        },
        vaults: {
          title: 'Vault 結構',
          items: [
            { name: 'Marketing Vault', purpose: '投流預算', color: 'blue' },
            { name: 'Content Vault', purpose: '內容製作', color: 'green' },
            { name: 'Community Vault', purpose: '社區建設', color: 'purple' },
          ],
        },
        transparency: {
          title: '撥付與透明度',
          items: [
            '每筆撥付可配置額度與審批門檻',
            '支持鏈上事件記錄與公開查詢',
            '配套 Dashboard：顯示餘額、撥付歷史與預算剩餘',
          ],
        },
      },
      reserve: {
        title: 'Reserve 與長期供應紀律',
        definition: {
          title: 'Reserve 的定義',
          intro: 'Reserve 是總供應量中最終長期保留的一部分，目標為：',
          target: '≥ 50%',
          targetNote: '（最低50%）',
          desc: '長期不進入市場流通',
        },
        methods: {
          title: '實施方式',
          hardLock: {
            title: '永久鎖死（Hard Lock）',
            desc: '寫入合約約束，永遠不可釋放',
            recommend: '✓ 推薦：對外需要強信任敘事時',
          },
          multisig: {
            title: '多簽 + Timelock 鎖定',
            desc: '可動用但需延遲與公開審批，強調可審計性',
            recommend: '✓ 推薦：需要長期運營彈性時',
          },
        },
      },
      liquidity: {
        title: '流動性啟動與鎖倉',
        launch: {
          title: 'LP 啟動',
          desc: '使用 2% 代幣 + USDC 建立官方主交易池（作為價格基準池）。',
        },
        lock: {
          title: 'LP 鎖倉',
          duration: '12 個月',
          durationNote: 'LP 資產鎖倉，以降低「撤池」風險。',
          requirements: '遷池/調整需滿足：',
          items: [
            '多簽批准',
            'Timelock 延遲',
            '公開鏈上記錄',
          ],
        },
      },
      buyback: {
        title: '廣告收入與回購飛輪',
        distribution: {
          title: '收入分配',
          intro: '廣告收入進入 Treasury 後按規則拆分：',
          company: { percent: '50%', label: '公司運營收入' },
          buyback: { percent: '50%', label: '回購預算' },
        },
        flywheel: {
          title: '回購飛輪聯動機制',
          desc: '廣告收入的 50% 用於回購。',
          highlight: '回購的代幣直接銷毀，或注入 Reserve 延長協議壽命。',
          mechanism: '這樣在「日拋」增加供應的同時，通過回購減少供應，形成動態博弈平衡。',
        },
        execution: {
          title: '回購執行',
          intro: '回購預算用於在市場上買回代幣，回購所得代幣用於：',
          uses: [
            '直接銷毀（減少總供應量）',
            '注入 Reserve（延長協議運營週期）',
          ],
          note: '回購執行可以先由中心化運營執行並鏈上公開記錄，後續再升級為鏈上自動執行器。',
        },
      },
      governance: {
        title: '治理與安全機制',
        multisig: {
          title: '多簽與權限',
          items: [
            'Treasury 與關鍵參數由多簽錢包控制',
            '關鍵操作（如遷池、參數升級）建議加 Timelock',
          ],
        },
        pause: {
          title: '緊急暫停',
          trigger: '出現異常（Oracle 異常、漏洞風險、市場攻擊）可觸發緊急暫停',
          effect: '暫停期間禁止釋放/關鍵轉賬，直到治理解除。',
        },
      },
      risks: {
        title: '風險披露',
        disclaimer: '本項目存在以下風險（不構成投資建議）：',
        items: [
          { type: '市場風險', desc: '價格波動、流動性不足' },
          { type: '預言機風險', desc: 'TWAP 與 Oracle 可能異常或延遲' },
          { type: '合約風險', desc: '潛在漏洞、升級風險' },
          { type: '運營風險', desc: '投流效果不確定、內容生產不穩定' },
          { type: '監管風險', desc: '不同地區對代幣與廣告結算監管不同' },
        ],
      },
      roadmap: {
        title: '路線圖',
        phases: [
          { phase: 'Phase 1', name: 'MVP', items: '解鎖池 + 日釋放上限 + Treasury 基礎金庫 + 價格源基礎版' },
          { phase: 'Phase 2', name: '募資與流動性', items: 'ICO 合約 + 多 Vault 分賬撥付 + LP 鎖倉' },
          { phase: 'Phase 3', name: '安全與自動化', items: '回購執行器 + 多池價格聚合 + 完整安全模塊（Timelock/Multisig/Pause）' },
          { phase: 'Phase 4', name: '去中心化', items: 'DAO 治理與參數升級流程完善' },
        ],
      },
      glossary: {
        title: '術語表',
        terms: [
          { term: 'FDV', full: 'Fully Diluted Valuation', desc: '完全稀釋估值 = 總供應量 × 價格' },
          { term: 'TWAP', full: 'Time-Weighted Average Price', desc: '時間加權平均價' },
          { term: 'High-Water Mark', desc: '高水位機制，解鎖參考歷史最高 FDV' },
          { term: 'Unlock Pool', desc: '鎖倉/解鎖池，儲存待釋放代幣的池' },
          { term: 'Treasury', desc: '國庫金庫，承接資金與預算撥付' },
          { term: 'Vault', desc: '用途金庫（投流/內容/社區）' },
          { term: 'LP', full: 'Liquidity Provider', desc: '流動性提供，交易池資金' },
          { term: 'Multisig', desc: '多簽錢包，多人共同授權' },
          { term: 'Timelock', desc: '延遲執行機制' },
          { term: 'Emergency Pause', desc: '緊急暫停機制' },
        ],
      },
    },
    footer: '© 2026 AI漫劇創投協議 · 本文檔僅供參考，不構成投資建議',
  },
};

export function getWhitepaperContent(lang: Language = 'en'): WhitepaperContent {
  return whitepaperContent[lang];
}

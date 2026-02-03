import type { Language } from './landing';

export interface DramaContent {
  detail: {
    back: string;
    seasonLabel: string;
    tokenomicsFunding: string;
    episodes: string;
    enterTheater: string;
    episode1: {
      label: string;
      title: string;
      description: string;
      demoBadge: string;
    };
    episode2: {
      label: string;
      unlocksAt: string;
    };
    activity: {
      title: string;
      connecting: string;
    };
  };
  hero: {
    liveCrowdfunding: string;
    aiTerminal: {
      line1: string;
      line2: string;
    };
    currentGoal: string;
    unlockEpisode2: string;
    milestone1: string;
    creator: string;
    cta: {
      interactiveDemo: string;
      enterTheater: string;
      investNow: string;
      fundEpisode2: string;
      storyTree: string;
      viewStoryTree: string;
    };
    stats: {
      marketCap: string;
      backers: string;
    };
  };
  funding: {
    roadmap: string;
    phase: string;
    milestones: {
      completedLabel: string;
      completedTitle: string;
      currentLabel: string;
      currentTitle: string;
      futureLabel: string;
      futureTitle: string;
    };
    perks: {
      title: string;
      items: string[];
      viewAll: string;
    };
    highlights: {
      marketCap: string;
      price: string;
      holders: string;
      devHolding: string;
    };
    bondingCurve: {
      title: string;
      progress: string;
      target: string;
    };
    topHolders: {
      title: string;
      devTag: string;
      noData: string;
    };
    risk: {
      title: string;
      rugProbability: string;
      levels: {
        low: string;
        medium: string;
        high: string;
      };
      liquidityLock: string;
      pending: string;
      mintAuthority: string;
      revoked: string;
    };
  };
  governance: {
    title: string;
    live: string;
    tabPlot: string;
    tabCast: string;
    proposalLabel: string;
    proposalTitle: string;
    proposalBody: string;
    endsIn: string;
    plotOptions: string[];
    voteRecorded: string;
    noCasting: string;
  };
  cast: {
    title: string;
    roles: {
      protagonist: string;
      antagonist: string;
      sidekick: string;
    };
    viewAll: string;
  };
  related: {
    title: string;
    mcapLabel: string;
    mcapSuffix: string;
  };
  tree: {
    loading: string;
    title: string;
    legend: {
      main: string;
      side: string;
      hot: string;
    };
    depthLabel: string;
    visitsLabel: string;
    branchesLabel: string;
    panelTitle: string;
    scriptLabel: string;
    visitsCount: string;
    branchesCount: string;
    temperature: string;
    assets: string;
    role: string;
    scene: string;
    continueFromNode: string;
    stats: {
      nodes: string;
      connections: string;
      depth: string;
    };
    clickHint: string;
    enterTheater: string;
  };
}

export const dramaContent: Record<Language, DramaContent> = {
  'en': {
    detail: {
      back: 'Back',
      seasonLabel: 'Season 1',
      tokenomicsFunding: 'Tokenomics & Funding',
      episodes: 'Episodes',
      enterTheater: 'Enter Interactive Theater',
      episode1: {
        label: 'Episode 1 • Interactive',
        title: 'Opening: Neon Rain Night',
        description: 'Click to enter the storyboard theater and experience the interactive plot.',
        demoBadge: '✓ Demo Available',
      },
      episode2: {
        label: 'Episode 2',
        unlocksAt: 'Unlocks at {mcap} ETH MCAP',
      },
      activity: {
        title: 'Live Activity',
        connecting: '[Activity stream connecting...]',
      },
    },
    hero: {
      liveCrowdfunding: '🔴 Live Crowdfunding',
      aiTerminal: {
        line1: 'Generative_Model.stream(scene_024)...',
        line2: '"The code reveals a hidden transaction..."',
      },
      currentGoal: 'Current Goal',
      unlockEpisode2: 'Unlock Episode 2',
      milestone1: 'Milestone #1',
      creator: 'Creator',
      cta: {
        interactiveDemo: 'Interactive Demo',
        enterTheater: 'Enter Storyboard Theater',
        investNow: 'Invest Now',
        fundEpisode2: 'Fund Episode 2',
        storyTree: 'Story Tree',
        viewStoryTree: 'View Story Tree',
      },
      stats: {
        marketCap: 'Market Cap',
        backers: 'Backers',
      },
    },
    funding: {
      roadmap: 'Funding Roadmap',
      phase: 'Phase 1',
      milestones: {
        completedLabel: '10 ETH (Completed)',
        completedTitle: 'Establish Character Bible',
        currentLabel: '18 ETH (Current Goal)',
        currentTitle: 'Release Episode 2: The Twist',
        futureLabel: '50 ETH',
        futureTitle: 'Full Voiceover & Soundtrack',
      },
      perks: {
        title: '💎 Backer Perks',
        items: [
          'Vote on key plot decisions',
          'Name a background character (Top 10%)',
          'Early access to unreleased scenes',
        ],
        viewAll: 'View All Tiers',
      },
      highlights: {
        marketCap: 'Market Cap',
        price: 'Price',
        holders: 'Holders',
        devHolding: 'Dev Holding',
      },
      bondingCurve: {
        title: 'Bonding Curve',
        progress: 'Progress to DEX Listing',
        target: 'Target: {target}',
      },
      topHolders: {
        title: 'Top Holders',
        devTag: 'DEV',
        noData: 'No data available',
      },
      risk: {
        title: 'Risk Analysis',
        rugProbability: 'Rug Probability',
        levels: {
          low: 'Low',
          medium: 'Medium',
          high: 'High',
        },
        liquidityLock: 'Liquidity Lock',
        pending: 'Pending',
        mintAuthority: 'Mint Authority',
        revoked: 'Revoked',
      },
    },
    governance: {
      title: 'Governance',
      live: 'Live',
      tabPlot: 'Plot',
      tabCast: 'Cast',
      proposalLabel: 'Proposal #42',
      proposalTitle: 'Episode 3: The Fate of Dr. Xenon',
      proposalBody: 'Should Dr. Xenon survive the explosion or perish, changing the timeline forever?',
      endsIn: 'Ends in: 14h 20m',
      plotOptions: [
        'Kill the villain in Ep 3',
        'Redeem the villain',
      ],
      voteRecorded: '✓ Your vote has been recorded on-chain',
      noCasting: 'No casting calls active right now.',
    },
    cast: {
      title: 'AI Cast',
      roles: {
        protagonist: 'Protagonist',
        antagonist: 'Antagonist',
        sidekick: 'Sidekick',
      },
      viewAll: 'View All Actors',
    },
    related: {
      title: 'More Like This',
      mcapLabel: 'MCap:',
      mcapSuffix: 'E',
    },
    tree: {
      loading: 'Building the story tree...',
      title: 'Story Tree',
      legend: {
        main: 'Main storyline',
        side: 'Side branches',
        hot: 'Hot nodes',
      },
      depthLabel: 'Act {depth}',
      visitsLabel: '👁 {count}',
      branchesLabel: '🌿 {count} branches',
      panelTitle: 'Node Details',
      scriptLabel: 'Storyboard Script',
      visitsCount: 'Visits',
      branchesCount: 'Next Branches',
      temperature: 'Temperature',
      assets: 'Assets Used',
      role: 'Role',
      scene: 'Scene',
      continueFromNode: 'Continue from this node →',
      stats: {
        nodes: 'Story Nodes',
        connections: 'Branch Connections',
        depth: 'Story Depth',
      },
      clickHint: 'Click a node to view details',
      enterTheater: 'Enter Theater',
    },
  },
  'zh-CN': {
    detail: {
      back: '返回',
      seasonLabel: '第 1 季',
      tokenomicsFunding: '代币经济与融资',
      episodes: '剧集',
      enterTheater: '进入互动剧场',
      episode1: {
        label: '第 1 集 • 可互动',
        title: '开篇：霓虹雨夜',
        description: '点击进入分镜剧场体验互动剧情。',
        demoBadge: '✓ Demo 可用',
      },
      episode2: {
        label: '第 2 集',
        unlocksAt: '市值达到 {mcap} ETH 解锁',
      },
      activity: {
        title: '实时动态',
        connecting: '[活动流连接中...]',
      },
    },
    hero: {
      liveCrowdfunding: '🔴 众筹直播',
      aiTerminal: {
        line1: 'Generative_Model.stream(scene_024)...',
        line2: '「代码揭示了隐藏的交易……」',
      },
      currentGoal: '当前目标',
      unlockEpisode2: '解锁第 2 集',
      milestone1: '里程碑 #1',
      creator: '创作者',
      cta: {
        interactiveDemo: '互动演示',
        enterTheater: '进入分镜剧场',
        investNow: '立即投资',
        fundEpisode2: '资助第 2 集',
        storyTree: '故事树',
        viewStoryTree: '查看故事树',
      },
      stats: {
        marketCap: '市值',
        backers: '支持者',
      },
    },
    funding: {
      roadmap: '融资路线图',
      phase: '阶段 1',
      milestones: {
        completedLabel: '10 ETH（已完成）',
        completedTitle: '建立角色设定集',
        currentLabel: '18 ETH（当前目标）',
        currentTitle: '发布第 2 集：反转',
        futureLabel: '50 ETH',
        futureTitle: '完整配音与配乐',
      },
      perks: {
        title: '💎 支持者权益',
        items: [
          '投票决定关键剧情走向',
          '为背景角色命名（前 10%）',
          '抢先观看未发布片段',
        ],
        viewAll: '查看全部等级',
      },
      highlights: {
        marketCap: '市值',
        price: '价格',
        holders: '持有人',
        devHolding: '开发者持有',
      },
      bondingCurve: {
        title: '联合曲线',
        progress: 'DEX 上线进度',
        target: '目标：{target}',
      },
      topHolders: {
        title: '大户持仓',
        devTag: '开发',
        noData: '暂无数据',
      },
      risk: {
        title: '风险分析',
        rugProbability: '跑路概率',
        levels: {
          low: '低',
          medium: '中',
          high: '高',
        },
        liquidityLock: '流动性锁定',
        pending: '进行中',
        mintAuthority: '铸造权限',
        revoked: '已撤销',
      },
    },
    governance: {
      title: '治理',
      live: '进行中',
      tabPlot: '剧情',
      tabCast: '选角',
      proposalLabel: '提案 #42',
      proposalTitle: '第 3 集：泽农博士的命运',
      proposalBody: '泽农博士应当在爆炸中幸存，还是牺牲以改写时间线？',
      endsIn: '截止：14 小时 20 分',
      plotOptions: [
        '第 3 集杀死反派',
        '赎回反派',
      ],
      voteRecorded: '✓ 你的投票已上链记录',
      noCasting: '当前暂无选角活动。',
    },
    cast: {
      title: 'AI 演员阵容',
      roles: {
        protagonist: '主角',
        antagonist: '反派',
        sidekick: '搭档',
      },
      viewAll: '查看全部演员',
    },
    related: {
      title: '相似推荐',
      mcapLabel: '市值：',
      mcapSuffix: 'E',
    },
    tree: {
      loading: '正在构建故事树...',
      title: '故事树',
      legend: {
        main: '主线剧情',
        side: '支线分支',
        hot: '热门节点',
      },
      depthLabel: '第 {depth} 幕',
      visitsLabel: '👁 {count}',
      branchesLabel: '🌿 {count} 分支',
      panelTitle: '节点详情',
      scriptLabel: '分镜脚本',
      visitsCount: '访问次数',
      branchesCount: '后续分支',
      temperature: '热度',
      assets: '使用的资产',
      role: '角色',
      scene: '场景',
      continueFromNode: '从此节点继续 →',
      stats: {
        nodes: '故事节点',
        connections: '分支连接',
        depth: '故事深度',
      },
      clickHint: '点击节点查看详情',
      enterTheater: '进入剧场',
    },
  },
  'zh-TW': {
    detail: {
      back: '返回',
      seasonLabel: '第 1 季',
      tokenomicsFunding: '代幣經濟與融資',
      episodes: '劇集',
      enterTheater: '進入互動劇場',
      episode1: {
        label: '第 1 集 • 可互動',
        title: '開篇：霓虹雨夜',
        description: '點擊進入分鏡劇場體驗互動劇情。',
        demoBadge: '✓ Demo 可用',
      },
      episode2: {
        label: '第 2 集',
        unlocksAt: '市值達到 {mcap} ETH 解鎖',
      },
      activity: {
        title: '即時動態',
        connecting: '[活動流連線中...]',
      },
    },
    hero: {
      liveCrowdfunding: '🔴 眾籌直播',
      aiTerminal: {
        line1: 'Generative_Model.stream(scene_024)...',
        line2: '「程式碼揭示了隱藏的交易……」',
      },
      currentGoal: '目前目標',
      unlockEpisode2: '解鎖第 2 集',
      milestone1: '里程碑 #1',
      creator: '創作者',
      cta: {
        interactiveDemo: '互動示範',
        enterTheater: '進入分鏡劇場',
        investNow: '立即投資',
        fundEpisode2: '資助第 2 集',
        storyTree: '故事樹',
        viewStoryTree: '查看故事樹',
      },
      stats: {
        marketCap: '市值',
        backers: '支持者',
      },
    },
    funding: {
      roadmap: '融資路線圖',
      phase: '階段 1',
      milestones: {
        completedLabel: '10 ETH（已完成）',
        completedTitle: '建立角色設定集',
        currentLabel: '18 ETH（目前目標）',
        currentTitle: '發布第 2 集：反轉',
        futureLabel: '50 ETH',
        futureTitle: '完整配音與配樂',
      },
      perks: {
        title: '💎 支持者權益',
        items: [
          '投票決定關鍵劇情走向',
          '為背景角色命名（前 10%）',
          '搶先觀看未發布片段',
        ],
        viewAll: '查看全部等級',
      },
      highlights: {
        marketCap: '市值',
        price: '價格',
        holders: '持有人',
        devHolding: '開發者持有',
      },
      bondingCurve: {
        title: '聯合曲線',
        progress: 'DEX 上線進度',
        target: '目標：{target}',
      },
      topHolders: {
        title: '大戶持倉',
        devTag: '開發',
        noData: '暫無資料',
      },
      risk: {
        title: '風險分析',
        rugProbability: '跑路機率',
        levels: {
          low: '低',
          medium: '中',
          high: '高',
        },
        liquidityLock: '流動性鎖定',
        pending: '進行中',
        mintAuthority: '鑄造權限',
        revoked: '已撤銷',
      },
    },
    governance: {
      title: '治理',
      live: '進行中',
      tabPlot: '劇情',
      tabCast: '選角',
      proposalLabel: '提案 #42',
      proposalTitle: '第 3 集：澤農博士的命運',
      proposalBody: '澤農博士應該在爆炸中倖存，還是犧牲以改寫時間線？',
      endsIn: '截止：14 小時 20 分',
      plotOptions: [
        '第 3 集殺死反派',
        '贖回反派',
      ],
      voteRecorded: '✓ 你的投票已上鏈記錄',
      noCasting: '目前沒有選角活動。',
    },
    cast: {
      title: 'AI 演員陣容',
      roles: {
        protagonist: '主角',
        antagonist: '反派',
        sidekick: '搭檔',
      },
      viewAll: '查看全部演員',
    },
    related: {
      title: '相似推薦',
      mcapLabel: '市值：',
      mcapSuffix: 'E',
    },
    tree: {
      loading: '正在建立故事樹...',
      title: '故事樹',
      legend: {
        main: '主線劇情',
        side: '支線分支',
        hot: '熱門節點',
      },
      depthLabel: '第 {depth} 幕',
      visitsLabel: '👁 {count}',
      branchesLabel: '🌿 {count} 分支',
      panelTitle: '節點詳情',
      scriptLabel: '分鏡腳本',
      visitsCount: '訪問次數',
      branchesCount: '後續分支',
      temperature: '熱度',
      assets: '使用的資產',
      role: '角色',
      scene: '場景',
      continueFromNode: '從此節點繼續 →',
      stats: {
        nodes: '故事節點',
        connections: '分支連接',
        depth: '故事深度',
      },
      clickHint: '點擊節點查看詳情',
      enterTheater: '進入劇場',
    },
  },
};

export function getDramaContent(lang: Language = 'en'): DramaContent {
  return dramaContent[lang];
}

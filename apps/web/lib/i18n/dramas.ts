export type Language = 'en' | 'zh';

export interface DramasContent {
  header: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    createProject: string;
    connectWallet: string;
  };
  stats: {
    totalRaised: string;
    activeProjects: string;
    creators: string;
    totalFrames: string;
  };
  kingOfHill: {
    badge: string;
    currentGoal: string;
    raisedLabel: string;
    goalLabel: string;
    enterTheater: string;
    supportProject: string;
    viewStoryTree: string;
    holders: string;
    marketCap: string;
    curve: string;
    devHold: string;
    topHolders: string;
    devTag: string;
  };
  categories: {
    all: string;
    meme: string;
    scifi: string;
    suspense: string;
    adventure: string;
    history: string;
    documentary: string;
  };
  sort: {
    label: string;
    hot: string;
    marketcap: string;
    new: string;
  };
  card: {
    graduating: string;
    highRisk: string;
    bondingCurve: string;
    raised: string;
    goal: string;
    holders: string;
    mcap: string;
    price: string;
    enterTheater: string;
    trade: string;
    dev: string;
  };
  aiStatus: {
    idle: string;
    scripting: string;
    casting: string;
    filming: string;
    editing: string;
  };
  risk: {
    low: string;
    medium: string;
    high: string;
  };
  modal: {
    close: string;
    buy: string;
    sell: string;
    amount: string;
    max: string;
    receive: string;
    fee: string;
    placeTrade: string;
    sellTokens: string;
    recentTrades: string;
    noTrades: string;
    buyAction: string;
    sellAction: string;
    ago: string;
    topHolders: string;
    bondingProgress: string;
    target: string;
    devHolding: string;
    rugRisk: string;
    enterTheater: string;
    viewDetails: string;
  };
  cta: {
    title: string;
    description: string;
    startCreating: string;
    readWhitepaper: string;
  };
  empty: string;
}

const content: Record<Language, DramasContent> = {
  en: {
    header: {
      badge: 'Live · AI Drama Launchpad',
      title: 'Drama.fun',
      subtitle: 'AI-Powered Interactive Drama Crowdfunding · Support Stories You Love',
      searchPlaceholder: 'Search projects...',
      createProject: 'Create Project',
      connectWallet: 'Connect Wallet',
    },
    stats: {
      totalRaised: 'Total Raised',
      activeProjects: 'Active Projects',
      creators: 'Creators',
      totalFrames: 'Total Frames',
    },
    kingOfHill: {
      badge: '👑 King of the Hill',
      currentGoal: 'Current Goal',
      raisedLabel: 'raised',
      goalLabel: 'Goal',
      enterTheater: '🎬 Enter Theater',
      supportProject: '💰 Support',
      viewStoryTree: '🌳 Story Tree',
      holders: 'Holders',
      marketCap: 'Market Cap',
      curve: 'Curve',
      devHold: 'Dev Hold',
      topHolders: 'Top Holders',
      devTag: 'DEV',
    },
    categories: {
      all: 'All',
      meme: 'Meme',
      scifi: 'Sci-Fi',
      suspense: 'Suspense',
      adventure: 'Adventure',
      history: 'History',
      documentary: 'Documentary',
    },
    sort: {
      label: 'Sort:',
      hot: '🔥 Hot',
      marketcap: '💰 Mcap',
      new: '✨ New',
    },
    card: {
      graduating: '🔥 Graduating Soon',
      highRisk: '🚩 High Risk',
      bondingCurve: 'Bonding Curve',
      raised: 'raised',
      goal: 'Goal',
      holders: 'Holders',
      mcap: 'Mcap',
      price: 'Price',
      enterTheater: 'Enter Theater →',
      trade: 'Trade',
      dev: 'Dev',
    },
    aiStatus: {
      idle: 'Idle',
      scripting: 'Scripting',
      casting: 'Casting',
      filming: 'Filming',
      editing: 'Editing',
    },
    risk: {
      low: 'Low Risk',
      medium: 'Medium Risk',
      high: 'High Risk',
    },
    modal: {
      close: 'Close',
      buy: 'Buy',
      sell: 'Sell',
      amount: 'Amount',
      max: 'Max',
      receive: 'Receive (Est.)',
      fee: 'Fee',
      placeTrade: 'PLACE TRADE',
      sellTokens: 'SELL TOKENS',
      recentTrades: 'Recent Trades',
      noTrades: 'No trades yet',
      buyAction: 'bought',
      sellAction: 'sold',
      ago: 'ago',
      topHolders: 'Top Holders',
      bondingProgress: 'Bonding Progress',
      target: 'Target',
      devHolding: 'Dev Holding',
      rugRisk: 'Rug Risk',
      enterTheater: 'Enter Theater',
      viewDetails: 'View Details',
    },
    cta: {
      title: 'Ready to create your AI drama?',
      description: 'Join our creator community, use AI tools to generate storyboards, let viewers vote on plot directions',
      startCreating: 'Start Creating →',
      readWhitepaper: 'Read Whitepaper',
    },
    empty: 'No matching projects found',
  },
  zh: {
    header: {
      badge: 'Live · AI 漫剧发射台',
      title: 'Drama.fun',
      subtitle: 'AI 驱动的互动漫剧众筹平台 · 支持你喜欢的故事',
      searchPlaceholder: '搜索项目...',
      createProject: '创建项目',
      connectWallet: '连接钱包',
    },
    stats: {
      totalRaised: '总募资额',
      activeProjects: '活跃项目',
      creators: '创作者',
      totalFrames: '分镜总数',
    },
    kingOfHill: {
      badge: '👑 山丘之王',
      currentGoal: '当前目标',
      raisedLabel: '已募集',
      goalLabel: '目标',
      enterTheater: '🎬 进入分镜剧场',
      supportProject: '💰 支持项目',
      viewStoryTree: '🌳 查看故事树',
      holders: '持有者',
      marketCap: '市值',
      curve: '曲线进度',
      devHold: '开发者持仓',
      topHolders: '前排持有者',
      devTag: '开发者',
    },
    categories: {
      all: '全部',
      meme: 'Meme',
      scifi: '科幻',
      suspense: '悬疑',
      adventure: '冒险',
      history: '历史',
      documentary: '纪录',
    },
    sort: {
      label: '排序:',
      hot: '🔥 热门',
      marketcap: '💰 市值',
      new: '✨ 最新',
    },
    card: {
      graduating: '🔥 即将毕业',
      highRisk: '🚩 高风险',
      bondingCurve: 'Bonding Curve',
      raised: '已募集',
      goal: '目标',
      holders: '持有者',
      mcap: '市值',
      price: '价格',
      enterTheater: '进入剧场 →',
      trade: '交易',
      dev: '开发者',
    },
    aiStatus: {
      idle: '待机中',
      scripting: '剧本生成',
      casting: '角色选角',
      filming: '分镜渲染',
      editing: '后期剪辑',
    },
    risk: {
      low: '低风险',
      medium: '中风险',
      high: '高风险',
    },
    modal: {
      close: '关闭',
      buy: '买入',
      sell: '卖出',
      amount: '数量',
      max: '最大',
      receive: '预计获得',
      fee: '手续费',
      placeTrade: '确认交易',
      sellTokens: '卖出代币',
      recentTrades: '最近交易',
      noTrades: '暂无交易记录',
      buyAction: '买入了',
      sellAction: '卖出了',
      ago: '前',
      topHolders: '前排持有者',
      bondingProgress: '曲线进度',
      target: '目标',
      devHolding: '开发者持仓',
      rugRisk: 'Rug 风险',
      enterTheater: '进入剧场',
      viewDetails: '查看详情',
    },
    cta: {
      title: '准备好创作你的 AI 漫剧了吗？',
      description: '加入我们的创作者社区，使用 AI 工具生成分镜，让观众投票决定剧情走向',
      startCreating: '开始创建 →',
      readWhitepaper: '阅读白皮书',
    },
    empty: '没有找到匹配的项目',
  },
};

export function getDramasContent(language: Language): DramasContent {
  return content[language] || content.en;
}


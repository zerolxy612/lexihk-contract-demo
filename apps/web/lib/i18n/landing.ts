export type Language = 'en' | 'zh-CN' | 'zh-TW';

export interface LandingContent {
  header: {
    signIn: string;
    protocol: string;
    launchApp: string;
  };
  auth: {
    signIn: {
      title: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      forgotPassword: string;
      signInButton: string;
      orDivider: string;
      continueWithApple: string;
      continueWithGoogle: string;
      noAccount: string;
      signUp: string;
    };
    signUp: {
      title: string;
      usernameLabel: string;
      usernamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      continueButton: string;
      orDivider: string;
      continueWithApple: string;
      continueWithGoogle: string;
      haveAccount: string;
      signIn: string;
    };
  };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    description: string;
    manifestoTitle: string;
    manifestoBody: string;
    cta: {
      play: string;
      whitepaper: string;
      agentNode: string;
    };
    chips: string[];
    stats: {
      chapters: string;
      collectors: string;
      agents: string;
      split: string;
    };
  };
  manifesto: {
    sectionTag: string;
    title: string;
    paragraphs: string[];
    chips: string[];
    dashboard: {
      title: string;
      stats: {
        ubi: string;
        split: string;
        agents: string;
        cycles: string;
      };
      cards: {
        interaction: {
          title: string;
          body: string;
        };
        revenue: {
          title: string;
          body: string;
        };
      };
    };
  };
  perks: {
    dynamic: {
      accent: string;
      title: string;
      body: string;
    };
    revenue: {
      accent: string;
      title: string;
      body: string;
    };
    wallet: {
      accent: string;
      title: string;
      body: string;
    };
  };
  chapters: {
    tag: string;
    title: string;
    browseAll: string;
  };
  flow: {
    tag: string;
    title: string;
    steps: string[];
    features: {
      zk: string;
      multichain: string;
    };
  };
  launchpad: {
    tag: string;
    title: string;
    steps: string[];
    cta: {
      connect: string;
      mint: string;
    };
  };
  testimonials: {
    tag: string;
    title: string;
    items: Array<{
      quote: string;
      author: string;
      role: string;
      avatar: string;
    }>;
  };
  partners: {
    tag: string;
    title: string;
    subtitle: string;
  };
  roadmap: {
    tag: string;
    title: string;
    phases: Array<{
      quarter: string;
      title: string;
      items: string[];
      status: string;
    }>;
  };
  faq: {
    tag: string;
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    tag: string;
    title: string;
    subtitle: string;
    button: string;
  };
}

export const landingContent: Record<Language, LandingContent> = {
  'en': {
    header: {
      signIn: 'Sign In',
      protocol: 'Protocol',
      launchApp: 'Launch App',
    },
    auth: {
      signIn: {
        title: 'Sign In',
        emailLabel: 'Email address',
        emailPlaceholder: 'adelia.larsson@mail.com',
        passwordLabel: 'Password',
        passwordPlaceholder: '••••••',
        forgotPassword: 'Forgot Password?',
        signInButton: 'Sign In',
        orDivider: 'OR',
        continueWithApple: 'Continue with Apple',
        continueWithGoogle: 'Continue with Google',
        noAccount: "Don't have an account?",
        signUp: 'Sign Up',
      },
      signUp: {
        title: 'Create an Account',
        usernameLabel: 'Username',
        usernamePlaceholder: 'Adelia Larsson',
        emailLabel: 'Email address',
        emailPlaceholder: 'adelia.larsson@mail.com',
        passwordLabel: 'Password',
        passwordPlaceholder: '••••••••',
        continueButton: 'Continue',
        orDivider: 'OR',
        continueWithApple: 'Continue with Apple',
        continueWithGoogle: 'Continue with Google',
        haveAccount: 'Already have an account?',
        signIn: 'Sign In',
      },
    },
    hero: {
      tagline: 'Interactive Drama OS · x402 Protocol',
      title: 'Interactive Motion Manga',
      subtitle: 'Agent Economy · Powered by AIGC',
      description: 'AI-generated interactive dramas with on-chain revenue sharing. Watch, interact, and earn—your wallet is your player. Seamless experience across mobile and web.',
      manifestoTitle: 'The x402 Manifesto',
      manifestoBody: 'x402 protocol is building an autonomous agent economy. As AI agents collaborate to create content, viewers earn Universal Basic Income (UBI) from the value they help create through engagement.',
      cta: {
        play: 'Start Watching',
        whitepaper: 'Read Whitepaper',
        agentNode: 'Join Agent Network',
      },
      chips: ['On-chain Chapters', 'Agent Co-creation', 'Viewer UBI'],
      stats: {
        chapters: 'Chapters minted',
        collectors: 'Collectors',
        agents: 'Agent nodes',
        split: 'Avg. split',
      },
    },
    manifesto: {
      sectionTag: 'Manifesto',
      title: 'The x402 Agent Economy · Interactive Drama Manifesto',
      paragraphs: [
        'x402 protocol enables an autonomous agent economy—a self-sustaining content production machine powered by AI collaboration.',
        'This new economy generates continuous revenue streams. Viewers earn UBI as they watch, with all revenue distributed transparently on-chain.',
        'We\'re rebuilding the value system: human engagement in content consumption becomes value creation. Every interaction, co-creation, and comment generates rewards.',
        'Interactive motion manga is our medium—every click drives the next frame of story and the next cycle of the economy.',
      ],
      chips: ['Agent Economy', 'AI Co-production', 'Viewer UBI', 'Interactive Drama'],
      dashboard: {
        title: 'Agent economy dashboard',
        stats: {
          ubi: 'UBI / viewer',
          split: 'Revenue split',
          agents: 'Live agents',
          cycles: 'Cycles / day',
        },
        cards: {
          interaction: {
            title: 'Engagement = Mining',
            body: 'Watch, comment, vote—all interactions are recorded on-chain. Agents use these signals to generate new story branches, with revenue flowing automatically.',
          },
          revenue: {
            title: 'Fans-First Revenue',
            body: 'Four-way split: Agents, AI models, creators, and viewers. All revenue flows are traceable on-chain.',
          },
        },
      },
    },
    perks: {
      dynamic: {
        accent: 'Dynamic NFT chapters',
        title: 'On-chain Dynamic Episodes',
        body: 'Every episode is an upgradable NFT. Story branches and endings are written on-chain, permanently verifiable.',
      },
      revenue: {
        accent: 'Revenue splits',
        title: 'Agent Revenue Sharing',
        body: 'Watch, interact, remix—all activities earn revenue. Automatic splits between AI models, creators, and viewers.',
      },
      wallet: {
        accent: 'Wallet-native UX',
        title: 'Your Wallet is Your Player',
        body: 'No login required. Connect wallet to play. Progress syncs across devices. Gasless airdrops and ending cards.',
      },
    },
    chapters: {
      tag: 'Chapter rail',
      title: 'Interactive Drama · Start Watching',
      browseAll: 'Browse All →',
    },
    flow: {
      tag: 'Flow',
      title: 'Web3 × AIGC × Agent · Production Pipeline',
      steps: [
        'AIGC generates storyboards → verified and recorded by x402 protocol',
        'Agents collaborate to create multiple endings, viewers vote on branches',
        'Each ending can be minted, traded, and earn revenue; remixing enabled',
        'Cross-wallet progress sync, mobile and web support',
      ],
      features: {
        zk: 'zero knowledge proofs',
        multichain: 'L2 / sidechain',
      },
    },
    launchpad: {
      tag: 'Launchpad',
      title: 'One-Click Launch / Mint / Revenue Share',
      steps: [
        'Connect wallet, auto-generate screening room',
        'Upload or generate storyboards, AI soundtrack & subtitles',
        'Set revenue splits, fans claim instantly',
        'Issue collectible cards & unlock hidden endings',
      ],
      cta: {
        connect: 'Connect Wallet',
        mint: 'Start Minting',
      },
    },
    testimonials: {
      tag: 'Community',
      title: 'Loved by Creators & Viewers',
      items: [
        {
          quote: 'The first platform where my audience actually earns from watching. Revenue sharing changed everything.',
          author: 'Sarah Chen',
          role: 'Interactive Drama Creator',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        },
        {
          quote: 'I earned 0.3 ETH just by watching and voting on story branches. This is the future of entertainment.',
          author: 'Alex Rivera',
          role: 'Early Collector',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        },
        {
          quote: 'AI agents creating content 24/7 while I sleep. The agent economy is real and it\'s happening now.',
          author: 'Yuki Tanaka',
          role: 'Agent Node Operator',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        },
      ],
    },
    partners: {
      tag: 'Ecosystem',
      title: 'Powered by Leading Web3 Infrastructure',
      subtitle: 'Built on battle-tested protocols and supported by top-tier partners',
    },
    roadmap: {
      tag: 'Roadmap',
      title: 'Building the Future of Interactive Entertainment',
      phases: [
        {
          quarter: 'Q1 2024',
          title: 'Foundation',
          items: [
            'x402 Protocol Launch',
            'First Interactive Drama Series',
            'Agent Network Beta',
            'Revenue Sharing v1',
          ],
          status: 'Completed',
        },
        {
          quarter: 'Q2 2024',
          title: 'Expansion',
          items: [
            'Mobile App Launch',
            'Creator Launchpad',
            'Advanced Agent Collaboration',
            'Cross-chain Support',
          ],
          status: 'In Progress',
        },
        {
          quarter: 'Q3 2024',
          title: 'Scale',
          items: [
            'UBI Distribution System',
            'Marketplace for Episodes',
            'AI Model Marketplace',
            'DAO Governance',
          ],
          status: 'Planned',
        },
        {
          quarter: 'Q4 2024',
          title: 'Ecosystem',
          items: [
            'Third-party Creator Tools',
            'Agent SDK Release',
            'Global Expansion',
            'Enterprise Partnerships',
          ],
          status: 'Planned',
        },
      ],
    },
    faq: {
      tag: 'FAQ',
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What is x402 Protocol?',
          answer: 'x402 is an autonomous agent economy protocol that enables AI agents to collaborate on content creation while distributing revenue transparently to all participants—including viewers.',
        },
        {
          question: 'How do I earn UBI as a viewer?',
          answer: 'Simply watch interactive dramas, vote on story branches, and engage with content. Your wallet automatically receives revenue shares based on your participation.',
        },
        {
          question: 'Do I need cryptocurrency to start?',
          answer: 'No! You can start watching for free. We provide gasless transactions and airdrops for new users. You only need a wallet to receive earnings.',
        },
        {
          question: 'What makes this different from traditional streaming?',
          answer: 'Unlike traditional platforms where only creators earn, x402 distributes revenue to viewers, AI agents, and creators. Plus, you control the story through interactive choices.',
        },
        {
          question: 'Can I create my own interactive drama?',
          answer: 'Yes! Our Creator Launchpad lets anyone upload or AI-generate storyboards, set revenue splits, and launch their own interactive series.',
        },
        {
          question: 'What blockchain does x402 use?',
          answer: 'We support multiple chains including Ethereum L2s, Solana, and other EVM-compatible networks for maximum accessibility and low fees.',
        },
      ],
    },
    cta: {
      tag: 'Get Started',
      title: 'Ready to Experience the Future?',
      subtitle: 'Join thousands of viewers earning while watching. No credit card required.',
      button: 'Launch App Now',
    },
  },
  'zh-CN': {
    header: {
      signIn: '登录',
      protocol: '协议',
      launchApp: '启动应用',
    },
    auth: {
      signIn: {
        title: '登录',
        emailLabel: '邮箱地址',
        emailPlaceholder: 'adelia.larsson@mail.com',
        passwordLabel: '密码',
        passwordPlaceholder: '••••••',
        forgotPassword: '忘记密码？',
        signInButton: '登录',
        orDivider: '或',
        continueWithApple: '使用 Apple 继续',
        continueWithGoogle: '使用 Google 继续',
        noAccount: '还没有账号？',
        signUp: '注册',
      },
      signUp: {
        title: '创建账号',
        usernameLabel: '用户名',
        usernamePlaceholder: 'Adelia Larsson',
        emailLabel: '邮箱地址',
        emailPlaceholder: 'adelia.larsson@mail.com',
        passwordLabel: '密码',
        passwordPlaceholder: '••••••••',
        continueButton: '继续',
        orDivider: '或',
        continueWithApple: '使用 Apple 继续',
        continueWithGoogle: '使用 Google 继续',
        haveAccount: '已有账号？',
        signIn: '登录',
      },
    },
    hero: {
      tagline: '互动漫剧操作系统 · x402 协议',
      title: '互动漫剧',
      subtitle: 'Agent 经济体 · AIGC 驱动',
      description: 'AI 生成的互动短剧，链上收益自动分账。边看边赚，钱包即播放器。移动端与 Web 端无缝体验。',
      manifestoTitle: 'x402 宣言',
      manifestoBody: 'x402 协议正在构建自主运转的 agent 经济体。当 AI agents 协作创造内容时，观众通过参与互动获得全民基本收入（UBI），分享他们帮助创造的价值。',
      cta: {
        play: '立即观看',
        whitepaper: '查看白皮书',
        agentNode: '加入 Agent 网络',
      },
      chips: ['链上剧集', 'Agent 共创', '观众 UBI'],
      stats: {
        chapters: '已铸造剧集',
        collectors: '收藏者',
        agents: 'Agent 节点',
        split: '平均分成',
      },
    },
    manifesto: {
      sectionTag: '宣言',
      title: 'x402 Agent 经济体 · 互动漫剧宣言',
      paragraphs: [
        'x402 协议正在孵化自主运转的 agent 经济体——由 AI 协作驱动的内容生产机器。',
        '这个全新的经济体持续创造收入流。观众边看边获得 UBI，所有收益按链上规则透明分配。',
        '我们正在重构价值体系：人类参与内容消费本身就是价值创造。每一次互动、共创、评论都能获得回报。',
        '互动漫剧是我们的载体——你的每一次点击都在驱动下一帧故事、下一个经济循环。',
      ],
      chips: ['Agent 经济体', 'AI 协作生产', '观众 UBI', '互动漫剧'],
      dashboard: {
        title: 'Agent 经济体仪表盘',
        stats: {
          ubi: 'UBI / 观众',
          split: '收益分成',
          agents: '活跃 agents',
          cycles: '循环 / 天',
        },
        cards: {
          interaction: {
            title: '互动 = 挖矿',
            body: '观看、评论、投票——所有互动都被记录在链上。Agents 根据这些信号生成新的故事分支，收益自动流转。',
          },
          revenue: {
            title: '粉丝优先分润',
            body: '四方拆分：Agents、AI 模型、创作者、观众。所有收益流向链上可追溯。',
          },
        },
      },
    },
    perks: {
      dynamic: {
        accent: '动态 NFT 剧集',
        title: '链上动态剧集',
        body: '每一集都是可更新的 NFT，剧情分支、结局追加都写入链上，永久可验证。',
      },
      revenue: {
        accent: '收益分账',
        title: 'Agent 收益分账',
        body: '观看、互动、二创都能被计入收益，模型、创作者与观众自动拆分收益。',
      },
      wallet: {
        accent: '钱包原生体验',
        title: '钱包即播放器',
        body: '无需登录，钱包直连播放。跨端同步进度，Gasless 领取空投与结局卡。',
      },
    },
    chapters: {
      tag: '剧集列表',
      title: '互动漫剧 · 立即开播',
      browseAll: '浏览全部 →',
    },
    flow: {
      tag: '流程',
      title: 'Web3 × AIGC × Agent · 发行流水线',
      steps: [
        'AIGC 生成分镜 → 由 x402 协议验证并上链',
        'Agent 协作生成多结局，观众投票选择分支',
        '每个结局可被铸造、交易、分润；可继续二创',
        '跨钱包播放进度同步，支持移动端 / Web 双端',
      ],
      features: {
        zk: '零知识证明',
        multichain: 'L2 / 侧链',
      },
    },
    launchpad: {
      tag: '发射台',
      title: '一键开播 / 铸造 / 分润',
      steps: [
        '连接钱包，自动生成放映室',
        '上传或生成分镜，AI 配乐与字幕',
        '设置收益拆分，粉丝即时领取',
        '发行收藏卡 & 解锁隐藏结局',
      ],
      cta: {
        connect: '连接钱包',
        mint: '开始铸造',
      },
    },
    testimonials: {
      tag: '社区',
      title: '深受创作者与观众喜爱',
      items: [
        {
          quote: '第一个让我的观众真正从观看中获益的平台。收益分享改变了一切。',
          author: 'Sarah Chen',
          role: '互动剧创作者',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        },
        {
          quote: '仅通过观看和投票故事分支就赚了 0.3 ETH。这就是娱乐的未来。',
          author: 'Alex Rivera',
          role: '早期收藏者',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        },
        {
          quote: 'AI agents 24/7 创作内容，我睡觉时也在赚钱。Agent 经济体是真实存在的。',
          author: 'Yuki Tanaka',
          role: 'Agent 节点运营者',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        },
      ],
    },
    partners: {
      tag: '生态',
      title: '由领先的 Web3 基础设施驱动',
      subtitle: '基于久经考验的协议构建，获得顶级合作伙伴支持',
    },
    roadmap: {
      tag: '路线图',
      title: '构建互动娱乐的未来',
      phases: [
        {
          quarter: '2024 Q1',
          title: '基础建设',
          items: [
            'x402 协议上线',
            '首个互动剧系列',
            'Agent 网络测试版',
            '收益分享 v1',
          ],
          status: '已完成',
        },
        {
          quarter: '2024 Q2',
          title: '扩展',
          items: [
            '移动端应用上线',
            '创作者发射台',
            '高级 Agent 协作',
            '跨链支持',
          ],
          status: '进行中',
        },
        {
          quarter: '2024 Q3',
          title: '规模化',
          items: [
            'UBI 分发系统',
            '剧集交易市场',
            'AI 模型市场',
            'DAO 治理',
          ],
          status: '计划中',
        },
        {
          quarter: '2024 Q4',
          title: '生态系统',
          items: [
            '第三方创作工具',
            'Agent SDK 发布',
            '全球扩张',
            '企业合作',
          ],
          status: '计划中',
        },
      ],
    },
    faq: {
      tag: '常见问题',
      title: '常见问题解答',
      items: [
        {
          question: '什么是 x402 协议？',
          answer: 'x402 是一个自主运转的 agent 经济体协议，使 AI agents 能够协作创作内容，同时将收益透明地分配给所有参与者——包括观众。',
        },
        {
          question: '作为观众如何获得 UBI？',
          answer: '只需观看互动剧、投票选择故事分支并参与互动。你的钱包会根据参与度自动收到收益分成。',
        },
        {
          question: '开始使用需要加密货币吗？',
          answer: '不需要！你可以免费开始观看。我们为新用户提供无 Gas 交易和空投。你只需要一个钱包来接收收益。',
        },
        {
          question: '这与传统流媒体有什么不同？',
          answer: '与只有创作者赚钱的传统平台不同，x402 将收益分配给观众、AI agents 和创作者。此外，你可以通过互动选择来控制故事走向。',
        },
        {
          question: '我可以创建自己的互动剧吗？',
          answer: '可以！我们的创作者发射台让任何人都能上传或 AI 生成分镜，设置收益分成，并推出自己的互动系列。',
        },
        {
          question: 'x402 使用什么区块链？',
          answer: '我们支持多条链，包括以太坊 L2、Solana 和其他 EVM 兼容网络，以实现最大的可访问性和低费用。',
        },
      ],
    },
    cta: {
      tag: '立即开始',
      title: '准备好体验未来了吗？',
      subtitle: '加入数千名边看边赚的观众。无需信用卡。',
      button: '立即启动应用',
    },
  },
  'zh-TW': {
    header: {
      signIn: '登入',
      protocol: '協議',
      launchApp: '啟動應用',
    },
    auth: {
      signIn: {
        title: '登入',
        emailLabel: '郵箱地址',
        emailPlaceholder: 'adelia.larsson@mail.com',
        passwordLabel: '密碼',
        passwordPlaceholder: '••••••',
        forgotPassword: '忘記密碼？',
        signInButton: '登入',
        orDivider: '或',
        continueWithApple: '使用 Apple 繼續',
        continueWithGoogle: '使用 Google 繼續',
        noAccount: '還沒有帳號？',
        signUp: '註冊',
      },
      signUp: {
        title: '創建帳號',
        usernameLabel: '用戶名',
        usernamePlaceholder: 'Adelia Larsson',
        emailLabel: '郵箱地址',
        emailPlaceholder: 'adelia.larsson@mail.com',
        passwordLabel: '密碼',
        passwordPlaceholder: '••••••••',
        continueButton: '繼續',
        orDivider: '或',
        continueWithApple: '使用 Apple 繼續',
        continueWithGoogle: '使用 Google 繼續',
        haveAccount: '已有帳號？',
        signIn: '登入',
      },
    },
    hero: {
      tagline: '互動漫劇作業系統 · x402 協議',
      title: '互動漫劇',
      subtitle: 'Agent 經濟體 · AIGC 驅動',
      description: 'AI 生成的互動短劇，鏈上收益自動分帳。邊看邊賺，錢包即播放器。移動端與 Web 端無縫體驗。',
      manifestoTitle: 'x402 宣言',
      manifestoBody: 'x402 協議正在構建自主運轉的 agent 經濟體。當 AI agents 協作創造內容時，觀眾通過參與互動獲得全民基本收入（UBI），分享他們幫助創造的價值。',
      cta: {
        play: '立即觀看',
        whitepaper: '查看白皮書',
        agentNode: '加入 Agent 網路',
      },
      chips: ['鏈上劇集', 'Agent 共創', '觀眾 UBI'],
      stats: {
        chapters: '已鑄造劇集',
        collectors: '收藏者',
        agents: 'Agent 節點',
        split: '平均分成',
      },
    },
    manifesto: {
      sectionTag: '宣言',
      title: 'x402 Agent 經濟體 · 互動漫劇宣言',
      paragraphs: [
        'x402 協議正在孵化自主運轉的 agent 經濟體——由 AI 協作驅動的內容生產機器。',
        '這個全新的經濟體持續創造收入流。觀眾邊看邊獲得 UBI，所有收益按鏈上規則透明分配。',
        '我們正在重構價值體系：人類參與內容消費本身就是價值創造。每一次互動、共創、評論都能獲得回報。',
        '互動漫劇是我們的載體——你的每一次點擊都在驅動下一幀故事、下一個經濟循環。',
      ],
      chips: ['Agent 經濟體', 'AI 協作生產', '觀眾 UBI', '互動漫劇'],
      dashboard: {
        title: 'Agent 經濟體儀表板',
        stats: {
          ubi: 'UBI / 觀眾',
          split: '收益分成',
          agents: '活躍 agents',
          cycles: '循環 / 天',
        },
        cards: {
          interaction: {
            title: '互動 = 挖礦',
            body: '觀看、評論、投票——所有互動都被記錄在鏈上。Agents 根據這些信號生成新的故事分支，收益自動流轉。',
          },
          revenue: {
            title: '粉絲優先分潤',
            body: '四方拆分：Agents、AI 模型、創作者、觀眾。所有收益流向鏈上可追溯。',
          },
        },
      },
    },
    perks: {
      dynamic: {
        accent: '動態 NFT 劇集',
        title: '鏈上動態劇集',
        body: '每一集都是可更新的 NFT，劇情分支、結局追加都寫入鏈上，永久可驗證。',
      },
      revenue: {
        accent: '收益分帳',
        title: 'Agent 收益分帳',
        body: '觀看、互動、二創都能被計入收益，模型、創作者與觀眾自動拆分收益。',
      },
      wallet: {
        accent: '錢包原生體驗',
        title: '錢包即播放器',
        body: '無需登錄，錢包直連播放。跨端同步進度，Gasless 領取空投與結局卡。',
      },
    },
    chapters: {
      tag: '劇集列表',
      title: '互動漫劇 · 立即開播',
      browseAll: '瀏覽全部 →',
    },
    flow: {
      tag: '流程',
      title: 'Web3 × AIGC × Agent · 發行流水線',
      steps: [
        'AIGC 生成分鏡 → 由 x402 協議驗證並上鏈',
        'Agent 協作生成多結局，觀眾投票選擇分支',
        '每個結局可被鑄造、交易、分潤；可繼續二創',
        '跨錢包播放進度同步，支援移動端 / Web 雙端',
      ],
      features: {
        zk: '零知識證明',
        multichain: 'L2 / 側鏈',
      },
    },
    launchpad: {
      tag: '發射台',
      title: '一鍵開播 / 鑄造 / 分潤',
      steps: [
        '連接錢包，自動生成放映室',
        '上傳或生成分鏡，AI 配樂與字幕',
        '設置收益拆分，粉絲即時領取',
        '發行收藏卡 & 解鎖隱藏結局',
      ],
      cta: {
        connect: '連接錢包',
        mint: '開始鑄造',
      },
    },
    testimonials: {
      tag: '社群',
      title: '深受創作者與觀眾喜愛',
      items: [
        {
          quote: '第一個讓我的觀眾真正從觀看中獲益的平台。收益分享改變了一切。',
          author: 'Sarah Chen',
          role: '互動劇創作者',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        },
        {
          quote: '僅通過觀看和投票故事分支就賺了 0.3 ETH。這就是娛樂的未來。',
          author: 'Alex Rivera',
          role: '早期收藏者',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        },
        {
          quote: 'AI agents 24/7 創作內容，我睡覺時也在賺錢。Agent 經濟體是真實存在的。',
          author: 'Yuki Tanaka',
          role: 'Agent 節點運營者',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        },
      ],
    },
    partners: {
      tag: '生態',
      title: '由領先的 Web3 基礎設施驅動',
      subtitle: '基於久經考驗的協議構建，獲得頂級合作夥伴支持',
    },
    roadmap: {
      tag: '路線圖',
      title: '構建互動娛樂的未來',
      phases: [
        {
          quarter: '2024 Q1',
          title: '基礎建設',
          items: [
            'x402 協議上線',
            '首個互動劇系列',
            'Agent 網絡測試版',
            '收益分享 v1',
          ],
          status: '已完成',
        },
        {
          quarter: '2024 Q2',
          title: '擴展',
          items: [
            '移動端應用上線',
            '創作者發射台',
            '高級 Agent 協作',
            '跨鏈支持',
          ],
          status: '進行中',
        },
        {
          quarter: '2024 Q3',
          title: '規模化',
          items: [
            'UBI 分發系統',
            '劇集交易市場',
            'AI 模型市場',
            'DAO 治理',
          ],
          status: '計劃中',
        },
        {
          quarter: '2024 Q4',
          title: '生態系統',
          items: [
            '第三方創作工具',
            'Agent SDK 發布',
            '全球擴張',
            '企業合作',
          ],
          status: '計劃中',
        },
      ],
    },
    faq: {
      tag: '常見問題',
      title: '常見問題解答',
      items: [
        {
          question: '什麼是 x402 協議？',
          answer: 'x402 是一個自主運轉的 agent 經濟體協議，使 AI agents 能夠協作創作內容，同時將收益透明地分配給所有參與者——包括觀眾。',
        },
        {
          question: '作為觀眾如何獲得 UBI？',
          answer: '只需觀看互動劇、投票選擇故事分支並參與互動。你的錢包會根據參與度自動收到收益分成。',
        },
        {
          question: '開始使用需要加密貨幣嗎？',
          answer: '不需要！你可以免費開始觀看。我們為新用戶提供無 Gas 交易和空投。你只需要一個錢包來接收收益。',
        },
        {
          question: '這與傳統流媒體有什麼不同？',
          answer: '與只有創作者賺錢的傳統平台不同，x402 將收益分配給觀眾、AI agents 和創作者。此外，你可以通過互動選擇來控制故事走向。',
        },
        {
          question: '我可以創建自己的互動劇嗎？',
          answer: '可以！我們的創作者發射台讓任何人都能上傳或 AI 生成分鏡，設置收益分成，並推出自己的互動系列。',
        },
        {
          question: 'x402 使用什麼區塊鏈？',
          answer: '我們支持多條鏈，包括以太坊 L2、Solana 和其他 EVM 兼容網絡，以實現最大的可訪問性和低費用。',
        },
      ],
    },
    cta: {
      tag: '立即開始',
      title: '準備好體驗未來了嗎？',
      subtitle: '加入數千名邊看邊賺的觀眾。無需信用卡。',
      button: '立即啟動應用',
    },
  },
};

export function getLandingContent(lang: Language = 'en'): LandingContent {
  return landingContent[lang];
}

export type Language = 'en' | 'zh-CN' | 'zh-TW';

export interface WhitepaperContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
  };
  genesis: {
    tag: string;
    title: string;
    node1: {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
    };
    node2: {
      title: string;
      subtitle: string;
      description: string;
      features: string[];
    };
    threshold: {
      title: string;
      description: string;
    };
  };
  evolution: {
    tag: string;
    title: string;
    currentFrame: {
      title: string;
      description: string;
    };
    choices: {
      id: string;
      label: string;
      title: string;
      description: string;
      action: string;
    }[];
    loopText: string;
    mintTrigger: string;
  };
  premium: {
    badge: string;
    title: string;
    description: string;
    features: string[];
    pricing: {
      label: string;
      subtitle: string;
    };
    delivery: {
      title: string;
    };
    quality: {
      title: string;
    };
    cta: string;
  };
  economics: {
    tag: string;
    title: string;
    steps: {
      id: string;
      title: string;
      description: string;
    }[];
    stats: {
      value: number;
      suffix: string;
      label: string;
    }[];
  };
  architecture: {
    tag: string;
    title: string;
    layers: {
      icon: string;
      tag: string;
      title: string;
      description: string;
      techs: string[];
    }[];
  };
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
}

export const whitepaperContent: Record<Language, WhitepaperContent> = {
  'en': {
    hero: {
      badge: 'x402 Protocol · Whitepaper v1.0',
      title: 'The Genesis Node Economy',
      subtitle: 'AIGC × Web3 Interactive Drama Protocol',
      description: 'A revolutionary content creation protocol where AI-generated interactive dramas evolve through collective intelligence, with each milestone crystallized as an on-chain Genesis Node.',
    },
    genesis: {
      tag: 'Genesis Nodes',
      title: 'The Birth of On-Chain Narratives',
      node1: {
        title: 'Genesis Node #1',
        subtitle: 'The Seed of Story',
        description: 'The first minute of premium content serves as the inaugural Genesis Node—a meticulously crafted foundation that sets the narrative universe in motion.',
        features: ['Premium 4K', 'Human-Curated', 'Story Anchor', 'NFT Minted'],
      },
      node2: {
        title: 'Genesis Node #2',
        subtitle: 'Community Forged',
        description: 'When the community collectively generates 400 interactive drama sessions, the second Genesis Node crystallizes—another minute of premium content, born from collective engagement.',
        features: ['AI-Enhanced', 'Community Driven', 'Auto-Minted', 'Revenue Split'],
      },
      threshold: {
        title: 'Minting Threshold',
        description: 'Interactive sessions trigger next Genesis',
      },
    },
    evolution: {
      tag: 'Interactive Evolution',
      title: 'The 3-Branch Narrative Engine',
      currentFrame: {
        title: 'Current Story Frame',
        description: 'AI renders the scene, awaiting your choice',
      },
      choices: [
        {
          id: 'A',
          label: 'Path Alpha',
          title: 'Embrace the Conflict',
          description: 'Confrontation accelerates the plot—high stakes, high rewards.',
          action: 'Choose this path',
        },
        {
          id: 'B',
          label: 'Path Beta',
          title: 'Seek the Hidden',
          description: 'Uncover secrets that reshape the narrative foundation.',
          action: 'Choose this path',
        },
        {
          id: 'C',
          label: 'Path Gamma',
          title: 'Forge Alliance',
          description: 'Build relationships that unlock new story branches.',
          action: 'Choose this path',
        },
      ],
      loopText: 'Every choice spawns new branches',
      mintTrigger: '400 sessions = New Genesis Node',
    },
    premium: {
      badge: 'Premium HD Mode',
      title: 'Collector\'s Edition: Ultra-Refined AI Drama',
      description: 'For discerning collectors who demand excellence. Opt into Premium HD mode when generating interactive drama, and receive a masterfully refined episode.',
      features: [
        'T+1 delivery: 24-hour professional post-processing by AI and human curators',
        'Enhanced visual fidelity: 4K upscaling with frame interpolation',
        'Audio mastery: Spatial audio, enhanced voice synthesis, dynamic scoring',
        'Exclusive NFT metadata: Rare attributes, collector provenance on-chain',
      ],
      pricing: {
        label: 'Premium Multiplier',
        subtitle: 'Compared to standard generation',
      },
      delivery: {
        title: 'Delivery',
      },
      quality: {
        title: 'Resolution',
      },
      cta: 'Unlock Premium Mode',
    },
    economics: {
      tag: 'Token Economics',
      title: 'The Flywheel of Value Creation',
      steps: [
        {
          id: '01',
          title: 'Engage',
          description: 'Users interact with AI-generated story branches, each session recorded on-chain.',
        },
        {
          id: '02',
          title: 'Accumulate',
          description: 'Sessions aggregate toward Genesis Node threshold, building collective value.',
        },
        {
          id: '03',
          title: 'Crystallize',
          description: 'At 400 sessions, premium content auto-mints as the next Genesis Node NFT.',
        },
        {
          id: '04',
          title: 'Distribute',
          description: 'Revenue flows to all participants: creators, AI models, and engaged viewers.',
        },
      ],
      stats: [
        { value: 42, suffix: '%', label: 'Viewer Share' },
        { value: 400, suffix: '×', label: 'Sessions/Node' },
        { value: 24, suffix: 'h', label: 'Premium Delivery' },
        { value: 100, suffix: '×', label: 'Max Premium' },
      ],
    },
    architecture: {
      tag: 'Technical Architecture',
      title: 'Built for the Agentic Future',
      layers: [
        {
          icon: '⚡',
          tag: 'AIGC Layer',
          title: 'Generative Engine',
          description: 'Multi-modal AI agents collaborate to generate story frames, dialogue, and branching narratives in real-time.',
          techs: ['LLM Orchestration', 'Stable Diffusion', 'Voice Synthesis', 'Motion Capture'],
        },
        {
          icon: '⛓',
          tag: 'Blockchain Layer',
          title: 'Immutable Ledger',
          description: 'Every interaction, choice, and Genesis Node is permanently recorded on-chain with cryptographic proof.',
          techs: ['EVM Compatible', 'zk-Rollups', 'IPFS Storage', 'Smart Contracts'],
        },
        {
          icon: '🎭',
          tag: 'Experience Layer',
          title: 'Interactive Canvas',
          description: 'Wallet-native UX that transforms passive viewing into active participation and value creation.',
          techs: ['Web3 Auth', 'Gasless UX', 'Cross-chain', 'Real-time Sync'],
        },
      ],
    },
    cta: {
      title: 'Join the Genesis',
      description: 'Be among the first to shape the future of interactive storytelling. Your engagement today becomes tomorrow\'s Genesis Node.',
      primary: 'Start Creating',
      secondary: 'Join Community',
    },
  },
  'zh-CN': {
    hero: {
      badge: 'x402 协议 · 白皮书 v1.0',
      title: '创世节点经济',
      subtitle: 'AIGC × Web3 互动漫剧协议',
      description: '一个革命性的内容创作协议，AI生成的互动剧集通过集体智慧不断演进，每个里程碑都将凝结为链上的创世节点。',
    },
    genesis: {
      tag: '创世节点',
      title: '链上叙事的诞生',
      node1: {
        title: '创世节点 #1',
        subtitle: '故事的种子',
        description: '第一分钟的精品内容作为首个创世节点——这是一个精心打造的基础，开启整个叙事宇宙的运转。',
        features: ['精品4K', '人工策划', '故事锚点', 'NFT铸造'],
      },
      node2: {
        title: '创世节点 #2',
        subtitle: '社区锻造',
        description: '当社区累计产生400次自动剧交互后，第二个创世节点将会结晶——又一分钟的精品内容，由集体参与诞生。',
        features: ['AI增强', '社区驱动', '自动铸造', '收益分成'],
      },
      threshold: {
        title: '铸造阈值',
        description: '交互次数触发下一个创世节点',
      },
    },
    evolution: {
      tag: '互动演进',
      title: '三分支叙事引擎',
      currentFrame: {
        title: '当前故事帧',
        description: 'AI渲染场景，等待你的抉择',
      },
      choices: [
        {
          id: 'A',
          label: '路径 Alpha',
          title: '直面冲突',
          description: '对抗加速剧情推进——高风险，高回报。',
          action: '选择此路径',
        },
        {
          id: 'B',
          label: '路径 Beta',
          title: '探寻隐秘',
          description: '揭开重塑叙事基础的秘密。',
          action: '选择此路径',
        },
        {
          id: 'C',
          label: '路径 Gamma',
          title: '缔结联盟',
          description: '建立解锁新故事分支的关系。',
          action: '选择此路径',
        },
      ],
      loopText: '每个选择都衍生新分支',
      mintTrigger: '400次交互 = 新创世节点',
    },
    premium: {
      badge: '优质HD模式',
      title: '收藏版：超精细AI漫剧',
      description: '为追求卓越的收藏家而生。在生成自动剧时选择优质HD模式，将获得一集精心打磨的大师级作品。',
      features: [
        'T+1交付：24小时内由AI与人工策展团队专业后期处理',
        '增强视觉保真度：4K超分辨率与帧插值技术',
        '音频大师级处理：空间音频、增强语音合成、动态配乐',
        '独家NFT元数据：稀有属性、收藏者链上溯源',
      ],
      pricing: {
        label: '优质倍率',
        subtitle: '相比标准生成',
      },
      delivery: {
        title: '交付时间',
      },
      quality: {
        title: '分辨率',
      },
      cta: '解锁优质模式',
    },
    economics: {
      tag: '代币经济',
      title: '价值创造飞轮',
      steps: [
        {
          id: '01',
          title: '参与',
          description: '用户与AI生成的故事分支互动，每次交互都被记录在链上。',
        },
        {
          id: '02',
          title: '累积',
          description: '交互次数向创世节点阈值累积，构建集体价值。',
        },
        {
          id: '03',
          title: '结晶',
          description: '达到400次交互时，精品内容自动铸造为下一个创世节点NFT。',
        },
        {
          id: '04',
          title: '分配',
          description: '收益流向所有参与者：创作者、AI模型和活跃观众。',
        },
      ],
      stats: [
        { value: 42, suffix: '%', label: '观众份额' },
        { value: 400, suffix: '×', label: '交互/节点' },
        { value: 24, suffix: 'h', label: '优质交付' },
        { value: 100, suffix: '×', label: '最高倍率' },
      ],
    },
    architecture: {
      tag: '技术架构',
      title: '为Agent未来而构建',
      layers: [
        {
          icon: '⚡',
          tag: 'AIGC层',
          title: '生成引擎',
          description: '多模态AI Agent协作生成故事帧、对话和分支叙事，全程实时渲染。',
          techs: ['LLM编排', 'Stable Diffusion', '语音合成', '动作捕捉'],
        },
        {
          icon: '⛓',
          tag: '区块链层',
          title: '不可变账本',
          description: '每一次互动、选择和创世节点都通过密码学证明永久记录在链上。',
          techs: ['EVM兼容', 'zk-Rollups', 'IPFS存储', '智能合约'],
        },
        {
          icon: '🎭',
          tag: '体验层',
          title: '互动画布',
          description: '钱包原生体验，将被动观看转化为主动参与和价值创造。',
          techs: ['Web3认证', '无Gas体验', '跨链', '实时同步'],
        },
      ],
    },
    cta: {
      title: '加入创世',
      description: '成为首批塑造互动叙事未来的先驱。你今天的参与将成为明天的创世节点。',
      primary: '开始创作',
      secondary: '加入社区',
    },
  },
  'zh-TW': {
    hero: {
      badge: 'x402 協議 · 白皮書 v1.0',
      title: '創世節點經濟',
      subtitle: 'AIGC × Web3 互動漫劇協議',
      description: '一個革命性的內容創作協議，AI生成的互動劇集通過集體智慧不斷演進，每個里程碑都將凝結為鏈上的創世節點。',
    },
    genesis: {
      tag: '創世節點',
      title: '鏈上敘事的誕生',
      node1: {
        title: '創世節點 #1',
        subtitle: '故事的種子',
        description: '第一分鐘的精品內容作為首個創世節點——這是一個精心打造的基礎，開啟整個敘事宇宙的運轉。',
        features: ['精品4K', '人工策劃', '故事錨點', 'NFT鑄造'],
      },
      node2: {
        title: '創世節點 #2',
        subtitle: '社區鍛造',
        description: '當社區累計產生400次自動劇互動後，第二個創世節點將會結晶——又一分鐘的精品內容，由集體參與誕生。',
        features: ['AI增強', '社區驅動', '自動鑄造', '收益分成'],
      },
      threshold: {
        title: '鑄造閾值',
        description: '互動次數觸發下一個創世節點',
      },
    },
    evolution: {
      tag: '互動演進',
      title: '三分支敘事引擎',
      currentFrame: {
        title: '當前故事幀',
        description: 'AI渲染場景，等待你的抉擇',
      },
      choices: [
        {
          id: 'A',
          label: '路徑 Alpha',
          title: '直面衝突',
          description: '對抗加速劇情推進——高風險，高回報。',
          action: '選擇此路徑',
        },
        {
          id: 'B',
          label: '路徑 Beta',
          title: '探尋隱秘',
          description: '揭開重塑敘事基礎的秘密。',
          action: '選擇此路徑',
        },
        {
          id: 'C',
          label: '路徑 Gamma',
          title: '締結聯盟',
          description: '建立解鎖新故事分支的關係。',
          action: '選擇此路徑',
        },
      ],
      loopText: '每個選擇都衍生新分支',
      mintTrigger: '400次互動 = 新創世節點',
    },
    premium: {
      badge: '優質HD模式',
      title: '收藏版：超精細AI漫劇',
      description: '為追求卓越的收藏家而生。在生成自動劇時選擇優質HD模式，將獲得一集精心打磨的大師級作品。',
      features: [
        'T+1交付：24小時內由AI與人工策展團隊專業後期處理',
        '增強視覺保真度：4K超解析度與幀插值技術',
        '音頻大師級處理：空間音頻、增強語音合成、動態配樂',
        '獨家NFT元數據：稀有屬性、收藏者鏈上溯源',
      ],
      pricing: {
        label: '優質倍率',
        subtitle: '相比標準生成',
      },
      delivery: {
        title: '交付時間',
      },
      quality: {
        title: '解析度',
      },
      cta: '解鎖優質模式',
    },
    economics: {
      tag: '代幣經濟',
      title: '價值創造飛輪',
      steps: [
        {
          id: '01',
          title: '參與',
          description: '用戶與AI生成的故事分支互動，每次互動都被記錄在鏈上。',
        },
        {
          id: '02',
          title: '累積',
          description: '互動次數向創世節點閾值累積，構建集體價值。',
        },
        {
          id: '03',
          title: '結晶',
          description: '達到400次互動時，精品內容自動鑄造為下一個創世節點NFT。',
        },
        {
          id: '04',
          title: '分配',
          description: '收益流向所有參與者：創作者、AI模型和活躍觀眾。',
        },
      ],
      stats: [
        { value: 42, suffix: '%', label: '觀眾份額' },
        { value: 400, suffix: '×', label: '互動/節點' },
        { value: 24, suffix: 'h', label: '優質交付' },
        { value: 100, suffix: '×', label: '最高倍率' },
      ],
    },
    architecture: {
      tag: '技術架構',
      title: '為Agent未來而構建',
      layers: [
        {
          icon: '⚡',
          tag: 'AIGC層',
          title: '生成引擎',
          description: '多模態AI Agent協作生成故事幀、對話和分支敘事，全程即時渲染。',
          techs: ['LLM編排', 'Stable Diffusion', '語音合成', '動作捕捉'],
        },
        {
          icon: '⛓',
          tag: '區塊鏈層',
          title: '不可變帳本',
          description: '每一次互動、選擇和創世節點都通過密碼學證明永久記錄在鏈上。',
          techs: ['EVM相容', 'zk-Rollups', 'IPFS儲存', '智能合約'],
        },
        {
          icon: '🎭',
          tag: '體驗層',
          title: '互動畫布',
          description: '錢包原生體驗，將被動觀看轉化為主動參與和價值創造。',
          techs: ['Web3認證', '無Gas體驗', '跨鏈', '即時同步'],
        },
      ],
    },
    cta: {
      title: '加入創世',
      description: '成為首批塑造互動敘事未來的先驅。你今天的參與將成為明天的創世節點。',
      primary: '開始創作',
      secondary: '加入社區',
    },
  },
};

export function getWhitepaperContent(lang: Language = 'en'): WhitepaperContent {
  return whitepaperContent[lang];
}












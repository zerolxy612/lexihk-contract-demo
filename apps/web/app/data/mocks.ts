export interface Trade {
    id: string;
    type: 'buy' | 'sell';
    amount: number;
    price: number;
    trader: string;
    timestamp: number;
}

export interface Holder {
    address: string;
    percentage: number;
    isDev?: boolean;
}

export interface Drama {
    id: string;
    ticker: string;
    title: string;
    description: string;
    coverImage: string;
    creator: string;
    creatorAvatar: string;
    status: 'ongoing' | 'completed';
    progress: number;
    holders: number;
    marketCap: number;
    tags: string[];
    category: string;
    bondingCurveProgress: number;
    releaseDate: string;
    currentPrice: number;
    // [NEW] Degen Stats
    rugRisk: 'low' | 'medium' | 'high';
    devHolding: number; // Percentage
    // [NEW] Interactive Stats
    reactions: {
        fire: number;
        rocket: number;
        poo: number;
        flag: number;
    };
    recentTrades: Trade[];
    topHolders: Holder[];
    // [NEW] Crowdfunding Narrative
    nextMilestone?: string;
    fundingGoal?: number; // In ETH
    aiStatus?: 'idle' | 'scripting' | 'casting' | 'filming' | 'editing';
}

export const INITIAL_DRAMAS: Drama[] = [
    {
        id: 'd1',
        ticker: 'CYBER',
        title: 'Cyber Detective',
        description: 'In Neo-Tokyo 2077, an encrypted chip capable of toppling mega-corporations sparks a city-wide manhunt. Find the truth in the neon rain.',
        coverImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop',
        creator: '0xCypher',
        creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
        status: 'ongoing',
        progress: 45,
        holders: 1240,
        marketCap: 45.2,
        bondingCurveProgress: 45,
        tags: ['Cyberpunk', 'Suspense', 'Hacker'],
        category: 'scifi',
        releaseDate: '2024-12-01',
        currentPrice: 0.00045,
        rugRisk: 'low',
        devHolding: 5.2,
        reactions: { fire: 120, rocket: 45, poo: 2, flag: 0 },
        recentTrades: [],
        topHolders: [{ address: '0xCypher', percentage: 5.2, isDev: true }, { address: '0xWhale1', percentage: 2.5 }, { address: '0xWhale2', percentage: 1.8 }],
        nextMilestone: 'Episode 2: The Glitch',
        fundingGoal: 50, // 50 ETH target
        aiStatus: 'scripting',
    },
    {
        id: 'd2',
        ticker: 'DOGEMOON',
        title: 'Doge to the Moon: The Movie',
        description: 'The unauthorized biography of the first Shiba Inu to become a planetary governor. Much plotting. Very drama.',
        coverImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop',
        creator: '0xElon',
        creatorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
        status: 'ongoing',
        progress: 92,
        holders: 8900,
        marketCap: 78.4,
        bondingCurveProgress: 98,
        tags: ['Meme', 'Comedy', 'Space'],
        category: 'meme',
        releaseDate: '2024-04-20',
        currentPrice: 0.00078,
        rugRisk: 'high',
        devHolding: 42.0,
        reactions: { fire: 800, rocket: 1200, poo: 50, flag: 12 },
        recentTrades: [],
        topHolders: [{ address: '0xElon', percentage: 42.0, isDev: true }, { address: '0xDogeFan', percentage: 5.0 }, { address: '0xMoonBoy', percentage: 3.5 }],
    },
    {
        id: 'd3',
        ticker: 'RUGPULL',
        title: 'Rugpull: A Love Story',
        description: 'He stole her private keys, she stole his heart. A romantic thriller set in the world of anonymous DeFi developers.',
        coverImage: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=600&h=400&fit=crop',
        creator: '0xScammer',
        creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        status: 'ongoing',
        progress: 15,
        holders: 69,
        marketCap: 4.20,
        bondingCurveProgress: 5,
        tags: ['Drama', 'Romance', 'Crime'],
        category: 'urban',
        releaseDate: '2025-02-14',
        currentPrice: 0.00004,
        rugRisk: 'high',
        devHolding: 85.0,
        reactions: { fire: 2, rocket: 0, poo: 150, flag: 89 },
        recentTrades: [],
        topHolders: [{ address: '0xScammer', percentage: 85.0, isDev: true }, { address: '0xVictim1', percentage: 0.5 }, { address: '0xVictim2', percentage: 0.2 }],
    },
    {
        id: 'd4',
        ticker: 'SATOSHI',
        title: 'Satoshi\'s Secret',
        description: 'A documentary crew uncovers a wallet active since 2009. The owner isn\'t who we thought it was.',
        coverImage: 'https://images.unsplash.com/photo-1621504450168-b8c4d29cf47d?w=600&h=400&fit=crop',
        creator: '0xTruth',
        creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        status: 'ongoing',
        progress: 60,
        holders: 3300,
        marketCap: 52.1,
        bondingCurveProgress: 65,
        tags: ['Documentary', 'Mystery', 'BTC'],
        category: 'documentary',
        releaseDate: '2024-11-11',
        currentPrice: 0.00052,
        rugRisk: 'low',
        devHolding: 2.1,
        reactions: { fire: 45, rocket: 12, poo: 0, flag: 0 },
        recentTrades: [],
        topHolders: [{ address: '0xTruth', percentage: 2.1, isDev: true }, { address: '0xMiner', percentage: 12.5 }, { address: '0xEarlyBird', percentage: 8.8 }],
    },
    {
        id: 'd5',
        ticker: 'AI_GOD',
        title: 'The Singularity Protocol',
        description: 'GPT-6 becomes sentient and starts generating its own reality show using human participants.',
        coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop',
        creator: '0xBot',
        creatorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop',
        status: 'ongoing',
        progress: 88,
        holders: 10500,
        marketCap: 95.0,
        bondingCurveProgress: 95,
        tags: ['Sci-Fi', 'AI', 'Horror'],
        category: 'scifi',
        releaseDate: '2025-01-01',
        currentPrice: 0.00095,
        rugRisk: 'medium',
        devHolding: 12.0,
        reactions: { fire: 500, rocket: 800, poo: 10, flag: 5 },
        recentTrades: [],
        topHolders: [{ address: '0xBot', percentage: 12.0, isDev: true }, { address: '0xVC', percentage: 15.0 }, { address: '0xAlgoTrader', percentage: 4.2 }],
        nextMilestone: 'Phase 2: Neural Voice Synthesis',
        fundingGoal: 100,
        aiStatus: 'casting',
    },
    {
        id: 'd6',
        ticker: 'PEPE_LORE',
        title: 'The Ancient History of Pepe',
        description: 'Before the meme, he was a god. Exploring the mythological origins of the most famous frog on the internet.',
        coverImage: 'https://images.unsplash.com/photo-1550948537-130a1ce83314?w=600&h=400&fit=crop',
        creator: '0xFrog',
        creatorAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&fit=crop',
        status: 'ongoing',
        progress: 30,
        holders: 4200,
        marketCap: 15.5,
        bondingCurveProgress: 20,
        tags: ['Meme', 'History', 'Fantasy'],
        category: 'meme',
        releaseDate: '2024-06-09',
        currentPrice: 0.00015,
        rugRisk: 'low',
        devHolding: 4.5,
        reactions: { fire: 200, rocket: 50, poo: 20, flag: 2 },
        recentTrades: [],
        topHolders: [{ address: '0xFrog', percentage: 4.5, isDev: true }, { address: '0xMemeLord', percentage: 2.2 }, { address: '0xPepeFan', percentage: 1.8 }],
    },
    {
        id: 'd7',
        ticker: 'LOULAN',
        title: 'Silk Road: Loulan Mirage',
        description: 'A caravan gets lost in a sandstorm and enters the ancient Kingdom of Loulan, where time seems to stand still.',
        coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
        creator: '0xSilk',
        creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        status: 'ongoing',
        progress: 55,
        holders: 1200,
        marketCap: 25.4,
        bondingCurveProgress: 35,
        tags: ['History', 'Adventure', 'Mystery'],
        category: 'adventure',
        releaseDate: '2024-11-20',
        currentPrice: 0.00025,
        rugRisk: 'low',
        devHolding: 8.0,
        reactions: { fire: 80, rocket: 20, poo: 1, flag: 0 },
        recentTrades: [],
        topHolders: [{ address: '0xSilk', percentage: 8.0, isDev: true }, { address: '0xTraveler', percentage: 1.5 }, { address: '0xHistorian', percentage: 1.2 }],
    },
    {
        id: 'd8',
        ticker: 'ABYSS',
        title: 'Abyssal Awakening',
        description: 'Deep sea explorers discover a prehistoric city in the Mariana Trench that isn\'t abandoned.',
        coverImage: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop',
        creator: '0xAqua',
        creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        status: 'ongoing',
        progress: 65,
        holders: 890,
        marketCap: 38.4,
        bondingCurveProgress: 65,
        tags: ['Horror', 'Deep Sea'],
        category: 'suspense',
        releaseDate: '2024-09-15',
        currentPrice: 0.00038,
        rugRisk: 'medium',
        devHolding: 15.0,
        reactions: { fire: 150, rocket: 60, poo: 5, flag: 3 },
        recentTrades: [],
        topHolders: [{ address: '0xAqua', percentage: 15.0, isDev: true }, { address: '0xDiver', percentage: 3.8 }, { address: '0xOctopus', percentage: 2.1 }],
    },
    {
        id: 'd9',
        ticker: 'ISEKAI',
        title: 'Tycoon in Song Dynasty',
        description: 'Accidentally time-traveled to ancient China, use modern business thinking to run restaurants and shipping.',
        coverImage: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=400&fit=crop',
        creator: '0xMoney',
        creatorAvatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&h=100&fit=crop',
        status: 'ongoing',
        progress: 78,
        holders: 5400,
        marketCap: 48.9,
        bondingCurveProgress: 60,
        tags: ['Isekai', 'Business', 'Fun'],
        category: 'history',
        releaseDate: '2024-11-11',
        currentPrice: 0.00048,
        rugRisk: 'low',
        devHolding: 3.0,
        reactions: { fire: 300, rocket: 500, poo: 10, flag: 1 },
        recentTrades: [],
        topHolders: [{ address: '0xMoney', percentage: 3.0, isDev: true }, { address: '0xMerchant', percentage: 5.5 }, { address: '0xEmperor', percentage: 4.8 }],
    },
];

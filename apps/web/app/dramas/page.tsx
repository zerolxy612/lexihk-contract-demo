'use client';

import { useState, useEffect, useRef } from 'react';
import { ParticleBackground } from '@/app/components/ParticleBackground';
import { TiltCard } from '@/app/components/TiltCard';
import { BondingCurveChart } from '@/app/components/BondingCurveChart';
import { TradingPanel } from '@/app/components/TradingPanel';
import { KingOfTheHill } from '@/app/components/KingOfTheHill';
import { LiveTicker } from '@/app/components/LiveTicker';
import { ToastContainer, ToastRef } from '@/app/components/ToastContainer';

// Type definitions
interface Trade {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  trader: string;
  timestamp: number;
}

interface Holder {
  address: string;
  percentage: number;
  isDev?: boolean;
}

interface Drama {
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
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'meme', label: '🐸 Meme' },
  { id: 'scifi', label: '🤖 Sci-Fi' },
  { id: 'suspense', label: '🕵️ Suspense' },
  { id: 'adventure', label: '🏺 Adventure' },
  { id: 'fantasy', label: '🧙 Fantasy' },
  { id: 'urban', label: '🌆 Urban' },
  { id: 'history', label: '📜 History' },
  { id: 'documentary', label: '📹 Docu' },
];

// Mock Data - Expanded & Enriched
const INITIAL_DRAMAS: Drama[] = [
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

type SortType = 'hot' | 'new' | 'marketcap';

// ... (imports remain mostly same, adding simple CSS animation styles via a style tag or class)

function ReactionButton({
  emoji,
  count,
  onClick
}: {
  emoji: string;
  count: number;
  onClick: (e: React.MouseEvent) => void
}) {
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from firing
    setIsPopping(true);
    onClick(e);
    setTimeout(() => setIsPopping(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`
                flex items-center gap-1 text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded-full transition-all duration-200
                text-white/60 hover:text-white hover:scale-110 active:scale-95
                ${isPopping ? 'animate-[pop_0.3s_ease-out]' : ''}
            `}
    >
      <span className="text-base">{emoji}</span>
      <span className="font-mono">{count}</span>
    </button>
  );
}

export default function DramasPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState<SortType>('hot');
  const [searchQuery, setSearchQuery] = useState('');
  const [dramas, setDramas] = useState<Drama[]>(INITIAL_DRAMAS);
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);
  const [activeTab, setActiveTab] = useState<'thread' | 'trades' | 'holders'>('thread');

  const toastRef = useRef<ToastRef>(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 600);
  }, []);

  // Simulate real-time updates & Toasts
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update Prices & Randomly add trades
      setDramas(prevDramas => {
        return prevDramas.map(drama => {
          // Add random trades occasionally
          let newTrades = drama.recentTrades;
          if (Math.random() > 0.8) {
            const isBuy = Math.random() > 0.4;
            const newTrade: Trade = {
              id: Math.random().toString(36).substr(2, 9),
              type: isBuy ? 'buy' : 'sell',
              amount: parseFloat((Math.random() * 0.5 + 0.01).toFixed(3)),
              price: drama.currentPrice,
              trader: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
              timestamp: Date.now()
            };
            newTrades = [newTrade, ...drama.recentTrades].slice(0, 50); // Keep last 50
          }

          if (drama.status === 'completed') return { ...drama, recentTrades: newTrades };
          // Price movement
          if (Math.random() > 0.7) return { ...drama, recentTrades: newTrades };

          const change = (Math.random() - 0.4) * 0.5;
          const newMarketCap = Math.max(0, drama.marketCap + change);
          const newProgress = Math.min(100, Math.max(0, (newMarketCap / 80) * 100));

          return {
            ...drama,
            marketCap: Number(newMarketCap.toFixed(2)),
            bondingCurveProgress: newProgress,
            currentPrice: Number((newMarketCap / 10000).toFixed(6)),
            recentTrades: newTrades
          };
        });
      });

      // 2. Random Toast Events
      if (Math.random() > 0.6) {
        const randomDrama = dramas[Math.floor(Math.random() * dramas.length)];
        const amount = (Math.random() * 0.5 + 0.01).toFixed(2);
        const action = Math.random() > 0.7 ? 'sell' : 'buy'; // More buys than sells

        toastRef.current?.addToast(
          `${randomDrama.ticker}: Someone ${action === 'buy' ? 'bought' : 'sold'} ${amount} ETH`,
          action
        );
      }

    }, 2000);

    return () => clearInterval(interval);
  }, [dramas.length]); // Fix dependency to avoid heavy re-render loop if we depended on whole dramas object

  const handleReaction = (e: React.MouseEvent, dramaId: string, type: keyof Drama['reactions']) => {
    // e.stopPropagation(); // Handled in Refactored Button
    setDramas(prev => prev.map(d => {
      if (d.id === dramaId) {
        return {
          ...d,
          reactions: {
            ...d.reactions,
            [type]: d.reactions[type] + 1
          }
        };
      }
      return d;
    }));
  };


  const filteredDramas = dramas
    .filter(drama => {
      if (activeCategory !== 'all' && drama.category !== activeCategory) return false;
      return true;
    })
    .filter(drama => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return drama.title.toLowerCase().includes(query) ||
        drama.ticker.toLowerCase().includes(query) ||
        drama.description.toLowerCase().includes(query);
    })
    .sort((a, b) => {
      if (sort === 'hot') return b.bondingCurveProgress - a.bondingCurveProgress;
      if (sort === 'marketcap') return b.marketCap - a.marketCap;
      return 0; // 'new'
    });

  // Find "King of the Hill" (Top Market Cap)
  const kingOfTheHill = [...dramas].sort((a, b) => b.marketCap - a.marketCap)[0];

  // Helper to get fresh data for modal
  const modalDrama = selectedDrama ? dramas.find(d => d.id === selectedDrama.id) || selectedDrama : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 mx-auto border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60">Loading Launchpad...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#0a0b10] text-white">
      <style jsx global>{`
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      <LiveTicker />
      <ToastContainer ref={toastRef} />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c24] to-[#0a0b10]" />
        <ParticleBackground />
        <div className="absolute inset-0 noise opacity-[0.03]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black italic tracking-tighter flex items-center gap-2 group cursor-default">
              <span className="text-3xl group-hover:animate-bounce">🚀</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">DRAMA.FUN</span>
            </h1>
            <div className="hidden md:flex gap-1 text-xs font-mono text-white/40">
              <span className="text-green-400">ETH: $2,420 (+2.4%)</span>
              <span>•</span>
              <span className="text-blue-400">GAS: 12 GWEI</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-bold text-white/60 hover:text-white transition">
              How it works
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-white text-black font-bold hover:bg-white/90 transition shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transform hover:-translate-y-0.5"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* King of the Hill */}
        {!searchQuery && activeCategory === 'all' && kingOfTheHill && (
          <div className="mb-12 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition duration-1000 animate-pulse" />
            <div className="relative transform hover:scale-[1.01] transition duration-500">
              <KingOfTheHill drama={kingOfTheHill} onClick={() => setSelectedDrama(kingOfTheHill)} />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 text-xs font-black uppercase tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.3)] animate-pulse">
                  👑 King of the Hill
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96 group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Seach token or description"
              className="w-full bg-[#15171e] text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent/50 transition-all group-hover:border-white/20 group-hover:bg-[#1a1c24]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-white/60 transition-colors">🔍</span>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === cat.id
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)] transform scale-105'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
              >
                {cat.label}
              </button>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="bg-transparent text-white/60 font-bold text-sm focus:outline-none hover:text-white cursor-pointer"
            >
              <option value="hot">Sort: Bump Order</option>
              <option value="marketcap">Sort: Market Cap</option>
              <option value="new">Sort: Newest</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {/* [NEW] Create Button */}
          <div className="bg-[#1a1c24] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center min-h-[300px] hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 cursor-pointer group hover:scale-[1.02] active:scale-95">
            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 bg-white/5 p-4 rounded-full group-hover:bg-accent/20">➕</div>
            <h3 className="font-bold text-lg text-white/80 group-hover:text-white">Start a new drama</h3>
            <p className="text-white/40 text-sm mt-2 text-center px-8 group-hover:text-white/60">Launch your bonding curve instantly.</p>
          </div>

          {filteredDramas.map((drama) => (
            <div
              key={drama.id}
              className={`
                     relative bg-[#15171e] hover:bg-[#1a1c24] border border-white/5 hover:border-white/20 
                     rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50
                     ${drama.bondingCurveProgress > 90
                  ? 'shadow-[0_0_20px_rgba(234,179,8,0.1)] border-yellow-500/20 ring-1 ring-yellow-500/10'
                  : ''}
                  `}
              onClick={() => setSelectedDrama(drama)}
            >
              {/* [NEW] Rug Risk Badge */}
              {drama.devHolding > 20 && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-[10px] font-bold z-10 backdrop-blur-sm">
                  🚩 High Dev Hold {drama.devHolding}%
                </div>
              )}
              {drama.bondingCurveProgress > 95 && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 text-[10px] font-bold z-10 animate-pulse backdrop-blur-sm">
                  🔥 KING SOON
                </div>
              )}

              <div className="p-4 flex gap-4">
                <div className="relative">
                  <img
                    src={drama.coverImage}
                    alt={drama.title}
                    className="w-24 h-24 object-cover rounded-lg bg-black/50 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Active Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-white/40 mb-1 block group-hover:text-white/60 transition-colors">Created by {drama.creator}</span>
                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/40 group-hover:bg-white/10 transition-colors">{Categories(drama.category)}</span>
                  </div>
                  <h3 className="font-bold text-white truncate group-hover:text-accent transition-colors leading-tight">
                    {drama.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-accent bg-accent/10 px-1.5 rounded uppercase">{drama.ticker}</span>
                    <span className={`text-xs font-mono font-bold ${drama.marketCap > 50 ? 'text-green-400' : 'text-white/40'}`}>
                      mcap: {drama.marketCap}E
                    </span>
                  </div>
                  <p className="text-white/50 text-xs mt-2 line-clamp-2 leading-relaxed group-hover:text-white/70 transition-colors">
                    {drama.description}
                  </p>
                </div>
              </div>

              {/* Reactions Bar */}
              <div className="px-4 pb-2 flex items-center gap-2">
                <ReactionButton emoji="🔥" count={drama.reactions.fire} onClick={(e) => handleReaction(e, drama.id, 'fire')} />
                <ReactionButton emoji="🚀" count={drama.reactions.rocket} onClick={(e) => handleReaction(e, drama.id, 'rocket')} />
                <ReactionButton emoji="💩" count={drama.reactions.poo} onClick={(e) => handleReaction(e, drama.id, 'poo')} />
                <div className="ml-auto">
                  <ReactionButton emoji="🚩" count={drama.reactions.flag} onClick={(e) => handleReaction(e, drama.id, 'flag')} />
                </div>
              </div>

              {/* Progress Bar & Quick Ape */}
              <div className="px-4 pb-4 mt-auto">
                <div className="flex justify-between text-[10px] text-white/40 mb-1 uppercase font-bold tracking-wider">
                  <span>Bonding Progress</span>
                  <span className={drama.bondingCurveProgress > 80 ? 'text-green-400 animate-pulse' : ''}>{drama.bondingCurveProgress.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden mb-3 ring-1 ring-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 relative overflow-hidden ${drama.bondingCurveProgress > 90 ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        : drama.bondingCurveProgress > 50 ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                          : 'bg-white/20'
                      }`}
                    style={{ width: `${drama.bondingCurveProgress}%` }}
                  >
                    {/* Shimmer effect on progress bar */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
                  </div>
                </div>

                {/* [NEW] Quick Ape Button */}
                <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="flex-1 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/50 rounded-lg text-xs font-bold text-green-400 hover:text-green-300 transition-all active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      toastRef.current?.addToast(`Bought 0.05 ETH of ${drama.ticker} 🚀`, 'buy');
                    }}
                  >
                    🦍 Ape 0.05
                  </button>
                  <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-lg text-xs font-bold text-white transition-all active:scale-95">
                    View Trade
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Trading Terminal Modal */}
      {selectedDrama && modalDrama && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-[#0a0b10] border border-white/10 w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            <button
              onClick={() => setSelectedDrama(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition hover:rotate-90 duration-300"
            >
              ✕
            </button>

            {/* Left Column: Chart & Info */}
            <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto">
              {/* Header Info */}
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                <div className="flex gap-4 mb-4">
                  <img src={modalDrama.coverImage} className="w-16 h-16 rounded-lg object-cover shadow-lg" />
                  <div>
                    <h2 className="text-2xl font-black text-white leading-none tracking-tight">{modalDrama.title}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm font-bold text-white/60">Ticker: <span className="text-white">{modalDrama.ticker}</span></span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-mono border border-green-500/20">
                        MCap: {modalDrama.marketCap} ETH
                      </span>
                      {modalDrama.rugRisk === 'high' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/50 animate-pulse">
                          RUG RISK: HIGH
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed max-w-2xl">{modalDrama.description}</p>
              </div>

              {/* Chart Area */}
              <div className="p-6 flex-1 bg-[#101116] min-h-[300px] relative">
                <div className="absolute top-4 right-4 text-[10px] text-white/20 font-mono">LIVE CHART v1.0</div>
                <BondingCurveChart progress={modalDrama.bondingCurveProgress} className="h-full" />
              </div>

              {/* Holder Stats */}
              <div className="p-6 grid grid-cols-3 gap-4 bg-[#0a0b10]">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-xs text-white/40 uppercase font-bold">Holders</div>
                  <div className="text-lg font-mono font-bold text-white">{modalDrama.holders.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-xs text-white/40 uppercase font-bold">Dev Holding</div>
                  <div className={`text-lg font-mono font-bold ${modalDrama.devHolding > 10 ? 'text-red-400' : 'text-green-400'}`}>
                    {modalDrama.devHolding}%
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-xs text-white/40 uppercase font-bold">Created</div>
                  <div className="text-lg font-mono font-bold text-white">2h ago</div>
                </div>
              </div>
            </div>

            {/* Right Column: Trading & Comments */}
            <div className="w-full md:w-[400px] flex flex-col bg-[#0a0b10]">
              <div className="p-4 bg-[#15171e] border-b border-white/10">
                <TradingPanel ticker={modalDrama.ticker} price={modalDrama.currentPrice} />
              </div>

              {/* Tabs for threads/trades */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex border-b border-white/10">
                  <button
                    onClick={() => setActiveTab('thread')}
                    className={`flex-1 py-3 text-sm font-bold transition-all relative ${activeTab === 'thread' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    Thread
                    {activeTab === 'thread' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />}
                  </button>
                  <button
                    onClick={() => setActiveTab('trades')}
                    className={`flex-1 py-3 text-sm font-bold transition-all relative ${activeTab === 'trades' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    Trades
                    {activeTab === 'trades' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />}
                  </button>
                  <button
                    onClick={() => setActiveTab('holders')}
                    className={`flex-1 py-3 text-sm font-bold transition-all relative ${activeTab === 'holders' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                  >
                    Holders
                    {activeTab === 'holders' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />}
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* TAB: THREAD */}
                  {activeTab === 'thread' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">AB</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white/60">0xAB...29</span>
                            <span className="text-[10px] text-white/30">1m ago</span>
                          </div>
                          <p className="text-sm text-white/80">This dev is based. Ape in! 🚀</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">CD</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white/60">0xCD...99</span>
                            <span className="text-[10px] text-white/30">5m ago</span>
                          </div>
                          <p className="text-sm text-white/80">Bonding curve is moving fast.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: TRADES */}
                  {activeTab === 'trades' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      {modalDrama.recentTrades.length === 0 && <p className="text-white/30 text-center py-4">No recent trades.</p>}
                      {modalDrama.recentTrades.map(trade => (
                        <div key={trade.id} className="flex items-center justify-between text-xs py-1.5 hover:bg-white/5 rounded px-2 transition-colors">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                              {trade.type.toUpperCase()}
                            </span>
                            <span className="font-mono text-white/60">{trade.trader}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">{trade.amount} ETH</div>
                            <div className="text-white/30 text-[10px]">{new Date(trade.timestamp).toLocaleTimeString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB: HOLDERS */}
                  {activeTab === 'holders' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center justify-between text-[10px] text-white/30 uppercase font-bold text-right px-2 pb-2 border-b border-white/5">
                        <span>Address</span>
                        <span>Percentage</span>
                      </div>
                      {modalDrama.topHolders.map((holder, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-2 hover:bg-white/5 rounded transition-colors group/row">
                          <div className="flex items-center gap-2">
                            <span className="text-white/30 w-4">{idx + 1}.</span>
                            <span className="font-mono text-white/60 group-hover/row:text-white transition-colors">
                              {holder.address} {holder.isDev && <span className="text-[10px] bg-white/10 text-white/50 px-1 rounded ml-1">DEV</span>}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-accent" style={{ width: `${holder.percentage}%` }} />
                            </div>
                            <span className="font-mono font-bold text-white w-10 text-right">{holder.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Post Reply (Only for Thread) */}
                {activeTab === 'thread' && (
                  <div className="p-4 border-t border-white/10">
                    <input
                      type="text"
                      placeholder="Post a reply..."
                      className="w-full bg-[#15171e] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-white/20"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Categories(id: string) {
  return CATEGORIES.find(c => c.id === id)?.label || id;
}

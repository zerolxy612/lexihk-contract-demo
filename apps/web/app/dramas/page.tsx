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
  },
];

type SortType = 'hot' | 'new' | 'marketcap';

export default function DramasPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState<SortType>('hot');
  const [searchQuery, setSearchQuery] = useState('');
  const [dramas, setDramas] = useState<Drama[]>(INITIAL_DRAMAS);
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);

  const toastRef = useRef<ToastRef>(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 600);
  }, []);

  // Simulate real-time updates & Toasts
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update Prices
      setDramas(prevDramas => {
        return prevDramas.map(drama => {
          if (drama.status === 'completed') return drama;
          if (Math.random() > 0.7) return drama;

          const change = (Math.random() - 0.4) * 0.5;
          const newMarketCap = Math.max(0, drama.marketCap + change);
          const newProgress = Math.min(100, Math.max(0, (newMarketCap / 80) * 100));

          return {
            ...drama,
            marketCap: Number(newMarketCap.toFixed(2)),
            bondingCurveProgress: newProgress,
            currentPrice: Number((newMarketCap / 10000).toFixed(6))
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
  }, [dramas]); // Added dramas dependency for reading random drama

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
            <h1 className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
              <span className="text-3xl">🚀</span>
              <span>DRAMA.FUN</span>
            </h1>
            <div className="hidden md:flex gap-1 text-xs font-mono text-white/40">
              <span>ETH: $2,420</span>
              <span>•</span>
              <span>GAS: 12 GWEI</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-bold text-white/60 hover:text-white transition">
              How it works
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-white text-black font-bold hover:bg-white/90 transition shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* King of the Hill */}
        {!searchQuery && activeCategory === 'all' && (
          <KingOfTheHill drama={kingOfTheHill} onClick={() => setSelectedDrama(kingOfTheHill)} />
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
              className="w-full bg-[#15171e] text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent/50 transition-all group-hover:border-white/20"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">🔍</span>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeCategory === cat.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
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
          <div className="bg-[#1a1c24] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center min-h-[300px] hover:border-accent/50 hover:bg-accent/5 transition cursor-pointer group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">➕</div>
            <h3 className="font-bold text-lg">Start a new drama</h3>
            <p className="text-white/40 text-sm mt-2 text-center px-8">Launch your bonding curve instantly.</p>
          </div>

          {filteredDramas.map((drama) => (
            <div
              key={drama.id}
              className={`
                     relative bg-[#15171e] hover:bg-[#1a1c24] border border-white/5 hover:border-white/10 
                     rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col
                     ${drama.bondingCurveProgress > 90 ? 'shadow-[0_0_20px_rgba(255,215,0,0.1)] border-yellow-500/20' : ''}
                  `}
              onClick={() => setSelectedDrama(drama)}
            >
              {/* [NEW] Rug Risk Badge */}
              {drama.devHolding > 20 && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-[10px] font-bold z-10">
                  🚩 High Dev Hold {drama.devHolding}%
                </div>
              )}
              {drama.bondingCurveProgress > 95 && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 text-[10px] font-bold z-10 animate-pulse">
                  🔥 KING SOON
                </div>
              )}

              <div className="p-4 flex gap-4">
                <img
                  src={drama.coverImage}
                  alt={drama.title}
                  className="w-24 h-24 object-cover rounded-lg bg-black/50"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-white/40 mb-1 block">Created by {drama.creator}</span>
                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/40">{Categories(drama.category)}</span>
                  </div>
                  <h3 className="font-bold text-white truncate group-hover:text-accent transition-colors leading-tight">
                    {drama.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-accent bg-accent/10 px-1.5 rounded uppercase">{drama.ticker}</span>
                    <span className="text-xs text-green-400 font-mono">mcap: {drama.marketCap}E</span>
                  </div>
                  <p className="text-white/50 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {drama.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar & Quick Ape */}
              <div className="px-4 pb-4 mt-auto">
                <div className="flex justify-between text-[10px] text-white/40 mb-1 uppercase font-bold tracking-wider">
                  <span>Bonding Progress</span>
                  <span>{drama.bondingCurveProgress.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-black/50 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${drama.bondingCurveProgress > 90 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-green-500'
                      }`}
                    style={{ width: `${drama.bondingCurveProgress}%` }}
                  />
                </div>

                {/* [NEW] Quick Ape Button */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toastRef.current?.addToast(`Bought 0.05 ETH of ${drama.ticker} 🚀`, 'buy');
                    }}
                  >
                    🦍 Ape 0.05
                  </button>
                  <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-white transition-colors">
                    View Trade
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Trading Terminal Modal */}
      {selectedDrama && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#0a0b10] border border-white/10 w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            <button
              onClick={() => setSelectedDrama(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
            >
              ✕
            </button>

            {/* Left Column: Chart & Info */}
            <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto">
              {/* Header Info */}
              <div className="p-6 border-b border-white/10">
                <div className="flex gap-4 mb-4">
                  <img src={selectedDrama.coverImage} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h2 className="text-2xl font-black text-white leading-none">{selectedDrama.title}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm font-bold text-white/60">Ticker: {selectedDrama.ticker}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-mono">
                        Market Cap: {selectedDrama.marketCap} ETH
                      </span>
                      {selectedDrama.rugRisk === 'high' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/50">
                          RUG RISK: HIGH
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed max-w-2xl">{selectedDrama.description}</p>
              </div>

              {/* Chart Area */}
              <div className="p-6 flex-1 bg-[#101116] min-h-[300px]">
                <BondingCurveChart progress={selectedDrama.bondingCurveProgress} className="h-full" />
              </div>

              {/* Holder Stats */}
              <div className="p-6 grid grid-cols-3 gap-4 bg-[#0a0b10]">
                <div>
                  <div className="text-xs text-white/40 uppercase">Holders</div>
                  <div className="text-lg font-mono font-bold text-white">{selectedDrama.holders}</div>
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase">Dev Holding</div>
                  <div className={`text-lg font-mono font-bold ${selectedDrama.devHolding > 10 ? 'text-red-400' : 'text-green-400'}`}>
                    {selectedDrama.devHolding}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase">Created</div>
                  <div className="text-lg font-mono font-bold text-white">2h ago</div>
                </div>
              </div>
            </div>

            {/* Right Column: Trading & Comments */}
            <div className="w-full md:w-[400px] flex flex-col bg-[#0a0b10]">
              <div className="p-4 bg-[#15171e] border-b border-white/10">
                <TradingPanel ticker={selectedDrama.ticker} price={selectedDrama.currentPrice} />
              </div>

              {/* Tabs for threads/trades */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex border-b border-white/10">
                  <button className="flex-1 py-3 text-sm font-bold text-white border-b-2 border-accent">Thread</button>
                  <button className="flex-1 py-3 text-sm font-bold text-white/40 hover:text-white">Trades</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Mock Comments */}
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

                {/* Post Reply */}
                <div className="p-4 border-t border-white/10">
                  <input
                    type="text"
                    placeholder="Post a reply..."
                    className="w-full bg-[#15171e] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                  />
                </div>
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

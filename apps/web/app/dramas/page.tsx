'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ParticleBackground } from '@/app/components/ParticleBackground';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { MagneticElement } from '@/app/components/MagneticElement';
import { CountUp } from '@/app/components/CountUp';
import { INITIAL_DRAMAS, Drama, Trade } from '@/app/data/mocks';

// Re-export for other components that import from here
export { INITIAL_DRAMAS };

const CATEGORIES = [
  { id: 'all', label: '全部', icon: '🎬' },
  { id: 'meme', label: 'Meme', icon: '🐸' },
  { id: 'scifi', label: '科幻', icon: '🤖' },
  { id: 'suspense', label: '悬疑', icon: '🕵️' },
  { id: 'adventure', label: '冒险', icon: '🏺' },
  { id: 'history', label: '历史', icon: '📜' },
  { id: 'documentary', label: '纪录', icon: '📹' },
];

type SortType = 'hot' | 'new' | 'marketcap' | 'progress';

// AI 状态映射
const AI_STATUS_MAP: Record<string, { label: string; color: string }> = {
  idle: { label: '待机中', color: 'text-white/50' },
  scripting: { label: '剧本生成中', color: 'text-blue-400' },
  casting: { label: '角色选角中', color: 'text-purple-400' },
  filming: { label: '分镜渲染中', color: 'text-amber-400' },
  editing: { label: '后期剪辑中', color: 'text-green-400' },
};

// 风险等级映射
const RISK_MAP: Record<string, { label: string; color: string; bg: string }> = {
  low: { label: '低风险', color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30' },
  medium: { label: '中风险', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/30' },
  high: { label: '高风险', color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/30' },
};

// 格式化数字
function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// Drama 卡片组件
function DramaCard({ drama, index }: { drama: Drama; index: number }) {
  const risk = RISK_MAP[drama.rugRisk];
  const aiStatus = drama.aiStatus ? AI_STATUS_MAP[drama.aiStatus] : null;
  const progressPercent = Math.min(100, drama.bondingCurveProgress);
  const isNearComplete = progressPercent >= 80;
  
  return (
    <ScrollReveal delay={index * 50}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(229,9,20,0.15)]">
        {/* 封面图 */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={drama.coverImage} 
            alt={drama.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* 顶部标签 */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <div className="flex gap-2 flex-wrap">
              {isNearComplete && (
                <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-bold uppercase tracking-wider shadow-lg animate-pulse">
                  🔥 即将毕业
                </span>
              )}
              {drama.rugRisk === 'high' && (
                <span className={`px-2.5 py-1 rounded-full ${risk.bg} border ${risk.color} text-[10px] font-bold backdrop-blur-md`}>
                  🚩 高风险
                </span>
              )}
            </div>
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-mono">
              #{index + 1}
            </span>
          </div>
          
          {/* AI 状态 */}
          {aiStatus && (
            <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${aiStatus.color.replace('text-', 'bg-')} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${aiStatus.color.replace('text-', 'bg-')}`}></span>
              </span>
              <span className={`text-[10px] font-medium ${aiStatus.color}`}>{aiStatus.label}</span>
            </div>
          )}
        </div>
        
        {/* 内容区 */}
        <div className="p-5 space-y-4">
          {/* 标题和代币 */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold font-mono">
                ${drama.ticker}
              </span>
              <span className={`text-[10px] ${risk.color}`}>
                Dev: {drama.devHolding}%
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1">
              {drama.title}
            </h3>
            <p className="text-white/50 text-sm mt-1 line-clamp-2 min-h-[40px]">
              {drama.description}
            </p>
          </div>
          
          {/* 众筹进度条 */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs">
              <span className="text-white/50">Bonding Curve</span>
              <span className={`font-mono font-bold ${isNearComplete ? 'text-amber-400' : 'text-emerald-400'}`}>
                {progressPercent.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  isNearComplete 
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {drama.fundingGoal && (
              <div className="flex justify-between items-center mt-2 text-[10px] text-white/40">
                <span>{drama.marketCap.toFixed(1)} ETH raised</span>
                <span>Goal: {drama.fundingGoal} ETH</span>
              </div>
            )}
          </div>
          
          {/* 数据统计 */}
          <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/[0.06]">
            <div className="text-center">
              <div className="text-lg font-bold font-mono text-white">{formatNumber(drama.holders)}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Holders</div>
            </div>
            <div className="text-center border-x border-white/[0.06]">
              <div className="text-lg font-bold font-mono text-emerald-400">{drama.marketCap.toFixed(1)}E</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Mcap</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold font-mono text-white">${(drama.currentPrice * 2420).toFixed(2)}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Price</div>
            </div>
          </div>
          
          {/* 表情反应 */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {Object.entries(drama.reactions).map(([key, count]) => {
                const emoji = { fire: '🔥', rocket: '🚀', poo: '💩', flag: '🚩' }[key] || '❓';
                return (
                  <button 
                    key={key}
                    className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-white/60 hover:text-white transition"
                  >
                    <span>{emoji}</span>
                    <span className="font-mono">{formatNumber(count)}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex gap-3 pt-2">
            <Link 
              href={`/theater/demo`}
              className="flex-1 py-2.5 text-center rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold text-sm hover:shadow-[0_10px_40px_rgba(229,9,20,0.4)] hover:scale-[1.02] transition-all"
            >
              进入剧场 →
            </Link>
            <button className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition text-sm">
              交易
            </button>
          </div>
        </div>
        
        {/* Tags */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <div className="flex gap-2 flex-wrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            {drama.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// King of the Hill 组件
function KingOfTheHillHero({ drama }: { drama: Drama }) {
  const progressPercent = Math.min(100, ((drama.marketCap || 0) / (drama.fundingGoal || 100)) * 100);
  
  return (
    <ScrollReveal>
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10">
        {/* 背景图 */}
        <div className="absolute inset-0">
          <img 
            src={drama.coverImage} 
            alt={drama.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        
        <div className="relative p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* 左侧信息 */}
            <div className="flex-1 space-y-6">
              {/* 徽章 */}
              <div className="flex flex-wrap items-center gap-3">
                <MagneticElement strength={0.1}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-sm uppercase tracking-wider shadow-[0_10px_40px_rgba(245,158,11,0.4)] animate-pulse">
                    👑 King of the Hill
                  </span>
                </MagneticElement>
                {drama.aiStatus && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-white/80">AI: {AI_STATUS_MAP[drama.aiStatus]?.label}</span>
                  </span>
                )}
              </div>
              
              {/* 标题 */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold font-mono">
                    ${drama.ticker}
                  </span>
                  <span className="text-white/40 text-sm">by {drama.creator}</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                  {drama.title}
                </h2>
                <p className="text-white/60 text-lg mt-4 max-w-xl">
                  {drama.description}
                </p>
              </div>
              
              {/* 里程碑进度 */}
              {drama.nextMilestone && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">当前目标</span>
                      <p className="text-white font-semibold mt-1">{drama.nextMilestone}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-mono font-bold text-white">{drama.marketCap.toFixed(1)}</span>
                      <span className="text-white/40 text-sm"> / {drama.fundingGoal} ETH</span>
                    </div>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-full relative"
                      style={{ width: `${progressPercent}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* 按钮组 */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href={`/theater/demo`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold text-lg hover:shadow-[0_20px_60px_rgba(229,9,20,0.5)] hover:scale-[1.03] transition-all"
                >
                  <span>🎬</span> 进入分镜剧场
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition">
                  <span>💰</span> 支持项目
                </button>
                <Link 
                  href={`/drama/${drama.id}/tree`}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/20 text-white hover:bg-white/5 transition"
                >
                  <span>🌳</span> 查看故事树
                </Link>
              </div>
            </div>
            
            {/* 右侧统计 */}
            <div className="w-full lg:w-80 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-mono font-bold text-white">
                    <CountUp end={drama.holders} duration={2000} />
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Holders</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-mono font-bold text-emerald-400">
                    {drama.marketCap.toFixed(1)}E
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Market Cap</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-mono font-bold text-rose-400">
                    {drama.bondingCurveProgress.toFixed(0)}%
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Curve</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-mono font-bold text-amber-400">
                    {drama.devHolding}%
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Dev Hold</div>
                </div>
              </div>
              
              {/* Top Holders */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-white/50 mb-3">Top Holders</h4>
                <div className="space-y-2">
                  {drama.topHolders.slice(0, 3).map((holder, i) => (
                    <div key={holder.address} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-white/30 font-mono text-xs">{i + 1}</span>
                        <span className="text-white/80 font-mono">{holder.address}</span>
                        {holder.isDev && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px]">DEV</span>
                        )}
                      </div>
                      <span className="text-white/60 font-mono">{holder.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// 平台统计组件
function PlatformStats() {
  return (
    <ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '总募资额', value: 420.5, suffix: 'ETH', color: 'from-emerald-400 to-teal-400' },
          { label: '活跃项目', value: 24, suffix: '', color: 'from-rose-400 to-fuchsia-400' },
          { label: '创作者', value: 156, suffix: '', color: 'from-amber-400 to-orange-400' },
          { label: '分镜总数', value: 1247, suffix: '', color: 'from-blue-400 to-indigo-400' },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] text-center">
            <div className={`text-3xl font-mono font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              <CountUp end={stat.value} duration={2000} decimals={stat.suffix === 'ETH' ? 1 : 0} />
              {stat.suffix}
            </div>
            <div className="text-xs text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}

export default function DramasPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState<SortType>('hot');
  const [searchQuery, setSearchQuery] = useState('');
  const [dramas, setDramas] = useState<Drama[]>(INITIAL_DRAMAS);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setDramas(prevDramas => {
        return prevDramas.map(drama => {
          if (drama.status === 'completed' || Math.random() > 0.3) return drama;
          
          const change = (Math.random() - 0.4) * 0.5;
          const newMarketCap = Math.max(0, drama.marketCap + change);
          const newProgress = Math.min(100, Math.max(0, (newMarketCap / 80) * 100));

          return {
            ...drama,
            marketCap: Number(newMarketCap.toFixed(2)),
            bondingCurveProgress: newProgress,
            currentPrice: Number((newMarketCap / 10000).toFixed(6)),
          };
        });
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredDramas = dramas
    .filter(drama => {
      if (activeCategory !== 'all' && drama.category !== activeCategory) return false;
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return drama.title.toLowerCase().includes(query) ||
        drama.ticker.toLowerCase().includes(query) ||
        drama.description.toLowerCase().includes(query);
    })
    .sort((a, b) => {
      if (sort === 'hot') return b.bondingCurveProgress - a.bondingCurveProgress;
      if (sort === 'marketcap') return b.marketCap - a.marketCap;
      if (sort === 'progress') return b.progress - a.progress;
      return 0;
    });

  const kingOfTheHill = [...dramas].sort((a, b) => b.marketCap - a.marketCap)[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030305]">
        <div className="text-center space-y-4">
          <div className="relative h-20 w-20 mx-auto">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
            <div className="absolute inset-0 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-3xl">🎬</div>
          </div>
          <p className="text-white/60">加载众筹列表...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030305] text-white overflow-hidden">
      {/* 背景效果 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(229,9,20,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_50%,rgba(120,119,198,0.08),transparent_50%)]" />
        <ParticleBackground />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* 主内容 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <header className="mb-12">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 border border-rose-500/30 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  <span className="text-sm text-white/80">Live · AI Drama Launchpad</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black">
                  <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                    Drama.fun
                  </span>
                </h1>
                <p className="text-white/50 mt-2 text-lg">
                  AI 驱动的互动漫剧众筹平台 · 支持你喜欢的故事
                </p>
              </div>
              
              {/* 搜索和操作 */}
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索项目..."
                    className="w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs font-mono">⌘K</span>
                </div>
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold hover:shadow-[0_10px_40px_rgba(229,9,20,0.4)] transition">
                  创建项目
                </button>
              </div>
            </div>
          </ScrollReveal>
        </header>

        {/* 平台统计 */}
        <section className="mb-12">
          <PlatformStats />
        </section>

        {/* King of the Hill */}
        {kingOfTheHill && !searchQuery && activeCategory === 'all' && (
          <section className="mb-12">
            <KingOfTheHillHero drama={kingOfTheHill} />
          </section>
        )}

        {/* 分类和排序 */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* 分类标签 */}
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white shadow-[0_5px_20px_rgba(229,9,20,0.3)]'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
              
              {/* 排序选项 */}
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">排序:</span>
                {[
                  { id: 'hot', label: '🔥 热门' },
                  { id: 'marketcap', label: '💰 市值' },
                  { id: 'new', label: '✨ 最新' },
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSort(s.id as SortType)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      sort === s.id
                        ? 'bg-white/10 text-white'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Drama 列表 */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDramas.map((drama, index) => (
              <DramaCard key={drama.id} drama={drama} index={index} />
            ))}
          </div>
          
          {filteredDramas.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-white/50 text-lg">没有找到匹配的项目</p>
            </div>
          )}
        </section>

        {/* 底部 CTA */}
        <section className="mt-20 text-center">
          <ScrollReveal>
            <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-rose-500/10 via-transparent to-fuchsia-500/10 border border-white/[0.06]">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                准备好创作你的 AI 漫剧了吗？
              </h3>
              <p className="text-white/50 max-w-xl mx-auto mb-8">
                加入我们的创作者社区，使用 AI 工具生成分镜，让观众投票决定剧情走向
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold text-lg hover:shadow-[0_20px_60px_rgba(229,9,20,0.5)] transition">
                  开始创建 →
                </button>
                <Link 
                  href="/whitepaper"
                  className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/5 transition"
                >
                  阅读白皮书
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

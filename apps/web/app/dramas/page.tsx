'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ParticleBackground } from '@/app/components/ParticleBackground';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { MagneticElement } from '@/app/components/MagneticElement';
import { CountUp } from '@/app/components/CountUp';
import { BondingCurveChart } from '@/app/components/BondingCurveChart';
import { INITIAL_DRAMAS, Drama, Trade } from '@/app/data/mocks';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getDramasContent } from '@/lib/i18n/dramas';

type SortType = 'hot' | 'new' | 'marketcap' | 'progress';

// 格式化数字
function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// 格式化时间
function formatTimeAgo(timestamp: number, agoText: string): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ${agoText}`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${agoText}`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${agoText}`;
}

// 交易模态框组件
function TradeModal({ 
  drama, 
  onClose,
  content,
}: { 
  drama: Drama; 
  onClose: () => void;
  content: ReturnType<typeof getDramasContent>;
}) {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [recentTrades, setRecentTrades] = useState<Trade[]>(drama.recentTrades || []);

  const ethPrice = amount ? Number(amount) : 0;
  const tokenAmount = ethPrice / drama.currentPrice;
  
  // 模拟实时交易
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newTrade: Trade = {
          id: Math.random().toString(36).substr(2, 9),
          type: Math.random() > 0.4 ? 'buy' : 'sell',
          amount: parseFloat((Math.random() * 0.5 + 0.01).toFixed(3)),
          price: drama.currentPrice,
          trader: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
          timestamp: Date.now()
        };
        setRecentTrades(prev => [newTrade, ...prev].slice(0, 20));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [drama.currentPrice]);

  const riskColor = {
    low: 'text-emerald-400 bg-emerald-500/20',
    medium: 'text-amber-400 bg-amber-500/20',
    high: 'text-red-400 bg-red-500/20',
  }[drama.rugRisk];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* 模态框内容 */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0b10] shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition flex items-center justify-center"
        >
          ✕
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* 左侧 - 信息区 */}
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/10">
            {/* 头部信息 */}
            <div className="flex items-start gap-4 mb-6">
              <div className="h-16 w-16 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={drama.coverImage} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold font-mono">
                    ${drama.ticker}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${riskColor}`}>
                    {content.risk[drama.rugRisk as keyof typeof content.risk]}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white truncate">{drama.title}</h2>
                <p className="text-white/50 text-sm mt-1 line-clamp-2">{drama.description}</p>
              </div>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/5 border border-white/[0.06] text-center">
                <div className="text-lg font-bold font-mono text-emerald-400">{drama.marketCap.toFixed(2)}E</div>
                <div className="text-[10px] text-white/40 uppercase">{content.kingOfHill.marketCap}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/[0.06] text-center">
                <div className="text-lg font-bold font-mono text-white">${(drama.currentPrice * 2420).toFixed(4)}</div>
                <div className="text-[10px] text-white/40 uppercase">{content.card.price}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/[0.06] text-center">
                <div className="text-lg font-bold font-mono text-white">{formatNumber(drama.holders)}</div>
                <div className="text-[10px] text-white/40 uppercase">{content.card.holders}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/[0.06] text-center">
                <div className="text-lg font-bold font-mono text-rose-400">{drama.devHolding}%</div>
                <div className="text-[10px] text-white/40 uppercase">{content.modal.devHolding}</div>
              </div>
            </div>

            {/* Bonding Curve */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-white/70">{content.modal.bondingProgress}</span>
                <span className="text-sm font-mono font-bold text-rose-400">{drama.bondingCurveProgress.toFixed(1)}%</span>
              </div>
              <BondingCurveChart progress={drama.bondingCurveProgress} className="h-[180px] !bg-black/30 !rounded-xl" />
            </div>

            {/* 最近交易 */}
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-3">{content.modal.recentTrades}</h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {recentTrades.length > 0 ? (
                  recentTrades.slice(0, 10).map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${trade.type === 'buy' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className="text-white/80 font-mono text-xs">{trade.trader}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className={trade.type === 'buy' ? 'text-emerald-400' : 'text-red-400'}>
                          {trade.type === 'buy' ? content.modal.buyAction : content.modal.sellAction} {trade.amount.toFixed(3)} ETH
                        </span>
                        <span className="text-white/30">{formatTimeAgo(trade.timestamp, content.modal.ago)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white/30 text-sm text-center py-4">{content.modal.noTrades}</p>
                )}
              </div>
            </div>
          </div>

          {/* 右侧 - 交易面板 */}
          <div className="w-full lg:w-[380px] bg-[#12141a] flex flex-col">
            {/* 买卖切换 */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setMode('buy')}
                className={`flex-1 py-4 text-sm font-bold transition-all ${
                  mode === 'buy' 
                    ? 'bg-emerald-500 text-black' 
                    : 'hover:bg-white/5 text-white/60'
                }`}
              >
                {content.modal.buy}
              </button>
              <button
                onClick={() => setMode('sell')}
                className={`flex-1 py-4 text-sm font-bold transition-all ${
                  mode === 'sell' 
                    ? 'bg-red-500 text-white' 
                    : 'hover:bg-white/5 text-white/60'
                }`}
              >
                {content.modal.sell}
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-5">
              {/* 输入区域 */}
              <div className="space-y-4">
                <div className="bg-black/40 rounded-xl p-4 border border-white/10 focus-within:border-rose-500/50 transition-colors">
                  <div className="flex justify-between text-xs text-white/40 mb-2">
                    <span>{content.modal.amount} ({mode === 'buy' ? 'ETH' : drama.ticker})</span>
                    <span>{content.modal.max}: 0.5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.0"
                      className="bg-transparent text-white font-mono text-xl w-full focus:outline-none"
                    />
                    <span className="text-white/60 font-bold text-sm bg-white/10 px-3 py-1.5 rounded-lg">
                      {mode === 'buy' ? 'ETH' : drama.ticker}
                    </span>
                  </div>
                </div>

                {amount && (
                  <div className="text-center text-white/30 text-lg">↓</div>
                )}

                <div className="bg-black/40 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between text-xs text-white/40 mb-2">
                    <span>{content.modal.receive}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-white font-mono text-xl w-full">
                      {amount 
                        ? (mode === 'buy' 
                          ? tokenAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })
                          : (Number(amount) * drama.currentPrice).toFixed(4)
                        ) 
                        : '0.0'
                      }
                    </div>
                    <span className="text-white/60 font-bold text-sm bg-white/10 px-3 py-1.5 rounded-lg">
                      {mode === 'buy' ? drama.ticker : 'ETH'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 快捷按钮 */}
              <div className="flex gap-2">
                {['0.01', '0.05', '0.1', '0.5'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className="flex-1 py-2 text-xs font-mono text-white/60 bg-white/5 hover:bg-white/10 rounded-lg transition"
                  >
                    {val}
                  </button>
                ))}
              </div>

              {/* 费用信息 */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/40">
                  <span>{content.modal.fee}</span>
                  <span>~0.003 ETH</span>
                </div>
                <div className="flex justify-between text-white/40">
                  <span>Slippage</span>
                  <span>0.5%</span>
                </div>
              </div>

              {/* 交易按钮 */}
              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 ${
                  mode === 'buy'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_10px_40px_rgba(34,197,94,0.3)]'
                    : 'bg-red-500 hover:bg-red-400 text-white shadow-[0_10px_40px_rgba(239,68,68,0.3)]'
                }`}
              >
                {mode === 'buy' ? content.modal.placeTrade : content.modal.sellTokens}
              </button>

              {/* 底部链接 */}
              <div className="flex gap-3 mt-auto">
                <Link 
                  href="/theater/demo"
                  className="flex-1 py-3 text-center rounded-xl bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 border border-rose-500/30 text-rose-400 font-medium text-sm hover:border-rose-500/50 transition"
                >
                  {content.modal.enterTheater}
                </Link>
                <Link 
                  href={`/drama/${drama.id}`}
                  className="flex-1 py-3 text-center rounded-xl border border-white/10 text-white/60 font-medium text-sm hover:text-white hover:border-white/20 transition"
                >
                  {content.modal.viewDetails}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}

// Drama 卡片组件
function DramaCard({ 
  drama, 
  index, 
  content,
  onTradeClick,
}: { 
  drama: Drama; 
  index: number;
  content: ReturnType<typeof getDramasContent>;
  onTradeClick: () => void;
}) {
  const aiStatusText = content.aiStatus[drama.aiStatus as keyof typeof content.aiStatus] || content.aiStatus.idle;
  const progressPercent = Math.min(100, drama.bondingCurveProgress);
  const isNearComplete = progressPercent >= 80;
  
  const riskColors = {
    low: 'text-emerald-400',
    medium: 'text-amber-400',
    high: 'text-red-400',
  };
  
  const aiStatusColors = {
    idle: 'text-white/50 bg-white/10',
    scripting: 'text-blue-400 bg-blue-500/20',
    casting: 'text-purple-400 bg-purple-500/20',
    filming: 'text-amber-400 bg-amber-500/20',
    editing: 'text-green-400 bg-green-500/20',
  };
  
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
                  {content.card.graduating}
                </span>
              )}
              {drama.rugRisk === 'high' && (
                <span className="px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-bold backdrop-blur-md">
                  {content.card.highRisk}
                </span>
              )}
            </div>
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-mono">
              #{index + 1}
            </span>
          </div>
          
          {/* AI 状态 */}
          {drama.aiStatus && (
            <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${aiStatusColors[drama.aiStatus as keyof typeof aiStatusColors]?.replace('text-', 'bg-').split(' ')[0]}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${aiStatusColors[drama.aiStatus as keyof typeof aiStatusColors]?.replace('text-', 'bg-').split(' ')[0]}`}></span>
              </span>
              <span className={`text-[10px] font-medium ${aiStatusColors[drama.aiStatus as keyof typeof aiStatusColors]?.split(' ')[0]}`}>
                {aiStatusText}
              </span>
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
              <span className={`text-[10px] ${riskColors[drama.rugRisk]}`}>
                {content.card.dev}: {drama.devHolding}%
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
              <span className="text-white/50">{content.card.bondingCurve}</span>
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
                <span>{drama.marketCap.toFixed(1)} ETH {content.card.raised}</span>
                <span>{content.card.goal}: {drama.fundingGoal} ETH</span>
              </div>
            )}
          </div>
          
          {/* 数据统计 */}
          <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/[0.06]">
            <div className="text-center">
              <div className="text-lg font-bold font-mono text-white">{formatNumber(drama.holders)}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">{content.card.holders}</div>
            </div>
            <div className="text-center border-x border-white/[0.06]">
              <div className="text-lg font-bold font-mono text-emerald-400">{drama.marketCap.toFixed(1)}E</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">{content.card.mcap}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold font-mono text-white">${(drama.currentPrice * 2420).toFixed(2)}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">{content.card.price}</div>
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
                    className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-white/60 hover:text-white transition hover:scale-110 active:scale-95"
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
              href="/theater/demo"
              className="flex-1 py-2.5 text-center rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold text-sm hover:shadow-[0_10px_40px_rgba(229,9,20,0.4)] hover:scale-[1.02] transition-all"
            >
              {content.card.enterTheater}
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onTradeClick();
              }}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition text-sm font-medium"
            >
              {content.card.trade}
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// King of the Hill 组件
function KingOfTheHillHero({ drama, content }: { drama: Drama; content: ReturnType<typeof getDramasContent> }) {
  const progressPercent = Math.min(100, ((drama.marketCap || 0) / (drama.fundingGoal || 100)) * 100);
  const aiStatusText = content.aiStatus[drama.aiStatus as keyof typeof content.aiStatus] || content.aiStatus.idle;
  
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
                    {content.kingOfHill.badge}
                  </span>
                </MagneticElement>
                {drama.aiStatus && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-white/80">AI: {aiStatusText}</span>
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
                      <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">{content.kingOfHill.currentGoal}</span>
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
                  href="/theater/demo"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold text-lg hover:shadow-[0_20px_60px_rgba(229,9,20,0.5)] hover:scale-[1.03] transition-all"
                >
                  {content.kingOfHill.enterTheater}
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition">
                  {content.kingOfHill.supportProject}
                </button>
                <Link 
                  href={`/drama/${drama.id}/tree`}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/20 text-white hover:bg-white/5 transition"
                >
                  {content.kingOfHill.viewStoryTree}
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
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{content.kingOfHill.holders}</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-mono font-bold text-emerald-400">
                    {drama.marketCap.toFixed(1)}E
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{content.kingOfHill.marketCap}</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-mono font-bold text-rose-400">
                    {drama.bondingCurveProgress.toFixed(0)}%
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{content.kingOfHill.curve}</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-mono font-bold text-amber-400">
                    {drama.devHolding}%
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{content.kingOfHill.devHold}</div>
                </div>
              </div>
              
              {/* Top Holders */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-white/50 mb-3">{content.kingOfHill.topHolders}</h4>
                <div className="space-y-2">
                  {drama.topHolders.slice(0, 3).map((holder, i) => (
                    <div key={holder.address} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-white/30 font-mono text-xs">{i + 1}</span>
                        <span className="text-white/80 font-mono">{holder.address}</span>
                        {holder.isDev && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px]">{content.kingOfHill.devTag}</span>
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
function PlatformStats({ content }: { content: ReturnType<typeof getDramasContent> }) {
  return (
    <ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: content.stats.totalRaised, value: 420.5, suffix: 'ETH', color: 'from-emerald-400 to-teal-400' },
          { label: content.stats.activeProjects, value: 24, suffix: '', color: 'from-rose-400 to-fuchsia-400' },
          { label: content.stats.creators, value: 156, suffix: '', color: 'from-amber-400 to-orange-400' },
          { label: content.stats.totalFrames, value: 1247, suffix: '', color: 'from-blue-400 to-indigo-400' },
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
  const { language } = useLanguage();
  const content = getDramasContent(language);
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState<SortType>('hot');
  const [searchQuery, setSearchQuery] = useState('');
  const [dramas, setDramas] = useState<Drama[]>(INITIAL_DRAMAS);
  const [selectedDramaForTrade, setSelectedDramaForTrade] = useState<Drama | null>(null);

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

  const categories = [
    { id: 'all', label: content.categories.all, icon: '🎬' },
    { id: 'meme', label: content.categories.meme, icon: '🐸' },
    { id: 'scifi', label: content.categories.scifi, icon: '🤖' },
    { id: 'suspense', label: content.categories.suspense, icon: '🕵️' },
    { id: 'adventure', label: content.categories.adventure, icon: '🏺' },
    { id: 'history', label: content.categories.history, icon: '📜' },
    { id: 'documentary', label: content.categories.documentary, icon: '📹' },
  ];

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
          <p className="text-white/60">Loading...</p>
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
                  <span className="text-sm text-white/80">{content.header.badge}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black">
                  <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                    {content.header.title}
                  </span>
                </h1>
                <p className="text-white/50 mt-2 text-lg">
                  {content.header.subtitle}
                </p>
              </div>
              
              {/* 搜索和操作 */}
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={content.header.searchPlaceholder}
                    className="w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs font-mono">⌘K</span>
                </div>
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold hover:shadow-[0_10px_40px_rgba(229,9,20,0.4)] transition">
                  {content.header.createProject}
                </button>
              </div>
            </div>
          </ScrollReveal>
        </header>

        {/* 平台统计 */}
        <section className="mb-12">
          <PlatformStats content={content} />
        </section>

        {/* King of the Hill */}
        {kingOfTheHill && !searchQuery && activeCategory === 'all' && (
          <section className="mb-12">
            <KingOfTheHillHero drama={kingOfTheHill} content={content} />
          </section>
        )}

        {/* 分类和排序 */}
        <section className="mb-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* 分类标签 */}
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
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
                <span className="text-white/40 text-sm">{content.sort.label}</span>
                {[
                  { id: 'hot', label: content.sort.hot },
                  { id: 'marketcap', label: content.sort.marketcap },
                  { id: 'new', label: content.sort.new },
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
              <DramaCard 
                key={drama.id} 
                drama={drama} 
                index={index} 
                content={content}
                onTradeClick={() => setSelectedDramaForTrade(drama)}
              />
            ))}
          </div>
          
          {filteredDramas.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-white/50 text-lg">{content.empty}</p>
            </div>
          )}
        </section>

        {/* 底部 CTA */}
        <section className="mt-20 text-center">
          <ScrollReveal>
            <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-rose-500/10 via-transparent to-fuchsia-500/10 border border-white/[0.06]">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {content.cta.title}
              </h3>
              <p className="text-white/50 max-w-xl mx-auto mb-8">
                {content.cta.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold text-lg hover:shadow-[0_20px_60px_rgba(229,9,20,0.5)] transition">
                  {content.cta.startCreating}
                </button>
                <Link 
                  href="/whitepaper"
                  className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/5 transition"
                >
                  {content.cta.readWhitepaper}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* 交易模态框 */}
      {selectedDramaForTrade && (
        <TradeModal 
          drama={selectedDramaForTrade} 
          onClose={() => setSelectedDramaForTrade(null)}
          content={content}
        />
      )}
    </div>
  );
}

'use client';

import { TiltCard } from '@/app/components/TiltCard';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getDramaContent } from '@/lib/i18n/drama';

interface DramaHeroProps {
    drama: any; // Using any for now to match the loosening of types in the page, ideally use shared Drama type
}

export function DramaHero({ drama }: DramaHeroProps) {
    const { language } = useLanguage();
    const content = getDramaContent(language);

    if (!drama) return null;

    return (
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 group">
            {/* Dynamic Background Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src={drama.coverImage}
                    alt={drama.title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-[#0a0b10]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b10]/80 via-transparent to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end items-start gap-6">

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.4)] animate-pulse">
                        {content.hero.liveCrowdfunding}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                        {drama.category}
                    </span>
                </div>

                {/* Title & Description */}
                <div className="max-w-3xl space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl">
                        {drama.title}
                    </h1>

                    {/* Live AI Terminal */}
                    <div className="font-mono text-sm text-green-400 bg-black/80 p-3 rounded-lg border border-green-500/30 max-w-xl shadow-lg backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
                        <span className="opacity-50 mr-2">{`>`}</span>
                        <span className="animate-[typewriter_3s_steps(40)_infinite]">{content.hero.aiTerminal.line1}</span>
                        <br />
                        <span className="opacity-50 mr-2">{`>`}</span>
                        <span className="text-white/80">{content.hero.aiTerminal.line2}</span>
                        <span className="animate-pulse">_</span>
                    </div>

                    <p className="text-lg md:text-xl text-white/80 line-clamp-2 leading-relaxed max-w-2xl">
                        {drama.description}
                    </p>
                </div>

                {/* Funding Progress Bar - Explicit Milestone */}
                <div className="w-full max-w-2xl space-y-3 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs font-bold text-accent uppercase mb-1">{content.hero.currentGoal}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black text-white">{content.hero.unlockEpisode2}</span>
                                <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/50">{content.hero.milestone1}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-black text-green-400">12.5 ETH</span>
                            <span className="text-sm text-white/40 ml-1">/ 18 ETH</span>
                        </div>
                    </div>

                    <div className="h-6 bg-black/50 rounded-full overflow-hidden border border-white/10 relative">
                        <div className="absolute inset-0 bg-white/5 pattern-diagonal-lines opacity-20" />
                        <div className="h-full bg-gradient-to-r from-accent to-purple-600 w-[67%] shadow-[0_0_20px_rgba(229,9,20,0.5)] relative flex items-center justify-end px-2">
                            <span className="text-[10px] font-bold text-white drop-shadow-md">67%</span>
                        </div>
                    </div>
                </div>

                {/* Creator Info */}
                <div className="flex items-center gap-4 py-2 opacity-80 hover:opacity-100 transition">
                    <img src={drama.creatorAvatar} className="w-8 h-8 rounded-full border border-white/20" />
                    <div>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest">{content.hero.creator}</p>
                        <p className="text-xs text-white font-bold">{drama.creator}</p>
                    </div>
                </div>

                {/* Actions - Explicit CTA */}
                <div className="flex flex-wrap gap-4 mt-2">
                    {/* 主要 CTA: 进入分镜剧场 */}
                    <Link href={`/theater/demo`}>
                        <button className="h-16 px-8 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white hover:shadow-[0_20px_60px_rgba(229,9,20,0.5)] transition-all transform hover:-translate-y-1 hover:scale-[1.02] flex items-center gap-4 group relative overflow-hidden border border-white/10">
                            <span className="text-3xl group-hover:scale-125 transition-transform">🎬</span>
                            <div className="flex flex-col items-start">
                                <span className="text-xs font-bold text-rose-200 uppercase tracking-wider">{content.hero.cta.interactiveDemo}</span>
                                <span className="text-xl font-black leading-none">{content.hero.cta.enterTheater}</span>
                            </div>
                            <div className="h-8 w-px bg-white/20" />
                            <span className="text-lg">→</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </button>
                    </Link>

                    {/* 次要 CTA: 支持项目 */}
                    <button className="h-16 px-8 rounded-full bg-amber-500 text-black hover:bg-amber-400 transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(245,158,11,0.3)] flex items-center gap-4 group relative overflow-hidden">
                        <div className="flex flex-col items-start">
                            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">{content.hero.cta.investNow}</span>
                            <span className="text-xl font-black leading-none">{content.hero.cta.fundEpisode2}</span>
                        </div>
                        <div className="h-8 w-px bg-black/20" />
                        <span className="text-2xl group-hover:scale-125 transition-transform">⚡</span>
                    </button>

                    {/* 故事树 */}
                    <Link href={`/drama/${drama.id}/tree`}>
                        <button className="h-16 px-8 rounded-full bg-white/5 text-white hover:bg-white/10 transition-all transform hover:-translate-y-1 backdrop-blur-md border border-white/10 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg">🌳</span>
                            <div className="flex flex-col items-start">
                                <span className="text-xs text-white/40 uppercase font-bold">{content.hero.cta.storyTree}</span>
                                <span className="font-bold">{content.hero.cta.viewStoryTree}</span>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Side Stats (Desktop Only) */}
            <div className="absolute right-12 bottom-12 hidden lg:flex flex-col gap-4 text-right">
                <div className="bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">{content.hero.stats.marketCap}</p>
                    <p className="text-2xl font-mono font-bold text-green-400">{drama.marketCap} ETH</p>
                </div>
                <div className="bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">{content.hero.stats.backers}</p>
                    <p className="text-2xl font-mono font-bold text-white">{drama.holders}</p>
                </div>
            </div>
        </div>
    );
}

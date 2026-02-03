'use client';

import { BondingCurveChart } from '@/app/components/BondingCurveChart';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getDramaContent } from '@/lib/i18n/drama';

interface FundingDashboardProps {
    drama: any;
}

export function FundingDashboard({ drama }: FundingDashboardProps) {
    const { language } = useLanguage();
    const content = getDramaContent(language);

    if (!drama) return null;

    return (
        <div className="space-y-6">
            {/* Funding Progress & Perks (New) */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#15171e] rounded-3xl p-6 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <span className="text-6xl">🗺</span>
                    </div>
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <span>{content.funding.roadmap}</span>
                        <span className="text-[10px] bg-white/10 px-2 rounded-full text-white/50">{content.funding.phase}</span>
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-start gap-4 opacity-50">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <div className="w-0.5 h-10 bg-white/10" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-400">{content.funding.milestones.completedLabel}</p>
                                <p className="text-sm text-white line-through">{content.funding.milestones.completedTitle}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-4 h-4 rounded-full border-2 border-accent bg-accent animate-pulse shadow-[0_0_10px_rgba(229,9,20,0.5)]" />
                                <div className="w-0.5 h-10 bg-white/10" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-accent">{content.funding.milestones.currentLabel}</p>
                                <p className="text-sm text-white font-bold">{content.funding.milestones.currentTitle}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 opacity-50">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white/50">{content.funding.milestones.futureLabel}</p>
                                <p className="text-sm text-white">{content.funding.milestones.futureTitle}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-noise opacity-10" />
                    <h3 className="font-bold text-white mb-4 relative z-10">{content.funding.perks.title}</h3>
                    <ul className="space-y-3 relative z-10">
                        {content.funding.perks.items.map((item, index) => (
                            <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                                    {index === 0 ? '🗳' : index === 1 ? '🎭' : '📺'}
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 transition font-bold text-sm text-white relative z-10 flex items-center justify-center gap-2">
                        {content.funding.perks.viewAll} <span>→</span>
                    </button>
                </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs text-white/50 uppercase">{content.funding.highlights.marketCap}</p>
                    <p className="text-xl font-bold text-green-400">{drama.marketCap} ETH</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs text-white/50 uppercase">{content.funding.highlights.price}</p>
                    <p className="text-xl font-bold text-white">{drama.currentPrice} ETH</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs text-white/50 uppercase">{content.funding.highlights.holders}</p>
                    <p className="text-xl font-bold text-white">{drama.holders}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs text-white/50 uppercase">{content.funding.highlights.devHolding}</p>
                    <p className={`text-xl font-bold ${drama.devHolding > 10 ? 'text-red-400' : 'text-green-400'}`}>
                        {drama.devHolding}%
                    </p>
                </div>
            </div>

            {/* Bonding Curve Section */}
            <div className="bg-[#15171e] rounded-3xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">{content.funding.bondingCurve.title}</h3>
                    <div className="text-right">
                        <p className="text-sm text-white/60">{content.funding.bondingCurve.progress}</p>
                        <div className="flex items-center gap-2 justify-end">
                            <span className="text-accent font-bold text-lg">{drama.bondingCurveProgress}%</span>
                            <span className="text-xs text-white/40">{content.funding.bondingCurve.target.replace('{target}', '69 ETH')}</span>
                        </div>
                    </div>
                </div>

                <BondingCurveChart progress={drama.bondingCurveProgress} className="h-[250px] !bg-black/20" />
            </div>

            {/* Holders & Risks */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Top Holders */}
                <div className="bg-[#15171e] rounded-3xl p-6 border border-white/10">
                    <h3 className="font-bold text-white mb-4">{content.funding.topHolders.title}</h3>
                    <div className="space-y-3">
                        {drama.topHolders?.map((holder: any, i: number) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${holder.isDev ? 'bg-red-500' : 'bg-blue-500'}`} />
                                    <span className={`${holder.isDev ? 'text-red-400' : 'text-white/80'} font-mono`}>
                                        {holder.address}
                                        {holder.isDev && <span className="ml-2 text-[10px] border border-red-500/50 px-1 rounded text-red-400">{content.funding.topHolders.devTag}</span>}
                                    </span>
                                </div>
                                <span className="font-bold text-white">{holder.percentage}%</span>
                            </div>
                        ))}
                        {!drama.topHolders && <p className="text-white/30 text-sm">{content.funding.topHolders.noData}</p>}
                    </div>
                </div>

                {/* Risk Analysis */}
                <div className="bg-[#15171e] rounded-3xl p-6 border border-white/10">
                    <h3 className="font-bold text-white mb-4">{content.funding.risk.title}</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-white/60">{content.funding.risk.rugProbability}</span>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                        ${drama.rugRisk === 'low' ? 'bg-green-500/20 text-green-400' :
                                    drama.rugRisk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-500'}
                   `}>
                                {content.funding.risk.levels[drama.rugRisk as 'low' | 'medium' | 'high'] ?? drama.rugRisk}
                            </span>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-white/50">
                                <span>{content.funding.risk.liquidityLock}</span>
                                <span>{content.funding.risk.pending}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-[60%]" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-white/50">
                                <span>{content.funding.risk.mintAuthority}</span>
                                <span className="text-green-400">{content.funding.risk.revoked}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[100%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

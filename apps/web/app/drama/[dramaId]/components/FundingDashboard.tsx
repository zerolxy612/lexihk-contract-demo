'use client';

import { BondingCurveChart } from '@/app/components/BondingCurveChart';

interface FundingDashboardProps {
    drama: any;
}

export function FundingDashboard({ drama }: FundingDashboardProps) {
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
                        <span>Funding Roadmap</span>
                        <span className="text-[10px] bg-white/10 px-2 rounded-full text-white/50">Phase 1</span>
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-start gap-4 opacity-50">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <div className="w-0.5 h-10 bg-white/10" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-400">10 ETH (Completed)</p>
                                <p className="text-sm text-white line-through">Establish Character Bible</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-4 h-4 rounded-full border-2 border-accent bg-accent animate-pulse shadow-[0_0_10px_rgba(229,9,20,0.5)]" />
                                <div className="w-0.5 h-10 bg-white/10" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-accent">18 ETH (Current Goal)</p>
                                <p className="text-sm text-white font-bold">Release Episode 2: The Twist</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 opacity-50">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white/50">50 ETH</p>
                                <p className="text-sm text-white">Full Voiceover & Soundtrack</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-noise opacity-10" />
                    <h3 className="font-bold text-white mb-4 relative z-10">💎 Backer Perks</h3>
                    <ul className="space-y-3 relative z-10">
                        <li className="flex items-center gap-3 text-sm text-white/80">
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">🗳</span>
                            <span>Vote on key plot decisions</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-white/80">
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">🎭</span>
                            <span>Name a background character (Top 10%)</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-white/80">
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">📺</span>
                            <span>Early access to unreleased scenes</span>
                        </li>
                    </ul>
                    <button className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 transition font-bold text-sm text-white relative z-10 flex items-center justify-center gap-2">
                        View All Tiers <span>→</span>
                    </button>
                </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs text-white/50 uppercase">Market Cap</p>
                    <p className="text-xl font-bold text-green-400">{drama.marketCap} ETH</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs text-white/50 uppercase">Price</p>
                    <p className="text-xl font-bold text-white">{drama.currentPrice} ETH</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs text-white/50 uppercase">Holders</p>
                    <p className="text-xl font-bold text-white">{drama.holders}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs text-white/50 uppercase">Dev Holding</p>
                    <p className={`text-xl font-bold ${drama.devHolding > 10 ? 'text-red-400' : 'text-green-400'}`}>
                        {drama.devHolding}%
                    </p>
                </div>
            </div>

            {/* Bonding Curve Section */}
            <div className="bg-[#15171e] rounded-3xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Bonding Curve</h3>
                    <div className="text-right">
                        <p className="text-sm text-white/60">Progress to DEX Listing</p>
                        <div className="flex items-center gap-2 justify-end">
                            <span className="text-accent font-bold text-lg">{drama.bondingCurveProgress}%</span>
                            <span className="text-xs text-white/40">Target: 69 ETH</span>
                        </div>
                    </div>
                </div>

                <BondingCurveChart progress={drama.bondingCurveProgress} className="h-[250px] !bg-black/20" />
            </div>

            {/* Holders & Risks */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Top Holders */}
                <div className="bg-[#15171e] rounded-3xl p-6 border border-white/10">
                    <h3 className="font-bold text-white mb-4">Top Holders</h3>
                    <div className="space-y-3">
                        {drama.topHolders?.map((holder: any, i: number) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${holder.isDev ? 'bg-red-500' : 'bg-blue-500'}`} />
                                    <span className={`${holder.isDev ? 'text-red-400' : 'text-white/80'} font-mono`}>
                                        {holder.address}
                                        {holder.isDev && <span className="ml-2 text-[10px] border border-red-500/50 px-1 rounded text-red-400">DEV</span>}
                                    </span>
                                </div>
                                <span className="font-bold text-white">{holder.percentage}%</span>
                            </div>
                        ))}
                        {!drama.topHolders && <p className="text-white/30 text-sm">No data available</p>}
                    </div>
                </div>

                {/* Risk Analysis */}
                <div className="bg-[#15171e] rounded-3xl p-6 border border-white/10">
                    <h3 className="font-bold text-white mb-4">Risk Analysis</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-white/60">Rug Probability</span>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                        ${drama.rugRisk === 'low' ? 'bg-green-500/20 text-green-400' :
                                    drama.rugRisk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-500'}
                   `}>
                                {drama.rugRisk}
                            </span>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-white/50">
                                <span>Liquidity Lock</span>
                                <span>Pending</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-[60%]" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-white/50">
                                <span>Mint Authority</span>
                                <span className="text-green-400">Revoked</span>
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

'use client';

import { useState } from 'react';

interface VoteOption {
    id: string;
    label: string;
    votes: number;
    percentage: number;
}

export function GovernancePanel() {
    const [activeTab, setActiveTab] = useState<'plot' | 'cast'>('plot');
    const [hasVoted, setHasVoted] = useState(false);

    // Mock Data
    const plotOptions: VoteOption[] = [
        { id: 'a', label: 'Kill the villain in Ep 3', votes: 1240, percentage: 65 },
        { id: 'b', label: 'Redeem the villain', votes: 650, percentage: 35 },
    ];

    const handleVote = (id: string) => {
        setHasVoted(true);
        // Logic to call contract/backend would go here
    };

    return (
        <div className="bg-[#15171e] rounded-3xl p-6 border border-white/10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    🏛 Governance
                    <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded uppercase">Live</span>
                </h3>

                <div className="flex bg-black/20 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('plot')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeTab === 'plot' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                    >
                        Plot
                    </button>
                    <button
                        onClick={() => setActiveTab('cast')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeTab === 'cast' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                    >
                        Cast
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                {activeTab === 'plot' && (
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                            <p className="text-xs text-accent font-bold uppercase mb-2">Proposal #42</p>
                            <h4 className="font-bold text-white mb-2">Episode 3: The Fate of Dr. Xenon</h4>
                            <p className="text-sm text-white/70">Should Dr. Xenon survive the explosion or perish, changing the timeline forever?</p>
                            <p className="text-xs text-white/40 mt-2">Ends in: 14h 20m</p>
                        </div>

                        <div className="space-y-3">
                            {plotOptions.map((opt) => (
                                <div key={opt.id} className="relative group">
                                    {/* Progress Bar Background */}
                                    <div className="absolute inset-0 bg-white/5 rounded-xl overflow-hidden">
                                        <div
                                            className={`h-full opacity-10 transition-all duration-1000 ${hasVoted ? 'bg-accent' : 'bg-white'}`}
                                            style={{ width: `${opt.percentage}%` }}
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleVote(opt.id)}
                                        disabled={hasVoted}
                                        className="relative w-full p-3 flex items-center justify-between z-10 hover:bg-white/5 transition rounded-xl text-left"
                                    >
                                        <span className="font-medium text-white text-sm">{opt.label}</span>
                                        <span className="text-xs font-mono text-white/60">{opt.percentage}% ({opt.votes})</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {hasVoted && (
                            <p className="text-center text-xs text-green-400 mt-2 animate-pulse">
                                ✓ Your vote has been recorded on-chain
                            </p>
                        )}
                    </div>
                )}

                {activeTab === 'cast' && (
                    <div className="text-center py-10">
                        <p className="text-white/40 text-sm">No casting calls active right now.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

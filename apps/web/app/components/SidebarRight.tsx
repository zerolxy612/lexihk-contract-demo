'use client';

import { useEffect, useState, useRef } from 'react';

interface Activity {
    id: string;
    type: 'buy' | 'sell' | 'mint' | 'king';
    message: string;
    ticker: string;
    amount?: string;
    timestamp: number;
}

export function SidebarRight() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const addActivity = () => {
            if (Math.random() > 0.7) return; // Not every tick

            const types: Activity['type'][] = ['buy', 'buy', 'sell', 'mint', 'king'];
            const type = types[Math.floor(Math.random() * types.length)];
            const tickers = ['DOGE2', 'PEPE', 'AI_GOD', 'RUG', 'MOG', 'SPX'];
            const ticker = tickers[Math.floor(Math.random() * tickers.length)];

            let message = '';
            let amount = '';

            if (type === 'buy') {
                amount = (Math.random() * 2).toFixed(2);
                message = `bought ${amount} ETH`;
            } else if (type === 'sell') {
                amount = (Math.random() * 0.5).toFixed(2);
                message = `sold ${amount} ETH`;
            } else if (type === 'mint') {
                message = 'just launched';
            } else {
                message = 'is now KING';
            }

            const newActivity: Activity = {
                id: Math.random().toString(36).substr(2, 9),
                type,
                message,
                ticker,
                amount,
                timestamp: Date.now()
            };

            setActivities(prev => [newActivity, ...prev].slice(0, 30));
        };

        const interval = setInterval(addActivity, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-[300px] hidden xl:flex flex-col h-[calc(100vh-64px)] overflow-hidden border-l border-white/5 bg-[#0a0b10] sticky top-[64px]">

            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-black text-sm italic">LIVE FEED</h3>
                <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-white/40 font-mono">REALTIME</span>
                </div>
            </div>

            {/* Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={scrollRef}>
                {activities.map(act => (
                    <div key={act.id} className="animate-in slide-in-from-right fade-in duration-300">
                        <div className="bg-white/5 border border-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-xs text-white group-hover:text-accent transition-colors">${act.ticker}</span>
                                <span className="text-[10px] text-white/30">{new Date(act.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                            </div>
                            <div className="text-xs text-white/60">
                                {act.type === 'buy' && <span className="text-green-400 font-bold">BAGGED </span>}
                                {act.type === 'sell' && <span className="text-red-400 font-bold">DUMPED </span>}
                                {act.type === 'mint' && <span className="text-blue-400 font-bold">MINT </span>}
                                {act.type === 'king' && <span className="text-yellow-400 font-bold">CROWN </span>}
                                {act.type !== 'mint' && act.type !== 'king' && <span className="font-mono text-white">{act.amount} ETH</span>}
                                {act.type === 'mint' && <span>New Bonding Curve</span>}
                                {act.type === 'king' && <span>Took the throne!</span>}
                            </div>
                        </div>
                    </div>
                ))}

                {activities.length === 0 && (
                    <div className="text-center text-white/20 text-xs py-10">Waiting for events...</div>
                )}
            </div>

            {/* Top Gainers Mini List */}
            <div className="h-1/3 border-t border-white/5 bg-[#0d0e14] p-4 overflow-y-auto">
                <h3 className="font-bold text-xs text-white/40 uppercase mb-3">Top Gainers (24h)</h3>
                <div className="space-y-2">
                    <MiniRow rank={1} ticker="PEPE" change="+420%" />
                    <MiniRow rank={2} ticker="DOGE2" change="+69%" />
                    <MiniRow rank={3} ticker="AI_GOD" change="+42%" />
                    <MiniRow rank={4} ticker="MOG" change="+12%" />
                    <MiniRow rank={5} ticker="SPX" change="+8%" />
                </div>
            </div>
        </div>
    );
}

function MiniRow({ rank, ticker, change }: { rank: number; ticker: string; change: string }) {
    return (
        <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
                <span className="text-white/20 font-mono w-3">{rank}</span>
                <span className="font-bold text-white">{ticker}</span>
            </div>
            <span className="text-green-400 font-mono">{change}</span>
        </div>
    )
}

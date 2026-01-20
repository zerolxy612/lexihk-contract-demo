import React from 'react';

export const LiveTicker = () => {
    // Mock trades
    const trades = [
        { type: 'buy', ticker: 'MARS', amount: '0.2 ETH', user: '0x32...a1' },
        { type: 'sell', ticker: 'DOGE', amount: '0.5 ETH', user: '0x11...bb' },
        { type: 'buy', ticker: 'CAT', amount: '0.1 ETH', user: '0x22...cc' },
        { type: 'buy', ticker: 'PEPE', amount: '1.0 ETH', user: '0x33...dd' },
        { type: 'create', ticker: 'NEW', user: '0x44...ee' },
    ];

    return (
        <div className="w-full bg-[#1e1e1e] border-y border-white/5 overflow-hidden h-8 flex items-center">
            <div className="flex items-center gap-8 animate-ticker whitespace-nowrap px-4">
                {[...trades, ...trades, ...trades].map((trade, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono">
                        <span className={`font-bold ${trade.type === 'buy' ? 'text-green-500' :
                                trade.type === 'sell' ? 'text-red-500' : 'text-blue-500'
                            }`}>
                            {trade.type.toUpperCase()}
                        </span>
                        <span className="text-white">{trade.ticker}</span>
                        {trade.amount && <span className="text-white/60">{trade.amount}</span>}
                        <span className="text-white/30">{trade.user}</span>
                    </div>
                ))}
            </div>
            <style jsx>{`
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-ticker {
                    animation: ticker 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

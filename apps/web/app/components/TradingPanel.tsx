import React, { useState } from 'react';

interface TradingPanelProps {
    ticker: string;
    price: number;
}

export const TradingPanel: React.FC<TradingPanelProps> = ({ ticker, price }) => {
    const [mode, setMode] = useState<'buy' | 'sell'>('buy');
    const [amount, setAmount] = useState('');

    const ethPrice = amount ? Number(amount) : 0;
    const tokenAmount = ethPrice / price;

    return (
        <div className="bg-[#12141a] border border-white/10 rounded-xl overflow-hidden flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
                <button
                    onClick={() => setMode('buy')}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${mode === 'buy' ? 'bg-[#22c55e] text-black' : 'hover:bg-white/5 text-white/60'
                        }`}
                >
                    Buy
                </button>
                <button
                    onClick={() => setMode('sell')}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${mode === 'sell' ? 'bg-[#ef4444] text-white' : 'hover:bg-white/5 text-white/60'
                        }`}
                >
                    Sell
                </button>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-4">
                {/* Input Area */}
                <div className="space-y-4">
                    <div className="bg-black/40 rounded-lg p-3 border border-white/10 focus-within:border-accent/50 transition-colors">
                        <div className="flex justify-between text-xs text-white/40 mb-1">
                            <span>Amount ({mode === 'buy' ? 'ETH' : ticker})</span>
                            <span>Max: 0.5</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.0"
                                className="bg-transparent text-white font-mono text-lg w-full focus:outline-none"
                            />
                            <span className="text-white/60 font-bold text-sm bg-white/10 px-2 py-1 rounded">
                                {mode === 'buy' ? 'ETH' : ticker}
                            </span>
                        </div>
                    </div>

                    {amount && (
                        <div className="text-center text-white/40 text-xs">
                            ↓
                        </div>
                    )}

                    <div className="bg-black/40 rounded-lg p-3 border border-white/10">
                        <div className="flex justify-between text-xs text-white/40 mb-1">
                            <span>Receive (Est.)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-white font-mono text-lg w-full">
                                {amount ? (mode === 'buy' ? tokenAmount.toFixed(2) : (Number(amount) * price).toFixed(4)) : '0.0'}
                            </div>
                            <span className="text-white/60 font-bold text-sm bg-white/10 px-2 py-1 rounded">
                                {mode === 'buy' ? ticker : 'ETH'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="mt-auto space-y-2">
                    {mode === 'buy' && (
                        <div className="flex justify-between text-xs text-white/40">
                            <span>Fee</span>
                            <span>~0.003 ETH</span>
                        </div>
                    )}
                    <button
                        className={`w-full py-3 rounded-lg font-bold text-center transition-transform active:scale-95 ${mode === 'buy'
                                ? 'bg-[#22c55e] hover:bg-[#16a34a] text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                                : 'bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                            }`}
                    >
                        {mode === 'buy' ? 'PLACE TRADE' : 'SELL TOKENS'}
                    </button>
                </div>
            </div>
        </div>
    );
};

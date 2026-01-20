import React from 'react';

interface BondingCurveChartProps {
    progress: number;
    className?: string;
}

export const BondingCurveChart: React.FC<BondingCurveChartProps> = ({ progress, className }) => {
    // A simple exponential curve simulation
    // y = x^2 mostly
    const points = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
        const x = i;
        const y = Math.pow(i / steps, 2) * 100;
        points.push(`${x},${100 - y}`);
    }

    const polylinePoints = points.join(' ');

    // Calculate current position
    const currentX = progress;
    const currentY = 100 - Math.pow(progress / 100, 2) * 100;

    return (
        <div className={`relative bg-black/40 border border-white/10 rounded-xl p-4 ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-white/60 text-xs font-bold uppercase tracking-wider">Bonding Curve Progress</h4>
                <span className="text-accent font-mono font-bold text-sm">{progress.toFixed(1)}%</span>
            </div>

            <div className="relative h-32 w-full">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                    {/* Grid lines */}
                    <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

                    {/* The Curve */}
                    <polyline
                        points={polylinePoints}
                        fill="none"
                        stroke="#e50914"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />

                    {/* Fill under curve */}
                    <polygon
                        points={`0,100 ${polylinePoints} 100,100`}
                        fill="url(#gradient)"
                        opacity="0.2"
                    />

                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#e50914" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>

                    {/* Current Position Marker */}
                    <circle cx={currentX} cy={currentY} r="3" fill="white" className="animate-pulse" />

                    {/* Graduation Line */}
                    <line x1="100" y1="0" x2="100" y2="100" stroke="#22c55e" strokeWidth="1" strokeDasharray="4" />
                    <text x="100" y="-5" fill="#22c55e" fontSize="4" textAnchor="end">DEX Listing</text>
                </svg>
            </div>

            <div className="mt-2 text-[10px] text-white/40 text-center">
                When market cap reaches 69 ETH, all liquidity is deposited to Uniswap and burned.
            </div>
        </div>
    );
};

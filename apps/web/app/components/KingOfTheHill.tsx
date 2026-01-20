import React from 'react';

interface KingOfTheHillProps {
    drama: any; // Type to usually be imported
    onClick: () => void;
}

export const KingOfTheHill: React.FC<KingOfTheHillProps> = ({ drama, onClick }) => {
    if (!drama) return null;

    return (
        <div className="relative w-full max-w-4xl mx-auto mb-12 group cursor-pointer" onClick={onClick}>
            {/* Crown Icon / Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] animate-bounce">👑</span>
                <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-yellow-300">
                    KING OF THE HILL
                </span>
            </div>

            {/* Main Card */}
            <div className="relative rounded-3xl overflow-hidden border border-yellow-500/30 bg-[#1a1a10] shadow-[0_0_50px_rgba(234,179,8,0.15)] transition-all hover:scale-[1.01] hover:shadow-[0_0_70px_rgba(234,179,8,0.25)]">
                <div className="grid md:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative h-64 md:h-auto overflow-hidden">
                        <img
                            src={drama.coverImage}
                            alt={drama.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />
                    </div>

                    {/* Info Side */}
                    <div className="p-6 md:p-8 flex flex-col justify-center relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-[1000] text-9xl pointer-events-none select-none">
                            #1
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-500 font-bold tracking-widest text-xs uppercase">Current Top Market Cap</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                            {drama.title} <span className="text-white/30 text-2xl font-normal">/ {drama.id.toUpperCase()}</span>
                        </h2>

                        <p className="text-white/60 line-clamp-2 mb-6 text-sm">
                            {drama.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div>
                                <div className="text-xs text-white/40 uppercase">Market Cap</div>
                                <div className="text-xl font-mono text-green-400 font-bold">$42.5k</div>
                            </div>
                            <div>
                                <div className="text-xs text-white/40 uppercase">Replies</div>
                                <div className="text-xl font-mono text-white font-bold">1.2k</div>
                            </div>
                            <div>
                                <div className="text-xs text-white/40 uppercase">Dev Holding</div>
                                <div className="text-xl font-mono text-white font-bold">4.2%</div>
                            </div>
                        </div>

                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 w-[85%] animate-pulse" />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-white/40">
                            <span>Bonding Curve Progress</span>
                            <span>85%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

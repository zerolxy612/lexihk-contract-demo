'use client';

export function CastList() {
    const cast = [
        { name: 'Nexus-7', role: 'Protagonist', model: 'GPT-4o + Midjourney v6', avatar: '/images/avatar-1.png' },
        { name: 'The Oracle', role: 'Antagonist', model: 'Claude 3 Opus', avatar: '/images/avatar-2.png' },
        { name: 'Unit 734', role: 'Sidekick', model: 'Llama 3 70B', avatar: '/images/avatar-3.png' },
    ];

    return (
        <div className="bg-[#15171e] rounded-3xl p-6 border border-white/10">
            <h3 className="font-bold text-white mb-4">AI Cast</h3>
            <div className="space-y-4">
                {cast.map((actor, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold text-white/50">
                                AI
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-white group-hover:text-accent transition">{actor.name}</p>
                            <p className="text-xs text-white/40">{actor.role} • {actor.model}</p>
                        </div>
                    </div>
                ))}
                <button className="w-full py-3 mt-2 rounded-xl border border-white/10 text-white/40 text-sm hover:text-white hover:border-white/20 transition">
                    View All Actors
                </button>
            </div>
        </div>
    );
}

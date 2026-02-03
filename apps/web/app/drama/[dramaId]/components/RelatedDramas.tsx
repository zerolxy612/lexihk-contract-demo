'use client';

import Link from 'next/link';

// Mocking some data or importing from a shared source would be better, 
// but for now we will adapt a subset of data or reuse the structure.
// We'll assume the parent passes the list or we fetch it.

interface RelatedDramasProps {
    currentDramaId: string;
}

// Simplified Drama Data for the card
const RELATED_DRAMAS = [
    {
        id: 'd2',
        title: 'Doge to the Moon',
        coverImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop',
        marketCap: 78.4,
        ticker: 'DOGEMOON'
    },
    {
        id: 'd3',
        title: 'Rugpull: A Love Story',
        coverImage: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=600&h=400&fit=crop',
        marketCap: 4.2,
        ticker: 'RUG'
    },
    {
        id: 'd5',
        title: 'The Singularity Protocol',
        coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop',
        marketCap: 95.0,
        ticker: 'AI_GOD'
    },
    {
        id: 'd7',
        title: 'Silk Road: Loulan',
        coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
        marketCap: 25.4,
        ticker: 'LOULAN'
    }
];

export function RelatedDramas({ currentDramaId }: RelatedDramasProps) {
    // Filter out current drama if we had the full list
    const displayDramas = RELATED_DRAMAS.filter(d => d.id !== currentDramaId).slice(0, 4);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-accent">🍿</span> More Like This
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {displayDramas.map((drama) => (
                    <Link key={drama.id} href={`/drama/${drama.id}`}>
                        <div className="group relative rounded-xl overflow-hidden border border-white/10 bg-[#15171e] hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            {/* Image */}
                            <div className="aspect-[3/4] relative overflow-hidden">
                                <img
                                    src={drama.coverImage}
                                    alt={drama.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                <div className="absolute bottom-3 left-3 right-3 text-white">
                                    <p className="text-[10px] bg-white/20 backdrop-blur-md inline-block px-1.5 rounded mb-1 text-white/80 font-mono">
                                        ${drama.ticker}
                                    </p>
                                    <h4 className="font-bold leading-tight group-hover:text-accent transition-colors">{drama.title}</h4>
                                    <p className="text-xs text-white/50 mt-1">MCap: {drama.marketCap}E</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

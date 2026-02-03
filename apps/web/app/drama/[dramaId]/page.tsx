'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { INITIAL_DRAMAS } from '@/app/dramas/page';
import { SidebarLeft } from '@/app/components/SidebarLeft';
import { SidebarRight } from '@/app/components/SidebarRight';
import { ParticleBackground } from '@/app/components/ParticleBackground';

import { DramaHero } from './components/DramaHero';
import { FundingDashboard } from './components/FundingDashboard';
import { GovernancePanel } from './components/GovernancePanel';
import { CastList } from './components/CastList';
import { RelatedDramas } from './components/RelatedDramas';

export default function DramaDetailPage() {
    const params = useParams();
    const dramaId = params.dramaId as string;
    const [drama, setDrama] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching
        const foundDrama = INITIAL_DRAMAS.find(d => d.id === dramaId) || INITIAL_DRAMAS[0];
        setDrama(foundDrama);
        setTimeout(() => setIsLoading(false), 800);
    }, [dramaId]);

    if (isLoading || !drama) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="h-16 w-16 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative bg-[#0a0b10] text-white overflow-hidden flex flex-col">
            <div className="fixed inset-0 pointer-events-none z-0">
                <ParticleBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#0a0b10]/80 to-[#0a0b10] pointer-events-none" />
                <div className="absolute inset-0 noise opacity-20 pointer-events-none" />
            </div>

            {/* Header */}
            <header className="relative z-50 border-b border-white/5 bg-[#0a0b10]/80 backdrop-blur-md h-[64px] flex items-center px-6 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <a href="/dramas" className="flex items-center gap-2 text-white/50 hover:text-white transition group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        Back
                    </a>
                    <div className="h-4 w-px bg-white/10" />
                    <h1 className="text-sm font-bold tracking-wide opacity-80">
                        {drama.title} <span className="text-white/30 font-normal ml-2">Season 1</span>
                    </h1>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative z-10">
                <SidebarLeft />

                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 pb-20">

                        {/* 1. Hero Section */}
                        <DramaHero drama={drama} />

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            {/* LEFT COLUMN: Main Content */}
                            <div className="xl:col-span-2 space-y-8">

                                {/* 2. Funding Dashboard */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-black italic flex items-center gap-2">
                                        <span className="text-green-400">⚡</span> Tokenomics & Funding
                                    </h2>
                                    <FundingDashboard drama={drama} />
                                </div>

                                {/* 3. Episodes */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-black italic flex items-center gap-2">
                                        <span className="text-accent">📺</span> Episodes
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Released Episode */}
                                        <div className="group relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 hover:border-accent/50 transition cursor-pointer">
                                            <img src={drama.coverImage} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-xs uppercase tracking-widest text-accent mb-1">Episode 1 • Aired</p>
                                                        <h3 className="text-xl font-bold text-white">The Inception</h3>
                                                    </div>
                                                    <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                                        ▶
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Locked Episode */}
                                        <div className="aspect-video bg-[#15171e] rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-white/5 pattern-grid opacity-10" />
                                            <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                                                🔒
                                            </div>
                                            <div className="text-center z-10">
                                                <p className="text-white/40 font-bold uppercase tracking-widest text-xs mb-1">Episode 2</p>
                                                <p className="text-white font-bold">Unlocks at 80 ETH MCAP</p>
                                                <div className="mt-3 h-1 w-32 bg-white/10 rounded-full overflow-hidden mx-auto">
                                                    <div className="h-full bg-accent w-[45%]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Interactive/Social */}
                            <div className="space-y-8">
                                <GovernancePanel />
                                <CastList />

                                {/* Activity Feed Placeholder */}
                                <div className="bg-[#15171e] rounded-3xl p-6 border border-white/10 h-[300px] flex flex-col">
                                    <h3 className="font-bold text-white mb-4 flex items-center justify-between">
                                        <span>Live Activity</span>
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    </h3>
                                    <div className="flex-1 overflow-hidden relative">
                                        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">
                                            [Activity stream connecting...]
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Related Dramas */}
                        <RelatedDramas currentDramaId={drama.id} />
                    </div>
                </main>

                <SidebarRight />
            </div>
        </div>
    );
}

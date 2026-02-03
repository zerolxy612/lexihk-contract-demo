import Link from 'next/link';

export function SidebarLeft() {
    return (
        <div className="w-[240px] hidden lg:flex flex-col h-[calc(100vh-64px)] overflow-y-auto border-r border-white/5 bg-[#0a0b10] sticky top-[64px] p-4">
            {/* Navigation */}
            <div className="space-y-1 mb-8">
                <h3 className="px-3 text-xs font-bold text-white/40 uppercase mb-2">Platform</h3>
                <NavItem icon="🏠" label="Home" active />
                <NavItem icon="🔥" label="Trending" />
                <NavItem icon="🆕" label="New Mints" />
                <NavItem icon="👑" label="Hall of Fame" />
                <NavItem icon="💎" label="My Portfolio" />
            </div>

            <div className="space-y-1 mb-8">
                <h3 className="px-3 text-xs font-bold text-white/40 uppercase mb-2">Discover</h3>
                <NavItem icon="🐸" label="Memes" />
                <NavItem icon="🤖" label="Sci-Fi Drama" />
                <NavItem icon="🏺" label="History" />
                <NavItem icon="🕵️" label="Suspense" />
            </div>

            {/* Global Stats */}
            <div className="mt-auto space-y-4 bg-white/5 rounded-xl p-4 border border-white/5">
                <h3 className="text-xs font-bold text-white/60 mb-2 border-b border-white/5 pb-2">MARKET STATUS</h3>

                <StatRow label="ETH Price" value="$2,420" change="+2.4%" isUp />
                <StatRow label="Gas" value="12 Gwei" change="-5%" isUp={false} />
                <StatRow label="Vol (24h)" value="$42.5M" />
                <StatRow label="Active Users" value="1,204" />

                <div className="pt-2 text-[10px] text-white/30 font-mono text-center">
                    SYSTEM ONLINE • v2.0.4
                </div>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
    return (
        <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition-all ${active ? 'bg-white text-black' : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}>
            <span className="text-lg">{icon}</span>
            {label}
        </button>
    );
}

function StatRow({ label, value, change, isUp }: { label: string; value: string; change?: string; isUp?: boolean }) {
    return (
        <div className="flex justify-between items-center text-xs">
            <span className="text-white/40 font-bold">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-white font-mono font-bold">{value}</span>
                {change && (
                    <span className={`text-[10px] ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                        {change}
                    </span>
                )}
            </div>
        </div>
    );
}

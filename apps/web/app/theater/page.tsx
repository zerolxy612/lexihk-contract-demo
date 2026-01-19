'use client';

import Link from 'next/link';

const mockDramas = [
  {
    id: 'demo',
    title: '赛博侦探：失落的密钥',
    description: '2077 新东京的悬疑追逐，黑客与企业杀手的猫鼠游戏。立即体验互动分镜 Demo。',
    tags: ['赛博朋克', '悬疑', '互动创作'],
    cover: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=600&fit=crop',
    stats: { views: '28.4k', likes: '9.1k', duration: '5 分钟 Demo' },
    isPlayable: true,
  },
  {
    id: 'idol-mirror',
    title: '星闪倒影：AI 偶像计划',
    description: '全息舞台与粉丝共创的偶像养成真人秀，每期投票决定剧情走向。',
    tags: ['偶像', '音乐', '共创'],
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=600&fit=crop',
    stats: { views: '12.7k', likes: '4.2k', duration: '12 集' },
    isPlayable: false,
  },
  {
    id: 'ancient-blade',
    title: '千霜令：刀落九州',
    description: '古风奇谭与家国阴谋交织，玩家选择门派心法，解锁不同武学分支。',
    tags: ['武侠', '权谋', '多结局'],
    cover: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200&h=600&fit=crop',
    stats: { views: '9.8k', likes: '3.6k', duration: '8 集' },
    isPlayable: false,
  },
  {
    id: 'space-colony',
    title: '曙光殖民：边界协议',
    description: '流浪星舰抵达陌生星球，资源有限的生存抉择，每一票都改变殖民计划。',
    tags: ['科幻', '生存', 'DAO 决策'],
    cover: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&h=600&fit=crop',
    stats: { views: '7.3k', likes: '2.9k', duration: '10 集' },
    isPlayable: false,
  },
];

export default function TheaterBrowsePage() {
  const featured = mockDramas[0];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#0b0c12] to-[#06060a] text-white">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(229,9,20,0.25),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_60%_70%,rgba(229,9,20,0.2),transparent_32%)]" />
      <div className="absolute inset-0 noise pointer-events-none opacity-30" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-12 lg:py-16 space-y-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Drama Watch</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-display font-semibold">精选剧场 · 开始观看</h1>
            <p className="mt-2 text-white/60 max-w-2xl">
              先挑一部喜欢的短剧，观看片段与分镜走向。选择后即可进入互动创作 Demo 剧场。
            </p>
          </div>
          <Link
            href={`/theater/${featured.id}`}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white font-semibold shadow-[0_20px_60px_rgba(229,9,20,0.4)] hover:scale-[1.03] transition"
          >
            直接进入 Demo
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Featured */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-stretch">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <img
              src={featured.cover}
              alt={featured.title}
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 space-y-4">
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold drop-shadow-lg">
                  {featured.title}
                </h2>
                <p className="mt-2 text-white/70 max-w-2xl">{featured.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span>👁️ {featured.stats.views}</span>
                <span>❤️ {featured.stats.likes}</span>
                <span>⏱ {featured.stats.duration}</span>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/theater/${featured.id}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white font-semibold hover:scale-[1.03] transition shadow-[0_20px_60px_rgba(229,9,20,0.45)]"
                >
                  开始观看
                  <span aria-hidden>▶</span>
                </Link>
                <span className="inline-flex items-center px-4 py-3 rounded-full border border-white/15 text-white/70 text-sm">
                  Demo 模式 · 可互动
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">热门榜单</p>
              <span className="text-xs text-white/40">Mock 数据 · 无需登录</span>
            </div>
            <div className="space-y-4">
              {mockDramas.map((drama, index) => (
                <div
                  key={drama.id}
                  className="flex gap-4 p-3 rounded-2xl bg-black/40 border border-white/10 hover:border-accent/40 transition"
                >
                  <div className="flex-shrink-0 h-20 w-32 overflow-hidden rounded-xl bg-white/5">
                    <img src={drama.cover} alt={drama.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                        NO.{index + 1}
                      </span>
                      <p className="text-sm text-white/70">{drama.stats.views} 播放</p>
                    </div>
                    <h3 className="text-base font-semibold">{drama.title}</h3>
                    <p className="text-sm text-white/60 line-clamp-2">{drama.description}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between text-xs text-white/60">
                    <span>{drama.stats.duration}</span>
                    {drama.isPlayable ? (
                      <Link
                        href={`/theater/${drama.id}`}
                        className="px-3 py-1 rounded-full bg-accent text-white font-semibold text-xs"
                      >
                        进入
                      </Link>
                    ) : (
                      <span className="px-3 py-1 rounded-full border border-white/15 text-white/50">
                        即将开放
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-semibold">全部剧集 (Mock)</h2>
          <span className="text-sm text-white/50">选择任意剧集体验 Demo 剧场</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockDramas.map((drama) => (
            <div
              key={drama.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-accent/40 transition shadow-xl"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={drama.cover}
                  alt={drama.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-white/60">
                  {drama.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold">{drama.title}</h3>
                <p className="text-sm text-white/60 line-clamp-2 min-h-[40px]">{drama.description}</p>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>👁️ {drama.stats.views}</span>
                  <span>❤️ {drama.stats.likes}</span>
                  <span>⏱ {drama.stats.duration}</span>
                </div>
                <div className="pt-2">
                  {drama.isPlayable ? (
                    <Link
                      href={`/theater/${drama.id}`}
                      className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 rounded-xl bg-accent text-white font-semibold hover:scale-[1.02] transition"
                    >
                      开始观看
                      <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <button
                      className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 rounded-xl border border-white/15 text-white/50 cursor-not-allowed"
                      disabled
                    >
                      即将开放
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

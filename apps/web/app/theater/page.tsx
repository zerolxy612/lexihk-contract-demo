'use client';

import Link from 'next/link';
import { INITIAL_DRAMAS } from '@/app/data/mocks';
import { ParticleBackground } from '@/app/components/ParticleBackground';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { CountUp } from '@/app/components/CountUp';
import { DEMO_DRAMA, STORY_NODES } from '@/lib/mock';

// 合并剧场数据：将 INITIAL_DRAMAS 映射为可播放状态
const theaterDramas = [
  {
    id: 'demo',
    title: DEMO_DRAMA.title,
    description: DEMO_DRAMA.description,
    tags: DEMO_DRAMA.tags ?? [],
    cover: DEMO_DRAMA.coverImage ?? '',
    stats: { 
      views: `${((DEMO_DRAMA.participantCount ?? 0) / 1000).toFixed(1)}k`, 
      likes: '9.1k', 
      duration: '5 分钟 Demo',
      nodes: Object.keys(STORY_NODES).length - 1, // 排除 custom 节点
    },
    isPlayable: true,
    aiStatus: 'filming',
  },
  ...INITIAL_DRAMAS.slice(0, 5).map((drama, i) => ({
    id: drama.id,
    title: drama.title,
    description: drama.description,
    tags: drama.tags,
    cover: drama.coverImage,
    stats: { 
      views: `${(drama.holders / 100).toFixed(1)}k`, 
      likes: `${(drama.reactions?.fire || 0) + (drama.reactions?.rocket || 0)}`, 
      duration: `${Math.floor(Math.random() * 10 + 5)} 集`,
      nodes: 0,
    },
    isPlayable: i === 0, // 只有第一个额外可玩
    aiStatus: drama.aiStatus || 'idle',
  })),
];

// AI 状态映射
const AI_STATUS_MAP: Record<string, { label: string; color: string; bgColor: string }> = {
  idle: { label: '待机中', color: 'text-white/50', bgColor: 'bg-white/10' },
  scripting: { label: '剧本生成', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  casting: { label: '角色选角', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
  filming: { label: '分镜渲染', color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
  editing: { label: '后期剪辑', color: 'text-green-400', bgColor: 'bg-green-500/20' },
};

export default function TheaterBrowsePage() {
  const featured = theaterDramas[0];

  return (
    <div className="relative min-h-screen bg-[#030305] text-white overflow-hidden">
      {/* 背景效果 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(229,9,20,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <ParticleBackground />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-12 lg:py-16 space-y-12">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 border border-rose-500/30 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="text-sm text-white/80">Interactive Theater</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black">
                <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                  分镜剧场
                </span>
              </h1>
              <p className="mt-3 text-white/50 text-lg max-w-2xl">
                选择一部剧集，进入互动分镜体验。每个选择都将影响故事走向，你的决定将被永久记录在链上。
              </p>
            </div>
            <Link
              href={`/theater/${featured.id}`}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold shadow-[0_20px_60px_rgba(229,9,20,0.4)] hover:scale-[1.03] transition"
            >
              <span className="text-xl">🎬</span>
              直接进入 Demo
              <span aria-hidden>→</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* 统计数据 */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '可互动剧集', value: 2, icon: '🎬' },
              { label: '故事节点', value: 11, icon: '🌳' },
              { label: '创作资产', value: 12, icon: '🎨' },
              { label: '参与观众', value: 2847, icon: '👥' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <div className="text-2xl font-mono font-bold text-white">
                  <CountUp end={stat.value} duration={1500} />
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Featured Drama */}
        <ScrollReveal delay={150}>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
            {/* 主海报 */}
            <div className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 via-transparent to-fuchsia-500/10 group">
              <div className="absolute inset-0">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="h-full w-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              
              <div className="relative p-8 lg:p-10 flex flex-col justify-end min-h-[450px]">
                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    ✓ Demo 可用
                  </span>
                </div>
                
                {/* 标题 */}
                <h2 className="text-3xl lg:text-4xl font-black text-white drop-shadow-lg mb-3">
                  {featured.title}
                </h2>
                <p className="text-white/60 max-w-xl mb-6">{featured.description}</p>
                
                {/* 统计 */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-white/50 mb-6">
                  <span className="flex items-center gap-2">
                    <span>👁️</span> {featured.stats.views} 播放
                  </span>
                  <span className="flex items-center gap-2">
                    <span>❤️</span> {featured.stats.likes} 喜欢
                  </span>
                  <span className="flex items-center gap-2">
                    <span>🌳</span> {featured.stats.nodes} 故事节点
                  </span>
                  <span className="flex items-center gap-2">
                    <span>⏱</span> {featured.stats.duration}
                  </span>
                </div>
                
                {/* 按钮 */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/theater/${featured.id}`}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold text-lg hover:shadow-[0_20px_60px_rgba(229,9,20,0.5)] hover:scale-[1.02] transition"
                  >
                    <span className="text-2xl">▶</span>
                    开始观看
                  </Link>
                  <Link
                    href={`/drama/demo/tree`}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/15 text-white/70 hover:text-white hover:bg-white/5 transition"
                  >
                    <span>🌳</span>
                    查看故事树
                  </Link>
                </div>
              </div>
            </div>

            {/* 热门榜单 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60 font-medium">热门榜单</p>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/40">实时更新</span>
              </div>
              <div className="space-y-3">
                {theaterDramas.map((drama, index) => {
                  const aiStatus = AI_STATUS_MAP[drama.aiStatus || 'idle'];
                  return (
                    <div
                      key={drama.id}
                      className={`flex gap-4 p-3 rounded-2xl bg-black/40 border transition ${
                        drama.isPlayable 
                          ? 'border-rose-500/30 hover:border-rose-500/50' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex-shrink-0 h-20 w-32 overflow-hidden rounded-xl bg-white/5 relative">
                        <img src={drama.cover} alt={drama.title} className="h-full w-full object-cover" />
                        {drama.isPlayable && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition">
                            <span className="text-2xl">▶</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 font-mono">
                            #{index + 1}
                          </span>
                          {drama.isPlayable && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                              可互动
                            </span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${aiStatus.bgColor} ${aiStatus.color}`}>
                            {aiStatus.label}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-white truncate">{drama.title}</h3>
                        <p className="text-xs text-white/50 line-clamp-1">{drama.description}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between text-xs text-white/60">
                        <span>{drama.stats.views}</span>
                        {drama.isPlayable ? (
                          <Link
                            href={`/theater/${drama.id}`}
                            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-semibold text-xs hover:shadow-lg transition"
                          >
                            进入
                          </Link>
                        ) : (
                          <span className="px-3 py-1.5 rounded-full border border-white/15 text-white/40">
                            即将开放
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 全部剧集网格 */}
        <section>
          <ScrollReveal delay={200}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">全部剧集</h2>
              <Link href="/dramas" className="text-sm text-rose-400 hover:text-rose-300 transition">
                查看众筹列表 →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {theaterDramas.map((drama, index) => {
              const aiStatus = AI_STATUS_MAP[drama.aiStatus || 'idle'];
              return (
                <ScrollReveal key={drama.id} delay={250 + index * 50}>
                  <div
                    className={`group relative overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-xl transition shadow-xl ${
                      drama.isPlayable 
                        ? 'border-rose-500/30 hover:border-rose-500/50 hover:shadow-[0_20px_60px_rgba(229,9,20,0.2)]' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={drama.cover}
                        alt={drama.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      {drama.isPlayable && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 flex items-center justify-center shadow-[0_10px_40px_rgba(229,9,20,0.5)]">
                            <span className="text-2xl text-white ml-1">▶</span>
                          </div>
                        </div>
                      )}
                      {/* AI 状态标签 */}
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full ${aiStatus.bgColor} ${aiStatus.color} text-xs font-medium`}>
                        {aiStatus.label}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-white/60">
                        {drama.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{drama.title}</h3>
                      <p className="text-sm text-white/50 line-clamp-2 min-h-[40px]">{drama.description}</p>
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span>👁️ {drama.stats.views}</span>
                        <span>❤️ {drama.stats.likes}</span>
                        <span>⏱ {drama.stats.duration}</span>
                      </div>
                      <div className="pt-2">
                        {drama.isPlayable ? (
                          <Link
                            href={`/theater/${drama.id}`}
                            className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-semibold hover:shadow-[0_10px_40px_rgba(229,9,20,0.4)] hover:scale-[1.02] transition"
                          >
                            开始观看
                            <span aria-hidden>→</span>
                          </Link>
                        ) : (
                          <button
                            className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/15 text-white/40 cursor-not-allowed"
                            disabled
                          >
                            即将开放
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* 底部 CTA */}
        <ScrollReveal delay={400}>
          <div className="text-center p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-rose-500/10 via-transparent to-fuchsia-500/10 border border-white/[0.06]">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              想要创作自己的互动故事？
            </h3>
            <p className="text-white/50 max-w-xl mx-auto mb-8">
              加入创作者行列，使用 AI 工具生成分镜，让观众投票决定剧情走向
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/dramas"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold text-lg hover:shadow-[0_20px_60px_rgba(229,9,20,0.5)] transition"
              >
                浏览众筹项目 →
              </Link>
              <Link 
                href="/whitepaper"
                className="px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/5 transition"
              >
                阅读白皮书
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

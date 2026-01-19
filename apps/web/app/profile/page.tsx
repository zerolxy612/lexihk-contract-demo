'use client';

import { useState, useEffect } from 'react';
import { ParticleBackground } from '@/app/components/ParticleBackground';
import { TiltCard } from '@/app/components/TiltCard';
import { DEMO_ASSETS, STORY_NODES, DEMO_DRAMA } from '@/lib/mock';

// Mock 用户数据
const MOCK_USER = {
  address: '0x7890123456789012345678901234567890123456' as `0x${string}`,
  joinDate: '2024-11-15',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
};

const MOCK_STATS = {
  points: 2580,
  pointsChange: '+120 今日',
  nodesConfirmed: 47,
  assetsCreated: 12,
  dramasParticipated: 3,
  totalEarned: 3200,
  totalSpent: 620,
  rank: 156,
  airdropScore: 8750,
};

// 活动历史
const MOCK_ACTIVITIES = [
  { type: 'confirm', desc: '确认分镜「霓虹雨街」', points: '+10', time: '5分钟前' },
  { type: 'create', desc: '创建角色「Glitch」', points: '+5', time: '2小时前' },
  { type: 'refresh', desc: '刷新分镜选项', points: '-5', time: '3小时前' },
  { type: 'confirm', desc: '确认分镜「赛博酒吧」', points: '+10', time: '昨天' },
  { type: 'custom', desc: '生成自定义分镜', points: '-10', time: '昨天' },
  { type: 'confirm', desc: '确认分镜「暗巷追逐」', points: '+10', time: '2天前' },
];

// 成就徽章
const MOCK_ACHIEVEMENTS = [
  { id: 1, name: '初入江湖', desc: '完成首次分镜确认', icon: '🎬', unlocked: true },
  { id: 2, name: '创作者', desc: '创建首个社区资产', icon: '✨', unlocked: true },
  { id: 3, name: '探索者', desc: '体验 5 个不同分支', icon: '🌳', unlocked: true },
  { id: 4, name: '收藏家', desc: '创建 10 个资产', icon: '🗄️', unlocked: true },
  { id: 5, name: '决策者', desc: '确认 50 个分镜', icon: '⚡', unlocked: false, progress: 47 },
  { id: 6, name: '传奇导演', desc: '创作完整结局', icon: '🏆', unlocked: false },
];

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'history' | 'achievements'>('overview');
  
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 600);
  }, []);
  
  // 用户创建的资产
  const userAssets = Object.values(DEMO_ASSETS).filter(
    a => a.creator.toLowerCase() === MOCK_USER.address.toLowerCase()
  ).slice(0, 6);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 mx-auto border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60">正在加载个人中心...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen relative">
      {/* 背景 */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0b10] to-[#06060a]" />
      <ParticleBackground />
      <div className="fixed inset-0 noise pointer-events-none opacity-30" />
      
      {/* 头部横幅 */}
      <div className="relative z-10 h-48 bg-gradient-to-r from-accent/20 via-purple-500/20 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=300&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      
      {/* 用户信息卡片 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          {/* 头像 */}
          <div className="relative">
            <div className="h-32 w-32 rounded-2xl overflow-hidden ring-4 ring-black shadow-2xl">
              <img src={MOCK_USER.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-green-500 ring-4 ring-black grid place-items-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
          
          {/* 基础信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">CyberExplorer</h1>
              <span className="px-2 py-0.5 rounded-full text-xs bg-accent/20 text-accent border border-accent/30">
                早期用户
              </span>
            </div>
            <p className="text-white/40 font-mono text-sm">
              {MOCK_USER.address.slice(0, 10)}...{MOCK_USER.address.slice(-8)}
            </p>
            <p className="text-white/50 text-sm mt-1">
              加入于 {MOCK_USER.joinDate} · 排名 #{MOCK_STATS.rank}
            </p>
          </div>
          
          {/* 积分显示 */}
          <div className="glass rounded-2xl p-5 border border-white/10 text-center min-w-[200px]">
            <div className="text-3xl font-bold text-accent">{MOCK_STATS.points.toLocaleString()}</div>
            <div className="text-white/50 text-sm">积分余额</div>
            <div className="text-green-400 text-xs mt-1">{MOCK_STATS.pointsChange}</div>
          </div>
        </div>
        
        {/* 标签页 */}
        <div className="flex gap-1 mt-8 border-b border-white/10">
          {[
            { id: 'overview', label: '📊 概览' },
            { id: 'assets', label: '🗄️ 我的资产' },
            { id: 'history', label: '📜 活动历史' },
            { id: 'achievements', label: '🏆 成就' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 font-medium text-sm transition border-b-2 -mb-[2px] ${
                activeTab === tab.id 
                  ? 'text-accent border-accent' 
                  : 'text-white/60 border-transparent hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* 主内容 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 概览 */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-slide-in-up">
            {/* 统计卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TiltCard tiltMaxAngle={5} className="glass rounded-xl p-5 border border-white/10">
                <div className="text-3xl font-bold text-white">{MOCK_STATS.nodesConfirmed}</div>
                <div className="text-white/50 text-sm mt-1">确认分镜</div>
                <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '94%' }} />
                </div>
              </TiltCard>
              
              <TiltCard tiltMaxAngle={5} className="glass rounded-xl p-5 border border-white/10">
                <div className="text-3xl font-bold text-white">{MOCK_STATS.assetsCreated}</div>
                <div className="text-white/50 text-sm mt-1">创建资产</div>
                <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '60%' }} />
                </div>
              </TiltCard>
              
              <TiltCard tiltMaxAngle={5} className="glass rounded-xl p-5 border border-white/10">
                <div className="text-3xl font-bold text-white">{MOCK_STATS.dramasParticipated}</div>
                <div className="text-white/50 text-sm mt-1">参与剧集</div>
                <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '30%' }} />
                </div>
              </TiltCard>
              
              <TiltCard tiltMaxAngle={5} className="glass rounded-xl p-5 border border-accent/20 bg-accent/5">
                <div className="text-3xl font-bold text-accent">{MOCK_STATS.airdropScore.toLocaleString()}</div>
                <div className="text-white/50 text-sm mt-1">空投积分</div>
                <div className="text-xs text-accent mt-2">🎁 预计奖励中...</div>
              </TiltCard>
            </div>
            
            {/* 积分收支 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">💰 积分统计</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">累计获得</span>
                    <span className="text-green-400 font-semibold">+{MOCK_STATS.totalEarned.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">累计消耗</span>
                    <span className="text-orange-400 font-semibold">-{MOCK_STATS.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-white">当前余额</span>
                    <span className="text-accent font-bold text-xl">{MOCK_STATS.points.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">📈 积分来源</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">确认分镜</span>
                      <span className="text-white">70%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">创建资产</span>
                      <span className="text-white">20%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">观看广告</span>
                      <span className="text-white">10%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '10%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 最近活动 */}
            <div className="glass rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">📜 最近活动</h3>
                <button onClick={() => setActiveTab('history')} className="text-accent text-sm hover:underline">
                  查看全部 →
                </button>
              </div>
              <div className="space-y-3">
                {MOCK_ACTIVITIES.slice(0, 4).map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                    <div className={`h-10 w-10 rounded-full grid place-items-center ${
                      activity.type === 'confirm' ? 'bg-accent/20' :
                      activity.type === 'create' ? 'bg-purple-500/20' :
                      activity.type === 'custom' ? 'bg-cyan-500/20' : 'bg-orange-500/20'
                    }`}>
                      {activity.type === 'confirm' ? '🎬' :
                       activity.type === 'create' ? '✨' :
                       activity.type === 'custom' ? '🎨' : '🔄'}
                    </div>
                    <div className="flex-1">
                      <p className="text-white/90 text-sm">{activity.desc}</p>
                      <p className="text-white/40 text-xs">{activity.time}</p>
                    </div>
                    <div className={`font-semibold ${activity.points.startsWith('+') ? 'text-green-400' : 'text-orange-400'}`}>
                      {activity.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* 我的资产 */}
        {activeTab === 'assets' && (
          <div className="animate-slide-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">我创建的资产</h2>
              <a href="/assets" className="text-accent text-sm hover:underline">浏览全部资产库 →</a>
            </div>
            
            {userAssets.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userAssets.map(asset => (
                  <TiltCard
                    key={asset.assetId}
                    tiltMaxAngle={6}
                    className="glass rounded-xl overflow-hidden border border-white/10 hover:border-accent/30 transition"
                  >
                    <div className={`relative ${asset.assetType === 'SCENE' ? 'aspect-video' : 'aspect-square'}`}>
                      <img src={asset.thumbnailUrl} alt={asset.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs bg-black/60 text-white/80">
                        {asset.assetType === 'ACTOR' ? '👤 角色' : asset.assetType === 'SCENE' ? '🏞️ 场景' : '🔧 道具'}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium">{asset.name}</h3>
                      <p className="text-white/40 text-xs mt-1">被使用 {asset.usageCount} 次</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 glass rounded-xl border border-white/10">
                <div className="text-4xl mb-4">🎨</div>
                <p className="text-white/60 mb-4">你还没有创建任何资产</p>
                <a href="/theater/demo" className="inline-block px-6 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition">
                  去剧场创作 →
                </a>
              </div>
            )}
          </div>
        )}
        
        {/* 活动历史 */}
        {activeTab === 'history' && (
          <div className="animate-slide-in-up">
            <h2 className="text-xl font-semibold text-white mb-6">活动历史</h2>
            <div className="space-y-3">
              {MOCK_ACTIVITIES.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 glass rounded-xl border border-white/10 hover:border-white/20 transition">
                  <div className={`h-12 w-12 rounded-xl grid place-items-center text-xl ${
                    activity.type === 'confirm' ? 'bg-accent/20' :
                    activity.type === 'create' ? 'bg-purple-500/20' :
                    activity.type === 'custom' ? 'bg-cyan-500/20' : 'bg-orange-500/20'
                  }`}>
                    {activity.type === 'confirm' ? '🎬' :
                     activity.type === 'create' ? '✨' :
                     activity.type === 'custom' ? '🎨' : '🔄'}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.desc}</p>
                    <p className="text-white/40 text-sm">{activity.time}</p>
                  </div>
                  <div className={`text-lg font-bold ${activity.points.startsWith('+') ? 'text-green-400' : 'text-orange-400'}`}>
                    {activity.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 成就 */}
        {activeTab === 'achievements' && (
          <div className="animate-slide-in-up">
            <h2 className="text-xl font-semibold text-white mb-6">成就徽章</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {MOCK_ACHIEVEMENTS.map(achievement => (
                <div
                  key={achievement.id}
                  className={`glass rounded-xl p-5 border transition ${
                    achievement.unlocked 
                      ? 'border-accent/30 bg-accent/5' 
                      : 'border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-4xl ${!achievement.unlocked && 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{achievement.name}</h3>
                      <p className="text-white/50 text-xs mt-1">{achievement.desc}</p>
                      {!achievement.unlocked && achievement.progress !== undefined && (
                        <div className="mt-2">
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-accent/50 rounded-full" 
                              style={{ width: `${(achievement.progress / 50) * 100}%` }} 
                            />
                          </div>
                          <p className="text-white/40 text-xs mt-1">{achievement.progress}/50</p>
                        </div>
                      )}
                    </div>
                    {achievement.unlocked && (
                      <div className="text-green-400">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* 返回按钮 */}
      <a
        href="/"
        className="fixed bottom-8 right-8 z-20 px-6 py-3 rounded-full glass border border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30 transition shadow-lg"
      >
        ← 返回首页
      </a>
    </div>
  );
}



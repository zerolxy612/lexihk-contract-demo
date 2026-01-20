'use client';

import { useState, useMemo } from 'react';
import type { FrameData, Asset } from '@/lib/types';
import { getAssetById } from '@/lib/mock';

interface AssetDrawerProps {
  frame?: FrameData;
  isChoosing?: boolean;
}

// 截断地址显示
function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// 格式化使用次数
function formatUsageCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

// 单个资产卡片组件
function AssetCard({ asset, type }: { asset: Asset; type: 'actor' | 'scene' | 'prop' }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const typeEmoji = type === 'actor' ? '👤' : type === 'scene' ? '🏙️' : '🔧';
  const typeLabel = type === 'actor' ? '角色' : type === 'scene' ? '场景' : '道具';
  
  // 模拟链上地址（实际项目中从 asset.metadataCid 或链上数据获取）
  const mintAddress = `So1${asset.assetId.slice(0, 8)}...${Math.random().toString(36).slice(2, 6)}`;
  
  return (
    <div
      className={`
        relative rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer
        ${isHovered 
          ? 'border-accent/50 bg-accent/5 shadow-[0_0_20px_rgba(229,9,20,0.15)]' 
          : 'border-white/10 bg-white/5'
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 缩略图区域 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {asset.thumbnailUrl ? (
          <img
            src={asset.thumbnailUrl}
            alt={asset.name}
            className={`
              w-full h-full object-cover transition-transform duration-500
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-4xl">{typeEmoji}</span>
          </div>
        )}
        
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        
        {/* 类型标签 */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/80 text-xs flex items-center gap-1">
            {typeEmoji} {typeLabel}
          </span>
        </div>
        
        {/* 使用次数 - 右上角 */}
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/80 text-white text-xs font-medium">
            <span>🔥</span>
            <span>{formatUsageCount(asset.usageCount)}</span>
          </div>
        </div>
        
        {/* 资产名称 */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h4 className="text-white font-semibold text-sm truncate">{asset.name}</h4>
        </div>
      </div>
      
      {/* 链上信息区域 */}
      <div className="p-3 space-y-2">
        {/* 首创者 */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">首创者</span>
          <span className="text-accent font-mono">{truncateAddress(asset.creator)}</span>
        </div>
        
        {/* Mint 地址 */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">链上ID</span>
          <span className="text-white/70 font-mono">{mintAddress}</span>
        </div>
        
        {/* 查看链上按钮 */}
        <a
          href={`https://solscan.io/token/${mintAddress}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`
            flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-medium transition-all
            ${isHovered 
              ? 'bg-accent text-white' 
              : 'bg-white/10 text-white/60 hover:bg-white/20'
            }
          `}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          在 Solscan 查看
        </a>
      </div>
    </div>
  );
}

export function AssetDrawer({ frame, isChoosing = false }: AssetDrawerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 获取资产数据
  const assets = useMemo(() => {
    if (!frame) return { actors: [], scene: null, props: [] };
    
    const actors = (frame.actorIds || [])
      .map(id => getAssetById(id))
      .filter((a): a is Asset => a !== undefined);
    
    const scene = frame.sceneId ? getAssetById(frame.sceneId) : null;
    
    const props = (frame.propIds || [])
      .map(id => getAssetById(id))
      .filter((a): a is Asset => a !== undefined);
    
    return { actors, scene: scene as Asset | null, props };
  }, [frame]);
  
  // 计算资产总数
  const totalAssets = assets.actors.length + (assets.scene ? 1 : 0) + assets.props.length;
  
  // 计算总使用次数
  const totalUsage = useMemo(() => {
    let count = 0;
    assets.actors.forEach(a => count += a.usageCount);
    if (assets.scene) count += assets.scene.usageCount;
    assets.props.forEach(p => count += p.usageCount);
    return count;
  }, [assets]);
  
  if (!frame || isChoosing) return null;
  
  return (
    <div className="absolute left-0 right-0 bottom-0 z-30">
      {/* 折叠状态 - 摘要栏 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full px-6 py-4 flex items-center justify-between
          bg-black/90 backdrop-blur-md border-t border-white/10
          hover:bg-black/95 transition group
        `}
      >
        <div className="flex items-center gap-4">
          {/* 链上标识 */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium">链上资产</span>
          </div>
          
          {/* 分隔线 */}
          <div className="w-px h-4 bg-white/20" />
          
          {/* 资产统计 */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white/70">
              本幕 <span className="text-white font-medium">{totalAssets}</span> 个资产
            </span>
            <span className="text-white/30">·</span>
            <span className="text-white/70">
              累计被使用 <span className="text-accent font-medium">{formatUsageCount(totalUsage)}</span> 次
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* 资产预览头像 */}
          <div className="flex -space-x-2">
            {assets.actors.slice(0, 3).map((actor) => (
              <div 
                key={actor.assetId}
                className="w-8 h-8 rounded-full border-2 border-black overflow-hidden"
              >
                <img src={actor.thumbnailUrl} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {totalAssets > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-black bg-white/20 flex items-center justify-center text-xs text-white">
                +{totalAssets - 3}
              </div>
            )}
          </div>
          
          {/* 展开/收起指示 */}
          <div className="flex items-center gap-2 text-white/50 group-hover:text-white/80 transition">
            <span className="text-xs">{isExpanded ? '收起' : '查看详情'}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </div>
      </button>
      
      {/* 展开状态 - 详细资产 */}
      <div className={`
        bg-black/95 backdrop-blur-md border-t border-white/10 overflow-hidden
        transition-all duration-500 ease-out
        ${isExpanded ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="p-6 overflow-y-auto max-h-[calc(70vh-2rem)]">
          <div className="max-w-6xl mx-auto">
            {/* 标题 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-white font-semibold text-lg">链上资产</h3>
                <span className="px-2 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs">
                  Solana NFT
                </span>
              </div>
              
              <a
                href="/assets"
                className="flex items-center gap-2 text-white/60 hover:text-accent text-sm transition"
              >
                浏览全部资产库
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            {/* 提示信息 */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💎</span>
                <div>
                  <p className="text-white/90 text-sm font-medium mb-1">
                    这些资产都是链上 NFT
                  </p>
                  <p className="text-white/60 text-xs">
                    每个资产可被社区复用，首创者将获得使用分润。使用热门资产可获得额外积分！
                  </p>
                </div>
              </div>
            </div>
            
            {/* 资产网格 */}
            <div className="space-y-6">
              {/* 角色 */}
              {assets.actors.length > 0 && (
                <div>
                  <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>👤</span> 角色 ({assets.actors.length})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {assets.actors.map((actor) => (
                      <AssetCard key={actor.assetId} asset={actor} type="actor" />
                    ))}
                  </div>
                </div>
              )}
              
              {/* 场景 */}
              {assets.scene && (
                <div>
                  <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>🏙️</span> 场景
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AssetCard asset={assets.scene} type="scene" />
                  </div>
                </div>
              )}
              
              {/* 道具 */}
              {assets.props.length > 0 && (
                <div>
                  <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>🔧</span> 道具 ({assets.props.length})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {assets.props.map((prop) => (
                      <AssetCard key={prop.assetId} asset={prop} type="prop" />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* 底部链接 */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <p className="text-white/40 text-xs">
                所有资产数据存储在 Arweave 永久存储网络
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-white/60 hover:text-accent text-xs flex items-center gap-1 transition">
                  <span>📄</span> 了解资产经济
                </a>
                <a href="#" className="text-white/60 hover:text-accent text-xs flex items-center gap-1 transition">
                  <span>🎨</span> 创建新资产
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






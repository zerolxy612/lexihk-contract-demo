'use client';

import { useState, useEffect } from 'react';
import { useTheaterStore } from '@/lib/stores/theaterStore';
import type { CandidateFrame } from '@/lib/types';

interface CinematicBranchSelectorProps {
  frames: CandidateFrame[];
  remainingFreeRefresh: number;
}

export function CinematicBranchSelector({ frames, remainingFreeRefresh }: CinematicBranchSelectorProps) {
  const { 
    selectedFrame, 
    setSelectedFrame, 
    isGenerating,
    isConfirming,
    isTransitioning,
    setIsCustomMode,
    selectCandidate,
    refreshFrames,
  } = useTheaterStore();
  
  const [isRevealed, setIsRevealed] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showConfirmPanel, setShowConfirmPanel] = useState(false);
  
  useEffect(() => {
    // 卡片入场动画
    const timer = setTimeout(() => setIsRevealed(true), 300);
    return () => clearTimeout(timer);
  }, [frames]);
  
  useEffect(() => {
    // 选中后显示确认面板
    setShowConfirmPanel(!!selectedFrame);
  }, [selectedFrame]);
  
  const handleConfirm = async () => {
    if (!selectedFrame) return;
    await selectCandidate(selectedFrame.candidateId);
  };
  
  const handleRefresh = async () => {
    setIsRevealed(false);
    await refreshFrames();
    setTimeout(() => setIsRevealed(true), 300);
  };
  
  // 检查是否有可编辑分镜
  const editableFrame = frames.find(f => f.isEditable);
  
  if (frames.length === 0 && !isGenerating) {
    return null;
  }
  
  return (
    <div className={`relative transition-opacity duration-500 ${isTransitioning ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
      {/* 标题区 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-8 bg-accent rounded-full" />
            <h2 className="text-2xl font-display font-bold text-white">
              命运的岔路口
            </h2>
          </div>
          
          {editableFrame && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/40 animate-pulse">
              <span className="text-accent text-sm">✨ 自定义模式已解锁</span>
            </div>
          )}
        </div>
        
        {/* 刷新按钮 */}
        <button
          onClick={handleRefresh}
          disabled={isGenerating || isConfirming}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full 
            bg-white/5 border border-white/10 
            hover:bg-white/10 hover:border-white/20 
            transition-all disabled:opacity-50
          `}
        >
          <span className={`text-lg ${isGenerating ? 'animate-spin' : ''}`}>🎲</span>
          <span className="text-white/70 text-sm">
            换一批 ({remainingFreeRefresh}/10)
          </span>
        </button>
      </div>
      
      {/* 分支卡片 - 电影海报风格 */}
      <div className="grid md:grid-cols-3 gap-6">
        {frames.map((frame, index) => {
          const isSelected = selectedFrame?.candidateId === frame.candidateId;
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={frame.candidateId}
              className={`
                relative group cursor-pointer
                transition-all duration-500 ease-out
                ${isRevealed 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
                }
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => !isConfirming && setSelectedFrame(frame)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* 卡片容器 */}
              <div className={`
                relative rounded-2xl overflow-hidden
                transition-all duration-300
                ${isSelected 
                  ? 'ring-2 ring-accent shadow-[0_0_60px_rgba(229,9,20,0.4)] scale-[1.02]' 
                  : isHovered 
                    ? 'ring-1 ring-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.5)] scale-[1.01]' 
                    : 'ring-1 ring-white/10'
                }
                ${frame.isEditable ? 'bg-gradient-to-br from-accent/10 to-purple-500/10' : ''}
              `}>
                {/* 电影海报 */}
                <div className="aspect-[2/3] relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                  {frame.frameData.thumbnailUrl && (
                    <img
                      src={frame.frameData.thumbnailUrl}
                      alt=""
                      className={`
                        w-full h-full object-cover
                        transition-transform duration-700
                        ${isHovered || isSelected ? 'scale-110' : 'scale-100'}
                      `}
                      onError={(e) => {
                        // 图片加载失败时隐藏
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  {/* 备用渐变背景始终存在 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 -z-10" />
                  
                  {/* 渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* 选项标签 */}
                  <div className="absolute top-4 left-4">
                    <div className={`
                      h-12 w-12 rounded-full grid place-items-center text-xl font-bold
                      transition-all duration-300
                      ${isSelected 
                        ? 'bg-accent text-white scale-110' 
                        : 'bg-black/60 backdrop-blur-sm text-white/80'}
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                  </div>
                  
                  {/* 可编辑标记 */}
                  {frame.isEditable && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 rounded-full bg-accent text-white text-xs font-medium shadow-lg">
                        ✨ 可自定义
                      </span>
                    </div>
                  )}
                  
                  {/* 播放预览按钮（悬停时显示） */}
                  <div className={`
                    absolute inset-0 flex items-center justify-center
                    transition-opacity duration-300
                    ${isHovered && !isSelected ? 'opacity-100' : 'opacity-0'}
                  `}>
                    <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm grid place-items-center">
                      <span className="text-2xl">▶</span>
                    </div>
                  </div>
                  
                  {/* 内容区 */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    {/* 脚本预览 */}
                    <p className="text-white text-sm leading-relaxed line-clamp-3 mb-4">
                      {frame.frameData.script}
                    </p>
                    
                    {/* 选择状态 */}
                    <div className={`
                      flex items-center gap-2 transition-all duration-300
                      ${isSelected ? 'opacity-100' : 'opacity-60'}
                    `}>
                      <div className={`
                        h-5 w-5 rounded-full border-2 grid place-items-center transition-all
                        ${isSelected 
                          ? 'border-accent bg-accent' 
                          : 'border-white/40'}
                      `}>
                        {isSelected && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className={`text-sm ${isSelected ? 'text-accent font-medium' : 'text-white/60'}`}>
                        {isSelected ? '已选择此命运' : '点击选择'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 底部投影 */}
              <div className={`
                absolute -bottom-4 left-4 right-4 h-8 rounded-full blur-xl transition-opacity duration-300
                ${isSelected 
                  ? 'bg-accent/30 opacity-100' 
                  : isHovered 
                    ? 'bg-white/10 opacity-100' 
                    : 'opacity-0'}
              `} />
            </div>
          );
        })}
      </div>
      
      {/* 确认面板 */}
      <div className={`
        mt-8 transition-all duration-500
        ${showConfirmPanel && selectedFrame 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
        }
      `}>
        <div className="relative">
          {/* 装饰线 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent to-accent/50" />
          
          <div className="pt-8 flex flex-col items-center gap-6">
            {/* 选中预览 */}
            <div className="text-center">
              <p className="text-white/60 text-sm mb-2">你选择了</p>
              <p className="text-white text-lg font-medium max-w-md">
                {selectedFrame?.frameData.script.slice(0, 60)}...
              </p>
            </div>
            
            {/* 确认按钮 */}
            <button
              onClick={handleConfirm}
              disabled={isConfirming}
              className="
                relative px-12 py-4 rounded-full font-bold text-lg overflow-hidden
                bg-gradient-to-r from-accent via-red-500 to-accent
                text-white shadow-[0_0_60px_rgba(229,9,20,0.5)]
                hover:shadow-[0_0_80px_rgba(229,9,20,0.7)]
                hover:scale-105
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              "
            >
              {/* 流光效果 */}
              {!isConfirming && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              )}
              
              <span className="relative flex items-center gap-3">
                {isConfirming ? (
                  <>
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    命运正在改写...
                  </>
                ) : (
                  <>
                    <span>🎬</span>
                    确认选择，开启下一幕
                  </>
                )}
              </span>
            </button>
            
            {/* 积分提示 */}
            <p className="text-white/40 text-xs">
              确认后将获得 <span className="text-green-400">+10</span> 积分奖励
            </p>
          </div>
        </div>
      </div>
      
      {/* 自定义模式按钮 */}
      {editableFrame && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsCustomMode(true)}
            className="
              inline-flex items-center gap-3 px-8 py-3 rounded-full
              bg-gradient-to-r from-purple-500/20 to-accent/20
              border border-accent/40
              text-white font-medium
              hover:border-accent hover:shadow-[0_0_30px_rgba(229,9,20,0.3)]
              transition-all duration-300
            "
          >
            <span className="text-xl">✨</span>
            开启自定义分镜模式
            <span className="text-xl">→</span>
          </button>
        </div>
      )}
    </div>
  );
}






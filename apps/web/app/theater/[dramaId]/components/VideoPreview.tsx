'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoPreviewProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export function VideoPreview({ 
  videoUrl, 
  thumbnailUrl, 
  title = '预告片',
  isMinimized = false,
  onToggleMinimize,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  // 没有视频URL时不渲染
  if (!videoUrl) return null;
  
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };
  
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };
  
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * videoRef.current.duration;
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // 最小化模式 - 小窗口悬浮
  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-50 group cursor-pointer"
        onClick={onToggleMinimize}
      >
        <div className="relative w-48 aspect-video rounded-lg overflow-hidden shadow-2xl border border-white/20 bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            onLoadedData={() => setIsLoaded(true)}
          />
          
          {/* 悬浮提示 */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm">点击展开</span>
          </div>
          
          {/* 进度条 */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
            <div 
              className="h-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* 关闭按钮 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (videoRef.current) videoRef.current.pause();
              setIsPlaying(false);
            }}
            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white/60 hover:text-white text-xs flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }
  
  // 完整模式
  return (
    <div 
      className="relative rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm border border-white/10"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* 标题栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎬</span>
          <span className="text-white/80 font-medium text-sm">{title}</span>
          {isPlaying && (
            <span className="flex items-center gap-1 text-accent text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              播放中
            </span>
          )}
        </div>
        
        {onToggleMinimize && (
          <button
            onClick={onToggleMinimize}
            className="text-white/40 hover:text-white/80 transition text-xs"
            title="最小化"
          >
            ⊖
          </button>
        )}
      </div>
      
      {/* 视频区域 */}
      <div className="relative aspect-video bg-black">
        {/* 视频 */}
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onLoadedData={() => setIsLoaded(true)}
          onClick={handlePlayPause}
        />
        
        {/* 加载中 */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="h-10 w-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* 播放按钮覆盖层 */}
        {!isPlaying && isLoaded && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group/play"
            onClick={handlePlayPause}
          >
            <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover/play:scale-110 group-hover/play:bg-white/20 transition-all">
              <span className="text-3xl ml-1">▶</span>
            </div>
          </div>
        )}
        
        {/* 控制栏 */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent
          transition-opacity duration-300
          ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}
        `}>
          {/* 进度条 */}
          <div 
            className="h-1 bg-white/20 rounded-full mb-3 cursor-pointer group/progress"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-accent rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>
          
          {/* 控制按钮 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* 播放/暂停 */}
              <button
                onClick={handlePlayPause}
                className="text-white/80 hover:text-white transition"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              
              {/* 静音/取消静音 */}
              <button
                onClick={toggleMute}
                className="text-white/80 hover:text-white transition"
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
              
              {/* 时间 */}
              <span className="text-white/50 text-xs font-mono">
                {videoRef.current ? formatTime(videoRef.current.currentTime) : '0:00'}
                {' / '}
                {videoRef.current && isLoaded ? formatTime(videoRef.current.duration) : '--:--'}
              </span>
            </div>
            
            {/* 全屏等其他按钮 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => videoRef.current?.requestFullscreen?.()}
                className="text-white/60 hover:text-white transition text-sm"
                title="全屏"
              >
                ⛶
              </button>
            </div>
          </div>
        </div>
        
        {/* 电影边框装饰 */}
        <div className="absolute inset-0 pointer-events-none border-4 border-black/50 rounded-sm" />
      </div>
      
      {/* 底部信息 */}
      <div className="px-4 py-3 border-t border-white/10">
        <p className="text-white/50 text-xs">
          💡 提示：观看预告片了解故事背景，然后开始你的冒险
        </p>
      </div>
    </div>
  );
}



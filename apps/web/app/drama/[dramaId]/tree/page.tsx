'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { ParticleBackground } from '@/app/components/ParticleBackground';
import { STORY_NODES, DEMO_DRAMA, CANDIDATE_FRAMES, getAssetById } from '@/lib/mock';
import type { StoryNode } from '@/lib/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getDramaContent } from '@/lib/i18n/drama';

// 节点在树中的位置
interface TreeNode {
  node: StoryNode;
  x: number;
  y: number;
  children: string[];
  isMainPath: boolean;
  temperature: number; // 0-100
}

export default function StoryTreePage() {
  const { language } = useLanguage();
  const content = getDramaContent(language);
  const params = useParams();
  const dramaId = params.dramaId as string;
  
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // 模拟加载
    setTimeout(() => setIsLoading(false), 800);
  }, []);
  
  // 构建树结构
  const treeData = useMemo(() => {
    const nodes = Object.values(STORY_NODES).filter(n => n.nodeId !== 'node-custom');
    const treeNodes: Record<string, TreeNode> = {};
    
    // 按深度分组
    const depthGroups: Record<number, StoryNode[]> = {};
    nodes.forEach(node => {
      if (!depthGroups[node.depth]) {
        depthGroups[node.depth] = [];
      }
      depthGroups[node.depth].push(node);
    });
    
    // 计算位置
    const maxDepth = Math.max(...Object.keys(depthGroups).map(Number));
    const containerWidth = 1200;
    const containerHeight = 800;
    const levelHeight = containerHeight / (maxDepth + 1);
    
    // 主路径节点（访问量最高的）
    const mainPathNodes = new Set<string>();
    let currentNode = nodes.find(n => n.depth === 1);
    while (currentNode) {
      mainPathNodes.add(currentNode.nodeId);
      // 找访问量最高的子节点
      const children = nodes.filter(n => n.parentNodeIds.includes(currentNode!.nodeId));
      currentNode = children.sort((a, b) => b.totalVisits - a.totalVisits)[0];
    }
    
    Object.keys(depthGroups).forEach(depthStr => {
      const depth = Number(depthStr);
      const nodesAtDepth = depthGroups[depth];
      const spacing = containerWidth / (nodesAtDepth.length + 1);
      
      nodesAtDepth.forEach((node, index) => {
        // 找子节点
        const children = nodes
          .filter(n => n.parentNodeIds.includes(node.nodeId))
          .map(n => n.nodeId);
        
        // 计算温度（基于访问量）
        const maxVisits = Math.max(...nodes.map(n => n.totalVisits));
        const temperature = Math.round((node.totalVisits / maxVisits) * 100);
        
        treeNodes[node.nodeId] = {
          node,
          x: spacing * (index + 1),
          y: depth * levelHeight,
          children,
          isMainPath: mainPathNodes.has(node.nodeId),
          temperature,
        };
      });
    });
    
    return treeNodes;
  }, []);
  
  // 生成连接线
  const connections = useMemo(() => {
    const lines: { from: TreeNode; to: TreeNode; isMainPath: boolean }[] = [];
    
    Object.values(treeData).forEach(treeNode => {
      treeNode.children.forEach(childId => {
        const childNode = treeData[childId];
        if (childNode) {
          lines.push({
            from: treeNode,
            to: childNode,
            isMainPath: treeNode.isMainPath && childNode.isMainPath,
          });
        }
      });
    });
    
    return lines;
  }, [treeData]);
  
  const selectedTreeNode = selectedNode ? treeData[selectedNode] : null;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 mx-auto border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60">{content.tree.loading}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景 */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0b10] to-[#06060a]" />
      <ParticleBackground />
      <div className="fixed inset-0 noise pointer-events-none opacity-30" />
      
      {/* 头部 */}
      <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a 
                href={`/theater/${dramaId}`}
                className="h-10 w-10 rounded-full glass border border-white/10 grid place-items-center text-white/60 hover:text-white hover:border-white/30 transition"
              >
                ←
              </a>
              <div>
                <h1 className="text-xl font-display font-bold text-white">
                  🌳 {content.tree.title}
                </h1>
                <p className="text-white/60 text-sm">{DEMO_DRAMA.title}</p>
              </div>
            </div>
            
            {/* 图例 */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accent" />
                <span className="text-white/60">{content.tree.legend.main}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-white/30" />
                <span className="text-white/60">{content.tree.legend.side}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                <span className="text-white/60">{content.tree.legend.hot}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* 主内容区 */}
      <div className="relative z-10 flex">
        {/* 树形图区域 */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="relative" style={{ width: '1200px', height: '900px', margin: '0 auto' }}>
            {/* SVG 连接线 */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                {/* 主线渐变 */}
                <linearGradient id="mainPathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E50914" />
                  <stop offset="100%" stopColor="#FF6B6B" />
                </linearGradient>
                {/* 发光效果 */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {connections.map((conn, index) => {
                const startX = conn.from.x;
                const startY = conn.from.y + 40;
                const endX = conn.to.x;
                const endY = conn.to.y - 10;
                const midY = (startY + endY) / 2;
                
                return (
                  <g key={index}>
                    {/* 发光效果层 */}
                    {conn.isMainPath && (
                      <path
                        d={`M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`}
                        fill="none"
                        stroke="url(#mainPathGradient)"
                        strokeWidth="6"
                        opacity="0.3"
                        filter="url(#glow)"
                      />
                    )}
                    {/* 主线 */}
                    <path
                      d={`M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`}
                      fill="none"
                      stroke={conn.isMainPath ? 'url(#mainPathGradient)' : 'rgba(255,255,255,0.2)'}
                      strokeWidth={conn.isMainPath ? 3 : 2}
                      className="transition-all duration-300"
                    />
                    {/* 箭头 */}
                    <polygon
                      points={`${endX},${endY} ${endX - 5},${endY - 10} ${endX + 5},${endY - 10}`}
                      fill={conn.isMainPath ? '#E50914' : 'rgba(255,255,255,0.3)'}
                    />
                  </g>
                );
              })}
            </svg>
            
            {/* 节点 */}
            {Object.values(treeData).map((treeNode) => (
              <div
                key={treeNode.node.nodeId}
                className={`
                  absolute transform -translate-x-1/2 cursor-pointer transition-all duration-300
                  ${hoveredNode === treeNode.node.nodeId ? 'scale-110 z-20' : 'z-10'}
                  ${selectedNode === treeNode.node.nodeId ? 'scale-110 z-30' : ''}
                `}
                style={{ left: treeNode.x, top: treeNode.y }}
                onClick={() => setSelectedNode(treeNode.node.nodeId)}
                onMouseEnter={() => setHoveredNode(treeNode.node.nodeId)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* 节点卡片 */}
                <div className={`
                  relative w-48 rounded-xl overflow-hidden transition-all duration-300
                  ${treeNode.isMainPath 
                    ? 'ring-2 ring-accent shadow-[0_0_30px_rgba(229,9,20,0.3)]' 
                    : 'ring-1 ring-white/20'}
                  ${selectedNode === treeNode.node.nodeId 
                    ? 'ring-2 ring-accent shadow-[0_0_40px_rgba(229,9,20,0.5)]' 
                    : ''}
                `}>
                  {/* 缩略图 */}
                  <div className="aspect-video relative overflow-hidden bg-black">
                    {treeNode.node.confirmedFrame.thumbnailUrl ? (
                      <img
                        src={treeNode.node.confirmedFrame.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 to-purple-500/20" />
                    )}
                    
                    {/* 温度指示器 */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-xs">
                      {treeNode.temperature >= 70 ? '🔥' : treeNode.temperature >= 30 ? '🌡️' : '❄️'}
                      <span className="text-white/80">{treeNode.temperature}°</span>
                    </div>
                    
                    {/* 深度标签 */}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-xs text-white/80">
                      {content.tree.depthLabel.replace('{depth}', String(treeNode.node.depth))}
                    </div>
                  </div>
                  
                  {/* 信息区 */}
                  <div className="p-3 bg-black/80 backdrop-blur-sm">
                    <p className="text-white/90 text-xs line-clamp-2 leading-relaxed">
                      {treeNode.node.confirmedFrame.script.slice(0, 50)}...
                    </p>
                    <div className="flex items-center justify-between mt-2 text-xs text-white/50">
                      <span>{content.tree.visitsLabel.replace('{count}', treeNode.node.totalVisits.toLocaleString())}</span>
                      <span>{content.tree.branchesLabel.replace('{count}', String(treeNode.children.length))}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 右侧详情面板 */}
        <div className={`
          w-96 border-l border-white/10 bg-black/50 backdrop-blur-xl
          transition-all duration-300 overflow-hidden
          ${selectedTreeNode ? 'translate-x-0' : 'translate-x-full w-0'}
        `}>
          {selectedTreeNode && (
            <div className="p-6 space-y-6 animate-slide-in-up">
              {/* 关闭按钮 */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{content.tree.panelTitle}</h3>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition grid place-items-center"
                >
                  ✕
                </button>
              </div>
              
              {/* 预览图 */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src={selectedTreeNode.node.confirmedFrame.thumbnailUrl}
                  alt=""
                  className="w-full aspect-video object-cover"
                />
              </div>
              
              {/* 分镜脚本 */}
              <div>
                <p className="text-xs uppercase tracking-wider text-accent mb-2">{content.tree.scriptLabel}</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  {selectedTreeNode.node.confirmedFrame.script}
                </p>
              </div>
              
              {/* 统计数据 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-accent">
                    {selectedTreeNode.node.totalVisits.toLocaleString()}
                  </div>
                  <div className="text-white/50 text-xs mt-1">{content.tree.visitsCount}</div>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">
                    {selectedTreeNode.children.length}
                  </div>
                  <div className="text-white/50 text-xs mt-1">{content.tree.branchesCount}</div>
                </div>
              </div>
              
              {/* 温度 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wider text-accent">{content.tree.temperature}</p>
                  <span className="text-white/60 text-sm">{selectedTreeNode.temperature}°</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedTreeNode.temperature >= 70 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                        : selectedTreeNode.temperature >= 30 
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-r from-blue-400 to-cyan-400'
                    }`}
                    style={{ width: `${selectedTreeNode.temperature}%` }}
                  />
                </div>
              </div>
              
              {/* 使用的资产 */}
              <div>
                <p className="text-xs uppercase tracking-wider text-accent mb-3">{content.tree.assets}</p>
                <div className="space-y-2">
                  {selectedTreeNode.node.confirmedFrame.actorIds.map(actorId => {
                    const asset = getAssetById(actorId);
                    return asset ? (
                      <div key={actorId} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                        <img src={asset.thumbnailUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                        <span className="text-white/80 text-sm">{asset.name}</span>
                        <span className="text-white/40 text-xs ml-auto">{content.tree.role}</span>
                      </div>
                    ) : null;
                  })}
                  {selectedTreeNode.node.confirmedFrame.sceneId && (() => {
                    const asset = getAssetById(selectedTreeNode.node.confirmedFrame.sceneId);
                    return asset ? (
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                        <img src={asset.thumbnailUrl} alt="" className="h-8 w-12 rounded object-cover" />
                        <span className="text-white/80 text-sm">{asset.name}</span>
                        <span className="text-white/40 text-xs ml-auto">{content.tree.scene}</span>
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={`/theater/${dramaId}`}
                  className="block w-full py-3 text-center rounded-xl bg-accent text-white font-medium hover:bg-accent/90 transition"
                >
                  {content.tree.continueFromNode}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 底部统计 */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{Object.keys(treeData).length}</div>
                <div className="text-white/50 text-xs">{content.tree.stats.nodes}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{connections.length}</div>
                <div className="text-white/50 text-xs">{content.tree.stats.connections}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">5</div>
                <div className="text-white/50 text-xs">{content.tree.stats.depth}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm">{content.tree.clickHint}</span>
              <a
                href={`/theater/${dramaId}`}
                className="px-6 py-2 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition"
              >
                {content.tree.enterTheater}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}








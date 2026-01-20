'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// 分镜详情数据结构
export interface FrameDetail {
  frameId: string;
  frameNumber: string;  // 如 "01-1", "02-A"
  thumbnailUrl?: string;
  
  // 画面描述
  sceneDescription: string;
  
  // 构图设计
  composition: string;
  
  // 运镜调度
  cameraMovement: string;
  
  // 配音角色
  voiceActor: string;
  
  // 台词内容
  dialogue: string;
  
  // 额外信息
  duration?: string;  // 预计时长
  mood?: string;      // 氛围
  bgm?: string;       // 背景音乐
}

interface FrameDetailPopoverProps {
  detail: FrameDetail;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'auto';
}

export function FrameDetailPopover({ 
  detail, 
  children, 
  position = 'auto' 
}: FrameDetailPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, placement: 'bottom' as 'top' | 'bottom' });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;
    
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverHeight = 400; // 预估高度
    const viewportHeight = window.innerHeight;
    
    // 判断放上面还是下面
    let placement: 'top' | 'bottom' = 'bottom';
    if (position === 'auto') {
      placement = rect.bottom + popoverHeight > viewportHeight ? 'top' : 'bottom';
    } else {
      placement = position;
    }
    
    setCoords({
      x: rect.left + rect.width / 2,
      y: placement === 'bottom' ? rect.bottom + 12 : rect.top - 12,
      placement
    });
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    calculatePosition();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        {children}
      </div>
      
      {isOpen && typeof window !== 'undefined' && createPortal(
        <div
          ref={popoverRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            fixed z-[200] w-[380px] max-h-[80vh] overflow-y-auto
            bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] 
            rounded-2xl border border-white/10
            shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_40px_rgba(229,9,20,0.15)]
            backdrop-blur-xl
            animate-in fade-in-0 zoom-in-95 duration-200
          `}
          style={{
            left: coords.x,
            top: coords.placement === 'bottom' ? coords.y : 'auto',
            bottom: coords.placement === 'top' ? `calc(100vh - ${coords.y}px)` : 'auto',
            transform: 'translateX(-50%)',
          }}
        >
          {/* 箭头 */}
          <div 
            className={`
              absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45
              bg-[#1a1a1a] border-white/10
              ${coords.placement === 'bottom' 
                ? '-top-1.5 border-l border-t' 
                : '-bottom-1.5 border-r border-b'
              }
            `}
          />
          
          {/* 内容 */}
          <div className="relative">
            {/* 顶部图片 */}
            {detail.thumbnailUrl && (
              <div className="relative h-40 overflow-hidden rounded-t-2xl">
                <img 
                  src={detail.thumbnailUrl} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                
                {/* 分镜编号 */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10">
                  <span className="text-accent font-mono font-bold">分镜 {detail.frameNumber}</span>
                </div>
                
                {/* 时长标签 */}
                {detail.duration && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm">
                    <span className="text-white/70 text-xs">⏱ {detail.duration}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* 详情区域 */}
            <div className="p-5 space-y-4">
              {/* 无图片时显示编号 */}
              {!detail.thumbnailUrl && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent font-mono font-bold text-lg">分镜 {detail.frameNumber}</span>
                </div>
              )}
              
              {/* 画面描述 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎬</span>
                  <h4 className="text-white/90 font-semibold text-sm">画面描述</h4>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pl-7">
                  {detail.sceneDescription}
                </p>
              </div>
              
              {/* 构图设计 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📐</span>
                  <h4 className="text-white/90 font-semibold text-sm">构图设计</h4>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pl-7">
                  {detail.composition}
                </p>
              </div>
              
              {/* 运镜调度 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎥</span>
                  <h4 className="text-white/90 font-semibold text-sm">运镜调度</h4>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pl-7">
                  {detail.cameraMovement}
                </p>
              </div>
              
              {/* 分隔线 */}
              <div className="border-t border-white/10 my-3" />
              
              {/* 配音与台词 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎙️</span>
                  <h4 className="text-white/90 font-semibold text-sm">配音 · {detail.voiceActor}</h4>
                </div>
                <div className="relative pl-7">
                  <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-accent/30 rounded" />
                  <p className="text-white italic text-sm leading-relaxed pl-4 py-2 bg-white/5 rounded-lg border-l-2 border-accent/50">
                    "{detail.dialogue}"
                  </p>
                </div>
              </div>
              
              {/* 氛围和BGM */}
              {(detail.mood || detail.bgm) && (
                <div className="flex items-center gap-4 pt-2 text-xs text-white/50">
                  {detail.mood && (
                    <div className="flex items-center gap-1">
                      <span>🌙</span>
                      <span>{detail.mood}</span>
                    </div>
                  )}
                  {detail.bgm && (
                    <div className="flex items-center gap-1">
                      <span>🎵</span>
                      <span>{detail.bgm}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// Mock 分镜数据生成器
export function generateMockFrameDetail(
  index: number, 
  type: 'history' | 'candidate',
  thumbnailUrl?: string
): FrameDetail {
  const historyFrames: Omit<FrameDetail, 'frameId' | 'frameNumber' | 'thumbnailUrl'>[] = [
    {
      sceneDescription: '实习医生躺在病床上，双眼紧闭，呼吸微弱。病房内一片狼藉，医疗设备损坏散落，窗外透入昏暗的光线。',
      composition: '近景，平视，实习医生面部特写，背景虚化呈现混乱的病房环境。',
      cameraMovement: '镜头缓慢推近，聚焦医生紧闭的双眼，呼吸起伏带动轻微颤动。',
      voiceActor: '旁白',
      dialogue: '他从昏迷中醒来，周围的一切都变得陌生而恐怖。这里，已不再是他熟悉的医院。',
      duration: '8秒',
      mood: '压抑、紧张',
      bgm: '低沉弦乐',
    },
    {
      sceneDescription: '医生猛然睁眼，瞳孔急剧收缩。他挣扎着坐起身，手臂上的输液管被扯断，鲜血渗出。',
      composition: '中景，俯拍，展现医生从床上惊醒的动态，床单凌乱。',
      cameraMovement: '快速摇镜，从医生面部摇到被扯断的输液管，再到滴落的血珠。',
      voiceActor: '李医生',
      dialogue: '这...这是怎么回事？为什么会...该死，发生了什么？',
      duration: '6秒',
      mood: '惊恐、困惑',
      bgm: '心跳声渐强',
    },
    {
      sceneDescription: '走廊尽头传来异响，医生踉跄着走向门口。透过门缝，他看到远处有模糊的人影在蠕动。',
      composition: '主观镜头，门缝视角，景深极浅，前景门框清晰，背景人影模糊。',
      cameraMovement: '手持跟拍，轻微晃动模拟紧张感，缓慢推向门缝。',
      voiceActor: '旁白',
      dialogue: '直觉告诉他，那些蠕动的影子，已经不再是他的同事了。',
      duration: '10秒',
      mood: '悬疑、恐惧',
      bgm: '不协和音',
    },
    {
      sceneDescription: '医生在药房角落找到一把手术刀，他握紧刀柄，指节发白。药架上的药品散落一地。',
      composition: '特写，手术刀在昏暗光线中泛着冷光，医生的手在微微颤抖。',
      cameraMovement: '360度环绕镜头，从手术刀特写环绕到医生紧绷的侧脸。',
      voiceActor: '李医生',
      dialogue: '冷静...保持冷静。我是医生，我救过无数人的命。现在，我要救自己。',
      duration: '7秒',
      mood: '决绝、紧张',
      bgm: '金属摩擦声',
    },
    {
      sceneDescription: '医生推开太平门，阳光刺眼。楼下街道空无一人，远处升起数道浓烟。城市，死寂。',
      composition: '大远景，医生渺小的身影站在天台边缘，俯瞰废墟般的城市。',
      cameraMovement: '航拍下降，从医生背影缓缓下降展现整个城市的荒凉。',
      voiceActor: '旁白',
      dialogue: '当他站在天台，看到这个世界的真相时，他终于明白——一切才刚刚开始。',
      duration: '12秒',
      mood: '苍凉、史诗感',
      bgm: '史诗弦乐渐起',
    },
  ];

  const candidateFrames: Omit<FrameDetail, 'frameId' | 'frameNumber' | 'thumbnailUrl'>[] = [
    {
      sceneDescription: '医生决定从医院正门突围。他看到大厅里聚集着十几个"它们"，正在啃食什么东西。',
      composition: '全景，医生藏在柱子后，前景虚化，中景是徘徊的丧尸群。',
      cameraMovement: '缓慢横移，展现大厅全貌，镜头最后停在被啃食的尸体上。',
      voiceActor: '李医生（内心）',
      dialogue: '正门...人太多了。但如果我足够快，也许能冲出去。',
      duration: '8秒',
      mood: '紧张、决断',
      bgm: '压迫感电子乐',
    },
    {
      sceneDescription: '医生选择地下车库逃生。昏暗的车库里，汽车报警声此起彼伏，掩盖了他的脚步声。',
      composition: '低角度，医生弯腰穿行在车辆间，顶部应急灯闪烁造成明暗交替。',
      cameraMovement: '跟拍长镜头，紧随医生穿过车辆迷宫，偶尔有黑影掠过。',
      voiceActor: '李医生（内心）',
      dialogue: '地下车库...光线差，但噪音能掩护我。找到一辆能发动的车就好。',
      duration: '10秒',
      mood: '隐秘、紧张',
      bgm: '汽车报警混音',
    },
    {
      sceneDescription: '医生决定寻找其他幸存者。他循着微弱的呼救声，来到住院部顶楼的病房。',
      composition: '仰拍，医生站在楼梯转角向上张望，光线从上方倾泻而下。',
      cameraMovement: '垂直升降镜头，从医生脚下向上延伸到顶楼走廊。',
      voiceActor: '求救声（远）',
      dialogue: '救命...有人吗...求求你们...我还活着...',
      duration: '9秒',
      mood: '希望与危险并存',
      bgm: '钢琴单音回响',
    },
  ];

  const frameData = type === 'history' 
    ? historyFrames[index % historyFrames.length]
    : candidateFrames[index % candidateFrames.length];

  const frameNumber = type === 'history' 
    ? `0${index + 1}-1` 
    : `0${index + 1}-${String.fromCharCode(65 + index)}`;

  return {
    frameId: `${type}-${index}`,
    frameNumber,
    thumbnailUrl,
    ...frameData,
  };
}






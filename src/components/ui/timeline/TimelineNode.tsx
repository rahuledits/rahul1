
import { useRef } from "react";
import type { TimelineItem, TimelinePosition } from "./types";
import TimelineNodeCard from "./TimelineNodeCard";

interface TimelineNodeProps {
  item: TimelineItem;
  position: TimelinePosition;
  isExpanded: boolean;
  isRelated: boolean;
  isPulsing: boolean;
  timelineData: TimelineItem[];
  onToggleItem: (id: number) => void;
  nodeRef: (el: HTMLDivElement | null) => void;
}

export default function TimelineNode({
  item,
  position,
  isExpanded,
  isRelated,
  isPulsing,
  timelineData,
  onToggleItem,
  nodeRef
}: TimelineNodeProps) {
  const Icon = item.icon;
  
  const nodeStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    zIndex: isExpanded ? 200 : position.zIndex,
    opacity: isExpanded ? 1 : position.opacity
  };

  return (
    <div 
      ref={nodeRef}
      className="absolute transition-all duration-700 ease-out cursor-pointer" 
      style={nodeStyle} 
      onClick={e => {
        e.stopPropagation();
        onToggleItem(item.id);
      }}
    >
      <div 
        className={`absolute rounded-full -inset-1 transition-all duration-300 ${isPulsing ? "animate-pulse duration-700" : ""}`} 
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
          width: `${item.energy * 0.5 + 40}px`,
          height: `${item.energy * 0.5 + 40}px`,
          left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
          top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`
        }}
      ></div>

      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center
        ${isExpanded ? "bg-white text-black" : isRelated ? "bg-white/50 text-black" : "bg-black text-white"}
        border-2 
        ${isExpanded ? "border-white shadow-lg shadow-white/30" : isRelated ? "border-white animate-pulse" : "border-white/40"}
        transition-all duration-300 ease-out transform
        ${isExpanded ? "scale-150" : ""}
      `}>
        <Icon size={16} />
      </div>

      <div className={`
        absolute top-12 whitespace-nowrap
        text-xs font-semibold tracking-wider
        transition-all duration-300 ease-out
        ${isExpanded ? "text-white scale-125" : "text-white/70"}
      `}>
        {item.title}
      </div>

      {isExpanded && (
        <TimelineNodeCard 
          item={item} 
          timelineData={timelineData} 
          onToggleItem={onToggleItem} 
        />
      )}
    </div>
  );
}

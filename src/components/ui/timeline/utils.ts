
import type { TimelineItem } from "./types";

export const calculateNodePosition = (
  index: number, 
  total: number, 
  radius: number
) => {
  const angle = (index / total * 360) % 360;
  const radian = angle * Math.PI / 180;
  const x = radius * Math.cos(radian);
  const y = radius * Math.sin(radian);
  const zIndex = Math.round(100 + 50 * Math.cos(radian));
  const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
  
  return { x, y, angle, zIndex, opacity };
};

export const getRelatedItems = (itemId: number, timelineData: TimelineItem[]): number[] => {
  const currentItem = timelineData.find(item => item.id === itemId);
  return currentItem ? currentItem.relatedIds : [];
};

export const getStatusStyles = (status: TimelineItem["status"]): string => {
  switch (status) {
    case "completed":
      return "text-white bg-black border-white";
    case "in-progress":
      return "text-black bg-white border-black";
    case "pending":
      return "text-white bg-black/40 border-white/50";
    default:
      return "text-white bg-black/40 border-white/50";
  }
};

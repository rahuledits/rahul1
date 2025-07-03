
import { LucideIcon } from "lucide-react";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export interface TimelinePosition {
  x: number;
  y: number;
  angle: number;
  zIndex: number;
  opacity: number;
}

export interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  centerContent?: React.ReactNode;
  className?: string;
}

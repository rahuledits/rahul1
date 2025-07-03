"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  backgroundImage?: string;
  video?: string;
}
function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  backgroundImage,
  video
}: DisplayCardProps) {
  return (
    <div 
      className={cn("relative flex flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 w-[22rem] -skew-y-[8deg] hover:border-white/20 hover:bg-muted group", className)}
      style={(!video && backgroundImage) ? {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    } : undefined}
  >
      {video && (
        <div className="relative mb-3">
          <video 
            src={video}
            controls
            className="w-full h-60 object-cover rounded-xl border-2 border-cyan-400 shadow-[0_0_24px_2px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_48px_8px_rgba(236,72,153,0.7)] group-hover:scale-105 transition-all duration-500 bg-black"
            style={{ boxShadow: '0 0 24px 2px #22d3ee80' }}
          />
          <div className="absolute inset-0 pointer-events-none rounded-xl border-2 border-pink-500/60 group-hover:border-cyan-400/80 group-hover:shadow-[0_0_32px_8px_rgba(236,72,153,0.7)] transition-all duration-500" />
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg mt-2">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  );
}
interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}
export default function DisplayCards({
  cards
}: DisplayCardsProps) {
  const defaultCards = [{
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0"
  }, {
    className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0"
  }, {
    className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10"
  }];
  const displayCards = cards || defaultCards;
  return <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 px-0 rounded-3xl my-[76px]">
      {displayCards.map((cardProps, index) => <DisplayCard key={index} {...cardProps} />)}
    </div>;
}

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const AnimatedButton = ({ children, onClick, className }: AnimatedButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <button
      className={cn("group relative rounded-full bg-gradient-to-r from-blue-300/30 via-blue-500/30 via-40% to-purple-500/30 p-1 text-white transition-transform hover:scale-110 active:scale-105", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-300 via-blue-500 via-40% to-purple-500 px-6 py-3 text-white overflow-hidden">
        <Sparkles className="size-5 -translate-y-0.5 animate-pulse fill-white" />
        <Sparkles
          style={{
            animationDelay: "1s",
          }}
          className="absolute bottom-2.5 left-3.5 z-20 size-2 rotate-12 animate-pulse fill-white"
        />
        <Sparkles
          style={{
            animationDelay: "1.5s",
            animationDuration: "2.5s",
          }}
          className="absolute left-5 top-2.5 size-1 -rotate-12 animate-pulse fill-white"
        />
        <Sparkles
          style={{
            animationDelay: "0.5s",
            animationDuration: "2.5s",
          }}
          className="absolute left-3 top-3 size-1.5 animate-pulse fill-white"
        />

        <span className="font-semibold relative z-10">{children}</span>
        
        {/* Animated background effect */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 opacity-0 transition-opacity duration-300",
          isHovering && "opacity-100"
        )} />
      </div>
    </button>
  );
};

import React from 'react';
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { BackgroundPaths } from "@/components/ui/animated-infinity-background";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import { TypingEffect } from '@/components/ui/typing-effect';
import { Interactive3DBackground } from '@/components/ui/interactive-3d-background';

interface HeroSectionProps {
  isDarkMode: boolean;
}

const demoText = "RAHUL";

function CyberpunkGlitchMagneticHero() {
  const [hoveredIndex, setHoveredIndex] = React.useState(-1);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  function handleMouseEnter(i: number) {
    setHoveredIndex(i);
    setOffset({ x: 0, y: 0 });
  }
  function handleMouseMove(e: React.MouseEvent<HTMLSpanElement>, i: number) {
    if (hoveredIndex !== i) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    setOffset({ x, y });
  }
  function handleMouseLeave() {
    setHoveredIndex(-1);
    setOffset({ x: 0, y: 0 });
  }

  return (
    <h1
      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-red-600 drop-shadow-2xl relative flex justify-center items-center"
      style={{ fontSize: 'clamp(2rem, 8vw, 7rem)', lineHeight: 0.9 }}
    >
      {/* Animated glow behind RAHUL */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0.7, filter: 'blur(32px)' }}
        animate={{
          opacity: [0.7, 1, 0.7],
          filter: [
            'blur(32px) drop-shadow(0 0 40px #ff003c)',
            'blur(48px) drop-shadow(0 0 80px #ff003c)',
            'blur(32px) drop-shadow(0 0 40px #ff003c)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle at 50% 60%, #ff003c44 0%, #ff003c11 80%, transparent 100%)' }}
      />
      {/* Letters with pop/magnetic/glitch */}
      {demoText.split("").map((letter, i) => {
        const isHovered = hoveredIndex === i;
        return (
          <span
            key={i}
            className="inline-block relative cursor-pointer"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseMove={e => handleMouseMove(e, i)}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block', fontFamily: 'Stardock, sans-serif' }}
          >
            <motion.span
              className="relative z-10"
              animate={
                isHovered
                  ? { x: offset.x * 2.5, y: offset.y * 2.5, scale: 2.3 }
                  : { x: 0, y: 0, scale: 1 }
              }
              transition={
                isHovered
                  ? { type: 'spring', stiffness: 700, damping: 18, mass: 0.5 }
                  : { type: 'spring', stiffness: 180, damping: 8 }
              }
              style={{ filter: isHovered ? 'drop-shadow(0 0 40px #ff003c)' : 'drop-shadow(0 0 8px #ff003c)' }}
            >
              {letter}
            </motion.span>
            {/* Always-on cyberpunk glitch overlays, but less intense */}
            <motion.span
              className="absolute left-0 top-0 z-0 pointer-events-none"
              style={{ color: '#00fff7', opacity: 0.4, filter: 'blur(0.5px) drop-shadow(0 0 4px #00fff7)' }}
              animate={{
                x: [0, -4, 4, -2, 0],
                y: [0, 4, -4, 2, 0],
                opacity: [0.4, 0.2, 0.4, 0.3, 0.4]
              }}
              transition={{ duration: 0.7, repeat: Infinity, repeatType: 'loop', delay: i * 0.09 }}
            >
              {letter}
            </motion.span>
            <motion.span
              className="absolute left-0 top-0 z-0 pointer-events-none"
              style={{ color: '#fff', opacity: 0.2, filter: 'blur(0.2px) drop-shadow(0 0 2px #fff)' }}
              animate={{
                x: [0, 4, -4, 2, 0],
                y: [0, -4, 4, -2, 0],
                opacity: [0.2, 0.1, 0.2, 0.15, 0.2]
              }}
              transition={{ duration: 0.7, repeat: Infinity, repeatType: 'loop', delay: i * 0.13 }}
            >
              {letter}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}

const HeroSection = ({
  isDarkMode
}: HeroSectionProps) => {
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  const words = [
    "Creative Videographer",
    "Video Editor",
    "Content Creator",
    "Storyteller"
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center overflow-hidden">
      {/* Interactive 3D Background (bottom layer) */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Interactive3DBackground />
      </div>
      {/* Animated Infinity Background (above 3D) */}
      <div className="absolute inset-0 z-1">
        <BackgroundPaths titleBackground={false} showGradientOrb={true} backgroundStyle="gradient" />
      </div>
      {/* Animated 'RAHUL' heading centered at the top with extra space */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 mt-8 w-full flex justify-center items-center min-h-[10vw] md:min-h-[12vw] lg:min-h-[6rem]">
        <CyberpunkGlitchMagneticHero />
      </div>
      {/* Sparkles (stars) behind robot, text, and lines */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <SparklesCore 
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#fff"
          speed={1}
        />
      </div>
      {/* 3D Robot Background (above sparkles) */}
      <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="absolute inset-0 z-10" />
      {/* Dark overlay for better text readability (above all backgrounds) */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/30' : 'bg-orange-100/20'} z-30`}></div>
      {/* Main content in bottom-left corner, no background (topmost) */}
      <div className="relative z-40 w-full flex-1 flex items-end justify-start">
        <div className="mb-16 lg:mb-24 animate-fade-in text-left max-w-xl ml-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
            Video Editor & Cinematographer
          </h1>
          <motion.div 
            className="text-2xl md:text-4xl font-semibold mb-6 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I'm Rahul, a{' '}
            <TypingEffect 
              words={words} 
              className="text-orange-400 font-bold"
            />
          </motion.div>
        </div>
      </div>
      {/* Floating Elements (topmost) */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'text-white/60' : 'text-orange-600'} animate-bounce-gentle z-40`}>
        <div className="text-sm">Scroll to explore</div>
      </div>
    </section>
  );
};

export default HeroSection;

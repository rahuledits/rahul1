import React from 'react';
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { BackgroundPaths } from "@/components/ui/animated-infinity-background";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";

interface HeroSectionProps {
  isDarkMode: boolean;
}

const HeroSection = ({
  isDarkMode
}: HeroSectionProps) => {
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center overflow-hidden">
      {/* Animated Infinity Background (bottom layer) */}
      <div className="absolute inset-0 z-0">
        <BackgroundPaths titleBackground={false} showGradientOrb={true} backgroundStyle="gradient" />
      </div>
      {/* Animated 'RAHUL' heading centered at the top with extra space */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40 mt-16">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-br from-red-800 via-red-600 to-red-500 bg-clip-text text-transparent drop-shadow-2xl"
        >
          {"RAHUL".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: i * 0.08,
                type: "spring",
                stiffness: 150,
                damping: 25,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
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

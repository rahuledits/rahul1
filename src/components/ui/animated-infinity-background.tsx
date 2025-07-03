"use client";

import React from 'react';
import { motion } from "framer-motion";

function FloatingPaths({ position }) {
    // Generate infinity-shaped paths
    const paths = Array.from({ length: 36 }, (_, i) => {
        // Parameters for the infinity shape
        const scale = 200 + i * 10; // Base scale that increases with each path
        const offsetX = 348; // Center X position (half of viewBox width)
        const offsetY = 158; // Center Y position (half of viewBox height)
        
        // Create a figure-8 / infinity path using cubic bezier curves
        // The infinity shape consists of two loops connected at the center
        const d = `
            M ${offsetX - scale} ${offsetY}
            C ${offsetX - scale} ${offsetY - scale * 0.5}, 
              ${offsetX - scale * 0.5} ${offsetY - scale * 0.5}, 
              ${offsetX} ${offsetY}
            C ${offsetX + scale * 0.5} ${offsetY + scale * 0.5}, 
              ${offsetX + scale} ${offsetY + scale * 0.5}, 
              ${offsetX + scale} ${offsetY}
            C ${offsetX + scale} ${offsetY - scale * 0.5}, 
              ${offsetX + scale * 0.5} ${offsetY - scale * 0.5}, 
              ${offsetX} ${offsetY}
            C ${offsetX - scale * 0.5} ${offsetY + scale * 0.5}, 
              ${offsetX - scale} ${offsetY + scale * 0.5}, 
              ${offsetX - scale} ${offsetY}
        `.replace(/\s+/g, ' ').trim();
        
        return {
            id: i,
            d,
            color: `rgba(15,23,42,${0.1 + i * 0.03})`,
            width: 0.5 + i * 0.03,
        };
    });

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path, index) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 1, 0],
                            opacity: [0, 0.6, 0.6, 0],
                        }}
                        transition={{
                            duration: 15 + index * 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: index * 0.2,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Infinity Background",
    titleBackground = false,
    backgroundStyle = "glass", // "glass", "gradient", "solid", "glow"
    subtitle = "",
    showGradientOrb = true,
}) {
    const words = title.split(" ");

    // Different background styles
    const getBackgroundClasses = () => {
        switch (backgroundStyle) {
            case "glass":
                return "bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-2xl";
            case "gradient":
                return "bg-gradient-to-br from-white/20 via-white/10 to-transparent dark:from-black/40 dark:via-black/20 dark:to-transparent backdrop-blur-md border border-white/30 dark:border-white/10 shadow-2xl";
            case "solid":
                return "bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-2xl";
            case "glow":
                return "bg-white/5 dark:bg-black/10 backdrop-blur-2xl border border-white/30 dark:border-white/20 shadow-2xl shadow-white/20 dark:shadow-white/10";
            default:
                return "";
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
            {/* Animated gradient orb */}
            {showGradientOrb && (
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
                </motion.div>
            )}

            <div className="absolute inset-0">
                <FloatingPaths position={1} />
            </div>

            {/* Remove all title/subtitle rendering here */}
        </div>
    );
} 
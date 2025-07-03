"use client";

import React, { useRef, useEffect, useState, createElement, useMemo, useCallback, memo } from "react";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

type VaporizeTextCycleProps = {
  texts: string[];
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
};

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  shouldFadeQuickly?: boolean;
};

type TextBoundaries = {
  left: number;
  right: number;
  width: number;
};

declare global {
  interface HTMLCanvasElement {
    textBoundaries?: TextBoundaries;
  }
}

const SeoElement = memo(({ tag = Tag.P, texts }: { tag: Tag, texts: string[] }) => {
  const style = useMemo(() => ({
    position: "absolute" as const,
    width: "0",
    height: "0",
    overflow: "hidden",
    userSelect: "none" as const,
    pointerEvents: "none" as const,
  }), []);
  const safeTag = Object.values(Tag).includes(tag) ? tag : "p";
  return createElement(safeTag, { style }, texts?.join(" ") ?? "");
});

export function Component() {
  return (
    <div className='bg-black h-screen w-screen flex justify-center items-center'>
      <VaporizeTextCycle
        texts={["21st.dev", "Is", "Cool"]}
        font={{
          fontFamily: "Inter, sans-serif",
          fontSize: "70px",
          fontWeight: 600
        }}
        color="rgb(255,255,255)"
        spread={5}
        density={5}
        animation={{
          vaporizeDuration: 2,
          fadeInDuration: 1,
          waitDuration: 0.5
        }}
        direction="left-to-right"
        alignment="center"
        tag={Tag.H1}
      />
    </div>
  );
}

export default function VaporizeTextCycle() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "white";
      ctx.font = "bold 48px sans-serif";
      ctx.fillText("Vapor Test", 50, 100);
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <canvas ref={canvasRef} width={600} height={200} />
    </div>
  );
}

// Helper: Maps a value from one range to another, optionally clamping the result.
function transformValue(input: number, inputRange: number[], outputRange: number[], clamp = false): number {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  const progress = (input - inputMin) / (inputMax - inputMin);
  let result = outputMin + progress * (outputMax - outputMin);
  if (clamp) {
    if (outputMax > outputMin) {
      result = Math.min(Math.max(result, outputMin), outputMax);
    } else {
      result = Math.min(Math.max(result, outputMax), outputMin);
    }
  }
  return result;
}

// Helper: Calculate vaporize spread based on font size
function calculateVaporizeSpread(fontSize: number) {
  const size = typeof fontSize === "string" ? parseInt(fontSize) : fontSize;
  const points = [
    { size: 20, spread: 0.2 },
    { size: 50, spread: 0.5 },
    { size: 100, spread: 1.5 }
  ];
  if (size <= points[0].size) return points[0].spread;
  if (size >= points[points.length - 1].size) return points[points.length - 1].spread;
  let i = 0;
  while (i < points.length - 1 && points[i + 1].size < size) i++;
  const p1 = points[i];
  const p2 = points[i + 1];
  return p1.spread + (size - p1.size) * (p2.spread - p1.spread) / (p2.size - p1.size);
}

// Helper: Update particles for vapor animation
function updateParticles(
  particles: any[],
  vaporizeX: number,
  deltaTime: number,
  MULTIPLIED_VAPORIZE_SPREAD: number,
  VAPORIZE_DURATION: number,
  direction: string,
  density: number
) {
  let allParticlesVaporized = true;
  particles.forEach(particle => {
    const shouldVaporize = direction === "left-to-right"
      ? particle.originalX <= vaporizeX
      : particle.originalX >= vaporizeX;
    if (shouldVaporize) {
      if (particle.speed === 0) {
        particle.angle = Math.random() * Math.PI * 2;
        particle.speed = (Math.random() * 1 + 0.5) * MULTIPLIED_VAPORIZE_SPREAD;
        particle.velocityX = Math.cos(particle.angle) * particle.speed;
        particle.velocityY = Math.sin(particle.angle) * particle.speed;
        particle.shouldFadeQuickly = Math.random() > density;
      }
      if (particle.shouldFadeQuickly) {
        particle.opacity = Math.max(0, particle.opacity - deltaTime);
      } else {
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);
        const dampingFactor = Math.max(0.95, 1 - distanceFromOrigin / (100 * MULTIPLIED_VAPORIZE_SPREAD));
        const randomSpread = MULTIPLIED_VAPORIZE_SPREAD * 3;
        const spreadX = (Math.random() - 0.5) * randomSpread;
        const spreadY = (Math.random() - 0.5) * randomSpread;
        particle.velocityX = (particle.velocityX + spreadX + dx * 0.002) * dampingFactor;
        particle.velocityY = (particle.velocityY + spreadY + dy * 0.002) * dampingFactor;
        const maxVelocity = MULTIPLIED_VAPORIZE_SPREAD * 2;
        const currentVelocity = Math.sqrt(particle.velocityX * particle.velocityX + particle.velocityY * particle.velocityY);
        if (currentVelocity > maxVelocity) {
          const scale = maxVelocity / currentVelocity;
          particle.velocityX *= scale;
          particle.velocityY *= scale;
        }
        particle.x += particle.velocityX * deltaTime * 20;
        particle.y += particle.velocityY * deltaTime * 10;
        const baseFadeRate = 0.25;
        const durationBasedFadeRate = baseFadeRate * (2000 / VAPORIZE_DURATION);
        particle.opacity = Math.max(0, particle.opacity - deltaTime * durationBasedFadeRate);
      }
      if (particle.opacity > 0.01) {
        allParticlesVaporized = false;
      }
    } else {
      allParticlesVaporized = false;
    }
  });
  return allParticlesVaporized;
}

// Helper: Render particles to canvas
function renderParticles(ctx: CanvasRenderingContext2D, particles: any[], globalDpr: number) {
  ctx.save();
  ctx.scale(globalDpr, globalDpr);
  particles.forEach(particle => {
    if (particle.opacity > 0) {
      const color = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
      ctx.fillStyle = color;
      ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
    }
  });
  ctx.restore();
} 
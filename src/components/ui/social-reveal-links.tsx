"use client";

import React from "react";
import { motion } from "framer-motion";

export const SocialRevealLinks = () => {
  return (
    <div className="grid gap-6">
      <FlipLink href="https://twitter.com">Twitter</FlipLink>
      <FlipLink href="https://linkedin.com">Linkedin</FlipLink>
      <FlipLink href="https://facebook.com">Facebook</FlipLink>
      <FlipLink href="https://instagram.com/its_rahul_fu">Instagram</FlipLink>
    </div>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipLinkProps {
  children: string;
  href: string;
}

const FlipLink = ({ children, href }: FlipLinkProps) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden whitespace-nowrap text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white/80 hover:text-white transition-colors"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block text-orange-400"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

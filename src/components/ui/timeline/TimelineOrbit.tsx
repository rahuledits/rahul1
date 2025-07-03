
import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineOrbit() {
  return (
    <motion.div
      className="absolute inset-0 border-2 border-white/20 rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

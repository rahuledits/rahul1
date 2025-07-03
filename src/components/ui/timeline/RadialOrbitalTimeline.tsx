
import React from 'react';
import { motion } from 'framer-motion';
import TimelineCenter from './TimelineCenter';
import TimelineOrbit from './TimelineOrbit';
import { TimelineItem, RadialOrbitalTimelineProps } from './types';
import { calculateNodePosition } from './utils';

const RadialOrbitalTimeline: React.FC<RadialOrbitalTimelineProps> = ({
  timelineData = [],
  centerContent,
  className = ''
}) => {
  return (
    <div className={`relative w-96 h-96 mx-auto ${className}`}>
      {/* Orbit Ring */}
      <TimelineOrbit />
      
      {/* Center Content */}
      <TimelineCenter>
        {centerContent || (
          <motion.div 
            className="text-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="text-2xl font-bold text-white mb-2">Follow</div>
            <div className="text-lg text-gray-300">My Journey</div>
          </motion.div>
        )}
      </TimelineCenter>
      
      {/* Timeline Nodes */}
      {timelineData.map((item, index) => {
        const { x, y } = calculateNodePosition(index, timelineData.length, 192);
        const Icon = item.icon;
        
        return (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px - 20px)`,
              top: `calc(50% + ${y}px - 20px)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: 360
            }}
            transition={{ 
              delay: index * 0.2,
              duration: 0.5,
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            whileHover={{ scale: 1.2 }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-white border-2 border-white/40 transition-all duration-300 ease-out">
              <Icon size={16} />
            </div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider text-white/70 transition-all duration-300 ease-out">
              {item.title}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RadialOrbitalTimeline;

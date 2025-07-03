
import React from 'react';

interface AnimatedGridProps {
  isDarkMode: boolean;
}

const AnimatedGrid = ({ isDarkMode }: AnimatedGridProps) => {
  return (
    <div className="absolute inset-0 opacity-20">
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} 
      />
      
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedGrid;

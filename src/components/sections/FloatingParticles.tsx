
import React from 'react';

interface FloatingParticlesProps {
  isDarkMode: boolean;
}

const FloatingParticles = ({ isDarkMode }: FloatingParticlesProps) => {
  return (
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'} rounded-full opacity-60`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;

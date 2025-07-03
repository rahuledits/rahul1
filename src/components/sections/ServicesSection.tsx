import React from 'react';
import { Sparkles } from 'lucide-react';
import ServiceCard from './ServiceCard';
import FloatingParticles from './FloatingParticles';
import AnimatedGrid from './AnimatedGrid';
import DatabaseWithRestApi from '../ui/database-with-rest-api';
import { serviceData } from './serviceData';
interface ServicesSectionProps {
  isDarkMode: boolean;
}
const ServicesSection = ({
  isDarkMode
}: ServicesSectionProps) => {
  return <section id="services" className="py-32 relative overflow-hidden">
      {/* Creative Background Layers */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/30' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50'}`} />
        <AnimatedGrid isDarkMode={isDarkMode} />
        <FloatingParticles isDarkMode={isDarkMode} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Creative Header */}
        <div className="text-center mb-24 animate-fade-in">
          <div className="relative inline-block mb-8">
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${isDarkMode ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' : 'bg-blue-500/10 border-blue-500/30 text-blue-600'} text-sm font-semibold backdrop-blur-sm`}>
              <Sparkles className="w-4 h-4" />
              CREATIVE STUDIO
            </div>
          </div>
          
          <h2 className={`text-6xl md:text-7xl font-black mb-8 ${isDarkMode ? 'text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400' : 'text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600'} bg-clip-text leading-tight`}>
            What We Create
          </h2>
          
          <p className={`text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-4xl mx-auto leading-relaxed font-light`}>
            Stunning video experiences crafted with cutting-edge technology, creative vision, and innovative storytelling techniques
          </p>
        </div>

        {/* Creative Showcase Section */}
        <div className="mb-20 flex justify-center">
          <div className="relative group">
            {/* Enhanced glowing border effect */}
            <div className="absolute -inset-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl animate-pulse" />
            
            <div className={`relative p-10 rounded-2xl ${isDarkMode ? 'bg-gray-900/60 border-gray-700/40' : 'bg-white/60 border-gray-200/40'} backdrop-blur-xl border-2 transition-all duration-700 hover:scale-105 shadow-2xl hover:shadow-purple-500/25`}>
              <DatabaseWithRestApi title="Creative Video Processing Engine" circleText="VFX" badgeTexts={{
              first: "COLOR",
              second: "MOTION",
              third: "EFFECTS",
              fourth: "COMPOSITE"
            }} buttonTexts={{
              first: "CreativeStudio",
              second: "v4_premium"
            }} lightColor={isDarkMode ? "#FF6B9D" : "#EC4899"} className="hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </div>
        
        {/* Creative Services Grid */}
        

        {/* Enhanced Feature Showcase */}
        <div className="text-center mb-16">
          
        </div>

        {/* Creative Bottom CTA */}
        <div className="text-center mt-20">
          <div className="relative inline-block group">
            {/* Multi-layer glow effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full opacity-20 group-hover:opacity-50 transition-opacity duration-700 blur-2xl animate-pulse" />
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-xl" />
            
            <button className={`relative px-20 py-10 text-2xl font-bold rounded-full overflow-hidden ${isDarkMode ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500' : 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500'} text-white border-0 transform hover:scale-110 transition-all duration-700 shadow-2xl hover:shadow-pink-500/30 group`}>
              <span className="relative z-10 flex items-center justify-center gap-4">
                <Sparkles className="w-8 h-8 animate-pulse" />
                Begin Your Creative Story
                <span className="text-3xl animate-bounce">✨</span>
              </span>
              
              {/* Enhanced shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -skew-x-12 group-hover:animate-pulse" />
              
              {/* Floating sparkles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {[...Array(16)].map((_, i) => <div key={i} className="absolute w-2 h-2 bg-white rounded-full animate-ping" style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }} />)}
              </div>
            </button>
          </div>
          
          {/* Creative tagline */}
          <p className={`mt-8 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light italic`}>
            "Where imagination meets innovation"
          </p>
        </div>
      </div>
    </section>;
};
export default ServicesSection;
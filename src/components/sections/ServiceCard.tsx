import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface ServiceCardProps {
  service: any;
  index: number;
  isDarkMode: boolean;
}
const ServiceCard = ({
  service,
  index,
  isDarkMode
}: ServiceCardProps) => {
  const IconComponent = service.icon;
  return <div className="group animate-fade-in relative" style={{
    animationDelay: `${index * 0.3}s`
  }}>
      {/* Holographic Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <Card className={`relative ${isDarkMode ? 'bg-gray-900/40 border-gray-700/50' : 'bg-white/60 border-gray-200/50'} backdrop-blur-xl transition-all duration-700 h-full overflow-hidden rounded-3xl border-2 group-hover:scale-[1.02] group-hover:shadow-2xl`}>
        {/* Creative Background with Parallax */}
        

        
      </Card>
    </div>;
};
export default ServiceCard;
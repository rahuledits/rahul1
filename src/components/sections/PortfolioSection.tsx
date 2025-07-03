import React from 'react';
import DisplayCards from "@/components/ui/display-cards";
import { Film, Edit, Camera, Video, Play } from 'lucide-react';

const PortfolioSection = () => {
  const portfolioCards = [
    {
      icon: <Film className="size-4 text-orange-300" />,
      title: "Ethereal Love Story",
      description: "Cinematic wedding storytelling",
      date: "Latest",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500",
      backgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Edit className="size-4 text-orange-300" />,
      title: "Urban Rhythms",
      description: "Dynamic music video with beat sync",
      date: "This week",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500",
      backgroundImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
      className: "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Camera className="size-4 text-orange-300" />,
      title: "Car Edit",
      description: "High-octane car edit with cinematic transitions and dynamic sound design.",
      date: "Featured",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500",
      backgroundImage: undefined,
      video: "/video/car.mp4",
      className: "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-8",
    },
    {
      icon: <Video className="size-4 text-orange-300" />,
      title: "Midnight Dreams",
      description: "Psychological thriller short film",
      date: "Popular",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500",
      backgroundImage: "https://images.unsplash.com/photo-1489599735036-ad5877043088?w=800&h=450&fit=crop",
      className: "[grid-area:stack] translate-x-36 translate-y-24 hover:translate-y-12",
    },
    {
      icon: <Play className="size-4 text-orange-300" />,
      title: "Golden Hour",
      description: "Romantic indie music video",
      date: "Award Winner",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500",
      backgroundImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=450&fit=crop",
      className: "[grid-area:stack] translate-x-48 translate-y-32 hover:translate-y-20",
    },
  ];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            My Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of my latest video editing projects across various genres and styles
          </p>
        </div>
        
        <div className="flex justify-center mb-12 overflow-hidden">
          <div className="w-full max-w-5xl">
            <DisplayCards cards={portfolioCards} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

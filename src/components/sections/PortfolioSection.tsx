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
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
    },
    {
      icon: <Edit className="size-4 text-orange-300" />,
      title: "Urban Rhythms",
      description: "Dynamic music video with beat sync",
      date: "This week",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500",
      backgroundImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
      className: "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
    },
    {
      icon: <Camera className="size-4 text-orange-300" />,
      title: "Car Edit",
      description: "High-octane car edit with cinematic transitions and dynamic sound design.",
      date: "Featured",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500",
      backgroundImage: "/video/car-thumb.jpg",
      video: "/video/car.mp4",
      className: "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-8"
    },
    {
      icon: <Video className="size-4 text-orange-300" />,
      title: "The Box (Basketball Edit)",
      description: "High-energy basketball highlight edit featuring dynamic plays, fast cuts, and electrifying moments from the court.",
      date: "Popular",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500",
      backgroundImage: "/video/basketball-thumb.jpg",
      video: "/video/basket.mp4",
      className: "[grid-area:stack] translate-x-36 translate-y-24 hover:translate-y-12"
    },
    {
      icon: <Play className="size-4 text-orange-300" />,
      title: "3D Animation",
      description: "A visually stunning 3D animation project showcasing advanced motion graphics and creative storytelling.",
      date: "Award Winner",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500",
      backgroundImage: "/video/3d-thumb.jpg",
      video: "/video/3d.mp4",
      className: "[grid-area:stack] translate-x-48 translate-y-32 hover:translate-y-20"
    },
    {
      icon: <Play className="size-4 text-orange-300" />,
      title: "Sound Design",
      description: "Immersive sound design project featuring creative audio effects, mixing, and original compositions for a cinematic experience.",
      date: "New",
      iconClassName: "text-orange-500",
      titleClassName: "text-orange-500",
      backgroundImage: "/video/sound-thumb.jpg",
      video: "/video/audio.mp4",
      className: "[grid-area:stack] translate-x-60 translate-y-40 hover:translate-y-28"
    }
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

import React, { useState, useEffect } from 'react';
import DisplayCards from "@/components/ui/display-cards";
import { Film, Edit, Camera, Video, Play, Sparkles } from 'lucide-react';
import { portfolioApi, PortfolioItem } from '@/services/api';

const PortfolioSection = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await portfolioApi.getAll();
        if (response.success && response.data) {
          setPortfolioItems(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch portfolio:', err);
        setError('Failed to load portfolio items');
        // Fallback to default data if API fails
        setPortfolioItems(getDefaultPortfolioData());
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const getDefaultPortfolioData = () => [
    {
      id: 1,
      title: "Ethereal Love Story",
      description: "Cinematic wedding storytelling",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop",
      category: "cinematic",
      technologies: ["Premiere Pro", "After Effects"],
      featured: true,
      order: 1
    },
    {
      id: 2,
      title: "Urban Rhythms",
      description: "Dynamic music video with beat sync",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
      category: "music",
      technologies: ["Premiere Pro", "DaVinci Resolve"],
      featured: true,
      order: 2
    },
    {
      id: 3,
      title: "Car Edit",
      description: "High-octane car edit with cinematic transitions and dynamic sound design.",
      image: "/video/car-thumb.jpg",
      video: "/video/car.mp4",
      category: "automotive",
      technologies: ["Premiere Pro", "After Effects"],
      featured: true,
      order: 3
    },
    {
      id: 4,
      title: "The Box (Basketball Edit)",
      description: "High-energy basketball highlight edit featuring dynamic plays, fast cuts, and electrifying moments from the court.",
      image: "/video/basketball-thumb.jpg",
      video: "/video/basket.mp4",
      category: "sports",
      technologies: ["Premiere Pro", "After Effects"],
      featured: true,
      order: 4
    },
    {
      id: 5,
      title: "3D Animation",
      description: "A visually stunning 3D animation project showcasing advanced motion graphics and creative storytelling.",
      image: "/video/3d-thumb.jpg",
      video: "/video/3d.mp4",
      category: "animation",
      technologies: ["Blender", "After Effects"],
      featured: true,
      order: 5
    },
    {
      id: 6,
      title: "Sound Design",
      description: "Immersive sound design project featuring creative audio effects, mixing, and original compositions for a cinematic experience.",
      image: "/video/sound-thumb.jpg",
      video: "/video/audio.mp4",
      category: "audio",
      technologies: ["Pro Tools", "Logic Pro"],
      featured: true,
      order: 6
    }
  ];

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'cinematic':
        return <Film className="size-4 text-orange-300" />;
      case 'music':
        return <Edit className="size-4 text-orange-300" />;
      case 'automotive':
        return <Camera className="size-4 text-orange-300" />;
      case 'sports':
        return <Video className="size-4 text-orange-300" />;
      case 'animation':
        return <Play className="size-4 text-orange-300" />;
      case 'audio':
        return <Play className="size-4 text-orange-300" />;
      default:
        return <Sparkles className="size-4 text-orange-300" />;
    }
  };

  const getStatusText = (order: number) => {
    switch (order) {
      case 1: return "Latest";
      case 2: return "This week";
      case 3: return "Featured";
      case 4: return "Popular";
      case 5: return "Award Winner";
      case 6: return "New";
      default: return "Project";
    }
  };

  const portfolioCards = portfolioItems.map((item, index) => ({
    icon: getIconForCategory(item.category),
    title: item.title,
    description: item.description,
    date: getStatusText(item.order),
    iconClassName: "text-orange-500",
    titleClassName: "text-orange-500",
    backgroundImage: item.image,
    video: item.video,
    className: `[grid-area:stack] ${
      index === 0 ? 'hover:-translate-y-10' :
      index === 1 ? 'translate-x-12 translate-y-8 hover:-translate-y-1' :
      index === 2 ? 'translate-x-24 translate-y-16 hover:translate-y-8' :
      index === 3 ? 'translate-x-36 translate-y-24 hover:translate-y-12' :
      index === 4 ? 'translate-x-48 translate-y-32 hover:translate-y-20' :
      'translate-x-60 translate-y-40 hover:translate-y-28'
    } before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0`
  }));

  if (loading) {
    return (
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              My Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Loading portfolio...
            </p>
          </div>
        </div>
      </section>
    );
  }

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
          {error && (
            <p className="text-red-400 text-sm mt-2">
              {error} (Showing cached data)
            </p>
          )}
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

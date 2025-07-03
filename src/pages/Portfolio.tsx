import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SparklesCore } from "@/components/ui/sparkles";
import Navigation from "@/components/navigation/Navigation";

const Portfolio = ({ isDark, onThemeToggle }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Music Videos', 'Reels & Shorts', 'Weddings', 'Short Films'];
  
  const projects = [
    {
      id: 1,
      title: "Ethereal Love Story",
      category: "Weddings",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop",
      duration: "3:45",
      date: "Dec 2024",
      description: "A cinematic wedding film capturing the magical moments of Sarah & John's special day.",
      tags: ["Cinematic", "Emotional", "4K"],
      views: "12.5K"
    },
    {
      id: 2,
      title: "Urban Rhythms",
      category: "Music Videos",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
      duration: "4:12",
      date: "Nov 2024",
      description: "High-energy music video with dynamic cuts and vibrant color grading.",
      tags: ["Fast-paced", "Colorful", "Urban"],
      views: "25.8K"
    },
    {
      id: 3,
      title: "Car Edit",
      category: "Reels & Shorts",
      thumbnail: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=450&fit=crop",
      duration: "1:30",
      date: "Oct 2024",
      description: "High-octane car edit with cinematic transitions and dynamic sound design.",
      tags: ["Professional", "Clean", "Modern"],
      views: "8.3K"
    },
    {
      id: 4,
      title: "Midnight Dreams",
      category: "Short Films",
      thumbnail: "https://images.unsplash.com/photo-1489599735036-ad5877043088?w=800&h=450&fit=crop",
      duration: "8:22",
      date: "Sep 2024",
      description: "A psychological thriller exploring the boundaries between dreams and reality.",
      tags: ["Thriller", "Atmospheric", "Suspense"],
      views: "18.7K"
    },
    {
      id: 5,
      title: "Golden Hour",
      category: "Music Videos",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=450&fit=crop",
      duration: "3:28",
      date: "Aug 2024",
      description: "Romantic indie music video shot during golden hour with natural lighting.",
      tags: ["Natural", "Romantic", "Indie"],
      views: "31.2K"
    },
    {
      id: 6,
      title: "Tech Innovation",
      category: "Reels & Shorts",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
      duration: "2:15",
      date: "Jul 2024",
      description: "Product launch video featuring cutting-edge technology and sleek design.",
      tags: ["Tech", "Sleek", "Futuristic"],
      views: "15.4K"
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const [videoMap, setVideoMap] = useState({});
  useEffect(() => {
    let isMounted = true;
    const checkVideos = async () => {
      const entries = await Promise.all(projects.map(async (project) => {
        const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const videoSrc = `/video/${slug}.mp4`;
        try {
          const res = await fetch(videoSrc, { method: 'HEAD' });
          return [project.id, res.ok];
        } catch {
          return [project.id, false];
        }
      }));
      if (isMounted) {
        setVideoMap(Object.fromEntries(entries));
      }
    };
    checkVideos();
    return () => { isMounted = false; };
  }, [projects]);

  return (
    <>
      <Navigation isDark={isDark} onThemeToggle={onThemeToggle} />
      <div className="min-h-screen relative overflow-hidden dark">
        {/* Animated gradient orb background */}
        <motion.div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-0 pointer-events-none"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.14) 60%, rgba(236,72,153,0.10) 100%)", filter: "blur(80px)" }}
        />
        {/* Sparkles (now above orb) */}
        <div className="fixed inset-0 pointer-events-none z-10">
          <SparklesCore background="transparent" minSize={0.1} maxSize={0.4} particleDensity={30} className="w-full h-full" particleColor="#8b5cf6" speed={0.5} />
        </div>
        <div className="relative z-20 container mx-auto px-6 py-20">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              My Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A curated collection of my best video editing and cinematography work, 
              showcasing diverse styles and creative approaches across various genres.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category 
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 border-0" 
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                } transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => {
              const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              const videoSrc = `/video/${slug}.mp4`;
              const videoExists = videoMap[project.id];
              return (
              <motion.div
                key={project.id}
                className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                layout
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                    {videoExists ? (
                      <div className="relative mb-2">
                        <video 
                          src={videoSrc}
                          controls
                          poster={project.thumbnail}
                          className="w-full h-48 object-cover rounded-xl border-2 border-cyan-400 shadow-[0_0_24px_2px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_48px_8px_rgba(236,72,153,0.7)] group-hover:scale-105 transition-all duration-500 bg-black"
                          style={{ boxShadow: '0 0 24px 2px #22d3ee80' }}
                        />
                        <div className="absolute inset-0 pointer-events-none rounded-xl border-2 border-pink-500/60 group-hover:border-cyan-400/80 group-hover:shadow-[0_0_32px_8px_rgba(236,72,153,0.7)] transition-all duration-500" />
                      </div>
                    ) : (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 rounded-xl"
                      />
                    )}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                    {project.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      {project.category}
                    </Badge>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Eye className="w-4 h-4 mr-1" />
                      {project.views}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.date}
                  </div>
                </div>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;

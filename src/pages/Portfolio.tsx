import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Calendar, Tag, X, Maximize2 } from 'lucide-react';
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
      thumbnail: "/video/car-thumb.jpg",
      duration: "1:30",
      date: "Oct 2024",
      description: "High-octane car edit with cinematic transitions and dynamic sound design.",
      tags: ["Professional", "Clean", "Modern"],
      views: "8.3K",
      video: "/video/car.mp4"
    },
    {
      id: 4,
      title: "The Box (Basketball Edit)",
      category: "Sports Edit",
      thumbnail: "/video/basketball-thumb.jpg",
      duration: "2:10",
      date: "Jul 2024",
      description: "High-energy basketball highlight edit featuring dynamic plays, fast cuts, and electrifying moments from the court.",
      tags: ["Basketball", "Sports", "Highlights", "Dynamic", "Energetic"],
      views: "18.7K",
      video: "/video/basket.mp4"
    },
    {
      id: 5,
      title: "3D Animation",
      category: "Animated Video",
      thumbnail: "/video/3d-thumb.jpg",
      duration: "3:28",
      date: "Aug 2024",
      description: "A visually stunning 3D animation project showcasing advanced motion graphics and creative storytelling.",
      tags: ["3D", "Animation", "Motion Graphics", "Creative"],
      views: "31.2K",
      video: "/video/3d.mp4"
    },
    {
      id: 6,
      title: "Sound Design",
      category: "Audio Edit",
      thumbnail: "/video/sound-thumb.jpg",
      duration: "1:45",
      date: "Jun 2024",
      description: "Immersive sound design project featuring creative audio effects, mixing, and original compositions for a cinematic experience.",
      tags: ["Sound", "Audio", "Mixing", "Effects", "Cinematic"],
      views: "15.4K",
      video: "/video/audio.mp4"
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
        const videoSrc = project.video || `/video/${slug}.mp4`;
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

  const [modalVideo, setModalVideo] = useState(null);

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
              const videoSrc = project.video || `/video/${slug}.mp4`;
              const videoExists = project.video ? true : videoMap[project.id];
              const videoRef = useRef(null);
              return (
              <motion.div
                key={project.id}
                className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                layout
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500 rounded-xl"
                  />
                  {videoExists && (
                    <button
                      className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-20 transition-colors flex items-center justify-center"
                      onClick={() => setModalVideo(videoSrc)}
                      type="button"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  )}
                  <div className="absolute inset-0 pointer-events-none rounded-xl border-2 border-pink-500/60 group-hover:border-cyan-400/80 group-hover:shadow-[0_0_32px_8px_rgba(236,72,153,0.7)] transition-all duration-500" />
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
      {/* Modal for video zoom */}
      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl mx-auto p-4">
            <button
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 z-50"
              onClick={() => setModalVideo(null)}
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
            <video
              src={modalVideo}
              controls
              autoPlay
              className="w-full max-h-[80vh] rounded-xl border-2 border-cyan-400 bg-black shadow-2xl"
              style={{ boxShadow: '0 0 32px 8px #22d3ee80' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;

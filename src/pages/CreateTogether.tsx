import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, Lightbulb, Camera, Video, ArrowLeft, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Component as InfinityBrand } from "@/components/ui/infinity-brand";
import { SparklesCore } from "@/components/ui/sparkles";
import { Link } from 'react-router-dom';
import Navigation from "@/components/navigation/Navigation";

const CreateTogether = ({ isDark, onThemeToggle }) => {
  return (
    <>
      <Navigation isDark={isDark} onThemeToggle={onThemeToggle} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <motion.div
              className="inline-block bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-orange-300 font-medium">✨ Collaborative Video Production</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's Create
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                Together
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your vision into compelling visual stories. Whether it's a brand video, 
              reels & shorts, or creative project, let's bring your ideas to life with cinematic excellence.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/#contact">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 text-lg"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-orange-500/50 text-orange-300 hover:bg-orange-500/10 px-8 py-4 text-lg"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Showreel
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">What We Create Together</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                From concept to completion, every project is a collaborative journey
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {/* Video Production */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Video className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Video Production</h3>
                <p className="text-gray-300 mb-6">
                  From concept to completion, we create engaging videos that tell your story and connect with your audience.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Brand Videos & Reels & Shorts</li>
                  <li>• Music Videos & Promos</li>
                  <li>• Event & Wedding Coverage</li>
                  <li>• Product Showcases</li>
                </ul>
              </motion.div>

              {/* Creative Direction */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Creative Direction</h3>
                <p className="text-gray-300 mb-6">
                  Strategic creative guidance to ensure your project has maximum impact and aligns perfectly with your vision.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Concept Development</li>
                  <li>• Visual Storytelling</li>
                  <li>• Brand Strategy</li>
                  <li>• Creative Consulting</li>
                </ul>
              </motion.div>

              {/* Photography */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-green-500/50 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Photography</h3>
                <p className="text-gray-300 mb-6">
                  Capturing moments and creating stunning visuals that complement your video content and brand identity.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Portrait Photography</li>
                  <li>• Product Photography</li>
                  <li>• Event Photography</li>
                  <li>• Behind-the-Scenes</li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Collaboration Process */}
            <motion.div 
              className="mt-24 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Our Creative Process
              </h2>
              <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
                Every great project starts with collaboration and ends with extraordinary results
              </p>
              
              <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                  { step: "01", title: "Discovery", desc: "Understanding your vision and goals", icon: <Lightbulb className="w-6 h-6" /> },
                  { step: "02", title: "Concept", desc: "Developing creative ideas and strategy", icon: <Star className="w-6 h-6" /> },
                  { step: "03", title: "Production", desc: "Bringing the vision to life", icon: <Video className="w-6 h-6" /> },
                  { step: "04", title: "Delivery", desc: "Final polish and project completion", icon: <Sparkles className="w-6 h-6" /> }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="text-center group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-lg rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="text-orange-400 font-bold text-sm mb-2">{item.step}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action with Sparkles */}
            <motion.div 
              className="mt-24 text-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-900/20 via-orange-800/10 to-orange-700/20 border border-orange-500/20 p-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              {/* Sparkles for CTA box */}
              <div className="absolute inset-0">
                <SparklesCore 
                  background="transparent" 
                  minSize={0.3} 
                  maxSize={0.9} 
                  particleDensity={100} 
                  className="w-full h-full" 
                  particleColor="#fb923c" 
                  speed={1.8} 
                />
              </div>
              
              <div className="relative z-10">
                <Users className="w-16 h-16 text-orange-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Create Something Amazing?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Let's collaborate to bring your creative vision to life. Every great project starts with a conversation.
                </p>
                <Link to="/#contact">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-4 text-lg"
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Infinite Logo Animation */}
        <InfinityBrand />
      </div>
    </>
  );
};

export default CreateTogether;

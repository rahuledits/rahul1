import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "@/components/navigation/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import { Component as InfinityBrand } from "@/components/ui/infinity-brand";
import { Footerdemo } from "@/components/ui/footer-section";
import { SparklesCore } from "@/components/ui/sparkles";
import { CreativePricing } from "@/components/ui/creative-pricing";
import type { PricingTier } from "@/components/ui/creative-pricing";
import { Pencil, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Index = ({ isDark, onThemeToggle }) => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Basic Edit",
      icon: <Pencil className="w-6 h-6" />,
      price: 9,
      description: "Perfect for simple video projects",
      color: "amber",
      features: [
        "Basic Video Editing",
        "Color Correction",
        "Audio Enhancement",
        "2-3 Day Delivery",
      ],
    },
    {
      name: "Professional",
      icon: <Star className="w-6 h-6" />,
      price: 29,
      description: "For advanced video productions",
      color: "blue",
      features: [
        "Advanced Editing",
        "Motion Graphics",
        "Sound Design",
        "Same Day Delivery",
      ],
      popular: true,
    },
    {
      name: "Cinematic",
      icon: <Sparkles className="w-6 h-6" />,
      price: 49,
      description: "For cinematic masterpieces",
      color: "purple",
      features: [
        "Full Post-Production",
        "Visual Effects",
        "Custom Graphics",
        "Personal Consultation",
      ],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Site-wide animated gradient orb background (no infinite lines) */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-0 pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.14) 60%, rgba(236,72,153,0.10) 100%)",
          filter: "blur(80px)"
        }}
      />
      {/* Site-wide background sparkles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <SparklesCore 
          background="transparent" 
          minSize={0.1} 
          maxSize={0.4} 
          particleDensity={30} 
          className="w-full h-full" 
          particleColor={isDark ? "#8b5cf6" : "#f97316"} 
          speed={0.5} 
        />
      </div>
      
      {/* Navigation with sparkles */}
      <div className="relative z-20">
        <Navigation 
          isDark={isDark} 
          onThemeToggle={onThemeToggle} 
        />
      </div>
      
      {/* Hero Section with sparkles */}
      <div className="relative">
        <div className="absolute inset-0 z-5">
          <SparklesCore 
            background="transparent" 
            minSize={0.3} 
            maxSize={0.8} 
            particleDensity={80} 
            className="w-full h-full" 
            particleColor={isDark ? "#fb923c" : "#ea580c"} 
            speed={1.2} 
          />
        </div>
        <div className="relative z-10">
          <HeroSection isDarkMode={isDark} />
        </div>
      </div>
      
      {/* Stats Section with sparkles */}
      <div className="relative">
        <div className="absolute inset-0">
          <SparklesCore 
            background="transparent" 
            minSize={0.2} 
            maxSize={0.6} 
            particleDensity={60} 
            className="w-full h-full" 
            particleColor={isDark ? "#60a5fa" : "#3b82f6"} 
            speed={1} 
          />
        </div>
        <div className="relative z-10">
          <StatsSection />
        </div>
      </div>
      
      {/* Portfolio Section with sparkles */}
      <div className="relative">
        <div className="absolute inset-0">
          <SparklesCore 
            background="transparent" 
            minSize={0.2} 
            maxSize={0.7} 
            particleDensity={70} 
            className="w-full h-full" 
            particleColor={isDark ? "#a78bfa" : "#8b5cf6"} 
            speed={1.3} 
          />
        </div>
        <div className="relative z-10">
          <PortfolioSection />
          <div className="text-center mt-8 pb-8">
            <Link to="/portfolio">
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                View All Projects
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Services Section with sparkles */}
      <div className="relative">
        <div className="absolute inset-0">
          <SparklesCore 
            background="transparent" 
            minSize={0.3} 
            maxSize={0.9} 
            particleDensity={90} 
            className="w-full h-full" 
            particleColor={isDark ? "#fb923c" : "#ea580c"} 
            speed={1.5} 
          />
        </div>
        <div className="relative z-10">
          <ServicesSection isDarkMode={isDark} />
        </div>
      </div>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <div className="absolute inset-0">
          <SparklesCore 
            background="transparent" 
            minSize={0.2} 
            maxSize={0.8} 
            particleDensity={75} 
            className="w-full h-full" 
            particleColor={isDark ? "#fbbf24" : "#f59e0b"} 
            speed={1.2} 
          />
        </div>
        <div className="relative z-10">
          <CreativePricing 
            tag="Investment Plans"
            title="Video Editing Services"
            description="Professional video editing tailored to your needs"
            tiers={pricingTiers}
          />
          <div className="text-center mt-8">
            <Link to="/services">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Section with sparkles */}
      <div className="relative z-10">
        <ContactSection isDarkMode={isDark} pricingTiers={pricingTiers} />
      </div>
      
      {/* Infinity Brand with sparkles */}
      <div className="relative">
        <div className="absolute inset-0">
          <SparklesCore 
            background="transparent" 
            minSize={0.4} 
            maxSize={1.0} 
            particleDensity={50} 
            className="w-full h-full" 
            particleColor={isDark ? "#ec4899" : "#db2777"} 
            speed={2} 
          />
        </div>
        <div className="relative z-10">
          <InfinityBrand />
        </div>
      </div>
      
      {/* Footer */}
      <div className="relative z-10">
        <Footerdemo isDarkMode={isDark} onThemeToggle={onThemeToggle} />
      </div>
    </div>
  );
};

export default Index;

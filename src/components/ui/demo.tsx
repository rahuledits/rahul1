
import { LimelightNav, NavItem } from "@/components/ui/limelight-nav";
import { Home, Bookmark, PlusCircle, User, Settings, Calendar, Code, FileText, Clock, Sun, Moon } from 'lucide-react';
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CreativePricing } from "@/components/ui/creative-pricing"
import type { PricingTier } from "@/components/ui/creative-pricing"
import { Check, Pencil, Star, Sparkles } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { MagnetizeButton } from "@/components/ui/magnetize-button"

const customNavItems = [
  { id: 'home', icon: <Home />, label: 'Home', onClick: () => console.log('Home Clicked!') },
  { id: 'bookmark', icon: <Bookmark />, label: 'Bookmarks', onClick: () => console.log('Bookmark Clicked!') },
  { id: 'add', icon: <PlusCircle />, label: 'Add New', onClick: () => console.log('Add Clicked!') },
  { id: 'profile', icon: <User />, label: 'Profile', onClick: () => console.log('Profile Clicked!') },
  { id: 'settings', icon: <Settings />, label: 'Settings', onClick: () => console.log('Settings Clicked!') },
];

const Customized = () => {
  return <LimelightNav className="bg-secondary dark:bg-card/50 dark:border-accent/50 rounded-xl" items={customNavItems} />;
};

export { Customized };

const Default = () => {
  return <LimelightNav />;
};

export { Default };

function DefaultToggle() {
  return (
    <div className="space-y-2 text-center">
      <div className="flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  )
}

export { DefaultToggle }

const sampleTiers: PricingTier[] = [
    {
        name: "Creator",
        icon: <Pencil className="w-6 h-6" />,
        price: 29,
        description: "Perfect for short video beginners",
        color: "amber",
        features: [
            "60-second Video Export",
            "10 Trending Templates",
            "Auto Text-to-Speech",
            "Basic Transitions",
        ],
    },
    {
        name: "Influencer",
        icon: <Star className="w-6 h-6" />,
        price: 79,
        description: "For serious content creators",
        color: "blue",
        features: [
            "3-minute Video Export",
            "Voice Effects & Filters",
            "Trending Sound Library",
            "Auto Captions & Subtitles",
        ],
        popular: true,
    },
    {
        name: "Pro Studio",
        icon: <Sparkles className="w-6 h-6" />,
        price: 149,
        description: "For viral content masters",
        color: "purple",
        features: [
            "Multi-clip Editing",
            "Green Screen Effects",
            "Viral Sound Detection",
            "Engagement Analytics",
        ],
    },
];

function CreativePricingDemo() {
    return <CreativePricing tiers={sampleTiers} />
}

export { CreativePricingDemo }

// Timeline data for RadialOrbitalTimeline
const timelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <>
      <RadialOrbitalTimeline timelineData={timelineData} />
    </>
  );
}

function MagnetizeButtonDemo() {
    return <MagnetizeButton particleCount={14} attractRadius={50} />
}

export { MagnetizeButtonDemo }

"use client";

import { useState, useEffect } from "react";
import { RevealLinks } from "@/components/ui/reveal-links";

const DemoRevealLinks = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex h-screen w-full justify-center items-center bg-white dark:bg-black relative overflow-auto">
      <RevealLinks />

      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export { DemoRevealLinks };

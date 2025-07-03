"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SparklesCore } from "@/components/ui/sparkles";
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react";
interface FooterdemoProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}
function Footerdemo({
  isDarkMode,
  onThemeToggle
}: FooterdemoProps) {
  return <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-900/20 via-orange-800/10 to-orange-700/20 border border-orange-500/20 p-6">
            {/* Sparkles for Stay Connected box */}
            <div className="absolute inset-0">
              <SparklesCore background="transparent" minSize={0.3} maxSize={0.8} particleDensity={80} className="w-full h-full" particleColor={isDarkMode ? "#fb923c" : "#ea580c"} speed={1.5} />
            </div>
            
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
              <p className="mb-6 text-muted-foreground">
                Join our newsletter for the latest updates and exclusive offers.
              </p>
              <form className="relative">
                <Input type="email" placeholder="Enter your email" className="pr-12 backdrop-blur-sm" />
                <Button type="submit" size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </form>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="#home" className="block transition-colors hover:text-primary">
                Home
              </a>
              <a href="#portfolio" className="block transition-colors hover:text-primary">
                My Works
              </a>
              <a href="#services" className="block transition-colors hover:text-primary">
                Services
              </a>
              <a href="#testimonials" className="block transition-colors hover:text-primary">
                Testimonials
              </a>
              <a href="#contact" className="block transition-colors hover:text-primary">
                Contact
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Me</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>Mumbai, India</p>
              <p>NIT Nagpur Student</p>
              <p>Video Editor & Cinematographer</p>
              <p>Email: jirahulmeena@gmail.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Me</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full" asChild>
                      <a href="https://instagram.com/its_rahul_fu" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow me on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with me on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Rahul Meena. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
          </nav>
        </div>
        
        {/* Theme Toggle */}
        
        
        {/* Sparkles Animation at bottom with increased quantity */}
        <div className="w-full h-20 relative mt-6">
          <SparklesCore background="transparent" minSize={0.4} maxSize={1.2} particleDensity={200} className="w-full h-full" particleColor={isDarkMode ? "#fb923c" : "#ea580c"} speed={2} />
        </div>
      </div>
    </footer>;
}
export { Footerdemo };
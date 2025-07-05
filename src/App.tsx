import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import CreateTogether from "./pages/CreateTogether";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/AdminDashboard";
import { Interactive3DBackground } from '@/components/ui/interactive-3d-background';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { TypingEffect } from '@/components/ui/typing-effect';

const queryClient = new QueryClient();

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const handleThemeToggle = () => setIsDark((prev) => !prev);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FloatingActionButton />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index isDark={isDark} onThemeToggle={handleThemeToggle} />} />
            <Route path="/about" element={<About isDark={isDark} onThemeToggle={handleThemeToggle} />} />
            <Route path="/portfolio" element={<Portfolio isDark={isDark} onThemeToggle={handleThemeToggle} />} />
            <Route path="/services" element={<Services isDark={isDark} onThemeToggle={handleThemeToggle} />} />
            <Route path="/create-together" element={<CreateTogether isDark={isDark} onThemeToggle={handleThemeToggle} />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound isDark={isDark} onThemeToggle={handleThemeToggle} />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

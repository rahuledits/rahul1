import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { AnimatedInput } from '@/components/ui/animated-input';
import { Textarea } from '@/components/ui/textarea';
import { MagnetizeButton } from '@/components/ui/magnetize-button';
import { SparklesCore } from "@/components/ui/sparkles";
import { SocialRevealLinks } from "@/components/ui/social-reveal-links";
import { contactApi } from '@/services/api';

interface ContactSectionProps {
  isDarkMode: boolean;
  pricingTiers: { name: string; price: number; description: string }[];
}

const ContactSection = ({
  isDarkMode,
  pricingTiers
}: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
    selectedPlan: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.selectedPlan) return; // Require plan selection
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare the message content
      const fullMessage = `Project Type: ${formData.projectType}\nSelected Plan: ${formData.selectedPlan}\n\nMessage:\n${formData.message}`;
      
      // Send to backend API
      const response = await contactApi.send({
        name: formData.name,
        email: formData.email,
        subject: `New Project Inquiry - ${formData.selectedPlan}`,
        message: fullMessage
      });

      if (response.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          projectType: '',
          message: '',
          selectedPlan: ''
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error(response.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Sparkles */}
      <div className="absolute inset-0">
        <SparklesCore background="transparent" minSize={0.2} maxSize={0.6} particleDensity={60} className="w-full h-full" particleColor={isDarkMode ? "#fb923c" : "#ea580c"} speed={1} />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-2 mb-6">
            <span className="text-orange-300 font-medium">Ready to Start?</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Let's Create Magic
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your vision into stunning visuals. Whether it's reels & shorts, music video, or personal project, 
            let's bring your story to life with cinematic excellence.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Social Links Section */}
          <motion.div className="relative" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="bg-gradient-to-br from-slate-800/20 to-purple-800/10 backdrop-blur-sm rounded-2xl p-16 bg-transparent">
              <SocialRevealLinks />
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.div className="relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 relative overflow-hidden">
              {/* Form Sparkles */}
              <div className="absolute inset-0 opacity-30">
                <SparklesCore background="transparent" minSize={0.3} maxSize={0.8} particleDensity={60} className="w-full h-full" particleColor="#fb923c" speed={1.5} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-8">Start Your Project</h3>
                {/* Pricing Plan Selection */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Select a Plan *</label>
                  <div className="flex flex-col gap-4">
                    {pricingTiers.map((tier) => (
                      <label key={tier.name} className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${formData.selectedPlan === tier.name ? 'border-amber-400 bg-amber-100/10' : 'border-white/20 bg-white/5'}`}>
                        <input
                          type="radio"
                          name="selectedPlan"
                          value={tier.name}
                          checked={formData.selectedPlan === tier.name}
                          onChange={() => handleInputChange('selectedPlan', tier.name)}
                          className="form-radio h-5 w-5 text-amber-400 focus:ring-amber-400"
                          required
                        />
                        <span className="font-semibold text-white">{tier.name}</span>
                        <span className="text-amber-300">${tier.price}</span>
                        <span className="text-zinc-400 italic">{tier.description}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <AnimatedInput label="Your Name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} className="w-full" required />
                    <AnimatedInput label="Email Address" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} type="email" className="w-full" required />
                  </div>
                  <AnimatedInput label="Project Type" value={formData.projectType} onChange={e => handleInputChange('projectType', e.target.value)} placeholder="e.g., Reels & Shorts, Music Video, Wedding..." className="w-full" />
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Tell me about your vision</label>
                    <Textarea placeholder="Describe your project, style preferences, timeline, and budget range..." value={formData.message} onChange={e => handleInputChange('message', e.target.value)} rows={6} className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-sm focus:border-orange-500/50" />
                  </div>
                  <MagnetizeButton 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-4 text-lg border-0 disabled:opacity-50 disabled:cursor-not-allowed" 
                    particleCount={16} 
                    attractRadius={60}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </MagnetizeButton>
                  {/* Status Messages */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-lg backdrop-blur-sm"
                      >
                        <div className="flex items-center">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                          </motion.div>
                          <div>
                            <motion.p 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="text-green-200 text-sm font-medium"
                            >
                              <strong>Message sent successfully!</strong>
                            </motion.p>
                            <motion.p 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                              className="text-green-300 text-xs mt-1"
                            >
                              I'll get back to you within 2-4 hours with a detailed response.
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 rounded-lg backdrop-blur-sm"
                      >
                        <div className="flex items-center">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                          >
                            <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                          </motion.div>
                          <div>
                            <motion.p 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="text-red-200 text-sm font-medium"
                            >
                              <strong>Failed to send message</strong>
                            </motion.p>
                            <motion.p 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                              className="text-red-300 text-xs mt-1"
                            >
                              Please try again or contact me directly via social media.
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

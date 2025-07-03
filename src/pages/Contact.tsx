import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SparklesCore } from "@/components/ui/sparkles";
import Navigation from "@/components/navigation/Navigation";

const Contact = ({ isDark, onThemeToggle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    timeline: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate email sending (replace with actual email service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the email using a service like EmailJS, Formspree, or your own backend
      console.log('Form submitted:', formData);
      
      // For now, we'll simulate a successful submission
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        timeline: '',
        projectType: '',
        budget: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "jirahulmeena@gmail.com",
      description: "Available for projects"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "6378013808",
      description: "Available 9 AM - 8 PM IST"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Mumbai, India",
      description: "Currently at NIT Nagpur"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      value: "2-4 Hours",
      description: "Typical response time"
    }
  ];

  const projectTypes = [
    "Music Video",
    "Reels & Shorts",
    "Wedding Video",
    "Corporate Video",
    "Short Film",
    "Social Media Content",
    "Event Coverage",
    "Other"
  ];

  const budgetRanges = [
    "Under ₹2,000",
    "₹2,000 - ₹4,000",
    "₹4,000 - ₹6,000",
    "₹6,000 - ₹8,000",
    "₹8,000",
    "Let's discuss"
  ];

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
              Let's Work Together
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your vision to life? Let's discuss your project and create something extraordinary together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8">Get In Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={info.title} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-orange-400 mt-1">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                          <p className="text-white text-lg mb-1">{info.value}</p>
                          <p className="text-gray-400 text-sm">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Stats */}
              <Card className="mt-8 bg-gradient-to-br from-orange-500/20 to-pink-500/20 backdrop-blur-sm border-orange-500/30">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold mb-2">Quick Response Guaranteed</h3>
                  <p className="text-gray-300 text-sm">
                    I typically respond to all inquiries within 2-4 hours during business days.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Tell Me About Your Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Your Name *</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Email Address *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Phone Number</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="+91 6378013808"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Project Timeline</label>
                        <Input
                          type="text"
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="e.g., 2 weeks, ASAP, flexible"
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Project Type</label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => handleInputChange('projectType', e.target.value)}
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white"
                        >
                          <option value="">Select project type</option>
                          {projectTypes.map(type => (
                            <option key={type} value={type} className="bg-gray-800">{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Budget Range</label>
                        <select
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map(range => (
                            <option key={range} value={range} className="bg-gray-800">{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-white font-medium mb-2">Project Details *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
                        placeholder="Tell me about your project... What's your vision? What style are you looking for? Any specific requirements or references?"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 border-0 text-white font-semibold py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Particle effect during loading */}
                        {isSubmitting && (
                          <div className="absolute inset-0 overflow-hidden">
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full"
                                initial={{ 
                                  x: "50%", 
                                  y: "50%", 
                                  opacity: 1,
                                  scale: 0
                                }}
                                animate={{
                                  x: `${Math.random() * 100}%`,
                                  y: `${Math.random() * 100}%`,
                                  opacity: [1, 0],
                                  scale: [0, 1, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                  ease: "easeOut"
                                }}
                              />
                            ))}
                          </div>
                        )}
                        
                        <div className="relative z-10 flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <motion.div 
                                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <motion.span
                                initial={{ opacity: 0.5 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                              >
                                Sending Message...
                              </motion.span>
                            </>
                          ) : (
                            <>
                              <motion.div
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <Send className="w-5 h-5 mr-2" />
                              </motion.div>
                              Send Message
                            </>
                          )}
                        </div>
                      </Button>
                    </motion.div>

                    {/* Enhanced Status Messages */}
                    <AnimatePresence>
                      {submitStatus === 'success' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-lg backdrop-blur-sm"
                        >
                          <div className="flex items-center">
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                            >
                              <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
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
                          className="mt-4 p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 rounded-lg backdrop-blur-sm"
                        >
                          <div className="flex items-center">
                            <motion.div
                              initial={{ scale: 0, rotate: 180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                            >
                              <AlertCircle className="w-6 h-6 text-red-400 mr-3" />
                            </motion.div>
                            <div>
                              <motion.p 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-red-200 text-sm font-medium"
                              >
                                <strong>Something went wrong.</strong>
                              </motion.p>
                              <motion.p 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-red-300 text-xs mt-1"
                              >
                                Please try again or contact me directly at jirahulmeena@gmail.com
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>

                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-200 text-sm text-center">
                      <strong>Free Consultation:</strong> All initial consultations are completely free. 
                      I'll review your project and provide a detailed quote within 24 hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

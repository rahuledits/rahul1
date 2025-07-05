import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, Crown, Mail, Phone, MapPin, Send, Clock, MessageCircle, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, HelpCircle, Timer, Repeat, Users, DollarSign, Music, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SparklesCore } from "@/components/ui/sparkles";
import Navigation from "@/components/navigation/Navigation";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import clsx from 'clsx';

const Services = ({ isDark, onThemeToggle }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const modalRef = useRef(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Location-based pricing state
  const [userCurrency, setUserCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1, INR: 83.5 });
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);

  // Convert price to user's currency
  const convertPrice = (usdPrice: string) => {
    if (userCurrency === 'USD') return usdPrice;
    
    const numericPrice = parseFloat(usdPrice.replace('$', ''));
    const inrPrice = Math.round(numericPrice * exchangeRates.INR);
    return `₹${inrPrice}`;
  };

  // Convert budget ranges to user's currency
  const convertBudgetRange = (range: string) => {
    if (userCurrency === 'USD') return range;
    
    if (range.includes('$')) {
      return range.replace(/\$\d+/g, (match) => {
        const amount = parseInt(match.replace('$', ''));
        const inrAmount = Math.round(amount * exchangeRates.INR);
        return `₹${inrAmount}`;
      });
    }
    return range;
  };

  // Convert additional service prices
  const convertAdditionalServicePrice = (price: string) => {
    // For percentage-based pricing, no conversion needed as it's relative to package price
    return price;
  };

  const packages = [
    {
      name: "Basic Edit",
      icon: <Zap className="w-8 h-8" />,
      price: "$9",
      duration: "2-3 days",
      description: "Adobe Premiere Pro editing for simple projects",
      features: [
        "Adobe Premiere Pro Editing",
        "Basic Color Correction", 
        "Audio Enhancement",
        "2-3 Day Delivery",
        "1 revision included",
        "HD 1080p delivery",
        "Simple visual narratives"
      ],
      popular: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Professional",
      icon: <Star className="w-8 h-8" />,
      price: "$29",
      duration: "3-5 days",
      description: "Adobe After Effects & Premiere Pro combo",
      features: [
        "Adobe After Effects VFX",
        "Adobe Premiere Pro Editing",
        "Motion Graphics & Animation",
        "Professional Color Grading",
        "Sound Design & Mixing",
        "4K delivery option",
        "Custom thumbnails",
        "Engaging visual narratives"
      ],
      popular: true,
      gradient: "from-orange-500 to-pink-500"
    },
    {
      name: "Cinematic",
      icon: <Crown className="w-8 h-8" />,
      price: "$49",
      duration: "5-7 days",
      description: "Full Adobe Creative Suite mastery",
      features: [
        "Adobe After Effects Advanced VFX",
        "Adobe Premiere Pro Pro Editing",
        "Advanced Motion Graphics",
        "Cinematic Color Grading",
        "Visual Effects & Compositing",
        "Custom Graphics & Animation",
        "Personal Consultation",
        "Premium visual narratives"
      ],
      popular: false,
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  const additionalServices = [
    {
      title: "Rush Delivery",
      description: "Get your project completed in 24-48 hours",
      price: "+50% of package price"
    },
    {
      title: "Additional Revisions",
      description: "Beyond the included revisions",
      price: "+25% of package price"
    },
    {
      title: "Custom Music",
      description: "Original soundtrack composition",
      price: "+75% of package price"
    },
    {
      title: "Extra Formats",
      description: "Multiple aspect ratios for different platforms",
      price: "+30% of package price"
    }
  ];

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

  // Define budget ranges for each package (in USD)
  const packageBudgetRangesUSD: Record<string, string[]> = {
    'Basic Edit': ['Under $25', '$25 - $50', "Let's discuss"],
    'Professional': ['$50 - $100', '$100 - $200', "Let's discuss"],
    'Cinematic': ['$200+', '$100 - $200', "Let's discuss"],
  };
  const allBudgetRangesUSD = [
    'Under $25',
    '$25 - $50',
    '$50 - $100',
    '$100 - $200',
    '$200+',
    "Let's discuss"
  ];

  // Convert budget ranges to user's currency
  const packageBudgetRanges = Object.fromEntries(
    Object.entries(packageBudgetRangesUSD).map(([key, ranges]) => [
      key,
      ranges.map(range => convertBudgetRange(range))
    ])
  );
  
  const allBudgetRanges = allBudgetRangesUSD.map(range => convertBudgetRange(range));

  const additionalServicesList = [
    {
      key: 'rush',
      label: 'Rush Delivery',
      description: 'Get your project completed in 24-48 hours',
      icon: Zap
    },
    {
      key: 'revisions',
      label: 'Extra Revisions',
      description: 'Beyond the included revisions',
      icon: Repeat
    },
    {
      key: 'music',
      label: 'Custom Music',
      description: 'Original soundtrack composition',
      icon: Music
    },
    {
      key: 'formats',
      label: 'Extra Formats',
      description: 'Multiple aspect ratios for different platforms',
      icon: Layers
    }
  ];
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Location detection and currency conversion
  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        // Set a timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );

        // Try to get user's location from IP with timeout
        const locationPromise = fetch('https://ipapi.co/json/');
        const response = await Promise.race([locationPromise, timeoutPromise]) as Response;
        
        if (!response.ok) {
          throw new Error('Location API failed');
        }
        
        const data = await response.json();
        
        // Only support USD and INR
        if (data.currency === 'INR') {
          setUserCurrency('INR');
        } else {
          setUserCurrency('USD');
        }
        
        // Get current exchange rates with timeout
        try {
          const ratesPromise = fetch('https://api.exchangerate-api.com/v4/latest/USD');
          const ratesResponse = await Promise.race([ratesPromise, timeoutPromise]) as Response;
          
          if (ratesResponse.ok) {
            const ratesData = await ratesResponse.json();
            setExchangeRates({
              USD: 1,
              INR: ratesData.rates.INR || 83.5
            });
          } else {
            throw new Error('Exchange rates API failed');
          }
        } catch (ratesError) {
          console.log('Exchange rates failed, using default rate');
          setExchangeRates({
            USD: 1,
            INR: 83.5
          });
        }
      } catch (error) {
        console.log('Location detection failed, defaulting to USD:', error.message);
        setUserCurrency('USD');
        setExchangeRates({
          USD: 1,
          INR: 83.5
        });
      } finally {
        setIsDetectingLocation(false);
      }
    };

    detectUserLocation();
  }, []);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowContactForm(true);
    // Pre-fill form with selected package info
    setFormData(prev => {
      const newBudgetOptions = packageBudgetRanges[pkg.name] || allBudgetRanges;
      const resetBudget = !newBudgetOptions.includes(prev.budget);
      return {
        ...prev,
        projectType: pkg.name,
        message: `I'm interested in the ${pkg.name} package (${pkg.price}, ${pkg.duration}). `,
        budget: resetBudget ? '' : prev.budget
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate email sending (replace with actual email service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', { 
        ...formData, 
        additionalServices: selectedServices.map(key => {
          const s = additionalServicesList.find((s) => s.key === key);
          const servicePrice = additionalServices.find((as) => as.title === s?.label)?.price;
          return { key, label: s?.label, price: servicePrice };
        }),
        currency: userCurrency,
        exchangeRate: exchangeRates[userCurrency]
      });
      
      setSubmitStatus('success');
      setShowSuccessModal(true);
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
      setSelectedServices([]);
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

  const goBackToServices = () => {
    setShowContactForm(false);
    setSelectedPackage(null);
  };

  // Accessibility: focus trap and close on Esc/click outside
  useEffect(() => {
    if (showSuccessModal && modalRef.current) {
      const focusable = modalRef.current.querySelector('button');
      if (focusable) focusable.focus();
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowSuccessModal(false);
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [showSuccessModal]);

  // Add FAQ data with icons
  const faqs = [
    {
      question: 'How do I get started with a project?',
      answer: 'Simply select a package and fill out the contact form. I will get in touch within a few hours to discuss your vision and next steps.',
      icon: HelpCircle
    },
    {
      question: 'What is the typical turnaround time?',
      answer: 'Turnaround depends on the package and project complexity. Basic edits are usually delivered in 2-3 days, while cinematic projects may take up to a week.',
      icon: Timer
    },
    {
      question: 'Can I request revisions?',
      answer: 'Absolutely! Each package includes at least one revision. Additional revisions can be added as an extra service.',
      icon: Repeat
    },
    {
      question: 'How do we communicate during the project?',
      answer: 'I am available via email, phone, and WhatsApp. You will receive regular updates and previews throughout the process.',
      icon: MessageCircle
    },
    {
      question: 'Do you offer rush delivery or urgent edits?',
      answer: 'Yes! Rush delivery is available for an additional fee. Let me know your deadline and I’ll do my best to accommodate urgent requests.',
      icon: Zap
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'I accept UPI, bank transfer, PayPal, and most major credit cards. Payment terms are flexible and discussed before starting.',
      icon: DollarSign
    }
  ];

  // In the form, use the correct budget options
  const currentBudgetOptions = selectedPackage && packageBudgetRanges[selectedPackage.name]
    ? packageBudgetRanges[selectedPackage.name]
    : allBudgetRanges;

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
        {/* Sparkles */}
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
              {showContactForm ? 'Get Started' : 'Services & Pricing'}
            </h1>
            
            {/* Currency Indicator */}
            {!showContactForm && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                {isDetectingLocation ? (
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <div className="w-4 h-4 mr-2 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-300">
                      Detecting your location...
                    </span>
                  </div>
                ) : (
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-sm text-gray-300">
                      Prices shown in {userCurrency === 'INR' ? 'Indian Rupees (₹)' : 'US Dollars ($)'}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {showContactForm 
                ? "Ready to bring your vision to life? Let's discuss your project and create something extraordinary together."
                : "Professional video editing services tailored to your needs. From simple cuts to cinematic masterpieces, I've got you covered."
              }
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!showContactForm ? (
              // Services Section
              <motion.div
                key="services"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Pricing Packages */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                  {packages.map((pkg, index) => (
                    <motion.div
                      key={pkg.name}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="relative"
                    >
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                            MOST POPULAR
                          </span>
                        </div>
                      )}
                      
                      <Card className={`relative overflow-hidden border-2 ${pkg.popular ? 'border-orange-500/50' : 'border-white/10'} bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all duration-300 h-full cursor-pointer group`}
                            onClick={() => handlePackageSelect(pkg)}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                        
                        <CardHeader className="text-center relative z-10">
                          <div className={`mx-auto mb-4 p-3 rounded-full bg-gradient-to-br ${pkg.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                            {pkg.icon}
                          </div>
                          <CardTitle className="text-2xl font-bold text-white mb-2">
                            {pkg.name}
                          </CardTitle>
                          <div className="text-4xl font-bold text-white mb-2">
                            {convertPrice(pkg.price)}
                          </div>
                          <p className="text-gray-400">{pkg.duration}</p>
                          <p className="text-gray-300 text-sm mt-2">{pkg.description}</p>
                        </CardHeader>
                        
                        <CardContent className="relative z-10">
                          <ul className="space-y-3 mb-8">
                            {pkg.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-gray-300">
                                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <Button 
                            className={`w-full bg-gradient-to-r ${pkg.gradient} hover:opacity-90 border-0 text-white font-semibold py-3 group-hover:scale-105 transition-transform duration-300`}
                          >
                            <span className="flex items-center justify-center">
                              Get Started
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Services */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">Additional Services</h2>
                  <div className="grid md:grid-cols-2 gap-6 mb-20">
                    {additionalServices.map((service, index) => (
                      <Card key={service.title} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                              <p className="text-gray-400 text-sm">{service.description}</p>
                            </div>
                            <div className="text-orange-400 font-bold text-right flex items-center gap-1">
                              <span className="text-sm">📊</span>
                              {convertAdditionalServicePrice(service.price)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Info Section */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      Let's discuss your vision and create something amazing together. 
                      Contact me for a free consultation and custom quote.
                    </p>
                    <Button 
                      onClick={() => setShowContactForm(true)}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 border-0 text-white font-semibold px-8 py-3 text-lg"
                    >
                      <span className="flex items-center">
                        Get Free Consultation
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </span>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              // Contact Form Section
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {/* Back Button */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button 
                    onClick={goBackToServices}
                    variant="ghost" 
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Services
                  </Button>
                </motion.div>

                {/* Selected Package Display */}
                {selectedPackage && (
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="bg-gradient-to-br from-orange-500/20 to-pink-500/20 backdrop-blur-sm border-orange-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`p-3 rounded-full bg-gradient-to-br ${selectedPackage.gradient} text-white mr-4`}>
                              {selectedPackage.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{selectedPackage.name}</h3>
                              <p className="text-gray-300">{convertPrice(selectedPackage.price)} • {selectedPackage.duration}</p>
                            </div>
                          </div>
                          <Button 
                            onClick={() => setSelectedPackage(null)}
                            variant="ghost" 
                            className="text-gray-400 hover:text-white"
                          >
                            Change Package
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <div className="grid lg:grid-cols-3 gap-12">
                  {/* Contact Info */}
                  <motion.div 
                    className="lg:col-span-1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
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
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-white">Tell Me About Your Project</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                          {/* Basic Info */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="contact-name" className="block text-white font-medium mb-2">Your Name *</label>
                              <Input
                                id="contact-name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                placeholder="John Doe"
                                required
                                aria-required="true"
                                aria-label="Your Name"
                              />
                            </div>
                            <div>
                              <label htmlFor="contact-email" className="block text-white font-medium mb-2">Email Address *</label>
                              <Input
                                id="contact-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                placeholder="john@example.com"
                                required
                                aria-required="true"
                                aria-label="Email Address"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="contact-phone" className="block text-white font-medium mb-2">Phone Number</label>
                              <Input
                                id="contact-phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                placeholder="+91 6378013808"
                                aria-label="Phone Number"
                              />
                            </div>
                            <div>
                              <label htmlFor="contact-timeline" className="block text-white font-medium mb-2">Project Timeline</label>
                              <Input
                                id="contact-timeline"
                                type="text"
                                value={formData.timeline}
                                onChange={(e) => handleInputChange('timeline', e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                placeholder="e.g., 2 weeks, ASAP, flexible"
                                aria-label="Project Timeline"
                              />
                            </div>
                          </div>

                          {/* Project Details */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="contact-project-type" className="block text-white font-medium mb-2">Project Type</label>
                              <select
                                id="contact-project-type"
                                value={formData.projectType}
                                onChange={(e) => handleInputChange('projectType', e.target.value)}
                                className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white"
                                aria-label="Project Type"
                              >
                                <option value="">Select project type</option>
                                {projectTypes.map(type => (
                                  <option key={type} value={type} className="bg-gray-800">{type}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label htmlFor="contact-budget" className="block text-white font-medium mb-2">Budget Range</label>
                              <select
                                id="contact-budget"
                                value={formData.budget}
                                onChange={(e) => handleInputChange('budget', e.target.value)}
                                className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white"
                                aria-label="Budget Range"
                              >
                                <option value="">Select budget range</option>
                                {currentBudgetOptions.map(range => (
                                  <option key={range} value={range} className="bg-gray-800">{range}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Additional Services */}
                          <div className="mb-6">
                            <label className="block text-white font-medium mb-2 text-lg">Additional Services</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {additionalServicesList.map((service) => {
                                const Icon = service.icon;
                                const checked = selectedServices.includes(service.key);
                                return (
                                  <label
                                    key={service.key}
                                    className={clsx(
                                      'flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2',
                                      checked
                                        ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-400/60 shadow-lg'
                                        : 'bg-white/5 border-white/10 hover:border-orange-400/30'
                                    )}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() => {
                                        setSelectedServices((prev) =>
                                          prev.includes(service.key)
                                            ? prev.filter((k) => k !== service.key)
                                            : [...prev, service.key]
                                        );
                                      }}
                                      className="accent-orange-500 w-5 h-5"
                                      aria-label={service.label}
                                    />
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-white">
                                      <Icon className="w-5 h-5" />
                                    </span>
                                    <span className="flex flex-col">
                                      <span className="font-semibold text-white">{service.label}</span>
                                      <span className="text-gray-300 text-xs">{service.description}</span>
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                          {/* Show summary of selected services if any */}
                          {selectedServices.length > 0 && (
                            <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-400/30 text-white">
                              <span className="font-semibold">Selected Additional Services:</span>
                              <ul className="list-disc ml-6 mt-1 text-sm">
                                {selectedServices.map((key) => {
                                  const s = additionalServicesList.find((s) => s.key === key);
                                  const servicePrice = additionalServices.find((as) => as.title === s?.label)?.price;
                                  return s ? (
                                    <li key={key} className="flex justify-between items-center">
                                      <span>{s.label}</span>
                                      <span className="text-orange-400 font-medium">{servicePrice}</span>
                                    </li>
                                  ) : null;
                                })}
                              </ul>
                            </div>
                          )}

                          {/* Message */}
                          <div>
                            <label htmlFor="contact-message" className="block text-white font-medium mb-2">Project Details *</label>
                            <Textarea
                              id="contact-message"
                              value={formData.message}
                              onChange={(e) => handleInputChange('message', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
                              placeholder="Tell me about your project... What's your vision? What style are you looking for? Any specific requirements or references?"
                              required
                              aria-required="true"
                              aria-label="Project Details"
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
                              aria-label="Send Message"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                              
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
                            {submitStatus === 'error' && (
                              <motion.div 
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="mt-4 p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 rounded-lg backdrop-blur-sm"
                                role="alert"
                                aria-live="assertive"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
            aria-labelledby="success-modal-title"
            aria-describedby="success-modal-desc"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              ref={modalRef}
              className="bg-gradient-to-br from-green-500/90 to-emerald-500/90 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative"
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              tabIndex={-1}
              onClick={e => e.stopPropagation()}
            >
              <CheckCircle className="w-16 h-16 text-white mx-auto mb-4 animate-bounce" aria-hidden="true" />
              <h2 id="success-modal-title" className="text-3xl font-bold text-white mb-2">Thank You!</h2>
              <p id="success-modal-desc" className="text-lg text-white mb-6">Your message has been sent successfully.<br />I'll get back to you within 2-4 hours with a detailed response.</p>
              <div className="flex flex-col gap-3">
                <Button onClick={() => { setShowSuccessModal(false); setShowContactForm(false); }} className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3">Back to Services</Button>
                <Button onClick={() => window.location.href = '/portfolio'} variant="outline" className="border-white/40 text-white font-semibold py-3">View Portfolio</Button>
              </div>
              <button
                aria-label="Close"
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-3 right-3 text-white text-2xl font-bold focus:outline-none"
              >×</button>
              <span className="sr-only" role="status">Success! Your message was sent.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* FAQ Section - Card Layout */}
      {/* Parallax background for FAQ section */}
      <div className="relative mt-20 w-full px-4 md:px-12 lg:px-24 mx-auto">
        {/* Parallax BG */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-orange-900/40 blur-2xl opacity-70 animate-pulse" style={{ filter: 'blur(60px)' }} />
          <div className="absolute left-1/4 top-1/2 w-1/2 h-1/3 bg-gradient-to-r from-orange-500/30 to-pink-500/20 rounded-full blur-3xl opacity-60 animate-spin-slow" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
          {faqs.map((faq, idx) => {
            const Icon = faq.icon;
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={clsx(
                  'relative rounded-2xl transition-all duration-300 shadow-2xl backdrop-blur-xl bg-white/10 border-2',
                  'hover:scale-[1.03] hover:-translate-y-1 focus-within:scale-[1.03] focus-within:-translate-y-1',
                  isOpen
                    ? 'border-pink-500/80 ring-2 ring-orange-400/40 shadow-pink-500/30'
                    : 'border-white/20 hover:border-orange-400/40'
                )}
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') setOpenFaq(isOpen ? null : idx);
                }}
                role="button"
                style={{ minHeight: 200 }}
              >
                {/* Animated Floating Icon with Neon Ring */}
                <motion.div
                  initial={false}
                  animate={isOpen ? { y: -14, scale: 1.25, rotate: 360, filter: 'drop-shadow(0 0 16px #fb923c) drop-shadow(0 0 32px #ec4899)' } : { y: 0, scale: 1, rotate: 0, filter: 'drop-shadow(0 0 8px #fb923c80)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center border-4 border-pink-400/40 shadow-lg"
                  aria-hidden="true"
                  style={{ pointerEvents: 'none' }}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-pink-500/40 animate-pulse" style={{ filter: 'blur(2px)' }} />
                  <Icon className="w-8 h-8 text-white relative z-10" />
                </motion.div>
                <div className="p-8 pt-20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-semibold text-white drop-shadow">{faq.question}</span>
                  </div>
                  <motion.div
                    id={`faq-answer-${idx}`}
                    initial={false}
                    animate={isOpen ? { opacity: 1, height: 'auto', marginTop: 18, x: 0 } : { opacity: 0, height: 0, marginTop: 0, x: 40 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="text-gray-200 text-base overflow-hidden"
                    aria-hidden={!isOpen}
                  >
                    {faq.answer}
                  </motion.div>
                </div>
                {/* Animated Neon Glow on open */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        background: 'radial-gradient(circle at 50% 10%, rgba(251,146,60,0.22) 0%, rgba(236,72,153,0.18) 60%, rgba(139,92,246,0.12) 100%)',
                        boxShadow: '0 0 48px 12px #fb923c80, 0 0 96px 24px #ec489980'
                      }}
                      aria-hidden="true"
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Services;

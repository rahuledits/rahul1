import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SparklesCore } from "@/components/ui/sparkles";
import { Link } from 'react-router-dom';
import Navigation from "@/components/navigation/Navigation";

const Services = ({ isDark, onThemeToggle }) => {
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
      price: "$50 per revision"
    },
    {
      title: "Custom Music",
      description: "Original soundtrack composition",
      price: "$150-300"
    },
    {
      title: "Extra Formats",
      description: "Multiple aspect ratios for different platforms",
      price: "$75 per format"
    }
  ];

  return (
    <>
      <Navigation isDark={isDark} onThemeToggle={onThemeToggle} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Sparkles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <SparklesCore 
            background="transparent" 
            minSize={0.1} 
            maxSize={0.4} 
            particleDensity={30} 
            className="w-full h-full" 
            particleColor="#8b5cf6" 
            speed={0.5} 
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Services & Pricing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional video editing services tailored to your needs. 
              From simple cuts to cinematic masterpieces, I've got you covered.
            </p>
          </motion.div>

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
                
                <Card className={`relative overflow-hidden border-2 ${pkg.popular ? 'border-orange-500/50' : 'border-white/10'} bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all duration-300 h-full`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-5`} />
                  
                  <CardHeader className="text-center relative z-10">
                    <div className={`mx-auto mb-4 p-3 rounded-full bg-gradient-to-br ${pkg.gradient} text-white`}>
                      {pkg.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {pkg.name}
                    </CardTitle>
                    <div className="text-4xl font-bold text-white mb-2">
                      {pkg.price}
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
                    
                    <Link to="/contact">
                      <Button 
                        className={`w-full bg-gradient-to-r ${pkg.gradient} hover:opacity-90 border-0 text-white font-semibold py-3`}
                      >
                        Get Started
                      </Button>
                    </Link>
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
            <div className="grid md:grid-cols-2 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={service.title} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-gray-400 text-sm">{service.description}</p>
                      </div>
                      <div className="text-orange-400 font-bold text-right">
                        {service.price}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Let's discuss your vision and create something amazing together. 
                Contact me for a free consultation and custom quote.
              </p>
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 border-0 text-white font-semibold px-8 py-3 text-lg">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;

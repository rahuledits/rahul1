import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit, Film, Award, Users, Clock } from 'lucide-react';
import { SparklesCore } from "@/components/ui/sparkles";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Navigation from "@/components/navigation/Navigation";

const About = ({ isDark, onThemeToggle }) => {
  const skills = [
    { name: "Adobe Premiere Pro", level: 95, color: "from-purple-500 to-pink-500" },
    { name: "Adobe After Effects", level: 90, color: "from-blue-500 to-cyan-500" },
    { name: "Color Grading", level: 85, color: "from-orange-500 to-red-500" },
    { name: "Motion Graphics", level: 88, color: "from-green-500 to-teal-500" },
    { name: "Cinematography", level: 82, color: "from-indigo-500 to-purple-500" },
    { name: "Sound Design", level: 75, color: "from-pink-500 to-rose-500" }
  ];

  const achievements = [
    { icon: <Award className="w-6 h-6" />, title: "Best Student Film", desc: "NIT Nagpur Film Festival 2024" },
    { icon: <Users className="w-6 h-6" />, title: "50+ Happy Clients", desc: "Across various industries" },
    { icon: <Clock className="w-6 h-6" />, title: "1000+ Hours", desc: "Of video content created" },
    { icon: <Film className="w-6 h-6" />, title: "80+ Projects", desc: "Successfully completed" }
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
              About Rahul
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A passionate video editor and cinematographer from Mumbai, currently pursuing engineering at NIT Nagpur. 
              With 2 years of intensive experience, I specialize in creating compelling visual narratives that captivate audiences.
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <CardSpotlight
                  key={skill.name}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  color="#8b5cf6"
                  radius={200}
                >
                  <div className="flex justify-between items-center mb-3 relative z-10">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative z-10">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </div>
                </CardSpotlight>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Achievements</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <CardSpotlight
                  key={achievement.title}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
                  color="#f97316"
                  radius={150}
                >
                  <div className="text-orange-400 mb-4 flex justify-center relative z-10">
                    {achievement.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2 relative z-10">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm relative z-10">{achievement.desc}</p>
                </CardSpotlight>
              ))}
            </div>
          </motion.div>

          {/* Personal Story */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CardSpotlight
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto"
              color="#3b82f6"
              radius={300}
            >
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">My Journey</h2>
              <p className="text-gray-300 leading-relaxed text-lg relative z-10">
                My passion for storytelling through visual media began during my time at NIT Nagpur. 
                What started as a curiosity about filmmaking quickly evolved into a dedicated pursuit of excellence 
                in video editing and cinematography. I believe every frame tells a story, and every cut should 
                serve a purpose in creating an emotional connection with the audience.
              </p>
            </CardSpotlight>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;

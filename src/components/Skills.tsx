import React, { useState } from 'react';
import { Code, Database, Wrench, Target, Award, Cpu, Layout, Server, Smartphone, Palette, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.3)"
    }
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    technologies_web: <Layout className="w-6 h-6" />,
    programming_languages: <Code className="w-6 h-6" />,
    frameworks: <Cpu className="w-6 h-6" />,
    databases: <Database className="w-6 h-6" />,
    tools: <Wrench className="w-6 h-6" />,
    modeling: <Target className="w-6 h-6" />
  };

  const skillIcons: Record<string, React.ReactNode> = {
    'HTML': <Code className="w-5 h-5 text-orange-400" />,
    'CSS': <Code className="w-5 h-5 text-blue-400" />,
    'JavaScript': <Code className="w-5 h-5 text-yellow-400" />,
    'TypeScript': <Code className="w-5 h-5 text-blue-500" />,
    'Java': <Code className="w-5 h-5 text-red-400" />,
    'SQL': <Database className="w-5 h-5 text-blue-300" />,
    'ReactJS': <Layout className="w-5 h-5 text-cyan-400" />,
    'Angular (v14/v18)': <Layout className="w-5 h-5 text-red-500" />,
    'Java Spring Boot': <Server className="w-5 h-5 text-green-500" />,
    'Flutter': <Smartphone className="w-5 h-5 text-blue-400" />,
    'MySQL': <Database className="w-5 h-5 text-orange-500" />,
    'VS Code': <Wrench className="w-5 h-5 text-blue-400" />,
    'IntelliJ': <Wrench className="w-5 h-5 text-purple-400" />,
    'Eclipse': <Wrench className="w-5 h-5 text-red-300" />,
    'Visual Studio': <Wrench className="w-5 h-5 text-purple-500" />,
    'Android Studio': <Wrench className="w-5 h-5 text-green-400" />,
    'Merise': <Target className="w-5 h-5 text-blue-400" />
  };

  const getSkillIcon = (skill: string) => {
    return skillIcons[skill] || <Code className="w-5 h-5 text-gray-400" />;
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and professional qualities
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              className="text-2xl font-bold mb-8 flex items-center text-blue-400"
              variants={itemVariants}
            >
              <Code className="w-6 h-6 mr-2" />
              Technical Skills
            </motion.h3>

            <div className="space-y-6">
              {Object.entries(resumeData.skills).map(([category, skills]) => (
                <motion.div
                  key={category}
                  className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50"
                  variants={cardVariants}
                  whileHover="hover"
                  onMouseEnter={() => setActiveCategory(category)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      <motion.span
                        className="mr-2"
                        animate={{ 
                          scale: activeCategory === category ? 1.2 : 1,
                          color: activeCategory === category ? "#60a5fa" : "#ffffff"
                        }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        {categoryIcons[category]}
                      </motion.span>
                      {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h4>
                    <span className="text-sm text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                      {skills.length} skills
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <motion.div
                        key={skill}
                        className={`group relative bg-gray-700/50 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-2 rounded-full text-sm transition-all duration-300 cursor-pointer flex items-center space-x-2 border border-gray-600/50 ${
                          hoveredSkill === skill ? 'border-blue-400/50' : ''
                        }`}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 5px 15px -5px rgba(59, 130, 246, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredSkill(skill)}
                        onHoverEnd={() => setHoveredSkill(null)}
                      >
                        {getSkillIcon(skill)}
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                          {skill}
                        </span>
                        
                        {/* Hover effect line */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Qualities */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              className="text-2xl font-bold mb-8 flex items-center text-purple-400"
              variants={itemVariants}
            >
              <Award className="w-6 h-6 mr-2" />
              Professional Qualities
            </motion.h3>

            <motion.div
              className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resumeData.qualities.map((quality, index) => (
                  <motion.div
                    key={quality}
                    className="group bg-gray-700/30 hover:bg-gradient-to-br hover:from-purple-600/10 hover:to-blue-600/10 p-4 rounded-lg border border-gray-600/30 transition-colors"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -3,
                      boxShadow: "0 10px 20px -5px rgba(139, 92, 246, 0.2)"
                    }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {quality}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional info */}
              <motion.div
                className="mt-8 pt-6 border-t border-gray-700/50"
                variants={itemVariants}
              >
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-blue-400" />
                  Design Philosophy
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I believe in creating clean, efficient, and maintainable code that not only solves problems 
                  but also provides exceptional user experiences. My approach combines technical expertise 
                  with creative problem-solving to deliver innovative solutions.
                </p>
              </motion.div>
            </motion.div>

            {/* Languages */}
            <motion.div
              className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 mt-8"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Languages
              </h3>
              <div className="space-y-4">
                {Object.entries(resumeData.languages).map(([language, level]) => (
                  <div key={language} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 capitalize">
                        {language === 'arabic' ? 'Arabic' : 
                         language === 'english' ? 'English' : 'French'}
                      </span>
                      <span className="text-sm text-gray-400">{level}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ 
                          width: language === 'arabic' ? '100%' : 
                                 language === 'english' ? '85%' : '90%'
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
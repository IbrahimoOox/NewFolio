import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, Code, Cpu, Terminal, Zap, Linkedin, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const About: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
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
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
      </div>

      {/* Code pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 font-mono text-2xl">{`<Code/>`}</div>
        <div className="absolute top-40 right-20 font-mono text-2xl">{`{Dev}`}</div>
        <div className="absolute bottom-20 left-1/4 font-mono text-2xl">{`</>`}</div>
        <div className="absolute bottom-40 right-1/4 font-mono text-2xl">function()</div>
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
            <Code className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Description & Skills */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-2xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h3
              className="text-2xl font-bold text-white mb-6 flex items-center"
              variants={itemVariants}
            >
              <Terminal className="w-6 h-6 mr-2 text-blue-400" />
              My Journey
            </motion.h3>
            
            <motion.p
              className="text-lg text-gray-300 leading-relaxed mb-8"
              variants={itemVariants}
            >
              {resumeData.personal_info.description}
            </motion.p>

            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Core Strengths
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {resumeData.qualities.slice(0, 6).map((quality, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-300">{quality}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center space-x-6"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center space-x-2 text-sm text-gray-400"
                whileHover={{ color: "#60a5fa" }}
              >
                <Cpu className="w-4 h-4" />
                <span>Full-Stack</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2 text-sm text-gray-400"
                whileHover={{ color: "#60a5fa" }}
              >
                <Terminal className="w-4 h-4" />
                <span>Clean Code</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2 text-sm text-gray-400"
                whileHover={{ color: "#60a5fa" }}
              >
                <Zap className="w-4 h-4" />
                <span>Fast Learning</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
          >
            <motion.h3
              className="text-2xl font-bold text-white mb-8 flex items-center"
              variants={itemVariants}
            >
              <Code className="w-6 h-6 mr-2 text-purple-400" />
              Get In Touch
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {/* Email Card */}
              <motion.div
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-colors group"
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredItem('email')}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600/20 to-blue-600/10 rounded-lg flex items-center justify-center border border-blue-500/20"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <Mail className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <a
                      href={`mailto:${resumeData.personal_info.email}`}
                      className="text-white hover:text-blue-400 transition-colors group-hover:underline"
                    >
                      {resumeData.personal_info.email}
                    </a>
                  </div>
                </div>
                {hoveredItem === 'email' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-600/0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>

              {/* Phone Card */}
              <motion.div
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:border-green-500/30 transition-colors group"
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredItem('phone')}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-600/20 to-green-600/10 rounded-lg flex items-center justify-center border border-green-500/20"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <Phone className="w-6 h-6 text-green-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Phone</p>
                    <a
                      href={`tel:${resumeData.personal_info.phone}`}
                      className="text-white hover:text-green-400 transition-colors group-hover:underline"
                    >
                      {resumeData.personal_info.phone}
                    </a>
                  </div>
                </div>
                {hoveredItem === 'phone' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-green-600/0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>

              {/* LinkedIn Card */}
              <motion.div
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-colors group md:col-span-2"
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredItem('linkedin')}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600/20 to-blue-600/10 rounded-lg flex items-center justify-center border border-blue-500/20"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/ibrahim-araj/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 transition-colors group-hover:underline flex items-center"
                    >
                      linkedin.com/in/ibrahim-araj
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
                {hoveredItem === 'linkedin' && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-600/0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-gray-700/50 mt-8"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                Availability
              </h4>
              <p className="text-gray-300 mb-4">
                Currently open to new opportunities and exciting collaborations.
                Feel free to reach out to discuss innovative projects.
              </p>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Based in Morocco | Remote & On-site Opportunities</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Code, ArrowUp, Mail, Linkedin, Github, ExternalLink, MessageCircle } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Show scroll-to-top button when user scrolls down
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800/50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {resumeData.personal_info.name}
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Full-stack developer passionate about creating innovative web solutions 
              and delivering exceptional user experiences.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.linkedin.com/in/ibrahim-araj/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-gray-700/50 hover:border-blue-500/50 transition-colors"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5 text-blue-400" />
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-gray-700/50 hover:border-gray-500/50 transition-colors"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 text-gray-400" />
              </motion.a>
              <motion.a
                href={`mailto:${resumeData.personal_info.email}`}
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-gray-700/50 hover:border-red-500/50 transition-colors"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5 text-red-400" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">Navigate</h4>
            <ul className="space-y-3">
              {['home', 'about', 'skills', 'experience', 'education', 'contact'].map((item) => (
                <li key={item}>
                  <motion.button
                    onClick={() => scrollToSection(item)}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="w-4 h-4 text-blue-400 mt-1 mr-2" />
                <a
                  href={`mailto:${resumeData.personal_info.email}`}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {resumeData.personal_info.email}
                </a>
              </div>
              <div className="flex items-start">
                <MessageCircle className="w-4 h-4 text-green-400 mt-1 mr-2" />
                <a
                  href={`tel:${resumeData.personal_info.phone}`}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  {resumeData.personal_info.phone}
                </a>
              </div>
              <div className="flex items-start">
                <ExternalLink className="w-4 h-4 text-purple-400 mt-1 mr-2" />
                <a
                  href="/Resum.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  View Resume
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center text-gray-500 mb-4 md:mb-0">
            <span>© {currentYear} Made by {resumeData.personal_info.name}</span>
          </div>
          
          <div className="text-gray-500 text-sm">
            <span>All rights reserved.</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
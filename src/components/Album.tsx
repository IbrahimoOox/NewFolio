import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import all your screenshots
import Paralgo from '../data/data/Paralgo.png';
import Paralgo1 from '../data/data/Paralgo1.png';
import Paralgo2 from '../data/data/Paralgo2.png';
import travel from '../data/data/travel.png';
import travel1 from '../data/data/travel1.png';
import travel2 from '../data/data/travel2.png';

interface AlbumProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    company: string;
    tech: string[];
    mission?: string;
  };
}

const Album: React.FC<AlbumProps> = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // All screenshots combined
  const screenshots = [
    {
      id: 1,
      title: "Paralgo Dashboard",
      description: "Main dashboard interface showing AI-powered analytics",
      image: Paralgo
    },
    {
      id: 2,
      title: "Algorithm Visualization",
      description: "Interactive algorithm visualization and testing interface",
      image: Paralgo1
    },
    {
      id: 3,
      title: "Performance Metrics",
      description: "Detailed performance analysis and optimization tools",
      image: Paralgo2
    },
    {
      id: 4,
      title: "Travel Dashboard",
      description: "Main travel planning dashboard with destination overview",
      image: travel
    },
    {
      id: 5,
      title: "Trip Planning Interface",
      description: "Interactive trip planning and itinerary management system",
      image: travel1
    },
    {
      id: 6,
      title: "Destination Explorer",
      description: "Detailed destination information and booking options",
      image: travel2
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 rounded-2xl border border-gray-700/50 w-full max-w-6xl max-h-[90vh] overflow-hidden glass-effect"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex-1">
              <h3 className="text-2xl font-bold gradient-text">
                {project.title}
              </h3>
              <p className="text-gray-400 mt-1 flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                {project.company} - Project Gallery
              </p>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row h-[70vh]">
            {/* Image Viewer */}
            <div className="flex-1 p-6 flex flex-col">
              <div className="flex-1 bg-gray-800/30 rounded-xl border border-gray-700/50 flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    className="flex items-center justify-center w-full h-full p-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={screenshots[currentImageIndex].image} 
                      alt={screenshots[currentImageIndex].title}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {screenshots.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-900/80 rounded-full border border-gray-700/50 hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </motion.button>
                    <motion.button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-900/80 rounded-full border border-gray-700/50 hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </motion.button>
                  </>
                )}
              </div>

              {/* Image Info */}
              <div className="mt-4 text-center">
                <h4 className="text-lg font-semibold text-white mb-1">
                  {screenshots[currentImageIndex].title}
                </h4>
                <p className="text-sm text-gray-400">
                  {screenshots[currentImageIndex].description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {currentImageIndex + 1} of {screenshots.length}
                </p>
              </div>
            </div>

            {/* Thumbnail Sidebar */}
            <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-700/50 p-6 flex flex-col">
              <h4 className="font-semibold text-gray-300 mb-4 flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" />
                Project Screenshots ({screenshots.length})
              </h4>
              
              <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                {screenshots.map((screenshot, index) => (
                  <motion.div
                    key={screenshot.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      index === currentImageIndex
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/50 shadow-lg"
                        : "bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/50"
                    }`}
                    onClick={() => selectImage(index)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${
                        index === currentImageIndex 
                          ? "ring-2 ring-blue-500" 
                          : ""
                      }`}>
                        <img 
                          src={screenshot.image} 
                          alt={screenshot.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {screenshot.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {screenshot.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <h4 className="font-semibold text-gray-300 mb-3 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-2 py-1 rounded-full text-xs text-blue-300 border border-blue-500/30"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Album;
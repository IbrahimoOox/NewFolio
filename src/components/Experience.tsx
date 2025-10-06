import React, { useState } from "react";
import {
  Calendar,
  Building,
  Code,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { resumeData } from "../data/resumeData";
import Album from "./Album";

const Experience: React.FC = () => {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.3)",
    },
  };

  const toggleExperience = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  const getCompanyIcon = (company: string) => {
    const companyIcons: Record<string, React.ReactNode> = {
      "Digitale State": <Building className="w-5 h-5 text-blue-400" />,
      ALGOLUS: <Code className="w-5 h-5 text-green-400" />,
      "SUP MTI": <Sparkles className="w-5 h-5 text-purple-400" />,
    };
    return (
      companyIcons[company] || <Building className="w-5 h-5 text-gray-400" />
    );
  };

  const openAlbum = (index: number) => {
    setSelectedProject(index);
  };

  const closeAlbum = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
    >
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
            <Calendar className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A journey through my professional career and the projects I've
            contributed to
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="relative">
          {/* Animated timeline */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ originY: 0 }}
          />

          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {resumeData.experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="relative flex items-start space-x-8 group"
                variants={itemVariants}
              >
                {/* Timeline dot */}
                <motion.div
                  className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center relative z-10 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Calendar className="w-8 h-8 text-white" />
                </motion.div>

                {/* Experience card */}
                <motion.div
                  className="flex-1 bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 overflow-hidden glass-effect"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => toggleExperience(index)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-400 flex items-center">
                          {getCompanyIcon(experience.company)}
                          <span className="ml-2">{experience.title}</span>
                        </h3>
                        <p className="text-gray-300 mt-1 flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {experience.company}
                        </p>
                      </div>
                      <div className="text-sm text-gray-400 mt-2 sm:mt-0 bg-gray-700/50 px-3 py-1 rounded-full">
                        {experience.period}
                      </div>
                    </div>

                    <motion.p
                      className="text-gray-300 mb-4 leading-relaxed"
                      initial={{ height: "auto" }}
                      animate={{
                        height:
                          expandedExperience === index ? "auto" : "4.5rem",
                        overflow:
                          expandedExperience === index ? "visible" : "hidden",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {experience.mission}
                    </motion.p>

                    <motion.div
                      className="flex items-center text-blue-400 text-sm"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="mr-1">
                        {expandedExperience === index
                          ? "Show less"
                          : "Read more"}
                      </span>
                      <motion.div
                        animate={{
                          rotate: expandedExperience === index ? 90 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Tech stack */}
                  <motion.div
                    className="mt-6 pt-6 border-t border-gray-700/50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: expandedExperience === index ? 1 : 0,
                      height: expandedExperience === index ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.tech.map((tech) => (
                        <motion.span
                          key={tech}
                          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-3 py-1 rounded-full text-xs text-blue-300 border border-blue-500/30"
                          whileHover={{
                            scale: 1.05,
                            background:
                              "linear-gradient(to right, rgba(37, 99, 235, 0.3), rgba(139, 92, 246, 0.3))",
                          }}
                          transition={{ duration: 0.2 }}
                          onHoverStart={() => setHoveredTech(tech)}
                          onHoverEnd={() => setHoveredTech(null)}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Project link (if applicable) */}
                  {expandedExperience === index && (
                    <motion.div
                      className="mt-6 pt-6 border-t border-gray-700/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.button
                        onClick={() => openAlbum(index)}
                        className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Project Gallery
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Album Modal */}
      {selectedProject !== null && (
        <Album
          isOpen={selectedProject !== null}
          onClose={closeAlbum}
          project={resumeData.experiences[selectedProject]}
        />
      )}
    </section>
  );
};

export default Experience;
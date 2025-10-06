import React, { useState } from 'react';
import { Award, MapPin, Calendar, GraduationCap, BookOpen, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Education: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 font-mono text-2xl">🎓</div>
        <div className="absolute top-40 right-20 font-mono text-2xl">📚</div>
        <div className="absolute bottom-20 left-1/4 font-mono text-2xl">📝</div>
        <div className="absolute bottom-40 right-1/4 font-mono text-2xl">🎯</div>
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
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl mb-6"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            My academic journey and educational achievements
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4"></div>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-teal-500 to-green-500"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ originY: 0 }}
          />

          <div className="space-y-8">
            {resumeData.education.map((edu, index) => (
              <motion.div
                key={index}
                className="relative flex items-start space-x-8 group"
                variants={itemVariants}
              >
                {/* Timeline dot */}
                <motion.div
                  className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center relative z-10 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>

                {/* Education card */}
                <motion.div
                  className="flex-1 bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 overflow-hidden cursor-pointer"
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        {edu.degree}
                      </h3>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="flex items-center space-x-2 text-gray-300">
                          <motion.div
                            variants={iconVariants}
                            whileHover="hover"
                          >
                            <MapPin className="w-4 h-4" />
                          </motion.div>
                          <span>{edu.school}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400 mt-2 sm:mt-0">
                          <motion.div
                            variants={iconVariants}
                            whileHover="hover"
                          >
                            <Calendar className="w-4 h-4" />
                          </motion.div>
                          <span>{edu.year}</span>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="ml-4 text-green-400"
                      animate={{ rotate: expandedItems.includes(index) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedItems.includes(index) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: expandedItems.includes(index) ? "auto" : 0,
                      opacity: expandedItems.includes(index) ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pt-4 mt-4 border-t border-gray-700/50">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                          <span>Graduated with honors in Software Engineering</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                          <span>Completed multiple projects in web and mobile development</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                          <span>Participated in coding competitions and hackathons</span>
                        </li>
                      </ul>

                      <div className="mt-6 pt-4 border-t border-gray-700/50">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                          Relevant Coursework
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Advanced Programming",
                            "Web Development",
                            "Database Systems",
                            "Software Architecture",
                            "Mobile Development",
                            "UI/UX Design"
                          ].map((course, i) => (
                            <motion.span
                              key={i}
                              className="bg-gradient-to-r from-green-600/20 to-teal-600/20 px-3 py-1 rounded-full text-xs text-green-300 border border-green-500/30"
                              whileHover={{ 
                                scale: 1.05,
                                background: "linear-gradient(to right, rgba(5, 150, 105, 0.3), rgba(15, 118, 110, 0.3))"
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl p-8 border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-400" />
            Continuous Learning
          </h3>
          <p className="text-gray-300 mb-6">
            Beyond formal education, I continuously update my skills through online courses, 
            technical workshops, and personal projects. I believe in lifelong learning to stay 
            at the forefront of technology trends.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-gray-400">Online Certifications</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-gray-400">Technical Workshops</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-gray-400">Open Source Contributions</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-gray-400">Professional Development</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
import React, { useState, useEffect } from "react";
import { ChevronDown, Code, Cpu, Terminal, Zap, Binary } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "../data/resumeData";
import profileImage from "../data/data/profileImage.png";

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const [currentTech, setCurrentTech] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const techStack = [
    "React Developer",
    "Full-Stack Engineer",
    "TypeScript Expert",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  // Code snippets for background animation
  const codeSnippets = [
    `function welcome() {\n  return "Hello World!";\n}`,
    `const dev = {\n  name: "Developer",\n  passion: "Coding"\n};`,
    `import { Innovation } from 'mind';\nnew Innovation().create();`,
    `// Clean code matters\nconst elegant = true;`,
    `if (passion > skill) {\n  keepLearning();\n}`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStack.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -5 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      rotate: 0,
      boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)",
    },
  };

  // Continuous Binary Rain effect
  const BinaryRain = () => {
    const [binaryElements, setBinaryElements] = useState<Array<{
      id: number;
      char: string;
      left: number;
      speed: number;
      size: number;
      opacity: number;
    }>>([]);

    useEffect(() => {
      // Create initial binary elements
      const initialElements = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        char: Math.random() > 0.5 ? '1' : '0',
        left: Math.random() * 100,
        speed: 2 + Math.random() * 3,
        size: 12 + Math.random() * 10,
        opacity: 0.1 + Math.random() * 0.2,
      }));
      setBinaryElements(initialElements);

      // Continuous animation - create new elements when old ones finish
      const interval = setInterval(() => {
        setBinaryElements(prev => {
          // Remove some finished elements and add new ones
          const filtered = prev.filter(el => Math.random() > 0.1);
          const newElements = Array.from({ length: 5 }, (_, i) => ({
            id: Date.now() + i,
            char: Math.random() > 0.5 ? '1' : '0',
            left: Math.random() * 100,
            speed: 2 + Math.random() * 3,
            size: 12 + Math.random() * 10,
            opacity: 0.1 + Math.random() * 0.2,
          }));
          return [...filtered, ...newElements].slice(0, 60); // Keep max 60 elements
        });
      }, 500);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryElements.map((element) => (
          <motion.span
            key={element.id}
            className={`absolute font-mono ${
              element.char === '1' ? 'text-blue-400/20' : 'text-green-400/20'
            }`}
            style={{
              left: `${element.left}%`,
              top: '-10%',
              fontSize: `${element.size}px`,
              opacity: element.opacity,
            }}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, element.opacity, 0],
            }}
            transition={{
              duration: element.speed,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            {element.char}
          </motion.span>
        ))}
      </div>
    );
  };

  // Continuous Code Rain effect
  const CodeRain = () => {
    const codeChars = ['{', '}', '<', '>', ';', '(', ')', '[', ']', '=', '+', '-', '*', '/'];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-purple-400/15"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-5%',
              fontSize: `${14 + Math.random() * 12}px`,
            }}
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 0.3, 0],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            {codeChars[Math.floor(Math.random() * codeChars.length)]}
          </motion.span>
        ))}
      </div>
    );
  };

  // Floating code windows with continuous animation
  const FloatingCodeWindows = () => {
    const windows = [
      { id: 1, top: '20%', left: '5%', code: codeSnippets[0], lang: 'js' },
      { id: 2, top: '60%', left: '80%', code: codeSnippets[1], lang: 'ts' },
      { id: 3, top: '30%', left: '75%', code: codeSnippets[2], lang: 'java' },
      { id: 4, top: '70%', left: '10%', code: codeSnippets[3], lang: 'py' },
    ];

    return (
      <>
        {windows.map((window) => (
          <motion.div
            key={window.id}
            className="absolute bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-700/50 p-3 max-w-xs font-mono text-xs"
            style={{
              top: window.top,
              left: window.left,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              y: [0, -15, 0],
              x: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center mb-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-400/60 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400/60 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400/60 rounded-full"></div>
              </div>
              <span className="ml-2 text-gray-400/70 text-xs">{window.lang}</span>
            </div>
            <pre className="text-green-400/50 whitespace-pre-wrap">
              {window.code}
            </pre>
          </motion.div>
        ))}
      </>
    );
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 pt-20"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-gray-900"></div>
      
      {/* Continuous Binary Rain */}
      <BinaryRain />
      
      {/* Continuous Code Rain */}
      <CodeRain />
      
      {/* Floating code windows */}
      <FloatingCodeWindows />

      {/* Animated tech icons */}
      <motion.div
        className="absolute top-20 left-10 text-blue-400/10 text-6xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Code />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-purple-400/10 text-6xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Binary />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 mt-10">
        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-gray-700"
            variants={itemVariants}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-green-400">
              Disponible pour de nouvelles opportunités
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-300% animate-gradient"
            variants={itemVariants}
          >
            {resumeData.personal_info.name}
          </motion.h1>

          <motion.div
            className="h-10 mb-6 flex items-center justify-center lg:justify-start"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTech}
                className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light flex items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Code className="w-6 h-6 mr-2 text-blue-400" />
                {techStack[currentTech]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.p
            className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            variants={itemVariants}
          >
            {resumeData.personal_info.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="group relative bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full overflow-hidden font-semibold"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Contact me
              </span>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("Experience")}
              className="group relative border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full overflow-hidden"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative">My Projets</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-16 flex items-center justify-center lg:justify-start space-x-8 text-gray-500"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05, color: "#60a5fa" }}
            >
              <Cpu className="w-5 h-5" />
              <span>Full-Stack</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05, color: "#60a5fa" }}
            >
              <Terminal className="w-5 h-5" />
              <span>Clean Code</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05, color: "#60a5fa" }}
            >
              <Binary className="w-5 h-5" />
              <span>Innovation</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <div className="relative">
            <motion.div
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-4 border-gray-700 relative"
              whileHover={{
                boxShadow: "0 0 40px rgba(59, 130, 246, 0.3)",
              }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {/* Image transparente sans aucun filtre */}
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="bg-gray-900/90 rounded-lg p-4 text-center"
                    >
                      <Code className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <span className="text-white text-sm">Ready to Code!</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Binary orbit elements - continuous animation */}
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500/20 rounded-full border border-blue-500/40 backdrop-blur-sm flex items-center justify-center"
              animate={{
                rotate: 360,
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="text-blue-400 text-xs font-mono">1</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-500/20 rounded-full border border-purple-500/40 backdrop-blur-sm flex items-center justify-center"
              animate={{
                rotate: -360,
                x: [0, -30, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5,
              }}
            >
              <span className="text-purple-400 text-xs font-mono">0</span>
            </motion.div>

            {/* Code badge */}
            <motion.div
              className="absolute -bottom-4 right-4 bg-gray-900/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-green-400 text-sm font-mono">npm start</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center">
          <ChevronDown className="w-8 h-8 text-blue-400 mb-2" />
          
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
import React, { useState, useRef } from 'react';
import { Mail, Phone, ExternalLink, Send, MapPin, MessageSquare, User, FileText, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const formRef = useRef<HTMLFormElement>(null);

  // EmailJS configuration with debugging
  const emailjsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_ibrahimox22pdw',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_bt0okth',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'TkPMpnmByU-npNkLU'
  };

  // Debug environment variables on component mount
  React.useEffect(() => {
    console.log('🔧 EmailJS Configuration:', {
      serviceId: emailjsConfig.serviceId,
      templateId: emailjsConfig.templateId,
      publicKey: emailjsConfig.publicKey ? '***' + emailjsConfig.publicKey.slice(-4) : 'missing',
      envLoaded: !!import.meta.env.VITE_EMAILJS_SERVICE_ID
    });
  }, []);

  // Initialize EmailJS
  React.useEffect(() => {
    if (emailjsConfig.publicKey) {
      emailjs.init(emailjsConfig.publicKey);
      console.log('✅ EmailJS initialized');
    } else {
      console.error('❌ EmailJS Public Key is missing');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    console.log('🔄 Starting form submission...');

    // Check if EmailJS is configured
    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      console.error('❌ EmailJS configuration missing:', emailjsConfig);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        from_name: formData.from_name,
        from_email: formData.from_email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Ibrahim',
        reply_to: formData.from_email
      };

      console.log('📧 Sending email with params:', templateParams);

      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );

      console.log('✅ EmailJS Success Response:', result);
      
      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ 
          from_name: '', 
          from_email: '', 
          subject: '', 
          message: '' 
        });
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`);
      }
    } catch (error: any) {
      console.error('❌ EmailJS Error Details:', {
        status: error?.status,
        text: error?.text,
        message: error?.message,
        fullError: error
      });
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  // Fallback to mailto if EmailJS fails
  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${formData.from_name}\nEmail: ${formData.from_email}\n\nMessage: ${formData.message}`
    );
    window.location.href = `mailto:${resumeData.personal_info.email}?subject=${subject}&body=${body}`;
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

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
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
            <MessageSquare className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              className="text-2xl font-bold mb-8 text-white flex items-center"
              variants={itemVariants}
            >
              <MapPin className="w-6 h-6 mr-2 text-blue-400" />
              Contact Information
            </motion.h3>

            <div className="space-y-6">
              {/* Email */}
              <motion.div
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600/20 to-blue-600/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <a
                      href={`mailto:${resumeData.personal_info.email}`}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {resumeData.personal_info.email}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-600/20 to-green-600/10 rounded-lg flex items-center justify-center border border-green-500/20">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Phone</p>
                    <a
                      href={`tel:${resumeData.personal_info.phone}`}
                      className="text-white hover:text-green-400 transition-colors"
                    >
                      {resumeData.personal_info.phone}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50"
                variants={cardVariants}
                whileHover="hover"
              >
                <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://www.linkedin.com/in/ibrahim-araj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600/20 to-blue-600/10 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-6 h-6 text-blue-400" />
                  </motion.a>
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-600/20 to-gray-600/10 rounded-lg border border-gray-500/20 hover:border-gray-500/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-6 h-6 text-gray-400" />
                  </motion.a>
                  <motion.a
                    href={resumeData.personal_info.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/20 to-purple-600/10 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-6 h-6 text-purple-400" />
                  </motion.a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-gray-700/50"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-400">Based in</p>
                    <p className="text-white">Morocco</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              className="text-2xl font-bold mb-8 text-white flex items-center"
              variants={itemVariants}
            >
              <Send className="w-6 h-6 mr-2 text-purple-400" />
              Send a Message
            </motion.h3>

            <motion.form
              ref={formRef}
              className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50"
              variants={cardVariants}
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors disabled:opacity-50"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors disabled:opacity-50"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="mt-4 p-3 bg-green-900/30 border border-green-500/30 rounded-lg text-green-400 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✅ Thank you! Your message has been sent successfully.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <div className="space-y-2">
                    <motion.div
                      className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      ❌ There was an error sending your message. 
                    </motion.div>
                    <motion.button
                      type="button"
                      onClick={handleMailtoFallback}
                      className="w-full bg-gray-700/50 text-gray-300 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-gray-600/50 border border-gray-600/50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      📧 Send via Email Client Instead
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
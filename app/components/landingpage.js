import React from 'react';
import { motion } from 'framer-motion';
import { Brain, FolderTree, Search, ArrowRight, Twitter, Linkedin, Github, ChevronDown } from 'lucide-react';
import Link from 'next/link';
function Herosection() {
  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your PDFs to extract key insights automatically, saving you hours of manual work",
      icon: <Brain className="w-8 h-8" />,
    },
    {
      title: "Smart Organization",
      description: "Intelligently categorize and structure your notes with AI-driven tagging and classification systems",
      icon: <FolderTree className="w-8 h-8" />,
    },
    {
      title: "Quick Search",
      description: "Find any information instantly with our powerful semantic search engine that understands context",
      icon: <Search className="w-8 h-8" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-900/90"></div>
        </div>
        
        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center px-4 md:px-6 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-violet-100 rounded-full text-violet-800 font-medium mb-6"
          >
            ✨ The Future of Document Intelligence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-center leading-tight mb-6 text-white max-w-4xl"
          >
            Transform Documents into 
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 text-transparent bg-clip-text"> Intelligent Insights</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-violet-100 text-center mb-12 max-w-2xl opacity-90"
          >
            Harness the power of AI to automatically analyze, organize, and
            extract powerful insights from your documents.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-6 items-center"
          >
           <Link href="sign-up">
           <button className="group bg-white text-indigo-900 px-8 py-4 rounded-full font-semibold hover:bg-violet-100 transition-all duration-300 flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
           </Link>
            <a href="#demo" className="text-white hover:text-violet-200 font-medium transition-colors flex items-center gap-2">
              Watch Demo
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-900 to-violet-900 text-transparent bg-clip-text"
            >
              Powerful Features for Modern Document Management
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Experience the next generation of document processing with our cutting-edge AI technology
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-white border border-violet-100 hover:border-violet-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center mb-6 text-indigo-600">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-indigo-900 to-violet-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
          >
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-8 h-8 text-violet-400" />
                <span className="text-2xl font-bold">Nota AI</span>
              </div>
              <p className="text-violet-200 text-lg">
                Transform your document workflow with AI-powered intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Product</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#features" className="text-violet-200 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-violet-200 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#use-cases" className="text-violet-200 hover:text-white transition-colors">
                    Use Cases
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Connect</h4>
              <div className="flex gap-4">
                <motion.a 
                  whileHover={{ scale: 1.1 }}
                  href="#" 
                  className="text-violet-200 hover:text-white transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1 }}
                  href="#" 
                  className="text-violet-200 hover:text-white transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1 }}
                  href="#" 
                  className="text-violet-200 hover:text-white transition-colors"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
          <div className="border-t border-violet-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-violet-200 mb-4 md:mb-0">
              © 2025 Nota AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#privacy" className="text-violet-200 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-violet-200 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Herosection;
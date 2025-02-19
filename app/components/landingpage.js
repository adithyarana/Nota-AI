import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS


const HeroSection = () => {
  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your PDFs to extract key insights automatically, saving you hours of manual work",
      icon: "fa-solid fa-brain",
    },
    {
      title: "Smart Organization",
      description: "Intelligently categorize and structure your notes with AI-driven tagging and classification systems",
      icon: "fa-solid fa-folder-tree",
    },
    {
      title: "Quick Search",
      description: "Find any information instantly with our powerful semantic search engine that understands context",
      icon: "fa-solid fa-magnifying-glass",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section with improved styling */}
      <section className="relative w-full h-screen">
        {/* Banner container with overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img
            src="/banner.jpg"
            className="w-full h-full object-cover"
            alt="Hero background"
          />
        </div>

        {/* Content container with improved positioning and spacing */}
        <div className="relative z-20 container mx-auto h-full flex items-center px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Transform Your PDFs into Smart Notes with AI
            </h1>
            <p className="text-xl md:text-2xl text-black mb-8">
              Unlock the power of AI to automatically analyze, organize, and
              extract insights from your PDF documents.
            </p>
            <div className="flex gap-4">
              <a href="/sign-in">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg transition-all duration-300 transform hover:scale-105">
                  Get Started Free
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with improved styling */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Powerful Features for Smart Document Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-600"
              >
                <i className={`${feature.icon} text-4xl text-blue-600 mb-6`}></i>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with improved styling */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <i className="fa-solid fa-book-open-reader text-3xl text-blue-500"></i>
                <span className="text-2xl font-bold">Nota AI</span>
              </div>
              <p className="text-gray-400 text-lg">
                Transform your document workflow with AI-powered intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Product</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#use-cases" className="text-gray-400 hover:text-white transition-colors">
                    Use Cases
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white text-2xl transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Nota AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;
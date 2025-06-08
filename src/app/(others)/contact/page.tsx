import React from 'react';
import { Footer } from '@/components/home/Footer';
import { Mail, Linkedin, Github, MessageCircle, Send } from 'lucide-react';
import { Header } from '@/components/home/Header';

function Contact() {
  return (
    <>
  <Header/>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="w-full h-[50vh] flex items-center justify-center bg-gradient-to-r from-zinc-700 to-zinc-950 text-white text-center p-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-purple-100 text-sm font-medium mb-6">
              <MessageCircle size={16} className="mr-2" />
              Let's Connect
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Contact Me</h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Let's connect and build something amazing together. 
              I'm always excited to discuss new opportunities and ideas.
            </p>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="max-w-6xl mx-auto py-20 px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Feel free to reach out to me through any of the following platforms. 
              I'd love to hear about your projects and how we can work together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Email Card */}
            <a 
              href="mailto:av0082018@gmail.com" 
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 text-center hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Email Me
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                av0082018@gmail.com
              </p>
              <div className="mt-4 inline-flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all">
                Send Message <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* LinkedIn Card */}
            <a 
              href="https://www.linkedin.com/in/ashish-verma-16b525238?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 text-center hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Linkedin size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                LinkedIn
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                Professional Network
              </p>
              <div className="mt-4 inline-flex items-center text-blue-700 font-semibold group-hover:gap-3 transition-all">
                Connect Now <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* GitHub Card */}
            <a 
              href="https://github.com/ashish0082018" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-300 text-center hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Github size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                GitHub
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                Code Repository
              </p>
              <div className="mt-4 inline-flex items-center text-gray-800 font-semibold group-hover:gap-3 transition-all">
                View Projects <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center bg-gradient-to-r from-zinc-600 to-zinc-950 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Whether you need a custom profile, web application, or just want to chat about technology, 
              I'm here to help bring your ideas to life.
            </p>
            <a
              href="mailto:av0082018@gmail.com"
              className="inline-flex items-center px-8 py-4 bg-white text-zinc-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start a Conversation
              <Send size={20} className="ml-2" />
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
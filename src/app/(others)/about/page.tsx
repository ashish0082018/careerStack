import React from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="w-full h-[60vh] flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center p-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          </div>
          
          <div className="max-w-4xl relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Profile<span className="text-purple-200">X</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-purple-100 leading-relaxed max-w-3xl mx-auto">
              ProfileX is your personal online hub. Create a custom profile page  
              where you can showcase your skills, connect your social platforms,
              and share your unique story with the world in just one click.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-6xl mx-auto py-20 px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Building the Future of 
            <span className="block text-purple-600">Professional Profiles</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We strive to build high-quality, user-friendly web applications that solve real-world problems 
            and create meaningful connections. Our platform empowers professionals to showcase their best selves 
            and build lasting digital relationships.
          </p>
        </section>

        {/* About Me Section */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the passionate team behind ProfileX
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-gray-100 hover:shadow-3xl transition-all duration-300">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex justify-center items-center overflow-hidden mb-8 ring-4 ring-purple-100 hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-cover bg-center rounded-full" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")'}}></div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Ashish Verma</h3>
            <p className="text-lg text-purple-600 font-semibold mb-6">Web Developer & Designer</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto text-lg">
              Passionate about creating beautiful, functional web experiences that make a difference. 
              With years of experience in modern web technologies, I'm dedicated to building platforms 
              that empower people to connect and grow professionally.
            </p>
          </div>
        </section>

        {/* Skills/Technologies Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Built with Modern Technologies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                <div key={tech} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl font-bold text-white">{tech}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default About;
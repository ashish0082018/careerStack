import React from 'react';
import { Footer } from '@/components/home/Footer';
import { Header } from '@/components/home/Header';
import Image from 'next/image';

function About() {
  return (
    <>
    <Header/>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="w-full h-[60vh] flex flex-col items-center justify-center bg-gradient-to-r from-zinc-700 to-zinc-950 text-white text-center p-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          </div>
          
          <div className="max-w-4xl relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Career<span className="text-zinc-200">Stack</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-purple-100 leading-relaxed max-w-3xl mx-auto">
              The all-in-one platform for developers to build, optimize, and showcase their professional identity
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
            Revolutionizing how developers
            <span className="block text-purple-600">manage their careers</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            CareerStack empowers developers to take control of their professional narrative with powerful tools for profile building, 
            project showcasing, and resume optimization - all in one place with complete privacy control.
          </p>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build your perfect professional profile
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Profile Builder</h3>
              <p className="text-gray-600 leading-relaxed">
                Create a stunning profile with AI-powered suggestions for your bio and skills. 
                Toggle visibility between public and private modes with one click.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Showcase</h3>
              <p className="text-gray-600 leading-relaxed">
                Highlight your best work with customizable project cards. 
                Organize with drag-and-drop and add detailed tech stack information.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">GitHub Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically display your GitHub activity, pinned repositories, 
                and contribution graphs to showcase your coding journey.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Resume Optimizer</h3>
              <p className="text-gray-600 leading-relaxed">
                Get AI-powered suggestions to improve your resume and export 
                it in multiple formats tailored for different job applications.
              </p>
            </div>
          </div>
        </section>

        {/* About Creator Section */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Creator</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with passion by a developer for developers
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-gray-100 hover:shadow-3xl transition-all duration-300">
<div className="w-32 h-32 mx-auto rounded-full bg-white flex justify-center items-center overflow-hidden mb-8 ring-4 ring-purple-100 hover:scale-105 transition-transform duration-300">
  <Image
    src="/icons/profilepic.jpg"
    alt="Ashish Verma"
    width={128}
    height={128}
    className="object-cover w-full h-full"
  />
</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Ashish Verma</h3>
            <p className="text-lg text-purple-600 font-semibold mb-6">Full Stack Developer</p>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto text-lg">
              I built CareerStack to solve the pain points I experienced as a developer trying to manage multiple professional profiles. 
              This project combines my passion for clean design with robust functionality to help developers present their best selves.
            </p>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="bg-gradient-to-r from-zinc-600 to-zinc-950 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Powered By Modern Technologies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Next.js', 'TypeScript','GraphQL', 'Tailwind CSS', 'Gemini API', 'NextAuth', 'PrismaORM','SupaBase'].map((tech) => (
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
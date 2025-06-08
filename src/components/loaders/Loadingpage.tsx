"use client";
import { useEffect, useState } from 'react';
import { Code, Zap, Github, User, BarChart3, FileText } from 'lucide-react';

export const Loadingpage = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading');

  const icons = [Code, Zap, Github, User, BarChart3, FileText];
  const loadingMessages = [
    'Loading your workspace...',
    'Syncing your data...',
    'Almost ready...'
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 600);

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 1500);

    return () => {
      clearInterval(iconInterval);
      clearInterval(textInterval);
    };
  }, []);

  const CurrentIcon = icons[currentIcon];

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative text-center">

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 animate-fade-in">
            {loadingText}
          </h2>
          <p className="text-muted-foreground">
            Setting up your developer workspace
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-8">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse" style={{
              width: '100%',
              animation: 'loading-progress 2s ease-in-out infinite'
            }}></div>
          </div>
        </div>

  


        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
              style={{
                animationDelay: `${dot * 0.2}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes loading-progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
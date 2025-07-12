"use client"
import React from 'react';
import { Stethoscope } from 'lucide-react';

const LoadingAnimation = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">        
        <div className="flex gap-4">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="w-4 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-lg"
              style={{
                animation: `moveUpDown 1s ease-in-out ${i * 0.1}s infinite alternate`,
                filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'
              }}
            />
          ))}
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <div className="text-blue-600 font-medium text-lg">
           Loading...
          </div>
          <div className="flex gap-1">
            <span className="animate-pulse delay-100">.</span>
            <span className="animate-pulse delay-200">.</span>
            <span className="animate-pulse delay-300">.</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveUpDown {
          0% { transform: scaleY(0.5); opacity: 0.3; }
          100% { transform: scaleY(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
import React from 'react';
import { cn } from '@/lib/utils';

interface BrainLoadingProps {
  isVisible: boolean;
  className?: string;
}

export function BrainLoading({ isVisible, className }: BrainLoadingProps) {
  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center",
      "transition-all duration-500",
      isVisible ? "opacity-100" : "opacity-0",
      className
    )}>
      {/* Ripple Effect Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="ripple-container">
          <div className="ripple ripple-1"></div>
          <div className="ripple ripple-2"></div>
          <div className="ripple ripple-3"></div>
          <div className="ripple ripple-4"></div>
        </div>
      </div>

      <div className="relative w-full h-80 flex items-center justify-center">
        {/* Enhanced Brain Animation Container */}
        <div className="brain-orbit-container">
          {/* Outer Glow Ring */}
          <div className="outer-glow-ring"></div>
          
          {/* Middle Pulse Ring */}
          <div className="middle-pulse-ring"></div>
          
          {/* Color Changing Outline Loader */}
          <div className="color-changing-outline">
            <div className="outline-shape shape-1"></div>
            <div className="outline-shape shape-2"></div>
            <div className="outline-shape shape-3"></div>
            <div className="outline-shape shape-4"></div>
            <div className="outline-shape shape-5"></div>
            <div className="outline-shape shape-6"></div>
            <div className="outline-shape shape-7"></div>
            <div className="outline-shape shape-8"></div>
          </div>

          {/* Inner Brain Orbit */}
          <div className="brain-orbit">
            <img 
              src="https://tse2.mm.bing.net/th/id/OIP.ud7CT9D_mQJgTwM9qowUQgHaHa?w=740&h=740&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Loading Brain"
              className="h-32 w-32 object-contain"
              style={{
                animation: 'brainRevolve 1.2s linear infinite, brainPulse 2s ease-in-out infinite'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
            <div 
              className="h-32 w-32 flex items-center justify-center text-8xl"
              style={{ display: 'none' }}
            >
              🧠
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Loading Text with Typing Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-32">
        <div className="loading-text-container">
          <p className="text-lg font-semibold text-primary animate-pulse">
            <span className="typing-text">Loading MindMatters</span>
            <span className="typing-dots">...</span>
          </p>
        </div>
      </div>
      
      <style jsx>{`
        /* Ripple Effect Animations */
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes ripple2 {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        
        @keyframes ripple3 {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        @keyframes ripple4 {
          0% {
            transform: scale(0);
            opacity: 0.4;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        /* Brain Animation */
        @keyframes brainRevolve {
          0% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.05);
          }
          50% {
            transform: rotate(180deg) scale(1);
          }
          75% {
            transform: rotate(270deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        
        @keyframes brainPulse {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(59, 130, 246, 1)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.6));
          }
        }
        
        @keyframes outerGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }
        
        @keyframes middlePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        
        @keyframes typingDots {
          0%, 20% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        
        /* Color Changing Outline Animations */
        @keyframes colorChange1 {
          0% { background: linear-gradient(45deg, #3B82F6, #8B5CF6); }
          25% { background: linear-gradient(45deg, #8B5CF6, #EC4899); }
          50% { background: linear-gradient(45deg, #EC4899, #F59E0B); }
          75% { background: linear-gradient(45deg, #F59E0B, #10B981); }
          100% { background: linear-gradient(45deg, #10B981, #3B82F6); }
        }
        
        @keyframes colorChange2 {
          0% { background: linear-gradient(45deg, #8B5CF6, #EC4899); }
          25% { background: linear-gradient(45deg, #EC4899, #F59E0B); }
          50% { background: linear-gradient(45deg, #F59E0B, #10B981); }
          75% { background: linear-gradient(45deg, #10B981, #3B82F6); }
          100% { background: linear-gradient(45deg, #3B82F6, #8B5CF6); }
        }
        
        @keyframes colorChange3 {
          0% { background: linear-gradient(45deg, #EC4899, #F59E0B); }
          25% { background: linear-gradient(45deg, #F59E0B, #10B981); }
          50% { background: linear-gradient(45deg, #10B981, #3B82F6); }
          75% { background: linear-gradient(45deg, #3B82F6, #8B5CF6); }
          100% { background: linear-gradient(45deg, #8B5CF6, #EC4899); }
        }
        
        @keyframes colorChange4 {
          0% { background: linear-gradient(45deg, #F59E0B, #10B981); }
          25% { background: linear-gradient(45deg, #10B981, #3B82F6); }
          50% { background: linear-gradient(45deg, #3B82F6, #8B5CF6); }
          75% { background: linear-gradient(45deg, #8B5CF6, #EC4899); }
          100% { background: linear-gradient(45deg, #EC4899, #F59E0B); }
        }
        
        @keyframes outlinePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        
        @keyframes shapeGrow {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          20% {
            transform: scale(1);
            opacity: 1;
          }
          80% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes shapeGrow2 {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          25% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          75% {
            transform: scale(1.3);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        
        /* Ripple Container */
        .ripple-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
        }
        
        .ripple {
          position: absolute;
          border: 2px solid rgba(59, 130, 246, 0.6);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .ripple-1 {
          width: 100px;
          height: 100px;
          animation: ripple 2s infinite;
        }
        
        .ripple-2 {
          width: 100px;
          height: 100px;
          animation: ripple2 2s infinite 0.5s;
        }
        
        .ripple-3 {
          width: 100px;
          height: 100px;
          animation: ripple3 2s infinite 1s;
        }
        
        .ripple-4 {
          width: 100px;
          height: 100px;
          animation: ripple4 2s infinite 1.5s;
        }
        
        /* Brain Orbit Container */
        .brain-orbit-container {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .outer-glow-ring {
          position: absolute;
          width: 280px;
          height: 280px;
          border: 3px solid rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          animation: outerGlow 3s ease-in-out infinite;
        }
        
        .middle-pulse-ring {
          position: absolute;
          width: 240px;
          height: 240px;
          border: 2px solid rgba(59, 130, 246, 0.5);
          border-radius: 50%;
          animation: middlePulse 2s ease-in-out infinite;
        }
        
        .brain-orbit {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .brain-orbit img {
          transition: all 0.3s ease;
          animation-timing-function: linear;
        }
        
        .brain-orbit:hover img {
          transform: scale(1.1);
        }
        
        /* Color Changing Outline */
        .color-changing-outline {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .outline-shape {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          animation: shapeGrow 2s ease-out infinite;
        }
        
        .shape-1 {
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          animation: colorChange1 3s linear infinite, shapeGrow 2s ease-out infinite;
        }
        
        .shape-2 {
          top: 12.5%;
          right: 12.5%;
          animation: colorChange2 3s linear infinite 0.375s, shapeGrow2 2.5s ease-out infinite 0.2s;
        }
        
        .shape-3 {
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          animation: colorChange3 3s linear infinite 0.75s, shapeGrow 2s ease-out infinite 0.4s;
        }
        
        .shape-4 {
          bottom: 12.5%;
          right: 12.5%;
          animation: colorChange4 3s linear infinite 1.125s, shapeGrow2 2.5s ease-out infinite 0.6s;
        }
        
        .shape-5 {
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          animation: colorChange1 3s linear infinite 1.5s, shapeGrow 2s ease-out infinite 0.8s;
        }
        
        .shape-6 {
          bottom: 12.5%;
          left: 12.5%;
          animation: colorChange2 3s linear infinite 1.875s, shapeGrow2 2.5s ease-out infinite 1s;
        }
        
        .shape-7 {
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          animation: colorChange3 3s linear infinite 2.25s, shapeGrow 2s ease-out infinite 1.2s;
        }
        
        .shape-8 {
          top: 12.5%;
          left: 12.5%;
          animation: colorChange4 3s linear infinite 2.625s, shapeGrow2 2.5s ease-out infinite 1.4s;
        }
        
        /* Loading Text */
        .loading-text-container {
          text-align: center;
        }
        
        .typing-dots {
          animation: typingDots 1.5s infinite;
        }
        
        .typing-dots::after {
          content: '';
          animation: typingDots 1.5s infinite 0.2s;
        }
        
        .typing-dots::before {
          content: '';
          animation: typingDots 1.5s infinite 0.4s;
        }
      `}</style>
    </div>
  );
}

export default BrainLoading;

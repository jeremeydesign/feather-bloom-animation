import { useState, useRef, useCallback } from "react";
import ploomLogo from "@/assets/ploom-logo.svg";

const LogoGradientHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePos({ x, y });
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base logo (visible when not hovering) */}
      <img
        src={ploomLogo}
        alt="Ploom Logo"
        className={`w-48 h-auto transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Gradient overlay logo (visible when hovering) */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{
          maskImage: `url(${ploomLogo})`,
          WebkitMaskImage: `url(${ploomLogo})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, var(--gradient-start) 0%, var(--gradient-end) 50%, var(--gradient-start) 100%)`,
          backgroundSize: '200% 200%',
          animation: isHovering ? 'gradientPulse 2s ease-in-out infinite' : 'none',
          '--gradient-start': '#DD8477',
          '--gradient-end': '#5E96A8',
        } as React.CSSProperties}
      />
    </div>
  );
};

export default LogoGradientHover;

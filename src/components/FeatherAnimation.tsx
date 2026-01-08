import { useState, useCallback, useRef } from "react";
import ploomLogo from "@/assets/ploom-logo.svg";

interface Feather {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  driftX: number;
  endRotation: number;
  opacity: number;
}

const FeatherSVG = ({ id }: { id: number }) => (
  <svg
    width="33"
    height="32"
    viewBox="0 0 330.86 318.4"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id={`featherGradient-${id}`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#DE8F71" />
        <stop offset="100%" stopColor="#A66D91" />
      </linearGradient>
    </defs>
    <path
      d="M14.13,309.46c-4.19,3.76-8.55,7.01-14.13,8.94,9.32-28.08,15.77-41.73,29.5-67.29l-16.38-13.32,10.32-.54c1.31-.07,3.74-.88,4.56-1.77,4.96-5.34-6.95-10.19-2.24-29.65,4.13-17.08,8.92-32.93,16.85-48.75,29.2-58.23,84.87-90.01,146.34-109.8-.4,10.47.1,19.81,2.42,29.51,1.14-11.72,1.72-21.02,4.09-32.05l53.66-15c22.35-6.25,59.19-13.82,76.43-29.74,24.37,61.07-40.72,126.39-83.9,161.59l-40.52-4.01c-10.87-1.08-21.04-2.84-31.99-4.85,25.41,12.29,38.12,10.41,65.9,13.81-25.76,20.99-52.68,38.45-81.56,54.19-15.67,8.54-31.01,16.17-48.51,19.94-21.31,4.58-37.48-5.24-43.27-2.17-1.36.72-2.6,5.24-1.2,6.69l16.87,17.42c-14.27,2.47-27.5-.41-40.33-6.16-11.53,20.91-15.4,30-22.89,53.03ZM104.46,154.55c32.34-29.36,68.77-53.12,109.22-69.6l26.36-10.74c6.11-2.49,12.02-5.18,17.67-8.36-64.71,21.29-127.26,56.5-173.12,107.19,7.9-5.18,13.07-12.09,19.87-18.49Z"
      fill={`url(#featherGradient-${id})`}
    />
  </svg>
);

const FeatherAnimation = () => {
  const [feathers, setFeathers] = useState<Feather[]>([]);
  const [featherCounter, setFeatherCounter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateFeathers = useCallback((mouseX: number, mouseY: number) => {
    const count = Math.floor(Math.random() * 3) + 3; // 3-5 feathers
    const newFeathers: Feather[] = [];

    for (let i = 0; i < count; i++) {
      newFeathers.push({
        id: featherCounter + i,
        x: mouseX + (Math.random() * 20 - 10),
        y: mouseY + (Math.random() * 20 - 10),
        scale: 0.4 + Math.random() * 0.3,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2,
        driftX: (Math.random() - 0.5) * 80,
        endRotation: Math.random() * 90 - 45,
        opacity: 0.5 + Math.random() * 0.5,
      });
    }

    setFeatherCounter((prev) => prev + count);
    setFeathers((prev) => [...prev, ...newFeathers]);
  }, [featherCounter]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Throttle feather generation - only create new ones occasionally
    if (Math.random() > 0.85) {
      generateFeathers(mouseX, mouseY);
    }
  }, [generateFeathers]);

  const handleMouseLeave = () => {
    // Feathers will fade out via CSS animation
    setTimeout(() => setFeathers([]), 1500);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Feathers behind the logo */}
      <div className="absolute inset-0 overflow-visible z-0">
        {feathers.map((feather) => (
          <div
            key={feather.id}
            className="absolute pointer-events-none animate-feather-float"
            style={{
              left: feather.x,
              top: feather.y,
              transform: `translate(-50%, -50%) scale(${feather.scale}) rotate(${feather.rotation}deg)`,
              animationDelay: `${feather.delay}s`,
              "--drift-x": `${feather.driftX}px`,
              "--end-rotation": `${feather.endRotation}deg`,
              "--base-opacity": feather.opacity,
            } as React.CSSProperties}
          >
            <FeatherSVG id={feather.id} />
          </div>
        ))}
      </div>

      {/* Logo on top */}
      <img
        src={ploomLogo}
        alt="Ploom Logo"
        className="w-48 h-auto relative z-10 transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default FeatherAnimation;

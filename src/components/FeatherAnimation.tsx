import { useState, useCallback, useRef } from "react";
import ploomLogo from "@/assets/ploom-logo.svg";
import featherSvg from "@/assets/feather.svg";

interface Feather {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  driftX: number;
  endRotation: number;
}

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
        scale: 0.08 + Math.random() * 0.06,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2,
        driftX: (Math.random() - 0.5) * 80,
        endRotation: Math.random() * 90 - 45,
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
          <img
            key={feather.id}
            src={featherSvg}
            alt=""
            className="absolute pointer-events-none animate-feather-float w-auto h-auto"
            style={{
              left: feather.x,
              top: feather.y,
              transform: `translate(-50%, -50%) scale(${feather.scale}) rotate(${feather.rotation}deg)`,
              animationDelay: `${feather.delay}s`,
              "--drift-x": `${feather.driftX}px`,
              "--end-rotation": `${feather.endRotation}deg`,
            } as React.CSSProperties}
          />
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

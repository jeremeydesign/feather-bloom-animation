import { useState, useCallback } from "react";
import ploomLogo from "@/assets/ploom-logo.svg";

interface Feather {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  gradientPosition: number;
  driftX: number;
  endRotation: number;
}

const FeatherSVG = ({ gradientPosition }: { gradientPosition: number }) => (
  <svg
    width="24"
    height="40"
    viewBox="0 0 24 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id={`featherGradient-${gradientPosition}`}
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
      d="M12 0C12 0 4 8 4 20C4 32 12 40 12 40C12 40 20 32 20 20C20 8 12 0 12 0Z"
      fill={`url(#featherGradient-${gradientPosition})`}
    />
    <path
      d="M12 5V35"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const FeatherAnimation = () => {
  const [feathers, setFeathers] = useState<Feather[]>([]);
  const [featherCounter, setFeatherCounter] = useState(0);

  const generateFeathers = useCallback(() => {
    const count = Math.floor(Math.random() * 3) + 3; // 3-5 feathers
    const newFeathers: Feather[] = [];

    for (let i = 0; i < count; i++) {
      newFeathers.push({
        id: featherCounter + i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 40 - 20,
        scale: 0.5 + Math.random() * 0.8,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.3,
        gradientPosition: Math.random(),
        driftX: (Math.random() - 0.5) * 80,
        endRotation: Math.random() * 90 - 45,
      });
    }

    setFeatherCounter((prev) => prev + count);
    setFeathers(newFeathers);
  }, [featherCounter]);

  const handleMouseLeave = () => {
    // Feathers will fade out via CSS animation
    setTimeout(() => setFeathers([]), 1500);
  };

  return (
    <div
      className="relative inline-block cursor-pointer"
      onMouseEnter={generateFeathers}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={ploomLogo}
        alt="Ploom Logo"
        className="w-48 h-auto transition-transform duration-300 hover:scale-105"
      />

      {feathers.map((feather) => (
        <div
          key={feather.id}
          className="absolute pointer-events-none animate-feather-float"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate(${feather.x}px, ${feather.y}px) scale(${feather.scale}) rotate(${feather.rotation}deg)`,
            animationDelay: `${feather.delay}s`,
            "--drift-x": `${feather.driftX}px`,
            "--end-rotation": `${feather.endRotation}deg`,
          } as React.CSSProperties}
        >
          <FeatherSVG gradientPosition={feather.gradientPosition} />
        </div>
      ))}
    </div>
  );
};

export default FeatherAnimation;

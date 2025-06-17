import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "h-8 w-8", 
  width = 32, 
  height = 32 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Graduation cap */}
      <path
        d="M160 80 L280 100 L240 120 L180 140 L175 135 Q175 125 185 125 Q195 125 195 135 Q195 145 185 145 Q175 145 175 135 L160 80 Z"
        fill="#4ADE80"
      />
      
      {/* Main checkmark/victory shape */}
      <path
        d="M100 140 Q150 180 200 220 L240 320 L220 340 Q180 280 140 240 Q120 220 100 200 L100 140 Z"
        fill="#4ADE80"
      />
      
      {/* Secondary checkmark element */}
      <path
        d="M240 320 L360 120 Q380 100 400 80 L380 100 Q340 140 300 180 L280 200 Q260 240 240 280 L240 320 Z"
        fill="#059669"
      />
      
      {/* Connecting element */}
      <path
        d="M200 220 L280 200 L300 180 Q280 200 260 220 Q240 240 220 260 L200 220 Z"
        fill="#10B981"
      />
    </svg>
  );
};
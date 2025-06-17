import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "h-8 w-8", 
  width, 
  height 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Graduation cap */}
      <path
        d="M40 20 L70 25 L60 30 L45 35 L44 34 Q44 31 46 31 Q48 31 48 34 Q48 36 46 36 Q44 36 44 34 L40 20 Z"
        fill="#4ADE80"
      />
      
      {/* Main checkmark/victory shape */}
      <path
        d="M25 35 Q37 45 50 55 L60 80 L55 85 Q45 70 35 60 Q30 55 25 50 L25 35 Z"
        fill="#4ADE80"
      />
      
      {/* Secondary checkmark element */}
      <path
        d="M60 80 L90 30 Q95 25 100 20 L95 25 Q85 35 75 45 L70 50 Q65 60 60 70 L60 80 Z"
        fill="#059669"
      />
      
      {/* Connecting element */}
      <path
        d="M50 55 L70 50 L75 45 Q70 50 65 55 Q60 60 55 65 L50 55 Z"
        fill="#10B981"
      />
    </svg>
  );
};
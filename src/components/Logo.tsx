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
    <img
      src="/3-removebg-preview copy.png"
      alt="eJAMB Logo"
      width={width}
      height={height}
      className={className}
      style={{
        objectFit: 'contain',
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  );
};
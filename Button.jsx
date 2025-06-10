// src/components/Button.jsx
import React from 'react';

const Button = ({ text, color = 'accent', size = 'md', onClick }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Fallback for accent color if not in Tailwind config
  const colorClass =
    color === 'accent'
      ? 'bg-[#ff7945] hover:bg-primary'
      : `bg-${color} hover:bg-primary`;

  return (
    <button
      className={`${colorClass} text-white rounded-md transition-colors ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
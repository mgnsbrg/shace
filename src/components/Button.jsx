import React from 'react';

const Button = ({ text, color = 'accent', size = 'md', onClick, disabled = false, type = 'button' }) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const colorClasses = {
    accent: 'bg-accent hover:bg-primary text-white',
    primary: 'bg-primary hover:bg-accent text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
  };

  return (
    <button
      type={type}
      className={`${colorClasses[color]} ${sizeClasses[size]} rounded-lg transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
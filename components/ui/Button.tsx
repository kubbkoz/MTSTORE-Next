import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Added font-sans to ensure Montserrat
  const baseStyles = "inline-flex items-center justify-center font-semibold font-sans transition-all duration-300 rounded-none tracking-wide";
  
  const variants = {
    primary: "bg-brand hover:bg-brand-dark text-white border border-transparent shadow-lg hover:shadow-brand/50",
    outline: "bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-white",
    ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
    white: "bg-white text-black hover:bg-gray-200 border border-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
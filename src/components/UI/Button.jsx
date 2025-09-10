import React, { useState } from 'react';

const Button = ({
                    children,
                    onClick,
                    variant = 'primary',
                    disabled = false,
                    className = '',
                    icon: Icon
                }) => {
    const [isClicked, setIsClicked] = useState(false);

    const variants = {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/25',
        success: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 shadow-lg shadow-green-500/25',
        danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-500/25',
        warning: 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 shadow-lg shadow-yellow-500/25'
    };

    const handleClick = () => {
        if (!disabled) {
            setIsClicked(true);
            onClick?.();
            setTimeout(() => setIsClicked(false), 200);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`
                ${variants[variant]}
                disabled:bg-gradient-to-r disabled:from-gray-600 disabled:to-gray-700 
                disabled:cursor-not-allowed disabled:shadow-none
                px-6 py-3 rounded-xl font-bold text-white
                transition-all duration-300 flex items-center justify-center
                transform hover:scale-105 hover:shadow-xl
                active:scale-95 active:shadow-inner
                relative overflow-hidden
                ${isClicked ? 'animate-celebrate' : ''}
                ${className}
            `}
        >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                           -translate-x-full hover:translate-x-full transition-transform duration-700" />
            
            {/* Icon with animation */}
            {Icon && (
                <Icon className={`mr-2 w-5 h-5 transition-all duration-300 ${
                    isClicked ? 'animate-bounce' : 'group-hover:animate-pulse'
                }`} />
            )}
            
            {/* Button text */}
            <span className="relative z-10">{children}</span>
            
            {/* Ripple effect on click */}
            {isClicked && (
                <div className="absolute inset-0 bg-white/30 rounded-xl animate-ping" />
            )}
        </button>
    );
};

export default Button;
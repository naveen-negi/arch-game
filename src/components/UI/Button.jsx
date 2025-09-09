import React from 'react';

const Button = ({
                    children,
                    onClick,
                    variant = 'primary',
                    disabled = false,
                    className = '',
                    icon: Icon
                }) => {
    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-700',
        success: 'bg-green-600 hover:bg-green-700',
        danger: 'bg-red-600 hover:bg-red-700',
        warning: 'bg-yellow-600 hover:bg-yellow-700'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        ${variants[variant]}
        disabled:bg-gray-600 disabled:cursor-not-allowed
        px-4 py-2 rounded-lg font-semibold
        transition-colors flex items-center
        ${className}
      `}
        >
            {Icon && <Icon className="mr-2 w-5 h-5" />}
            {children}
        </button>
    );
};

export default Button;
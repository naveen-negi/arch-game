import React from 'react';

const Card = ({ children, className = '', title, icon: Icon }) => {
    return (
        <div className={`bg-gray-800 rounded-lg p-4 border border-gray-700 ${className}`}>
            {title && (
                <div className="flex items-center mb-4">
                    {Icon && <Icon className="w-5 h-5 mr-2 text-blue-400" />}
                    <h3 className="text-lg font-bold text-blue-400">{title}</h3>
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
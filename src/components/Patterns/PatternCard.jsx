import React from 'react';

const PatternCard = ({ pattern, selected, onSelect, disabled }) => {
    return (
        <div
            onClick={() => !disabled && onSelect(pattern)}
            className={`
        p-3 rounded cursor-pointer transition-all
        ${selected ? 'bg-blue-900 border-blue-500' : 'bg-gray-700 hover:bg-gray-600'}
        border ${disabled ? 'opacity-50 cursor-not-allowed' : 'border-gray-600'}
      `}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <pattern.icon className="w-5 h-5" />
                    <span className="font-semibold">{pattern.name}</span>
                </div>
                <span className="text-sm text-yellow-400">{pattern.cost} AP</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{pattern.restaurant}</p>
        </div>
    );
};

export default PatternCard;
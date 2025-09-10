import React, { useState } from 'react';
import { Sparkles, Star, Zap } from 'lucide-react';

const PatternCard = ({ pattern, selected, onSelect, disabled }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (!disabled) {
            setIsClicked(true);
            onSelect(pattern);
            // Reset click animation after a short delay
            setTimeout(() => setIsClicked(false), 300);
        }
    };

    const getPatternGradient = () => {
        if (selected) return 'from-blue-600 to-purple-600';
        if (pattern.category === 'resilience') return 'from-green-600 to-teal-600';
        if (pattern.category === 'performance') return 'from-orange-600 to-red-600';
        if (pattern.category === 'scaling') return 'from-purple-600 to-pink-600';
        return 'from-gray-600 to-gray-700';
    };

    const getAffordabilityIcon = () => {
        if (disabled) return '💸';
        if (pattern.cost <= 5) return '💰';
        if (pattern.cost <= 10) return '💎';
        return '👑';
    };

    return (
        <div
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative p-4 rounded-xl cursor-pointer transition-all duration-300 group
                border-2 backdrop-blur-sm overflow-hidden
                ${selected 
                    ? 'bg-gradient-to-br from-blue-900/70 to-purple-900/70 border-blue-400 animate-pulse-glow' 
                    : `bg-gradient-to-br ${getPatternGradient()}/20 border-gray-600 hover:border-gray-400`
                }
                ${disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover-lift hover:scale-105'
                }
                ${isClicked ? 'animate-celebrate' : ''}
                ${isHovered && !disabled ? 'animate-wiggle' : ''}
            `}
        >
            {/* Sparkle effects for hovered/selected cards */}
            {(isHovered || selected) && !disabled && (
                <div className="absolute inset-0 pointer-events-none">
                    <Sparkles className="absolute top-2 right-2 w-4 h-4 text-yellow-400 animate-bounce" style={{animationDelay: '0s'}} />
                    <Sparkles className="absolute bottom-2 left-2 w-3 h-3 text-blue-400 animate-bounce" style={{animationDelay: '0.5s'}} />
                    <Star className="absolute top-1/2 left-1/4 w-2 h-2 text-purple-400 animate-bounce" style={{animationDelay: '0.3s'}} />
                </div>
            )}

            {/* Glow effect */}
            {selected && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl animate-pulse" />
            )}

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                            selected ? 'bg-blue-500/30' : 'bg-white/10'
                        } ${isHovered ? 'animate-float' : ''}`}>
                            <pattern.icon className={`w-6 h-6 transition-all duration-300 ${
                                selected ? 'text-blue-300' : 'text-gray-300'
                            } ${isHovered ? 'scale-110' : ''}`} />
                        </div>
                        <div>
                            <span className={`font-bold text-lg transition-all duration-300 ${
                                selected ? 'text-blue-300' : 'text-white'
                            }`}>
                                {pattern.name}
                            </span>
                            {pattern.expertiseRequired > 3 && (
                                <div className="flex items-center mt-1">
                                    <Zap className="w-3 h-3 text-yellow-400 mr-1" />
                                    <span className="text-xs text-yellow-400 font-semibold">Expert Level</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-2xl transition-all duration-300 ${
                            isHovered ? 'animate-bounce' : ''
                        }`}>
                            {getAffordabilityIcon()}
                        </div>
                        <span className={`text-sm font-bold transition-all duration-300 ${
                            disabled ? 'text-red-400' : 'text-yellow-400'
                        } ${isHovered ? 'animate-pulse' : ''}`}>
                            {pattern.cost} AP
                        </span>
                    </div>
                </div>

                <p className="text-sm text-gray-300 mb-2 line-clamp-2">{pattern.description}</p>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        {[...Array(pattern.strength || 5)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                selected ? 'bg-blue-400' : 'bg-gray-400'
                            } ${isHovered ? 'animate-pulse' : ''}`} 
                            style={{animationDelay: `${i * 0.1}s`}} />
                        ))}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold transition-all duration-300 ${
                        pattern.category === 'resilience' ? 'bg-green-900/50 text-green-300' :
                        pattern.category === 'performance' ? 'bg-orange-900/50 text-orange-300' :
                        pattern.category === 'scaling' ? 'bg-purple-900/50 text-purple-300' :
                        'bg-gray-900/50 text-gray-300'
                    } ${isHovered ? 'scale-105' : ''}`}>
                        {pattern.category}
                    </span>
                </div>
            </div>

            {/* Success burst animation */}
            {isClicked && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-4 border-green-400 rounded-full animate-ping opacity-75" />
                </div>
            )}
        </div>
    );
};

export default PatternCard;
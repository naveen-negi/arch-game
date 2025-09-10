import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Zap, Heart, Trophy, Target } from 'lucide-react';

const VisualFeedback = ({ type, message, duration = 2000, onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Create particles for celebration effects
        if (type === 'success' || type === 'perfect') {
            const newParticles = [...Array(8)].map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                rotation: Math.random() * 360,
                scale: 0.5 + Math.random() * 0.5,
                delay: Math.random() * 0.5
            }));
            setParticles(newParticles);
        }

        const timer = setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [type, duration, onComplete]);

    const getIcon = () => {
        switch (type) {
            case 'success': return Trophy;
            case 'perfect': return Star;
            case 'deploy': return Target;
            case 'damage': return Zap;
            case 'heal': return Heart;
            default: return Sparkles;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'success': return 'text-green-400 from-green-500/20 to-green-600/20';
            case 'perfect': return 'text-yellow-400 from-yellow-500/20 to-yellow-600/20';
            case 'deploy': return 'text-blue-400 from-blue-500/20 to-blue-600/20';
            case 'damage': return 'text-red-400 from-red-500/20 to-red-600/20';
            case 'heal': return 'text-green-400 from-green-500/20 to-green-600/20';
            default: return 'text-purple-400 from-purple-500/20 to-purple-600/20';
        }
    };

    const Icon = getIcon();
    const colors = getColors();

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            {/* Main feedback message */}
            <div className={`animate-bounce-in bg-gradient-to-r ${colors} backdrop-blur-sm 
                           border border-current/30 rounded-2xl p-6 shadow-2xl max-w-sm mx-4`}>
                <div className="flex items-center space-x-3">
                    <Icon className={`w-8 h-8 ${colors.split(' ')[0]} animate-celebrate`} />
                    <div>
                        <p className={`font-bold text-lg ${colors.split(' ')[0]}`}>
                            {message}
                        </p>
                        {type === 'perfect' && (
                            <p className="text-sm text-gray-300 mt-1">
                                Outstanding performance! 🌟
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Particle effects for celebration */}
            {particles.length > 0 && (
                <div className="absolute inset-0">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="absolute animate-ping"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
                                animationDelay: `${particle.delay}s`
                            }}
                        >
                            <Sparkles className={`w-6 h-6 ${colors.split(' ')[0]}`} />
                        </div>
                    ))}
                </div>
            )}

            {/* Screen flash for dramatic effects */}
            {(type === 'perfect' || type === 'success') && (
                <div className="absolute inset-0 bg-white/5 animate-ping" />
            )}
        </div>
    );
};

// Hook for easy feedback management
export const useFeedback = () => {
    const [feedback, setFeedback] = useState(null);

    const showFeedback = (type, message, duration = 2000) => {
        setFeedback({ type, message, duration });
    };

    const hideFeedback = () => {
        setFeedback(null);
    };

    const FeedbackComponent = feedback ? (
        <VisualFeedback
            type={feedback.type}
            message={feedback.message}
            duration={feedback.duration}
            onComplete={hideFeedback}
        />
    ) : null;

    return { showFeedback, FeedbackComponent };
};

export default VisualFeedback;
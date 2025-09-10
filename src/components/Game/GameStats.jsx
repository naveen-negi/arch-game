import React from 'react';
import { DollarSign, Activity, Award, Target, TrendingUp, Shield, Zap } from 'lucide-react';

const GameStats = ({ gameState }) => {
    const getBudgetStatus = () => {
        if (gameState.budget > 15) return { color: 'text-green-400', bg: 'from-green-500/20 to-green-600/20', emoji: '💰' };
        if (gameState.budget > 8) return { color: 'text-yellow-400', bg: 'from-yellow-500/20 to-yellow-600/20', emoji: '💎' };
        return { color: 'text-red-400', bg: 'from-red-500/20 to-red-600/20', emoji: '💸' };
    };

    const getAvailabilityStatus = () => {
        const availability = gameState.metrics.availability || 95;
        if (availability >= 99) return { color: 'text-green-400', bg: 'from-green-500/20 to-green-600/20', emoji: '🚀' };
        if (availability >= 95) return { color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/20', emoji: '✅' };
        if (availability >= 90) return { color: 'text-yellow-400', bg: 'from-yellow-500/20 to-yellow-600/20', emoji: '⚠️' };
        return { color: 'text-red-400', bg: 'from-red-500/20 to-red-600/20', emoji: '🔥' };
    };

    const getScoreStatus = () => {
        if (gameState.score > 150) return { color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-600/20', emoji: '🏆' };
        if (gameState.score > 100) return { color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/20', emoji: '⭐' };
        if (gameState.score > 50) return { color: 'text-green-400', bg: 'from-green-500/20 to-green-600/20', emoji: '👍' };
        return { color: 'text-gray-400', bg: 'from-gray-500/20 to-gray-600/20', emoji: '🎯' };
    };

    const budgetStatus = getBudgetStatus();
    const availabilityStatus = getAvailabilityStatus();
    const scoreStatus = getScoreStatus();

    const stats = [
        {
            icon: Target,
            label: 'Challenges Completed',
            value: `${gameState.challengesCompleted}`,
            color: 'text-cyan-400',
            bg: 'from-cyan-500/20 to-cyan-600/20',
            emoji: '🎯',
            description: 'Total challenges conquered'
        },
        {
            icon: DollarSign,
            label: 'Architecture Points',
            value: `${gameState.budget}`,
            color: budgetStatus.color,
            bg: budgetStatus.bg,
            emoji: budgetStatus.emoji,
            description: 'Available for patterns'
        },
        {
            icon: Shield,
            label: 'System Health',
            value: `${(gameState.metrics.availability || 95).toFixed(1)}%`,
            color: availabilityStatus.color,
            bg: availabilityStatus.bg,
            emoji: availabilityStatus.emoji,
            description: 'Current availability'
        },
        {
            icon: Award,
            label: 'Defense Score',
            value: `${gameState.score}`,
            color: scoreStatus.color,
            bg: scoreStatus.bg,
            emoji: scoreStatus.emoji,
            description: 'Total achievement points'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
                <div key={index} 
                     className={`bg-gradient-to-br ${stat.bg} backdrop-blur-sm rounded-xl p-5 border border-white/10 
                               hover-lift transition-all duration-300 group animate-fade-in-scale cursor-pointer`}
                     style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="relative">
                            <div className={`p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300`}>
                                <stat.icon className={`w-6 h-6 ${stat.color} group-hover:scale-110 transition-all duration-300`} />
                            </div>
                            <div className="absolute -top-1 -right-1 text-lg group-hover:animate-bounce">
                                {stat.emoji}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-3xl font-bold ${stat.color} group-hover:animate-pulse`}>
                                {stat.value}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-200">{stat.label}</p>
                        <p className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {stat.description}
                        </p>
                    </div>

                    {/* Progress indicators */}
                    {stat.label === 'Architecture Points' && (
                        <div className="mt-2">
                            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r ${stat.bg} transition-all duration-1000`}
                                     style={{width: `${Math.min(100, (gameState.budget / 25) * 100)}%`}} />
                            </div>
                        </div>
                    )}

                    {stat.label === 'System Health' && (
                        <div className="mt-2">
                            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r ${stat.bg} transition-all duration-1000`}
                                     style={{width: `${gameState.metrics.availability || 95}%`}} />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default GameStats;
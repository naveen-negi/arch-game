import React from 'react';
import { DollarSign, Activity, Award, Target } from 'lucide-react';
import { calculateScore } from '../../utils/scoring';

const GameStats = ({ gameState }) => {
    const stats = [
        {
            icon: Target,
            label: 'Challenges',
            value: `${gameState.challengesCompleted}`,
            color: 'text-blue-500'
        },
        {
            icon: DollarSign,
            label: 'Budget',
            value: `${gameState.budget} AP`,
            color: 'text-green-500'
        },
        {
            icon: Activity,
            label: 'Availability',
            value: `${(gameState.metrics.availability || 95).toFixed(1)}%`,
            color: 'text-yellow-500'
        },
        {
            icon: Award,
            label: 'Score',
            value: calculateScore(gameState.metrics),
            color: 'text-purple-500'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        <div className="text-right">
                            <p className="text-sm text-gray-400">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameStats;
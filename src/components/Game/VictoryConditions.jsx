import React from 'react';
import { checkVictoryConditions } from '../../utils/scoring';
import { Trophy } from 'lucide-react';

const VictoryConditions = ({ metrics }) => {
    const conditions = checkVictoryConditions(metrics);

    return (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mt-6">
            <h3 className="text-lg font-bold mb-3 text-green-400 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Victory Conditions
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
                <div className={`p-3 rounded ${conditions.latency ? 'bg-green-900' : 'bg-gray-700'}`}>
                    <p className="text-sm font-semibold">P99 Latency &lt; 500ms</p>
                    <p className="text-xs text-gray-400">Current: {metrics.latency}ms</p>
                </div>

                <div className={`p-3 rounded ${conditions.availability ? 'bg-green-900' : 'bg-gray-700'}`}>
                    <p className="text-sm font-semibold">Availability &gt; 99.9%</p>
                    <p className="text-xs text-gray-400">Current: {metrics.availability.toFixed(2)}%</p>
                </div>

                <div className={`p-3 rounded ${conditions.userExperience ? 'bg-green-900' : 'bg-gray-700'}`}>
                    <p className="text-sm font-semibold">User Experience &gt; 80</p>
                    <p className="text-xs text-gray-400">Current: {metrics.userExperience}</p>
                </div>
            </div>

            {conditions.allMet && (
                <div className="mt-4 p-4 bg-green-800 rounded-lg text-center">
                    <p className="text-xl font-bold text-green-300">🎉 Victory Achieved!</p>
                    <p className="text-sm text-gray-300 mt-2">
                        You've successfully built a resilient system!
                    </p>
                </div>
            )}
        </div>
    );
};

export default VictoryConditions;
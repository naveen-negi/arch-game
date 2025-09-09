import React from 'react';
import Button from '../UI/Button';
import { ChevronRight } from 'lucide-react';

const ResolutionPhase = ({ onAdvanceWeek, gameState }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Resolution Phase</h2>

            <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <p className="text-lg mb-2">Challenge resolved!</p>
                <p className="text-gray-300">Check the metrics panel to see the impact.</p>

                <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                        <span>Availability:</span>
                        <span className={gameState.metrics.availability > 95 ? 'text-green-400' : 'text-red-400'}>
              {gameState.metrics.availability.toFixed(1)}%
            </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Latency:</span>
                        <span className={gameState.metrics.latency < 500 ? 'text-green-400' : 'text-red-400'}>
              {gameState.metrics.latency}ms
            </span>
                    </div>
                    <div className="flex justify-between">
                        <span>User Experience:</span>
                        <span className={gameState.metrics.userExperience > 70 ? 'text-green-400' : 'text-red-400'}>
              {gameState.metrics.userExperience}
            </span>
                    </div>
                </div>
            </div>

            <Button
                onClick={onAdvanceWeek}
                variant="success"
                icon={ChevronRight}
                className="w-full"
            >
                Continue to Week {gameState.currentWeek + 1}
            </Button>
        </div>
    );
};

export default ResolutionPhase;
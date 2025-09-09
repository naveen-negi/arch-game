import React from 'react';
import Button from '../UI/Button';
import { ChevronRight, CheckCircle, Trophy } from 'lucide-react';

const ResolutionPhase = ({ onNextChallenge, gameState, isLastChallenge }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Challenge Resolved!</h2>

            <div className="bg-green-900 bg-opacity-30 border border-green-600 rounded-lg p-6 mb-4">
                <div className="flex items-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                    <h3 className="text-xl font-bold text-green-400">Defense Complete</h3>
                </div>
                
                <p className="text-gray-300 mb-4">
                    Your architectural patterns have been tested! Check the metrics below to see the impact.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <h4 className="text-sm text-gray-400 mb-1">Availability</h4>
                        <p className={`text-2xl font-bold ${(gameState.metrics.availability || 95) > 95 ? 'text-green-400' : 'text-red-400'}`}>
                            {(gameState.metrics.availability || 95).toFixed(1)}%
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <h4 className="text-sm text-gray-400 mb-1">Latency</h4>
                        <p className={`text-2xl font-bold ${(gameState.metrics.latency || 800) < 500 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.round(gameState.metrics.latency || 800)}ms
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <h4 className="text-sm text-gray-400 mb-1">User Experience</h4>
                        <p className={`text-2xl font-bold ${(gameState.metrics.userExperience || 70) > 70 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.round(gameState.metrics.userExperience || 70)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Score Summary */}
            <div className="bg-purple-900 bg-opacity-30 border border-purple-600 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Trophy className="w-6 h-6 text-purple-400 mr-2" />
                        <span className="text-purple-300 font-semibold">Current Score</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-400">{gameState.score}</span>
                </div>
            </div>

            {isLastChallenge ? (
                <div className="text-center">
                    <div className="bg-gold-900 bg-opacity-30 border border-yellow-500 rounded-lg p-6 mb-4">
                        <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-yellow-400 mb-2">🎉 Game Complete!</h3>
                        <p className="text-gray-300">
                            You've successfully navigated all challenges! Final Score: <span className="text-yellow-400 font-bold">{gameState.score}</span>
                        </p>
                    </div>
                </div>
            ) : (
                <Button
                    onClick={onNextChallenge}
                    variant="success"
                    icon={ChevronRight}
                    className="w-full"
                >
                    Continue to Next Challenge
                </Button>
            )}
        </div>
    );
};

export default ResolutionPhase;
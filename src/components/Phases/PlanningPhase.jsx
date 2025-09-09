import React from 'react';
import Button from '../UI/Button';
import PatternDetails from '../Patterns/PatternDetails';
import { Play, AlertTriangle } from 'lucide-react';

const PlanningPhase = ({
                           selectedPattern,
                           onDeployPattern,
                           gameState,
                           activeChallenge,
                           onStartChallenge
                       }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Planning Phase</h2>

            {/* Challenge Preview */}
            {activeChallenge && (
                <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-2">
                        <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
                        <h3 className="text-xl font-bold text-red-400">{activeChallenge.name}</h3>
                        <span className="ml-auto px-2 py-1 bg-red-600 text-white text-xs rounded">
                            {activeChallenge.difficulty}
                        </span>
                    </div>
                    <p className="text-gray-300 mb-3">{activeChallenge.detailedDescription}</p>
                    
                    {/* Symptoms */}
                    <div className="mb-4">
                        <h4 className="font-semibold text-red-300 mb-2">⚠️ Symptoms:</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            {activeChallenge.symptoms.map((symptom, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-red-400 mr-2">•</span>
                                    {symptom}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Business Impact */}
                    <div className="mb-4">
                        <h4 className="font-semibold text-orange-300 mb-2">💼 Business Impact:</h4>
                        <p className="text-sm text-gray-300">{activeChallenge.businessImpact}</p>
                    </div>
                    
                    {/* Challenge Stats */}
                    <div className="flex justify-between items-center text-sm mb-4">
                        <span>Threat Level: <span className="text-red-400 font-bold">{activeChallenge.baseStrength}</span></span>
                        <span>Type: <span className="text-yellow-400">{activeChallenge.type}</span></span>
                    </div>
                </div>
            )}

            {selectedPattern && (
                <PatternDetails
                    pattern={selectedPattern}
                    onDeploy={onDeployPattern}
                    canAfford={gameState.budget >= selectedPattern.cost}
                />
            )}

            {!selectedPattern && (
                <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-300 mb-2">📋 Instructions:</h4>
                    <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                        <li>Review the challenge details above</li>
                        <li>Deploy architectural patterns from the left panel</li>
                        <li>Consider pattern effectiveness against this challenge type</li>
                        <li>When ready, start the challenge to test your defenses</li>
                    </ol>
                </div>
            )}

            <div className="text-center mt-6">
                <p className="mb-4 text-gray-300">
                    Budget: <span className="text-green-400 font-bold">{gameState.budget} AP</span> | 
                    Patterns Deployed: <span className="text-blue-400 font-bold">{gameState.deployedPatterns.length}</span>
                </p>
                <Button
                    onClick={onStartChallenge}
                    variant="danger"
                    icon={Play}
                    className="w-full"
                >
                    Start Challenge: {activeChallenge?.name}
                </Button>
            </div>
        </div>
    );
};

export default PlanningPhase;
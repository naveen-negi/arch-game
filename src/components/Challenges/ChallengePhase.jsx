import React from 'react';
import Button from '../UI/Button';
import { Shield, Sword, AlertTriangle } from 'lucide-react';

const ChallengePhase = ({
                            challenge,
                            resolveChallenge,
                            deployedPatterns
                        }) => {

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-red-400">⚔️ Challenge Active</h2>

            <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
                    <h3 className="text-2xl font-bold text-red-400">{challenge.name}</h3>
                    <span className="ml-auto px-3 py-1 bg-red-600 text-white text-sm rounded-full">
                        {challenge.difficulty}
                    </span>
                </div>
                
                <p className="text-gray-200 mb-4 text-lg">{challenge.detailedDescription}</p>
                <p className="text-red-300 italic mb-4">"{challenge.story}"</p>

                {/* Active Symptoms */}
                <div className="bg-red-800 bg-opacity-50 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-red-300 mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        System is experiencing:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {challenge.symptoms.map((symptom, index) => (
                            <div key={index} className="flex items-start text-sm">
                                <span className="text-red-400 mr-2">🚨</span>
                                <span className="text-gray-200">{symptom}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Challenge Stats */}
                <div className="flex justify-between items-center text-lg mb-4 bg-gray-900 bg-opacity-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <Sword className="w-6 h-6 text-red-400 mr-2" />
                        <span>Challenge Strength: <span className="text-red-400 font-bold">{challenge.baseStrength}</span></span>
                    </div>
                    <div className="flex items-center">
                        <Shield className="w-6 h-6 text-blue-400 mr-2" />
                        <span>Your Defense: <span className="text-blue-400 font-bold">{deployedPatterns.length} patterns</span></span>
                    </div>
                </div>
            </div>

            {/* Defense Breakdown */}
            {deployedPatterns.length > 0 && (
                <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg p-4 mb-6">
                    <h4 className="font-bold text-blue-300 mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Deployed Defenses:
                    </h4>
                    <div className="space-y-2">
                        {deployedPatterns.map((pattern, index) => (
                            <div key={index} className="flex justify-between items-center text-sm bg-blue-800 bg-opacity-30 p-2 rounded">
                                <span className="text-blue-300">{pattern.name}</span>
                                <span className="text-gray-300">Strength: {pattern.strength}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {deployedPatterns.length === 0 && (
                <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg p-4 mb-6">
                    <p className="text-yellow-300 text-center">
                        ⚠️ No defenses deployed! This challenge will hit with full force.
                    </p>
                </div>
            )}

            <div className="text-center">
                <p className="mb-6 text-gray-300 text-lg">
                    Your architecture will be tested against this challenge.<br/>
                    Ready to see how your patterns perform?
                </p>
                
                <Button
                    onClick={resolveChallenge}
                    variant="danger"
                    icon={Sword}
                    className="w-full text-lg py-4"
                >
                    Engage Challenge - Test Your Defenses
                </Button>
            </div>
        </div>
    );
};

export default ChallengePhase;
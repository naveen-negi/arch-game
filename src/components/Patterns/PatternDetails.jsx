import React from 'react';
import Button from '../UI/Button';

const PatternDetails = ({ pattern, onDeploy, canAfford }) => {
    if (!pattern) return null;

    return (
        <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">{pattern.name}</h3>
            <p className="text-sm text-gray-300 mb-3">{pattern.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                    <p className="text-xs text-gray-400 mb-1">Strengths:</p>
                    {Object.entries(pattern.effectiveness).map(([key, val]) => (
                        <div key={key} className="text-sm">
                            <span className="capitalize">{key}:</span>
                            <span className="ml-2 text-green-400">+{val}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <p className="text-xs text-gray-400 mb-1">Weaknesses:</p>
                    {pattern.weaknesses.map((weak, idx) => (
                        <p key={idx} className="text-sm text-red-400">• {weak}</p>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <p className="text-xs text-gray-400">Implementation Time:</p>
                <p className="text-sm">{pattern.implementationTime} week(s)</p>
            </div>

            <Button
                onClick={() => onDeploy(pattern)}
                disabled={!canAfford}
                variant="primary"
                className="w-full"
            >
                Deploy Pattern ({pattern.cost} AP)
            </Button>
        </div>
    );
};

export default PatternDetails;
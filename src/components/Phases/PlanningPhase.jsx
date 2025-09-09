import React from 'react';
import Button from '../UI/Button';
import PatternDetails from '../Patterns/PatternDetails';
import { ChevronRight } from 'lucide-react';

const PlanningPhase = ({
                           selectedPattern,
                           onDeployPattern,
                           gameState,
                           onAdvanceWeek
                       }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Planning Phase</h2>

            {selectedPattern && (
                <PatternDetails
                    pattern={selectedPattern}
                    onDeploy={onDeployPattern}
                    canAfford={gameState.budget >= selectedPattern.cost}
                />
            )}

            {!selectedPattern && (
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                    <p className="text-gray-300">
                        Select a pattern from the left panel to view details and deploy.
                    </p>
                </div>
            )}

            <div className="flex justify-between items-center mt-6">
                <div>
                    <p className="text-sm text-gray-400">Story Points Available</p>
                    <p className="text-xl font-bold">{gameState.storyPointsAvailable}</p>
                </div>
                <Button
                    onClick={onAdvanceWeek}
                    variant="success"
                    icon={ChevronRight}
                >
                    Advance to Week {gameState.currentWeek + 1}
                </Button>
            </div>
        </div>
    );
};

export default PlanningPhase;
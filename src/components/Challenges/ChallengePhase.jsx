import React from 'react';
import Dice from '../UI/Dice';
import Button from '../UI/Button';
import { calculateDefense } from '../../utils/defense';

const ChallengePhase = ({
                            challenge,
                            diceState,
                            rollDice,
                            resolveChallenge,
                            deployedPatterns
                        }) => {
    const defense = calculateDefense(challenge, deployedPatterns);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-red-400">⚔️ Challenge Phase</h2>

            <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-4 mb-4">
                <h3 className="text-xl font-bold mb-2">{challenge.name}</h3>
                <p className="text-gray-300 mb-2">{challenge.description}</p>
                <p className="text-sm italic text-gray-400 mb-2">"{challenge.story}"</p>

                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-gray-400">Threat Level:</span>
                    {[...Array(challenge.threat)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                </div>
            </div>

            <div className="text-center">
                <p className="mb-4 text-gray-300">Roll dice to determine challenge strength!</p>

                <div className="flex justify-center space-x-4 mb-4">
                    <Dice value={diceState.value1} rolling={diceState.rolling} />
                    <Dice value={diceState.value2} rolling={diceState.rolling} />
                </div>

                <div className="mb-4">
                    <p className="text-2xl font-bold">
                        Challenge Strength: {diceState.total}
                    </p>
                    <p className="text-lg text-blue-400">
                        Your Defense: {defense}
                    </p>
                </div>

                <div className="flex justify-center space-x-4">
                    <Button
                        onClick={rollDice}
                        disabled={diceState.rolling}
                        variant="warning"
                    >
                        Roll Dice
                    </Button>
                    <Button
                        onClick={() => resolveChallenge(diceState.total, defense)}
                        variant="danger"
                    >
                        Resolve Challenge
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChallengePhase;
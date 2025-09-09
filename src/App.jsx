import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { GAME_PHASES } from './data/constants';

import GameStats from './components/Game/GameStats';
import PatternList from './components/Patterns/PatternList';
import DeployedPatterns from './components/Patterns/DeployedPatterns';
import ChallengePhase from './components/Challenges/ChallengePhase';
import PlanningPhase from './components/Phases/PlanningPhase';
import ResolutionPhase from './components/Phases/ResolutionPhase';
import EventLog from './components/Game/EventLog';
import VictoryConditions from './components/Game/VictoryConditions';

function App() {
    const {
        gameState,
        gamePhase,
        activeChallenge,
        deployPattern,
        startChallenge,
        resolveChallenge,
        nextChallenge,
        setGamePhase,
        isLastChallenge
    } = useGameState();

    const [selectedPattern, setSelectedPattern] = useState(null);

    const handleDeployPattern = (pattern) => {
        deployPattern(pattern);
        setSelectedPattern(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                    <h1 className="text-3xl font-bold mb-2 text-blue-400">
                        🍔 The Lunch Rush Resilience Protocol
                    </h1>
                    <p className="text-gray-300">FoodFlow Architecture Strategy Game</p>
                </div>

                {/* Game Stats */}
                <GameStats gameState={gameState} />

                {/* Main Game Area */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Left Panel */}
                    <div className="md:col-span-1">
                        <PatternList
                            selectedPattern={selectedPattern}
                            onSelectPattern={setSelectedPattern}
                            budget={gameState.budget}
                        />
                        <DeployedPatterns patterns={gameState.deployedPatterns} />
                    </div>

                    {/* Center Panel */}
                    <div className="md:col-span-2">
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            {gamePhase === GAME_PHASES.PLANNING && (
                                <PlanningPhase
                                    selectedPattern={selectedPattern}
                                    onDeployPattern={handleDeployPattern}
                                    gameState={gameState}
                                    activeChallenge={activeChallenge}
                                    onStartChallenge={startChallenge}
                                />
                            )}

                            {gamePhase === GAME_PHASES.CHALLENGE && activeChallenge && (
                                <ChallengePhase
                                    challenge={activeChallenge}
                                    resolveChallenge={resolveChallenge}
                                    deployedPatterns={gameState.deployedPatterns}
                                />
                            )}

                            {gamePhase === GAME_PHASES.RESOLUTION && (
                                <ResolutionPhase
                                    onNextChallenge={nextChallenge}
                                    gameState={gameState}
                                    isLastChallenge={isLastChallenge}
                                />
                            )}
                        </div>

                        <EventLog events={gameState.eventLog} />
                    </div>
                </div>

                {/* Victory Conditions */}
                <VictoryConditions metrics={gameState.metrics} />
            </div>
        </div>
    );
}

export default App;
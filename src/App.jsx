import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { GAME_PHASES } from './data/constants';
import './styles/animations.css';

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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-blue-500/30 animate-slide-up hover-glow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-bounce-in">
                                🛡️ Architecture Defense Challenge
                            </h1>
                            <p className="text-gray-300 text-lg animate-slide-in-left">Master the Art of Resilient System Design</p>
                        </div>
                        <div className="animate-float">
                            <div className="text-6xl">⚡</div>
                        </div>
                    </div>
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
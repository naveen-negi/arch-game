import React from 'react';
import { GAME_PHASES } from '../../data/constants';
import PlanningPhase from '../Phases/PlanningPhase';
import ChallengePhase from '../Challenges/ChallengePhase';
import ResolutionPhase from '../Phases/ResolutionPhase';
import UpcomingChallenges from '../Challenges/UpcomingChallenges';

const GameBoard = ({
                       gamePhase,
                       gameState,
                       activeChallenge,
                       selectedPattern,
                       diceState,
                       rollDice,
                       resolveChallenge,
                       onDeployPattern,
                       onAdvanceWeek
                   }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            {gamePhase === GAME_PHASES.PLANNING && (
                <PlanningPhase
                    selectedPattern={selectedPattern}
                    onDeployPattern={onDeployPattern}
                    gameState={gameState}
                    onAdvanceWeek={onAdvanceWeek}
                />
            )}

            {gamePhase === GAME_PHASES.CHALLENGE && activeChallenge && (
                <ChallengePhase
                    challenge={activeChallenge}
                    diceState={diceState}
                    rollDice={rollDice}
                    resolveChallenge={resolveChallenge}
                    deployedPatterns={gameState.deployedPatterns}
                />
            )}

            {gamePhase === GAME_PHASES.RESOLUTION && (
                <ResolutionPhase
                    onAdvanceWeek={onAdvanceWeek}
                    gameState={gameState}
                />
            )}

            <UpcomingChallenges currentWeek={gameState.currentWeek} />
        </div>
    );
};

export default GameBoard;
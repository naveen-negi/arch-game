import { useReducer, useState } from 'react';
import { gameReducer, initialState, gameActions } from '../reducers/gameReducer';
import { challenges } from '../data/challenges';
import { GAME_PHASES } from '../data/constants';
import { CombatResolver } from '../utils/combatResolver';

export const useGameState = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const [gamePhase, setGamePhase] = useState(GAME_PHASES.PLANNING);
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
    const [combatResolver] = useState(() => new CombatResolver());
    
    // Get current challenge
    const activeChallenge = challenges[currentChallengeIndex] || null;
    
    const deployPattern = (pattern) => {
        dispatch({ type: gameActions.DEPLOY_PATTERN, pattern });
    };

    const startChallenge = () => {
        if (activeChallenge) {
            setGamePhase(GAME_PHASES.CHALLENGE);
        }
    };

    const resolveChallenge = () => {
        if (!activeChallenge) return;
        
        const combatResult = combatResolver.resolveChallenge(
            activeChallenge,
            state.deployedPatterns,
            state
        );
        
        const scoreGain = combatResolver.calculateScoreGain(combatResult.success);
        
        dispatch({
            type: gameActions.RESOLVE_CHALLENGE,
            challengeName: activeChallenge.name,
            combatResult,
            scoreGain
        });
        setGamePhase(GAME_PHASES.RESOLUTION);
    };
    
    const nextChallenge = () => {
        if (currentChallengeIndex < challenges.length - 1) {
            setCurrentChallengeIndex(currentChallengeIndex + 1);
            setGamePhase(GAME_PHASES.PLANNING);
        }
    };

    return {
        gameState: state,
        gamePhase,
        activeChallenge,
        deployPattern,
        startChallenge,
        resolveChallenge,
        nextChallenge,
        setGamePhase,
        isLastChallenge: currentChallengeIndex >= challenges.length - 1
    };
};
import { useReducer, useEffect, useState } from 'react';
import { gameReducer, initialState, gameActions } from '../reducers/gameReducer';
import { challenges } from '../data/challenges';
import { GAME_PHASES } from '../data/constants';
import { CombatResolver } from '../utils/combatResolver';

export const useGameState = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const [gamePhase, setGamePhase] = useState(GAME_PHASES.PLANNING);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [combatResolver] = useState(() => new CombatResolver());

    useEffect(() => {
        const currentChallenge = challenges.find(c => c.week === state.currentWeek);
        if (currentChallenge) {
            setActiveChallenge(currentChallenge);
            setGamePhase(GAME_PHASES.CHALLENGE);
        }
    }, [state.currentWeek]);

    const deployPattern = (pattern) => {
        dispatch({ type: gameActions.DEPLOY_PATTERN, pattern });
    };

    const advanceWeek = () => {
        dispatch({ type: gameActions.ADVANCE_WEEK });
        setGamePhase(GAME_PHASES.PLANNING);
        setActiveChallenge(null);
    };

    const resolveChallenge = (diceRoll) => {
        if (!activeChallenge) return;
        
        const combatResult = combatResolver.resolveChallenge(
            activeChallenge,
            state.deployedPatterns,
            diceRoll,
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

    return {
        gameState: state,
        gamePhase,
        activeChallenge,
        deployPattern,
        advanceWeek,
        resolveChallenge,
        setGamePhase
    };
};
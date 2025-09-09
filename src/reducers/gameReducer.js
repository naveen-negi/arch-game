import { GAME_CONSTANTS } from '../data/constants';

export const gameActions = {
    DEPLOY_PATTERN: 'DEPLOY_PATTERN',
    RESOLVE_CHALLENGE: 'RESOLVE_CHALLENGE',
    NEXT_CHALLENGE: 'NEXT_CHALLENGE',
    UPDATE_METRICS: 'UPDATE_METRICS',
    ADD_EVENT: 'ADD_EVENT',
    RESET_GAME: 'RESET_GAME'
};

export const initialState = {
    budget: GAME_CONSTANTS.INITIAL_BUDGET,
    metrics: { ...GAME_CONSTANTS.INITIAL_METRICS },
    deployedPatterns: [],
    eventLog: [{
        message: 'Game started - Welcome to the Architecture Defense Challenge!',
        type: 'info'
    }],
    teamExpertise: 3,
    score: 0,
    challengesCompleted: 0
};

export const gameReducer = (state, action) => {
    switch (action.type) {
        case gameActions.DEPLOY_PATTERN:
            if (state.budget < action.pattern.cost) return state;

            return {
                ...state,
                budget: state.budget - action.pattern.cost,
                deployedPatterns: [...state.deployedPatterns, {
                    ...action.pattern,
                    id: `${action.pattern.id}-${Date.now()}`
                }],
                eventLog: [...state.eventLog, {
                    message: `Deployed ${action.pattern.name}`,
                    type: 'deploy'
                }]
            };

        case gameActions.NEXT_CHALLENGE:
            return {
                ...state,
                challengesCompleted: state.challengesCompleted + 1,
                teamExpertise: Math.min(5, state.teamExpertise + 0.2)
            };

        case gameActions.RESOLVE_CHALLENGE:
            const combatResult = action.combatResult;
            const newMetrics = { ...state.metrics };
            
            // Apply damage from combat result with safe fallbacks
            if (combatResult && combatResult.damage) {
                for (let [metric, damage] of Object.entries(combatResult.damage)) {
                    const damageValue = isNaN(damage) ? 0 : damage;
                    if (metric === 'availability') {
                        newMetrics.availability = Math.max(0, (newMetrics.availability || 95) - damageValue);
                    } else if (metric === 'latency') {
                        newMetrics.latency = (newMetrics.latency || 800) + damageValue * 10;
                    } else if (metric === 'userExperience') {
                        newMetrics.userExperience = Math.max(0, (newMetrics.userExperience || 70) - damageValue);
                    }
                }
            }

            return {
                ...state,
                metrics: newMetrics,
                score: state.score + action.scoreGain,
                challengesCompleted: state.challengesCompleted + 1,
                lastCombatResult: combatResult, // Store for detailed analysis
                eventLog: [...state.eventLog, {
                    message: `${action.challengeName}: ${combatResult.success} defense! (${combatResult.challengeStrength} vs ${combatResult.totalDefense})`,
                    type: 'combat'
                }]
            };

        case gameActions.UPDATE_METRICS:
            return {
                ...state,
                metrics: { ...state.metrics, ...action.metrics }
            };

        case gameActions.ADD_EVENT:
            return {
                ...state,
                eventLog: [...state.eventLog, action.event]
            };

        default:
            return state;
    }
};
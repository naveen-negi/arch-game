import { GAME_CONSTANTS } from '../data/constants';

export const gameActions = {
    DEPLOY_PATTERN: 'DEPLOY_PATTERN',
    ADVANCE_WEEK: 'ADVANCE_WEEK',
    RESOLVE_CHALLENGE: 'RESOLVE_CHALLENGE',
    UPDATE_METRICS: 'UPDATE_METRICS',
    ADD_EVENT: 'ADD_EVENT',
    UPDATE_BUDGET: 'UPDATE_BUDGET'
};

export const initialState = {
    currentWeek: 1,
    budget: GAME_CONSTANTS.INITIAL_BUDGET,
    storyPointsAvailable: GAME_CONSTANTS.INITIAL_STORY_POINTS,
    metrics: { ...GAME_CONSTANTS.INITIAL_METRICS },
    deployedPatterns: [],
    eventLog: [{
        week: 1,
        message: 'Game started - Welcome to FoodFlow!',
        type: 'info'
    }],
    team: { ...GAME_CONSTANTS.TEAM_COMPOSITION },
    teamExpertise: 2,
    score: 0
};

export const gameReducer = (state, action) => {
    switch (action.type) {
        case gameActions.DEPLOY_PATTERN:
            if (state.budget < action.pattern.cost) return state;

            const completionWeek = state.currentWeek +
                Math.ceil(action.pattern.implementationTime || 1);

            return {
                ...state,
                budget: state.budget - action.pattern.cost,
                deployedPatterns: [...state.deployedPatterns, {
                    ...action.pattern,
                    deployedWeek: state.currentWeek,
                    completionWeek,
                    id: `${action.pattern.id}-${Date.now()}`
                }],
                eventLog: [...state.eventLog, {
                    week: state.currentWeek,
                    message: `Deployed ${action.pattern.name}`,
                    type: 'deploy'
                }]
            };

        case gameActions.ADVANCE_WEEK:
            return {
                ...state,
                currentWeek: state.currentWeek + 1,
                storyPointsAvailable: GAME_CONSTANTS.STORY_POINTS_PER_WEEK,
                teamExpertise: Math.min(5, state.teamExpertise + 0.1)
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
                eventLog: [...state.eventLog, {
                    week: state.currentWeek,
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
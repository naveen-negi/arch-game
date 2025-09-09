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
    eventLog: ['Game started - Welcome to FoodFlow!'],
    team: { ...GAME_CONSTANTS.TEAM_COMPOSITION },
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
                eventLog: [...state.eventLog,
                    `Week ${state.currentWeek}: Deployed ${action.pattern.name}`]
            };

        case gameActions.ADVANCE_WEEK:
            return {
                ...state,
                currentWeek: state.currentWeek + 1,
                storyPointsAvailable: GAME_CONSTANTS.STORY_POINTS_PER_WEEK
            };

        case gameActions.RESOLVE_CHALLENGE:
            const damage = Math.max(0,
                action.challengeStrength - action.defenseStrength);

            const newMetrics = { ...state.metrics };

            if (action.challengeDamage.availability) {
                newMetrics.availability = Math.max(0,
                    newMetrics.availability - damage * 0.5);
            }
            if (action.challengeDamage.latency) {
                newMetrics.latency = newMetrics.latency + damage * 20;
            }
            if (action.challengeDamage.ux) {
                newMetrics.userExperience = Math.max(0,
                    newMetrics.userExperience - damage * 2);
            }

            return {
                ...state,
                metrics: newMetrics,
                eventLog: [...state.eventLog,
                    `Week ${state.currentWeek}: ${action.challengeName} dealt ${damage} damage`]
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
export const formatTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
};

export const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
};

export const getRandomEvent = () => {
    const events = [
        {
            type: 'bonus',
            message: 'Industry best practice discovered!',
            effect: { budget: 10 }
        },
        {
            type: 'penalty',
            message: 'Technical debt accumulating',
            effect: { latency: 50 }
        },
        {
            type: 'neutral',
            message: 'Team morale is stable',
            effect: {}
        }
    ];

    return events[Math.floor(Math.random() * events.length)];
};

export const calculateTeamEfficiency = (team) => {
    return team.senior * 3 + team.mid * 2 + team.junior * 1;
};
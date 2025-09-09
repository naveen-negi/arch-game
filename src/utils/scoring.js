export const calculateScore = (metrics) => {
    const availScore = Math.max(0, (metrics.availability - 90) * 3);
    const latencyScore = Math.max(0, (1000 - metrics.latency) / 20);
    const uxScore = metrics.userExperience / 2;

    return Math.round(availScore + latencyScore + uxScore);
};

export const checkVictoryConditions = (metrics) => {
    return {
        latency: metrics.latency < 500,
        availability: metrics.availability > 99.9,
        userExperience: metrics.userExperience > 80,
        allMet: metrics.latency < 500 &&
            metrics.availability > 99.9 &&
            metrics.userExperience > 80
    };
};
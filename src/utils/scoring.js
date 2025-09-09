export const calculateScore = (metrics) => {
    if (!metrics) return 0;
    
    const availability = metrics.availability || 95;
    const latency = metrics.latency || 800;
    const userExperience = metrics.userExperience || 70;
    
    const availScore = Math.max(0, (availability - 90) * 10);
    const latencyScore = Math.max(0, (1000 - latency) / 10);
    const uxScore = userExperience;

    const finalScore = availScore + latencyScore + uxScore;
    return isNaN(finalScore) ? 0 : Math.round(finalScore);
};

export const calculateFinalScore = (gameState) => {
    const baseScore = calculateScore(gameState.metrics);
    const combatScore = gameState.score; // From successful defenses
    const efficiencyBonus = Math.max(0, gameState.budget * 2); // Bonus for leftover budget
    
    return baseScore + combatScore + efficiencyBonus;
};

export const checkVictoryConditions = (metrics) => {
    if (!metrics) {
        return { latency: false, availability: false, userExperience: false, allMet: false };
    }
    
    const availability = metrics.availability || 95;
    const latency = metrics.latency || 800;
    const userExperience = metrics.userExperience || 70;
    
    return {
        latency: latency < 500,
        availability: availability > 99.9,
        userExperience: userExperience > 80,
        allMet: latency < 500 && availability > 99.9 && userExperience > 80
    };
};
export const calculateDefense = (challenge, deployedPatterns) => {
    let defense = 0;
    const currentWeek = deployedPatterns[0]?.deployedWeek || 1;

    deployedPatterns.forEach(pattern => {
        if (pattern.completionWeek <= currentWeek) {
            if (challenge.counters.includes(pattern.id)) {
                defense += 4; // Strong counter
            } else {
                defense += 1; // Basic defense
            }
        }
    });

    return defense;
};

export const calculatePatternSynergies = (deployedPatterns) => {
    const synergies = [];
    const activePatterns = deployedPatterns.map(p => p.id);

    // Check for specific synergies
    if (activePatterns.includes('load-shedding') &&
        activePatterns.includes('queue-management')) {
        synergies.push({
            name: 'Queue Protection',
            bonus: 2
        });
    }

    if (activePatterns.includes('circuit-breaker') &&
        activePatterns.includes('adaptive-retries')) {
        synergies.push({
            name: 'Smart Failure Handling',
            bonus: 3
        });
    }

    return synergies;
};
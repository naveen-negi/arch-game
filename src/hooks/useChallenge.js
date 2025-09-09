import { useState, useEffect } from 'react';
import { challenges } from '../data/challenges';

export const useChallenge = (currentWeek) => {
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [upcomingChallenges, setUpcomingChallenges] = useState([]);

    useEffect(() => {
        // Find current challenge
        const current = challenges.find(c => c.week === currentWeek);
        setActiveChallenge(current || null);

        // Find upcoming challenges
        const upcoming = challenges.filter(
            c => c.week > currentWeek && c.week <= currentWeek + 3
        );
        setUpcomingChallenges(upcoming);
    }, [currentWeek]);

    return { activeChallenge, upcomingChallenges };
};
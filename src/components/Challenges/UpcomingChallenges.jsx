import React from 'react';
import { challenges } from '../../data/challenges';
import { AlertTriangle } from 'lucide-react';

const UpcomingChallenges = ({ currentWeek }) => {
    const upcomingChallenges = challenges.filter(
        c => c.week > currentWeek && c.week <= currentWeek + 3
    );

    if (upcomingChallenges.length === 0) return null;

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-3 text-yellow-400 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Upcoming Challenges
            </h3>
            <div className="space-y-2">
                {upcomingChallenges.map(challenge => (
                    <div
                        key={challenge.id}
                        className={`
              bg-gray-700 p-2 rounded flex justify-between items-center
              ${challenge.isBoss ? 'border border-red-600' : ''}
            `}
                    >
                        <div>
                            <span className="text-sm">{challenge.name}</span>
                            {challenge.isBoss && (
                                <span className="ml-2 text-xs text-red-400">BOSS</span>
                            )}
                        </div>
                        <span className="text-xs text-gray-400">Week {challenge.week}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingChallenges;
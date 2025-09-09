export const challenges = [
    {
        id: 'morning-rush',
        name: 'Morning Coffee Rush',
        week: 2,
        type: 'traffic-spike',
        baseStrength: 15,
        aspects: ['burst-traffic', 'read-heavy'],
        damage: { availability: 10, latency: 15, userExperience: 20 },
        description: '3x traffic spike from 7-9 AM',
        story: 'The breakfast crowd wants their orders fast!'
    },
    {
        id: 'database-meltdown',
        name: 'Database Connection Storm',
        week: 3,
        type: 'database-overload',
        baseStrength: 20,
        aspects: ['database-load', 'cascade'],
        damage: { availability: 20, latency: 25, userExperience: 15 },
        description: 'Connection pool exhaustion cascade',
        story: 'McDonald\'s system is overwhelmed and cascading!'
    },
    {
        id: 'dependency-failure',
        name: 'Payment Gateway Outage',
        week: 4,
        type: 'dependency-failure',
        baseStrength: 18,
        aspects: ['dependency', 'timeout'],
        damage: { availability: 15, latency: 10, userExperience: 25 },
        description: 'Critical dependency becomes unavailable',
        story: 'The payment service is down and customers can\'t pay!'
    },
    {
        id: 'flash-crowd',
        name: 'Viral Marketing Success',
        week: 5,
        type: 'traffic-spike',
        baseStrength: 25,
        aspects: ['burst-traffic', 'overload'],
        damage: { availability: 25, latency: 30, userExperience: 30 },
        description: '10x traffic from viral social media post',
        story: 'A celebrity just tweeted about your app!'
    },
    {
        id: 'api-abuse',
        name: 'API Abuse Attack',
        week: 6,
        type: 'ddos-attack',
        baseStrength: 22,
        aspects: ['api-abuse', 'resource-exhaustion'],
        damage: { availability: 18, latency: 20, userExperience: 12 },
        description: 'Automated scraper flooding API endpoints',
        story: 'Someone is hitting your API 1000x per second!'
    },
    {
        id: 'black-friday',
        name: 'Black Friday Lunch Rush',
        week: 9,
        type: 'cascade-failure',
        baseStrength: 35,
        aspects: ['burst-traffic', 'cascade', 'dependency', 'overload'],
        damage: { availability: 30, latency: 40, userExperience: 35 },
        description: '20x traffic + 30% restaurant outages + payment delays',
        story: 'It\'s Black Friday and everything is breaking at once!',
        isBoss: true
    }
];
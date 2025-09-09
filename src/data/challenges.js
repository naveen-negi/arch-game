export const challenges = [
    {
        id: 'coffee-rush',
        name: 'Morning Coffee Rush',
        week: 2,
        threat: 2,
        description: '3x traffic spike 7-9 AM',
        damage: { ux: 5, latency: 100 },
        counters: ['load-shedding', 'auto-scaling'],
        story: 'The breakfast crowd wants their orders fast!'
    },
    {
        id: 'restaurant-outage',
        name: 'Popular Restaurant Outage',
        week: 3,
        threat: 3,
        description: 'Top restaurant API fails',
        damage: { availability: 10, ux: 8 },
        counters: ['circuit-breaker', 'adaptive-retries'],
        story: 'McDonald\'s system is down but everyone keeps trying!'
    },
    {
        id: 'thundering-herd',
        name: 'The Thundering Herd',
        week: 4,
        threat: 4,
        description: '50,000 simultaneous orders',
        damage: { availability: 15, latency: 200 },
        counters: ['queue-management', 'load-shedding'],
        story: 'Marketing just sent a 50% off notification!'
    },
    {
        id: 'noisy-neighbor',
        name: 'The Noisy Neighbor',
        week: 6,
        threat: 3,
        description: 'Corporate client places 1000 orders/minute',
        damage: { fairness: 15, ux: 10 },
        counters: ['fairness-quota', 'queue-management'],
        story: 'BigCorp is ordering lunch for their entire campus!'
    },
    {
        id: 'black-friday',
        name: 'Black Friday Lunch Rush',
        week: 9,
        threat: 5,
        description: '20x traffic + 30% restaurant outages',
        damage: { availability: 20, latency: 300, ux: 15 },
        counters: ['load-shedding', 'circuit-breaker', 'queue-management', 'auto-scaling'],
        story: 'It\'s Black Friday and everyone\'s ordering while shopping!',
        isBoss: true
    }
];
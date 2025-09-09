import { Shield, Users, TrendingUp, Package, Activity, Zap, RotateCcw, Lock, Database } from 'lucide-react';
import { PATTERN_CATEGORIES } from './constants';

export const patterns = {
    operational: [
        {
            id: 'load-shedding',
            name: 'Load Shedding',
            category: PATTERN_CATEGORIES.OPERATIONAL,
            cost: 4,
            strength: 5,
            icon: Shield,
            description: 'Deprioritize non-essential work during overload',
            effectiveness: { stability: 5, goodput: 4 },
            weaknesses: ['Indiscriminate impact', 'Work rejection'],
            restaurant: 'Like skipping napkin folding during rush',
            implementationTime: 1,
            expertiseRequired: 2,
            addresses: ['overload', 'resource-exhaustion', 'burst-traffic']
        },
        {
            id: 'rate-limiting',
            name: 'Rate Limiting',
            category: PATTERN_CATEGORIES.OPERATIONAL,
            cost: 4,
            strength: 6,
            icon: Lock,
            description: 'Limit request rate per client',
            effectiveness: { fairness: 4, performance: 3 },
            weaknesses: ['Legitimate burst rejection', 'Customer frustration'],
            restaurant: 'Like holiday dining time limits',
            implementationTime: 1,
            expertiseRequired: 1,
            addresses: ['api-abuse', 'fairness']
        },
        {
            id: 'auto-scaling',
            name: 'Auto-scaling',
            category: PATTERN_CATEGORIES.OPERATIONAL,
            cost: 8,
            strength: 6,
            icon: TrendingUp,
            description: 'Dynamically adjust capacity',
            effectiveness: { elasticity: 5, cost: 3 },
            weaknesses: ['Scaling lag', 'Cold starts'],
            restaurant: 'Like adjusting menu for seasons',
            implementationTime: 2,
            expertiseRequired: 3,
            addresses: ['traffic-variation', 'cost-optimization']
        },
        {
            id: 'caching',
            name: 'Caching Layer',
            category: PATTERN_CATEGORIES.OPERATIONAL,
            cost: 7,
            strength: 8,
            icon: Database,
            description: 'Store frequently accessed data in memory',
            effectiveness: { performance: 5, database: 4 },
            weaknesses: ['Cache invalidation', 'Memory usage'],
            restaurant: 'Like keeping popular items ready',
            implementationTime: 2,
            expertiseRequired: 2,
            addresses: ['read-heavy', 'database-load']
        }
    ],
    architectural: [
        {
            id: 'queue-management',
            name: 'Queue Management',
            category: PATTERN_CATEGORIES.ARCHITECTURAL,
            cost: 5,
            strength: 5,
            icon: Package,
            description: 'Buffer and manage request flow',
            effectiveness: { latency: 5, timeout: 4 },
            weaknesses: ['Work rejection', 'Sizing challenges'],
            restaurant: 'Like managing restaurant wait list',
            implementationTime: 1,
            expertiseRequired: 2,
            addresses: ['burst-traffic', 'async-processing']
        },
        {
            id: 'constant-work',
            name: 'Constant Work Pattern',
            category: PATTERN_CATEGORIES.ARCHITECTURAL,
            cost: 7,
            strength: 4,
            icon: Activity,
            description: 'Perform consistent work regardless of load',
            effectiveness: { predictability: 6, stability: 5 },
            weaknesses: ['Wasted resources', 'Higher cost'],
            restaurant: 'Like serving preset hors d\'oeuvres',
            implementationTime: 2,
            expertiseRequired: 3,
            addresses: ['predictability', 'consistent-load']
        },
        {
            id: 'smaller-in-control',
            name: 'Smaller Service in Control',
            category: PATTERN_CATEGORIES.ARCHITECTURAL,
            cost: 8,
            strength: 5,
            icon: Users,
            description: 'Smaller fleet controls interaction rate',
            effectiveness: { isolation: 5, scaling: 4 },
            weaknesses: ['Coordination complexity', 'Inventory management'],
            restaurant: 'Like bartenders controlling order flow',
            implementationTime: 2,
            expertiseRequired: 4,
            addresses: ['scaling-control', 'resource-isolation']
        }
    ],
    client: [
        {
            id: 'circuit-breaker',
            name: 'Circuit Breaker',
            category: PATTERN_CATEGORIES.CLIENT,
            cost: 6,
            strength: 7,
            icon: Zap,
            description: 'Prevent cascading failures by failing fast',
            effectiveness: { isolation: 5, recovery: 4 },
            weaknesses: ['False positives', 'Threshold tuning'],
            restaurant: 'Like stopping orders when kitchen overwhelmed',
            implementationTime: 1,
            expertiseRequired: 3,
            addresses: ['cascade', 'timeout', 'dependency']
        },
        {
            id: 'adaptive-retries',
            name: 'Adaptive Retries',
            category: PATTERN_CATEGORIES.CLIENT,
            cost: 5,
            strength: 3,
            icon: RotateCcw,
            description: 'Smart retry logic with backoff',
            effectiveness: { availability: 3, efficiency: 2 },
            weaknesses: ['Work amplification', 'Retry storms'],
            restaurant: 'Like politely asking again for forgotten items',
            implementationTime: 1,
            expertiseRequired: 2,
            addresses: ['transient-failures', 'reliability']
        }
    ]
};

export const getAllPatterns = () => {
    return [
        ...patterns.operational,
        ...patterns.architectural,
        ...patterns.client
    ];
};
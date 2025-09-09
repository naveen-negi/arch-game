import { Shield, Users, TrendingUp, Package, Activity, Zap, RotateCcw, Lock } from 'lucide-react';
import { PATTERN_CATEGORIES } from './constants';

export const patterns = {
    operational: [
        {
            id: 'load-shedding',
            name: 'Load Shedding',
            category: PATTERN_CATEGORIES.OPERATIONAL,
            cost: 4,
            icon: Shield,
            description: 'Deprioritize non-essential work during overload',
            effectiveness: { stability: 5, goodput: 4 },
            weaknesses: ['Indiscriminate impact', 'Work rejection'],
            restaurant: 'Like skipping napkin folding during rush',
            implementationTime: 1
        },
        {
            id: 'fairness-quota',
            name: 'Fairness & Quota Management',
            category: PATTERN_CATEGORIES.OPERATIONAL,
            cost: 6,
            icon: Users,
            description: 'Ensure equitable resource access',
            effectiveness: { fairness: 4, performance: 3 },
            weaknesses: ['Legitimate burst rejection', 'Customer frustration'],
            restaurant: 'Like holiday dining time limits',
            implementationTime: 1
        },
        {
            id: 'auto-scaling',
            name: 'Auto-scaling',
            category: PATTERN_CATEGORIES.OPERATIONAL,
            cost: 8,
            icon: TrendingUp,
            description: 'Dynamically adjust capacity',
            effectiveness: { elasticity: 5, cost: 3 },
            weaknesses: ['Scaling lag', 'Cold starts'],
            restaurant: 'Like adjusting menu for seasons',
            implementationTime: 2
        }
    ],
    architectural: [
        {
            id: 'queue-management',
            name: 'Queue Depth Management',
            category: PATTERN_CATEGORIES.ARCHITECTURAL,
            cost: 5,
            icon: Package,
            description: 'Control queue size to prevent overflow',
            effectiveness: { latency: 5, timeout: 4 },
            weaknesses: ['Work rejection', 'Sizing challenges'],
            restaurant: 'Like managing restaurant wait list',
            implementationTime: 1
        },
        {
            id: 'constant-work',
            name: 'Constant Work Pattern',
            category: PATTERN_CATEGORIES.ARCHITECTURAL,
            cost: 7,
            icon: Activity,
            description: 'Perform consistent work regardless of load',
            effectiveness: { predictability: 6, stability: 5 },
            weaknesses: ['Wasted resources', 'Higher cost'],
            restaurant: 'Like serving preset hors d\'oeuvres',
            implementationTime: 2
        },
        {
            id: 'smaller-in-control',
            name: 'Smaller Service in Control',
            category: PATTERN_CATEGORIES.ARCHITECTURAL,
            cost: 8,
            icon: Lock,
            description: 'Smaller fleet controls interaction rate',
            effectiveness: { isolation: 5, scaling: 4 },
            weaknesses: ['Coordination complexity', 'Inventory management'],
            restaurant: 'Like bartenders controlling order flow',
            implementationTime: 2
        }
    ],
    client: [
        {
            id: 'circuit-breaker',
            name: 'Circuit Breakers',
            category: PATTERN_CATEGORIES.CLIENT,
            cost: 6,
            icon: Zap,
            description: 'Prevent cascading failures',
            effectiveness: { isolation: 5, recovery: 4 },
            weaknesses: ['False positives', 'Threshold tuning'],
            restaurant: 'Like stopping orders when kitchen overwhelmed',
            implementationTime: 1
        },
        {
            id: 'adaptive-retries',
            name: 'Adaptive Retries',
            category: PATTERN_CATEGORIES.CLIENT,
            cost: 5,
            icon: RotateCcw,
            description: 'Smart retry logic with backoff',
            effectiveness: { availability: 3, efficiency: 2 },
            weaknesses: ['Work amplification', 'Retry storms'],
            restaurant: 'Like politely asking again for forgotten items',
            implementationTime: 1
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
export const challenges = [
    {
        id: 'morning-rush',
        name: 'Morning Coffee Rush',
        type: 'traffic-spike',
        baseStrength: 15,
        aspects: ['burst-traffic', 'read-heavy'],
        damage: { availability: 10, latency: 15, userExperience: 20 },
        description: 'Sudden 3x traffic spike during breakfast hours (7-9 AM)',
        detailedDescription: 'Your food delivery app experiences a massive surge in traffic as everyone tries to order their morning coffee and breakfast. The sudden spike overwhelms your servers, causing slow response times and potential service outages.',
        story: 'The breakfast crowd wants their orders fast!',
        symptoms: [
            'Response times increase from 200ms to 2000ms+',
            'Database queries start timing out',
            'Users report app crashes and failed orders',
            'CPU utilization spikes to 90%+'
        ],
        businessImpact: 'Peak revenue hours are at risk. Customer satisfaction drops as orders fail.',
        difficulty: 'Medium'
    },
    {
        id: 'database-meltdown',
        name: 'Database Connection Storm',
        type: 'database-overload',
        baseStrength: 20,
        aspects: ['database-load', 'cascade'],
        damage: { availability: 20, latency: 25, userExperience: 15 },
        description: 'Connection pool exhaustion leads to cascading failures',
        detailedDescription: 'Your database connection pool becomes exhausted due to high traffic. New requests cannot get database connections, causing timeouts and errors that cascade through your entire system.',
        story: 'Database connections are like parking spots - when they\'re all taken, chaos ensues!',
        symptoms: [
            'Connection pool shows 100% utilization',
            'Database timeout errors spike dramatically',
            'Application servers cannot process new requests',
            'Queue backlogs build up rapidly'
        ],
        businessImpact: 'Service becomes completely unavailable. Revenue loss and reputation damage.',
        difficulty: 'Hard'
    },
    {
        id: 'dependency-failure',
        name: 'Payment Gateway Outage',
        type: 'dependency-failure',
        baseStrength: 18,
        aspects: ['dependency', 'timeout'],
        damage: { availability: 15, latency: 10, userExperience: 25 },
        description: 'Critical payment service becomes unavailable',
        detailedDescription: 'Your payment processing service (Stripe, PayPal, etc.) goes down, but your app keeps trying to process payments, leading to timeouts and hung requests that consume resources.',
        story: 'No payment = no food = angry customers!',
        symptoms: [
            'Payment API calls return 503 Service Unavailable',
            'Request timeouts increase as calls hang',
            'Users stuck on "Processing payment..." screens',
            'Thread pool exhaustion from blocked calls'
        ],
        businessImpact: 'Unable to process any orders. Complete revenue stoppage.',
        difficulty: 'Medium'
    },
    {
        id: 'flash-crowd',
        name: 'Viral Marketing Success',
        type: 'traffic-spike',
        baseStrength: 25,
        aspects: ['burst-traffic', 'overload'],
        damage: { availability: 25, latency: 30, userExperience: 30 },
        description: 'Massive 10x traffic surge from viral social media post',
        detailedDescription: 'A celebrity posts about your app on social media, causing an instant 10x traffic surge. Your infrastructure, designed for normal load, cannot handle this massive influx of new users.',
        story: 'Going viral is every startup\'s dream... until your servers crash!',
        symptoms: [
            'Traffic jumps from 1,000 to 10,000+ concurrent users instantly',
            'All servers hit 100% CPU and memory usage',
            'Load balancers start dropping connections',
            'CDN bandwidth limits exceeded'
        ],
        businessImpact: 'Huge opportunity for growth, but poor performance drives new users away.',
        difficulty: 'Hard'
    },
    {
        id: 'api-abuse',
        name: 'API Scraper Attack',
        type: 'ddos-attack',
        baseStrength: 22,
        aspects: ['api-abuse', 'resource-exhaustion'],
        damage: { availability: 18, latency: 20, userExperience: 12 },
        description: 'Automated bot flooding your API with requests',
        detailedDescription: 'A malicious actor or poorly configured scraper is hitting your API endpoints at 1000+ requests per second, consuming all available resources and crowding out legitimate users.',
        story: 'When robots attack your restaurant recommendations!',
        symptoms: [
            'API request rate spikes to 1000+ per second',
            'Same IP addresses making repeated identical calls',
            'Legitimate user requests start failing',
            'Server resources consumed by bot traffic'
        ],
        businessImpact: 'Real customers cannot use the service. Increased infrastructure costs.',
        difficulty: 'Medium'
    },
    {
        id: 'cascade-nightmare',
        name: 'Perfect Storm Cascade',
        type: 'cascade-failure',
        baseStrength: 35,
        aspects: ['burst-traffic', 'cascade', 'dependency', 'overload'],
        damage: { availability: 30, latency: 40, userExperience: 35 },
        description: 'Multiple systems fail simultaneously creating a cascade',
        detailedDescription: 'A perfect storm: high traffic + payment service issues + database slowdown + cache expiration all happen at once. One failure triggers another, creating a devastating cascade that brings down your entire platform.',
        story: 'When everything that can go wrong, does go wrong at the same time!',
        symptoms: [
            'Multiple alerts firing simultaneously',
            'Services timing out and retrying, amplifying load',
            'Database queries backing up behind slow operations',
            'Cache misses causing database hammering',
            'Circuit breakers tripping across all services'
        ],
        businessImpact: 'Complete platform outage. Maximum revenue loss and customer churn.',
        difficulty: 'Expert',
        isBoss: true
    }
];
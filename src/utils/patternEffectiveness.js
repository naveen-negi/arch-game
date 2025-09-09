// Enhanced Pattern Effectiveness Algorithm
export class PatternEffectivenessCalculator {
  constructor() {
    // Pattern vs Challenge effectiveness matrix (inspired by AWS patterns)
    this.effectivenessMatrix = {
      'load-shedding': {
        'traffic-spike': 0.85,
        'cascade-failure': 0.7,
        'database-overload': 0.6,
        'ddos-attack': 0.9,
        'cache-stampede': 0.5
      },
      'circuit-breaker': {
        'cascade-failure': 0.95,
        'timeout-storm': 0.9,
        'dependency-failure': 0.85,
        'traffic-spike': 0.3,
        'database-overload': 0.4
      },
      'auto-scaling': {
        'traffic-spike': 0.9,
        'gradual-growth': 0.95,
        'flash-crowd': 0.6, // Slower to react
        'cost-optimization': 0.7,
        'database-overload': 0.2
      },
      'queue-management': {
        'traffic-spike': 0.7,
        'thundering-herd': 0.85,
        'async-processing': 0.9,
        'timeout-storm': 0.6,
        'cascade-failure': 0.5
      },
      'caching': {
        'read-heavy': 0.95,
        'database-overload': 0.9,
        'repeated-queries': 0.95,
        'write-heavy': 0.2,
        'cache-invalidation': -0.3 // Can make worse
      },
      'rate-limiting': {
        'ddos-attack': 0.9,
        'api-abuse': 0.95,
        'traffic-spike': 0.7,
        'legitimate-burst': -0.2, // Can block real users
        'fairness': 0.8
      }
    };
    
    // Synergy bonuses between patterns
    this.synergyMap = {
      'circuit-breaker+retry-backoff': 1.3,
      'caching+cdn': 1.4,
      'load-shedding+queue-management': 1.25,
      'auto-scaling+load-balancing': 1.35,
      'rate-limiting+circuit-breaker': 1.2,
      // Conflicts
      'aggressive-retry+circuit-breaker': 0.7,
      'sync-calls+async-queue': 0.8
    };
  }
  
  calculateEffectiveness(pattern, challenge, allPatterns, gameState) {
    // Base effectiveness from matrix
    let base = this.effectivenessMatrix[pattern.id]?.[challenge.type] || 0.5;
    
    // Time-based maturity
    let maturity = this.calculateMaturity(pattern, gameState.currentWeek);
    
    // Synergy calculations
    let synergy = this.calculateSynergies(pattern, allPatterns, challenge);
    
    // Team expertise modifier
    let expertise = this.calculateExpertiseModifier(pattern, gameState.teamExpertise);
    
    // Real-world calibration bonus
    let realWorldBonus = this.getRealWorldCalibration(pattern.id, challenge.type);
    
    // Coverage ratio - how much of the challenge this pattern addresses
    let coverage = this.calculateCoverage(pattern, challenge);
    
    // Final effectiveness calculation
    let effectiveness = base * maturity * synergy * expertise * coverage + realWorldBonus;
    
    // Clamp between 0 and 2 (can be super effective)
    return Math.max(0, Math.min(2, effectiveness));
  }
  
  calculateMaturity(pattern, currentWeek) {
    let weeksActive = currentWeek - pattern.deployedWeek;
    
    if (weeksActive < 1) return 0.5; // Just deployed, not fully effective
    if (weeksActive < 3) return 0.7 + weeksActive * 0.1; // Ramping up
    if (weeksActive < 8) return 1.0 + (weeksActive - 3) * 0.02; // Peak performance
    
    // Decay due to technical debt
    return Math.max(0.7, 1.1 * Math.exp(-0.05 * (weeksActive - 8)));
  }
  
  calculateSynergies(pattern, allPatterns, challenge) {
    let synergyBonus = 1.0;
    
    for (let other of allPatterns) {
      if (other.id === pattern.id) continue;
      
      // Check predefined synergies
      let key1 = `${pattern.id}+${other.id}`;
      let key2 = `${other.id}+${pattern.id}`;
      
      if (this.synergyMap[key1]) {
        synergyBonus *= this.synergyMap[key1];
      } else if (this.synergyMap[key2]) {
        synergyBonus *= this.synergyMap[key2];
      }
      
      // Check for category synergies
      if (pattern.category === other.category) {
        synergyBonus *= 1.05; // Small bonus for same category
      }
    }
    
    return synergyBonus;
  }
  
  calculateExpertiseModifier(pattern, teamExpertise) {
    let required = pattern.expertiseRequired || 2;
    let current = teamExpertise || 3;
    
    if (current >= required) {
      return 1.0 + (current - required) * 0.1; // Bonus for excess expertise
    } else {
      return 0.7 + (current / required) * 0.3; // Penalty for lack of expertise
    }
  }
  
  getRealWorldCalibration(patternId, challengeType) {
    // Based on real AWS incidents and postmortems
    const knownEffective = {
      'circuit-breaker': ['cascade-failure', 'dependency-failure'],
      'load-shedding': ['traffic-spike', 'ddos-attack'],
      'auto-scaling': ['gradual-growth', 'predictable-spike']
    };
    
    if (knownEffective[patternId]?.includes(challengeType)) {
      return 0.15; // Bonus for proven effectiveness
    }
    
    return 0;
  }
  
  calculateCoverage(pattern, challenge) {
    // How much of the challenge does this pattern address?
    let aspectsCovered = 0;
    let totalAspects = challenge.aspects?.length || 1;
    
    if (pattern.addresses) {
      for (let aspect of challenge.aspects || []) {
        if (pattern.addresses.includes(aspect)) {
          aspectsCovered++;
        }
      }
    }
    
    return aspectsCovered / totalAspects || 0.5; // Default 50% coverage
  }
}
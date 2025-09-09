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
    return this.calculateEffectivenessWithRationale(pattern, challenge, allPatterns, gameState).effectiveness;
  }
  
  calculateEffectivenessWithRationale(pattern, challenge, allPatterns, gameState) {
    // Base effectiveness from matrix
    let base = this.effectivenessMatrix[pattern.id]?.[challenge.type] || 0.5;
    
    // Synergy calculations
    let synergyDetails = this.calculateSynergiesWithRationale(pattern, allPatterns, challenge);
    let synergy = synergyDetails.multiplier;
    
    // Team expertise modifier
    let expertiseDetails = this.calculateExpertiseModifierWithRationale(pattern, gameState.teamExpertise);
    let expertise = expertiseDetails.multiplier;
    
    // Real-world calibration bonus
    let realWorldDetails = this.getRealWorldCalibrationWithRationale(pattern.id, challenge.type);
    let realWorldBonus = realWorldDetails.bonus;
    
    // Coverage ratio - how much of the challenge this pattern addresses
    let coverageDetails = this.calculateCoverageWithRationale(pattern, challenge);
    let coverage = coverageDetails.ratio;
    
    // Final effectiveness calculation
    let effectiveness = base * synergy * expertise * coverage + realWorldBonus;
    effectiveness = Math.max(0, Math.min(2, effectiveness));
    
    // Build comprehensive rationale
    let rationale = this.buildRationale(pattern, challenge, {
      base,
      synergy: synergyDetails,
      expertise: expertiseDetails,
      realWorld: realWorldDetails,
      coverage: coverageDetails,
      final: effectiveness
    });
    
    return {
      effectiveness,
      rationale,
      factors: {
        baseEffectiveness: Math.round(base * 100) / 100,
        synergyMultiplier: Math.round(synergy * 100) / 100,
        expertiseMultiplier: Math.round(expertise * 100) / 100,
        coverageRatio: Math.round(coverage * 100) / 100,
        realWorldBonus: Math.round(realWorldBonus * 100) / 100
      }
    };
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
  
  // Enhanced methods with rationale
  calculateSynergiesWithRationale(pattern, allPatterns, challenge) {
    let synergyBonus = 1.0;
    let synergies = [];
    let conflicts = [];
    
    for (let other of allPatterns) {
      if (other.id === pattern.id) continue;
      
      // Check predefined synergies
      let key1 = `${pattern.id}+${other.id}`;
      let key2 = `${other.id}+${pattern.id}`;
      
      if (this.synergyMap[key1]) {
        synergyBonus *= this.synergyMap[key1];
        if (this.synergyMap[key1] > 1) {
          synergies.push(`${pattern.name} + ${other.name} creates powerful synergy (${Math.round((this.synergyMap[key1] - 1) * 100)}% bonus)`);
        } else {
          conflicts.push(`${pattern.name} conflicts with ${other.name} (${Math.round((1 - this.synergyMap[key1]) * 100)}% penalty)`);
        }
      } else if (this.synergyMap[key2]) {
        synergyBonus *= this.synergyMap[key2];
        if (this.synergyMap[key2] > 1) {
          synergies.push(`${other.name} + ${pattern.name} creates synergy (${Math.round((this.synergyMap[key2] - 1) * 100)}% bonus)`);
        } else {
          conflicts.push(`${other.name} conflicts with ${pattern.name} (${Math.round((1 - this.synergyMap[key2]) * 100)}% penalty)`);
        }
      }
      
      // Check for category synergies
      if (pattern.category === other.category) {
        synergyBonus *= 1.05;
        synergies.push(`Same category as ${other.name} (5% bonus)`);
      }
    }
    
    return {
      multiplier: synergyBonus,
      synergies,
      conflicts,
      explanation: synergies.length > 0 || conflicts.length > 0 ? 
        "Pattern combinations affect effectiveness" : 
        "No significant interactions with other patterns"
    };
  }
  
  calculateExpertiseModifierWithRationale(pattern, teamExpertise) {
    let required = pattern.expertiseRequired || 2;
    let current = teamExpertise || 3;
    let multiplier;
    let explanation;
    
    if (current >= required) {
      multiplier = 1.0 + (current - required) * 0.1;
      if (current > required) {
        explanation = `Team expertise (${current}) exceeds required (${required}) - ${Math.round((multiplier - 1) * 100)}% bonus`;
      } else {
        explanation = `Team expertise perfectly matches requirements`;
      }
    } else {
      multiplier = 0.7 + (current / required) * 0.3;
      explanation = `Team expertise (${current}) below required (${required}) - ${Math.round((1 - multiplier) * 100)}% penalty`;
    }
    
    return { multiplier, explanation };
  }
  
  getRealWorldCalibrationWithRationale(patternId, challengeType) {
    const knownEffective = {
      'circuit-breaker': ['cascade-failure', 'dependency-failure'],
      'load-shedding': ['traffic-spike', 'ddos-attack'],
      'auto-scaling': ['gradual-growth', 'predictable-spike'],
      'caching': ['database-overload', 'read-heavy'],
      'rate-limiting': ['ddos-attack', 'api-abuse'],
      'queue-management': ['traffic-spike', 'thundering-herd']
    };
    
    if (knownEffective[patternId]?.includes(challengeType)) {
      return {
        bonus: 0.15,
        explanation: "Proven effective in real-world incidents (+15% bonus)"
      };
    }
    
    return {
      bonus: 0,
      explanation: "No specific real-world validation for this combination"
    };
  }
  
  calculateCoverageWithRationale(pattern, challenge) {
    let aspectsCovered = 0;
    let totalAspects = challenge.aspects?.length || 1;
    let coveredAspects = [];
    let missedAspects = [];
    
    if (pattern.addresses && challenge.aspects) {
      for (let aspect of challenge.aspects) {
        if (pattern.addresses.includes(aspect)) {
          aspectsCovered++;
          coveredAspects.push(aspect);
        } else {
          missedAspects.push(aspect);
        }
      }
    }
    
    let ratio = aspectsCovered / totalAspects || 0.5;
    let explanation;
    
    if (coveredAspects.length === 0) {
      explanation = "This pattern doesn't directly address the challenge's core issues";
    } else if (missedAspects.length === 0) {
      explanation = `Perfectly addresses all aspects: ${coveredAspects.join(', ')}`;
    } else {
      explanation = `Addresses ${coveredAspects.join(', ')} but misses ${missedAspects.join(', ')}`;
    }
    
    return { ratio, explanation, coveredAspects, missedAspects };
  }
  
  buildRationale(pattern, challenge, details) {
    let rationale = [];
    
    // Base effectiveness explanation
    let baseScore = Math.round(details.base * 100);
    if (baseScore >= 80) {
      rationale.push(`🎯 Excellent match: ${pattern.name} is highly effective against ${challenge.type} (${baseScore}% base effectiveness)`);
    } else if (baseScore >= 60) {
      rationale.push(`✅ Good fit: ${pattern.name} works well against ${challenge.type} (${baseScore}% base effectiveness)`);
    } else if (baseScore >= 40) {
      rationale.push(`⚠️ Moderate fit: ${pattern.name} has limited effectiveness against ${challenge.type} (${baseScore}% base effectiveness)`);
    } else {
      rationale.push(`❌ Poor match: ${pattern.name} is not well-suited for ${challenge.type} (${baseScore}% base effectiveness)`);
    }
    
    // Coverage explanation
    if (details.coverage.explanation) {
      rationale.push(`📋 Coverage: ${details.coverage.explanation}`);
    }
    
    // Team expertise
    if (details.expertise.explanation) {
      rationale.push(`👥 Team: ${details.expertise.explanation}`);
    }
    
    // Synergies and conflicts
    if (details.synergy.synergies.length > 0) {
      rationale.push(`🔗 Synergies: ${details.synergy.synergies.join('; ')}`);
    }
    if (details.synergy.conflicts.length > 0) {
      rationale.push(`⚡ Conflicts: ${details.synergy.conflicts.join('; ')}`);
    }
    
    // Real-world validation
    if (details.realWorld.bonus > 0) {
      rationale.push(`🌍 ${details.realWorld.explanation}`);
    }
    
    // Final assessment
    let finalScore = Math.round(details.final * 100);
    if (finalScore >= 150) {
      rationale.push(`🚀 Overall: Exceptional performance (${finalScore}% effectiveness)`);
    } else if (finalScore >= 100) {
      rationale.push(`⭐ Overall: Strong performance (${finalScore}% effectiveness)`);
    } else if (finalScore >= 70) {
      rationale.push(`👍 Overall: Adequate performance (${finalScore}% effectiveness)`);
    } else {
      rationale.push(`📉 Overall: Weak performance (${finalScore}% effectiveness)`);
    }
    
    return rationale;
  }
}
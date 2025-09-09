import { PatternEffectivenessCalculator } from './patternEffectiveness';

// Combat Resolution System
export class CombatResolver {
  constructor() {
    this.calculator = new PatternEffectivenessCalculator();
  }
  
  resolveChallenge(challenge, deployedPatterns, gameState) {
    let totalDefense = 0;
    let defenseBreakdown = [];
    
    // Calculate each pattern's contribution with detailed rationale
    for (let pattern of deployedPatterns) {
      let effectivenessDetails = this.calculator.calculateEffectivenessWithRationale(
        pattern,
        challenge,
        deployedPatterns,
        gameState
      );
      
      let defense = effectivenessDetails.effectiveness * (pattern.strength || 5);
      totalDefense += defense;
      
      defenseBreakdown.push({
        pattern: pattern.name,
        patternId: pattern.id,
        contribution: Math.round(defense * 100) / 100,
        effectiveness: Math.round(effectivenessDetails.effectiveness * 100) / 100,
        rationale: effectivenessDetails.rationale,
        factors: effectivenessDetails.factors
      });
    }
    
    // Use base challenge strength directly
    let challengeStrength = challenge.baseStrength || 10;
    
    // Calculate damage
    let damageRatio = challengeStrength > 0 ? 
      Math.max(0, (challengeStrength - totalDefense) / challengeStrength) : 0;
    let damage = {};
    
    for (let [metric, maxDamage] of Object.entries(challenge.damage || {})) {
      const calculatedDamage = maxDamage * damageRatio;
      damage[metric] = isNaN(calculatedDamage) ? 0 : Math.round(calculatedDamage);
    }
    
    // Determine success level
    let success;
    if (damageRatio < 0.3) success = 'perfect';
    else if (damageRatio < 0.6) success = 'good';
    else if (damageRatio < 0.9) success = 'adequate';
    else success = 'failed';
    
    return {
      challengeStrength: Math.round(challengeStrength),
      totalDefense: Math.round(totalDefense),
      damage,
      defenseBreakdown,
      success,
      damageRatio
    };
  }
  
  calculateScoreGain(success) {
    switch (success) {
      case 'perfect': return 50;
      case 'good': return 30;
      case 'adequate': return 10;
      case 'failed': return 0;
      default: return 0;
    }
  }
}
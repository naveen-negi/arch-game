import { PatternEffectivenessCalculator } from './patternEffectiveness';

// Combat Resolution System
export class CombatResolver {
  constructor() {
    this.calculator = new PatternEffectivenessCalculator();
  }
  
  resolveChallenge(challenge, deployedPatterns, diceRoll, gameState) {
    let totalDefense = 0;
    let defenseBreakdown = [];
    
    // Calculate each pattern's contribution
    for (let pattern of deployedPatterns) {
      if (pattern.completionWeek && pattern.completionWeek > gameState.currentWeek) {
        continue; // Pattern not yet active
      }
      
      let effectiveness = this.calculator.calculateEffectiveness(
        pattern,
        challenge,
        deployedPatterns,
        gameState
      );
      
      let defense = effectiveness * (pattern.strength || 5);
      totalDefense += defense;
      
      defenseBreakdown.push({
        pattern: pattern.name,
        contribution: defense,
        effectiveness: effectiveness
      });
    }
    
    // Apply dice roll to challenge strength with safety checks
    const dice1 = diceRoll?.value1 || 1;
    const dice2 = diceRoll?.value2 || 1;
    let diceMultiplier = (dice1 + dice2) / 7;
    let challengeStrength = (challenge.baseStrength || 10) * diceMultiplier;
    
    // Critical hit/miss on doubles
    if (dice1 === dice2) {
      if (dice1 <= 2) {
        challengeStrength *= 0.5; // Lucky - challenge weakened
      } else if (dice1 >= 5) {
        challengeStrength *= 1.5; // Unlucky - challenge strengthened
      }
    }
    
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
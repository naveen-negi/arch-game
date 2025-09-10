import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import { ChevronRight, CheckCircle, Trophy, Shield, TrendingUp, AlertCircle, Info, Sparkles, Star, Zap } from 'lucide-react';

const ResolutionPhase = ({ onNextChallenge, gameState, isLastChallenge }) => {
    const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const combatResult = gameState.lastCombatResult;

    useEffect(() => {
        // Trigger celebration animation for successful defenses
        if (combatResult && (combatResult.success === 'perfect' || combatResult.success === 'good')) {
            setShowCelebration(true);
            const timer = setTimeout(() => setShowCelebration(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [combatResult]);

    const getSuccessColor = (success) => {
        switch (success) {
            case 'perfect': return 'text-green-400';
            case 'good': return 'text-blue-400';
            case 'adequate': return 'text-yellow-400';
            case 'failed': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getSuccessIcon = (success) => {
        switch (success) {
            case 'perfect': return '🏆';
            case 'good': return '✅';
            case 'adequate': return '⚠️';
            case 'failed': return '❌';
            default: return '❓';
        }
    };

    return (
        <div className="relative">
            {/* Celebration Effects */}
            {showCelebration && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    {/* Confetti effect */}
                    <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} 
                                className="absolute animate-ping"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 0.5}s`,
                                    animationDuration: '1s'
                                }}>
                                <Sparkles className="w-6 h-6 text-yellow-400" />
                            </div>
                        ))}
                    </div>
                    {/* Celebration text */}
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="text-6xl animate-bounce">🎉</div>
                        <div className="text-2xl font-bold text-green-400 text-center animate-pulse">
                            Excellent Defense!
                        </div>
                    </div>
                </div>
            )}

            <h2 className={`text-2xl font-bold mb-4 text-yellow-400 animate-slide-up ${
                combatResult?.success === 'perfect' ? 'animate-celebrate' : ''
            }`}>
                🛡️ Challenge Resolved!
            </h2>

            {/* Combat Result Summary */}
            {combatResult && (
                <div className={`bg-gradient-to-r backdrop-blur-sm rounded-xl p-6 mb-4 border-2 transition-all duration-500 animate-fade-in-scale ${
                    combatResult.success === 'perfect' ? 'from-green-900/50 to-emerald-900/50 border-green-400 animate-pulse-glow' :
                    combatResult.success === 'good' ? 'from-blue-900/50 to-cyan-900/50 border-blue-400' :
                    combatResult.success === 'adequate' ? 'from-yellow-900/50 to-orange-900/50 border-yellow-400' :
                    'from-red-900/50 to-pink-900/50 border-red-400 animate-shake'
                }`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="relative">
                                <span className={`text-4xl mr-4 transition-all duration-300 ${
                                    combatResult.success === 'perfect' ? 'animate-celebrate' : 
                                    combatResult.success === 'failed' ? 'animate-wiggle' : ''
                                }`}>
                                    {getSuccessIcon(combatResult.success)}
                                </span>
                                {combatResult.success === 'perfect' && (
                                    <div className="absolute -top-2 -right-2 animate-bounce">
                                        <Star className="w-6 h-6 text-yellow-400" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold ${getSuccessColor(combatResult.success)} animate-slide-in-left`}>
                                    {combatResult.success.charAt(0).toUpperCase() + combatResult.success.slice(1)} Defense!
                                </h3>
                                <div className="flex items-center mt-2">
                                    <Zap className="w-4 h-4 text-blue-400 mr-2" />
                                    <p className="text-gray-300">
                                        <span className="font-semibold text-red-400">{combatResult.challengeStrength}</span> challenge strength vs 
                                        <span className="font-semibold text-blue-400 ml-1">{combatResult.totalDefense.toFixed(1)}</span> total defense
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`p-4 rounded-lg backdrop-blur-sm ${
                                combatResult.damageRatio < 0.3 ? 'bg-green-500/20' :
                                combatResult.damageRatio < 0.7 ? 'bg-yellow-500/20' : 'bg-red-500/20'
                            }`}>
                                <p className="text-sm text-gray-400 mb-1">Damage Taken</p>
                                <p className={`text-3xl font-bold ${combatResult.damageRatio < 0.3 ? 'text-green-400' : combatResult.damageRatio < 0.7 ? 'text-yellow-400' : 'text-red-400'} ${
                                    combatResult.damageRatio < 0.3 ? 'animate-bounce' : combatResult.damageRatio > 0.8 ? 'animate-shake' : ''
                                }`}>
                                    {Math.round(combatResult.damageRatio * 100)}%
                                </p>
                                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
                                    <div className={`h-full transition-all duration-1000 ${
                                        combatResult.damageRatio < 0.3 ? 'bg-green-400' :
                                        combatResult.damageRatio < 0.7 ? 'bg-yellow-400' : 'bg-red-400'
                                    }`} style={{width: `${Math.round(combatResult.damageRatio * 100)}%`}} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Success message */}
                    <div className={`text-center p-3 rounded-lg backdrop-blur-sm ${
                        combatResult.success === 'perfect' ? 'bg-green-500/20 text-green-300' :
                        combatResult.success === 'good' ? 'bg-blue-500/20 text-blue-300' :
                        combatResult.success === 'adequate' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                    }`}>
                        {combatResult.success === 'perfect' && "🌟 Outstanding! Your architecture withstood the challenge brilliantly!"}
                        {combatResult.success === 'good' && "👍 Well done! Your defenses performed admirably!"}
                        {combatResult.success === 'adequate' && "⚡ Decent defense, but there's room for improvement!"}
                        {combatResult.success === 'failed' && "💪 Challenge failed, but every failure teaches valuable lessons!"}
                    </div>
                </div>
            )}

            <div className="bg-green-900 bg-opacity-30 border border-green-600 rounded-lg p-6 mb-4">
                <div className="flex items-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                    <h3 className="text-xl font-bold text-green-400">System Status</h3>
                </div>
                
                <p className="text-gray-300 mb-4">
                    Your architectural patterns have been tested! Check the metrics below to see the impact.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <h4 className="text-sm text-gray-400 mb-1">Availability</h4>
                        <p className={`text-2xl font-bold ${(gameState.metrics.availability || 95) > 95 ? 'text-green-400' : 'text-red-400'}`}>
                            {(gameState.metrics.availability || 95).toFixed(1)}%
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <h4 className="text-sm text-gray-400 mb-1">Latency</h4>
                        <p className={`text-2xl font-bold ${(gameState.metrics.latency || 800) < 500 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.round(gameState.metrics.latency || 800)}ms
                        </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                        <h4 className="text-sm text-gray-400 mb-1">User Experience</h4>
                        <p className={`text-2xl font-bold ${(gameState.metrics.userExperience || 70) > 70 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.round(gameState.metrics.userExperience || 70)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Pattern Analysis */}
            {combatResult && combatResult.defenseBreakdown && combatResult.defenseBreakdown.length > 0 && (
                <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Shield className="w-6 h-6 text-blue-400 mr-2" />
                            <h3 className="text-xl font-bold text-blue-400">Pattern Analysis</h3>
                        </div>
                        <button
                            onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                            className="flex items-center text-blue-300 hover:text-blue-200 transition-colors"
                        >
                            <Info className="w-4 h-4 mr-1" />
                            {showDetailedAnalysis ? 'Hide Details' : 'Show Details'}
                        </button>
                    </div>

                    <div className="space-y-4">
                        {combatResult.defenseBreakdown.map((pattern, index) => (
                            <div key={index} className="bg-blue-800 bg-opacity-30 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-blue-300">{pattern.pattern}</h4>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-400">
                                            Effectiveness: <span className="text-blue-300 font-semibold">{Math.round(pattern.effectiveness * 100)}%</span>
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            Defense: <span className="text-blue-300 font-semibold">{pattern.contribution}</span>
                                        </span>
                                    </div>
                                </div>

                                {showDetailedAnalysis && pattern.rationale && (
                                    <div className="mt-3 space-y-2">
                                        {pattern.rationale.map((reason, ratIndex) => (
                                            <div key={ratIndex} className="text-sm text-gray-300 bg-gray-900 bg-opacity-50 p-3 rounded">
                                                {reason}
                                            </div>
                                        ))}
                                        
                                        {pattern.factors && (
                                            <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2">
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400">Base</p>
                                                    <p className="text-sm font-semibold text-blue-300">{pattern.factors.baseEffectiveness}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400">Synergy</p>
                                                    <p className="text-sm font-semibold text-purple-300">{pattern.factors.synergyMultiplier}x</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400">Expertise</p>
                                                    <p className="text-sm font-semibold text-green-300">{pattern.factors.expertiseMultiplier}x</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400">Coverage</p>
                                                    <p className="text-sm font-semibold text-yellow-300">{pattern.factors.coverageRatio}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-400">Real-world</p>
                                                    <p className="text-sm font-semibold text-orange-300">+{pattern.factors.realWorldBonus}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {!showDetailedAnalysis && (
                        <p className="text-center text-gray-400 text-sm mt-4">
                            Click "Show Details" to see why each pattern was effective or ineffective
                        </p>
                    )}
                </div>
            )}

            {/* Educational Recommendations */}
            {combatResult && showDetailedAnalysis && (
                <div className="bg-indigo-900 bg-opacity-30 border border-indigo-600 rounded-lg p-6 mb-6">
                    <div className="flex items-center mb-4">
                        <TrendingUp className="w-6 h-6 text-indigo-400 mr-2" />
                        <h3 className="text-xl font-bold text-indigo-400">Learning Insights</h3>
                    </div>
                    
                    <div className="space-y-3">
                        {combatResult.success === 'failed' && (
                            <div className="bg-red-800 bg-opacity-30 p-4 rounded-lg">
                                <h4 className="font-semibold text-red-300 mb-2">💡 Areas for Improvement:</h4>
                                <ul className="text-sm text-gray-300 space-y-1">
                                    <li>• Consider patterns that directly address the challenge's core issues</li>
                                    <li>• Look for synergistic combinations between patterns</li>
                                    <li>• Ensure your team has adequate expertise for complex patterns</li>
                                </ul>
                            </div>
                        )}
                        
                        {combatResult.success === 'perfect' && (
                            <div className="bg-green-800 bg-opacity-30 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-300 mb-2">🏆 Excellent Defense Strategy:</h4>
                                <p className="text-sm text-gray-300">
                                    Your pattern selection and team expertise created a highly effective defense. 
                                    Notice how different patterns worked together to address multiple aspects of the challenge.
                                </p>
                            </div>
                        )}
                        
                        <div className="bg-blue-800 bg-opacity-30 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-300 mb-2">📚 Key Learnings:</h4>
                            <ul className="text-sm text-gray-300 space-y-1">
                                <li>• Real-world effectiveness is based on proven incident responses</li>
                                <li>• Pattern synergies can significantly boost overall defense</li>
                                <li>• Team expertise affects how well patterns are implemented</li>
                                <li>• Coverage matters - patterns should address the challenge's specific aspects</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Score Summary */}
            <div className="bg-purple-900 bg-opacity-30 border border-purple-600 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Trophy className="w-6 h-6 text-purple-400 mr-2" />
                        <span className="text-purple-300 font-semibold">Current Score</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-400">{gameState.score}</span>
                </div>
            </div>

            {isLastChallenge ? (
                <div className="text-center">
                    <div className="bg-gold-900 bg-opacity-30 border border-yellow-500 rounded-lg p-6 mb-4">
                        <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-yellow-400 mb-2">🎉 Game Complete!</h3>
                        <p className="text-gray-300">
                            You've successfully navigated all challenges! Final Score: <span className="text-yellow-400 font-bold">{gameState.score}</span>
                        </p>
                    </div>
                </div>
            ) : (
                <Button
                    onClick={onNextChallenge}
                    variant="success"
                    icon={ChevronRight}
                    className="w-full"
                >
                    Continue to Next Challenge
                </Button>
            )}
        </div>
    );
};

export default ResolutionPhase;
import React, { useState } from 'react';
import Button from '../UI/Button';
import { ChevronRight, CheckCircle, Trophy, Shield, TrendingUp, AlertCircle, Info } from 'lucide-react';

const ResolutionPhase = ({ onNextChallenge, gameState, isLastChallenge }) => {
    const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
    const combatResult = gameState.lastCombatResult;

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
        <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Challenge Resolved!</h2>

            {/* Combat Result Summary */}
            {combatResult && (
                <div className="bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">{getSuccessIcon(combatResult.success)}</span>
                            <div>
                                <h3 className={`text-xl font-bold ${getSuccessColor(combatResult.success)}`}>
                                    {combatResult.success.charAt(0).toUpperCase() + combatResult.success.slice(1)} Defense!
                                </h3>
                                <p className="text-gray-400">
                                    {combatResult.challengeStrength} challenge strength vs {combatResult.totalDefense.toFixed(1)} total defense
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Damage Ratio</p>
                            <p className={`text-xl font-bold ${combatResult.damageRatio < 0.3 ? 'text-green-400' : combatResult.damageRatio < 0.7 ? 'text-yellow-400' : 'text-red-400'}`}>
                                {Math.round(combatResult.damageRatio * 100)}%
                            </p>
                        </div>
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
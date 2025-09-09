import React from 'react';
import Card from '../UI/Card';
import { Shield } from 'lucide-react';

const DeployedPatterns = ({ patterns, currentWeek }) => {
    return (
        <Card title="Deployed Patterns" icon={Shield} className="mt-4">
            <div className="space-y-2">
                {patterns.length === 0 ? (
                    <p className="text-gray-500 text-sm">No patterns deployed yet</p>
                ) : (
                    patterns.map((pattern, idx) => (
                        <div key={idx} className="bg-gray-700 p-2 rounded text-sm">
                            <div className="flex justify-between">
                                <span>{pattern.name}</span>
                                <span className={
                                    pattern.completionWeek <= currentWeek
                                        ? 'text-green-400'
                                        : 'text-yellow-400'
                                }>
                  {pattern.completionWeek <= currentWeek
                      ? '✓ Active'
                      : `Week ${pattern.completionWeek}`}
                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default DeployedPatterns;
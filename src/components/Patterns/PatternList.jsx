import React from 'react';
import PatternCard from './PatternCard';
import Card from '../UI/Card';
import { getAllPatterns } from '../../data/patterns';

const PatternList = ({ selectedPattern, onSelectPattern, budget }) => {
    const allPatterns = getAllPatterns();

    return (
        <Card title="Available Patterns">
            <div className="space-y-2 max-h-96 overflow-y-auto">
                {allPatterns.map(pattern => (
                    <PatternCard
                        key={pattern.id}
                        pattern={pattern}
                        selected={selectedPattern?.id === pattern.id}
                        onSelect={onSelectPattern}
                        disabled={budget < pattern.cost}
                    />
                ))}
            </div>
        </Card>
    );
};

export default PatternList;
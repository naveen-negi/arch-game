import React from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const Dice = ({ value, rolling }) => {
    const DiceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const DiceIcon = DiceIcons[value - 1] || Dice1;

    return (
        <div className={`inline-block ${rolling ? 'animate-spin' : ''}`}>
            <DiceIcon className="w-12 h-12 text-blue-600" />
        </div>
    );
};

export default Dice;
import { useState } from 'react';

export const useDice = () => {
    const [diceState, setDiceState] = useState({
        value1: 1,
        value2: 1,
        rolling: false,
        total: 2
    });

    const rollDice = () => {
        setDiceState(prev => ({ ...prev, rolling: true }));

        setTimeout(() => {
            const value1 = Math.floor(Math.random() * 6) + 1;
            const value2 = Math.floor(Math.random() * 6) + 1;

            setDiceState({
                value1,
                value2,
                rolling: false,
                total: value1 + value2
            });
        }, 500);
    };

    return { diceState, rollDice };
};
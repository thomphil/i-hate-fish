import type { Meta } from '@storybook/react';
import { useState, useEffect } from 'react';


import FishDial from './FishDial';

export default {
    title: 'FishDial',
    component: FishDial,
    tags: ['autodocs'],
    parameters: {   
        controls: { hideNoControlsWarning: true },
        layout: 'centered',
    },
    args: {
        fishPerSecond: 1,
    },
} as Meta;

export const AutoIncrement = () => {
    const [fishPerSecond, setFishPerSecond] = useState(1);
    
    useEffect(() => {
        let value = fishPerSecond;
        const interval = setInterval(() => {
            value = value * 1.1; // Exponential growth
            setFishPerSecond(value);
        }, 100);    
            
        return () => {
            clearInterval(interval);
        };
    }, [fishPerSecond]);

    return <FishDial fishPerSecond={ fishPerSecond } />
};

export const ManualIncrement = ({fishPerSecond}:{fishPerSecond: number}) => {
    return <FishDial fishPerSecond={ fishPerSecond } />
}
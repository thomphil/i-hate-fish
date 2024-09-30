import { useEffect, useState, useRef } from 'react'
import './App.css'

import Unit from './components/Unit';

import GameRuntime from './core/GameRuntime';
import BonusTable from './components/BonusTable';

export type Method = {
  name: string;
  count: number;
  level: number;
  efficiency: number;
  basePrice: number;
  costGrowFactor: number;
  costDiscountFactor: number;
  active: boolean;
}

const initialMethodsState = [
  {
    name: 'Fishing Rod',
    count: 0,
    level: 0,
    efficiency: 0.1,
    basePrice: 10,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: true,
  }, {
    name: 'Net',
    count: 0,
    level: 0,
    efficiency: 10,
    basePrice: 10_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
  }, {
    name: 'Harpoon',
    count: 0,
    level: 0,
    efficiency: 10_000,
    basePrice: 10_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
  }, {
    name: 'Fishing Boat',
    count: 0,
    level: 0,
    efficiency: 1_000_000,
    basePrice: 10_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
  }, {
    name: 'Fishing Fleet',
    count: 0,
    level: 0,
    efficiency: 1_000_000_000,
    basePrice: 10_000_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
  }, {
    name: 'Fishing Planet',
    count: 0,
    level: 0,
    efficiency: 1_000_000_000_000,
    basePrice: 10_000_000_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
  }, {
    name: 'Fishing Universe',
    count: 0,
    level: 0,
    efficiency: 1_000_000_000_000_000,
    basePrice: 10_000_000_000_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
  }, {
    name: 'Fishing Multiverse',
    count: 0,
    level: 0,
    efficiency: 1_000_000_000_000_000_000,
    basePrice: 10_000_000_000_000_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
  }, {
    name: 'Fishing Omniverse',
    count: 0,
    level: 0,
    efficiency: 1_000_000_000_000_000_000_000,
    basePrice: 10_000_000_000_000_000_000_000_000,
    costGrowFactor: 1.01,
    costDiscountFactor: 1,
    active: false,
  }
]

const App = () => {
  const [fishErradicated, setFishErradicated] = useState(10);
  const [fishCount, setFishCount] = useState(10);
  const [methodsState, setMethodsState] = useState(initialMethodsState);
  const clickRate = 100

  const fishCountRef = useRef(fishCount);
  const methodsStateRef = useRef(methodsState);
  const clickRateRef = useRef(clickRate);

  useEffect(() => {
    fishCountRef.current = fishCount;
  }, [fishCount]);

  useEffect(() => {
    methodsStateRef.current = methodsState;
  }, [methodsState]);

  useEffect(() => {
    clickRateRef.current = clickRate;
  }, [clickRate]);

  useEffect(() => {
    const game = new GameRuntime(methodsStateRef, setFishErradicated, setFishCount);
    game.start();

    return () => {
      game.stop();
    };
  }, []);

  const getFishPerSecond = () => {
    const fishPerSecond = methodsState.reduce((acc, method) => {
      let newFishPerSecond = method.count * method.efficiency;

      if (method.level > 0) {
        newFishPerSecond *= method.level * 5;
      }

      const bonus = Math.floor(Math.log10(method.count) / 1);
      newFishPerSecond *= Math.pow(10, bonus);

      return acc + newFishPerSecond;
    }, 0);

    return Intl.NumberFormat('en-US', { notation: 'engineering' }).format(fishPerSecond);
  }

  return (
    <div>
      <div className="header">
        <div>
          <BonusTable divider={1} />
        </div>
        <div>
          <h2>Fish Erradicated: {Intl.NumberFormat('en-US', { notation: 'engineering' }).format(fishErradicated)}</h2>
          <h3>Fish stock count: {Intl.NumberFormat('en-US', { notation: 'engineering'}).format(Math.floor(fishCount))}</h3>
          <h3>Fish/per second: {getFishPerSecond()} </h3>
        </div>
      </div>
      <div className="methods">
        {methodsState.map((method, index) => (
          <Unit
            key={index}
            method={method}
            clickRateRef={clickRateRef}
            fishCountRef={fishCountRef}
            setFishCount={setFishCount}
            setMethodsState={setMethodsState}
          />
        ))}
      </div>
    </div>
  )
}

export default App

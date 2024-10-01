import { useEffect, useState, useRef } from 'react'
import './App.css'

import Unit from './components/Unit';

import GameRuntime from './core/GameRuntime';
import BonusTable from './components/BonusTable';
import { initialMethodsState } from './Method.tsx';
import { formatNumber } from './core/Utilities.ts';
import FishDial from './components/FishDial';

const App = () => {
  const [fishErradicated, setFishErradicated] = useState(10);
  const [fishCount, setFishCount] = useState(10);
  const [fishPerSecond, setFishPerSecond] = useState(0);
  const [methodsState, setMethodsState] = useState(initialMethodsState);
  const clickRate = 100;

  const fishCountRef = useRef(fishCount);
  const methodsStateRef = useRef(methodsState);

  useEffect(() => {
    fishCountRef.current = fishCount;
  }, [fishCount]);

  useEffect(() => {
    methodsStateRef.current = methodsState;
  }, [methodsState]);

  useEffect(() => {
    const game = new GameRuntime(methodsStateRef, setMethodsState, setFishErradicated, setFishCount, setFishPerSecond);
    game.start();

    return () => {
      game.stop();
    };
  }, []);

  return (
    <div>
      <FishDial fishPerSecond={fishPerSecond}/>
      <div className="header">
        <div>
          <BonusTable divider={1} />
        </div>
        <div>
          <h2>Fish Erradicated: {formatNumber(Math.floor(fishErradicated))}</h2>
          <h3>Fish stock count: {formatNumber(Math.floor(fishCount))}</h3>
          <h3>Fish/per second: {formatNumber(fishPerSecond)} </h3>
        </div>
      </div>
      <div className="methods">
        {methodsState.map((method, index) => (
          <Unit
            key={index}
            method={method}
            clickRate={clickRate}
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

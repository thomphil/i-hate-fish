import React, { useEffect, useRef, useState } from 'react';
import { Method } from '../App';

type UnitParams = {
    method: Method;
    fishCountRef: React.MutableRefObject<number>
    clickRateRef: React.MutableRefObject<number>
    setFishCount: (value: number | ((prevState: number) => number)) => void;
    setMethodsState: (value: any) => void | ((prevState: any) => any);
  };

const Unit = ({
  method,
  fishCountRef,
  clickRateRef,
  setFishCount,
  setMethodsState,
  }: UnitParams) => {
    const buyIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const upgradeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isBuyActive, setIsBuyActive] = useState(false);
    const [isUpgradeActive, setIsUpgradeActive] = useState(false);  
    const countRef = useRef(method.count);
    const levelRef = useRef(method.level);
    const priceRef = useRef(0);
    const upgradePriceRef = useRef(0);
    const buyProgressionRef = useRef(0);
    const upgradeProgressionRef = useRef(0);

    useEffect(() => {
      countRef.current = method.count;
    }, [method.count]);

    useEffect(() => {
      levelRef.current = method.level;
    }, [method.level]);

    useEffect(() => {
      priceRef.current = calculatePrice();
    }, [method.count, method.level, method.costGrowFactor, method.costDiscountFactor]);

    useEffect(() => {
      upgradePriceRef.current = calculateUpgradePrice();
    }, [method.level,]);

    useEffect(() => {
      // percent of price left to save
      buyProgressionRef.current = fishCountRef.current / priceRef.current;
    }, [priceRef.current, fishCountRef.current]);

    useEffect(() => {
      // percent of price left to save
      upgradeProgressionRef.current = fishCountRef.current / upgradePriceRef.current;
    }, [upgradePriceRef.current, fishCountRef.current]);

    useEffect(() => {
      // Cleanup interval on component unmount
      return () => {
        if (buyIntervalRef.current) {
          clearInterval(buyIntervalRef.current);
        }
      };
    }, []);

    const calculatePrice = () => {
      return method.basePrice * Math.pow(method.costGrowFactor, method.count) * method.costDiscountFactor;
    }

    const calculateUpgradePrice = () => {
      return method.basePrice * 100 * (method.level + 1)
    }

    const getFishPerSecond = () => {
      let fishPerSecond = method.count * method.efficiency;

      if (method.level > 0) {
        fishPerSecond *= method.level * 5;
      }

      const bonus = Math.floor(Math.log10(method.count) / 1);
      fishPerSecond *= Math.pow(10, bonus);

      // return engineering notation
      return Intl.NumberFormat('en-US', { notation: 'engineering' }).format(fishPerSecond);
    }

    const setMethodAttribute = (attribute: string, value: number) => {
      setMethodsState((methodsState: Array<Method>) => {
        return methodsState.map((m: any) => {
          if (m.name === method.name) {
            return {
              ...m,
              [attribute]: value,
            };
          }
          return m;
        });
      });
    }
  
    const buy = () => {
      // click rate between 0 and 100
      // click this many times a second
      const clickRate = clickRateRef.current;
  
      const interval = setInterval(() => {
        setFishCount((prevFishCount) => {
          const price = priceRef.current;
          if (prevFishCount < price) return prevFishCount;

          setMethodAttribute('count', countRef.current + 1);

          return prevFishCount - price
        });
      }, 1000 / clickRate);

      buyIntervalRef.current = interval;
    };

    const stopBuy = () => {
      if (buyIntervalRef.current) {
        clearInterval(buyIntervalRef.current);
        buyIntervalRef.current = null;
      }
    };

    const buttonToggle = (button: string) => {
      if (button === 'buy') {
        if (buyIntervalRef.current) {
          stopBuy();
          setIsBuyActive(false);
        } else {
          buy();
          setIsBuyActive(true);
        }
      } else if (button === 'upgrade') {
        if (upgradeIntervalRef.current) {
          stopUpgrade();
          setIsUpgradeActive(false);
        } else {
          upgrade();
          setIsUpgradeActive(true);
        }
      }
    }

    const upgrade = () => {
      const clickRate = clickRateRef.current;

      const interval = setInterval(() => {
        setFishCount((prevFishCount) => {
          const price = upgradePriceRef.current;
          if (prevFishCount < price) return prevFishCount;

          setMethodAttribute('level', levelRef.current + 1);

          return prevFishCount - price
        });
      }, 1000 / clickRate);

      upgradeIntervalRef.current = interval;
    };

    const stopUpgrade = () => {
      if (upgradeIntervalRef.current) {
        clearInterval(upgradeIntervalRef.current);
        upgradeIntervalRef.current = null;
      }
    };
  
    return (
      <div className="method">
        <h3>{method.name}</h3>
        <div className="method-body">
          <div className="stats">
            <div>Count: {Intl.NumberFormat('en-US', { notation: 'engineering' }).format(method.count)}</div>
            <div>Buy: {Intl.NumberFormat('en-US', { notation: 'engineering' }).format(calculatePrice())}</div>
            <div>Upgrade: {Intl.NumberFormat('en-US', { notation: 'engineering' }).format(calculateUpgradePrice())}</div>
            <div>FPS: {getFishPerSecond()}</div>
          </div>
          
          <div className="buttons">
          <div
            className={`button-event ${isBuyActive ? 'active' : ''}`}
            onClick={() => buttonToggle('buy')}
            >
            <button disabled={calculatePrice() > fishCountRef.current} >Buy</button>
            <input type="range" min="0" max="1" step="0.0001" value={buyProgressionRef.current} disabled/>
          </div>
          <div
            className={`button-event ${isUpgradeActive ? 'active' : ''}`}
            onClick={() => buttonToggle('upgrade')}
          >
            <button disabled={calculateUpgradePrice() > fishCountRef.current} >Upgrade</button>
            <input type="range" min="0" max="1" step="0.0001" value={upgradeProgressionRef.current} disabled/>
          </div>
          </div>
        </div>
      </div>
    )
  }

export default Unit;
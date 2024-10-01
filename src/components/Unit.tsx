import React, { useEffect, useRef, useState } from 'react';
import { Method } from '../Method';
import { formatNumber } from '../core/Utilities';

type UnitParams = {
    method: Method;
    fishCountRef: React.MutableRefObject<number>
    clickRate: number;
    setFishCount: (value: number | ((prevState: number) => number)) => void;
    setMethodsState: (value: Array<Method> | ((prevState: Array<Method>) => Array<Method>)) => void;
  };

const Unit = ({
  method,
  fishCountRef,
  clickRate,
  setFishCount,
  setMethodsState,
  }: UnitParams) => {
    const buyIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const upgradeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isBuyActive, setIsBuyActive] = useState(false);
    const [isUpgradeActive, setIsUpgradeActive] = useState(false);  
    const [buyProgressWidth, setBuyProgressWidth] = useState(0);
    const [upgradeProgressWidth, setUpgradeProgressWidth] = useState(0);

    const countRef = useRef(method.count);
    const levelRef = useRef(method.level);
    const priceRef = useRef(0);
    const upgradePriceRef = useRef(0);

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
      setBuyProgressWidth((fishCountRef.current / priceRef.current) * 100);
    }, [priceRef.current, fishCountRef.current]);

    useEffect(() => {
      // percent of price left to save
      setUpgradeProgressWidth((fishCountRef.current / upgradePriceRef.current) * 100);
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

    const setMethodAttribute = (attribute: string, value: number) => {
      setMethodsState((methodsState) => {
        return methodsState.map((m: Method) => {
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
            <div>Count: {formatNumber(method.count)}</div>
            <div>Upgrade Level: {formatNumber(method.level)}</div>
            <div>Buy: {formatNumber(calculatePrice())}</div>
            <div>Upgrade: {formatNumber(calculateUpgradePrice())}</div>
            <div>FPS: {formatNumber(method.fps)}</div>
          </div>
          
          <div className="buttons">
          <div
            className={`button-event ${isBuyActive ? 'active' : ''}`}
            onClick={() => buttonToggle('buy')}
            >
            <div className={`button ${calculatePrice() > fishCountRef.current ? "disabled" : ""}`} >Buy</div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${buyProgressWidth}%` }}
              ></div>
            </div>
          </div>
          <div
            className={`button-event ${isUpgradeActive ? 'active' : ''}`}
            onClick={() => buttonToggle('upgrade')}
          >
            <div className={`button ${calculateUpgradePrice() > fishCountRef.current ? "disabled" : ""}`} >Upgrade</div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${upgradeProgressWidth}%` }}
              ></div>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }

export default Unit;
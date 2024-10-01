import '../components/FishDial.css';


export default function FishDial({ fishPerSecond }: { fishPerSecond: number }) {
    // Determine the range
    let rangeMin = 1;
    let rangeMax = 100;
    let level = 0;

    while (fishPerSecond >= rangeMax) {
      level++;
      rangeMin *= 100;
      rangeMax *= 100;
    }
  
    // Normalize the value within the current range
    const normalizedValue = (fishPerSecond - rangeMin) / (rangeMax - rangeMin);
  
    // Calculate the rotation for the needle
    const rotation = normalizedValue * 180 - 90;
  
    return (
      <div className="gauge">
        <svg viewBox="0 0 100 50" className="gauge-svg">
          <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#ccc" strokeWidth="10" />
          <line
            className="gauge-needle"
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            stroke={`#${level.toString().padStart(3, '0')}`}
            strokeWidth="2"
            transform={`rotate(${rotation} 50 50)`}
          />
        </svg>
        <div className="gauge-value">{fishPerSecond.toFixed(2)}</div>
        <div className="gauge-range">Range: {rangeMin} - {rangeMax}</div>
        <div className="gauge-level">Level: {level}</div>
      </div>
    );
  }

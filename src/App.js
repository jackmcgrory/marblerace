import React, { useState } from 'react';
import './App.css';
import { Wheel } from 'react-custom-roulette';

const initDataWheel1 = [
  { option: '18-24', style: { backgroundColor: '#ff9999', textColor: 'black' } },
  { option: '25-29', style: { backgroundColor: '#ffcc99', textColor: 'black' } },
  { option: '30-39', style: { backgroundColor: '#ffff99', textColor: 'black' } },
  { option: '40-49', style: { backgroundColor: '#ccff99', textColor: 'black' } },
  { option: '50-59', style: { backgroundColor: '#99ff99', textColor: 'black' } },
  { option: '60-69', style: { backgroundColor: '#99ffcc', textColor: 'black' } },
  { option: '70-79', style: { backgroundColor: '#99ffff', textColor: 'black' } },
  { option: 'Unknown', style: { backgroundColor: '#99ccff', textColor: 'black' } },
 ];

const initDataWheel2 = [
  { option: 'Life Insurance', style: { backgroundColor: '#ff9999', textColor: 'black' } },
  { option: 'Car Insurance', style: { backgroundColor: '#ffcc99', textColor: 'black' } },
  { option: 'Critical Illness', style: { backgroundColor: '#ffff99', textColor: 'black' } },
  { option: 'Home Insurance', style: { backgroundColor: '#ccff99', textColor: 'black' } },
  { option: 'Contents Insurance', style: { backgroundColor: '#99ff99', textColor: 'black' } },
  { option: 'Travel Insurance', style: { backgroundColor: '#99ffff', textColor: 'black' } },
  { option: 'Draw Down Pension', style: { backgroundColor: '#99ccff', textColor: 'black' } },
  { option: 'Annuities', style: { backgroundColor: '#9999ff', textColor: 'black' } },
  { option: 'Retirement Living Std.', style: { backgroundColor: '#cc99ff', textColor: 'black' } },
  { option: 'Loans and Interest', style: { backgroundColor: '#ff99ff', textColor: 'black' } },
  { option: 'ISAs', style: { backgroundColor: '#ff9999', textColor: 'black' } },
  { option: 'Index Funds', style: { backgroundColor: '#ffcc99', textColor: 'black' } },
  { option: 'Pot Consolidation', style: { backgroundColor: '#ffff99', textColor: 'black' } },
  { option: 'Investment Risk/Reward', style: { backgroundColor: '#ccff99', textColor: 'black' }},
  { option: 'Missing Pensions', style: { backgroundColor: '#ffff99', textColor: 'black' } },
  { option: 'Ready Made Investments', style: { backgroundColor: '#ccff99', textColor: 'black' }  },
];

function App() {
  const [dataWheel1, setDataWheel1] = useState(initDataWheel1);
  const [dataWheel2, setDataWheel2] = useState(initDataWheel2);
  const [startSpin1, setStartSpin1] = useState(false);
  const [startSpin2, setStartSpin2] = useState(false);
  const [prizeNumber1, setPrizeNumber1] = useState(0);
  const [prizeNumber2, setPrizeNumber2] = useState(0);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [logs, setLogs] = useState([]);
  const [spinCount, setSpinCount] = useState(0);
  const [firstSpin, setFirstSpin] = useState(true);

  const handleSpin = () => {
    if (firstSpin){
      setFirstSpin(false);
    }else{
      // remove items
      removeWheelData()
    }
    const randomPrizeNumber1 = Math.floor(Math.random() * dataWheel1.length);
    const randomPrizeNumber2 = Math.floor(Math.random() * dataWheel2.length);
    setPrizeNumber1(randomPrizeNumber1);
    setPrizeNumber2(randomPrizeNumber2);
    setStartSpin1(true);
    setStartSpin2(true);
    setShowResults(false);
  };

  const onFinishSpin1 = () => {
    setStartSpin1(false);
    setResult1(dataWheel1[prizeNumber1].option);
    console.log('Wheel 1 finished spinning');
  };

  const onFinishSpin2 = () => {
    setStartSpin2(false);
    setResult2(dataWheel2[prizeNumber2].option);
    console.log('Wheel 2 finished spinning');
    setShowResults(true);
    const newLogs = [...logs, `Team ${spinCount + 1}: Demographic: ${dataWheel1[prizeNumber1].option} Reason to Download: ${dataWheel2[prizeNumber2].option}`];
    setLogs(newLogs);
    setSpinCount(spinCount + 1);
  };

  const removeWheelData = () => {
    const newDataWheel1 = [...dataWheel1];
    newDataWheel1.splice(prizeNumber1, 1);
    setDataWheel1(newDataWheel1);
    const newDataWheel2 = [...dataWheel2];
    newDataWheel2.splice(prizeNumber2, 1);
    setDataWheel2(newDataWheel2);
  }

  return (
    <div className="App">
      <h1>Hub Day</h1>
      <div className="wheels">
        <div className="wheel-container">
          <h2>Demographic</h2>
          <Wheel
            mustStartSpinning={startSpin1}
            prizeNumber={prizeNumber1}
            data={dataWheel1}
            fontSize={15}
            backgroundColors={['#3e3e3e', '#df3428']}
            textColors={['#ffffff']}
            onStopSpinning={onFinishSpin1}
          />
        </div>
        <div className="wheel-container">
          <h2>Reason to Download the App</h2>
          <Wheel
            mustStartSpinning={startSpin2}
            prizeNumber={prizeNumber2}
            data={dataWheel2}
            fontSize={15}
            backgroundColors={['#3e3e3e', '#df3428']}
            textColors={['#ffffff']}
            onStopSpinning={onFinishSpin2}
          />
        </div>
      </div>
      <button onClick={handleSpin}>Spin Both Wheels</button>
      {showResults && (
        <div className="results prominent">
          <p>{`Demographic: ${result1} Reason to Download: ${result2}`}</p>
        </div>
      )}
      <div className="logs">
        {logs.map((log, index) => (
          <p className='log-entry' key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default App;

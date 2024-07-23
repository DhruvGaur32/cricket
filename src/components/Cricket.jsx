import React, { useState } from 'react';

const Scoreboard = () => {
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [extras, setExtras] = useState(0);
  const [batsmen, setBatsmen] = useState([
    { name: 'Batsman 1', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: '' },
    { name: 'Batsman 2', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: '' }
  ]);
  const [currentBatsmen, setCurrentBatsmen] = useState([0, 1]); // index of current batsmen
  const [strikerIndex, setStrikerIndex] = useState(0); // index of the striker batsman
  const [bowlers, setBowlers] = useState([
    { name: 'Bowler 1', overs: 0, balls: 0, runs: 0, wickets: 0 }
  ]);
  const [currentBowlerIndex, setCurrentBowlerIndex] = useState(0); // index of the current bowler
  const [dismissalInfo, setDismissalInfo] = useState(null);
  const [isOverComplete, setIsOverComplete] = useState(false);
  const [showWideOptions, setShowWideOptions] = useState(false);
  const [showNoBallOptions, setShowNoBallOptions] = useState(false);
  const [showLegByeOptions, setShowLegByeOptions] = useState(false);

  const calculateStrikeRate = (runs, balls) => {
    return balls ? ((runs / balls) * 100).toFixed(2) : 0;
  };

  const calculateEconomy = (runs, overs, balls) => {
    const totalBalls = overs * 6 + balls;
    return totalBalls ? (runs / (totalBalls / 6)).toFixed(2) : 0;
  };

  const handleRun = (runs, isNoBall = false) => {
    setScore(score + runs + (isNoBall ? 1 : 0));
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].runs += runs + (isNoBall ? 1 : 0);
    newBowlers[currentBowlerIndex].economy = calculateEconomy(newBowlers[currentBowlerIndex].runs, newBowlers[currentBowlerIndex].overs, newBowlers[currentBowlerIndex].balls);
    setBowlers(newBowlers);

    if (!isNoBall) {
      const newBatsmen = [...batsmen];
      newBatsmen[currentBatsmen[strikerIndex]].runs += runs;
      newBatsmen[currentBatsmen[strikerIndex]].balls += 1;
      newBatsmen[currentBatsmen[strikerIndex]].strikeRate = calculateStrikeRate(newBatsmen[currentBatsmen[strikerIndex]].runs, newBatsmen[currentBatsmen[strikerIndex]].balls);
      if (runs === 4) newBatsmen[currentBatsmen[strikerIndex]].fours += 1;
      if (runs === 6) newBatsmen[currentBatsmen[strikerIndex]].sixes += 1;
      setBatsmen(newBatsmen);

      handleBall();
    } else {
      const newBatsmen = [...batsmen];
      newBatsmen[currentBatsmen[strikerIndex]].runs += runs;
      setBatsmen(newBatsmen);
    }

    // Rotate strike if runs are odd
    if (runs % 2 !== 0) {
      setStrikerIndex(1 - strikerIndex);
    }
  };

  const handleDotBall = () => {
    const newBatsmen = [...batsmen];
    newBatsmen[currentBatsmen[strikerIndex]].balls += 1;
    newBatsmen[currentBatsmen[strikerIndex]].strikeRate = calculateStrikeRate(newBatsmen[currentBatsmen[strikerIndex]].runs, newBatsmen[currentBatsmen[strikerIndex]].balls);
    setBatsmen(newBatsmen);
    handleBall();
  };

  const handleWicket = (dismissalType) => {
    setWickets(wickets + 1);
    const newBatsmen = [...batsmen];
    const bowlerName = bowlers[currentBowlerIndex].name;
    newBatsmen[currentBatsmen[strikerIndex]].dismissal = `${dismissalType} by ${bowlerName}`;
    setBatsmen(newBatsmen);
    setDismissalInfo(`${newBatsmen[currentBatsmen[strikerIndex]].name} is out! ${dismissalType} by ${bowlerName}`);

    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].wickets += 1;
    newBowlers[currentBowlerIndex].economy = calculateEconomy(newBowlers[currentBowlerIndex].runs, newBowlers[currentBowlerIndex].overs, newBowlers[currentBowlerIndex].balls);
    setBowlers(newBowlers);

    const newBatsmanName = prompt('Enter new batsman name:');
    if (newBatsmanName) {
      const nextBatsmanIndex = batsmen.length;
      setBatsmen([...batsmen, { name: newBatsmanName, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: '' }]);
      setCurrentBatsmen([currentBatsmen[1], nextBatsmanIndex]);
    } else {
      // In case no new batsman is provided, set a default name
      const nextBatsmanIndex = batsmen.length;
      setBatsmen([...batsmen, { name: `Batsman ${nextBatsmanIndex + 1}`, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: '' }]);
      setCurrentBatsmen([currentBatsmen[1], nextBatsmanIndex]);
    }

    handleBall();
  };

  const handleOver = () => {
    setOvers(overs + 1);
    setBalls(0);
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].overs += 1;
    newBowlers[currentBowlerIndex].balls = 0;
    newBowlers[currentBowlerIndex].economy = calculateEconomy(newBowlers[currentBowlerIndex].runs, newBowlers[currentBowlerIndex].overs, newBowlers[currentBowlerIndex].balls);
    setBowlers(newBowlers);
    setStrikerIndex(1 - strikerIndex); // Rotate strike at the end of the over
    setIsOverComplete(true);
  };

  const handleBall = () => {
    setBalls(balls + 1);
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].balls += 1;
    newBowlers[currentBowlerIndex].economy = calculateEconomy(newBowlers[currentBowlerIndex].runs, newBowlers[currentBowlerIndex].overs, newBowlers[currentBowlerIndex].balls);
    setBowlers(newBowlers);

    if (balls + 1 === 6) {
      handleOver();
    }
  };

  const handleWide = (runs = 0) => {
    setScore(score + 1 + runs); // Add 1 run for wide ball plus any additional runs
    setExtras(extras + 1 + runs);
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].runs += 1 + runs;
    newBowlers[currentBowlerIndex].economy = calculateEconomy(newBowlers[currentBowlerIndex].runs, newBowlers[currentBowlerIndex].overs, newBowlers[currentBowlerIndex].balls);
    setBowlers(newBowlers);
    setShowWideOptions(false);
  };

  const handleNoBall = (runs = 0) => {
    setScore(score + 1 + runs); // Add 1 run for no ball plus any additional runs
    setExtras(extras + 1 + runs);
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].runs += 1 + runs;
    newBowlers[currentBowlerIndex].economy = calculateEconomy(newBowlers[currentBowlerIndex].runs, newBowlers[currentBowlerIndex].overs, newBowlers[currentBowlerIndex].balls);
    setBowlers(newBowlers);
    const newBatsmen = [...batsmen];
    newBatsmen[currentBatsmen[strikerIndex]].runs += runs;
    newBatsmen[currentBatsmen[strikerIndex]].strikeRate = calculateStrikeRate(newBatsmen[currentBatsmen[strikerIndex]].runs, newBatsmen[currentBatsmen[strikerIndex]].balls);
    setBatsmen(newBatsmen);

    setShowNoBallOptions(false);
  };

  const handleLegBye = (runs) => {
    setScore(score + runs);
    setExtras(extras + runs);
    handleBall();
    setShowLegByeOptions(false);

    // Rotate strike if leg bye runs are odd
    if (runs % 2 !== 0) {
      setStrikerIndex(1 - strikerIndex);
    }
  };

  const changeBowler = () => {
    if (!isOverComplete) {
      alert('Bowler cannot be changed before completing an over!');
      return;
    }
    const newBowlerName = prompt('Enter new bowler name:');
    if (newBowlerName) {
      const newBowlers = [...bowlers, { name: newBowlerName, overs: 0, balls: 0, runs: 0, wickets: 0 }];
      setBowlers(newBowlers);
      setCurrentBowlerIndex(bowlers.length);
      setIsOverComplete(false);
    }
  };

  const formatOvers = (overs, balls) => {
    return `${Math.floor(overs)}.${balls}`;
  };

  return (
    <div>
      <h1>Live Cricket Scoreboard</h1>
      <div className="flex items-center justify-center border-2 rounded-sm">
        <h2>Score: {score}/{wickets}</h2>
        <h3>Overs: {formatOvers(overs, balls)}</h3>
        <h4>Extras: {extras}</h4>
        </div>
      <div className="flex items-center justify-center">
        <h3>Current Batsmen:</h3>
        {currentBatsmen.map((index, i) => (
          <div key={i}>
            <strong>{batsmen[index].name}{strikerIndex === i ? '*' : ''}</strong> {batsmen[index].runs} ({batsmen[index].balls})
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <h3>Current Bowler:</h3>
        <div>
          <strong>{bowlers[currentBowlerIndex].name}</strong> - {bowlers[currentBowlerIndex].overs}.{bowlers[currentBowlerIndex].balls} overs, {bowlers[currentBowlerIndex].runs} runs, {bowlers[currentBowlerIndex].wickets} wickets
        </div>
      </div>
      <div>
        <h3>Actions:</h3>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(1)}>1 Run</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(2)}>2 Runs</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(3)}>3 Runs</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(4)}>4 Runs</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(6)}>6 Runs</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={handleDotBall}>Dot Ball</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => setShowWideOptions(true)}>Wide Ball</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => setShowNoBallOptions(true)}>No Ball</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => setShowLegByeOptions(true)}>Leg Bye</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleWicket('Caught')}>Wicket - Caught</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleWicket('Bowled')}>Wicket - Bowled</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleWicket('LBW')}>Wicket - LBW</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={changeBowler}>Change Bowler</button>
      </div>

      {showWideOptions && (
        <div>
          <h4>Wide Ball - Additional Runs:</h4>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleWide(0)}>0 Runs</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleWide(1)}>1 Run</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleWide(2)}>2 Runs</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleWide(3)}>3 Runs</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleWide(4)}>4 Runs</button>
        </div>
      )}

      {showNoBallOptions && (
        <div>
          <h4>No Ball - Additional Runs:</h4>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleNoBall(0)}>0 Runs</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleNoBall(1)}>1 Run</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleNoBall(2)}>2 Runs</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleNoBall(3)}>3 Runs</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleNoBall(4)}>4 Runs</button>
        </div>
      )}

      {showLegByeOptions && (
        <div>
          <h4>Leg Bye - Runs:</h4>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleLegBye(1)}>1 Run</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleLegBye(2)}>2 Runs</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleLegBye(3)}>3 Runs</button>
          <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleLegBye(4)}>4 Runs</button>
        </div>
      )}

      {dismissalInfo && <div><strong>{dismissalInfo}</strong></div>}
    
    <div className="batting-section my-5 w-90% p-4">
    <h3 className="text-left text-2xl font-bold">Scorecard</h3>
    <table className="w-full border-collapse mt-2">
      <thead>
        <tr>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">Batter</th>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">R</th>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">B</th>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">4s</th>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">6s</th>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">SR</th>
         
        </tr>
      </thead>
      <tbody>
        {batsmen.map((batsman, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2 text-left text-base">{batsman.name} {batsman.dismissal}</td>
            <td className="border border-gray-300 p-2 text-left text-base">{batsman.runs}</td>
            <td className="border border-gray-300 p-2 text-left text-base">{batsman.balls}</td>
            <td className="border border-gray-300 p-2 text-left text-base">{batsman.fours}</td>
            <td className="border border-gray-300 p-2 text-left text-base">{batsman.sixes}</td>
            <td className="border border-gray-300 p-2 text-left text-base">{batsman.strikeRate}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="batting-section my-5 w-90% p-4">
    <h3 className="text-left text-2xl font-bold">Bowling Scorecard</h3>
    <table className="w-full border-collapse mt-2">
      <thead>
        <tr>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">Bowler</th>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">Overs</th>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">Runs</th>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">Economy</th>
          <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">Wickets</th>
        </tr>
      </thead>
      <tbody>
        {bowlers.map((bowler, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2 text-left text-base">{bowler.name}</td>
            <td className="border border-gray-300 p-2 text-left text-base">{formatOvers(bowler.overs, bowler.balls)}</td>
            <td className="border border-gray-300 p-2 text-left text-base">{bowler.runs}</td>
            <td className="border border-gray-300 p-2 text-left text-base">{bowler.economy}</td>
            <td className="border border-gray-300 p-2 text-left text-base">{bowler.wickets}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default Scoreboard;

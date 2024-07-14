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

  const calculateStrikeRate = (runs, balls) => {
    return balls ? ((runs / balls) * 100).toFixed(2) : 0;
  };

  const handleRun = (runs, isNoBall = false) => {
    setScore(score + runs + (isNoBall ? 1 : 0));
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].runs += runs + (isNoBall ? 1 : 0);
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
    setBowlers(newBowlers);

    setStrikerIndex(1 - strikerIndex); // Rotate strike at the end of the over
    setIsOverComplete(true);
  };

  const handleBall = () => {
    setBalls(balls + 1);
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].balls += 1;
    setBowlers(newBowlers);

    if (balls + 1 === 6) {
      handleOver();
    }
  };

  const handleWide = () => {
    setScore(score + 1); // Add 1 run for wide ball
    setExtras(extras + 1);
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].runs += 1;
    setBowlers(newBowlers);
  };

  const handleNoBall = () => {
    setScore(score + 1); // Add 1 run for no ball
    setExtras(extras + 1);
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].runs += 1;
    setBowlers(newBowlers);
  };

  const handleLegBye = (runs) => {
    setScore(score + runs);
    setExtras(extras + runs);

    handleBall();

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
      <div>
        <h2>Score: {score}/{wickets}</h2>
        <h3>Overs: {formatOvers(overs, balls)}</h3>
        <h4>Extras: {extras}</h4>
      </div>
      <div>
        <h3>Current Batsmen:</h3>
        {currentBatsmen.map((index, i) => (
          <p key={index}>{batsmen[index].name} {i === strikerIndex ? '*' : ''} - {batsmen[index].runs} ({batsmen[index].balls})</p>
        ))}
      </div>
      <div>
        <h3>Current Bowler:</h3>
        <p>{bowlers[currentBowlerIndex].name} - {formatOvers(bowlers[currentBowlerIndex].overs, bowlers[currentBowlerIndex].balls)}, {bowlers[currentBowlerIndex].runs} runs, {bowlers[currentBowlerIndex].wickets} wickets</p>
      </div>
      <div>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={handleDotBall}>Dot 0 Runs</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(1)}>1 Run</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(2)}>2 Runs</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(3)}>3 Runs</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(4)}>4 Runs</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(6)}>6 Runs</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(1, true)}>1 Run (No Ball)</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(2, true)}>2 Runs (No Ball)</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(3, true)}>3 Runs (No Ball)</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(4, true)}>4 Runs (No Ball)</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleRun(6, true)}>6 Runs (No Ball)</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={handleWide}>Wide Ball</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={handleNoBall}>No Ball</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleLegBye(1)}>Leg Bye (1)</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleLegBye(2)}>Leg Bye (2)</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleLegBye(3)}>Leg Bye (3)</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={() => handleLegBye(4)}>Leg Bye (4)</button>
        <button className="bg-purple-400  rounded text-black m-4 p-2" onClick={() => handleWicket('Caught')}>Wicket (Caught)</button>
        <button className="bg-purple-400  rounded text-black m-4 p-2" onClick={() => handleWicket('Bowled')}>Wicket (Bowled)</button>
        <button className="bg-purple-400  rounded text-black m-4 p-2" onClick={() => handleWicket('Run Out')}>Wicket (Run Out)</button>
        <button className="bg-purple-400  rounded text-black m-4 p-2" onClick={() => handleWicket('Stumped')}>Wicket (Stumped)</button>
        <button className="bg-purple-400  rounded text-black m-4 p-2" onClick={() => handleWicket('LBW')}>Wicket (LBW)</button>
        <button className="bg-purple-400  rounded text-black m-4 p-2" onClick={handleWide}>Wide Ball</button>
        <button className="bg-purple-400 rounded text-black m-4 p-2" onClick={changeBowler}>Change Bowler</button>
      </div>
      {dismissalInfo && <div><h3>{dismissalInfo}</h3></div>}
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
              <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">Dismissal</th>
            </tr>
          </thead>
          <tbody>
            {batsmen.map((batsman, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-left text-base">{batsman.name}</td>
                <td className="border border-gray-300 p-2 text-left text-base">{batsman.runs}</td>
                <td className="border border-gray-300 p-2 text-left text-base">{batsman.balls}</td>
                <td className="border border-gray-300 p-2 text-left text-base">{batsman.fours}</td>
                <td className="border border-gray-300 p-2 text-left text-base">{batsman.sixes}</td>
                <td className="border border-gray-300 p-2 text-left text-base">{batsman.strikeRate}</td>
                <td className="border border-gray-300 p-2 text-left text-base">{batsman.dismissal}</td>
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
              <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">Wickets</th>
            </tr>
          </thead>
          <tbody>
            {bowlers.map((bowler, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-left text-base">{bowler.name}</td>
                <td className="border border-gray-300 p-2 text-left text-base">{formatOvers(bowler.overs, bowler.balls)}</td>
                <td className="border border-gray-300 p-2 text-left text-base">{bowler.runs}</td>
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


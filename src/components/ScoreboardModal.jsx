import React, { useState } from 'react';
import ScoreboardModal from './ScoreboardModal';

const ScoreEditingPage = ({ 
  score, setScore, wickets, setWickets, overs, setOvers, balls, setBalls, extras, setExtras, 
  batsmen, setBatsmen, currentBatsmen, setCurrentBatsmen, strikerIndex, setStrikerIndex,
  bowlers, setBowlers, currentBowlerIndex, setCurrentBowlerIndex, dismissalInfo, setDismissalInfo
}) => {
  const [showWideOptions, setShowWideOptions] = useState(false);
  const [showNoBallOptions, setShowNoBallOptions] = useState(false);
  const [showLegByeOptions, setShowLegByeOptions] = useState(false);
  const [isOverComplete, setIsOverComplete] = useState(false);

  const calculateStrikeRate = (runs, balls) => (balls ? ((runs / balls) * 100).toFixed(2) : 0);
  const calculateEconomy = (runs, overs, balls) => ((runs / ((overs * 6) + balls) * 6).toFixed(2) || 0);

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
    let dismissalDetail = `${dismissalType} by ${bowlerName}`;
    if (dismissalType === 'Caught') {
      const fielderName = prompt('Enter the fielder\'s name:');
      dismissalDetail = `${dismissalType[0]} by ${fielderName} b ${bowlerName}`;
    }
    newBatsmen[currentBatsmen[strikerIndex]].dismissal = dismissalDetail;
    setBatsmen(newBatsmen);
    setDismissalInfo(`${newBatsmen[currentBatsmen[strikerIndex]].name} is out! ${dismissalDetail}`);

    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].wickets += 1;
    newBowlers[currentBowlerIndex].economy = calculateEconomy(newBowlers[currentBowlerIndex].runs, newBowlers[currentBowlerIndex].overs, newBowlers[currentBowlerIndex].balls);
    setBowlers(newBowlers);

    const newBatsmanName = prompt('Enter new batsman name:') || `Batsman ${batsmen.length + 1}`;
    const nextBatsmanIndex = batsmen.length;
    setBatsmen([...batsmen, { name: newBatsmanName, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: '' }]);
    setCurrentBatsmen([currentBatsmen[1], nextBatsmanIndex]);
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
    setStrikerIndex(1 - strikerIndex);
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
    setScore(score + 1 + runs);
    setExtras(extras + 1 + runs);
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].runs += 1 + runs;
    newBowlers[currentBowlerIndex].economy = calculateEconomy(newBowlers[currentBowlerIndex].runs, newBowlers[currentBowlerIndex].overs, newBowlers[currentBowlerIndex].balls);
    setBowlers(newBowlers);
    setShowWideOptions(false);
  };

  const handleNoBall = (runs = 0) => {
    setScore(score + 1 + runs);
    setExtras(extras + 1 + runs);
    const newBowlers = [...bowlers];
    newBowlers[currentBowlerIndex].runs += 1 + runs;
    newBowlers[currentBowlerIndex].economy = calculateEconomy(newBowlers[currentBowlerIndex].runs, newBowlers[currentBowlerIndex].overs, newBowlers[currentBowlerIndex].balls);
    setBowlers(newBowlers);
    setShowNoBallOptions(false);
  };

  const handleLegBye = (runs = 0) => {
    setScore(score + runs);
    setExtras(extras + runs);
    const newBatsmen = [...batsmen];
    newBatsmen[currentBatsmen[strikerIndex]].balls += 1;
    newBatsmen[currentBatsmen[strikerIndex]].strikeRate = calculateStrikeRate(newBatsmen[currentBatsmen[strikerIndex]].runs, newBatsmen[currentBatsmen[strikerIndex]].balls);
    setBatsmen(newBatsmen);
    handleBall();
    setShowLegByeOptions(false);
  };

  return (
    <div className='bg-gray-800 h-full w-full text-amber-50'>
      <h1 className='text-5xl'>Score Editing Page</h1>
      <ScoreboardModal 
        score={score} 
        wickets={wickets} 
        overs={overs} 
        balls={balls} 
        extras={extras}
        currentBatsmen={currentBatsmen} 
        batsmen={batsmen} 
        currentBowler={bowlers[currentBowlerIndex]} 
        bowlers={bowlers}
        dismissalInfo={dismissalInfo} 
        strikerIndex={strikerIndex}
      />
      <div className="controls">
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2"  onClick={() => handleRun(1)}>1 Run</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleRun(2)}>2 Runs</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleRun(3)}>3 Runs</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleRun(4)}>4 Runs</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleRun(6)}>6 Runs</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={handleDotBall}>Dot Ball</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => setShowWideOptions(true)}>Wide</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => setShowNoBallOptions(true)}>No Ball</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => setShowLegByeOptions(true)}>Leg Bye</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleWicket('Bowled')}>Wicket: Bowled</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleWicket('Caught')}>Wicket: Caught</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleWicket('LBW')}>Wicket: LBW</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleWicket('Run Out')}>Wicket: Run Out</button>
        <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={handleOver}>End Over</button>
      </div>
      {showWideOptions && (
        <div>
          <h3 className='font-bold'>Wide Options</h3>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleWide(0)}>Wide - No Extra Runs</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleWide(1)}>Wide - 1 Extra Run</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleWide(2)}>Wide - 2 Extra Runs</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleWide(3)}>Wide - 3 Extra Runs</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => setShowWideOptions(false)}>Close</button>
        </div>
      )}
      {showNoBallOptions && (
        <div>
          <h3 className='font-bold'>No Ball Options</h3>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleNoBall(0)}>No Ball - No Extra Runs</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleNoBall(1)}>No Ball - 1 Extra Run</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleNoBall(2)}>No Ball - 2 Extra Runs</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleNoBall(3)}>No Ball - 3 Extra Runs</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => setShowNoBallOptions(false)}>Close</button>
        </div>
      )}
      {showLegByeOptions && (
        <div>
          <h3 className='font-bold'>Leg Bye Options</h3>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleLegBye(0)}>Leg Bye - No Extra Runs</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleLegBye(1)}>Leg Bye - 1 Extra Run</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleLegBye(2)}>Leg Bye - 2 Extra Runs</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => handleLegBye(3)}>Leg Bye - 3 Extra Runs</button>
          <button className="bg-gray-900 rounded text-amber-50 m-4 p-2" onClick={() => setShowLegByeOptions(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ScoreEditingPage;

import React, { useState } from 'react';
import ScoreboardDisplay from './ScoreboardDisplay';
import ScoreboardEditor from './ScoreboardEditor';

const Scoreboard = () => {
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [extras, setExtras] = useState(0);
  const [batsmen, setBatsmen] = useState([
    { name: 'Batsman 1', runs: 0, balls: 0 },
    { name: 'Batsman 2', runs: 0, balls: 0 },
  ]);
  const [strikerIndex, setStrikerIndex] = useState(0);
  const [bowlers, setBowlers] = useState([
    { name: 'Bowler 1', overs: 0, balls: 0, runs: 0, wickets: 0 },
  ]);
  const [currentBowlerIndex, setCurrentBowlerIndex] = useState(0);
  const [dismissalInfo, setDismissalInfo] = useState('');
  const [showWideOptions, setShowWideOptions] = useState(false);
  const [showNoBallOptions, setShowNoBallOptions] = useState(false);
  const [showLegByeOptions, setShowLegByeOptions] = useState(false);

  const handleRun = (runs) => {
    const newScore = score + runs;
    setScore(newScore);

    const currentBatsman = batsmen[strikerIndex];
    const updatedBatsmen = batsmen.map((batsman, index) => 
      index === strikerIndex ? { ...batsman, runs: batsman.runs + runs, balls: batsman.balls + 1 } : batsman
    );
    setBatsmen(updatedBatsmen);

    if (runs % 2 !== 0) {
      setStrikerIndex((strikerIndex + 1) % 2);
    }

    // Handle overs and balls
    if (balls === 5) {
      setOvers(overs + 1);
      setBalls(0);
    } else {
      setBalls(balls + 1);
    }

    // Update bowler stats
    const updatedBowlers = bowlers.map((bowler, index) =>
      index === currentBowlerIndex ? { ...bowler, runs: bowler.runs + runs, balls: bowler.balls + 1 } : bowler
    );
    setBowlers(updatedBowlers);
  };

  const handleDotBall = () => {
    handleRun(0);
  };

  const handleWideBall = () => {
    const newExtras = extras + 1;
    setExtras(newExtras);

    // Wide ball adds an extra run and does not count as a ball
    const updatedBowlers = bowlers.map((bowler, index) =>
      index === currentBowlerIndex ? { ...bowler, runs: bowler.runs + 1, balls: bowler.balls + 1 } : bowler
    );
    setBowlers(updatedBowlers);

    // Optionally reset the ball count if a wide ball is considered a no-ball
    // setBalls(balls); // Uncomment if wide ball does not reset the ball count

    setShowWideOptions(false);
  };

  const handleNoBall = (runs) => {
    const newScore = score + runs;
    setScore(newScore);

    const updatedBatsmen = batsmen.map((batsman, index) =>
      index === strikerIndex ? { ...batsman, runs: batsman.runs + runs, balls: batsman.balls + 1 } : batsman
    );
    setBatsmen(updatedBatsmen);

    // Update bowler stats
    const updatedBowlers = bowlers.map((bowler, index) =>
      index === currentBowlerIndex ? { ...bowler, runs: bowler.runs + runs, balls: bowler.balls + 1 } : bowler
    );
    setBowlers(updatedBowlers);

    setExtras(extras + 1);
    setShowNoBallOptions(false);
  };

  const handleLegBye = (runs) => {
    const newScore = score + runs;
    setScore(newScore);

    // Leg byes are added to the score but do not count as runs for the batsman
    setExtras(extras + runs);

    const updatedBowlers = bowlers.map((bowler, index) =>
      index === currentBowlerIndex ? { ...bowler, balls: bowler.balls + 1 } : bowler
    );
    setBowlers(updatedBowlers);

    setShowLegByeOptions(false);
  };

  const handleWicket = (type) => {
    const currentBatsman = batsmen[strikerIndex];
    const updatedBatsmen = batsmen.map((batsman, index) =>
      index === strikerIndex ? { ...batsman, balls: batsman.balls + 1 } : batsman
    );
    setBatsmen(updatedBatsmen);
    setWickets(wickets + 1);
    setDismissalInfo(`Wicket - ${type}`);
    setStrikerIndex((strikerIndex + 1) % 2);
    handleDotBall();
  };

  const changeBowler = () => {
    const newBowlerIndex = (currentBowlerIndex + 1) % bowlers.length;
    setCurrentBowlerIndex(newBowlerIndex);
    setBowlers(bowlers.map((bowler, index) =>
      index === newBowlerIndex ? { ...bowler, overs: bowler.overs + 1, balls: 0 } : bowler
    ));
  };

  return (
    <div>
      <ScoreboardDisplay
        score={score}
        wickets={wickets}
        overs={overs}
        balls={balls}
        extras={extras}
        batsmen={batsmen}
        strikerIndex={strikerIndex}
        bowlers={bowlers}
        currentBowlerIndex={currentBowlerIndex}
        dismissalInfo={dismissalInfo}
      />
      <ScoreboardEditor
        handleRun={handleRun}
        handleDotBall={handleDotBall}
        handleWicket={handleWicket}
        changeBowler={changeBowler}
        setShowWideOptions={setShowWideOptions}
        setShowNoBallOptions={setShowNoBallOptions}
        setShowLegByeOptions={setShowLegByeOptions}
      />
      {showWideOptions && (
        <div>
          <button onClick={handleWideBall}>Confirm Wide Ball</button>
          <button onClick={() => setShowWideOptions(false)}>Cancel</button>
        </div>
      )}
      {showNoBallOptions && (
        <div>
          <button onClick={() => handleNoBall(1)}>1 Run (No Ball)</button>
          <button onClick={() => handleNoBall(2)}>2 Runs (No Ball)</button>
          <button onClick={() => handleNoBall(3)}>3 Runs (No Ball)</button>
          <button onClick={() => handleNoBall(4)}>4 Runs (No Ball)</button>
          <button onClick={() => handleNoBall(6)}>6 Runs (No Ball)</button>
          <button onClick={() => setShowNoBallOptions(false)}>Cancel</button>
        </div>
      )}
      {showLegByeOptions && (
        <div>
          <button onClick={() => handleLegBye(1)}>1 Run (Leg Bye)</button>
          <button onClick={() => handleLegBye(2)}>2 Runs (Leg Bye)</button>
          <button onClick={() => handleLegBye(3)}>3 Runs (Leg Bye)</button>
          <button onClick={() => handleLegBye(4)}>4 Runs (Leg Bye)</button>
          <button onClick={() => handleLegBye(6)}>6 Runs (Leg Bye)</button>
          <button onClick={() => setShowLegByeOptions(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Scoreboard;

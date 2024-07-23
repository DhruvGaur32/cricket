import React from 'react';

const ScoreboardDisplay = ({
  score,
  wickets,
  overs,
  balls,
  extras,
  batsmen,
  strikerIndex,
  bowlers,
  currentBowlerIndex,
  dismissalInfo,
}) => {
  const formatOvers = (overs, balls) => `${Math.floor(overs)}.${balls}`;

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
        {batsmen.map((batsman, i) => (
          <div key={i}>
            <strong>{batsman.name}{strikerIndex === i ? '*' : ''}</strong> {batsman.runs} ({batsman.balls})
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <h3>Current Bowler:</h3>
        <div>
          <strong>{bowlers[currentBowlerIndex].name}</strong> - {bowlers[currentBowlerIndex].overs}.{bowlers[currentBowlerIndex].balls} overs, {bowlers[currentBowlerIndex].runs} runs, {bowlers[currentBowlerIndex].wickets} wickets
        </div>
      </div>
      {dismissalInfo && <div><strong>{dismissalInfo}</strong></div>}
    </div>
  );
};

export default ScoreboardDisplay;

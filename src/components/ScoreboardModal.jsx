// ScoreboardModal.jsx
import React from 'react';

const ScoreboardModal = ({ score, wickets, overs, balls, extras, currentBatsmen, batsmen, currentBowler, bowlers, dismissalInfo }) => {
  const formatOvers = (overs, balls) => `${Math.floor(overs)}.${balls}`;
  
  return (
    <div className="modal">
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
            <strong>{batsmen[index].name}{i === 0 ? '*' : ''}</strong> {batsmen[index].runs} ({batsmen[index].balls})
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <h3>Current Bowler:</h3>
        <div>
          <strong>{currentBowler.name}</strong> - {currentBowler.overs}.{currentBowler.balls} overs, {currentBowler.runs} runs, {currentBowler.wickets} wickets
        </div>
      </div>
      {dismissalInfo && <div><strong>{dismissalInfo}</strong></div>}
    </div>
  );
};

export default ScoreboardModal;

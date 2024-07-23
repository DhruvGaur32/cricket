import React from 'react';

const ScoreboardEditor = ({
  handleRun,
  handleDotBall,
  handleWicket,
  changeBowler,
  setShowWideOptions,
  setShowNoBallOptions,
  setShowLegByeOptions,
}) => {
  return (
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
  );
};

export default ScoreboardEditor;

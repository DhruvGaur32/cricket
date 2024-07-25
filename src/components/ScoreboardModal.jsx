import React from 'react';

const ScoreboardModal = ({ score, wickets, overs, balls, extras, currentBatsmen, batsmen, currentBowler, bowlers, dismissalInfo,strikerIndex }) => {
  const formatOvers = (overs, balls) => `${Math.floor(overs)}.${balls}`;

  return (
    <div className="modal bg-gray-900 text-white p-4 sm:p-6 rounded-md shadow-lg mx-2 sm:mx-auto my-10 max-w-4xl lg:my-20">
      <h1 className="text-center text-xl font-bold mb-4">Live Cricket Scoreboard"</h1>
      <div className="flex items-center justify-between mb-4 border-b pb-4 border-gray-700">
        <div className="flex items-center">
          <div>
            <h2 className="text-lg font-semibold">IIT KGP</h2>
            <h3>{score}/{wickets} ({formatOvers(overs, balls)})</h3>
          </div>
          <img src="kgp.png" alt="India" className="w-auto h-12 sm:w-10 sm:h-6 mr-2 m-2 p-2 lg:h-auto" />
        </div>

        {/* Ensure this div also has flex properties to align next to IIT KGP */}
        <div className="flex items-center">
          <img src="knp.png" alt="Zimbabwe" className="w-auto h-12 sm:w-10 sm:h-6 mr-2 m-2 p-2 lg:h-auto" />
          <div>
            <h2 className="text-lg font-semibold">IIT KNP</h2>
            <h3>Yet to Bat</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <h3 className="font-semibold">Current Batsmen:</h3>
          {currentBatsmen.map((index, i) => (
            <div key={i} className="ml-2">
              <strong>{batsmen[index].name}{strikerIndex === i ? '*' : ''}</strong> {batsmen[index].runs} ({batsmen[index].balls})
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold">Current Bowler:</h3>
          <div className="ml-2">
            <strong>{currentBowler.name}</strong> - {currentBowler.overs}.{currentBowler.balls} overs, {currentBowler.runs} runs, {currentBowler.wickets}
          </div>
        </div>
      </div>
      {dismissalInfo && <div className="text-center text-red-500"><strong>{dismissalInfo}</strong></div>}
    </div>
  );
};

export default ScoreboardModal;

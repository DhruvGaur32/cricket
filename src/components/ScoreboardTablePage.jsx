import React from 'react';

const ScoreboardTablePage = ({ batsmen, bowlers, score, wickets, overs, balls, extras, currentBatsmen, currentBowler, currentBowlerIndex }) => {
  const formatOvers = (overs, balls) => `${Math.floor(overs)}.${balls}`;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Scoreboard Table</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Score: {score}/{wickets}</h2>
        <h3 className="text-lg">Overs: {formatOvers(overs, balls)}</h3>
        <h4 className="text-lg">Extras: {extras}</h4>
      </div>
      <h2 className="text-2xl font-semibold mb-2">Batting</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left font-light">Batter</th>
            {/* <th className="px-4 py-2 border border-gray-300 text-left font-light" ></th> */}
            <th className="px-4 py-2 border border-gray-300 text-left font-light" >R</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-light" >B</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-light" >4s</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-light" >6s</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-light" >SR</th>
          </tr>
        </thead>
        <tbody>
          {batsmen.map((batsman, index) => (
            <tr key={index} className={`border border-gray-300 ${currentBatsmen.includes(index) ? 'font-bold' : ''}`}>
              <td className="px-4 py-2 font-semibold">{batsman.name+(" ").repeat(10)+batsman.dismissal}</td>
              {/* <td className="px-4 py-2 font-light">{batsman.dismissal}</td> */}
              <td className="px-4 border border-gray-300 py-2 font-bold">{batsman.runs}</td>
              <td className="px-4 border border-gray-300 py-2 font-light">{batsman.balls}</td>
              <td className="px-4 border border-gray-300 py-2 font-light">{batsman.fours}</td>
              <td className="px-4 border border-gray-300 py-2 font-light">{batsman.sixes}</td>
              <td className="px-4 border border-gray-300 py-2 font-light">{batsman.strikeRate}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-2xl font-semibold mb-2">Bowling</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left font-light">Player</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-light">Overs</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-light">Runs</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-light">Wickets</th>
            <th className="px-4 py-2 border border-gray-300 text-left font-light">Economy</th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((bowler, index) => (
            <tr key={index} className={`border border-gray-300 ${index === currentBowlerIndex ? 'font-bold' : ''}`}>
              <td className="border border-gray-300 px-4 py-2 font-semibold">{bowler.name}</td>
              <td className="border border-gray-300 px-4 py-2">{bowler.overs}.{bowler.balls}</td>
              <td className="border border-gray-300 px-4 py-2 font-light">{bowler.runs}</td>
              <td className="border border-gray-300 px-4 py-2 font-light">{bowler.wickets}</td>
              <td className="border border-gray-300 px-4 py-2 font-light">{bowler.economy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreboardTablePage;

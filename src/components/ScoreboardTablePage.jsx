// ScoreboardTablePage.jsx
import React from 'react';

const ScoreboardTablePage = ({ batsmen, bowlers, score, wickets, overs, balls, extras, currentBatsmen, currentBowler }) => {
  const formatOvers = (overs, balls) => `${Math.floor(overs)}.${balls}`;

  return (
    <div>
      <h1>Scoreboard Table</h1>
      <div>
        <h2>Score: {score}/{wickets}</h2>
        <h3>Overs: {formatOvers(overs, balls)}</h3>
        <h4>Extras: {extras}</h4>
      </div>
      <h2>Batting</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Runs</th>
            <th>Balls</th>
            <th>4s</th>
            <th>6s</th>
            <th>SR</th>
            <th>Dismissal</th>
          </tr>
        </thead>
        <tbody>
          {batsmen.map((batsman, index) => (
            <tr key={index} style={{ fontWeight: currentBatsmen.includes(index) ? 'bold' : 'normal' }}>
              <td>{batsman.name}</td>
              <td>{batsman.runs}</td>
              <td>{batsman.balls}</td>
              <td>{batsman.fours}</td>
              <td>{batsman.sixes}</td>
              <td>{batsman.strikeRate}</td>
              <td>{batsman.dismissal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Bowling</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Overs</th>
            <th>Runs</th>
            <th>Wickets</th>
            <th>Economy</th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((bowler, index) => (
            <tr key={index} style={{ fontWeight: index === currentBowlerIndex ? 'bold' : 'normal' }}>
              <td>{bowler.name}</td>
              <td>{bowler.overs}.{bowler.balls}</td>
              <td>{bowler.runs}</td>
              <td>{bowler.wickets}</td>
              <td>{bowler.economy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreboardTablePage;

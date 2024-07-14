import React from 'react';
import Bowling from './components/Bowling';
import Batting from './components/Batting';
import Scoreboard from './components/Cricket';
// import './App.css';

const bowlingData = [
  { name: 'Akeal Hosein', overs: 3.0, maidens: 0, runs: 31, wickets: 0, economy: 10.33 },
  { name: 'Andre Russell', overs: 4.0, maidens: 0, runs: 19, wickets: 2, economy: 4.75 },
  { name: 'Alzarri Joseph', overs: 4.0, maidens: 0, runs: 25, wickets: 2, economy: 6.25 },
  { name: 'Gudakesh Motie', overs: 1.0, maidens: 0, runs: 20, wickets: 0, economy: 20.00 },
  { name: 'Obed McCoy', overs: 1.1, maidens: 0, runs: 15, wickets: 0, economy: 12.86 },
  { name: 'Roston Chase', overs: 3.0, maidens: 0, runs: 12, wickets: 3, economy: 4.00 },
];

const battingData = [
  { batter: 'Quinton de Kock(WK)', runs: 12, balls: 7, fours: 3, sixes: 0, strikeRate: 171.43, dismissal: 'c Rutherford b Russell' },
  { batter: 'Reeza Hendricks', runs: 0, balls: 1, fours: 0, sixes: 0, strikeRate: 0.00, dismissal: 'c Pooran b Russell' },
  { batter: 'Aiden Markram(C)', runs: 18, balls: 15, fours: 2, sixes: 0, strikeRate: 120.00, dismissal: 'c Mayers b Joseph' },
  { batter: 'Tristan Stubbs', runs: 29, balls: 27, fours: 4, sixes: 0, strikeRate: 107.41, dismissal: 'c Mayers b Chase' },
  { batter: 'Heinrich Klaasen', runs: 22, balls: 10, fours: 3, sixes: 1, strikeRate: 220.00, dismissal: 'c Pooran b Joseph' },
  { batter: 'David Miller', runs: 4, balls: 14, fours: 0, sixes: 0, strikeRate: 28.57, dismissal: 'b Chase' },
  { batter: 'Marco Jansen', runs: 21, balls: 14, fours: 1, sixes: 1, strikeRate: 150.00, dismissal: 'NOT OUT' },
  { batter: 'Keshav Maharaj', runs: 2, balls: 6, fours: 0, sixes: 0, strikeRate: 33.33, dismissal: 'c Joseph b Chase' }
];


const App = () => {
  return (
    <div className="App">
       <header className="App-header">
                <h1>Live Scoring</h1>
            </header>
           
      <Scoreboard/>
    </div>
  );
};

export default App;

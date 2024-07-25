import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ScoreboardModal from './components/ScoreboardModal';
import ScoreEditingPage from './components/ScoreEditingPage';
import ScoreboardTablePage from './components/ScoreboardTablePage';

const App = () => {
  // Shared state for score and scoreboard details
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [extras, setExtras] = useState(0);

  // Batsmen and bowlers state
  const [batsmen, setBatsmen] = useState([
    { name: 'Player 1', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: '' },
    { name: 'Player 2', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, dismissal: '' }
  ]);
  const [bowlers, setBowlers] = useState([
    { name: 'Bowler 1', overs: 0, balls: 0, runs: 0, wickets: 0, economy: 0 }
  ]);

  const [currentBatsmen, setCurrentBatsmen] = useState([0, 1]);
  const [strikerIndex, setStrikerIndex] = useState(0);
  const [currentBowlerIndex, setCurrentBowlerIndex] = useState(0);

  const [dismissalInfo, setDismissalInfo] = useState('');

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" className='bg-sky-500/100 rounded-xl p-1 font-bold'>Score Editing</Link>
            </li>
            <li>
              <Link to="/scoreboard" className='bg-sky-500/100 rounded-xl p-1 font-bold'>Scoreboard Table</Link>
            </li>
            <li>
              <Link to="/modal" className='bg-sky-500/100 rounded-xl p-1 font-bold'>Scoreboard Modal</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <ScoreEditingPage
                score={score}
                setScore={setScore}
                wickets={wickets}
                setWickets={setWickets}
                overs={overs}
                setOvers={setOvers}
                balls={balls}
                setBalls={setBalls}
                extras={extras}
                setExtras={setExtras}
                batsmen={batsmen}
                setBatsmen={setBatsmen}
                currentBatsmen={currentBatsmen}
                setCurrentBatsmen={setCurrentBatsmen}
                strikerIndex={strikerIndex}
                setStrikerIndex={setStrikerIndex}
                bowlers={bowlers}
                setBowlers={setBowlers}
                currentBowlerIndex={currentBowlerIndex}
                setCurrentBowlerIndex={setCurrentBowlerIndex}
                dismissalInfo={dismissalInfo}
                setDismissalInfo={setDismissalInfo}
              />
            }
          />

          <Route
            path="/modal"
            element={
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
              />
            }
          />
          <Route
            path="/scoreboard"
            element={
              <ScoreboardTablePage
                batsmen={batsmen}
                bowlers={bowlers}
                score={score}
                wickets={wickets}
                overs={overs}
                balls={balls}
                extras={extras}
                currentBatsmen={currentBatsmen}
                currentBowler={bowlers[currentBowlerIndex]}
                currentBowlerIndex={currentBowlerIndex}  // Pass this prop as well
              />
            }
          />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

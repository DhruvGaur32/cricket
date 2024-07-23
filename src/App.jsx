import React from 'react';
import Bowling from './components/Bowling';
import Batting from './components/Batting';
import Scoreboard from './components/Cricket';
<<<<<<< HEAD

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

=======
>>>>>>> 6d036e8e6e42d2ce6a8fe75db8c4536e85345402
// import './App.css';



const App = () => {
  return (
      <div className="App">
    <Router>
       <header className="App-header">
<<<<<<< HEAD
                

        <nav>
          <ul>
            <li className="bg-purple-900 rounded justify-center flex text-white m-4 p-2 w-36">
              <Link to="/Cricket">Cricket editor</Link>
            </li>
            <li className="bg-purple-900 rounded justify-center flex text-white m-4 p-2 w-36">
              <Link to="/Score">Score Board</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/Cricket" element={<Scoreboard/>} />
        
        </Routes>
        </header>
    
    </Router>
      </div>

=======
                <h1>Live Scoring</h1>
            </header>
           
      <Scoreboard/>
    </div>
>>>>>>> 6d036e8e6e42d2ce6a8fe75db8c4536e85345402
  );
};

export default App;

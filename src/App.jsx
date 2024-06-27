import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import React, { useState, useEffect } from "react";
import ViewUser from "./Component/ViewUser";
import EditorEnd from "./components/EditorEnd";
import Home from "./components/Home"
function App() {

  let initPlayer;
	if (localStorage.getItem("players") === null) {
		initPlayer = [];
	} else {
		initPlayer = JSON.parse(localStorage.getItem("players"));
	}

	const [players, setplayer] = useState(initPlayer);
	useEffect(() => {
		localStorage.setItem("players", JSON.stringify(players));
	}, [players]);

	const handleDelete = (idx) => {
		setplayer(
			players.filter((e) => {
				return e.id !== idx;
			})
		);
		localStorage.setItem("players", JSON.stringify(players));
	};
	const addplayer = (name, team, time) => {
		let sno = 0;
		if (players.length === 0) sno = 0;
		else sno = players[players.length - 1].sno + 1;

		const newPlayers = {
			id: sno,
			name: name,
			team: team,
			time: time,
		};

		setplayer((currTodo) => {
			return [...currTodo, newPlayers];
		});
	};

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/User" element={<ViewUser players={players}/>}/>
        <Route path="/Editor" element={<EditorEnd players={players} Delete={handleDelete} addplayer={addplayer}}/>
        
        
      </Routes>
    </Router>
      
       
    </>
  )
}

export default App

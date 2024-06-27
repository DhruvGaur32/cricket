import React, { useState } from "react";

function AddPlayer(props) {
	const [player, setTask] = useState({
		name: "",
		team: "",
		time: "",
	});
	const change = (evt) => {
		setTask((currdata) => {
			return {
				...currdata,
				[evt.target.name]: evt.target.value,
			};
		});
	};
	const submit = (e) => {
		e.preventDefault();
		if (!player.name.trim() || !player.team.trim()) {
			alert("Title pr Description cannot be blank");
		}
		props.addplayer(player.name, player.team, player.time);
		player.name = "";
		player.team = "";
		player.time = "";
	};
	return (
		<div className="text-black ">
			<h3 className="">Add Players</h3>
			<form onSubmit={submit}>
				<div className="m-1 flex flex-col">
					<label htmlFor="name">Name of player</label>
					<input
						className=" text-blue-500 pl-2 rounded-md outline-none "
						type="text"
						name="name"
						id="name"
						placeholder="Add a Name"
						value={player.name}
						onChange={change}
					/>
				</div>
				<div className="m-1 flex flex-col">
					<label htmlFor="team">Team</label>
					<input
						className=" text-blue-500 pl-2 rounded-md outline-none"
						type="text"
						name="team"
						id="team"
						placeholder="Add player's Team"
						value={player.team}
						onChange={change}
					/>
				</div>
				<div className="m-1 flex flex-col">
					<label htmlFor="time">Time</label>
					<input
						className=" text-blue-500 pl-2 rounded-md outline-none"
						type="number"
						name="time"
						id="time"
						placeholder="Add player's time"
						value={player.time}
						onChange={change}
					/>
				</div>
				{!player.name.trim() || !player.team.trim() || !player.time ? (
					<button
						className="bg-transparent bg-blue-300 text-blue-200 font-semibold  px-1 border border-blue-500  "
						disabled
					>
						Add Player
					</button>
				) : (
					<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded cursor-pointer">
						Add Player
					</button>
				)}
			</form>
		</div>
	);
}

export default AddPlayer;

import React from "react";
import Player from "./Player";
import AddPlayer from "./AddPlayer";

function EditorEnd({ players, handleDelete, addplayer }) {
	return (
		<>
			<h2 className="text-2xl text-black m-6 md:m-5">Summary</h2>
			<div className="line h-0.5 bg-slate-300 "></div>

			<div className="hidden md:block ">
				<div className="grid grid-cols-5 place-items-center gap-5  m-auto mt-[2%] mb-[1%] ml-[8%] mr-[8%] lg:ml-[6%] lg:mr-[6%]">
					<div className="text-l text-bold text-gray-500">Rank</div>
					<div className="text-l text-bold text-gray-500">Team</div>
					<div className="text-l text-bold text-gray-500">Participant</div>
					<div className="text-l text-bold text-gray-500">Results</div>
				</div>
			</div>
			<div className="bg-[#ade8f4] rounded-lg">
				<Player
					players={players}
					Delete={handleDelete}
				/>
			</div>
			<div className="flex items-center flex-col mt-[20%] md:mt-[10%]">
				<div className="bg-slate-300 p-4 rounded-md w-[60%] md:w-[50%] ">
					<AddPlayer addplayer={addplayer} />
				</div>
			</div>
		</>
	);
}

export default EditorEnd;

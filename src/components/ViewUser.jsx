import React from "react";
import UserEndView from "./UserEndView";
function ViewUser({ players }) {
	return (
		<>
			<h2 className="text-2xl text-black m-6 md:m-5">Summary</h2>
			<div className="line h-0.5 bg-slate-300 "></div>

			<div className="hidden md:block bg-[#ade8f4]">
				<div className="grid grid-cols-4 place-items-center  m-auto mt-[2%] mb-[1%] ml-[8%] mr-[8%] lg:ml-[6%] lg:mr-[6%]">
					<div className="text-l text-bold text-gray-500">Rank</div>
					<div className="text-l text-bold text-gray-500">Team</div>
					<div className="text-l text-bold text-gray-500">Participant</div>
					<div className="text-l text-bold text-gray-500">Results</div>
				</div>
			</div>
			<UserEndView players={players} />
		</>
	);
}

export default ViewUser;

import React from "react";

function Player({ players, Delete }) {
	return (
		<div>
			{players.map((p, index) => {
				return (
					<>
						<div className="flex items-center ml-[15%] mr-[5%] mt-[2%] md:hidden bg-[#caf0f8] p-3">
							<div className="container flex items-center ">
								<div className="text-2xl flex justify-center items-center ">{index + 1}</div>
								<div className="containerItem ml-[18%] ">
									<div className="text-2xl ">{p.name}</div>
									<div className="">{p.team}</div>
									<div className="">Result: {p.time}</div>
								</div>
							</div>

							<button
								className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 flex justify-end hover:border-transparent rounded ml-3 h-7 float-end"
								onClick={() => Delete(p.id)}
							>
								Delete
							</button>
						</div>

						{/* After Medium */}
						<div className="">
							<div className="ml-[8%] mr-[8%] hidden md:block lg:ml-[6%] lg:mr-[6%] bg-[#caf0f8]">
								<div className="grid grid-cols-5 gap-5 m-2 place-items-center ">
									<div className="text-2xl">{index + 1}</div>
									<div className="text-xl">{p.team}</div>
									<div className="text-2xl">{p.name}</div>

									<div className="text-xl">{p.time}</div>
									<button
										className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 flex justify-center hover:border-transparent rounded ml-3 h-7 float-end"
										onClick={() => Delete(p.id)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
						{/* Medium display ended */}
					</>
				);
			})}
		</div>
	);
}

export default Player;

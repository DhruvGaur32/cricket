import React from "react";

function UserEndView() {
	const players = [
		{ id: 1, name: "Shubham Suman", team: "IITKGP", time: "9.26" },
		{ id: 2, name: "Himanshu Kumar", team: "IITP", time: "9.32" },
		{ id: 3, name: "Jayant Singh", team: "IITB", time: "9.35" },
		{ id: 4, name: "Jitendra Kumar", team: "IITG", time: "9.42" },
	];
	
	return (
		<div>
			{players.map((p, index) => {
				return (
					<>
						<div className="flex items-center ml-[15%] mt-[2%] md:hidden">
							<div className="container flex items-center  ">
								<div className="text-2xl flex justify-center items-center ">{index + 1}</div>
								<div className="containerItem ml-[18%]">
									<div className="text-2xl ">{p.name}</div>
									<div className="">{p.team}</div>
									<div className="">Result: {p.time}</div>
								</div>
							</div>
						</div>

						{/* After Medium */}
						<div className="ml-[8%] mr-[8%] hidden md:block lg:ml-[6%] lg:mr-[6%]">
							<div className="grid grid-cols-4 gap-4 m-2 place-items-center">
								<div className="text-2xl">{index + 1}</div>
								<div className="text-xl">{p.team}</div>
								<div className="text-2xl">{p.name}</div>

								<div className="text-xl">{p.time}</div>
							</div>
						</div>
						{/* Medium display ended */}
					</>
				);
			})}
		</div>
	);
}

export default UserEndView;

import React from 'react';

const Batting = ({ data }) => {
    return (
        <div className="batting-section my-5">
            <h2 className="text-left text-2xl font-bold">Batting</h2>
            <table className="w-full border-collapse mt-2">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-bold">Batter</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-bold">R</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-bold">B</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-bold">4s</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-bold">6s</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-bold">SR</th>
                        <th className="border border-gray-300 p-2 bg-gray-100 font-bold">Dismissal</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((player, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2 text-left text-base">{player.batter}</td>
                            <td className="border border-gray-300 p-2 text-left text-base">{player.runs}</td>
                            <td className="border border-gray-300 p-2 text-left text-base">{player.balls}</td>
                            <td className="border border-gray-300 p-2 text-left text-base">{player.fours}</td>
                            <td className="border border-gray-300 p-2 text-left text-base">{player.sixes}</td>
                            <td className="border border-gray-300 p-2 text-left text-base">{player.strikeRate}</td>
                            <td className="border border-gray-300 p-2 text-left text-base">{player.dismissal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Batting;
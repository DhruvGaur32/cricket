import React from 'react';

const Bowling = ({ data }) => {
  return (
    <div className="bowling-section my-5 w-90% p-4">
      <h2 className="text-left text-2xl font-bold">BOWLING</h2>
      <table className="w-full border-collapse mt-2">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2 bg-gray-100 font-bold text-center">Bowler</th>
            <th className="border border-gray-400 p-2 bg-gray-100 font-bold">O</th>
            <th className="border border-gray-400 p-2 bg-gray-100 font-bold">R</th>
            <th className="border border-gray-400 p-2 bg-gray-100 font-bold">W</th>
            <th className="border border-gray-400 p-2 bg-gray-100 font-bold">ER</th>
          </tr>
        </thead>
        <tbody>
          {data.map((bowler, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-left text-base">{bowler.name}</td>
              <td className="border border-gray-300 p-2 text-left text-base">{bowler.overs}</td>
              <td className="border border-gray-300 p-2 text-left text-base">{bowler.runs}</td>
              <td className="border border-gray-300 p-2 text-left text-base">{bowler.wickets}</td>
              <td className="border border-gray-300 p-2 text-left text-base">{bowler.economy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bowling;

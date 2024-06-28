import React from 'react';

const Volleyball = () => {

  const pageStyle = {
    backgroundColor: '#010A0F',
    color: '#FFFFFF'
  };

  return (
    <div style={pageStyle} className='h-screen w-screen py-16'>
      <div className="bg-gray-900 text-white p-4 md:p-6 border border-gray-300 rounded-lg mx-4">
        {/* Match Start Time */}
        <div className="text-center text-gray-400 text-lg md:text-xl font-semibold mb-4">
          24.06.2024 00:00
        </div>

        {/* Teams and Score Section */}
        <div className="flex items-center justify-between">
          {/* Home Team Section */}
          <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-0">
            <img className="w-8 h-8 md:w-12 md:h-12 rounded-full" src="https://static.flashscore.com/res/image/data/vDiyVxhl-6ys9CWQj.png" alt="Serbia" /> 
            <div className="font-semibold text-sm md:text-lg">Serbia</div>
          </div>

          {/* Score Section */}
          <div className="flex flex-col items-center mb-2 md:mb-0">
            <span className="text-2xl md:text-4xl font-bold">2 - 3</span>
            <div className="text-xs md:text-sm">Finished</div>
          </div>

          {/* Away Team Section */}
          <div className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-0">
            <img className="w-8 h-8 md:w-12 md:h-12 rounded-full" src="https://static.flashscore.com/res/image/data/fBWBjchl-dWxvhZJm.png" alt="Slovenia" />
            <div className="font-semibold text-sm md:text-lg">Slovenia</div>
          </div>
        </div>

        {/* Score Table */}
        <div className="mt-4 md:mt-6 overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-2 md:px-4 py-2 text-left">Team</th>
                <th className="px-2 md:px-4 py-2 text-center">Set 1</th>
                <th className="px-2 md:px-4 py-2 text-center">Set 2</th>
                <th className="px-2 md:px-4 py-2 text-center">Set 3</th>
                <th className="px-2 md:px-4 py-2 text-center">Set 4</th>
                <th className="px-2 md:px-4 py-2 text-center">Set 5</th>
              </tr>
            </thead>
            <tbody>
              {/* Serbia */}
              <tr className="border-b border-gray-600">
                <td className="px-2 md:px-4 py-2 flex items-center">
                  <img className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2" src="https://static.flashscore.com/res/image/data/bgAztoCN-6ys9CWQj.png" alt="Serbia Flag" />
                  <span className="font-semibold text-xs md:text-sm">Serbia</span>
                </td>
                <td className="px-2 md:px-4 py-2 text-center">2</td>
                <td className="px-2 md:px-4 py-2 text-center">13</td>
                <td className="px-2 md:px-4 py-2 text-center">27</td>
                <td className="px-2 md:px-4 py-2 text-center">14</td>
                <td className="px-2 md:px-4 py-2 text-center">25</td>
              </tr>
              
              {/* Slovenia */}
              <tr className="border-b border-gray-600">
                <td className="px-2 md:px-4 py-2 flex items-center">
                  <img className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2" src="https://static.flashscore.com/res/image/data/CKI9EijC-dWxvhZJm.png" alt="Slovenia Flag" />
                  <span className="font-semibold text-xs md:text-sm">Slovenia</span>
                </td>
                <td className="px-2 md:px-4 py-2 text-center">3</td>
                <td className="px-2 md:px-4 py-2 text-center">15</td>
                <td className="px-2 md:px-4 py-2 text-center">22</td>
                <td className="px-2 md:px-4 py-2 text-center">14</td>
                <td className="px-2 md:px-4 py-2 text-center">25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Volleyball;

import React from 'react';

const TimelineCard = ({ title, onSeeAll, children }) => {

    return (
        <div className="container">
            <div className="bg-white shadow-md rounded-md p-4 w-full max-w-md">


      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">{title}</h2>
        <button onClick={onSeeAll} className="text-sm text-gray-600 hover:text-gray-800">
          Tümü →
        </button>
      </div>


      <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
        {children}
      </div>
            </div>
        </div>
    )

}

export default TimelineCard
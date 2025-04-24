

import React from 'react';

const Sidebar = ({ videos, onSelect, onDelete }) => {
  return (
    <div className="w-1/4 h-screen bg-gray-100 overflow-y-auto border-r p-4">
      <h2 className="text-xl font-semibold mb-4">Uploaded Videos</h2>
      {videos.map((video) => (
        <div
          key={video._id}
          className="mb-2 p-2 bg-white shadow rounded flex justify-between items-center"
        >
          <p
            className="truncate cursor-pointer flex-1"
            onClick={() => onSelect(video)}
            title={video.title}
          >
            {video.title}
          </p>
          <button
            className="ml-2 text-red-600 hover:text-red-800 font-bold"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(video._id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

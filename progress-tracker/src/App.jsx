import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadVideo from './components/UploadVideo';
import Sidebar from './components/Sidebar';
import VideoPlayer from './components/VideoPlayer';
import Api from './services/api'; // Adjust the import path as necessary

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideos = async () => {
    const res = await Api.get('api/videos');
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = (newVideo) => {
    setVideos([newVideo, ...videos]);
  };



 const handleDelete = async (id) => {
  try {
    await Api.delete(`api/videos/${id}`);
    
    // Remove progress from localStorage
    localStorage.removeItem(`video-progress-${id}`);
    
    // Clear selection if deleted
    if (selectedVideo && selectedVideo._id === id) {
      setSelectedVideo(null);
    }
    // Fetch updated list of videos
    fetchVideos();
  } catch (err) {
    console.error('Error deleting video:', err);
  }
};

  return (
    <div className="flex h-screen">
      <Sidebar videos={videos} onSelect={setSelectedVideo} onDelete={handleDelete} />
      <div className="flex flex-col flex-1">
        <UploadVideo onUpload={handleUpload} />
        <VideoPlayer video={selectedVideo} />
      </div>
    </div>
  );
}

export default App;

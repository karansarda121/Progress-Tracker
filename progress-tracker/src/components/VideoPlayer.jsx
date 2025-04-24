
import React, { useEffect, useRef, useState } from 'react';
import ProgressTracker from '../utility/progressTracker';

const VerticalProgressBar = ({ percentage }) => {
  return (
    <div className="h-64 w-6 relative bg-gray-200 rounded overflow-hidden flex items-end justify-center">
      <div
        className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all duration-300 ease-out"
        style={{ height: `${percentage}%` }}
      ></div>
      <div
        className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-white transition-all duration-300 ease-out"
        style={{ bottom: `calc(${percentage}% - 10px)` }}
      >
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);
  const [resumeTime, setResumeTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (video?._id) {
      const time = ProgressTracker.getResumeTime(video._id);
      setResumeTime(time);
    }
  }, [video]);

  const handleLoadedMetadata = () => {
    if (videoRef.current && resumeTime > 0) {
      videoRef.current.currentTime = resumeTime;
    }
  };

  const handleTimeUpdate = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const current = videoEl.currentTime;
    const start = Math.max(0, current - 2);
    const end = current;

    ProgressTracker.updateProgress(video._id, start, end, current);
    const percent = ProgressTracker.getWatchedPercentage(video._id, videoEl.duration);
    setProgress(percent);

    // Show popup when progress hits 100%
    if (percent >= 100 && !showPopup) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // auto-close after 3 seconds
    }
  };

  if (!video) return <p className="p-4">Select a video to play</p>;

  return (
    <div className="w-3/4 p-4 relative">
      <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
      <div className="flex items-start">
        <video
          ref={videoRef}
          controls
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          className="w-full rounded-lg"
          src={video.url}
        />
        <div className="ml-4">
          <VerticalProgressBar percentage={progress} />
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="absolute top-10 right-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-300 animate-bounce z-10">
          ✅ Task Completed!
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

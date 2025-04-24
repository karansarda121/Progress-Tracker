import { useEffect, useRef, useState } from 'react';

export default function LecturePlayer({ video }) {
  const videoRef = useRef(null);

  return (
    <div className="flex-1 p-4">
      {video ? (
        <>
          <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
          <video
            ref={videoRef}
            src={video.url}
            controls
            width="100%"
            className="rounded"
          />
        </>
      ) : (
        <p>Select a video from the sidebar.</p>
      )}
    </div>
  );
}

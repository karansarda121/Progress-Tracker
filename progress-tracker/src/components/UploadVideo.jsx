
import React, { useState } from 'react';
import axios from 'axios';
import Api from '../services/api'; // Adjust the import path as necessary

const MAX_SIZE_MB = 100;

const UploadVideo = ({ onUpload }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError('');
    setStatus('');

    if (file) {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > MAX_SIZE_MB) {
        setError(`File size exceeds ${MAX_SIZE_MB}MB limit`);
        return;
      }
      setVideoFile(file);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      setUploading(true);
      setStatus('Uploading... Please wait');

      const res = await Api.post(
        'api/videos/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      onUpload(res.data);
      setStatus('Upload successful!');
      setError('');
      setVideoFile(null);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err?.response?.data?.message || 'Upload failed. Try again.');
      setStatus('');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border-b space-y-2">
     <div className="relative inline-block">
  <input
    type="file"
    accept="video/mp4"
    onChange={handleFileChange}
    disabled={uploading}
    className="block w-0 h-0 opacity-0 absolute"
    id="file-upload"
  />
  <label
    htmlFor="file-upload"
    className={`inline-block cursor-pointer px-2 py-1 text-white rounded 
                ${uploading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
  >
    { 'Choose Video'}
  </label>
</div>


      {videoFile && (
        <div className="text-sm text-gray-700">
          Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
        </div>
      )}

      {status && <div className="text-blue-600 text-sm">{status}</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        onClick={handleUpload}
        disabled={!videoFile || uploading}
        className={`ml-2 px-3 py-1 rounded text-white ${
          uploading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
    </div>
  );
};

export default UploadVideo;


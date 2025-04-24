import axios from 'axios';

const API = axios.create({
  baseURL: 'https://progress-tracker-6tdp.onrender.com'
});

export const fetchVideos = () => API.get('/videos');
export const uploadVideo = (formData) => API.post('/videos/upload', formData);
export default API;


// http://localhost:5000
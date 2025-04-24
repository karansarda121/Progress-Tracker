import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const fetchVideos = () => API.get('/videos');
export const uploadVideo = (formData) => API.post('/videos/upload', formData);

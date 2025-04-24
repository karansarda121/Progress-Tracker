import express from 'express';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import Video from '../models/videoModel.js';


const router = express.Router();
const upload = multer({ storage });

router.post('/upload', upload.single('video'), async (req, res) => {
  try {
     if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
     const { originalname, path, public_id } = req.file;
    const newVideo = new Video({
      title: originalname,
      url: path,
      public_id: public_id || 'unknown' // Use the public_id from req.file
    });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    console.error('Upload Error:', err); // Log the error for better visibility
    res.status(500).json({ message: 'Failed to upload video', error: err.message });
  }
});


router.get('/', async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});


// GET /api/videos/:id
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Video not found' });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    // Delete from MongoDB
    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ message: 'Failed to delete video', error: err.message });
  }
});



export default router;



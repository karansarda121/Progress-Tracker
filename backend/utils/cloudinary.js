import dotenv from 'dotenv';
dotenv.config(); // Important for accessing process.env

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

console.log('Cloudinary ENV:', {
  name: process.env.CLOUDINARY_NAME,
  key: process.env.CLOUDINARY_KEY,
  secret: process.env.CLOUDINARY_SECRET,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lecture-videos',
    resource_type: 'video',
    format: async () => 'mp4',
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});







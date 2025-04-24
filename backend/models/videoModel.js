// import mongoose from 'mongoose';

// const videoSchema = new mongoose.Schema({
//   title: String,
//   url: String,
//   progress: {
//     type: Number,
//     default: 0,
//   },
//   resumeTime: {
//     type: Number,
//     default: 0,
//   },
// }, { timestamps: true });

// const Video = mongoose.model('Video', videoSchema);
// export default Video;



import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  public_id: {
    type: String,
    required: true, // Ensure it's saved when uploading to Cloudinary
  },
  progress: {
    type: Number,
    default: 0,
  },
  resumeTime: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);
export default Video;

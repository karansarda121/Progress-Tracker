#  Video Progress Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to upload lecture videos, track which parts have been watched, and resume playback from where they left off — with unique progress tracking, even if segments are re-watched or skipped.

---

## 🚀 Features

- Upload videos to Cloudinary
- Display uploaded videos in a sidebar
- Watch videos with automatic resume from last position
- Track unique watched intervals (skipping doesn't count)
- Vertical progress bar with percentage
- Completion popup when 100% is reached

---

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **File Storage**: Cloudinary

---

## 📦 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/karansarda121/Progress-Tracker.git
```

### 2. Backend Setup
```bash
cd backend
npm install

#  .env file
No need to setup already present 

# Start the server
node server.js
```

### 3. Frontend Setup
```bash
cd progress-tracker
npm install
npm run dev
```
## Note: 
-By default, the frontend is configured to make API calls to the production backend hosted on Render.
You can find the Axios instance configuration in:
client/src/services/api.js

-To use your local backend instead, update the baseURL in api.js to:
const API = axios.create({
  baseURL: 'http://localhost:5000' // Local server
});
---

## Design & Logic Explanation

###  Watched Intervals Tracking
On every `onTimeUpdate` event in the video player, we:
- Record a small time window (e.g., `start = currentTime - 2`, `end = currentTime`)
- Save this segment into `localStorage` under the video ID
- Segments are stored as `{ start, end }`

###  Merging Intervals for Unique Progress
We implemented a merge function that:
- Combines overlapping or touching segments
- Calculates total unique time watched from these merged intervals
- Computes progress = `(uniqueWatchedTime / videoDuration) * 100`

###  Resume From Last Position
- On video load, we retrieve the last `currentTime` from localStorage
- Seek video to that position via `videoRef.current.currentTime`

###  Completion Popup
- When progress reaches 100%, a small popup shows: `✅ Task Completed!`
- It auto-disappears after 3 seconds

---

##  Challenges & Solutions

### 1. **Accurately Calculating Unique Watch Time**
**Challenge**: Users could re-watch or skip portions.
**Solution**: Store and merge watched intervals to ensure progress only grows with truly unseen parts.

### 2. **Cloudinary Upload Delays**
**Challenge**: Uploads seemed done but weren’t fully processed.
**Solution**: Removed misleading progress bars, used simple state like `Uploading... Please wait`.

### 3. **Resuming Playback Smoothly**
**Challenge**: Seeking before metadata was loaded caused errors.
**Solution**: Used `onLoadedMetadata` to set `currentTime` only when video is ready.

---




const STORAGE_KEY = 'video_progress_data';

// Helper to fetch stored data
const getData = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
};

// Helper to save updated data
const setData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Merge new interval with previous ones (no overlap)
const mergeIntervals = (existing, newInterval) => {
  const intervals = [...existing, newInterval];
  intervals.sort((a, b) => a.start - b.start);

  const merged = [];
  for (let interval of intervals) {
    if (!merged.length || merged[merged.length - 1].end < interval.start) {
      merged.push(interval);
    } else {
      merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, interval.end);
    }
  }
  return merged;
};

// Public API
const ProgressTracker = {
  getResumeTime: (videoId) => {
    const data = getData();
    return data[videoId]?.resumeTime || 0;
  },

  updateProgress: (videoId, start, end, currentTime) => {
    const data = getData();
    const existing = data[videoId]?.intervals || [];
    const updatedIntervals = mergeIntervals(existing, { start, end });

    const resumeTime = currentTime;

    data[videoId] = {
      intervals: updatedIntervals,
      resumeTime,
    };

    setData(data);
  },

  getWatchedPercentage: (videoId, videoDuration) => {
    const data = getData();
    const intervals = data[videoId]?.intervals || [];
    const totalWatched = intervals.reduce((sum, { start, end }) => sum + (end - start), 0);
    return ((totalWatched / videoDuration) * 100).toFixed(2);
  },
};

export default ProgressTracker;

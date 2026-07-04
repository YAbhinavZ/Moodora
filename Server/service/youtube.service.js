import axios from "axios";
import {songCache} from "../models/SongCache.Model.js";

// ─── Search YouTube for a single song ─────────────────────────────────────
// Returns: { videoId, thumbnail }

const searchYouTube = async (title, artist) => {
  const query = `${title} ${artist} official audio`.toLowerCase().trim();

  // 1. Check cache first
  const cached = await SongCache.findOne({ query });
  if (cached) {
    return { videoId: cached.videoId, thumbnail: cached.thumbnail };
  }

  // 2. Cache miss — call YouTube API
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        q: query,
        part: "snippet",
        type: "video",
        maxResults: 1,
        key: process.env.YOUTUBE_API_KEY,
      },
    }
  );

  const video = response.data.items[0];

  if (!video) {
    return null;
  }

  const videoId = video.id.videoId;
  const thumbnail = video.snippet.thumbnails.high.url;

  // 3. Save to cache so we don't call YouTube again for this song
  await SongCache.create({ query, videoId, thumbnail });

  return { videoId, thumbnail };
};

// ─── Fetch videoIds for all songs in the list ─────────────────────────────
// Takes songs[] from Gemini, returns same array with videoId + thumbnail added

const fetchVideoIds = async (songs) => {
  const results = await Promise.all(
    songs.map(async (song) => {
      const data = await searchYouTube(song.title, song.artist);
      return {
        ...song,
        videoId: data?.videoId || null,
        thumbnail: data?.thumbnail || "",
      };
    })
  );

  // Filter out any songs where YouTube returned nothing
  return results.filter((song) => song.videoId !== null);
};

export default fetchVideoIds;
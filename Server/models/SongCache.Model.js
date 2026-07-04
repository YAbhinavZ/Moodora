
import mongoose, { Schema } from "mongoose";
 
// ─── SongCache ────────────────────────────────────────────────────────────
// Stores YouTube videoId for a song so we don't call the YouTube API
// again for the same song. Simple lookup table: query -> videoId.
// ─────────────────────────────────────────────────────────────────────────
 
const songCacheSchema = new mongoose.Schema({
  // "song title artist" lowercase, used as the lookup key
  query: {
    type: String,
    required: true,
    unique: true,
  },
 
  videoId: {
    type: String,
    required: true,
  },
 
  thumbnail: {
    type: String,
    default: "",
  },
 
  cachedAt: {
    type: Date,
    default: Date.now,
  },
});
 
export const songCache = mongoose.model("SongCache",songCacheSchema);
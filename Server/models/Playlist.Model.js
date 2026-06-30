import mongoose from "mongoose";

// ─── Song (sub-document, lives inside a Playlist) ─────────────────────────

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 0, // 0 = not rated yet, 1-5 once rated
  },
});

// ─── Playlist ───────────────────────────────────────────────────────────────

const playlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moodText: {
      type: String, // what the user actually typed
      required: true,
    },
    moodLabel: {
      type: String, // e.g. "happy", "anxious", "calm" — from Gemini
      required: true,
    },
    songs: {
      type: [songSchema],
      default: [],
    },
  },
  { timestamps: true } // adds createdAt + updatedAt
);

export const Playlist  = Schema.model("Playlist",playlistSchema);
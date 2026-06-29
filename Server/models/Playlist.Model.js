import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String, // YouTube thumbnail URL
      default: "",
    },
    reason: {
      type: String, // Why Gemini suggested this song
      default: "",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0, // 0 = not rated yet
    },
  },
  { _id: true } // keep individual _id so we can target songs in PATCH /rate
);

// ─── Main Playlist schema ─────────────────────────────────────────────────────

const playlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // fast lookup of all playlists for a user
    },

    // What the user actually typed ("feeling anxious before my exam")
    moodText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    // Structured mood data returned by Gemini ─────────────────────────────────

    moodLabel: {
      type: String, // e.g. "anxious", "happy", "melancholic"
      required: true,
      trim: true,
      lowercase: true,
    },

    energy: {
      type: String,
      enum: ["low", "mid", "high"],
      required: true,
    },

    valence: {
      type: String, // emotional positivity
      enum: ["positive", "neutral", "negative"],
      default: "neutral",
    },

    genres: {
      type: [String], // e.g. ["lo-fi", "classical", "ambient"]
      default: [],
    },

    // Songs generated for this mood session ──────────────────────────────────
    songs: {
      type: [songSchema],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);
export const Playlist = mongoose.model("Playlists", playlistSchema);

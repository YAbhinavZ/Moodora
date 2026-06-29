import mongoose from "mongoose";
// ─── SongCache schema ─────────────────────────────────────────────────────────
//
// Caches YouTube search results so the same song title + artist
// never burns API quota twice. TTL index auto-deletes stale entries
// after 30 days so the cache stays fresh without manual cleanup.
//
// Usage:
//   const cached = await SongCache.findOne({ query: "Weightless Marconi Union" });
//   if (cached) return { videoId: cached.videoId, thumbnail: cached.thumbnail };
// ─────────────────────────────────────────────────────────────────────────────

const songCacheSchema = new mongoose.Schema(
  {
    // Normalised lookup key: lowercase "title artist"
    // e.g. "weightless marconi union"
    query: {
      type: String,
      required: true,
      unique: true,   // one cache entry per song
      trim: true,
      lowercase: true,
    },

    // Original casing stored separately for debugging / logging
    originalQuery: {
      type: String,
      trim: true,
      default: "",
    },

    // YouTube Data API v3 result ───────────────────────────────────────────────
    videoId: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,   // https://i.ytimg.com/vi/<videoId>/hqdefault.jpg
      default: "",
    },

    // How many times this cache entry has been served (optional analytics)
    hitCount: {
      type: Number,
      default: 1,
    },

    // TTL field — MongoDB watches this and auto-deletes the document
    // 30 days after cachedAt. No cron job needed.
    cachedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // No timestamps: true here — we manage cachedAt manually
    // so the TTL index has a stable field to watch.
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

// TTL index: MongoDB auto-deletes documents 30 days after cachedAt.
// expireAfterSeconds is the only way to do this natively — no cron needed.
songCacheSchema.index({ cachedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

// query already has unique: true which creates an index automatically.
// No need to define it again here.

// ─── Static methods ───────────────────────────────────────────────────────────

// Normalise a "title + artist" string into a consistent cache key
songCacheSchema.statics.buildQuery = function (title, artist) {
  return `${title} ${artist}`.toLowerCase().trim();
};

// Look up a song — returns null on miss
songCacheSchema.statics.lookup = async function (title, artist) {
  const query = this.buildQuery(title, artist);
  const entry = await this.findOneAndUpdate(
    { query },
    { $inc: { hitCount: 1 } }, // track how often each entry is served
    { new: true }
  );
  return entry; // null if not cached
};

// Save a new result from the YouTube API
songCacheSchema.statics.store = async function (title, artist, videoId, thumbnail) {
  const query = this.buildQuery(title, artist);
  // upsert: true handles the race condition where two requests
  // miss the cache at the same moment and both try to insert
  return this.findOneAndUpdate(
    { query },
    {
      $set: {
        originalQuery: `${title} ${artist}`,
        videoId,
        thumbnail,
        cachedAt: new Date(), // reset TTL clock on re-store
      },
      $setOnInsert: { query },
      $inc: { hitCount: 1 },
    },
    { upsert: true, new: true }
  );
};

export const SongCache = Schema.mod


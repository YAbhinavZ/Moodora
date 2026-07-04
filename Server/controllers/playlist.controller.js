import {Playlist} from "../models/Playlist.Model.js";

// ─── Save Playlist ───────────────────────────────────────────────────────────
// POST /api/playlists
// body: { moodText, moodLabel, energy, songs[] }

export const savePlaylist = async (req, res) => {
  try {
    const { moodText, moodLabel, energy, songs } = req.body;

    const playlist = await Playlist.create({
      userId: req.user.id,
      moodText,
      moodLabel,
      energy,
      songs,
    });

    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// ─── Get All Playlists for logged in user ────────────────────────────────────
// GET /api/playlists

export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id }).sort({
      createdAt: -1, // newest first
    });

    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// ─── Get Single Playlist ─────────────────────────────────────────────────────
// GET /api/playlists/:id

export const getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Make sure the playlist belongs to the logged in user
    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// ─── Rate a Song inside a Playlist ───────────────────────────────────────────
// PATCH /api/playlists/:id/rate
// body: { songId, rating }

export const rateSong = async (req, res) => {
  try {
    const { songId, rating } = req.body;

    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Find the song inside the playlist and update its rating
    const song = playlist.songs.id(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    song.rating = rating;
    await playlist.save();

    res.status(200).json({ message: "Rating saved", playlist });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// ─── Delete Playlist ─────────────────────────────────────────────────────────
// DELETE /api/playlists/:id

export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await playlist.deleteOne();

    res.status(200).json({ message: "Playlist deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

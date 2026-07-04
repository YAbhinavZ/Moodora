import express from "express";
import {
  savePlaylist,
  getPlaylists,
  getPlaylist,
  rateSong,
  deletePlaylist,
} from "../controllers/playlist.controller.js";
import{ protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, savePlaylist);
router.get("/", protect, getPlaylists);
router.get("/:id", protect, getPlaylist);
router.patch("/:id/rate", protect, rateSong);
router.delete("/:id", protect, deletePlaylist);

export default router;

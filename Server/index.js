import dotenv from "dotenv";
dotenv.config();
import express from "express";

import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import moodRoutes from "./routes/mood.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";



connectDB();

const app = express();
app.use(cors());
app.use(express.json());


console.log("Gemini Key:", process.env.GEMINI_API_KEY);
app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/playlists", playlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
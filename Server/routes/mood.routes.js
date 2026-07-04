import express from "express";
import { analyseMood } from "../controllers/mood.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/analyse", protect, analyseMood);

export default router;
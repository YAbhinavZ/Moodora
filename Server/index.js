import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = 8000;

app.listen(PORT,()=>{
    console.log("SERVER IS LISTENING");
})

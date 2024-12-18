import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Routes from "./API/Routes/Routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", Routes);

const dbURL = process.env.DB_URL;

//TODO => if you find this error you need to create .env file and add your mongoDB url inside DB_URL variable
if (!dbURL) {
  throw new Error("Missing DB_URL environment variable");
}

mongoose.connect(dbURL);

mongoose.connection.on("connected", () => {
  console.log("mongoose connected successfully!");
});

mongoose.connection.on("error", (err) => {
  console.error("mongoose connection error", err);
});

app.get("/live", (req, res) => {
  res.status(200).json({ live: true, status: "server is live!"});
});

export default app;

import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import Routes from "./API/Routes/Routes";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", Routes);

const dbUrl = process.env.DB_URL;

// error handling for db url
if (!dbUrl) {
  throw new Error("Missing DB_URL environment variable");
}

mongoose.connect(dbUrl);
// connecting db
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected successfully");
});

// error handling on connecting db url
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error ", err);
});

// check if server is live
app.get("/live", (req, res) => {
  res.status(200).json({ server: "server is live!" });
});

export default app;

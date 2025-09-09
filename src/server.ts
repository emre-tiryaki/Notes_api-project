import express from "express";
import notesRoute from "./Routes/notes.js";
import { tokenVerification } from "./middleware/token-verification.js";
import { databaseConnection } from "./database/database.js";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = 5000;
const URI = process.env.MONGODB_URI as string;
const CLIENT = process.env.CLIENT as string;

databaseConnection(URI);

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: CLIENT,
    crededentials: true,
  })
);

app.get("/", (req, res) => res.send("Server is working"));

app.use("/auth", authRoute);

app.use("/notes", tokenVerification, notesRoute);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

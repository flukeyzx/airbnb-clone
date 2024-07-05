import express from "express";
import userRouter from "./routes/user.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import placeRouter from "./routes/place.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

//middleware for accessing the upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//user routes
app.use(userRouter);

//upload image route
app.use(uploadRouter);

//places routes
app.use(placeRouter);

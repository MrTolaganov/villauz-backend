import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import fileUpload from "express-fileupload";
import authRouter from "./routes/auth.route";
import houseRouter from "./routes/house.route";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import path from "path";

const app = express();

config();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("static"));

app.use("/api/auth", authRouter);
app.use("/api/house", houseRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

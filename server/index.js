import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./db/connectToMongoDb.js";
import cors from "cors";
import router from "./routes/auth.route.js";
import { todoRouter } from "./routes/todo.route.js";
import { userRouter } from "./routes/user.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/auth", router);
app.use("/todo", todoRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`listening on ${PORT}`);
});

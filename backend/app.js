import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import cors from "cors";
import userRoutes from "./router/userRouter.js";
import hostelRoutes from "./router/hostelRouter.js";
import cookieParser from "cookie-parser";
import roomRoutes from "./router/roomRouter.js";
import authRoutes from "./router/auth.js";
import reviewRouter from "./router/reviewRouter.js"
import meesRouter from './router/meesRouter.js'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/hostel", hostelRoutes);

app.use("/api/hostel/room", roomRoutes);

app.use('/api/review',reviewRouter);

app.use('api/mess',meesRouter)

const initializeDBAndServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connection: Success");
    app.listen(PORT, () =>
      console.log(`Server running on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);                                                                                           
  }
};
initializeDBAndServer();

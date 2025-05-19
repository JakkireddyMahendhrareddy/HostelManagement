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
import reviewRouter from "./router/reviewRouter.js";
import meesRouter from "./router/meesRouter.js";
import tenantRouter from "./router/tenantRouter.js";
import paymentsRoutes from "./router/paymentRoutes.js";

const app = express();

// IMPORTANT: Set payload size limits BEFORE other middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/hostel", hostelRoutes);
app.use("/api/hostel/room", roomRoutes);
app.use("/api/review", reviewRouter);
app.use("/api/mess", meesRouter);
app.use("/api/tenants", tenantRouter);
app.use("/api/payments", paymentsRoutes);

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

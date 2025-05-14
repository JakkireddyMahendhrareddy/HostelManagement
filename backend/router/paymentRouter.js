// routes/paymentRoutes.js
import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  getPayments,
  getTenantPaymentTemplate,
  getTenantPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentStats,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

// Apply auth middleware
paymentRouter.use(auth);

// Payment routes
paymentRouter.get("/", getPayments);
paymentRouter.get("/stats", getPaymentStats);
paymentRouter.get("/tenant-template/:tenantId", getTenantPaymentTemplate);
paymentRouter.get("/tenant/:tenantId", getTenantPayments);
paymentRouter.get("/:id", getPaymentById);
paymentRouter.post("/", createPayment);
paymentRouter.put("/:id", updatePayment);
paymentRouter.delete("/:id", deletePayment);

export default paymentRouter;

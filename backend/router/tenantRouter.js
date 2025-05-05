// backend/router/tenantRouter.js
// import express from "express";
// import {
//   addTenantInfo,
//   getAllTenantsInfo,
//   getTenantInfoById,
//   updateTenantInfo,
//   deleteTenantInfo,
// } from "../controllers/tenantController.js";

// const router = express.Router();

// router.post("/", addTenantInfo);
// router.get("/", getAllTenantsInfo);
// router.get("/:id", getTenantInfoById);
// router.put("/:id", updateTenantInfo);
// router.delete("/:id", deleteTenantInfo);

// export default router;

import express from "express";
import {
  addTenantInfo,
  getAllTenantsInfo,
  getTenantInfoById,
  updateTenantInfo,
  deleteTenantInfo,
} from "../controllers/tenantController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, addTenantInfo);
router.get("/", verifyToken, getAllTenantsInfo);
router.get("/:tenantId", verifyToken, getTenantInfoById);
router.put("/:tenantId", verifyToken, updateTenantInfo);
router.delete("/:tenantId", verifyToken, deleteTenantInfo);

export default router;

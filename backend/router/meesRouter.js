import express from "express";
import {
  getAllMess,
  getMessByDay,
  createMess,
  updateMess,
  deleteMess,
} from "../controllers/meesController.js";

const router = express.Router();

router.get("/", getAllMess);
router.get("/:day", getMessByDay);
router.post("/", createMess);
router.put("/:day", updateMess);
router.delete("/:day", deleteMess);

export default router;

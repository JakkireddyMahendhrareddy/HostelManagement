// meesModel.js
import mongoose from "mongoose";

const messSchema = new mongoose.Schema({
  day: { type: String, required: true },
  meals: { type: String, required: true },
});

const Mess = mongoose.model("Mess", messSchema);

export default Mess; // ✅ This is what your import expects

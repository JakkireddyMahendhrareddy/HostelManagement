// meesModel.js
import mongoose from "mongoose";

const messSchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },

  meals: {
    breakfast: {
      item: { type: String, required: true },
      time: { type: String, default: "8:00 AM" }
    },
    lunch: {
      item: { type: String, required: true },
      time: { type: String, default: "1:00 PM" }
    },
    dinner: {
      item: { type: String, required: true },
      time: { type: String, default: "8:00 PM" }
    }
  }
});

const Mess = mongoose.model("Mess", messSchema);

export default Mess;

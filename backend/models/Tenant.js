import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    tenantName: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    joinDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    rentAmount: {
      type: Number,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", tenantSchema);
export default Tenant;

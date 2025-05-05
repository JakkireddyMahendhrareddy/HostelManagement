import mongoose from "mongoose";

export const tenantSchema = new mongoose.Schema({
  tenantName: { type: String, required: true },
  roomNumber: { type: Number, required: true }, // can be linked later to Room if needed
  joinDate: { type: Date, required: true },
  rentAmount: { type: Number, required: true },
  contact: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
  },
});

const Tenant = mongoose.model("Tenant", tenantSchema);
export default Tenant;

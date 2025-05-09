import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    tenantName: { type: String, required: true }, // Full Name
    dateOfBirth: { type: Date, required: true },
    contact: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
    email: { type: String, default: "" },
    aadhaarNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{12}$/, "Please enter a valid 12-digit Aadhaar number"],
    },
    passportPhoto: { type: String, required: false }, // URL or file path
    aadhaarFront: { type: String, required: false },
    aadhaarBack: { type: String, required: false },
    digitalSignature: { type: String, required: false },

    // Permanent Address
    permanentAddress: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      pincode: { type: String, required: false },
    },

    // Current Address (optional if same as permanent)
    isCurrentAddressSame: { type: Boolean, default: false },
    currentAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
    },

    // Emergency Contact
    emergencyContact: {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      mobile: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
      },
    },

    // Accommodation Details
    roomNumber: { type: String, required: true }, // updated from Number to String
    moveInDate: { type: Date, required: false },
    agreementStartDate: { type: Date, required: false },
    rentAmount: { type: Number, required: false },

    // Legal
    policeVerificationConsent: { type: Boolean, default: false },
    termsAgreement: { type: Boolean, default: false },

    // Reference to owner
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

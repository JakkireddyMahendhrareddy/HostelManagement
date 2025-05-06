import { Hostel } from "../models/hostelModel.js";
import validator from "validator";
export const validateUserSignUpData = (req) => {
  const { name, email, password, mobileNumber } = req.body;

  if (!name || !email || !password || !mobileNumber) {
    throw new Error("All fields are required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  } else if (!validator.isMobilePhone(mobileNumber, "en-IN")) {
    throw new Error("Invalid Mobile Number");
  } else if (!validator.isLength(mobileNumber, { min: 10, max: 10 })) {
    throw new Error("Invalid Mobile Number");
  }
};

export const validateHostelData = (req) => {
  const { name, category, maxCapacity, totalRooms } = req.body;
  if (!name || !category || !maxCapacity || !totalRooms) {
    throw new Error("All fields are required");
  }
};

export const validateUserProfileInputData = (req) => {
  const { name, avatarUrl, mobileNumber } = req.body;
  const ALLOWED_FIELDS = ["name", "avatarUrl", "mobileNumber"];
  const isUserAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_FIELDS.includes(key)
  );
  return isUserAllowed;
};

export const validateRoomInfo = (req) => {
  const { sharingType, rent, totalBeds, availableBeds } = req.body;
  const ALLOWED_FIELDS = ["sharingType", "rent", "totalBeds", "availableBeds"];
  const isEditAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_FIELDS.includes(key)
  );
  if (
    sharingType === undefined ||
    sharingType === null ||
    rent === undefined ||
    rent === null ||
    totalBeds === undefined ||
    totalBeds === null ||
    availableBeds === undefined ||
    availableBeds === null
  ) {
    throw new Error("All Fields are Required");
  }
  return isEditAllowed;
};

export const validateHostelWithOwnerId = async (ownerId) => {
  const hostelInfo = await Hostel.findOne({ ownerId });
  if (!hostelInfo) {
    throw new Error("No Hostel Found");
  }

  return hostelInfo;
};

export const validateTenantData = (req) => {
  const { tenantName, roomNumber, joinDate, rentAmount, contact } = req.body;

  // Validate tenant name
  if (
    !tenantName ||
    typeof tenantName !== "string" ||
    tenantName.trim().length < 2
  ) {
    throw new Error(
      "Invalid tenant name. Name must be at least 2 characters long."
    );
  }

  // Validate room number
  if (!roomNumber || isNaN(Number(roomNumber))) {
    throw new Error("Invalid room number. Room number must be a valid number.");
  }

  // Validate join date
  if (!joinDate) {
    throw new Error("Join date is required.");
  }

  const dateObj = new Date(joinDate);
  if (dateObj.toString() === "Invalid Date") {
    throw new Error(
      "Invalid join date format. Please use a valid date format."
    );
  }

  // Validate rent amount
  if (!rentAmount || isNaN(Number(rentAmount)) || Number(rentAmount) <= 0) {
    throw new Error("Invalid rent amount. Rent must be a positive number.");
  }

  // Validate contact - must be a 10-digit phone number
  const phoneRegex = /^[0-9]{10}$/;
  if (!contact || typeof contact !== "string" || !phoneRegex.test(contact)) {
    throw new Error("Invalid contact number. Must be a 10-digit phone number.");
  }
};

// Updated Tenant model
/*
import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  tenantName: { 
    type: String, 
    required: true 
  },
  roomNumber: { 
    type: Number, 
    required: true 
  },
  joinDate: { 
    type: Date, 
    required: true 
  },
  rentAmount: { 
    type: Number, 
    required: true 
  },
  contact: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Tenant = mongoose.model("Tenant", tenantSchema);
export default Tenant;
*/

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
  const {
    tenantName,
    roomNumber,
    moveInDate, // Primary field for move-in date
    joinDate,   // Support legacy field
    rentAmount,
    contact,
    dateOfBirth,
    email,
    aadhaarNumber,
    passportPhoto,
    aadhaarFront,
    aadhaarBack,
    digitalSignature,
    permanentAddress,
    isCurrentAddressSame,
    currentAddress,
    emergencyContact,
    agreementStartDate,
    policeVerificationConsent,
    termsAgreement
  } = req.body;

  // Essential fields validation - these must always be present
  if (!tenantName) throw new Error("Tenant name is required.");
  if (!roomNumber) throw new Error("Room number is required.");
  if (!moveInDate && !joinDate) throw new Error("Move-in date is required."); // Support both field names
  if (!rentAmount) throw new Error("Rent amount is required.");
  if (!contact) throw new Error("Contact number is required.");

  // Format validations for essential fields
  if (contact && !/^[0-9]{10}$/.test(contact)) {
    throw new Error("Contact must be a 10-digit number.");
  }

  // Validate additional fields only if they're provided
  // This makes these fields optional but validates them if present
  
  // Aadhaar validation - optional but validate format if provided
  if (aadhaarNumber && !/^[0-9]{12}$/.test(aadhaarNumber)) {
    throw new Error("Aadhaar number must be a 12-digit number.");
  }

  // Date validations - check if they're valid dates when provided
  try {
    if (moveInDate) new Date(moveInDate);
    if (joinDate) new Date(joinDate);
    if (dateOfBirth) new Date(dateOfBirth);
    if (agreementStartDate) new Date(agreementStartDate);
  } catch (e) {
    throw new Error("One or more date fields have invalid format.");
  }

  // Email validation if provided
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email format.");
  }

  // Permanent address validation - only if provided
  if (permanentAddress) {
    if (!permanentAddress.street) throw new Error("Street address is required in permanent address.");
    if (!permanentAddress.city) throw new Error("City is required in permanent address.");
    if (!permanentAddress.state) throw new Error("State is required in permanent address.");
    if (!permanentAddress.pincode) throw new Error("Pincode is required in permanent address.");
  }

  // Current address validation - only if provided and not same as permanent
  if (!isCurrentAddressSame && currentAddress) {
    if (!currentAddress.street) throw new Error("Street address is required in current address.");
    if (!currentAddress.city) throw new Error("City is required in current address.");
    if (!currentAddress.state) throw new Error("State is required in current address.");
    if (!currentAddress.pincode) throw new Error("Pincode is required in current address.");
  }

  // Emergency contact validation - only if provided
  if (emergencyContact) {
    if (!emergencyContact.name) throw new Error("Emergency contact name is required.");
    if (!emergencyContact.relationship) throw new Error("Emergency contact relationship is required.");
    if (!emergencyContact.mobile) throw new Error("Emergency contact mobile number is required.");
    
    if (emergencyContact.mobile && !/^[0-9]{10}$/.test(emergencyContact.mobile)) {
      throw new Error("Emergency contact mobile must be a 10-digit number.");
    }
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

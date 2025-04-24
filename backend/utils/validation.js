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

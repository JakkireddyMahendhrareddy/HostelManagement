// API for adding hostel Info

import { Hostel } from "../models/hostelModel.js";
import { User } from "../models/userModel.js";
import { validateHostelData } from "../utils/validation.js";

// API for Adding a Hostel
export const addHostelInfo = async (req, res) => {
  const { name, category, maxCapacity, totalRooms, rooms } = req.body;
  const { user } = req;

  try {
    // Validate data
    validateHostelData(req);
    const ownerId = user._id;
    if (!ownerId) {
      return res.status(404).json({ message: "You Need to Login First" });
    }
    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "You don't have an Account" });
    }

    // Check if hostel already exists
    const existingHostel = await Hostel.findOne({ ownerId });
    if (existingHostel) {
      return res.status(400).json({
        message: `You had already added a Hostel named '${existingHostel.name}'`,
      });
    }

    // Save new hostel
    const newHostel = new Hostel({
      name,
      category,
      maxCapacity,
      totalRooms,
      rooms,
      ownerId,
    });
    await newHostel.save();

    res.status(200).json({ message: "Your Hostel Info Added Successfully" });
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// API for Getting Hostel Info
export const getHostelInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const hostel = await Hostel.findOne({ ownerId: id });
    if (!hostel) {
      throw new Error("No Hostel Found");
    }
    res.status(200).json({
      name: hostel.name,
      category: hostel.category,
      maxCapacity: hostel.maxCapacity,
      totalRooms: hostel.totalRooms,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateHostelSpecificInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, category, maxCapacity, totalRooms } = req.body;
    // if (!name || !category || !maxCapacity || !totalRooms) {
    //   throw new Error("All fields are required");
    // }
    const updatedHostel = await Hostel.findOneAndUpdate(
      { ownerId: id },
      { name, category, maxCapacity, totalRooms }
    );
    if (!updatedHostel) {
      throw new Error("No Hostel Found to Update");
    }
    res.status(200).json({ message: "Hostel Updated Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteHostelInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const hostel = await Hostel.findOneAndDelete({ ownerId: id });
    if (!hostel) {
      throw new Error("No Hostel Found to Remove");
    }
    res.status(200).json({ message: "Hostel Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

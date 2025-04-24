import Mess from "../models/meesModel.js";

// @desc    Get all mess details
// @route   GET /api/mess
export const getAllMess = async (req, res) => {
  try {
    const mess = await Mess.find();
    res.status(200).json(mess);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mess data", error });
  }
};

// @desc    Get mess details by day
// @route   GET /api/mess/:day
export const getMessByDay = async (req, res) => {
  const { day } = req.params;
  try {
    const mess = await Mess.findOne({ day });
    if (!mess) {
      return res.status(404).json({ message: "Mess data not found for this day" });
    }
    res.status(200).json(mess);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving mess data", error });
  }
};

// @desc    Create new mess entry
// @route   POST /api/mess
export const createMess = async (req, res) => {
  const { day, meals } = req.body;
  try {
    const existing = await Mess.findOne({ day });
    if (existing) {
      return res.status(400).json({ message: "Mess menu already exists for this day" });
    }

    const mess = new Mess({ day, meals });
    await mess.save();
    res.status(201).json({ message: "Mess entry created successfully", mess });
  } catch (error) {
    res.status(500).json({ message: "Failed to create mess entry", error });
  }
};

// @desc    Update mess entry by day
// @route   PUT /api/mess/:day
export const updateMess = async (req, res) => {
  const { day } = req.params;
  const { meals } = req.body;
  try {
    const updatedMess = await Mess.findOneAndUpdate({ day }, { meals }, { new: true });
    if (!updatedMess) {
      return res.status(404).json({ message: "Mess data not found for this day" });
    }
    res.status(200).json({ message: "Mess menu updated", updatedMess });
  } catch (error) {
    res.status(500).json({ message: "Failed to update mess entry", error });
  }
};

// @desc    Delete mess entry by day
// @route   DELETE /api/mess/:day
export const deleteMess = async (req, res) => {
  const { day } = req.params;
  try {
    const deleted = await Mess.findOneAndDelete({ day });
    if (!deleted) {
      return res.status(404).json({ message: "Mess entry not found" });
    }
    res.status(200).json({ message: "Mess entry deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete mess entry", error });
  }
};
 
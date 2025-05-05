import { Hostel } from "../models/hostelModel.js";
import Tenant from "../models/Tenant.js";
import { validateTenantData } from "../utils/validation.js";

// API for Adding a Tenant to a Room
export const addTenantInfo = async (req, res) => {
  const { name, tenantNumber, roomNumber } = req.body;
  const { id } = req.user;

  try {
    // Validate tenant data
    validateTenantData(req);

    // Check if hostel exists for the user
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    // Check if the room exists
    const room = hostelInfo.rooms.find(
      (room) => room.roomNumber === roomNumber
    );
    if (!room) {
      return res.status(404).json({ message: `Room ${roomNumber} Not Found` });
    }

    // Check if the room has available beds
    if (room.availableBeds <= 0) {
      return res
        .status(400)
        .json({ message: `No Available Beds in Room ${roomNumber}` });
    }

    // Check if tenant already exists (same name or tenant number)
    const existingTenant = await Tenant.findOne({
      $or: [{ name }, { tenantNumber }],
    });
    if (existingTenant) {
      return res.status(400).json({
        message: `A tenant with name ${name} or tenant number ${tenantNumber} already exists`,
      });
    }

    // Create new tenant and add to the room
    const newTenant = new Tenant({
      name,
      tenantNumber,
      roomNumber,
      ownerId: id, // Store owner ID for reference
    });

    await newTenant.save();

    // Update the room with the new tenant and decrement available beds
    room.availableBeds -= 1;
    await hostelInfo.save();

    res.status(200).json({
      message: "Tenant Added Successfully",
      tenantInfo: newTenant,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// API for Getting All Tenants in a Hostel
export const getAllTenantsInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      throw new Error("Hostel Not Found");
    }

    const tenants = await Tenant.find({ ownerId: id });

    res.status(200).json({
      message: "Tenants Retrieved Successfully",
      tenants,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// API for Updating Tenant Info
export const updateTenantInfo = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { name, tenantNumber, roomNumber } = req.body;
    const { id } = req.user;

    // Validate tenant data
    validateTenantData(req);

    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    // Find existing tenant
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res
        .status(404)
        .json({ message: `Tenant not found with ID ${tenantId}` });
    }

    // Check if the tenant number or name is already taken
    const existingTenant = await Tenant.findOne({
      $or: [{ name }, { tenantNumber }],
    });
    if (existingTenant && existingTenant._id !== tenantId) {
      return res.status(400).json({
        message: `A tenant with name ${name} or tenant number ${tenantNumber} already exists`,
      });
    }

    // Update tenant details
    tenant.name = name;
    tenant.tenantNumber = tenantNumber;
    tenant.roomNumber = roomNumber;

    // Update tenant's room occupancy status
    const room = hostelInfo.rooms.find(
      (room) => room.roomNumber === roomNumber
    );
    if (!room) {
      return res.status(404).json({ message: `Room ${roomNumber} Not Found` });
    }

    // Check if the room has available beds
    if (room.availableBeds <= 0) {
      return res
        .status(400)
        .json({ message: `No Available Beds in Room ${roomNumber}` });
    }

    // Update the room's available bed count and save
    room.availableBeds -= 1;
    await hostelInfo.save();

    // Save the updated tenant
    await tenant.save();

    res.status(200).json({
      message: "Tenant Updated Successfully",
      tenantInfo: tenant,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// API for Deleting a Tenant from a Room
export const deleteTenantInfo = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { id } = req.user;

    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res
        .status(404)
        .json({ message: `Tenant not found with ID ${tenantId}` });
    }

    // Find the room where the tenant resides
    const room = hostelInfo.rooms.find(
      (room) => room.roomNumber === tenant.roomNumber
    );
    if (!room) {
      return res.status(404).json({ message: `Room Not Found` });
    }

    // Delete the tenant
    await tenant.remove();

    // Update room availability
    room.availableBeds += 1;
    await hostelInfo.save();

    res.status(200).json({
      message: `Tenant Removed Successfully from Room ${tenant.roomNumber}`,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get specific tenant info by ID (must belong to logged-in user)
export const getTenantInfoById = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { id } = req.user; // owner ID

    // Find tenant by ID and check if it belongs to the logged-in user
    const tenant = await Tenant.findOne({ _id: tenantId, ownerId: id });

    if (!tenant) {
      return res.status(404).json({
        message: `Tenant not found with ID ${tenantId} for the current user`,
      });
    }

    res.status(200).json({
      message: "Tenant Retrieved Successfully",
      tenantInfo: tenant,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

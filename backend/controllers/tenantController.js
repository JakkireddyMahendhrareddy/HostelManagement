import { Hostel } from "../models/hostelModel.js";
import Tenant from "../models/Tenant.js";
import { validateTenantData } from "../utils/validation.js";
import mongoose from "mongoose";

export const addTenantInfo = async (req, res) => {
  try {
    // Log incoming request for debugging
    console.log("Add tenant request body:", req.body);

    // Validate all required tenant data
    validateTenantData(req);

    const { tenantName, roomNumber, joinDate, rentAmount, contact } = req.body;
    const { id } = req.user;

    // Check if hostel exists for the user
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    // Find the room by room number
    const roomIndex = hostelInfo.rooms.findIndex(
      (room) => room.roomNumber === Number(roomNumber)
    );

    if (roomIndex === -1) {
      return res.status(404).json({ message: `Room ${roomNumber} Not Found` });
    }

    const room = hostelInfo.rooms[roomIndex];

    // Check if the room has available beds
    if (room.availableBeds <= 0) {
      return res.status(400).json({
        message: `No Available Beds in Room ${roomNumber}. The room is already at full capacity.`,
      });
    }

    // Check if tenant with same name already exists for this owner
    const existingTenantByName = await Tenant.findOne({
      tenantName,
      ownerId: id,
    });

    if (existingTenantByName) {
      return res.status(400).json({
        message: `A tenant with name ${tenantName} already exists`,
      });
    }

    // Check if tenant with same phone number already exists for this owner
    const existingTenantByPhone = await Tenant.findOne({
      contact,
      ownerId: id,
    });

    if (existingTenantByPhone) {
      return res.status(400).json({
        message: `A tenant with phone number ${contact} already exists`,
      });
    }

    // Create new tenant
    const newTenant = new Tenant({
      tenantName,
      roomNumber: Number(roomNumber),
      joinDate: new Date(joinDate),
      rentAmount: Number(rentAmount),
      contact,
      ownerId: id,
    });

    // Save the tenant to the database
    await newTenant.save();

    // Update the room's available bed count
    hostelInfo.rooms[roomIndex].availableBeds -= 1;
    await hostelInfo.save();

    res.status(200).json({
      message: "Tenant Added Successfully",
      tenantInfo: newTenant,
    });
  } catch (err) {
    console.error("Error adding tenant:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// API for Getting All Tenants in a Hostel
export const getAllTenantsInfo = async (req, res) => {
  try {
    const { id } = req.user;

    // Check if hostel exists
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    // Get all tenants for this owner
    const tenants = await Tenant.find({ ownerId: id });

    res.status(200).json({
      message: "Tenants Retrieved Successfully",
      count: tenants.length,
      tenants,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// API for Getting Tenants by Room Number
export const getTenantsByRoom = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const { id } = req.user;

    // Check if hostel exists
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    // Check if room exists
    const room = hostelInfo.rooms.find(
      (room) => room.roomNumber === Number(roomNumber)
    );

    if (!room) {
      return res.status(404).json({ message: `Room ${roomNumber} Not Found` });
    }

    // Get tenants for this room
    const tenants = await Tenant.find({
      ownerId: id,
      roomNumber: Number(roomNumber),
    });

    res.status(200).json({
      message: `Tenants for Room ${roomNumber} Retrieved Successfully`,
      roomInfo: {
        roomNumber: room.roomNumber,
        sharingType: room.sharingType,
        rent: room.rent,
        totalBeds: room.totalBeds,
        availableBeds: room.availableBeds,
      },
      count: tenants.length,
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
    const { tenantName, roomNumber, joinDate, rentAmount, contact } = req.body;
    const { id } = req.user;

    // Validate tenant data
    validateTenantData(req);

    // Check if hostel exists
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

    // Verify the tenant belongs to this owner
    if (tenant.ownerId.toString() !== id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this tenant" });
    }

    // Check if new room number is different from current
    const isRoomChanging = tenant.roomNumber !== Number(roomNumber);

    if (isRoomChanging) {
      // Find old room
      const oldRoomIndex = hostelInfo.rooms.findIndex(
        (room) => room.roomNumber === tenant.roomNumber
      );

      if (oldRoomIndex !== -1) {
        // Increment available beds in old room
        hostelInfo.rooms[oldRoomIndex].availableBeds += 1;
      }

      // Find new room
      const newRoomIndex = hostelInfo.rooms.findIndex(
        (room) => room.roomNumber === Number(roomNumber)
      );

      if (newRoomIndex === -1) {
        return res
          .status(404)
          .json({ message: `New Room ${roomNumber} Not Found` });
      }

      // Check if new room has available beds
      if (hostelInfo.rooms[newRoomIndex].availableBeds <= 0) {
        return res.status(400).json({
          message: `No Available Beds in Room ${roomNumber}. The room is already at full capacity.`,
        });
      }

      // Decrement available beds in new room
      hostelInfo.rooms[newRoomIndex].availableBeds -= 1;
    }

    // Check if tenant name is changing and if new name already exists
    if (tenantName !== tenant.tenantName) {
      const existingTenant = await Tenant.findOne({
        tenantName,
        ownerId: id,
        _id: { $ne: tenantId }, // Exclude current tenant
      });

      if (existingTenant) {
        return res.status(400).json({
          message: `A tenant with name ${tenantName} already exists`,
        });
      }
    }

    // Update tenant details
    tenant.tenantName = tenantName;
    tenant.roomNumber = Number(roomNumber);
    tenant.joinDate = new Date(joinDate);
    tenant.rentAmount = Number(rentAmount);
    tenant.contact = contact;

    // Save the updated hostel and tenant
    await hostelInfo.save();
    await tenant.save();

    res.status(200).json({
      message: "Tenant Updated Successfully",
      tenantInfo: tenant,
    });
  } catch (err) {
    console.error("Error updating tenant:", err.message);
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

export const deleteTenantInfo = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { id } = req.user;

    // Input validation
    if (!tenantId || !mongoose.Types.ObjectId.isValid(tenantId)) {
      return res.status(400).json({ message: "Invalid tenant ID format" });
    }

    // Check if hostel exists
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    // Find tenant with lean() for better performance
    const tenant = await Tenant.findById(tenantId).lean();
    if (!tenant) {
      return res.status(404).json({
        message: `Tenant not found with ID ${tenantId}`,
      });
    }

    // Verify the tenant belongs to this owner
    if (tenant.ownerId.toString() !== id) {
      return res.status(403).json({
        message: "You are not authorized to delete this tenant",
      });
    }

    // Find the room where the tenant resides using a more reliable approach
    const roomIndex = hostelInfo.rooms.findIndex(
      (room) => room.roomNumber.toString() === tenant.roomNumber.toString()
    );

    if (roomIndex !== -1) {
      // Update room availability in a safer way
      const room = hostelInfo.rooms[roomIndex];

      // Check if the tenant is actually occupying a bed in this room
      // by looking at current occupancy numbers
      const currentOccupied = room.totalBeds - room.availableBeds;

      if (currentOccupied > 0) {
        // There are occupied beds, so we can safely free one up
        await Hostel.updateOne(
          {
            _id: hostelInfo._id,
            "rooms.roomNumber": tenant.roomNumber,
          },
          {
            $inc: { "rooms.$.availableBeds": 1 },
          }
        );
      } else {
        console.warn(
          `Room ${tenant.roomNumber} shows no occupants but tenant ${tenant._id} claims to be in this room. Proceeding with tenant deletion.`
        );
        // We'll still delete the tenant even if the room data is inconsistent
      }
    } else {
      console.warn(
        `Room ${tenant.roomNumber} not found in hostel for tenant ${tenantId}`
      );
      // Continue with deletion even if room not found
    }

    // Delete the tenant with a pre-check to ensure it still exists
    const deletedTenant = await Tenant.findByIdAndDelete(tenantId);

    if (!deletedTenant) {
      return res.status(404).json({
        message: "Tenant already deleted or not found",
      });
    }

    res.status(200).json({
      message: `Tenant ${tenant.tenantName} Removed Successfully from Room ${tenant.roomNumber}`,
      tenantId: tenantId,
    });
  } catch (err) {
    console.error("Error deleting tenant:", err);
    res.status(500).json({
      message: "Failed to delete tenant",
      error: err.message,
    });
  }
};

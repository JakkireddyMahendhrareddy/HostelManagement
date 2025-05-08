import { Hostel } from "../models/hostelModel.js";
import Tenant from "../models/Tenant.js";
import { validateTenantData } from "../utils/validation.js";
import mongoose from "mongoose";


// export const addTenantInfo = async (req, res) => {
//   try {
//     // Log incoming request for debugging
//     console.log("Add tenant request body:", req.body);

//     // Validate all required tenant data
//     validateTenantData(req);

//     const { 
//       tenantName, 
//       roomNumber, 
//       moveInDate, // This can be either moveInDate or joinDate to support both
//       joinDate,   // Support original field name for backward compatibility
//       rentAmount, 
//       contact,
//       dateOfBirth,
//       email,
//       aadhaarNumber,
//       passportPhoto,
//       aadhaarFront,
//       aadhaarBack,
//       digitalSignature,
//       permanentAddress,
//       isCurrentAddressSame,
//       currentAddress,
//       emergencyContact,
//       agreementStartDate,
//       policeVerificationConsent,
//       termsAgreement
//     } = req.body;
    
//     const { id } = req.user;

//     // Check if hostel exists for the user
//     const hostelInfo = await Hostel.findOne({ ownerId: id });
//     if (!hostelInfo) {
//       return res.status(404).json({ message: "Hostel Not Found" });
//     }

//     // Log for debugging
//     console.log("Found hostel:", hostelInfo._id);
//     console.log("Looking for room number:", roomNumber);
//     console.log("Room type:", typeof roomNumber);
//     console.log("Available rooms:", hostelInfo.rooms.map(r => ({ num: r.roomNumber, type: typeof r.roomNumber })));

//     // Convert roomNumber to number to ensure consistent comparison
//     const roomNumAsNumber = Number(roomNumber);

//     // Find the room by room number
//     const roomIndex = hostelInfo.rooms.findIndex(
//       (room) => room.roomNumber === roomNumAsNumber
//     );

//     if (roomIndex === -1) {
//       return res.status(404).json({ 
//         message: `Room ${roomNumber} Not Found`,
//         availableRooms: hostelInfo.rooms.map(r => r.roomNumber)
//       });
//     }

//     const room = hostelInfo.rooms[roomIndex];

//     // Check if the room has available beds
//     if (room.availableBeds <= 0) {
//       return res.status(400).json({
//         message: `No Available Beds in Room ${roomNumber}. The room is already at full capacity.`,
//       });
//     }

//     // Check if tenant with same name already exists for this owner
//     const existingTenantByName = await Tenant.findOne({
//       tenantName,
//       ownerId: id,
//     });

//     if (existingTenantByName) {
//       return res.status(400).json({
//         message: `A tenant with name ${tenantName} already exists`,
//       });
//     }

//     // Check if tenant with same phone number already exists for this owner
//     const existingTenantByPhone = await Tenant.findOne({
//       contact,
//       ownerId: id,
//     });

//     if (existingTenantByPhone) {
//       return res.status(400).json({
//         message: `A tenant with phone number ${contact} already exists`,
//       });
//     }

//     // Check if tenant with same Aadhaar number already exists for this owner
//     const existingTenantByAadhaar = await Tenant.findOne({
//       aadhaarNumber,
//       ownerId: id,
//     });

//     if (existingTenantByAadhaar) {
//       return res.status(400).json({
//         message: `A tenant with Aadhaar number ${aadhaarNumber} already exists`,
//       });
//     }

//     // Create new tenant with expanded fields - making new fields optional
//     const newTenant = new Tenant({
//       tenantName,
//       roomNumber: roomNumAsNumber.toString(), // Store as string consistently
//       moveInDate: new Date(moveInDate || joinDate), // Use moveInDate or fallback to joinDate
//       rentAmount: Number(rentAmount),
//       contact,
//       // Provide default values or conditionally include new fields
//       ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
//       ...(email !== undefined && { email }),
//       ...(aadhaarNumber && { aadhaarNumber }),
//       ...(passportPhoto && { passportPhoto }),
//       ...(aadhaarFront && { aadhaarFront }),
//       ...(aadhaarBack && { aadhaarBack }),
//       ...(digitalSignature && { digitalSignature }),
//       ...(permanentAddress && { permanentAddress }),
//       ...(isCurrentAddressSame !== undefined && { isCurrentAddressSame }),
//       ...((isCurrentAddressSame && permanentAddress) || (currentAddress) ? 
//           { currentAddress: isCurrentAddressSame ? permanentAddress : currentAddress } : {}),
//       ...(emergencyContact && { emergencyContact }),
//       ...(agreementStartDate && { agreementStartDate: new Date(agreementStartDate) }),
//       ...(policeVerificationConsent !== undefined && { policeVerificationConsent }),
//       ...(termsAgreement !== undefined && { termsAgreement }),
//       ownerId: id,
//     });

//     // Save the tenant to the database
//     await newTenant.save();

//     // Update the room's available bed count
//     hostelInfo.rooms[roomIndex].availableBeds -= 1;
//     await hostelInfo.save();

//     res.status(200).json({
//       message: "Tenant Added Successfully",
//       tenantInfo: newTenant,
//     });
//   } catch (err) {
//     console.error("Error adding tenant:", err.message);
//     res.status(400).json({ message: err.message });
//   }
// };



// The rest of your controller functions remain the same...
// API for Getting All Tenants in a Hostel
export const getAllTenantsInfo = async (req, res) => {
  try {
    const { id } = req.user;
    
    // Added pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Check if hostel exists
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    // Get total count for pagination
    const totalTenants = await Tenant.countDocuments({ ownerId: id });

    // Get tenants with pagination
    const tenants = await Tenant.find({ ownerId: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Tenants Retrieved Successfully",
      count: tenants.length,
      total: totalTenants,
      totalPages: Math.ceil(totalTenants / limit),
      currentPage: page,
      tenants,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// API for Getting Tenants by Room Number
// export const getTenantsByRoom = async (req, res) => {
//   try {
//     const { roomNumber } = req.params;
//     const { id } = req.user;

//     // Check if hostel exists
//     const hostelInfo = await Hostel.findOne({ ownerId: id });
//     if (!hostelInfo) {
//       return res.status(404).json({ message: "Hostel Not Found" });
//     }

//     // Check if room exists
//     const room = hostelInfo.rooms.find(
//       (room) => room.roomNumber === Number(roomNumber)
//     );

//     if (!room) {
//       return res.status(404).json({ message: `Room ${roomNumber} Not Found` });
//     }

//     // Get tenants for this room
//     const tenants = await Tenant.find({
//       ownerId: id,
//       roomNumber: roomNumber,
//     });

//     res.status(200).json({
//       message: `Tenants for Room ${roomNumber} Retrieved Successfully`,
//       roomInfo: {
//         roomNumber: room.roomNumber,
//         sharingType: room.sharingType,
//         rent: room.rent,
//         totalBeds: room.totalBeds,
//         availableBeds: room.availableBeds,
//       },
//       count: tenants.length,
//       tenants,
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// API for Updating Tenant Info
// export const updateTenantInfo = async (req, res) => {
//   try {
//     const { tenantId } = req.params;
//     const { 
//       tenantName, 
//       roomNumber, 
//       moveInDate, // This can be either moveInDate or joinDate
//       joinDate,   // Support original field name for backward compatibility 
//       rentAmount, 
//       contact,
//       dateOfBirth,
//       email,
//       aadhaarNumber,
//       passportPhoto,
//       aadhaarFront,
//       aadhaarBack,
//       digitalSignature,
//       permanentAddress,
//       isCurrentAddressSame,
//       currentAddress,
//       emergencyContact,
//       agreementStartDate,
//       policeVerificationConsent,
//       termsAgreement
//     } = req.body;
    
//     const { id } = req.user;

//     // Validate tenant data
//     validateTenantData(req);

//     // Check if hostel exists
//     const hostelInfo = await Hostel.findOne({ ownerId: id });
//     if (!hostelInfo) {
//       return res.status(404).json({ message: "Hostel Not Found" });
//     }

//     // Find existing tenant
//     const tenant = await Tenant.findById(tenantId);
//     if (!tenant) {
//       return res
//         .status(404)
//         .json({ message: `Tenant not found with ID ${tenantId}` });
//     }

//     // Verify the tenant belongs to this owner
//     if (tenant.ownerId.toString() !== id) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update this tenant" });
//     }

//     // Check if new room number is different from current
//     const isRoomChanging = tenant.roomNumber !== roomNumber;

//     if (isRoomChanging) {
//       // Find old room
//       const oldRoomIndex = hostelInfo.rooms.findIndex(
//         (room) => room.roomNumber === Number(tenant.roomNumber)
//       );

//       if (oldRoomIndex !== -1) {
//         // Increment available beds in old room
//         hostelInfo.rooms[oldRoomIndex].availableBeds += 1;
//       }

//       // Find new room
//       const newRoomIndex = hostelInfo.rooms.findIndex(
//         (room) => room.roomNumber === Number(roomNumber)
//       );

//       if (newRoomIndex === -1) {
//         return res
//           .status(404)
//           .json({ message: `New Room ${roomNumber} Not Found` });
//       }

//       // Check if new room has available beds
//       if (hostelInfo.rooms[newRoomIndex].availableBeds <= 0) {
//         return res.status(400).json({
//           message: `No Available Beds in Room ${roomNumber}. The room is already at full capacity.`,
//         });
//       }

//       // Decrement available beds in new room
//       hostelInfo.rooms[newRoomIndex].availableBeds -= 1;
//     }

//     // Check if tenant name is changing and if new name already exists
//     if (tenantName !== tenant.tenantName) {
//       const existingTenant = await Tenant.findOne({
//         tenantName,
//         ownerId: id,
//         _id: { $ne: tenantId }, // Exclude current tenant
//       });

//       if (existingTenant) {
//         return res.status(400).json({
//           message: `A tenant with name ${tenantName} already exists`,
//         });
//       }
//     }

//     // Check if Aadhaar number is changing and if new number already exists
//     if (aadhaarNumber !== tenant.aadhaarNumber) {
//       const existingTenantByAadhaar = await Tenant.findOne({
//         aadhaarNumber,
//         ownerId: id,
//         _id: { $ne: tenantId }, // Exclude current tenant
//       });

//       if (existingTenantByAadhaar) {
//         return res.status(400).json({
//           message: `A tenant with Aadhaar number ${aadhaarNumber} already exists`,
//         });
//       }
//     }

//     // Check if contact is changing and if new number already exists
//     if (contact !== tenant.contact) {
//       const existingTenantByPhone = await Tenant.findOne({
//         contact,
//         ownerId: id,
//         _id: { $ne: tenantId }, // Exclude current tenant
//       });

//       if (existingTenantByPhone) {
//         return res.status(400).json({
//           message: `A tenant with phone number ${contact} already exists`,
//         });
//       }
//     }

//     // Update tenant details with all the expanded fields - making new fields optional
//     tenant.tenantName = tenantName;
//     tenant.roomNumber = roomNumber;
//     tenant.moveInDate = new Date(moveInDate || joinDate); // Use moveInDate or fallback to joinDate
//     tenant.rentAmount = Number(rentAmount);
//     tenant.contact = contact;
    
//     // Only update new fields if they're provided
//     if (dateOfBirth) tenant.dateOfBirth = new Date(dateOfBirth);
//     if (email !== undefined) tenant.email = email || "";
//     if (aadhaarNumber) tenant.aadhaarNumber = aadhaarNumber;
//     if (passportPhoto) tenant.passportPhoto = passportPhoto;
//     if (aadhaarFront) tenant.aadhaarFront = aadhaarFront;
//     if (aadhaarBack) tenant.aadhaarBack = aadhaarBack;
//     if (digitalSignature) tenant.digitalSignature = digitalSignature;
//     if (permanentAddress) tenant.permanentAddress = permanentAddress;
//     if (isCurrentAddressSame !== undefined) tenant.isCurrentAddressSame = isCurrentAddressSame;
    
//     // Handle current address logic
//     if (isCurrentAddressSame && permanentAddress) {
//       tenant.currentAddress = permanentAddress;
//     } else if (currentAddress) {
//       tenant.currentAddress = currentAddress;
//     }
    
//     if (emergencyContact) tenant.emergencyContact = emergencyContact;
//     if (agreementStartDate) tenant.agreementStartDate = new Date(agreementStartDate);
//     if (policeVerificationConsent !== undefined) tenant.policeVerificationConsent = policeVerificationConsent;
//     if (termsAgreement !== undefined) tenant.termsAgreement = termsAgreement;

//     // Save the updated hostel and tenant
//     await hostelInfo.save();
//     await tenant.save();

//     res.status(200).json({
//       message: "Tenant Updated Successfully",
//       tenantInfo: tenant,
//     });
//   } catch (err) {
//     console.error("Error updating tenant:", err.message);
//     res.status(400).json({ message: err.message });
//   }
// };

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

// API to search tenants by various criteria
export const searchTenants = async (req, res) => {
  try {
    const { id } = req.user;
    const { 
      name, 
      room, 
      contact, 
      aadhaar, 
      moveInDate, 
      sortBy = "moveInDate", 
      sortOrder = "desc" 
    } = req.query;
    
    // Pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = { ownerId: id };
    
    if (name) query.tenantName = { $regex: name, $options: 'i' };
    if (room) query.roomNumber = room;
    if (contact) query.contact = { $regex: contact, $options: 'i' };
    if (aadhaar) query.aadhaarNumber = { $regex: aadhaar, $options: 'i' };
    if (moveInDate) {
      const date = new Date(moveInDate);
      // Match tenants moved in on the specified date (ignoring time)
      query.moveInDate = {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999))
      };
    }

    // Count total matching documents
    const totalTenants = await Tenant.countDocuments(query);

    // Sort order
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination and sorting
    const tenants = await Tenant.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Tenants Search Completed",
      count: tenants.length,
      total: totalTenants,
      totalPages: Math.ceil(totalTenants / limit),
      currentPage: page,
      tenants,
    });
  } catch (err) {
    console.error("Error searching tenants:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// export const deleteTenantInfo = async (req, res) => {
//   try {
//     const { tenantId } = req.params;
//     const { id } = req.user;

//     // Input validation
//     if (!tenantId || !mongoose.Types.ObjectId.isValid(tenantId)) {
//       return res.status(400).json({ message: "Invalid tenant ID format" });
//     }

//     // Check if hostel exists
//     const hostelInfo = await Hostel.findOne({ ownerId: id });
//     if (!hostelInfo) {
//       return res.status(404).json({ message: "Hostel Not Found" });
//     }

//     // Find tenant with lean() for better performance
//     const tenant = await Tenant.findById(tenantId).lean();
//     if (!tenant) {
//       return res.status(404).json({
//         message: `Tenant not found with ID ${tenantId}`,
//       });
//     }

//     // Verify the tenant belongs to this owner
//     if (tenant.ownerId.toString() !== id) {
//       return res.status(403).json({
//         message: "You are not authorized to delete this tenant",
//       });
//     }

//     // Find the room where the tenant resides using a more reliable approach
//     const roomIndex = hostelInfo.rooms.findIndex(
//       (room) => room.roomNumber === Number(tenant.roomNumber)
//     );

//     if (roomIndex !== -1) {
//       // Update room availability in a safer way
//       const room = hostelInfo.rooms[roomIndex];

//       // Check if the tenant is actually occupying a bed in this room
//       // by looking at current occupancy numbers
//       const currentOccupied = room.totalBeds - room.availableBeds;

//       if (currentOccupied > 0) {
//         // There are occupied beds, so we can safely free one up
//         await Hostel.updateOne(
//           {
//             _id: hostelInfo._id,
//             "rooms.roomNumber": Number(tenant.roomNumber),
//           },
//           {
//             $inc: { "rooms.$.availableBeds": 1 },
//           }
//         );
//       } else {
//         console.warn(
//           `Room ${tenant.roomNumber} shows no occupants but tenant ${tenant._id} claims to be in this room. Proceeding with tenant deletion.`
//         );
//         // We'll still delete the tenant even if the room data is inconsistent
//       }
//     } else {
//       console.warn(
//         `Room ${tenant.roomNumber} not found in hostel for tenant ${tenantId}`
//       );
//       // Continue with deletion even if room not found
//     }

//     // Delete the tenant with a pre-check to ensure it still exists
//     const deletedTenant = await Tenant.findByIdAndDelete(tenantId);

//     if (!deletedTenant) {
//       return res.status(404).json({
//         message: "Tenant already deleted or not found",
//       });
//     }

//     res.status(200).json({
//       message: `Tenant ${tenant.tenantName} Removed Successfully from Room ${tenant.roomNumber}`,
//       tenantId: tenantId,
//     });
//   } catch (err) {
//     console.error("Error deleting tenant:", err);
//     res.status(500).json({
//       message: "Failed to delete tenant",
//       error: err.message,
//     });
//   }
// };

// API to generate tenant reports
export const generateTenantReports = async (req, res) => {
  try {
    const { id } = req.user;
    const { reportType } = req.query;

    // Check if hostel exists
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    let reportData = {};
    
    // Different report types
    switch(reportType) {
      case 'occupancy':
        // Calculate occupancy statistics
        const rooms = hostelInfo.rooms;
        let totalBeds = 0;
        let occupiedBeds = 0;
        
        rooms.forEach(room => {
          totalBeds += room.totalBeds;
          occupiedBeds += (room.totalBeds - room.availableBeds);
        });
        
        const occupancyRate = totalBeds > 0 ? (occupiedBeds / totalBeds) * 100 : 0;
        
        // Get room-wise occupancy
        const roomOccupancy = await Promise.all(rooms.map(async (room) => {
          const tenantCount = await Tenant.countDocuments({ 
            ownerId: id, 
            roomNumber: room.roomNumber.toString() 
          });
          
          return {
            roomNumber: room.roomNumber,
            totalBeds: room.totalBeds,
            occupied: tenantCount,
            available: room.availableBeds,
            occupancyRate: (tenantCount / room.totalBeds) * 100
          };
        }));
        
        reportData = {
          totalBeds,
          occupiedBeds,
          availableBeds: totalBeds - occupiedBeds,
          occupancyRate: occupancyRate.toFixed(2),
          roomOccupancy
        };
        break;
        
      case 'tenantDemographics':
        // Get demographic information about tenants
        const tenants = await Tenant.find({ ownerId: id });
        
        // Calculate age distribution
        const currentDate = new Date();
        const ageGroups = {
          'under18': 0,
          '18to25': 0,
          '26to35': 0,
          '36to50': 0,
          'over50': 0
        };
        
        tenants.forEach(tenant => {
          const dob = new Date(tenant.dateOfBirth);
          const age = currentDate.getFullYear() - dob.getFullYear();
          
          if (age < 18) ageGroups.under18++;
          else if (age <= 25) ageGroups['18to25']++;
          else if (age <= 35) ageGroups['26to35']++;
          else if (age <= 50) ageGroups['36to50']++;
          else ageGroups.over50++;
        });
        
        reportData = {
          totalTenants: tenants.length,
          ageDistribution: ageGroups,
        };
        break;
        
      case 'tenureAnalysis':
        // Analyze tenant tenure/duration of stay
        const allTenants = await Tenant.find({ ownerId: id });
        const tenureGroups = {
          'lessThan1Month': 0,
          '1to3Months': 0,
          '3to6Months': 0,
          '6to12Months': 0,
          'moreThan12Months': 0
        };
        
        allTenants.forEach(tenant => {
          const moveIn = new Date(tenant.moveInDate);
          const currentDate = new Date();
          const tenureMonths = 
            (currentDate.getFullYear() - moveIn.getFullYear()) * 12 + 
            (currentDate.getMonth() - moveIn.getMonth());
          
          if (tenureMonths < 1) tenureGroups.lessThan1Month++;
          else if (tenureMonths < 3) tenureGroups['1to3Months']++;
          else if (tenureMonths < 6) tenureGroups['3to6Months']++;
          else if (tenureMonths < 12) tenureGroups['6to12Months']++;
          else tenureGroups.moreThan12Months++;
        });
        
        reportData = {
          totalTenants: allTenants.length,
          tenureDistribution: tenureGroups
        };
        break;
        
      default:
        return res.status(400).json({ 
          message: "Invalid report type. Available types: occupancy, tenantDemographics, tenureAnalysis" 
        });
    }

    res.status(200).json({
      message: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report Generated Successfully`,
      reportType,
      data: reportData
    });
  } catch (err) {
    console.error(`Error generating tenant report:`, err);
    res.status(500).json({
      message: "Failed to generate tenant report",
      error: err.message,
    });
  }
};


















export const addTenantInfo = async (req, res) => {
  try {
    // Log incoming request for debugging
    console.log("Add tenant request body:", req.body);

    // Validate all required tenant data
    validateTenantData(req);

    const { 
      tenantName, 
      roomNumber, 
      moveInDate, // This can be either moveInDate or joinDate to support both
      joinDate,   // Support original field name for backward compatibility
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
    
    const { id } = req.user;

    // Check if hostel exists for the user
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    // Log for debugging
    console.log("Found hostel:", hostelInfo._id);
    console.log("Looking for room number:", roomNumber);
    console.log("Room type:", typeof roomNumber);
    console.log("Available rooms:", hostelInfo.rooms.map(r => ({ num: r.roomNumber, type: typeof r.roomNumber })));

    // Convert roomNumber to string to ensure consistent comparison
    const roomNumAsString = String(roomNumber);

    // Find the room by room number using string comparison
    const roomIndex = hostelInfo.rooms.findIndex(
      (room) => String(room.roomNumber) === roomNumAsString
    );

    if (roomIndex === -1) {
      return res.status(404).json({ 
        message: `Room ${roomNumber} Not Found`,
        availableRooms: hostelInfo.rooms.map(r => r.roomNumber)
      });
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

    // Check if tenant with same Aadhaar number already exists for this owner
    const existingTenantByAadhaar = await Tenant.findOne({
      aadhaarNumber,
      ownerId: id,
    });

    if (existingTenantByAadhaar) {
      return res.status(400).json({
        message: `A tenant with Aadhaar number ${aadhaarNumber} already exists`,
      });
    }

    // Create new tenant with expanded fields - making new fields optional
    const newTenant = new Tenant({
      tenantName,
      roomNumber: roomNumAsString, // Store as string consistently
      moveInDate: new Date(moveInDate || joinDate), // Use moveInDate or fallback to joinDate
      rentAmount: Number(rentAmount),
      contact,
      // Provide default values or conditionally include new fields
      ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
      ...(email !== undefined && { email }),
      ...(aadhaarNumber && { aadhaarNumber }),
      ...(passportPhoto && { passportPhoto }),
      ...(aadhaarFront && { aadhaarFront }),
      ...(aadhaarBack && { aadhaarBack }),
      ...(digitalSignature && { digitalSignature }),
      ...(permanentAddress && { permanentAddress }),
      ...(isCurrentAddressSame !== undefined && { isCurrentAddressSame }),
      ...((isCurrentAddressSame && permanentAddress) || (currentAddress) ? 
          { currentAddress: isCurrentAddressSame ? permanentAddress : currentAddress } : {}),
      ...(emergencyContact && { emergencyContact }),
      ...(agreementStartDate && { agreementStartDate: new Date(agreementStartDate) }),
      ...(policeVerificationConsent !== undefined && { policeVerificationConsent }),
      ...(termsAgreement !== undefined && { termsAgreement }),
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

// Update other roomNumber comparisons in the rest of the controller

export const updateTenantInfo = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { 
      tenantName, 
      roomNumber, 
      moveInDate, // This can be either moveInDate or joinDate
      joinDate,   // Support original field name for backward compatibility 
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

    // Convert room numbers to strings for comparison
    const oldRoomNumAsString = String(tenant.roomNumber);
    const newRoomNumAsString = String(roomNumber);

    // Check if new room number is different from current
    const isRoomChanging = oldRoomNumAsString !== newRoomNumAsString;

    if (isRoomChanging) {
      // Find old room
      const oldRoomIndex = hostelInfo.rooms.findIndex(
        (room) => String(room.roomNumber) === oldRoomNumAsString
      );

      if (oldRoomIndex !== -1) {
        // Increment available beds in old room
        hostelInfo.rooms[oldRoomIndex].availableBeds += 1;
      }

      // Find new room
      const newRoomIndex = hostelInfo.rooms.findIndex(
        (room) => String(room.roomNumber) === newRoomNumAsString
      );

      if (newRoomIndex === -1) {
        return res
          .status(404)
          .json({ 
            message: `New Room ${roomNumber} Not Found`,
            availableRooms: hostelInfo.rooms.map(r => r.roomNumber)
          });
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

    // Check if Aadhaar number is changing and if new number already exists
    if (aadhaarNumber !== tenant.aadhaarNumber) {
      const existingTenantByAadhaar = await Tenant.findOne({
        aadhaarNumber,
        ownerId: id,
        _id: { $ne: tenantId }, // Exclude current tenant
      });

      if (existingTenantByAadhaar) {
        return res.status(400).json({
          message: `A tenant with Aadhaar number ${aadhaarNumber} already exists`,
        });
      }
    }

    // Check if contact is changing and if new number already exists
    if (contact !== tenant.contact) {
      const existingTenantByPhone = await Tenant.findOne({
        contact,
        ownerId: id,
        _id: { $ne: tenantId }, // Exclude current tenant
      });

      if (existingTenantByPhone) {
        return res.status(400).json({
          message: `A tenant with phone number ${contact} already exists`,
        });
      }
    }

    // Update tenant details with all the expanded fields - making new fields optional
    tenant.tenantName = tenantName;
    tenant.roomNumber = newRoomNumAsString;
    tenant.moveInDate = new Date(moveInDate || joinDate); // Use moveInDate or fallback to joinDate
    tenant.rentAmount = Number(rentAmount);
    tenant.contact = contact;
    
    // Only update new fields if they're provided
    if (dateOfBirth) tenant.dateOfBirth = new Date(dateOfBirth);
    if (email !== undefined) tenant.email = email || "";
    if (aadhaarNumber) tenant.aadhaarNumber = aadhaarNumber;
    if (passportPhoto) tenant.passportPhoto = passportPhoto;
    if (aadhaarFront) tenant.aadhaarFront = aadhaarFront;
    if (aadhaarBack) tenant.aadhaarBack = aadhaarBack;
    if (digitalSignature) tenant.digitalSignature = digitalSignature;
    if (permanentAddress) tenant.permanentAddress = permanentAddress;
    if (isCurrentAddressSame !== undefined) tenant.isCurrentAddressSame = isCurrentAddressSame;
    
    // Handle current address logic
    if (isCurrentAddressSame && permanentAddress) {
      tenant.currentAddress = permanentAddress;
    } else if (currentAddress) {
      tenant.currentAddress = currentAddress;
    }
    
    if (emergencyContact) tenant.emergencyContact = emergencyContact;
    if (agreementStartDate) tenant.agreementStartDate = new Date(agreementStartDate);
    if (policeVerificationConsent !== undefined) tenant.policeVerificationConsent = policeVerificationConsent;
    if (termsAgreement !== undefined) tenant.termsAgreement = termsAgreement;

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

// Update the getTenantsByRoom function to use string comparison
export const getTenantsByRoom = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const { id } = req.user;

    // Check if hostel exists
    const hostelInfo = await Hostel.findOne({ ownerId: id });
    if (!hostelInfo) {
      return res.status(404).json({ message: "Hostel Not Found" });
    }

    // Check if room exists - use string comparison
    const room = hostelInfo.rooms.find(
      (room) => String(room.roomNumber) === String(roomNumber)
    );

    if (!room) {
      return res.status(404).json({ 
        message: `Room ${roomNumber} Not Found`,
        availableRooms: hostelInfo.rooms.map(r => r.roomNumber)
      });
    }

    // Get tenants for this room
    const tenants = await Tenant.find({
      ownerId: id,
      roomNumber: String(roomNumber),
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

// Update the same string comparison approach for deleteTenantInfo
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

    // Find the room where the tenant resides using string comparison
    const roomIndex = hostelInfo.rooms.findIndex(
      (room) => String(room.roomNumber) === String(tenant.roomNumber)
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
            "rooms.roomNumber": room.roomNumber,
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

// Other controller functions remain the same...
import Payment from "../models/Payment.js";
import Tenant from "../models/Tenant.js";

// Get all payments for an owner
export const getPayments = async (req, res) => {
  try {
    const { ownerId } = req.user;

    // Populate tenant details to show tenant name, contact, etc. in payment records
    const payments = await Payment.find({ ownerId })
      .populate(
        "tenantId",
        "name email phone roomNumber rentAmount joiningDate"
      )
      .sort({ dueDate: -1 });

    // Format the response to include tenant details directly
    const formattedPayments = payments.map((payment) => {
      const tenant = payment.tenantId;
      return {
        paymentId: payment._id,
        tenantId: tenant._id,
        tenant: tenant.name,
        contact: tenant.phone,
        room: payment.roomNumber,
        joinDate: tenant.joiningDate,
        rent: payment.rentAmount,
        paymentDate: payment.paymentDate,
        paymentAmount: payment.paymentAmount,
        paymentMode: payment.paymentMode,
        transactionId: payment.transactionId,
        remarks: payment.remarks,
        rentStatus: payment.rentStatus,
        dueDate: payment.dueDate,
        dueAmount: payment.dueAmount,
        isActive: payment.isActive,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      };
    });

    res.status(200).json({
      success: true,
      count: formattedPayments.length,
      data: formattedPayments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};

// Get template for creating a new payment for tenant (used when manually adding new payments)
export const getTenantPaymentTemplate = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { ownerId } = req.user;

    // Verify tenant exists and belongs to current owner
    const tenant = await Tenant.findOne({
      _id: tenantId,
      ownerId,
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found or doesn't belong to this owner",
      });
    }

    // Create template with tenant details and empty payment fields
    const paymentTemplate = {
      tenantId: tenant._id,
      tenant: tenant.name,
      contact: tenant.phone,
      room: tenant.roomNumber,
      joinDate: tenant.joiningDate,
      rent: tenant.rentAmount,
      paymentDate: new Date(), // Default to today
      paymentAmount: 0, // Empty initially
      paymentMode: "", // Empty initially
      transactionId: "", // Empty initially
      remarks: "", // Empty initially
      rentStatus: "Due", // Default status
      dueDate: null, // Empty initially
      dueAmount: tenant.rentAmount, // Full rent is due initially
    };

    res.status(200).json({
      success: true,
      data: paymentTemplate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate payment template",
      error: error.message,
    });
  }
};

// Get payments for a specific tenant
export const getTenantPayments = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { ownerId } = req.user;

    // Verify tenant exists and belongs to owner
    const tenant = await Tenant.findOne({
      _id: tenantId,
      ownerId,
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found or doesn't belong to this owner",
      });
    }

    // Get all payments for this tenant
    const payments = await Payment.find({
      tenantId,
      ownerId,
    }).sort({ dueDate: -1 });

    // Format payments to include tenant details
    const formattedPayments = payments.map((payment) => {
      return {
        paymentId: payment._id,
        tenantId: tenant._id,
        tenant: tenant.name,
        contact: tenant.phone,
        room: payment.roomNumber,
        joinDate: tenant.joiningDate,
        rent: payment.rentAmount,
        paymentDate: payment.paymentDate,
        paymentAmount: payment.paymentAmount,
        paymentMode: payment.paymentMode,
        transactionId: payment.transactionId,
        remarks: payment.remarks,
        rentStatus: payment.rentStatus,
        dueDate: payment.dueDate,
        dueAmount: payment.dueAmount,
        isActive: payment.isActive,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      };
    });

    res.status(200).json({
      success: true,
      count: formattedPayments.length,
      data: formattedPayments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tenant payments",
      error: error.message,
    });
  }
};

// Get payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { ownerId } = req.user;

    const payment = await Payment.findOne({
      _id: id,
      ownerId,
    }).populate(
      "tenantId",
      "name email phone roomNumber rentAmount joiningDate"
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    const tenant = payment.tenantId;
    const formattedPayment = {
      paymentId: payment._id,
      tenantId: tenant._id,
      tenant: tenant.name,
      contact: tenant.phone,
      room: payment.roomNumber,
      joinDate: tenant.joiningDate,
      rent: payment.rentAmount,
      paymentDate: payment.paymentDate,
      paymentAmount: payment.paymentAmount,
      paymentMode: payment.paymentMode,
      transactionId: payment.transactionId,
      remarks: payment.remarks,
      rentStatus: payment.rentStatus,
      dueDate: payment.dueDate,
      dueAmount: payment.dueAmount,
      isActive: payment.isActive,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: formattedPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment",
      error: error.message,
    });
  }
};

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { ownerId } = req.user;
    const {
      tenantId,
      roomNumber,
      dueDate,
      rentAmount,
      paymentAmount,
      paymentMode,
      transactionId,
      remarks,
    } = req.body;

    // Validate tenant exists and belongs to owner
    const tenant = await Tenant.findOne({
      _id: tenantId,
      ownerId,
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found or doesn't belong to this owner",
      });
    }

    // Calculate due amount and status
    const dueAmount = rentAmount - (paymentAmount || 0);
    let rentStatus = "Due";

    if (paymentAmount >= rentAmount) {
      rentStatus = "Paid";
    } else if (paymentAmount > 0) {
      rentStatus = "Partially Paid";
    }

    const payment = new Payment({
      tenantId,
      ownerId,
      roomNumber: roomNumber || tenant.roomNumber,
      dueDate,
      rentAmount: rentAmount || tenant.rentAmount,
      paymentAmount: paymentAmount || 0,
      dueAmount,
      paymentMode: paymentMode || "Cash",
      rentStatus,
      transactionId: transactionId || "",
      remarks: remarks || "",
    });

    const savedPayment = await payment.save();

    // Format the response with tenant details
    const formattedPayment = {
      paymentId: savedPayment._id,
      tenantId: tenant._id,
      tenant: tenant.name,
      contact: tenant.phone,
      room: savedPayment.roomNumber,
      joinDate: tenant.joiningDate,
      rent: savedPayment.rentAmount,
      paymentDate: savedPayment.paymentDate,
      paymentAmount: savedPayment.paymentAmount,
      paymentMode: savedPayment.paymentMode,
      transactionId: savedPayment.transactionId,
      remarks: savedPayment.remarks,
      rentStatus: savedPayment.rentStatus,
      dueDate: savedPayment.dueDate,
      dueAmount: savedPayment.dueAmount,
      isActive: savedPayment.isActive,
      createdAt: savedPayment.createdAt,
      updatedAt: savedPayment.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: formattedPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create payment",
      error: error.message,
    });
  }
};

// Update payment
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { ownerId } = req.user;
    const {
      paymentAmount,
      paymentMode,
      transactionId,
      remarks,
      dueDate,
      isActive,
    } = req.body;

    const payment = await Payment.findOne({
      _id: id,
      ownerId,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found or doesn't belong to this owner",
      });
    }

    // Update fields if provided
    if (paymentAmount !== undefined) {
      payment.paymentAmount = paymentAmount;
      payment.dueAmount = payment.rentAmount - paymentAmount;

      if (paymentAmount >= payment.rentAmount) {
        payment.rentStatus = "Paid";
      } else if (paymentAmount > 0) {
        payment.rentStatus = "Partially Paid";
      } else {
        payment.rentStatus = "Due";
      }
    }

    if (paymentMode !== undefined) payment.paymentMode = paymentMode;
    if (transactionId !== undefined) payment.transactionId = transactionId;
    if (remarks !== undefined) payment.remarks = remarks;
    if (dueDate !== undefined) payment.dueDate = dueDate;
    if (isActive !== undefined) payment.isActive = isActive;

    const updatedPayment = await payment.save();

    // Get tenant details for the response
    const tenant = await Tenant.findById(payment.tenantId);

    // Format the response
    const formattedPayment = {
      paymentId: updatedPayment._id,
      tenantId: tenant._id,
      tenant: tenant.name,
      contact: tenant.phone,
      room: updatedPayment.roomNumber,
      joinDate: tenant.joiningDate,
      rent: updatedPayment.rentAmount,
      paymentDate: updatedPayment.paymentDate,
      paymentAmount: updatedPayment.paymentAmount,
      paymentMode: updatedPayment.paymentMode,
      transactionId: updatedPayment.transactionId,
      remarks: updatedPayment.remarks,
      rentStatus: updatedPayment.rentStatus,
      dueDate: updatedPayment.dueDate,
      dueAmount: updatedPayment.dueAmount,
      isActive: updatedPayment.isActive,
      createdAt: updatedPayment.createdAt,
      updatedAt: updatedPayment.updatedAt,
    };

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: formattedPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update payment",
      error: error.message,
    });
  }
};

// Delete payment
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { ownerId } = req.user;

    const payment = await Payment.findOne({
      _id: id,
      ownerId,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found or doesn't belong to this owner",
      });
    }

    await payment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete payment",
      error: error.message,
    });
  }
};

// Get payment statistics
export const getPaymentStats = async (req, res) => {
  // Implementation for payment statistics...
};

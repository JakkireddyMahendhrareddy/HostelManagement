import React from "react";
import { FaTimes } from "react-icons/fa";

const TenantFormModal = ({
  setShowTenantFormModal,
  newTenant,
  handleTenantChange,
  handleTenantSubmit,
  isEditing,
  rooms,
  resetForm,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        {/* Modal header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Edit Tenant" : "Add New Tenant"}
          </h3>
          <button
            onClick={() => {
              resetForm();
              setShowTenantFormModal(false);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTenantSubmit();
          }}
          className="mt-4 space-y-4"
        >
          {/* Tenant Name */}
          <div>
            <label
              htmlFor="tenantName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tenant Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="tenantName"
              name="tenantName"
              value={newTenant.tenantName}
              onChange={handleTenantChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Room Number */}
          <div>
            <label
              htmlFor="roomNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room Number <span className="text-red-500">*</span>
            </label>
            <select
              id="roomNumber"
              name="roomNumber"
              value={newTenant.roomNumber}
              onChange={handleTenantChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room._id} value={room.roomNumber}>
                  Room {room.roomNumber} ({room.availableBeds} beds available)
                </option>
              ))}
              {isEditing && (
                <option value={newTenant.roomNumber}>
                  Current: Room {newTenant.roomNumber}
                </option>
              )}
            </select>
          </div>

          {/* Join Date */}
          <div>
            <label
              htmlFor="joinDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Join Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              value={newTenant.joinDate}
              onChange={handleTenantChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Rent Amount */}
          <div>
            <label
              htmlFor="rentAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rent Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="rentAmount"
              name="rentAmount"
              value={newTenant.rentAmount}
              onChange={handleTenantChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={newTenant.contact}
              onChange={handleTenantChange}
              required
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: 10 digits without spaces or dashes
            </p>
          </div>

          {/* Optional fields - can be expanded */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={newTenant.email || ""}
              onChange={handleTenantChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowTenantFormModal(false);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {isEditing ? "Update Tenant" : "Add Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenantFormModal;

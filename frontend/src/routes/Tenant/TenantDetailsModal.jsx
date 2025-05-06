import React from "react";
import { FaTimes } from "react-icons/fa";

const TenantDetailsModal = ({ tenant, setShowDetailsModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Modal header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-800">
            Tenant Details
          </h3>
          <button
            onClick={() => setShowDetailsModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal content */}
        <div className="mt-4 space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500">Tenant Name</span>
            <span className="font-medium">{tenant.tenantName}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500">Room Number</span>
            <span className="font-medium">{tenant.roomNumber}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500">Join Date</span>
            <span className="font-medium">
              {new Date(tenant.joinDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500">Rent Amount</span>
            <span className="font-medium">₹{tenant.rentAmount}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500">Contact</span>
            <span className="font-medium">{tenant.contact}</span>
          </div>

          {/* Additional details if available */}
          {tenant.email && (
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-500">Email</span>
              <span className="font-medium">{tenant.email}</span>
            </div>
          )}

          {tenant.aadharNumber && (
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-gray-500">Aadhar Number</span>
              <span className="font-medium">{tenant.aadharNumber}</span>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="mt-6 text-right">
          <button
            onClick={() => setShowDetailsModal(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantDetailsModal;

// import React from "react";
// import { FaTimes } from "react-icons/fa";

// const TenantDetailsModal = ({ tenant, setShowDetailsModal }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
//         {/* Modal header */}
//         <div className="flex justify-between items-center border-b pb-3">
//           <h3 className="text-xl font-semibold text-gray-800">
//             Tenant Details
//           </h3>
//           <button
//             onClick={() => setShowDetailsModal(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <FaTimes />
//           </button>
//         </div>

//         {/* Modal content */}
//         <div className="mt-4 space-y-4">
//           <div className="flex flex-col space-y-1">
//             <span className="text-sm text-gray-500">Tenant Name</span>
//             <span className="font-medium">{tenant.tenantName}</span>
//           </div>

//           <div className="flex flex-col space-y-1">
//             <span className="text-sm text-gray-500">Room Number</span>
//             <span className="font-medium">{tenant.roomNumber}</span>
//           </div>

//           <div className="flex flex-col space-y-1">
//             <span className="text-sm text-gray-500">Join Date</span>
//             <span className="font-medium">
//               {new Date(tenant.joinDate).toLocaleDateString()}
//             </span>
//           </div>

//           <div className="flex flex-col space-y-1">
//             <span className="text-sm text-gray-500">Rent Amount</span>
//             <span className="font-medium">₹{tenant.rentAmount}</span>
//           </div>

//           <div className="flex flex-col space-y-1">
//             <span className="text-sm text-gray-500">Contact</span>
//             <span className="font-medium">{tenant.contact}</span>
//           </div>

//           {/* Additional details if available */}
//           {tenant.email && (
//             <div className="flex flex-col space-y-1">
//               <span className="text-sm text-gray-500">Email</span>
//               <span className="font-medium">{tenant.email}</span>
//             </div>
//           )}

//           {tenant.aadharNumber && (
//             <div className="flex flex-col space-y-1">
//               <span className="text-sm text-gray-500">Aadhar Number</span>
//               <span className="font-medium">{tenant.aadharNumber}</span>
//             </div>
//           )}
//         </div>

//         {/* Modal footer */}
//         <div className="mt-6 text-right">
//           <button
//             onClick={() => setShowDetailsModal(false)}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TenantDetailsModal;


import React from "react";
import {
  FaTimes,
  FaUser,
  FaDoorOpen,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaMapMarkerAlt,
  FaPhoneVolume,
} from "react-icons/fa";

const TenantDetailsModal = ({ tenant, setShowDetailsModal }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Handle undefined or null fields safely
  const joinDate = tenant.joinDate || tenant.moveInDate; // Handle both field names

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 relative overflow-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={() => setShowDetailsModal(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-red-600 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-blue-600">Tenant Details</h3>
        </div>

        {/* Modal content */}
        <div className="space-y-4">
          {/* Tenant Name */}
          <div className="flex items-center space-x-2">
            <FaUser size={20} className="text-gray-500" />
            <div>
              <span className="text-sm text-gray-600">Tenant Name</span>
              <span className="font-medium block">{tenant.tenantName || "N/A"}</span>
            </div>
          </div>

          {/* Room Number */}
          <div className="flex items-center space-x-2">
            <FaDoorOpen size={20} className="text-gray-500" />
            <div>
              <span className="text-sm text-gray-600">Room Number</span>
              <span className="font-medium block">{tenant.roomNumber || "N/A"}</span>
            </div>
          </div>

          {/* Join Date */}
          <div className="flex items-center space-x-2">
            <FaCalendarAlt size={20} className="text-gray-500" />
            <div>
              <span className="text-sm text-gray-600">Join Date</span>
              <span className="font-medium block">{formatDate(joinDate)}</span>
            </div>
          </div>

          {/* Rent Amount */}
          <div className="flex items-center space-x-2">
            <FaMoneyBillWave size={20} className="text-gray-500" />
            <div>
              <span className="text-sm text-gray-600">Rent Amount</span>
              <span className="font-medium block">₹{tenant.rentAmount || "N/A"}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center space-x-2">
            <FaPhone size={20} className="text-gray-500" />
            <div>
              <span className="text-sm text-gray-600">Contact</span>
              <span className="font-medium block">{tenant.contact || "N/A"}</span>
            </div>
          </div>

          {/* Email */}
          {tenant.email && (
            <div className="flex items-center space-x-2">
              <FaEnvelope size={20} className="text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Email</span>
                <span className="font-medium block">{tenant.email}</span>
              </div>
            </div>
          )}

          {/* Aadhaar Number */}
          {tenant.aadharNumber && (
            <div className="flex items-center space-x-2">
              <FaIdCard size={20} className="text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Aadhar Number</span>
                <span className="font-medium block">{tenant.aadharNumber}</span>
              </div>
            </div>
          )}

          {/* Permanent Address */}
          {tenant.permanentAddress && (
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt size={20} className="text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Permanent Address</span>
                <span className="font-medium block">
                  {tenant.permanentAddress.street}, {tenant.permanentAddress.city}, {tenant.permanentAddress.state} - {tenant.permanentAddress.pincode}
                </span>
              </div>
            </div>
          )}

          {/* Current Address */}
          {tenant.isCurrentAddressSame === false && tenant.currentAddress && (
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt size={20} className="text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Current Address</span>
                <span className="font-medium block">
                  {tenant.currentAddress.street}, {tenant.currentAddress.city}, {tenant.currentAddress.state} - {tenant.currentAddress.pincode}
                </span>
              </div>
            </div>
          )}

          {/* Emergency Contact */}
          {tenant.emergencyContact && (
            <div className="flex items-center space-x-2">
              <FaPhoneVolume size={20} className="text-gray-500" />
              <div>
                <span className="text-sm text-gray-600">Emergency Contact</span>
                <span className="font-medium block">Name: {tenant.emergencyContact.name}</span>
                <span className="font-medium block">Relationship: {tenant.emergencyContact.relationship}</span>
                <span className="font-medium block">Mobile: {tenant.emergencyContact.mobile}</span>
              </div>
            </div>
          )}

          {/* Documents (Passport Photo, Aadhaar Images, Signature) */}
          {tenant.passportPhoto && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Passport Photo</span>
              <img
                src={tenant.passportPhoto}
                alt="Passport"
                className="w-32 h-32 object-cover rounded mx-auto"
              />
            </div>
          )}

          {tenant.aadhaarFront && tenant.aadhaarBack && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Aadhaar Images</span>
              <div className="flex space-x-4">
                <img
                  src={tenant.aadhaarFront}
                  alt="Aadhaar Front"
                  className="w-32 h-32 object-cover rounded"
                />
                <img
                  src={tenant.aadhaarBack}
                  alt="Aadhaar Back"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            </div>
          )}

          {tenant.digitalSignature && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Digital Signature</span>
              <img
                src={tenant.digitalSignature}
                alt="Digital Signature"
                className="w-32 h-32 object-cover rounded mx-auto"
              />
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



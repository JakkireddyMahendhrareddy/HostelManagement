// import React from "react";
// import {
//   FaTimes,
//   FaUser,
//   FaDoorOpen,
//   FaCalendarAlt,
//   FaMoneyBillWave,
//   FaPhone,
//   FaEnvelope,
//   FaIdCard,
//   FaMapMarkerAlt,
//   FaPhoneVolume,
// } from "react-icons/fa";

// const TenantDetailsModal = ({ tenant, setShowDetailsModal }) => {
//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   // Handle undefined or null fields safely
//   const joinDate = tenant.joinDate || tenant.moveInDate; // Handle both field names

//   return (
//     <div className="fixed inset-0 bg-gray-200 bg-opacity-75 flex justify-center items-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-6 relative overflow-auto max-h-[90vh]">
//         {/* Close button */}
//         <button
//           onClick={() => setShowDetailsModal(false)}
//           className="absolute right-4 top-4 text-gray-500 hover:text-red-600 transition-colors"
//         >
//           <FaTimes size={20} />
//         </button>

//         {/* Modal header */}
//         <div className="flex justify-between items-center border-b pb-3 mb-4">
//           <h3 className="text-2xl font-bold text-blue-600">Tenant Details</h3>
//         </div>

//         {/* Modal content */}
//         <div className="space-y-4">
//           {/* Tenant Name */}
//           <div className="flex items-center space-x-2">
//             <FaUser size={20} className="text-gray-500" />
//             <div>
//               <span className="text-sm text-gray-600">Tenant Name</span>
//               <span className="font-medium block">
//                 {tenant.tenantName || "N/A"}
//               </span>
//             </div>
//           </div>

//           {/* Room Number */}
//           <div className="flex items-center space-x-2">
//             <FaDoorOpen size={20} className="text-gray-500" />
//             <div>
//               <span className="text-sm text-gray-600">Room Number</span>
//               <span className="font-medium block">
//                 {tenant.roomNumber || "N/A"}
//               </span>
//             </div>
//           </div>

//           {/* Join Date */}
//           <div className="flex items-center space-x-2">
//             <FaCalendarAlt size={20} className="text-gray-500" />
//             <div>
//               <span className="text-sm text-gray-600">Join Date</span>
//               <span className="font-medium block">{formatDate(joinDate)}</span>
//             </div>
//           </div>

//           {/* Rent Amount */}
//           <div className="flex items-center space-x-2">
//             <FaMoneyBillWave size={20} className="text-gray-500" />
//             <div>
//               <span className="text-sm text-gray-600">Rent Amount</span>
//               <span className="font-medium block">
//                 ₹{tenant.rentAmount || "N/A"}
//               </span>
//             </div>
//           </div>

//           {/* Contact */}
//           <div className="flex items-center space-x-2">
//             <FaPhone size={20} className="text-gray-500" />
//             <div>
//               <span className="text-sm text-gray-600">Contact</span>
//               <span className="font-medium block">
//                 {tenant.contact || "N/A"}
//               </span>
//             </div>
//           </div>

//           {/* Email */}
//           {tenant.email && (
//             <div className="flex items-center space-x-2">
//               <FaEnvelope size={20} className="text-gray-500" />
//               <div>
//                 <span className="text-sm text-gray-600">Email</span>
//                 <span className="font-medium block">{tenant.email}</span>
//               </div>
//             </div>
//           )}

//           {/* Aadhaar Number */}
//           {tenant.aadharNumber && (
//             <div className="flex items-center space-x-2">
//               <FaIdCard size={20} className="text-gray-500" />
//               <div>
//                 <span className="text-sm text-gray-600">Aadhar Number</span>
//                 <span className="font-medium block">{tenant.aadharNumber}</span>
//               </div>
//             </div>
//           )}

//           {/* Permanent Address */}
//           {tenant.permanentAddress && (
//             <div className="flex items-center space-x-2">
//               <FaMapMarkerAlt size={20} className="text-gray-500" />
//               <div>
//                 <span className="text-sm text-gray-600">Permanent Address</span>
//                 <span className="font-medium block">
//                   {tenant.permanentAddress.street},{" "}
//                   {tenant.permanentAddress.city},{" "}
//                   {tenant.permanentAddress.state} -{" "}
//                   {tenant.permanentAddress.pincode}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Current Address */}
//           {tenant.isCurrentAddressSame === false && tenant.currentAddress && (
//             <div className="flex items-center space-x-2">
//               <FaMapMarkerAlt size={20} className="text-gray-500" />
//               <div>
//                 <span className="text-sm text-gray-600">Current Address</span>
//                 <span className="font-medium block">
//                   {tenant.currentAddress.street}, {tenant.currentAddress.city},{" "}
//                   {tenant.currentAddress.state} -{" "}
//                   {tenant.currentAddress.pincode}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Emergency Contact */}
//           {tenant.emergencyContact && (
//             <div className="flex items-center space-x-2">
//               <FaPhoneVolume size={20} className="text-gray-500" />
//               <div>
//                 <span className="text-sm text-gray-600">Emergency Contact</span>
//                 <span className="font-medium block">
//                   Name: {tenant.emergencyContact.name}
//                 </span>
//                 <span className="font-medium block">
//                   Relationship: {tenant.emergencyContact.relationship}
//                 </span>
//                 <span className="font-medium block">
//                   Mobile: {tenant.emergencyContact.mobile}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Documents (Passport Photo, Aadhaar Images, Signature) */}
//           {tenant.passportPhoto && (
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-600">Passport Photo</span>
//               <img
//                 src={tenant.passportPhoto}
//                 alt="Passport"
//                 className="w-32 h-32 object-cover rounded mx-auto"
//               />
//             </div>
//           )}

//           {tenant.aadhaarFront && tenant.aadhaarBack && (
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-600">Aadhaar Images</span>
//               <div className="flex space-x-4">
//                 <img
//                   src={tenant.aadhaarFront}
//                   alt="Aadhaar Front"
//                   className="w-32 h-32 object-cover rounded"
//                 />
//                 <img
//                   src={tenant.aadhaarBack}
//                   alt="Aadhaar Back"
//                   className="w-32 h-32 object-cover rounded"
//                 />
//               </div>
//             </div>
//           )}

//           {tenant.digitalSignature && (
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-600">Digital Signature</span>
//               <img
//                 src={tenant.digitalSignature}
//                 alt="Digital Signature"
//                 className="w-32 h-32 object-cover rounded mx-auto"
//               />
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

const TenantDetailsModal = ({ tenant = {}, setShowDetailsModal }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Handle undefined or null fields safely - use optional chaining
  const joinDate = tenant?.joinDate || tenant?.moveInDate;

  // Safety check for the entire component
  if (!tenant) {
    return (
      <div className="fixed inset-0 bg-gray-200 bg-opacity-75 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-6 relative">
          <div className="text-center">
            <h3 className="text-xl font-medium text-red-600">Error</h3>
            <p className="mt-2">No tenant data available.</p>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl p-8 relative overflow-auto max-h-[85vh]">
        {/* Close button */}
        <button
          onClick={() => setShowDetailsModal(false)}
          className="absolute right-5 top-5 text-gray-500 hover:text-red-600 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        {/* Modal header */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
          <h3 className="text-2xl font-bold text-blue-700">Tenant Details</h3>
        </div>

        {/* Modal content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tenant Name */}
          <div className="flex items-center space-x-3">
            <FaUser size={22} className="text-blue-600" />
            <div>
              <span className="text-sm text-gray-600">Tenant Name</span>
              <span className="font-medium block text-lg">
                {tenant.tenantName || "N/A"}
              </span>
            </div>
          </div>

          {/* Room Number */}
          <div className="flex items-center space-x-3">
            <FaDoorOpen size={22} className="text-blue-600" />
            <div>
              <span className="text-sm text-gray-600">Room Number</span>
              <span className="font-medium block text-lg">
                {tenant.roomNumber || "N/A"}
              </span>
            </div>
          </div>

          {/* Join Date */}
          <div className="flex items-center space-x-3">
            <FaCalendarAlt size={22} className="text-blue-600" />
            <div>
              <span className="text-sm text-gray-600">Join Date</span>
              <span className="font-medium block text-lg">
                {formatDate(joinDate)}
              </span>
            </div>
          </div>

          {/* Rent Amount */}
          <div className="flex items-center space-x-3">
            <FaMoneyBillWave size={22} className="text-blue-600" />
            <div>
              <span className="text-sm text-gray-600">Rent Amount</span>
              <span className="font-medium block text-lg">
                {tenant.rentAmount ? `₹${tenant.rentAmount}` : "N/A"}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center space-x-3">
            <FaPhone size={22} className="text-blue-600" />
            <div>
              <span className="text-sm text-gray-600">Contact</span>
              <span className="font-medium block text-lg">
                {tenant.contact || "N/A"}
              </span>
            </div>
          </div>

          {/* Email */}
          {tenant.email && (
            <div className="flex items-center space-x-3">
              <FaEnvelope size={22} className="text-blue-600" />
              <div>
                <span className="text-sm text-gray-600">Email</span>
                <span className="font-medium block text-lg">
                  {tenant.email}
                </span>
              </div>
            </div>
          )}

          {/* Aadhaar Number */}
          {tenant.aadharNumber && (
            <div className="flex items-center space-x-3">
              <FaIdCard size={22} className="text-blue-600" />
              <div>
                <span className="text-sm text-gray-600">Aadhaar Number</span>
                <span className="font-medium block text-lg">
                  {tenant.aadharNumber}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Address Information - Full width */}
        <div className="mt-6 space-y-4">
          {/* Permanent Address */}
          {tenant.permanentAddress && (
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt size={22} className="text-blue-600 mt-1" />
              <div>
                <span className="text-sm text-gray-600">Permanent Address</span>
                <span className="font-medium block text-lg">
                  {tenant.permanentAddress.street || ""},
                  {tenant.permanentAddress.city || ""},
                  {tenant.permanentAddress.state || ""}
                  {tenant.permanentAddress.pincode
                    ? `- ${tenant.permanentAddress.pincode}`
                    : ""}
                </span>
              </div>
            </div>
          )}

          {/* Current Address */}
          {tenant.isCurrentAddressSame === false && tenant.currentAddress && (
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt size={22} className="text-blue-600 mt-1" />
              <div>
                <span className="text-sm text-gray-600">Current Address</span>
                <span className="font-medium block text-lg">
                  {tenant.currentAddress.street || ""},
                  {tenant.currentAddress.city || ""},
                  {tenant.currentAddress.state || ""}
                  {tenant.currentAddress.pincode
                    ? `- ${tenant.currentAddress.pincode}`
                    : ""}
                </span>
              </div>
            </div>
          )}

          {/* Emergency Contact */}
          {tenant.emergencyContact && (
            <div className="flex items-start space-x-3">
              <FaPhoneVolume size={22} className="text-blue-600 mt-1" />
              <div>
                <span className="text-sm text-gray-600">Emergency Contact</span>
                <div className="font-medium text-lg">
                  <p>Name: {tenant.emergencyContact.name || "N/A"}</p>
                  <p>
                    Relationship:{" "}
                    {tenant.emergencyContact.relationship || "N/A"}
                  </p>
                  <p>Mobile: {tenant.emergencyContact.mobile || "N/A"}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Documents Section - Full width with flex layout */}
        {(tenant.passportPhoto ||
          tenant.aadhaarFront ||
          tenant.aadhaarBack ||
          tenant.digitalSignature) && (
          <div className="mt-8 border-t border-gray-300 pt-6">
            <h4 className="text-xl font-semibold text-blue-700 mb-4">
              Documents
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Passport Photo */}
              {tenant.passportPhoto && (
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-600 mb-2">
                    Passport Photo
                  </span>
                  <img
                    src={tenant.passportPhoto}
                    alt="Passport"
                    className="w-40 h-40 object-cover rounded shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.png";
                    }}
                  />
                </div>
              )}

              {/* Aadhaar Front */}
              {tenant.aadhaarFront && (
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-600 mb-2">
                    Aadhaar Front
                  </span>
                  <img
                    src={tenant.aadhaarFront}
                    alt="Aadhaar Front"
                    className="w-40 h-40 object-cover rounded shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.png";
                    }}
                  />
                </div>
              )}

              {/* Aadhaar Back */}
              {tenant.aadhaarBack && (
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-600 mb-2">
                    Aadhaar Back
                  </span>
                  <img
                    src={tenant.aadhaarBack}
                    alt="Aadhaar Back"
                    className="w-40 h-40 object-cover rounded shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.png";
                    }}
                  />
                </div>
              )}

              {/* Digital Signature */}
              {tenant.digitalSignature && (
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-600 mb-2">
                    Digital Signature
                  </span>
                  <img
                    src={tenant.digitalSignature}
                    alt="Digital Signature"
                    className="w-40 h-40 object-cover rounded shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.png";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal footer */}
        <div className="mt-8 text-right">
          <button
            onClick={() => setShowDetailsModal(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantDetailsModal;

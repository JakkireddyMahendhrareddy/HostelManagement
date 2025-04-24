import React, { useState, useEffect } from "react";

const TenantDetailsModal = ({ tenant, onClose }) => {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (tenant) {
      setFormData({ ...tenant });
    }
  }, [tenant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  if (!tenant) return null;

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-gray-100 bg-opacity-0 pt-10 pb-10">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            ✖
          </button>
          <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
            Tenant Details
          </h2>

          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Tenant" className="w-full h-full object-cover" />
              ) : tenant.image ? (
                <img src={tenant.image} alt="Tenant" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Photo</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name || ""} 
                onChange={handleChange} JAH
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
              <input 
                type="text" 
                name="contact" 
                value={formData.contact || ""} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Emergency Contact</label>
              <input 
                type="text" 
                name="emergencyContact" 
                value={formData.emergencyContact || ""} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">ID Proof</label>
              <input 
                type="text" 
                name="idProof" 
                value={formData.idProof || ""} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
              />
            </div>
          </div>

          {/* Room & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Room Number</label>
              <input 
                type="text" 
                name="roomNumber" 
                value={formData.roomNumber || ""} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Room Type</label>
              <select 
                name="roomType" 
                value={formData.roomType || ""} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Join Date</label>
              <input 
                type="date" 
                name="joinDate" 
                value={formData.joinDate || ""} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Rent Amount (₹)</label>
              <input 
                type="number" 
                name="rentAmount" 
                value={formData.rentAmount || ""} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
              />
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <select 
              name="status" 
              value={formData.status || ""} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("Updated Data:", formData);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDetailsModal;
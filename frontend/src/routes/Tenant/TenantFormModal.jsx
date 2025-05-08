import React, { useState } from "react";
import {
  FaTimes,
  FaUpload,
  FaIdCard,
  FaSignature,
  FaClipboardCheck,
} from "react-icons/fa";

const TenantFormModal = ({
  setShowTenantFormModal,
  newTenant,
  handleTenantChange,
  handleTenantSubmit,
  isEditing,
  rooms,
  resetForm,
}) => {
  const [showPermAddressFields, setShowPermAddressFields] = useState(true);
  const [addressesSame, setAddressesSame] = useState(false);

  const handleAddressSameChange = (e) => {
    setAddressesSame(e.target.checked);
    if (e.target.checked) {
      // Copy permanent address to current address
      const updatedTenant = {
        ...newTenant,
        currentStreetAddress: newTenant.permStreetAddress,
        currentCity: newTenant.permCity,
        currentState: newTenant.permState,
        currentPincode: newTenant.permPincode,
      };

      // Update all fields at once
      Object.keys(updatedTenant).forEach((key) => {
        if (key.startsWith("current")) {
          const event = {
            target: {
              name: key,
              value: updatedTenant[key],
            },
          };
          handleTenantChange(event);
        }
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleTenantChange({
          target: {
            name,
            value: event.target.result,
            type: "file",
          },
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="fixed inset-0 absolute  bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative my-8">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Edit Tenant" : "Add New Tenant"}
          </h3>
          <button
            onClick={() => {
              resetForm();
              setShowTenantFormModal(false);
            }}
            className="text-gray-900 hover:text-gray-700"
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
          className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto px-2"
        >
          {/* Personal Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="tenantName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="tenantName"
                  name="tenantName"
                  value={newTenant.tenantName || ""}
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={newTenant.dateOfBirth || ""}
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={newTenant.contact || ""}
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

              {/* Email */}
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

              {/* Aadhaar Number */}
              <div>
                <label
                  htmlFor="aadhaarNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  value={newTenant.aadhaarNumber || ""}
                  onChange={handleTenantChange}
                  required
                  pattern="[0-9]{12}"
                  title="Please enter a valid 12-digit Aadhaar number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  12-digit number will be masked for storage
                </p>
              </div>
            </div>

            {/* Document Uploads */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Passport Photo */}
              <div>
                <label
                  htmlFor="passportPhoto"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Passport-size Photo <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {newTenant.passportPhoto ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={newTenant.passportPhoto}
                          alt="Preview"
                          className="max-h-28 max-w-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                          <FaUpload className="text-white text-xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">Click to upload</p>
                      </div>
                    )}
                    <input
                      id="passportPhoto"
                      name="passportPhoto"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      required={!newTenant.passportPhoto}
                    />
                  </label>
                </div>
              </div>

              {/* Aadhaar Front */}
              <div>
                <label
                  htmlFor="aadhaarFront"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Aadhaar Card Front <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {newTenant.aadhaarFront ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={newTenant.aadhaarFront}
                          alt="Preview"
                          className="max-h-28 max-w-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                          <FaUpload className="text-white text-xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaIdCard className="text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">Click to upload</p>
                      </div>
                    )}
                    <input
                      id="aadhaarFront"
                      name="aadhaarFront"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      required={!newTenant.aadhaarFront}
                    />
                  </label>
                </div>
              </div>

              {/* Aadhaar Back */}
              <div>
                <label
                  htmlFor="aadhaarBack"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Aadhaar Card Back <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {newTenant.aadhaarBack ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={newTenant.aadhaarBack}
                          alt="Preview"
                          className="max-h-28 max-w-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                          <FaUpload className="text-white text-xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaIdCard className="text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">Click to upload</p>
                      </div>
                    )}
                    <input
                      id="aadhaarBack"
                      name="aadhaarBack"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      required={!newTenant.aadhaarBack}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="mt-4">
              <label
                htmlFor="signature"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Digital Signature <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {newTenant.signature ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={newTenant.signature}
                        alt="Signature"
                        className="max-h-28 max-w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                        <FaSignature className="text-white text-xl" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaSignature className="text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">
                        Upload signature image
                      </p>
                    </div>
                  )}
                  <input
                    id="signature"
                    name="signature"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    required={!newTenant.signature}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">
              Address Information
            </h4>

            {/* Permanent Address */}
            <div className="mb-4">
              <h5 className="text-md font-medium text-gray-700 mb-2">
                Permanent Address
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label
                    htmlFor="permStreetAddress"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="permStreetAddress"
                    name="permStreetAddress"
                    value={newTenant.permStreetAddress || ""}
                    onChange={handleTenantChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="permCity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="permCity"
                    name="permCity"
                    value={newTenant.permCity || ""}
                    onChange={handleTenantChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="permState"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="permState"
                    name="permState"
                    value={newTenant.permState || ""}
                    onChange={handleTenantChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="permPincode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="permPincode"
                    name="permPincode"
                    value={newTenant.permPincode || ""}
                    onChange={handleTenantChange}
                    required
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit pincode"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Same as Permanent Address Checkbox */}
            <div className="flex items-center mb-4">
              <input
                id="addressesSame"
                name="addressesSame"
                type="checkbox"
                checked={addressesSame}
                onChange={handleAddressSameChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label
                htmlFor="addressesSame"
                className="ml-2 block text-sm text-gray-700"
              >
                Current address same as permanent address
              </label>
            </div>

            {/* Current Address (if different) */}
            {!addressesSame && (
              <div>
                <h5 className="text-md font-medium text-gray-700 mb-2">
                  Current Address
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="currentStreetAddress"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="currentStreetAddress"
                      name="currentStreetAddress"
                      value={newTenant.currentStreetAddress || ""}
                      onChange={handleTenantChange}
                      required={!addressesSame}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="currentCity"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="currentCity"
                      name="currentCity"
                      value={newTenant.currentCity || ""}
                      onChange={handleTenantChange}
                      required={!addressesSame}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="currentState"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="currentState"
                      name="currentState"
                      value={newTenant.currentState || ""}
                      onChange={handleTenantChange}
                      required={!addressesSame}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="currentPincode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="currentPincode"
                      name="currentPincode"
                      value={newTenant.currentPincode || ""}
                      onChange={handleTenantChange}
                      required={!addressesSame}
                      pattern="[0-9]{6}"
                      title="Please enter a valid 6-digit pincode"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Emergency Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">
              Emergency Contact
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="emergencyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="emergencyName"
                  name="emergencyName"
                  value={newTenant.emergencyName || ""}
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="emergencyRelation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Relationship <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="emergencyRelation"
                  name="emergencyRelation"
                  value={newTenant.emergencyRelation || ""}
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="emergencyContact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={newTenant.emergencyContact || ""}
                  onChange={handleTenantChange}
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Accommodation Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">
              Accommodation Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  value={newTenant.roomNumber || ""}
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a room</option>
                  {rooms.map((room) => (
                    <option
                      key={room._id}
                      value={room.roomNumber}
                      disabled={
                        room.availableBeds <= 0 &&
                        newTenant.roomNumber !== room.roomNumber
                      }
                    >
                      Room {room.roomNumber} ({room.availableBeds} beds
                      available)
                    </option>
                  ))}
                  {isEditing && newTenant.roomNumber && (
                    <option value={newTenant.roomNumber}>
                      Current: Room {newTenant.roomNumber}
                    </option>
                  )}
                </select>
              </div>

              {/* Move-in Date */}
              <div>
                <label
                  htmlFor="joinDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Move-in Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="joinDate"
                  name="joinDate"
                  value={newTenant.joinDate || ""}
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Agreement Start Date */}
              <div>
                <label
                  htmlFor="agreementStartDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Agreement Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="agreementStartDate"
                  name="agreementStartDate"
                  value={newTenant.agreementStartDate || ""}
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Agreement End Date */}
              <div>
                <label
                  htmlFor="agreementEndDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Agreement End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="agreementEndDate"
                  name="agreementEndDate"
                  value={newTenant.agreementEndDate || ""}
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
                  value={newTenant.rentAmount || ""}
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Police Verification Consent */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">
              Legal Compliance
            </h4>

            <div className="flex items-center mb-2">
              <input
                id="policeVerificationConsent"
                name="policeVerificationConsent"
                type="checkbox"
                checked={newTenant.policeVerificationConsent || false}
                onChange={(e) =>
                  handleTenantChange({
                    target: {
                      name: "policeVerificationConsent",
                      value: e.target.checked,
                    },
                  })
                }
                required
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label
                htmlFor="policeVerificationConsent"
                className="ml-2 block text-sm text-gray-700"
              >
                I consent to police verification{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={newTenant.termsAccepted || false}
                onChange={(e) =>
                  handleTenantChange({
                    target: {
                      name: "termsAccepted",
                      value: e.target.checked,
                    },
                  })
                }
                required
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label
                htmlFor="termsAccepted"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the terms and conditions{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowTenantFormModal(false); // <-- Complete the function call
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TenantFormModal;

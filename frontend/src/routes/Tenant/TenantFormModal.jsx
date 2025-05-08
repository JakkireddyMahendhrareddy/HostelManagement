import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaUpload,
  FaIdCard,
  FaSignature,
  FaUser,
  FaHome,
  FaPhone,
  FaExclamationCircle,
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
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to copy permanent address to current address when checkbox changes
  useEffect(() => {
    if (addressesSame) {
      const updatedTenant = {
        ...newTenant,
        currentStreetAddress: newTenant.permStreetAddress || "",
        currentCity: newTenant.permCity || "",
        currentState: newTenant.permState || "",
        currentPincode: newTenant.permPincode || "",
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
  }, [
    addressesSame,
    newTenant.permStreetAddress,
    newTenant.permCity,
    newTenant.permState,
    newTenant.permPincode,
  ]);

  const handleAddressSameChange = (e) => {
    setAddressesSame(e.target.checked);
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

  const validateForm = () => {
    const errors = {};
    // Basic validation
    if (!newTenant.tenantName || newTenant.tenantName.trim() === "")
      errors.tenantName = "Name is required";

    if (!newTenant.dateOfBirth)
      errors.dateOfBirth = "Date of birth is required";

    if (!newTenant.contact || !/^[0-9]{10}$/.test(newTenant.contact))
      errors.contact = "Valid 10-digit mobile number is required";

    if (
      !newTenant.aadhaarNumber ||
      !/^[0-9]{12}$/.test(newTenant.aadhaarNumber)
    )
      errors.aadhaarNumber = "Valid 12-digit Aadhaar number is required";

    if (!newTenant.roomNumber)
      errors.roomNumber = "Room number must be selected";

    if (!newTenant.joinDate) errors.joinDate = "Move-in date is required";

    if (!newTenant.agreementStartDate)
      errors.agreementStartDate = "Agreement start date is required";

    if (!newTenant.rentAmount || newTenant.rentAmount <= 0)
      errors.rentAmount = "Valid rent amount is required";

    // Return true if no errors
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      try {
        handleTenantSubmit();
        // Reset form and close modal if successful
        resetForm();
        setShowTenantFormModal(false);
      } catch (error) {
        console.error("Error submitting tenant form:", error);
        setFormErrors({
          general: "There was an error saving the tenant. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Scroll to the first error
      const firstErrorField = document.querySelector(".error-field");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="fixed inset-0 absolute  bg-gray-100 bg-opacity-75 flex justify-center items-center z-75 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative my-8">
        <div className="flex justify-between items-center bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-5 rounded-t-xl">
          <h3 className="text-xl font-semibold">
            {isEditing ? "Edit Tenant" : "Add New Tenant"}
          </h3>
          <button
            onClick={() => {
              resetForm();
              setShowTenantFormModal(false);
            }}
            className="text-red hover:text-red-700 transition-colors"
            aria-label="Close"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* General error message */}
        {formErrors.general && (
          <div className="m-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center">
            <FaExclamationCircle className="mr-2" />
            {formErrors.general}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={submitForm}
          className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-6"
        >
          {/* Personal Information Section */}
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
            <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <FaUser className="mr-2" /> Personal Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className={formErrors.tenantName ? "error-field" : ""}>
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
                  className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                    formErrors.tenantName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {formErrors.tenantName && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.tenantName}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className={formErrors.dateOfBirth ? "error-field" : ""}>
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
                  className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                    formErrors.dateOfBirth
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {formErrors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div className={formErrors.contact ? "error-field" : ""}>
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
                  className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                    formErrors.contact
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {formErrors.contact ? (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.contact}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Format: 10 digits without spaces or dashes
                  </p>
                )}
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
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Aadhaar Number */}
              <div className={formErrors.aadhaarNumber ? "error-field" : ""}>
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
                  className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all ${
                    formErrors.aadhaarNumber
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {formErrors.aadhaarNumber ? (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.aadhaarNumber}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    12-digit number will be masked for storage
                  </p>
                )}
              </div>
            </div>

            {/* Document Uploads */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Passport Photo */}
              <div>
                <label
                  htmlFor="passportPhoto"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Passport-size Photo <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-200 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all">
                    {newTenant.passportPhoto ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={newTenant.passportPhoto}
                          alt="Preview"
                          className="max-h-28 max-w-full object-contain rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                          <FaUpload className="text-white text-xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="text-blue-400 mb-2" />
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
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-200 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all">
                    {newTenant.aadhaarFront ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={newTenant.aadhaarFront}
                          alt="Preview"
                          className="max-h-28 max-w-full object-contain rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                          <FaUpload className="text-white text-xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaIdCard className="text-blue-400 mb-2" />
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
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-200 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all">
                    {newTenant.aadhaarBack ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={newTenant.aadhaarBack}
                          alt="Preview"
                          className="max-h-28 max-w-full object-contain rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                          <FaUpload className="text-white text-xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaIdCard className="text-blue-400 mb-2" />
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
            <div className="mt-5">
              <label
                htmlFor="signature"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Digital Signature <span className="text-red-500">*</span>
              </label>
              <div
                htmlFor="signature"
                className="flex items-center justify-center w-full"
              >
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-200 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all">
                  {newTenant.digitalSignature ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={newTenant.digitalSignature}
                        alt="Signature"
                        className="max-h-28 max-w-full object-contain rounded"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                        <FaSignature className="text-white text-xl" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaSignature className="text-blue-400 mb-2" />
                      <p className="text-xs text-gray-500">
                        Upload signature image
                      </p>
                    </div>
                  )}
                  <input
                    id="signature"
                    name="digitalSignature"
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
          <div className="bg-green-50 p-5 rounded-xl border border-green-100 shadow-sm">
            <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <FaHome className="mr-2" /> Address Information
            </h4>
            {/* Permanent Address */}
            <div className="mb-5">
              <h5 className="text-md font-medium text-gray-700 mb-3 border-b border-green-200 pb-1">
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
                    name="permanentAddress.street"
                    value={newTenant.permanentAddress?.street || ""}
                    onChange={handleTenantChange}
                    required
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
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
                    name="permanentAddress.city"
                    value={newTenant.permanentAddress?.city || ""}
                    onChange={handleTenantChange}
                    required
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
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
                    name="permanentAddress.state"
                    value={newTenant.permanentAddress?.state || ""}
                    onChange={handleTenantChange}
                    required
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
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
                    name="permanentAddress.pincode"
                    value={newTenant.permanentAddress?.pincode || ""}
                    onChange={handleTenantChange}
                    required
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit pincode"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center mb-4 px-2 py-2 bg-green-100 rounded-lg">
              <input
                id="addressesSame"
                name="addressesSame"
                type="checkbox"
                checked={addressesSame}
                onChange={handleAddressSameChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
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
                <h5 className="text-md font-medium text-gray-700 mb-3 border-b border-green-200 pb-1">
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
                      name="currentAddress.street"
                      value={newTenant.currentAddress?.street || ""}
                      onChange={handleTenantChange}
                      required={!addressesSame}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
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
                      name="currentAddress.city"
                      value={newTenant.currentAddress?.city || ""}
                      onChange={handleTenantChange}
                      required={!addressesSame}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
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
                      name="currentAddress.state"
                      value={newTenant.currentAddress?.state || ""}
                      onChange={handleTenantChange}
                      required={!addressesSame}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
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
                      name="currentAddress.pincode"
                      value={newTenant.currentAddress?.pincode || ""}
                      onChange={handleTenantChange}
                      required={!addressesSame}
                      pattern="[0-9]{6}"
                      title="Please enter a valid 6-digit pincode"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Emergency Contact Information */}
          <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 shadow-sm">
            <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
              <FaPhone className="mr-2" /> Emergency Contact
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
                  name="emergencyContact.name"
                  value={newTenant.emergencyContact.name || ""}
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
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
                  name="emergencyContact.relationship"
                  value={newTenant.emergencyContact.relationship || ""}
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all"
                />
              </div>
              {/* <div>
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
                  pattern="value={newTenant.emergencyName || }"
                  onChange={handleTenantChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div> */}
              {/* <div>
                <label
                  htmlFor="emergencyContact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact.mobile"
                  value={newTenant.emergencyContact.mobile || ""}
                  onChange={handleTenantChange}
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div> */}

              {/* <div>
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
              </div> */}
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
                  name="emergencyContact.mobile"
                  value={newTenant.emergencyContact.mobile || ""}
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

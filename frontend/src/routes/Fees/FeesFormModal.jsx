import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { Tooltip as ReactTooltip } from "react-tooltip";

const FeesFormModal = ({
  setShowFormModal,
  newFee,
  handleFeeChange,
  handleSubmit,
  isEditing,
  resetForm,
  formErrors,
  isSubmitting,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal positioning */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-6 py-6 sm:p-8">
            <div className="relative border-b pb-4 mb-6">
              {/* Close Button */}
              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-0 right-0 mt-2 mr-2 sm:mt-3 sm:mr-3"
                data-tooltip-id="close-tooltip"
                data-tooltip-content="Close"
                disabled={isSubmitting}
              >
                <RxCrossCircled className="text-2xl text-red-600 cursor-pointer hover:text-red-900" />
              </button>

              {/* Title (Responsive Centered) */}
              <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-700 px-4">
                {isEditing ? "Edit Fee Record" : "Add New Fee Record"}
              </h2>

              {/* Tooltip */}
              <ReactTooltip
                id="close-tooltip"
                place="left"
                effect="solid"
                className="!bg-red-700 !text-white !text-sm !rounded-sm !px-3 !py-1 shadow-lg"
              />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={newFee.studentName}
                      onChange={handleFeeChange}
                      className={`w-full p-3 border rounded-lg ${
                        formErrors.studentName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Student's full name"
                      disabled={isSubmitting}
                      required
                    />
                    {formErrors.studentName && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.studentName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Room Number *
                    </label>
                    <input
                      type="text"
                      name="roomNo"
                      value={newFee.roomNo}
                      onChange={handleFeeChange}
                      className={`w-full p-3 border rounded-lg ${
                        formErrors.roomNo ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g. B-101"
                      disabled={isSubmitting}
                      required
                    />
                    {formErrors.roomNo && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.roomNo}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Fee Type *
                    </label>
                    <select
                      name="feeType"
                      value={newFee.feeType}
                      onChange={handleFeeChange}
                      className={`w-full p-3 border rounded-lg ${
                        formErrors.feeType
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                      required
                    >
                      <option value="">Select Fee Type</option>
                      <option value="Admission">Admission Fee</option>
                      <option value="Monthly Rent">Monthly Rent</option>
                      <option value="Security Deposit">Security Deposit</option>
                      <option value="Mess Fee">Mess Fee</option>
                      <option value="Late Fee">Late Fee</option>
                      <option value="Maintenance">Maintenance Fee</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.feeType && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.feeType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Amount *
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={newFee.amount}
                      onChange={handleFeeChange}
                      className={`w-full p-3 border rounded-lg ${
                        formErrors.amount ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Fee amount"
                      min="0"
                      disabled={isSubmitting}
                      required
                    />
                    {formErrors.amount && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.amount}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={newFee.status}
                      onChange={handleFeeChange}
                      className={`w-full p-3 border rounded-lg ${
                        formErrors.status ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Partially Paid">Partially Paid</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                      <option value="Waived">Waived</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                    {formErrors.status && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.status}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Amount Paid
                    </label>
                    <input
                      type="number"
                      name="amountPaid"
                      value={newFee.amountPaid}
                      onChange={handleFeeChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Amount already paid"
                      min="0"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Issue Date *
                    </label>
                    <input
                      type="date"
                      name="issueDate"
                      value={newFee.issueDate}
                      onChange={handleFeeChange}
                      className={`w-full p-3 border rounded-lg ${
                        formErrors.issueDate
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                      required
                    />
                    {formErrors.issueDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.issueDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={newFee.dueDate}
                      onChange={handleFeeChange}
                      className={`w-full p-3 border rounded-lg ${
                        formErrors.dueDate
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                      required
                    />
                    {formErrors.dueDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.dueDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Payment Date
                    </label>
                    <input
                      type="date"
                      name="paymentDate"
                      value={newFee.paymentDate}
                      onChange={handleFeeChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={newFee.paymentMethod}
                      onChange={handleFeeChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      disabled={isSubmitting}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="UPI">UPI</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={newFee.notes}
                    onChange={handleFeeChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows="2"
                    placeholder="Additional notes (optional)"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {formErrors.general && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{formErrors.general}</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end items-center gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto rounded-lg border border-gray-300 px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                  disabled={isSubmitting}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer disabled:bg-blue-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Saving..."
                    : isEditing
                    ? "Update Fee"
                    : "Submit Fee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesFormModal;

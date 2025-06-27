import React from "react";
import { format } from "date-fns";
import { X } from "lucide-react";

const FeesDetailsModal = ({ fee, setShowDetailsModal }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString || "N/A";
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get appropriate status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "partially paid":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "waived":
        return "bg-blue-100 text-blue-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal positioning */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-6 py-6 sm:p-8">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Fee Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Student Name</p>
                  <p className="text-lg font-semibold">
                    {fee.studentName || "N/A"}
                  </p>
                </div>
                <div className="flex gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Room Number</p>
                    <p className="text-lg font-semibold">
                      {fee.roomNo || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        fee.status
                      )}`}
                    >
                      {fee.status || "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fee Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Fee Type</p>
                  <p className="text-lg font-semibold">
                    {fee.feeType || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Amount</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(fee.amount)}
                  </p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Amount Paid</p>
                  <p className="font-medium">
                    {formatCurrency(fee.amountPaid || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="font-medium">
                    {formatCurrency((fee.amount || 0) - (fee.amountPaid || 0))}
                  </p>
                </div>
              </div>

              {/* Payment Method (only show if exists) */}
              {fee.paymentMethod && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{fee.paymentMethod}</p>
                  </div>
                </div>
              )}

              {/* Notes Section (only show if exists) */}
              {fee.notes && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Notes</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{fee.notes}</p>
                  </div>
                </div>
              )}

              {/* Dates Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Issue Date</p>
                  <p className="font-medium">{formatDate(fee.issueDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">{formatDate(fee.dueDate)}</p>
                </div>
                {fee.paymentDate && (
                  <div>
                    <p className="text-sm text-gray-500">Payment Date</p>
                    <p className="font-medium">{formatDate(fee.paymentDate)}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="rounded-lg px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesDetailsModal;

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FeesDetailsModal = ({ fee, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center z-50 p-5">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Payment Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Tenant Name:</span>
              <span>{fee.tenantName}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Room Number:</span>
              <span>{fee.roomNumber}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Join Date:</span>
              <span>{fee.joinDate}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Deposit Amount:</span>
              <span>₹{fee.depositAmount}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Rent Amount:</span>
              <span>₹{fee.rentAmount}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Paid Amount:</span>
              <span>₹{fee.paidAmount}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Last Paid Date:</span>
              <span>{fee.lastPaidDate}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Next Due Date:</span>
              <span>{fee.nextDueDate}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Payment Status:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  fee.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-800"
                    : fee.paymentStatus === "Due"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {fee.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Payment Mode:</span>
              <span>{fee.paymentMode || "N/A"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Balance:</span>
              <span
                className={`font-bold ${
                  fee.rentAmount - fee.paidAmount > 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                ₹{fee.rentAmount - fee.paidAmount}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FeesDetailsModal;

import React from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

const FeesTable = ({
  fees,
  isLoading,
  indexOfFirstFee = 0,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const statusColor = (status) => {
    return status === "Paid"
      ? "bg-green-100 text-green-800"
      : status === "Due"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sr.No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tenant Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Room Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Join Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deposit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rent
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Paid
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Paid
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Due
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mode
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan="12" className="px-6 py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : fees?.length === 0 ? (
            <tr>
              <td colSpan="12" className="px-6 py-4 text-center">
                No payment records found
              </td>
            </tr>
          ) : (
            fees?.map((fee, index) => (
              <tr 
                key={fee.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onViewDetails && onViewDetails(fee)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {indexOfFirstFee + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{fee.tenantName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {fee.roomNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {fee.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ₹{fee.depositAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ₹{fee.rentAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ₹{fee.paidAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {fee.lastPaidDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {fee.nextDueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(fee.paymentStatus)}`}
                  >
                    {fee.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {fee.paymentMode || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(fee);
                    }}
                    className="text-blue-500 hover:text-blue-700 mr-3 cursor-pointer"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(fee);
                    }}
                    className="text-gray-500 hover:text-gray-700 mr-3 cursor-pointer"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(fee.id);
                    }}
                    className="text-gray-500 hover:text-red-700 cursor-pointer"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeesTable;


import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const TenantTable = ({
  tenants,
  currentPage,
  totalPages,
  onPageChange,
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <div>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                SR.NO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                TENANT NAME
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ROOM NUMBER
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                JOIN DATE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                RENT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                CONTACT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tenants.map((tenant, index) => (
              <tr key={tenant._id}>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {(currentPage - 1) * 5 + index + 1}
                </td>
                <td className="px-6 py-4">{tenant.tenantName}</td>
                <td className="px-6 py-4">{tenant.roomNumber}</td>
                <td className="px-6 py-4">
                  {new Date(tenant.joinDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">₹{tenant.rentAmount}</td>
                <td className="px-6 py-4">{tenant.contact}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewClick(tenant)}
                      className="text-blue-600"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEditClick(tenant)}
                      className="text-green-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(tenant._id)}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantTable;

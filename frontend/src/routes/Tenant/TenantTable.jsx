import React from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

const TenantTable = ({
  tenants,
  isLoading,
  indexOfFirstTenant,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
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
              Rent Amount
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : tenants.length === 0 ? (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center">
                No tenants found
              </td>
            </tr>
          ) : (
            tenants.map((tenant, index) => (
              <tr 
                key={tenant.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onViewDetails(tenant)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {indexOfFirstTenant + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{tenant.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tenant.roomNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tenant.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ₹{tenant.rentAmount}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tenant.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tenant.status}
                  </span>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {tenant.contact || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(tenant);
                    }}
                    className="text-blue-500 hover:text-blue-700 mr-3 cursor-pointer"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(tenant);
                    }}
                    className="text-gray-500 hover:text-gray-700 mr-3 cursor-pointer"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(tenant.id);
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

export default TenantTable;
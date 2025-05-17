import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  FaAngleDoubleLeft,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleRight,
} from "react-icons/fa";

const PaginatedTenantTable = ({
  tenants,
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
  loading,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  return (
    <div className="w-full">
      {/* Tenants Table */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
      ) : tenants.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-800">
            No tenants found. Did they ghost us? 👻
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 shadow-lg ">
                <tr>
                  <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-16">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-40">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-32">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-24">
                    Room
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-28">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-24">
                    Rent
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-32">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {tenants.map((tenant, index) => (
                  <tr
                    key={tenant._id || index}
                    className="hover:bg-gray-100 group relative"
                  >
                    {/* Column 1: S.No */}
                    <td className="px-6 py-4 whitespace-nowrap text- text-gray-900 w-16">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    {/* Column 2: Tenant Name */}
                    <td className="px-6 py-4 whitespace-nowrap text- text-gray-900 w-40">
                      {tenant.tenantName}
                    </td>

                    {/* Column 3: Contact */}
                    <td className="px-6 py-4 whitespace-nowrap text- text-gray-900 w-32">
                      {tenant.contact}
                    </td>

                    {/* Column 4: Room Number */}
                    <td className="px-6 py-4 whitespace-nowrap text- text-gray-900 w-24">
                      {tenant.roomNumber}
                    </td>

                    {/* Column 5: Join Date */}
                    <td className="px-6 py-4 whitespace-nowrap text- text-gray-900 w-28">
                      {tenant.moveInDate
                        ? new Date(tenant.moveInDate).toLocaleDateString()
                        : tenant.joinDate
                        ? new Date(tenant.joinDate).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* Column 6: Rent Amount */}
                    <td className="px-6 py-4 whitespace-nowrap text- text-gray-900 w-24">
                      {tenant.rentAmount}
                    </td>

                    {/* Column 7: Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text- text-gray-900 w-32">
                      <div className="flex justify-start space-x-5">
                        <button
                          onClick={() => handleViewClick(tenant)}
                          className="text-gray-700 hover:text-gray-900 cursor-pointer"
                          title="View"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() => handleEditClick(tenant)}
                          className="text-gray-700 hover:text-gray-900 cursor-pointer"
                          title="Edit"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(tenant._id)}
                          className="text-gray-700 hover:text-gray-900 cursor-pointer"
                          title="Delete"
                        >
                          <AiFillDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-between items-center mt-6 text-">
            <div className="flex items-center mb-2 :mb-0">
              <span className="mr-2">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="border rounded p-1 cursor-pointer"
              >
                <option className="cursor-pointer" value={5}>
                  5
                </option>
                <option className="cursor-pointer" value={10}>
                  10
                </option>
                <option className="cursor-pointer" value={20}>
                  20
                </option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className={`p-2 border rounded ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaAngleDoubleLeft />
              </button>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 border rounded ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaChevronLeft />
              </button>
              <span>
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 border rounded ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaChevronRight />
              </button>
              <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`p-2 border rounded ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaAngleDoubleRight />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginatedTenantTable;

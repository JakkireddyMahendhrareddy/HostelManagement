import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, toastNoficationSettings } from "../../utils/utils";
import { toast } from "react-toastify";

const PaginatedTenantTable = ({
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
  searchTerm,
  filters,
}) => {
  // State for tenants data
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [pageNumber, setPageNumber] = useState(1);
  const [tenantPerPage, setTenantPerPage] = useState(10);
  const [totalTenants, setTotalTenants] = useState(0);

  // API URLs
  const getTenantUrl = `${backendUrl}/api/tenants/all`;

  // Calculate total pages
  const totalPages = Math.ceil(totalTenants / tenantPerPage);

  // Fetch tenants from API
  const fetchTenants = async () => {
    try {
      setLoading(true);

      // Create params object for query parameters
      const params = {
        page: pageNumber,
        limit: tenantPerPage,
        search: searchTerm || undefined,
      };

      // Add filters if they exist
      if (filters) {
        if (filters.roomNumber) params.roomNumber = filters.roomNumber;
        if (filters.joinDateFrom) params.joinDateFrom = filters.joinDateFrom;
        if (filters.joinDateTo) params.joinDateTo = filters.joinDateTo;
        if (filters.rentAmountMin) params.rentAmountMin = filters.rentAmountMin;
        if (filters.rentAmountMax) params.rentAmountMax = filters.rentAmountMax;
      }

      const response = await axios.get(getTenantUrl, {
        params,
        withCredentials: true,
      });

      // Check if response has data
      if (response.data) {
        // If your API returns pagination data like {tenants: [...], total: 100}
        if (response.data.tenants && response.data.total) {
          setTenants(response.data.tenants);
          setTotalTenants(response.data.total);
        } else {
          // If API just returns the array of tenants
          setTenants(response.data);
          setTotalTenants(response.data.length);
        }
      } else {
        setTenants([]);
        setTotalTenants(0);
      }
    } catch (error) {
      console.error("Error fetching tenants:", error);
      toast.error("Failed to fetch tenants", toastNoficationSettings);
      setTenants([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page, tenantPerPage, searchTerm or filters change
  useEffect(() => {
    fetchTenants();
  }, [pageNumber, tenantPerPage, searchTerm, filters]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  // Handle changing items per page
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setTenantPerPage(Number(newItemsPerPage));
    setPageNumber(1); // Reset to first page when changing items per page
  };

  // Determine which tenants array to use (handles both structure possibilities)
  const tenantsToDisplay = Array.isArray(tenants)
    ? tenants
    : tenants && tenants.tenants && Array.isArray(tenants.tenants)
    ? tenants.tenants
    : [];

  return (
    <div className="w-full">
      {/* Tenants Table */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
      ) : tenantsToDisplay.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-800 ">
            No tenants found. Did they ghost us? 👻
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                    S.NO
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                    Rent
                  </th>
                  <th className="px-6 py-3 text-left text-md font-bold text-gray-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tenantsToDisplay.map((tenant, index) => (
                  <tr
                    key={tenant._id || index}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleViewClick(tenant)} // Trigger eye icon action on row click
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {tenant.tenantName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {tenant.contact}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {tenant.roomNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {tenant.moveInDate
                          ? new Date(tenant.moveInDate).toLocaleDateString()
                          : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {tenant.rentAmount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleViewClick(tenant)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <span className="sr-only">View</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEditClick(tenant)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <span className="sr-only">Edit</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(tenant._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <span className="sr-only">Delete</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-between items-center mt-6 text-sm">
            <div className="flex items-center mb-2 sm:mb-0">
              <span className="mr-2">Items per page:</span>
              <select
                value={tenantPerPage}
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                className="border rounded p-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => handlePageChange(1)}
                disabled={pageNumber === 1}
                className={`px-2 py-1 rounded ${
                  pageNumber === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
              >
                «
              </button>
              <button
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber === 1}
                className={`px-2 py-1 rounded ${
                  pageNumber === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
              >
                ‹
              </button>

              <span>
                Page <span className="font-medium">{pageNumber}</span> of{" "}
                <span className="font-medium">{totalPages || 1}</span>
              </span>

              <button
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber === totalPages || totalPages === 0}
                className={`px-2 py-1 rounded ${
                  pageNumber === totalPages || totalPages === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
              >
                ›
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={pageNumber === totalPages || totalPages === 0}
                className={`px-2 py-1 rounded ${
                  pageNumber === totalPages || totalPages === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
              >
                »
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginatedTenantTable;

import React, { useState, useEffect } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { RiFilterLine } from "react-icons/ri";
import { backendUrl, toastNoficationSettings } from "../../utils/utils";
import { toast } from "react-toastify";
import ConfirmModal from "../ConfirmModal";
import TenantFormModal from "./TenantFormModal";
import TenantDetailsModal from "./TenantDetailsModal";

const TenantInfo = () => {
  // API URLs
  const getTenantUrl = `${backendUrl}/api/tenants/all`;
  const addTenantUrl = `${backendUrl}/api/tenants/add`;
  const editTenantUrl = `${backendUrl}/api/tenants/update/`;
  const deleteTenantUrl = `${backendUrl}/api/tenants/delete/`;
  const getRoomsUrl = `${backendUrl}/api/hostel/room/view`;

  //   router.post("/add", auth, addTenantInfo);
  //   router.get("/all", auth, getAllTenantsInfo);
  //   router.get("/room/:roomNumber", auth, getTenantsByRoom);
  //   router.get("/:tenantId", auth, getTenantInfoById);
  //   router.put("/update/:tenantId", auth, updateTenantInfo);
  //   router.delete("/delete/:tenantId", auth, deleteTenantInfo);

  // State variables
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTenantFormModal, setShowTenantFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [tenantIdToDelete, setTenantIdToDelete] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    roomNumber: "",
    joinDateFrom: "",
    joinDateTo: "",
    rentAmountMin: "",
    rentAmountMax: "",
  });

  // Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // New tenant form state
  const [newTenant, setNewTenant] = useState({
    tenantName: "",
    roomNumber: "",
    joinDate: "",
    rentAmount: "",
    contact: "",
  });

  // Fetch tenants from API
  const fetchTenants = async () => {
    try {
      setLoading(true);
      const response = await fetch(getTenantUrl, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setTenants(data);
        } else {
          setTenants([]);
        }
      } else {
        toast.error("Failed to fetch tenants", toastNoficationSettings);
      }
    } catch (error) {
      toast.error("Something went wrong", toastNoficationSettings);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available rooms for adding tenants
  const fetchRooms = async () => {
    try {
      const response = await fetch(getRoomsUrl, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          const availableRooms = data.filter((room) => room.availableBeds > 0);
          setRooms(availableRooms);
        } else {
          setRooms([]);
        }
      }
    } catch (error) {
      toast.error("Failed to fetch rooms", toastNoficationSettings);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchTenants();
    fetchRooms();
  }, []);

  // Handle form input changes
  const handleTenantChange = (e) => {
    const { name, value } = e.target;
    setNewTenant({ ...newTenant, [name]: value });
  };

  // Add or update tenant
  const handleTenantSubmit = async () => {
    try {
      const url = isEditing
        ? `${editTenantUrl}${selectedTenant._id}`
        : addTenantUrl;
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTenant),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, toastNoficationSettings);
        fetchTenants();
        fetchRooms();
        resetForm();
      } else {
        toast.error(data.message, toastNoficationSettings);
      }
    } catch (error) {
      toast.error("Something went wrong", toastNoficationSettings);
    }
  };

  // Delete tenant
  const deleteTenant = async () => {
    try {
      const response = await fetch(`${deleteTenantUrl}${tenantIdToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, toastNoficationSettings);
        fetchTenants();
        fetchRooms();
      } else {
        toast.error(data.message, toastNoficationSettings);
      }
    } catch (error) {
      toast.error("Something went wrong", toastNoficationSettings);
    } finally {
      setShowConfirmModal(false);
      setTenantIdToDelete(null);
    }
  };

  // Handle edit button click
  const handleEditClick = (tenant) => {
    setSelectedTenant(tenant);
    setNewTenant({
      tenantName: tenant.tenantName,
      roomNumber: tenant.roomNumber,
      joinDate: new Date(tenant.joinDate).toISOString().split("T")[0],
      rentAmount: tenant.rentAmount,
      contact: tenant.contact,
    });
    setIsEditing(true);
    setShowTenantFormModal(true);
  };

  // Handle delete button click
  const handleDeleteClick = (tenantId) => {
    setTenantIdToDelete(tenantId);
    setShowConfirmModal(true);
  };

  // Handle view details button click
  const handleViewClick = (tenant) => {
    setSelectedTenant(tenant);
    setShowDetailsModal(true);
  };

  // Reset form after submission or cancel
  const resetForm = () => {
    setNewTenant({
      tenantName: "",
      roomNumber: "",
      joinDate: "",
      rentAmount: "",
      contact: "",
    });
    setIsEditing(false);
    setShowTenantFormModal(false);
    setSelectedTenant(null);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      roomNumber: "",
      joinDateFrom: "",
      joinDateTo: "",
      rentAmountMin: "",
      rentAmountMax: "",
    });
    setSearchTerm("");
  };

  // Apply filters and search to tenants
  const filteredTenants = tenants.filter((tenant) => {
    // Search term filter
    const searchMatch =
      searchTerm === "" ||
      tenant.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.contact.includes(searchTerm) ||
      tenant.roomNumber.toString().includes(searchTerm);

    // Room number filter
    const roomMatch =
      filters.roomNumber === "" ||
      tenant.roomNumber.toString() === filters.roomNumber;

    // Join date range filter
    const joinDateMatch =
      (filters.joinDateFrom === "" ||
        new Date(tenant.joinDate) >= new Date(filters.joinDateFrom)) &&
      (filters.joinDateTo === "" ||
        new Date(tenant.joinDate) <= new Date(filters.joinDateTo));

    // Rent amount range filter
    const rentMatch =
      (filters.rentAmountMin === "" ||
        tenant.rentAmount >= parseInt(filters.rentAmountMin)) &&
      (filters.rentAmountMax === "" ||
        tenant.rentAmount <= parseInt(filters.rentAmountMax));

    return searchMatch && roomMatch && joinDateMatch && rentMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);
  const displayedTenants = filteredTenants.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  return (
    <div className="w-full pt-0 min-h-screen flex justify-center items-start relative">
      <div className="w-full pt-4 max-w-7xl px-4">
        <h1 className="text-2xl font-bold mb-6">Tenant List</h1>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 mt-4 space-y-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search tenant details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <svg
                  className="absolute right-3 top-3 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <RiFilterLine />
                  Filter
                </button>

                <button
                  onClick={() => {
                    setShowTenantFormModal(true);
                    setIsEditing(false);
                    resetForm();
                  }}
                  className="bg-blue-500 text-white py-2 px-4 flex items-center gap-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-200"
                >
                  <FaUserPlus className="text-white" />
                  Create New
                </button>
              </div>
            </div>

            {/* Filter Panel */}
            {filterOpen && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-medium mb-3">Filter Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Number
                    </label>
                    <input
                      type="text"
                      name="roomNumber"
                      value={filters.roomNumber}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Join Date From
                    </label>
                    <input
                      type="date"
                      name="joinDateFrom"
                      value={filters.joinDateFrom}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Join Date To
                    </label>
                    <input
                      type="date"
                      name="joinDateTo"
                      value={filters.joinDateTo}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Rent
                    </label>
                    <input
                      type="number"
                      name="rentAmountMin"
                      value={filters.rentAmountMin}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Rent
                    </label>
                    <input
                      type="number"
                      name="rentAmountMax"
                      value={filters.rentAmountMax}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}

            {/* Tenants Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      SR.NO
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      TENANT NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ROOM NUMBER
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      JOIN DATE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      RENT AMOUNT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CONTACT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedTenants.length > 0 ? (
                    displayedTenants.map((tenant, index) => (
                      <tr
                        key={tenant._id || index}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(pageNumber - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {tenant.tenantName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tenant.roomNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(tenant.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{tenant.rentAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tenant.contact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewClick(tenant)}
                              className="text-blue-600 hover:text-blue-900"
                              aria-label="View details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleEditClick(tenant)}
                              className="text-green-600 hover:text-green-900"
                              aria-label="Edit tenant"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(tenant._id)}
                              className="text-red-600 hover:text-red-900"
                              aria-label="Delete tenant"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No tenants found.{" "}
                        {tenants.length > 0
                          ? "Try adjusting your filters."
                          : "Add a new tenant to get started."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredTenants.length > 0 && (
              <div className="flex flex-wrap justify-between items-center mt-4 text-sm">
                <div className="flex items-center mb-2 sm:mb-0">
                  <span className="mr-2">Items per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setPageNumber(1);
                    }}
                    className="border rounded p-1"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() => setPageNumber(1)}
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
                    onClick={() => setPageNumber((prev) => prev - 1)}
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
                    onClick={() => setPageNumber((prev) => prev + 1)}
                    disabled={pageNumber === totalPages}
                    className={`px-2 py-1 rounded ${
                      pageNumber === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    ›
                  </button>
                  <button
                    onClick={() => setPageNumber(totalPages)}
                    disabled={pageNumber === totalPages}
                    className={`px-2 py-1 rounded ${
                      pageNumber === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tenant Form Modal */}
        {showTenantFormModal && (
          <TenantFormModal
            setShowTenantFormModal={setShowTenantFormModal}
            newTenant={newTenant}
            handleTenantChange={handleTenantChange}
            handleTenantSubmit={handleTenantSubmit}
            isEditing={isEditing}
            rooms={rooms}
            resetForm={resetForm}
          />
        )}

        {/* Tenant Details Modal */}
        {showDetailsModal && (
          <TenantDetailsModal
            tenant={selectedTenant}
            setShowDetailsModal={setShowDetailsModal}
          />
        )}

        {/* Confirm Delete Modal */}
        {showConfirmModal && (
          <ConfirmModal
            confirmType="tenant"
            confirmDelete={deleteTenant}
            setShowConfirmModal={setShowConfirmModal}
          />
        )}
      </div>
    </div>
  );
};

export default TenantInfo;

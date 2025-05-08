import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaBed,
  FaDollarSign,
  FaCheckCircle,
} from "react-icons/fa";
import { RiFilterLine } from "react-icons/ri";

import { backendUrl, toastNoficationSettings } from "../../utils/utils";
import { toast } from "react-toastify";
import ConfirmModal from "../ConfirmModal";
import TenantFormModal from "./TenantFormModal";
import TenantDetailsModal from "./TenantDetailsModal";
import PaginatedTenantTable from "./PaginatedTenantTable"; // Import the new component
import FilterComponent from "./FilterComponent";

const TenantInfo = () => {
  // API URLs
  const getHostelUrl = `${backendUrl}/api/hostel/view`;
  const addTenantUrl = `${backendUrl}/api/tenants/add`;
  const editTenantUrl = `${backendUrl}/api/tenants/update/`;
  const deleteTenantUrl = `${backendUrl}/api/tenants/delete/`;
  const getRoomsUrl = `${backendUrl}/api/rooms/available`; // Added missing URL

  // State variables
  const [rooms, setRooms] = useState([]);
  const [hostel, setHostel] = useState({});
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

  // New tenant form state
  const [newTenant, setNewTenant] = useState({
    tenantName: "",
    roomNumber: "",
    joinDate: "",
    rentAmount: "",
    contact: "",
  });

  const fetchHostel = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getHostelUrl, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        if (data) {
          setHostel(data);
          fetchRooms();
        } else {
          setHostel(null);
        }
      }
    } catch (error) {
      toast.warning("Something Went Wrong", toastNoficationSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostel();
  }, []);

  // Fetch available rooms for adding tenants
  const fetchRooms = async () => {
    try {
      const response = await axios.get(getRoomsUrl, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data;
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
    setShowTenantFormModal(true);
    setSelectedTenant(null);
  };

  // Handle form input changes
  const handleTenantChange = (e) => {
    const { name, value } = e.target;
    setNewTenant({ ...newTenant, [name]: value });
  };

  // Validate tenant data
  const validateTenantData = (tenantData) => {
    if (
      !tenantData.tenantName ||
      !tenantData.roomNumber ||
      !tenantData.joinDate ||
      !tenantData.rentAmount ||
      !tenantData.contact
    ) {
      toast.error("All fields are required", toastNoficationSettings);
      return false;
    }
    return true;
  };

  // Add or update tenant
  const handleTenantSubmit = async () => {
    try {
      if (!validateTenantData(newTenant)) return;

      const url = isEditing
        ? `${editTenantUrl}${selectedTenant._id}`
        : addTenantUrl;
      const method = isEditing ? "PATCH" : "POST";

      const response = await axios({
        method,
        url,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: newTenant,
      });

      const data = response.data;

      if (response.status === 200 || response.status === 201) {
        toast.success(data.message, toastNoficationSettings);
        fetchRooms();
        resetForm();
        // Refresh tenant table through state changes
        setSearchTerm(searchTerm); // This will trigger a re-fetch in the PaginatedTenantTable
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
      const response = await axios.delete(
        `${deleteTenantUrl}${tenantIdToDelete}`,
        {
          withCredentials: true,
        }
      );

      const data = response.data;

      if (response.status === 200) {
        toast.success(data.message, toastNoficationSettings);
        fetchRooms();
        // Refresh tenant table through state changes
        setSearchTerm(searchTerm); // This will trigger a re-fetch in the PaginatedTenantTable
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

  // Handle filter change
  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      roomNumber: "",
      joinDateFrom: "",
      joinDateTo: "",
      rentAmountMin: "",
      rentAmountMax: "",
    });
  };

  const NoHostelMessage = () => (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-red-700 font-bold text-2xl mb-10 max-w-xl">
        You haven't listed any hostel yet!
      </h2>
      <p className="text-gray-600 text-lg mb-8 max-w-xl">
        Start managing your hostel digitally – add your property and control
        every detail with ease.
      </p>

      <button
        onClick={() => setShowAddHostelFormModal(true)}
        className="bg-radial from-blue-400 via-blue-500 to-blue-600 text-white px-6 py-3 rounded-full cursor-pointer hover:scale-105 transition duration-300"
      >
        List Your Hostel
      </button>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-700">
        <div className="flex flex-col items-center">
          <FaBed size={40} className="w-12 mb-4 text-blue-500" />
          <p>Room & Bed Management</p>
        </div>
        <div className="flex flex-col items-center">
          <FaDollarSign size={40} className="w-12 mb-4 text-blue-500" />
          <p>Update Rent Anytime</p>
        </div>
        <div className="flex flex-col items-center">
          <FaCheckCircle size={40} className="w-12 mb-4 text-blue-500" />
          <p>Track Availability</p>
        </div>
        <div className="flex flex-col items-center">
          <FaEdit size={40} className="w-12 mb-4 text-blue-500" />
          <p>Edit Hostel Info</p>
        </div>
      </div>
    </div>
  );

  // For debugging API issues
  useEffect(() => {
    // Add a dummy tenant list if hostel exists but we're having API issues
    // This is just for development/debugging purposes
    const addDummyData = () => {
      if (hostel && !loading) {
        console.log("Adding dummy tenant data for testing");
        window.dummyTenants = [
          {
            _id: "1",
            tenantName: "John Doe",
            roomNumber: "101",
            joinDate: "2023-01-15",
            rentAmount: "500",
            contact: "123-456-7890",
          },
          {
            _id: "2",
            tenantName: "Jane Smith",
            roomNumber: "102",
            joinDate: "2023-02-20",
            rentAmount: "550",
            contact: "987-654-3210",
          },
        ];
      }
    };

    addDummyData();
  }, [hostel, loading]);

  return (
    <div className="w-full pt-0 min-h-screen flex justify-center items-start relative">
      <div className="w-full pt-4 max-w-7xl px-4">
        {loading ? (
          // Loading spinner
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : !hostel ? (
          // No hostel message
          <NoHostelMessage />
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6">Tenant Management</h1>

            {/* Main content area */}
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
                    {filterOpen ? "Hide Filters" : "Show Filters"}
                    <RiFilterLine />
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

              {/* Tenants Table with Pagination */}
              <PaginatedTenantTable
                handleViewClick={handleViewClick}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                searchTerm={searchTerm}
                filters={filters}
              />
            </div>
          </div>
        )}

        {/* Tenant Filters process */}
        <FilterComponent
          filterOpen={filterOpen}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

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

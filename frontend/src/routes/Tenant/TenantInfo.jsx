import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserPlus,
  
  FaSearch,
} from "react-icons/fa";
import { RiFilterLine } from "react-icons/ri";

import { backendUrl, toastNoficationSettings } from "../../utils/utils";
import { toast } from "react-toastify";
import ConfirmModal from "../ConfirmModal";
import TenantFormModal from "./TenantFormModal";
import TenantDetailsModal from "./TenantDetailsModal";
import PaginatedTenantTable from "./PaginatedTenantTable";
import FilterComponent from "./FilterComponent";
import NoHostelMessage from "../NoHostelMessage";

const TenantInfo = () => {
  // API URLs
  const getHostelUrl = `${backendUrl}/api/hostel/view`;
  const addTenantUrl = `${backendUrl}/api/tenants/add`;
  const editTenantUrl = `${backendUrl}/api/tenants/update/`;
  const deleteTenantUrl = `${backendUrl}/api/tenants/delete/`;
  const getRoomsUrl = `${backendUrl}/api/hostel/room/get`;
  const searchTenantUrl = `${backendUrl}/api/tenants/search`;

  // State variables

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showAddHostelFormModal, setShowAddHostelFormModal] = useState(false);

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
  
  const [tableRefreshTrigger, setTableRefreshTrigger] = useState(0);

  const [filters, setFilters] = useState({
    roomNumber: "",
    joinDateFrom: "",
    joinDateTo: "",
    rentAmountMin: "",
    rentAmountMax: "",
  });
  const [tenants, setTenants] = useState([]);

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
      const response = await fetch(getHostelUrl, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
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

  const handleSearch = () => {
    setTableRefreshTrigger((prev) => prev + 1);
  };

  // Fetch available rooms for adding tenants
  const fetchRooms = async () => {
    try {
      const response = await axios.get(getRoomsUrl, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data;
        if (data) {
          // If editing a tenant, include their current room in available rooms
          if (isEditing && selectedTenant) {
            // Filter out rooms except the one that belongs to this tenant
            const availableRooms = data.filter(
              (room) =>
                room.availableBeds > 0 ||
                room.roomNumber === selectedTenant.roomNumber
            );
            setRooms(availableRooms);
          } else {
            const availableRooms = data.filter(
              (room) => room.availableBeds > 0
            );
            setRooms(availableRooms);
          }
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
      email: "",
      aadhaarNumber: "",
      isCurrentAddressSame: false,
      policeVerificationConsent: false,
      termsAgreement: false,
      permanentAddress: {
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
      currentAddress: {
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
      emergencyContact: {
        name: "",
        relationship: "",
        mobile: "",
      },
      passportPhoto: "",
      aadhaarFront: "",
      aadhaarBack: "",
      digitalSignature: "",
      dateOfBirth: "",
    });
    setIsEditing(false);
    setSelectedTenant(null);
  };

  // Handle form input changes
  const handleTenantChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested objects (addresses, emergency contact)
    if (name.includes(".")) {
      const [objectName, field] = name.split(".");
      setNewTenant((prev) => ({
        ...prev,
        [objectName]: {
          ...prev[objectName],
          [field]: value,
        },
      }));
    } else {
      // Handle checkbox inputs
      if (type === "checkbox") {
        setNewTenant((prev) => ({ ...prev, [name]: checked }));
      } else {
        setNewTenant((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  // Validate tenant data
  const validateTenantData = (tenantData) => {
    // Basic fields validation
    if (
      !tenantData.tenantName ||
      !tenantData.roomNumber ||               
      !tenantData.joinDate ||
      !tenantData.rentAmount ||
      !tenantData.contact
    ) {
      toast.error("Required fields are missing", toastNoficationSettings);
      return false;
    }

    // Contact validation - allow formats: XXX-XXX-XXXX or XXXXXXXXXX
    if (
      tenantData.contact &&
      !/^\d{3}[-]?\d{3}[-]?\d{4}$/.test(tenantData.contact)
    ) {
      toast.error(
        "Contact should be in format XXX-XXX-XXXX",
        toastNoficationSettings
      );
      return false;
    }

    // Email validation if provided
    if (
      tenantData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tenantData.email)
    ) {
      toast.error(
        "Please enter a valid email address",
        toastNoficationSettings
      );
      return false;
    }

    return true;
  };

  // Add or update tenant
  const handleTenantSubmit = async () => {
    console.log(newTenant);
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

        // Update local tenant data to avoid full refresh
        if (isEditing) {
          // Update the tenant in the state directly
          setTenants((prevTenants) =>
            prevTenants.map((tenant) =>
              tenant._id === selectedTenant._id
                ? { ...tenant, ...newTenant }
                : tenant
            )
          );
        }

        fetchRooms();
        setShowTenantFormModal(false); // Close modal after successful submission
        resetForm();

        // Trigger table refresh to show updated/new data
        setTableRefreshTrigger((prev) => prev + 1);
      } else {
        toast.error(data.message, toastNoficationSettings);
      }
    } catch (error) {
      console.error("Error submitting tenant data:", error);
      toast.error("Something went wrong", toastNoficationSettings);
    }
  };

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

        // Update the state to remove the deleted tenant
        setTenants((prevTenants) =>
          prevTenants.filter((tenant) => tenant._id !== tenantIdToDelete)
        );

        fetchRooms(); // Refresh rooms data as a tenant has been removed

        // Trigger table refresh
        setTableRefreshTrigger((prev) => prev + 1);
      } else {
        toast.error(data.message, toastNoficationSettings);
      }
    } catch (error) {
      console.error("Error deleting tenant:", error);
      toast.error("Something went wrong", toastNoficationSettings);
    } finally {
      setShowConfirmModal(false);
      setTenantIdToDelete(null);
    }
  };

  // Handle edit button click
  // const handleEditClick = (tenant) => {
  //   setSelectedTenant(tenant);
  //   console.log(tenant,"000000000000000000000000000")

  //   // Initialize newTenant with proper fallbacks
  //   setNewTenant({
  //     tenantName: tenant.tenantName || "",
  //     roomNumber: tenant.roomNumber || "",
  //     joinDate: tenant.joinDate
  //       ? new Date(tenant.joinDate).toISOString().split("T")[0]
  //       : "",
  //     agreementStartDate: tenant.agreementStartDate
  //       ? new Date(tenant.agreementStartDate).toISOString().split("T")[0]
  //       : "",
  //     moveInDate: tenant.moveInDate
  //       ? new Date(tenant.moveInDate).toISOString().split("T")[0]
  //       : "",
  //     rentAmount: tenant.rentAmount?.toString() || "",
  //     contact: tenant.contact || "",
  //     email: tenant.email || "",
  //     aadhaarNumber: tenant.aadhaarNumber || "",
  //     isCurrentAddressSame: tenant.isCurrentAddressSame ?? false,
  //     policeVerificationConsent: tenant.policeVerificationConsent ?? false,
  //     termsAgreement: tenant.termsAgreement ?? false,

  //     // Address handling with nested object fallbacks
  //     permanentAddress: {
  //       street: tenant.permanentAddress?.street || "",
  //       city: tenant.permanentAddress?.city || "",
  //       state: tenant.permanentAddress?.state || "",
  //       pincode: tenant.permanentAddress?.pincode || "",
  //     },

  //     currentAddress: {
  //       street: tenant.currentAddress?.street || "",
  //       city: tenant.currentAddress?.city || "",
  //       state: tenant.currentAddress?.state || "",
  //       pincode: tenant.currentAddress?.pincode || "",
  //     },

  //     emergencyContact: {
  //       name: tenant.emergencyContact?.name || "",
  //       relationship: tenant.emergencyContact?.relationship || "",
  //       mobile: tenant.emergencyContact?.mobile || "",
  //     },

  //     // Document URLs
  //     passportPhoto: tenant.passportPhoto || "",
  //     aadhaarFront: tenant.aadhaarFront || "",
  //     aadhaarBack: tenant.aadhaarBack || "",
  //     digitalSignature: tenant.digitalSignature || "",

  //     // Additional fields
  //     dateOfBirth: tenant.dateOfBirth
  //       ? new Date(tenant.dateOfBirth).toISOString().split("T")[0]
  //       : "",
  //   });

  //   setIsEditing(true);
  //   setShowTenantFormModal(true);

  //   // Refresh rooms data with error handling
  //   fetchRooms().catch((error) =>
  //     console.error("Error fetching rooms:", error)
  //   );
  // };

  const handleEditClick = (tenant) => {
    setSelectedTenant(tenant);
    console.log(tenant, "000000000000000000000000000");
    
    // Initialize newTenant with proper fallbacks
    setNewTenant({
      tenantName: tenant.tenantName || "",
      // Ensure roomNumber is properly converted to string
      roomNumber: tenant.roomNumber ? tenant.roomNumber.toString() : "",
      joinDate: tenant.joinDate
        ? new Date(tenant.joinDate).toISOString().split("T")[0]
        : "",
      agreementStartDate: tenant.agreementStartDate
        ? new Date(tenant.agreementStartDate).toISOString().split("T")[0]
        : "",
      // Fix moveInDate formatting - ensure it's correctly parsed even if it's in a different format
      moveInDate: tenant.moveInDate
        ? (tenant.moveInDate instanceof Date)
          ? tenant.moveInDate.toISOString().split("T")[0]
          : new Date(tenant.moveInDate).toISOString().split("T")[0]
        : "",
      rentAmount: tenant.rentAmount?.toString() || "",
      contact: tenant.contact || "",
      email: tenant.email || "",
      aadhaarNumber: tenant.aadhaarNumber || "",
      // Fix boolean fields to ensure they're properly handled
      isCurrentAddressSame: Boolean(tenant.isCurrentAddressSame),
      policeVerificationConsent: Boolean(tenant.policeVerificationConsent),
      termsAgreement: Boolean(tenant.termsAgreement),
      
      // Address handling with nested object fallbacks
      permanentAddress: {
        street: tenant.permanentAddress?.street || "",
        city: tenant.permanentAddress?.city || "",
        state: tenant.permanentAddress?.state || "",
        pincode: tenant.permanentAddress?.pincode || "",
      },
      
      currentAddress: {
        street: tenant.currentAddress?.street || "",
        city: tenant.currentAddress?.city || "",
        state: tenant.currentAddress?.state || "",
        pincode: tenant.currentAddress?.pincode || "",
      },
      
      emergencyContact: {
        name: tenant.emergencyContact?.name || "",
        relationship: tenant.emergencyContact?.relationship || "",
        mobile: tenant.emergencyContact?.mobile || "",
      },
      
      // Document URLs
      passportPhoto: tenant.passportPhoto || "",
      aadhaarFront: tenant.aadhaarFront || "",
      aadhaarBack: tenant.aadhaarBack || "",
      digitalSignature: tenant.digitalSignature || "",
      
      // Additional fields
      dateOfBirth: tenant.dateOfBirth
        ? new Date(tenant.dateOfBirth).toISOString().split("T")[0]
        : "",
    });
    
    setIsEditing(true);
    setShowTenantFormModal(true);
    
    // Refresh rooms data with error handling
    fetchRooms().catch((error) =>
      console.error("Error fetching rooms:", error)
    );
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
    // Trigger table refresh with new filters
    setTableRefreshTrigger((prev) => prev + 1);
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
    // Trigger table refresh with reset filters
    setTableRefreshTrigger((prev) => prev + 1);
  };

  

  return (
    <div className="w-full pt-0 min-h-screen flex justify-center items-start relative">
      <div className="w-full pt-4 max-w-7xl px-4">
        {loading ? (
          // Loading spinner
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : !hostel || Object.keys(hostel).length === 0 ? (
          // No hostel message
          <NoHostelMessage/>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6">Tenant Management</h1>

            {/* Main content area */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 mt-4 space-y-4">
              {/* Search and Filter Bar */}
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="relative  max-w-md flex">
                  <input
                    type="text"
                    placeholder="Search tenant details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-black border-blue-00 p-3 pr-10 border rounded-l-lg focus:outline-none shadow-md z-50 "
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white py-2 px-4 rounded-r-lg hover:bg-blue-600  shadow-md z-50 duration-200 cursor-pointer"
                  >
                    <FaSearch />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    //  flex items-center gap-2 px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer shadow-md z-50
                    className="flex items-center shadow-md z-50 gap-2 px-4 py-2 w-50% border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    aria-expanded={filterOpen}
                    aria-controls="filter-panel"
                  >
                    {filterOpen ? "Hide Filters" : "Show Filters"}
                    <RiFilterLine />
                  </button>
                  <button
                    onClick={() => {
                      resetForm();
                      setShowTenantFormModal(true);
                    }}
                    className="bg-blue-500 text-white shadow-md z-50 py-2 px-4 flex items-center gap-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-200 cursor-pointer"
                  >
                    <FaUserPlus className="text-white" />
                    Create New
                  </button>
                </div>
              </div>

              {/* Filter panel */}
              <FilterComponent
                filterOpen={filterOpen}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                filters={filters}
              />

              {/* Tenants Table with Pagination */}
              <PaginatedTenantTable
                handleViewClick={handleViewClick}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                searchTerm={searchTerm}
                filters={filters}
                setTenants={setTenants}
                refreshTrigger={tableRefreshTrigger}
              />
            </div>
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



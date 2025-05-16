import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import { RiFilterLine } from "react-icons/ri";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import ConfirmModal from "../ConfirmModal";
import TenantFormModal from "./TenantFormModal";
import TenantDetailsModal from "./TenantDetailsModal";
import PaginatedTenantTable from "./PaginatedTenantTable";
import FilterComponent from "./FilterComponent";
import NoHostelMessage from "../NoHostelMessage";
import { backendUrl, toastNoficationSettings } from "../../utils/utils";

const TenantInfo = () => {
  // API URLs
  const getHostelUrl = `${backendUrl}/api/hostel/view`;
  const addTenantUrl = `${backendUrl}/api/tenants/add`;
  const editTenantUrl = `${backendUrl}/api/tenants/update/`;
  const deleteTenantUrl = `${backendUrl}/api/tenants/delete/`;
  const getRoomsUrl = `${backendUrl}/api/hostel/room/get`;
  const getTenantUrl = `${backendUrl}/api/tenants/all`;

  // State variables
  const [filters, setFilters] = useState({
    roomNumber: "",
    joinDateFrom: "",
    joinDateTo: "",
    rentAmountMin: "",
    rentAmountMax: "",
  });

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

  // Pagination states
  const [pageNumber, setPageNumber] = useState(1);
  const [tenantPerPage, setTenantPerPage] = useState(10);
  const [totalTenants, setTotalTenants] = useState(0);

  const [tenants, setTenants] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);

  // New tenant form state
  const [newTenant, setNewTenant] = useState({
    tenantName: "",
    roomNumber: "",
    joinDate: "",
    rentAmount: "",
    contact: "",
  });

  // Fetch tenants based on search term, filters, and pagination
  const fetchTenants = async () => {
    try {
      setLoading(true);
      setIsError(false);
      setIsSearching(true);

      // Create params object for query parameters
      const params = {
        page: pageNumber,
        limit: tenantPerPage,
      };

      // Only add search term if it's not empty
      if (searchTerm && searchTerm.trim() !== "") {
        params.search = searchTerm.trim();
      }

      // Add filters if they exist and have values
      if (filters.roomNumber) params.roomNumber = filters.roomNumber;
      if (filters.joinDateFrom) params.joinDateFrom = filters.joinDateFrom;
      if (filters.joinDateTo) params.joinDateTo = filters.joinDateTo;
      if (filters.rentAmountMin) params.rentAmountMin = filters.rentAmountMin;
      if (filters.rentAmountMax) params.rentAmountMax = filters.rentAmountMax;

      console.log("Fetching tenants with params:", params);

      const response = await axios.get(getTenantUrl, {
        params,
        withCredentials: true,
      });

      if (response.data) {
        // If API returns pagination data like {tenants: [...], total: 100}
        if (response.data.tenants && response.data.total !== undefined) {
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
      setIsError(true);
      toast.error("Failed to fetch tenants", toastNoficationSettings);
      setTenants([]);
      setTotalTenants(0);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    setIsSearching(true);
    setPageNumber(1); // Reset to first page when searching
    fetchTenants(); // This will use the current searchTerm
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

  const handleTenantSubmit = async () => {
    try {
      if (!validateTenantData(newTenant)) return;

      const url = isEditing
        ? `${editTenantUrl}${selectedTenant._id}`
        : addTenantUrl;

      const method = isEditing ? "PUT" : "POST";

      console.log("Sending request to:", url, "with method:", method);

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

        // Close modal after successful submission
        setShowTenantFormModal(false);
        resetForm();

        // Fetch updated data
        await fetchRooms();
        // Trigger a refresh by updating the refresh trigger
        setTableRefreshTrigger((prev) => prev + 1);
      } else {
        toast.error(data.message, toastNoficationSettings);
      }
    } catch (error) {
      console.error("Error submitting tenant data:", error);

      // Extract the specific error message if available
      let errorMessage = "Something went wrong";
      if (error.response && error.response.data) {
        if (
          typeof error.response.data === "string" &&
          error.response.data.includes("<!DOCTYPE html>")
        ) {
          // Handle HTML error responses
          errorMessage =
            "Server doesn't support this request method. Try another approach.";
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }

      toast.error(errorMessage, toastNoficationSettings);
    }
  };

  const deleteTenant = async () => {
    try {
      const idToDelete = tenantIdToDelete;

      const response = await axios.delete(`${deleteTenantUrl}${idToDelete}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(response.data.message, toastNoficationSettings);

        // Refresh the table with current filters
        setTableRefreshTrigger((prev) => prev + 1);
      } else {
        toast.error(response.data.message, toastNoficationSettings);
      }
    } catch (error) {
      console.error("Error deleting tenant:", error);
      toast.error("Something went wrong", toastNoficationSettings);
    } finally {
      setShowConfirmModal(false);
      setTenantIdToDelete(null);
    }
  };

  // Fetching hostel details
  const fetchHostel = async () => {
    try {
      setLoading(true);
      const response = await fetch(getHostelUrl, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setHostel(data);
          await fetchRooms();
          await fetchTenants(); // Fetch tenants after hostel data is loaded
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

  // Initial data loading
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

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setPageNumber(1); // Reset to first page when filters change
    // Add a small delay to ensure state is updated
    setTimeout(() => {
      fetchTenants(); // Fetch with new filters
    }, 10);
  };

  // Reset filters
  const handleResetFilters = () => {
    // Reset all filters first
    setFilters({
      roomNumber: "",
      joinDateFrom: "",
      joinDateTo: "",
      rentAmountMin: "",
      rentAmountMax: "",
    });

    // Reset search term too
    setSearchTerm("");

    // Reset pagination
    setPageNumber(1);

    // Set a small delay to ensure state is updated before fetching
    setTimeout(() => {
      fetchTenants(); // Fetch without filters
    }, 10);
  };

  const handleEditClick = (tenant) => {
    console.log("Original tenant data:", tenant); // Log the original data
    setSelectedTenant(tenant);

    // Helper function to format date properly
    const formatDate = (dateValue) => {
      if (!dateValue) return "";

      try {
        // Handle different date formats and ensure it's converted to YYYY-MM-DD
        const date = new Date(dateValue);

        // Check if date is valid
        if (isNaN(date.getTime())) {
          console.error("Invalid date:", dateValue);
          return "";
        }

        // Format as YYYY-MM-DD
        return date.toISOString().split("T")[0];
      } catch (error) {
        console.error("Error formatting date:", dateValue, error);
        return "";
      }
    };

    // Log the moveInDate specifically to debug
    console.log("Original moveInDate:", tenant.moveInDate);
    const formattedMoveInDate = formatDate(tenant.moveInDate);
    console.log("Formatted moveInDate:", formattedMoveInDate);

    // Initialize newTenant with proper fallbacks
    setNewTenant({
      tenantName: tenant.tenantName || "",
      roomNumber: tenant.roomNumber ? tenant.roomNumber.toString() : "",
      joinDate: formatDate(tenant.joinDate),
      agreementStartDate: formatDate(tenant.agreementStartDate),
      moveInDate: formattedMoveInDate, // Use the variable we logged
      rentAmount: tenant.rentAmount?.toString() || "",
      contact: tenant.contact || "",
      email: tenant.email || "",
      aadhaarNumber: tenant.aadhaarNumber || "",
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
      dateOfBirth: formatDate(tenant.dateOfBirth),

      // Make sure to include the owner ID which might be required for updates
      ownerId: tenant.ownerId || "",
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

  // Effect for table refresh and pagination changes
  useEffect(() => {
    if (hostel && Object.keys(hostel).length > 0) {
      fetchTenants();
    }
  }, [tableRefreshTrigger, pageNumber, tenantPerPage]);

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

  // Handle page change for pagination
  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setTenantPerPage(newItemsPerPage);
    setPageNumber(1); // Reset to first page when changing items per page
  };

  return (
    <div className="w-full pt-0 min-h-screen flex justify-center items-start relative">
      <div className="w-full pt-4 max-w-7xl px-4">
        {loading && tenants.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : !hostel || Object.keys(hostel).length === 0 ? (
          <NoHostelMessage />
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6">Tenant Management</h1>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 mt-4 space-y-4">
              {/* Search and Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Search input */}
                <div className="w-full sm:w-auto flex-grow relative flex">
                  <input
                    type="text"
                    placeholder="Search tenant details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                    className="w-[40%] text-black border-gray-200 p-3 pr-10 border rounded-l-lg shadow-md"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white py-2 px-4 rounded-r-lg hover:bg-blue-600 transition duration-200"
                  >
                    <FaSearch />
                  </button>
                </div>

                {/* Filter and Create New Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 justify-center px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 shadow-md cursor-pointer"
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
                    className="flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-200 shadow-md cursor-pointer"
                  >
                    <FaUserPlus className="text-white" />
                    Create New
                  </button>
                </div>
              </div>

              {/* Filter Panel */}
              <FilterComponent
                filterOpen={filterOpen}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                filters={filters}
              />

              {/* Loader or No Results */}
              {isSearching && tenants.length === 0 ? (
                <div className="flex justify-center items-center py-4">
                  <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
                  <span className="ml-2">Searching...</span>
                </div>
              ) : tenants.length === 0 && !loading ? (
                <div className="text-center py-6 text-gray-500">
                  No tenants found. Try adjusting your search or filters.
                </div>
              ) : null}

              {/* Tenant Table */}
              <PaginatedTenantTable
                tenants={tenants}
                handleViewClick={handleViewClick}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                loading={loading && tenants.length > 0}
                currentPage={pageNumber}
                totalItems={totalTenants}
                itemsPerPage={tenantPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
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

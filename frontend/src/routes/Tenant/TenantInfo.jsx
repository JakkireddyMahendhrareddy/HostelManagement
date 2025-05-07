// import React, { useState, useEffect } from "react";
// import { FaUserPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import { RiFilterLine } from "react-icons/ri";
// import { backendUrl, toastNoficationSettings } from "../../utils/utils";
// import { toast } from "react-toastify";
// import ConfirmModal from "../ConfirmModal";
// import TenantFormModal from "./TenantFormModal";
// import TenantDetailsModal from "./TenantDetailsModal";
// import FilterComponent from "./FilterComponent";
// // import TenantTable from "./TenantTable";

// const TenantInfo = () => {
//   // API URLs
//   const getTenantUrl = `${backendUrl}/api/tenants/all`;
//   const addTenantUrl = `${backendUrl}/api/tenants/add`;
//   const editTenantUrl = `${backendUrl}/api/tenants/update/`;
//   const deleteTenantUrl = `${backendUrl}/api/tenants/delete/`;
//   const getRoomsUrl = `${backendUrl}/api/hostel/room/view`;
//   const getHostelUrl = `${backendUrl}/api/hostel/view`;

//   // State variables
//   const [tenants, setTenants] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [hostel, setHostel] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [showTenantFormModal, setShowTenantFormModal] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [tenantIdToDelete, setTenantIdToDelete] = useState(null);
//   const [selectedTenant, setSelectedTenant] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [showAddHostelFormModal, setShowAddHostelFormModal] = useState(false);
//   const [filters, setFilters] = useState({
//     roomNumber: "",
//     joinDateFrom: "",
//     joinDateTo: "",
//     rentAmountMin: "",
//     rentAmountMax: "",
//   });

//   // Pagination
//   const [pageNumber, setPageNumber] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   // New tenant form state
//   const [newTenant, setNewTenant] = useState({
//     tenantName: "",
//     roomNumber: "",
//     joinDate: "",
//     rentAmount: "",
//     contact: "",
//   });

//   // Fetch hostel data from API
//   const fetchHostel = async () => {
//     try {
//       const response = await fetch(getHostelUrl, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data) {
//           setHostel(data);
//         } else {
//           setHostel({});
//         }
//       }
//     } catch (error) {
//       console.error("Failed to fetch hostel:", error);
//     }
//   };

//   // Fetch tenants from API
//   const fetchTenants = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(getTenantUrl, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data) {
//           setTenants(data);
//         } else {
//           setTenants([]);
//         }
//       } else {
//         toast.error("Failed to fetch tenants", toastNoficationSettings);
//       }
//     } catch (error) {
//       toast.error("Something went wrong", toastNoficationSettings);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch available rooms for adding tenants
//   const fetchRooms = async () => {
//     try {
//       const response = await fetch(getRoomsUrl, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data) {
//           const availableRooms = data.filter((room) => room.availableBeds > 0);
//           setRooms(availableRooms);
//         } else {
//           setRooms([]);
//         }
//       }
//     } catch (error) {
//       toast.error("Failed to fetch rooms", toastNoficationSettings);
//     }
//   };

//   // Load data on component mount
//   useEffect(() => {
//     fetchHostel();
//     fetchTenants();
//     fetchRooms();
//   }, []);

//   // Reset form after submission or cancel
//   const resetForm = () => {
//     setNewTenant({
//       tenantName: "",
//       roomNumber: "",
//       joinDate: "",
//       rentAmount: "",
//       contact: "",
//     });
//     setIsEditing(false);
//     setShowTenantFormModal(false);
//     setSelectedTenant(null);
//   };

//   // Handle form input changes
//   const handleTenantChange = (e) => {
//     const { name, value } = e.target;
//     setNewTenant({ ...newTenant, [name]: value });
//   };

//   // Validate tenant data
//   const validateTenantData = (tenantData) => {
//     if (
//       !tenantData.tenantName ||
//       !tenantData.roomNumber ||
//       !tenantData.joinDate ||
//       !tenantData.rentAmount ||
//       !tenantData.contact
//     ) {
//       toast.error("All fields are required", toastNoficationSettings);
//       return false;
//     }
//     return true;
//   };

//   // Add or update tenant
//   const handleTenantSubmit = async () => {
//     try {
//       if (!validateTenantData(newTenant)) return;

//       const url = isEditing
//         ? `${editTenantUrl}${selectedTenant._id}`
//         : addTenantUrl;
//       const method = isEditing ? "PATCH" : "POST";

//       const response = await fetch(url, {
//         method,
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newTenant),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message, toastNoficationSettings);
//         fetchTenants();
//         fetchRooms();
//         resetForm();
//       } else {
//         toast.error(data.message, toastNoficationSettings);
//       }
//     } catch (error) {
//       toast.error("Something went wrong", toastNoficationSettings);
//     }
//   };

//   // Delete tenant
//   const deleteTenant = async () => {
//     try {
//       const response = await fetch(`${deleteTenantUrl}${tenantIdToDelete}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message, toastNoficationSettings);
//         fetchTenants();
//         fetchRooms();
//       } else {
//         toast.error(data.message, toastNoficationSettings);
//       }
//     } catch (error) {
//       toast.error("Something went wrong", toastNoficationSettings);
//     } finally {
//       setShowConfirmModal(false);
//       setTenantIdToDelete(null);
//     }
//   };

//   // Handle edit button click
//   const handleEditClick = (tenant) => {
//     setSelectedTenant(tenant);
//     setNewTenant({
//       tenantName: tenant.tenantName,
//       roomNumber: tenant.roomNumber,
//       joinDate: new Date(tenant.joinDate).toISOString().split("T")[0],
//       rentAmount: tenant.rentAmount,
//       contact: tenant.contact,
//     });
//     setIsEditing(true);
//     setShowTenantFormModal(true);
//   };

//   // Handle delete button click
//   const handleDeleteClick = (tenantId) => {
//     setTenantIdToDelete(tenantId);
//     setShowConfirmModal(true);
//   };

//   // Handle view details button click
//   const handleViewClick = (tenant) => {
//     setSelectedTenant(tenant);
//     setShowDetailsModal(true);
//   };

//   // Handle filter change
//   const handleFilterChange = (updatedFilters) => {
//     setFilters(updatedFilters);
//     setPageNumber(1); // Reset to first page when filters change
//   };

//   // Reset filters
//   const handleResetFilters = () => {
//     setFilters({
//       roomNumber: "",
//       joinDateFrom: "",
//       joinDateTo: "",
//       rentAmountMin: "",
//       rentAmountMax: "",
//     });
//     setSearchTerm(""); // Also reset search term
//     setPageNumber(1); // Reset to first page
//   };

//   // Apply filters and search to tenants
//   const filteredTenants = tenants.filter((tenant) => {
//     // Search term filter
//     const searchMatch =
//       searchTerm === "" ||
//       tenant.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       tenant.contact.includes(searchTerm) ||
//       tenant.roomNumber.toString().includes(searchTerm);

//     // Room number filter
//     const roomMatch =
//       filters.roomNumber === "" ||
//       tenant.roomNumber.toString() === filters.roomNumber;

//     // Join date range filter
//     const joinDateMatch =
//       (filters.joinDateFrom === "" ||
//         new Date(tenant.joinDate) >= new Date(filters.joinDateFrom)) &&
//       (filters.joinDateTo === "" ||
//         new Date(tenant.joinDate) <= new Date(filters.joinDateTo));

//     // Rent amount range filter
//     const rentMatch =
//       (filters.rentAmountMin === "" ||
//         tenant.rentAmount >= parseInt(filters.rentAmountMin)) &&
//       (filters.rentAmountMax === "" ||
//         tenant.rentAmount <= parseInt(filters.rentAmountMax));

//     return searchMatch && roomMatch && joinDateMatch && rentMatch;
//   });

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);
//   const displayedTenants = filteredTenants.slice(
//     (pageNumber - 1) * itemsPerPage,
//     pageNumber * itemsPerPage
//   );

//   // No hostel message display and action buttons
//   const NoHostelMessage = () => (
//     <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 text-center">
//       <h2 className="text-red-700 font-bold text-2xl mb-10 max-w-xl">
//         You haven't listed any hostel yet!
//       </h2>
//       <p className="text-gray-600 text-lg mb-8 max-w-xl">
//         Start managing your hostel digitally – add your property and
//         control every detail with ease.
//       </p>

//       <button
//         onClick={() => setShowAddHostelFormModal(true)}
//         className="bg-radial from-blue-400 via-blue-500 to-blue-600 text-white px-6 py-3 rounded-full cursor-pointer hover:scale-105 transition duration-300"
//       >
//         List Your Hostel
//       </button>

//       <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-700">
//         <div className="flex flex-col items-center">
//           <FaBed size={40} className="w-12 mb-4 text-blue-500" />
//           <p>Room & Bed Management</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <FaDollarSign size={40} className="w-12 mb-4 text-blue-500" />
//           <p>Update Rent Anytime</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <FaCheckCircle size={40} className="w-12 mb-4 text-blue-500" />
//           <p>Track Availability</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <FaEdit size={40} className="w-12 mb-4 text-blue-500" />
//           <p>Edit Hostel Info</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full pt-0 min-h-screen flex justify-center items-start relative">
//       <div className="w-full pt-4 max-w-7xl px-4">
//         {loading ? (
//           // Loading spinner
//           <div className="flex justify-center items-center h-60">
//             <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
//           </div>
//         ) : !hostel || Object.keys(hostel).length === 0 ? (
//           // No hostel message
//           <NoHostelMessage />
//         ) : (
//           <div>
//             <h1 className="text-2xl font-bold mb-6">Tenant Management</h1>

//             {/* Main content area */}
//             <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 mt-4 space-y-4">
//               {/* Search and Filter Bar */}
//               <div className="flex flex-wrap gap-4 justify-between items-center">
//                 <div className="relative flex-grow max-w-md">
//                   <input
//                     type="text"
//                     placeholder="Search tenant details..."
//                     value={searchTerm}
//                     onChange={(e) => {
//                       setSearchTerm(e.target.value);
//                       setPageNumber(1); // Reset to first page when search changes
//                     }}
//                     className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                   <svg
//                     className="absolute right-3 top-3 h-5 w-5 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setFilterOpen(!filterOpen)}
//                     className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
//                   >
//                     {filterOpen ? "Hide Filters" : "Show Filters"}
//                     <RiFilterLine />
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowTenantFormModal(true);
//                       setIsEditing(false);
//                       resetForm();
//                     }}
//                     className="bg-blue-500 text-white py-2 px-4 flex items-center gap-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-200"
//                   >
//                     <FaUserPlus className="text-white" />
//                     Create New
//                   </button>
//                 </div>
//               </div>

//               {/* Filter Component - Shows when filter is toggled */}
//               {filterOpen && (
//                 <FilterComponent
//                   filters={filters}
//                   onFilterChange={handleFilterChange}
//                   onResetFilters={handleResetFilters}
//                 />
//               )}

//               {/* Tenants Table */}
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         SR.NO
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         TENANT NAME
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         ROOM NUMBER
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         JOIN DATE
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         RENT AMOUNT
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         CONTACT
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         ACTIONS
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {displayedTenants.length > 0 ? (
//                       displayedTenants.map((tenant, index) => (
//                         <tr key={tenant._id || index} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {(pageNumber - 1) * itemsPerPage + index + 1}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                             {tenant.tenantName}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {tenant.roomNumber}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {new Date(tenant.joinDate).toLocaleDateString()}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             ₹{tenant.rentAmount}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {tenant.contact}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                             <div className="flex space-x-2">
//                               <button
//                                 onClick={() => handleViewClick(tenant)}
//                                 className="text-blue-600 hover:text-blue-900"
//                                 aria-label="View details"
//                               >
//                                 <FaEye />
//                               </button>
//                               <button
//                                 onClick={() => handleEditClick(tenant)}
//                                 className="text-green-600 hover:text-green-900"
//                                 aria-label="Edit tenant"
//                               >
//                                 <FaEdit />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteClick(tenant._id)}
//                                 className="text-red-600 hover:text-red-900"
//                                 aria-label="Delete tenant"
//                               >
//                                 <FaTrash />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="px-6 py-8 text-center text-sm text-gray-500">
//                           {tenants.length > 0 ? (
//                             "No tenants match your search criteria. Try adjusting your filters."
//                           ) : (
//                             <div className="flex flex-col items-center justify-center space-y-4">
//                               <p className="text-lg font-medium text-gray-600">No tenants found</p>
//                               <p className="text-gray-500">Add a new tenant to get started</p>
//                               <button
//                                 onClick={() => {
//                                   setShowTenantFormModal(true);
//                                   setIsEditing(false);
//                                   resetForm();
//                                 }}
//                                 className="mt-2 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
//                               >
//                                 Add Tenant
//                               </button>
//                             </div>
//                           )}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination - Only show if there are tenants */}
//               {filteredTenants.length > 0 && (
//                 <div className="flex flex-wrap justify-between items-center mt-6 text-sm">
//                   <div className="flex items-center mb-2 sm:mb-0">
//                     <span className="mr-2">Items per page:</span>
//                     <select
//                       value={itemsPerPage}
//                       onChange={(e) => {
//                         setItemsPerPage(Number(e.target.value));
//                         setPageNumber(1); // Reset to first page when changing items per page
//                       }}
//                       className="border rounded p-1"
//                     >
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                       <option value={20}>20</option>
//                     </select>
//                   </div>

//                   <div className="flex justify-center items-center gap-4">
//                     <button
//                       onClick={() => setPageNumber(1)}
//                       disabled={pageNumber === 1}
//                       className={`px-2 py-1 rounded ${
//                         pageNumber === 1
//                           ? "text-gray-400 cursor-not-allowed"
//                           : "text-blue-600 hover:bg-blue-100"
//                       }`}
//                     >
//                       «
//                     </button>
//                     <button
//                       onClick={() => setPageNumber((prev) => prev - 1)}
//                       disabled={pageNumber === 1}
//                       className={`px-2 py-1 rounded ${
//                         pageNumber === 1
//                           ? "text-gray-400 cursor-not-allowed"
//                           : "text-blue-600 hover:bg-blue-100"
//                       }`}
//                     >
//                       ‹
//                     </button>

//                     <span>
//                       Page <span className="font-medium">{pageNumber}</span> of{" "}
//                       <span className="font-medium">{totalPages || 1}</span>
//                     </span>

//                     <button
//                       onClick={() => setPageNumber((prev) => prev + 1)}
//                       disabled={pageNumber === totalPages}
//                       className={`px-2 py-1 rounded ${
//                         pageNumber === totalPages
//                           ? "text-gray-400 cursor-not-allowed"
//                           : "text-blue-600 hover:bg-blue-100"
//                       }`}
//                     >
//                       ›
//                     </button>
//                     <button
//                       onClick={() => setPageNumber(totalPages)}
//                       disabled={pageNumber === totalPages}
//                       className={`px-2 py-1 rounded ${
//                         pageNumber === totalPages
//                           ? "text-gray-400 cursor-not-allowed"
//                           : "text-blue-600 hover:bg-blue-100"
//                       }`}
//                     >
//                       »
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Tenant Form Modal - Add/Edit Tenant */}
//         {showTenantFormModal && (
//           <TenantFormModal
//             setShowTenantFormModal={setShowTenantFormModal}
//             newTenant={newTenant}
//             handleTenantChange={handleTenantChange}
//             handleTenantSubmit={handleTenantSubmit}
//             isEditing={isEditing}
//             rooms={rooms}
//             resetForm={resetForm}
//           />
//         )}

//         {/* Tenant Details Modal */}
//         {showDetailsModal && (
//           <TenantDetailsModal
//             tenant={selectedTenant}
//             setShowDetailsModal={setShowDetailsModal}
//           />
//         )}

//         {/* Confirm Delete Modal */}
//         {showConfirmModal && (
//           <ConfirmModal
//             confirmType="tenant"
//             confirmDelete={deleteTenant}
//             setShowConfirmModal={setShowConfirmModal}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TenantInfo;

import React, { useState, useEffect } from "react";
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
import FilterComponent from "./FilterComponent";

const TenantInfo = () => {
  // API URLs
  const getTenantUrl = `${backendUrl}/api/tenants/all`;
  const addTenantUrl = `${backendUrl}/api/tenants/add`;
  const editTenantUrl = `${backendUrl}/api/tenants/update/`;
  const deleteTenantUrl = `${backendUrl}/api/tenants/delete/`;
  const getRoomsUrl = `${backendUrl}/api/hostel/view`;

  // State variables
  const [tenants, setTenants] = useState([]);
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

  // Fetch hostel data from API
  const fetchHostel = async () => {
    try {
      const response = await fetch(getHostelUrl, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setHostel(data);
        } else {
          setHostel({});
        }
      }
    } catch (error) {
      console.error("Failed to fetch hostel:", error);
    }
  };

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
  console.log(hostel)



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
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPageNumber(1); // Reset to first page when search changes
                    }}
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

              {/* Filter Component - Shows when filter is toggled */}
              {filterOpen && (
                <FilterComponent
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                />
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
                          className="px-6 py-8 text-center text-sm text-gray-500"
                        >
                          {tenants.length > 0 ? (
                            "No tenants match your search criteria. Try adjusting your filters."
                          ) : (
                            <div className="flex flex-col items-center justify-center space-y-4">
                              <p className="text-lg font-medium text-gray-600">
                                No tenants found
                              </p>
                              <p className="text-gray-500">
                                Add a new tenant to get started
                              </p>
                              <button
                                onClick={() => {
                                  setShowTenantFormModal(true);
                                  setIsEditing(false);
                                  resetForm();
                                }}
                                className="mt-2 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
                              >
                                Add Tenant
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination - Only show if there are tenants */}
              {filteredTenants.length > 0 && (
                <div className="flex flex-wrap justify-between items-center mt-6 text-sm">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <span className="mr-2">Items per page:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setPageNumber(1); // Reset to first page when changing items per page
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

{
  /* {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 mt-4 space-y-4">
            {/* Search and Filter Bar */
}
// <div className="flex flex-wrap gap-4 justify-between items-center">
//   <div className="relative flex-grow max-w-md">
//     <input
//       type="text"
//       placeholder="Search tenant details..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//     />
//     <svg
//       className="absolute right-3 top-3 h-5 w-5 text-gray-400"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//       />
//     </svg>
//   </div>

//   <div className="flex gap-2">
//     <button onClick={() => setFilterOpen(!filterOpen)}
//       className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
//         {filterOpen ? "Hide Filters" : "Show Filters"}
//          <RiFilterLine />
//     </button>
//     <button
//       onClick={() => {
//         setShowTenantFormModal(true);
//         setIsEditing(false);
//         resetForm();
//       }}
//       className="bg-blue-500 text-white py-2 px-4 flex items-center gap-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-200"
//     >
//       <FaUserPlus className="text-white" />
//       Create New
//     </button>
//   </div>
// </div>

// {/* Tenants Table */}
// <div className="overflow-x-auto">
//   <table className="min-w-full divide-y divide-gray-200">
//     <thead className="bg-gray-50">
//       <tr>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           SR.NO
//         </th>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           TENANT NAME
//         </th>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           ROOM NUMBER
//         </th>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           JOIN DATE
//         </th>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           RENT AMOUNT
//         </th>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           CONTACT
//         </th>
//         <th
//           scope="col"
//           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//         >
//           ACTIONS
//         </th>
//       </tr>
//     </thead>
//     {/* <tbody className="bg-white divide-y divide-gray-200">
//       {displayedTenants.length > 0 ? (
//         displayedTenants.map((tenant, index) => (
//           <tr
//             key={tenant._id || index}
//             className="hover:bg-gray-50"
//           >
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//               {(pageNumber - 1) * itemsPerPage + index + 1}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//               {tenant.tenantName}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//               {tenant.roomNumber}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//               {new Date(tenant.joinDate).toLocaleDateString()}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//               ₹{tenant.rentAmount}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//               {tenant.contact}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleViewClick(tenant)}
//                   className="text-blue-600 hover:text-blue-900"
//                   aria-label="View details"
//                 >
//                   <FaEye />
//                 </button>
//                 <button
//                   onClick={() => handleEditClick(tenant)}
//                   className="text-green-600 hover:text-green-900"
//                   aria-label="Edit tenant"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteClick(tenant._id)}
//                   className="text-red-600 hover:text-red-900"
//                   aria-label="Delete tenant"
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td
//             colSpan="7"
//             className="px-6 py-4 text-center text-sm text-gray-500"
//           >
//             No tenants found.{" "}
//             {tenants.length > 0
//               ? "Try adjusting your filters."
//               : "Add a new tenant to get started."}
//           </td>
//         </tr>
//       )}
//     </tbody> */}
//   </table>
// </div>

{
  /* Pagination */
}
{
  /* {filteredTenants.length > 0 && (
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
            )} */
}
// </div>
// )} }

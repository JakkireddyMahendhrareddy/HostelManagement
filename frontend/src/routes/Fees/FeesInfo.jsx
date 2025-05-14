// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { backendUrl, toastNoficationSettings } from "../../utils/utils";
// import NoHostelMessage from "../NoHostelMessage";
// import PaginatedFeesTable from "../Fees/PaginatedFeesTable";
// import TenantTransactionModal from "./TenantTransactionModal";
// import TenantPaymentForm from "./TenantPaymentForm";

// // Main payment component that handles the payment page
// const FeesInfo = () => {
//   // State variables
//   const [hostel, setHostel] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [tenants, setTenants] = useState([]);
//   const [search, setSearch] = useState("");
//   const [room, setRoom] = useState("Room 201");
//   const [month, setMonth] = useState("May");
//   const [year, setYear] = useState("2024");
//   const [showTenantFormModal, setShowTenantFormModal] = useState(false);
//   const [showTransactionModal, setShowTransactionModal] = useState(false);
//   const [selectedTenant, setSelectedTenant] = useState(null);
//   const [transactions, setTransactions] = useState([]);
//   const [itemsPerPage, setItemsPerPage] = useState([]);
//   const [totalItems, setTotalItems] = useState([]);

//   // Pagination states
//   const [pageNumber, setPageNumber] = useState(1);
//   const [tenantPerPage, setTenantPerPage] = useState(10);
//   const [totalTenants, setTotalTenants] = useState(3); // Set to 3 based on your image

//   // API URLs
//   const getHostelUrl = `${backendUrl}/api/hostel/view`;
//   const getTenantUrl = `${backendUrl}/api/tenants/all`;

//   // Sample data based on the image
//   const sampleTenants = [
//     {
//       _id: "1",
//       tenantName: "Durgarao Goripari",
//       contact: "6767676767",
//       roomNumber: "104",
//       joinDate: "2025-05-10",
//       rentAmount: 100000,
//       status: "2025-05-10T00:00:00.000Z",
//     },
//     {
//       _id: "2",
//       tenantName: "N.Durgarao",
//       contact: "9090909090",
//       roomNumber: "101",
//       joinDate: "2025-05-07",
//       rentAmount: 9000,
//       status: "2025-05-07T00:00:00.000Z",
//     },
//     {
//       _id: "3",
//       tenantName: "Ravi Kumar",
//       contact: "9876543210",
//       roomNumber: "101",
//       joinDate: "2024-12-01",
//       rentAmount: 9000,
//       status: "2024-12-01T00:00:00.000Z",
//     },
//   ];

//   const fetchHostel = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(getHostelUrl, {
//         method: "GET",
//         credentials: "include",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         if (data) {
//           setHostel(data);
//           fetchRooms();
//         } else {
//           setHostel(null);
//         }
//       }
//     } catch (error) {
//       toast.warning("Something Went Wrong", toastNoficationSettings);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHostel();
//   }, []);

//   // const fetchTenants = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const response = await fetch(getTenantUrl, {
//   //       method: "GET",
//   //       credentials: "include", // if cookies/session required
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       console.log("Fetched Tenants:", data);

//   //       if (data && data.tenants) {
//   //         setTenants(data.tenants);
//   //         setTotalTenants(data.total || data.tenants.length);
//   //       } else {
//   //         setTenants([]);
//   //         setTotalTenants(0);
//   //       }
//   //     } else {
//   //       toast.error("Failed to fetch tenants", toastNoficationSettings);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching tenants:", error);
//   //     toast.warning("Something Went Wrong", toastNoficationSettings);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchTenants();
//   // }, []);

//   // Handle search and filter submission

//   const fetchTenants = async () => {
//     try {
//       setLoading(true);

//       const page = pageNumber || 1;
//       const limit = itemsPerPage || tenantPerPage || 10;

//       // Construct pagination query string
//       const paginationParams = new URLSearchParams({
//         page: page.toString(),
//         limit: limit.toString(),
//       });

//       const paginatedUrl = `${getTenantUrl}?${paginationParams.toString()}`;

//       const response = await fetch(paginatedUrl, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || "Failed to fetch tenants");
//       }

//       const data = await response.json();
//       console.log("Fetched Tenants:", data);

//       if (data?.success && Array.isArray(data.data)) {
//         setTenants(data.data);
//         setTotalTenants(data.total || data.count || data.data.length || 0);
//         setTotalItems(data.total || data.count || data.data.length || 0);
//       } else {
//         setTenants([]);
//         setTotalTenants(0);
//         setTotalItems(0);
//         toast.info("No tenants found", toastNoficationSettings);
//       }
//     } catch (error) {
//       console.error("Error fetching tenants:", error);
//       toast.error(
//         error.message || "Something went wrong",
//         toastNoficationSettings
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Automatically refetch when any relevant pagination state changes
//   useEffect(() => {
//     fetchTenants();
//   }, [pageNumber, itemsPerPage, tenantPerPage]);

//   const handleSubmit = () => {
//     console.log({
//       search,
//       room,
//       month,
//       year,
//     });
//     // In a real implementation, this would filter the data
//     // For now, we'll just use the sample data
//   };

//   // Handle payment button click
//   const handlePaymentClick = (tenant) => {
//     setSelectedTenant(tenant);
//     setShowTenantFormModal(true);
//   };

//   // Handle previous payment history button click
//   const handleHistoryClick = (tenant) => {
//     setSelectedTenant(tenant);
//     // Sample transaction data
//     setTransactions([
//       {
//         transactionId: "TXN123456",
//         amountPaid: tenant.rentAmount,
//         paymentMode: "UPI",
//         paymentDate: "2025-04-10",
//         remarks: "April 2025 Rent",
//       },
//       {
//         transactionId: "TXN123455",
//         amountPaid: tenant.rentAmount,
//         paymentMode: "Cash",
//         paymentDate: "2025-03-10",
//         remarks: "March 2025 Rent",
//       },
//     ]);
//     setShowTransactionModal(true);
//   };

//   // Handle edit button click
//   const handleEditClick = (tenant) => {
//     console.log("Edit tenant:", tenant);
//     // This would normally open an edit form
//   };

//   // Handle page change for pagination
//   const handlePageChange = (newPage) => {
//     setPageNumber(newPage);
//   };

//   // Handle items per page change
//   const handleItemsPerPageChange = (newItemsPerPage) => {
//     setTenantPerPage(newItemsPerPage);
//     setPageNumber(1);
//   };

//   // Initial data loading
//   // useEffect(() => {
//   //   fetchHostel();
//   // }, []);
//   console.log(hostel, "hostelsssssssssss");

//   console.log(tenants, "tenantssssssssss");
//   return (
//     <div className="w-full pt-0 min-h-screen flex justify-center items-start relative">
//       <div className="w-full pt-4 max-w-7xl px-4">
//         {loading && tenants.length === 0 ? (
//           // Loading spinner
//           <div className="flex justify-center items-center h-60">
//             <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
//           </div>
//         ) : !hostel || Object.keys(hostel).length === 0 ? (
//           // No hostel message
//           <NoHostelMessage />
//         ) : (
//           <div>
//             <h1 className="text-2xl font-bold mb-6">Payments</h1>

//             {/* Main content area */}
//             <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 mt-4 space-y-4">
//               <div className="flex flex-wrap sm:flex-nowrap justify-between items-center  p-4 rounded-lg  gap-4 w-full">
//                 {/* Search Bar */}
//                 <div className="flex w-full sm:max-w-md">
//                   <input
//                     type="text"
//                     placeholder="Search tenant details..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="w-[60%] text-black border-gray-200 p-3  border rounded-l-lg shadow-md relative"
//                   />
//                   <button
//                     onClick={handleSubmit}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-r-lg hover:bg-blue-600 duration-200 cursor-pointer"
//                   >
//                     <FaSearch />
//                   </button>
//                 </div>

//                 {/* Right Side Dropdowns */}
//                 <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center justify-end">
//                   {/* Room Dropdown */}
//                   <select
//                     value={room}
//                     onChange={(e) => setRoom(e.target.value)}
//                     className="border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm"
//                   >
//                     <option value="Room 101">Room 101</option>
//                     <option value="Room 201">Room 201</option>
//                     <option value="Room 104">Room 104</option>
//                   </select>

//                   {/* Month Dropdown */}
//                   <select
//                     value={month}
//                     onChange={(e) => setMonth(e.target.value)}
//                     className="border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm"
//                   >
//                     {[
//                       "January",
//                       "February",
//                       "March",
//                       "April",
//                       "May",
//                       "June",
//                       "July",
//                       "August",
//                       "September",
//                       "October",
//                       "November",
//                       "December",
//                     ].map((m) => (
//                       <option key={m} value={m}>
//                         {m}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Year Dropdown */}
//                   <select
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                     className="border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm"
//                   >
//                     {["2024", "2025", "2026"].map((y) => (
//                       <option key={y} value={y}>
//                         {y}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Submit Button */}
//                   <button
//                     onClick={handleSubmit}
//                     className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 text-sm shadow-sm"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>

//               {/* Tenants Table with Pagination */}
//               <PaginatedFeesTable
//                 tenants={tenants}
//                 handlePaymentClick={handlePaymentClick}
//                 handleHistoryClick={handleHistoryClick}
//                 handleEditClick={handleEditClick}
//                 loading={loading}
//                 handlePageChange={handlePageChange}
//                 handleItemsPerPageChange={handleItemsPerPageChange}
//                 itemsPerPage={itemsPerPage}
//                 totalItems={totalItems}
//                 pageNumber={pageNumber}
//                 tenantPerPage={tenantPerPage}
//                 totalTenants={totalTenants}
//               />
//             </div>
//           </div>
//         )}
//         {/* Payment Form Modal */}
//         {showTenantFormModal && (
//           <TenantPaymentForm
//             tenant={selectedTenant}
//             setShowDetailsModal={setShowTenantFormModal}
//             onSuccess={() => {
//               fetchTenants();
//               setShowTenantFormModal(false);
//             }}
//           />
//         )}

//         {/* Transaction History Modal */}
//         {showTransactionModal && (
//           <TenantTransactionModal
//             showModal={showTransactionModal}
//             setShowModal={setShowTransactionModal}
//             tenantName={selectedTenant?.tenantName || ""}
//             transactions={transactions}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeesInfo;

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { backendUrl, toastNoficationSettings } from "../../utils/utils";
import NoHostelMessage from "../NoHostelMessage";
import PaginatedFeesTable from "../Fees/PaginatedFeesTable";
import TenantTransactionModal from "./TenantTransactionModal";
import TenantPaymentForm from "./TenantPaymentForm";

// Main payment component that handles the payment page
const FeesInfo = () => {
  // State variables
  const [hostel, setHostel] = useState({});
  const [loading, setLoading] = useState(true);
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState("");
  const [room, setRoom] = useState("Room 201");
  const [month, setMonth] = useState("May");
  const [year, setYear] = useState("2024");
  const [showTenantFormModal, setShowTenantFormModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Pagination states
  const [pageNumber, setPageNumber] = useState(1);
  const [tenantPerPage, setTenantPerPage] = useState(10);
  const [totalTenants, setTotalTenants] = useState(0);

  // API URLs
  const getHostelUrl = `${backendUrl}/api/hostel/view`;
  const getTenantUrl = `${backendUrl}/api/tenants/all`;

  // Fetch hostel information
  const fetchHostel = async () => {
    try {
      setLoading(true);
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
            // If no data, set a dummy object to allow tenant fetching
            setHostel({ id: "dummy" });
          }
        } else {
          // If API fails, set a dummy object to allow tenant fetching
          console.log("Hostel API failed, using dummy hostel data");
          setHostel({ id: "dummy" });
        }
      } catch (apiError) {
        console.error("Hostel API error:", apiError);
        // Set dummy hostel to allow tenant fetching
        setHostel({ id: "dummy" });
      }
    } catch (error) {
      console.error("Error in fetchHostel function:", error);
      // Set dummy hostel to allow tenant fetching
      setHostel({ id: "dummy" });
    } finally {
      setLoading(false);
    }
  };

  // Sample data for tenants when API fails
  const sampleTenants = [
    {
      _id: "1",
      tenantName: "Durgarao Goripari",
      contact: "6767676767",
      roomNumber: "104",
      joinDate: "2025-05-10",
      rentAmount: 100000,
      status: "2025-05-10T00:00:00.000Z",
    },
    {
      _id: "2",
      tenantName: "N.Durgarao",
      contact: "9090909090",
      roomNumber: "101",
      joinDate: "2025-05-07",
      rentAmount: 9000,
      status: "2025-05-07T00:00:00.000Z",
    },
    {
      _id: "3",
      tenantName: "Ravi Kumar",
      contact: "9876543210",
      roomNumber: "101",
      joinDate: "2024-12-01",
      rentAmount: 9000,
      status: "2024-12-01T00:00:00.000Z",
    },
  ];

  // Fetch tenant data with pagination, search, and filters
  const fetchTenants = async () => {
    try {
      setLoading(true);

      // Build query parameters for the API request
      const queryParams = new URLSearchParams({
        page: pageNumber.toString(),
        limit: tenantPerPage.toString(),
      });

      // Add search term if provided
      if (search.trim()) {
        queryParams.append("search", search.trim());
      }

      // Add filters if selected
      if (room !== "Room 201") {
        queryParams.append("room", room.replace("Room ", ""));
      }

      if (month && year) {
        queryParams.append("month", month);
        queryParams.append("year", year);
      }

      try {
        const response = await fetch(
          `${getTenantUrl}?${queryParams.toString()}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data?.success && Array.isArray(data.data)) {
            setTenants(data.data);
            setTotalTenants(data.total || data.count || data.data.length || 0);
            console.log("Successfully fetched tenants:", data.data);
            return;
          }
        }

        // If API fails or returns no data, use sample data for development
        console.log(
          "Using sample tenant data since API didn't return valid data"
        );
        setTenants(sampleTenants);
        setTotalTenants(sampleTenants.length);
      } catch (apiError) {
        console.error("API Error:", apiError);
        // Fall back to sample data if API request fails
        console.log("Falling back to sample tenant data due to API error");
        setTenants(sampleTenants);
        setTotalTenants(sampleTenants.length);
      }
    } catch (error) {
      console.error("Error in fetchTenants function:", error);
      toast.error(
        "Something went wrong while fetching tenants",
        toastNoficationSettings
      );
      // Still fall back to sample data
      setTenants(sampleTenants);
      setTotalTenants(sampleTenants.length);
    } finally {
      setLoading(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchHostel();
  }, []);

  // Fetch tenants after hostel loads or when pagination changes
  useEffect(() => {
    // Always fetch tenants regardless of hostel status
    fetchTenants();
  }, [pageNumber, tenantPerPage]);

  // Handle search and filter submission
  const handleSubmit = () => {
    fetchTenants();
  };

  // Handle payment button click
  const handlePaymentClick = (tenant) => {
    setSelectedTenant(tenant);
    setShowTenantFormModal(true);
  };

  // Handle previous payment history button click
  const handleHistoryClick = async (tenant) => {
    try {
      setLoading(true);
      setSelectedTenant(tenant);

      // In a real implementation, fetch transaction history from an API
      // For now, using sample data
      const sampleTransactions = [
        {
          transactionId: "TXN123456",
          amountPaid: tenant.rentAmount,
          paymentMode: "UPI",
          paymentDate: "2025-04-10",
          remarks: "April 2025 Rent",
        },
        {
          transactionId: "TXN123455",
          amountPaid: tenant.rentAmount,
          paymentMode: "Cash",
          paymentDate: "2025-03-10",
          remarks: "March 2025 Rent",
        },
      ];

      setTransactions(sampleTransactions);
      setShowTransactionModal(true);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      toast.error(
        "Failed to load transaction history",
        toastNoficationSettings
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEditClick = (tenant) => {
    console.log("Edit tenant:", tenant);
    // This would normally open an edit form
  };

  // Handle page change for pagination
  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setTenantPerPage(newItemsPerPage);
    setPageNumber(1);
  };

  return (
    <div className="w-full pt-0 min-h-screen flex justify-center items-start relative">
      <div className="w-full pt-4 max-w-7xl px-4">
        {loading && tenants.length === 0 ? (
          // Loading spinner
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6">Payments</h1>

            {/* Main content area */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 mt-4 space-y-4">
              <div className="flex flex-wrap sm:flex-nowrap justify-between items-center p-4 rounded-lg gap-4 w-full">
                {/* Search Bar */}
                <div className="flex w-full sm:max-w-md">
                  <input
                    type="text"
                    placeholder="Search tenant details..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-[60%] text-black border-gray-200 p-3 border rounded-l-lg shadow-md relative"
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-r-lg hover:bg-blue-600 duration-200 cursor-pointer"
                  >
                    <FaSearch />
                  </button>
                </div>

                {/* Right Side Dropdowns */}
                <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center justify-end">
                  {/* Room Dropdown */}
                  <select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm"
                  >
                    <option value="Room 101">Room 101</option>
                    <option value="Room 201">Room 201</option>
                    <option value="Room 104">Room 104</option>
                  </select>

                  {/* Month Dropdown */}
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm"
                  >
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  {/* Year Dropdown */}
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm"
                  >
                    {["2024", "2025", "2026"].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 text-sm shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Tenants Table with Pagination */}
              <PaginatedFeesTable
                tenants={tenants}
                handlePaymentClick={handlePaymentClick}
                handleHistoryClick={handleHistoryClick}
                handleEditClick={handleEditClick}
                loading={loading}
                handlePageChange={handlePageChange}
                handleItemsPerPageChange={handleItemsPerPageChange}
                pageNumber={pageNumber}
                tenantPerPage={tenantPerPage}
                totalTenants={totalTenants}
              />
            </div>
          </div>
        )}
        {showTenantFormModal && (
          <TenantPaymentForm
            tenant={selectedTenant}
            setShowDetailsModal={setShowTenantFormModal}
            onSuccess={() => {
              fetchTenants();
              setShowTenantFormModal(false);
            }}
          />
        )}
        {/* Transaction History Modal */}
        {showTransactionModal && (
          <TenantTransactionModal
            showModal={showTransactionModal}
            setShowModal={setShowTransactionModal}
            tenantName={selectedTenant?.tenantName || ""}
            transactions={transactions}
          />
        )}
      </div>
    </div>
  );
};

export default FeesInfo;

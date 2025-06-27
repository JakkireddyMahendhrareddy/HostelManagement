import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Plus, AlertCircle } from "lucide-react";
import { FaSearch, FaMoneyBillWave, FaHistory } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl, toastNoficationSettings } from "../../utils/utils";
import NoHostelMessage from "../NoHostelMessage";
import ConfirmModal from "../ConfirmModal";
import FeesTable from "./FeesTable";
import TenantTransactionModal from "./TenantTransactionModal";
import TenantPaymentForm from "./TenantPaymentForm";
import PaginatedFeesTable from "./PaginatedFeesTable";

const FeesInfo = () => {
  // State variables
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState("");
  const [room, setRoom] = useState("Room 201");
  const [month, setMonth] = useState("May");
  const [year, setYear] = useState("2024");
  const [showTenantFormModal, setShowTenantFormModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  // State for storing tenant transactions
  const [tenantTransactions, setTenantTransactions] = useState([]);
  const [paymentTransactions, setPaymentTransactions] = useState([]);

  const [loadingTransactions, setLoadingTransactions] = useState(false);

  // Pagination states
  const [pageNumber, setPageNumber] = useState(1);
  const [tenantPerPage, setTenantPerPage] = useState(5);
  const [totalTenants, setTotalTenants] = useState(0);

  // API URLs
  const getHostelUrl = `${backendUrl}/api/hostel/view`;
  const getTenantUrl = `${backendUrl}/api/tenants/all`;
  const createPaymentUrl = `${backendUrl}/api/payments/create`;
  const getTransactionsUrl = `${backendUrl}/api/payments/tenant`; // Notice "tenant" is added
  const deleteTransactionsUrl = `${backendUrl}/api/payments/delete`; // Notice "tenant" is added
  const editTransactionsUrl = `${backendUrl}/api/payments/edit`; // Notice "tenant" is added

  // Handle search and filter submission
  const handleSubmit = () => {
    fetchTenants();
  };

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
          console.log(data, "ten");

          if (Array.isArray(data.tenants)) {
            setTenants(data.tenants);
            setTotalTenants(
              data.total || data.count || data.tenants.length || 0
            );
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
    fetchTenants();
  }, [pageNumber, tenantPerPage]);

  // Handle payment button click
  const handlePaymentClick = (tenant) => {
    const formattedTenant = {
      id: tenant.id || tenant._id || Date.now().toString(),
      tenantName: tenant.tenantName || "",
      contact: tenant.contact || "",
      roomNumber: tenant.roomNumber || "",
      rentAmount: tenant.rentAmount || "",
      joinDate: tenant.moveInDate ? tenant.moveInDate.split("T")[0] : "",
      rentStatus: "Due",
      dueDate: "", // optionally calculate based on business logic
      payingDate: new Date().toISOString().split("T")[0],
      paymentMode: "Cash",
      transactionId: "",
      remarks: "",
    };

    setSelectedTenant(formattedTenant);
    setShowTenantFormModal(true);
  };

  // Save payment to MongoDB and create linked transaction
  const savePaymentToDatabase = async (paymentDetails) => {
    try {
      setLoading(true);
      const paymentData = {
        tenantId: selectedTenant.id,
        tenantName: paymentDetails.tenantName,
        roomNumber: paymentDetails.roomNumber,
        paymentAmount: parseFloat(paymentDetails.payingAmount), // ✅ correct name
        dueAmount: parseFloat(paymentDetails.dueAmount),
        rentAmount: parseFloat(paymentDetails.rent), // ✅ correct name
        paymentDate: paymentDetails.payingDate,
        dueDate: paymentDetails.dueDate,
        paymentMode: paymentDetails.paymentMode,
        transactionId: paymentDetails.transactionId || `TXN-${Date.now()}`,
        rentStatus: paymentDetails.rentStatus,
        remarks: paymentDetails.remarks,
      };

      // Send data to API
      const response = await fetch(createPaymentUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save payment");
      }

      const savedPayment = await response.json();
      setPaymentTransactions(savedPayment);

      // Show success message
      toast.success("Payment recorded successfully", toastNoficationSettings);

      // Refresh tenant list to show updated payment status
      fetchTenants();

      return savedPayment;
    } catch (error) {
      console.error("Error saving payment:", error);
      toast.error(
        error.message || "Failed to save payment",
        toastNoficationSettings
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchTenantTransactions = async (tenantId) => {
    try {
      setLoadingTransactions(true);

      // Make sure tenantId is valid
      if (!tenantId) {
        throw new Error("Invalid tenant ID");
      }

      // Use the proper URL structure
      const apiUrl = `${getTransactionsUrl}/${tenantId}`;
      console.log("API URL being called:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // First handle non-200 responses
      if (!response.ok) {
        const errorMessage = `Server error: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Then try to parse JSON
      const responseData = await response.json();

      // Get transactions from the response
      const transactions = responseData.data || [];

      console.log(
        `Retrieved ${transactions.length} transactions for tenant ${tenantId}`
      );
      return transactions;
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      toast.error(
        `Failed to load transaction history: ${error.message}`,
        toastNoficationSettings
      );
      return [];
    } finally {
      setLoadingTransactions(false);
    }
  };

  // Helper function to verify API URL
  const verifyApiUrl = () => {
    // Check common issues with API URLs
    if (!getTransactionsUrl) {
      console.error("ERROR: getTransactionsUrl is undefined or empty!");
    } else if (getTransactionsUrl.includes("undefined")) {
      console.error(
        "ERROR: getTransactionsUrl contains 'undefined', suggesting a variable is not properly set!"
      );
    } else if (
      !getTransactionsUrl.startsWith("http://") &&
      !getTransactionsUrl.startsWith("https://") &&
      !getTransactionsUrl.startsWith("/")
    ) {
      console.warn(
        "WARNING: getTransactionsUrl doesn't start with http://, https://, or / - This might be incorrect!"
      );
    }

    // Verify the expected full URL pattern
    console.log(
      "Expected full URL pattern:",
      `${getTransactionsUrl}/{tenantId}`
    );
  };

  // Handle previous payment history button click
  const handleHistoryClick = async (tenantData) => {
    try {
      setLoading(true);

      // First verify the API URL configuration
      verifyApiUrl();

      // Set the current tenant data in state
      setSelectedTenant(tenantData);

      // Get the tenant ID (ensures compatibility with different data structures)
      const tenantId = tenantData?.id || tenantData?._id;

      if (!tenantId) {
        throw new Error("Invalid tenant ID");
      }

      console.log("Starting transaction fetch for tenant:", {
        tenantId,
        tenantName: tenantData?.name || "Unknown",
      });

      // Fetch transaction history from MongoDB
      const transactions = await fetchTenantTransactions(tenantId);

      if (!Array.isArray(transactions)) {
        console.error(
          "Expected array of transactions but got:",
          typeof transactions,
          transactions
        );
        throw new Error("Invalid transaction data format");
      }

      // Sort transactions by date (newest first)
      const sortedTransactions = transactions.sort((a, b) => {
        return (
          new Date(b.createdAt || Date.now()) -
          new Date(a.createdAt || Date.now())
        );
      });

      setTenantTransactions(sortedTransactions);
      setShowTransactionModal(true);
    } catch (error) {
      console.error("Error handling transaction history:", error);
      toast.error(
        `Failed to load transaction history: ${error.message}`,
        toastNoficationSettings
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const onEditTransaction = (tenant) => {
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

  // const deleteTransaction = async (transactionId) => {
  //   try {
  //     if (!transactionId) {
  //       throw new Error("Invalid transaction ID");
  //     }

  //     // Show confirmation dialog
  //     const confirmDelete = window.confirm(
  //       "Are you sure you want to delete this transaction? This action cannot be undone."
  //     );

  //     if (!confirmDelete) {
  //       console.log("Delete operation cancelled by user");
  //       return false;
  //     }

  //     setLoading(true);

  //     console.log(`Deleting transaction with ID: ${transactionId}`);

  //     const response = await fetch(
  //       `${deleteTransactionsUrl}/${transactionId}`,
  //       {
  //         method: "DELETE",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     // Handle non-OK responses
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(
  //         errorData.message ||
  //           `Server error: ${response.status} ${response.statusText}`
  //       );
  //     }

  //     const result = await response.json();

  //     toast.success(
  //       "Transaction deleted successfully",
  //       toastNoficationSettings
  //     );

  //     console.log("Delete transaction result:", result);

  //     // Return true to indicate successful deletion
  //     return true;
  //   } catch (error) {
  //     console.error("Error deleting transaction:", error);
  //     toast.error(
  //       `Failed to delete transaction: ${error.message}`,
  //       toastNoficationSettings
  //     );
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onDeleteTransaction = async (transaction) => {
    // Set the transaction to delete and show confirmation modal
    setTransactionToDelete(transaction);
    setShowConfirmModal(true);
  };

  // Process transaction deletion after confirmation
  const deleteTransaction = async (transaction) => {
    try {
      if (!transaction || !transaction._id) {
        throw new Error("Invalid transaction ID");
      }

      const transactionId = transaction._id;

      // Show loading state
      setLoading(true);

      console.log(`Deleting transaction with ID: ${transactionId}`);

      const response = await fetch(
        `${deleteTransactionsUrl}/${transactionId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete transaction");
      }

      toast.success(
        "Transaction deleted successfully",
        toastNoficationSettings
      );

      // 1. Remove transaction from tenantTransactions
      const updatedTransactions = tenantTransactions.filter(
        (t) => t._id !== transaction._id
      );
      setTenantTransactions(updatedTransactions);

      // 2. Find updated latest transaction for this tenant
      const tenantId = transaction.tenantId;
      const tenantRemainingTransactions = updatedTransactions
        .filter((t) => t.tenantId === tenantId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const latestTransaction = tenantRemainingTransactions[0];

      // 3. Update tenant data in the tenants list
      setTenants((prevTenants) =>
        prevTenants.map((tenant) => {
          if (tenant._id === tenantId) {
            return {
              ...tenant,
              status: latestTransaction?.rentStatus || "Due", // fallback
              dueDate: latestTransaction?.dueDate || null,
            };
          }
          return tenant;
        })
      );

      // 4. Optional: Close modal if it was open
      if (selectedTenant && selectedTenant._id === tenantId) {
        setSelectedTenant(null); // or closeModal()
      }

      return true;
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error(
        error.message || "Failed to delete transaction",
        toastNoficationSettings
      );
      return false;
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
      setTransactionToDelete(null);
    }
  };

  // If no hostel is set up, show message
  if (!loading && !hostel) {
    return <NoHostelMessage />;
  }

  return (
    <div
      className="w-full px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-slate-900
              via-slate-900 to-slate-900 p-5"
    >
      <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-10">
        {loading && tenants.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-purple-500" />
          </div>
        ) : !hostel || Object.keys(hostel).length === 0 ? (
          <NoHostelMessage />
        ) : (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 min-h-[70vh]">
            {/* Header */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">💰</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Fee Management
                  </h2>
                  <p className="text-gray-400">
                    Manage student fees, payments, and financial records
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedTenant(null);
                  setShowTenantFormModal(true);
                }}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-purple-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group"
              >
                <Plus
                  size={20}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
                Add New Payment
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-6 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-wrap">
                {/* Search Bar */}
                <div className="flex w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search tenant details..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 min-w-0 text-white bg-white/5 border border-white/20 rounded-l-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-r-lg hover:from-purple-600 hover:to-cyan-600 transition"
                  >
                    <FaSearch />
                  </button>
                </div>

                {/* Filter Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2 w-full sm:w-auto">
                  {/* Room Dropdown */}
                  <select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full cursor-pointer bg-white/5 border border-white/20 text-white text-sm rounded-md py-2 px-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Room</option>
                    <option value="Room 101">Room 101</option>
                    <option value="Room 201">Room 201</option>
                    <option value="Room 104">Room 104</option>
                  </select>

                  {/* Month Dropdown */}
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full cursor-pointer bg-white/5 border border-white/20 text-white text-sm rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    className="w-full cursor-pointer bg-white/5 border border-white/20 text-white text-sm rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 cursor-pointer text-white font-medium px-4 py-2 rounded-md text-sm hover:from-purple-600 hover:to-cyan-600 transition w-full sm:w-auto"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Table or No Data */}
            {tenants.length === 0 && !loading ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">💰</span>
                </div>
                <p className="text-xl font-semibold text-white mb-2">
                  No Payment Records Found
                </p>
                <p className="text-gray-400 mb-6">
                  Add your first payment record to get started with fee
                  management
                </p>
                <button
                  onClick={() => {
                    setSelectedTenant(null);
                    setShowTenantFormModal(true);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-purple-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 mx-auto"
                >
                  <Plus size={20} />
                  Add First Payment
                </button>
              </div>
            ) : (
              <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <PaginatedFeesTable
                    tenants={tenants}
                    handlePaymentClick={handlePaymentClick}
                    handleHistoryClick={handleHistoryClick}
                    loading={loading}
                    handlePageChange={handlePageChange}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                    pageNumber={pageNumber}
                    tenantPerPage={tenantPerPage}
                    totalTenants={totalTenants}
                    transactions={tenantTransactions}
                    paymentTransactions={paymentTransactions}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showTenantFormModal && (
        <TenantPaymentForm
          tenant={selectedTenant}
          setShowDetailsModal={setShowTenantFormModal}
          onSuccess={async (paymentDetails) => {
            try {
              // Save the payment to MongoDB (which auto-creates a transaction)
              await savePaymentToDatabase(paymentDetails); // ✅ Pass currentUser
              setShowTenantFormModal(false);
            } catch (error) {
              // Error is already handled in savePaymentToDatabase
              console.error("Payment process failed:", error);
            }
          }}
        />
      )}

      {/* Transaction History Modal */}
      {showTransactionModal && (
        <TenantTransactionModal
          showModal={showTransactionModal}
          setShowModal={setShowTransactionModal}
          tenantName={selectedTenant?.tenantName || ""}
          transactions={tenantTransactions}
          paymentTransactions={paymentTransactions}
          loading={loadingTransactions}
          onEditTransaction={onEditTransaction}
          onDeleteTransaction={onDeleteTransaction}
        />
      )}

      {/* Confirm Delete Modal */}
      {showConfirmModal && transactionToDelete && (
        <ConfirmModal
          title="Delete Transaction"
          message={`Are you sure you want to delete the transaction for ${
            transactionToDelete.tenantName || "this tenant"
          }? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => deleteTransaction(transactionToDelete)}
          onCancel={() => {
            setShowConfirmModal(false);
            setTransactionToDelete(null);
          }}
          icon={<AlertCircle className="h-6 w-6 text-red-600" />}
          confirmButtonClass="bg-red-600 hover:bg-red-700"
        />
      )}
    </div>
  );
};

export default FeesInfo;

import React, { useState, useEffect } from "react";
import { FaMoneyBillWave, FaHistory } from "react-icons/fa";
import {
  FaAngleDoubleLeft,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import TableHeading from "../../ui/Table/TableHeading";

const PaginatedFeesTable = ({
  tenants,
  handlePaymentClick,
  handleHistoryClick,
  loading,
  handlePageChange,
  handleItemsPerPageChange,
  itemsPerPage,
  totalItems,
  pageNumber,
  tenantPerPage,
  totalTenants,
  transactions,
  paymentTransactions,
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Local state to track tenant data with transaction information
  const [processedTenants, setProcessedTenants] = useState([]);

  // Process initial transactions and update tenant data
  useEffect(() => {
    if (!tenants || !transactions) return;

    // Map tenant data with their transaction information
    const processedData = tenants.map((tenant) => {
      // Get all transactions for this tenant
      const tenantTransactions = transactions
        .filter((tx) => tx.tenantId === tenant._id)
        .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));

      let dueDate = null;
      let rentStatus = "Due";
      let remarks = "";

      // Calculate next due date and status from most recent transaction
      if (tenantTransactions.length > 0) {
        const latestTransaction = tenantTransactions[0];

        // Get the due date from the latest transaction
        dueDate = latestTransaction.dueDate;

        // Get the rent status from the latest transaction
        rentStatus = latestTransaction.rentStatus;

        // Capture any remarks
        remarks = latestTransaction.remarks || "";
      }

      // Return processed tenant with transaction data
      return {
        ...tenant,
        processedDueDate: dueDate,
        processedRentStatus: rentStatus,
        remarks: remarks,
        transactions: tenantTransactions,
      };
    });

    setProcessedTenants(processedData);
  }, [tenants, transactions]);

  // Update only the specific tenant when payment transactions change
  useEffect(() => {
    // Verify we have valid payment transaction data with a tenant ID
    if (!paymentTransactions?.data || !paymentTransactions.data.tenantId)
      return;

    const paymentTenantId = paymentTransactions.data.tenantId;

    // Update only the specific tenant that matches the payment transaction ID
    setProcessedTenants((prevTenants) =>
      prevTenants.map((tenant) => {
        if (tenant._id === paymentTenantId) {
          console.log(
            `Updating tenant ${tenant.tenantName} with new payment data`
          );
          return {
            ...tenant,
            processedDueDate:
              paymentTransactions.data.dueDate || tenant.processedDueDate,
            processedRentStatus:
              paymentTransactions.data.rentStatus || tenant.processedRentStatus,
          };
        }
        return tenant;
      })
    );
  }, [paymentTransactions]);

  // Custom payment handler to handle payment action
  const handlePayment = (tenant) => {
    // Call the original handler for backend processing
    handlePaymentClick(tenant);
  };

  return (
    <div className="w-full">
      {/* Tenants Table */}
      <table className="min-w-[700px] w-full divide-y divide-white/10 text-sm">
        <TableHeading
          headingList={[
            "S.NO",
            "TENANT",
            "CONTACT",
            "ROOM",
            "JOIN DATE",
            "DUE DATE",
            "RENT",
            "STATUS",
            "ACTIONS",
          ]}
        />
        <tbody className="divide-y divide-slate-600/30 bg-slate-800/40">
          {loading ? (
            <tr>
              <td colSpan="9" className="py-10 text-center text-white">
                <div className="flex justify-center items-center">
                  <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
                  <span className="ml-3">Loading payment data...</span>
                </div>
              </td>
            </tr>
          ) : processedTenants.length === 0 ? (
            <tr>
              <td colSpan="9" className="py-10 text-center text-gray-300">
                No payment records found. Add your first payment to get started.
              </td>
            </tr>
          ) : (
            processedTenants.map((tenant, index) => {
              const dueDate = tenant.processedDueDate
                ? new Date(tenant.processedDueDate).toLocaleDateString()
                : "-";
              const rentStatus = tenant.processedRentStatus || "Due";
              const isOverdue =
                tenant.processedDueDate &&
                new Date(tenant.processedDueDate) < new Date() &&
                rentStatus === "Due";

              return (
                <tr
                  key={tenant._id}
                  className={`group relative hover:bg-white/10 transition-all duration-300 even:bg-white/5 cursor-pointer border-b border-white/5 ${
                    isOverdue ? "bg-red-900/20" : ""
                  }`}
                >
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-white font-medium">
                    <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg text-sm">
                      {(pageNumber - 1) * tenantPerPage + index + 1}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="line-clamp-1 text-white">
                        {tenant.tenantName || (
                          <span className="text-gray-400 italic">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-gray-300">
                    <div className="text-sm">
                      <div className="line-clamp-1 text-white">
                        {tenant.contact || (
                          <span className="text-gray-400 italic">
                            Not specified
                          </span>
                        )}
                      </div>
                      {tenant.email && (
                        <div className="text-xs text-cyan-400 mt-1 truncate max-w-[150px]">
                          {tenant.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg text-sm">
                      {tenant.roomNumber}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-gray-300">
                    <div className="text-sm">
                      <div className="line-clamp-1 text-white">
                        {tenant.moveInDate || tenant.joinDate ? (
                          "Joined"
                        ) : (
                          <span className="text-gray-400 italic">
                            Not specified
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-cyan-400 mt-1">
                        {tenant.moveInDate
                          ? new Date(tenant.moveInDate)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")
                          : tenant.joinDate
                          ? new Date(tenant.joinDate)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")
                          : "-"}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-gray-300">
                    <div className="text-sm">
                      <div
                        className={`line-clamp-1 ${
                          isOverdue ? "text-red-400 font-bold" : "text-white"
                        }`}
                      >
                        {dueDate !== "-" ? "Due on" : "Not set"}
                      </div>
                      {dueDate !== "-" && (
                        <div
                          className={`text-xs ${
                            isOverdue ? "text-red-400" : "text-cyan-400"
                          } mt-1`}
                        >
                          {dueDate}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-sm">
                      ₹{tenant.rentAmount}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    {rentStatus === "Paid" ? (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-medium border border-green-500/30">
                        Paid
                      </span>
                    ) : (
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                          isOverdue
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        }`}
                      >
                        {rentStatus}
                      </span>
                    )}
                  </td>
                  <td className="px-4 md:px-6 py-4 w-32">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handlePayment(tenant)}
                        title="Make Payment"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <FaMoneyBillWave size={18} />
                      </button>
                      <button
                        onClick={() => handleHistoryClick(tenant)}
                        title="View History"
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <FaHistory size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {!loading && processedTenants.length > 0 && (
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mt-6 gap-4 text-sm bg-black/30 p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-gray-300">Items per page:</span>
            <select
              value={tenantPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="bg-white/10 border border-white/20 text-white rounded-lg p-1 px-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {[5, 10, 20].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => handlePageChange(1)}
              disabled={pageNumber === 1}
              className={`p-2 border border-white/20 cursor-pointer rounded-lg transition ${
                pageNumber === 1
                  ? "text-gray-500 cursor-not-allowed bg-white/5"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber === 1}
              className={`p-2 border border-white/20 cursor-pointer rounded-lg transition ${
                pageNumber === 1
                  ? "text-gray-500 cursor-not-allowed bg-white/5"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <FaChevronLeft />
            </button>
            <span className="text-white px-2">
              Page <strong>{pageNumber}</strong> of{" "}
              <strong>{Math.ceil(totalTenants / tenantPerPage)}</strong>
            </span>
            <button
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={pageNumber === Math.ceil(totalTenants / tenantPerPage)}
              className={`p-2 border border-white/20 cursor-pointer rounded-lg transition ${
                pageNumber === Math.ceil(totalTenants / tenantPerPage)
                  ? "text-gray-500 cursor-not-allowed bg-white/5"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <FaChevronRight />
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.ceil(totalTenants / tenantPerPage))
              }
              disabled={pageNumber === Math.ceil(totalTenants / tenantPerPage)}
              className={`p-2 border border-white/20 cursor-pointer rounded-lg transition ${
                pageNumber === Math.ceil(totalTenants / tenantPerPage)
                  ? "text-gray-500 cursor-not-allowed bg-white/5"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedFeesTable;

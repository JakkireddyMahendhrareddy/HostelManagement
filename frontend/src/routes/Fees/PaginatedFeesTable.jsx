import React, { useState, useEffect } from "react";
import { FaMoneyBillWave, FaHistory } from "react-icons/fa";
import {
  FaAngleDoubleLeft,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleRight,
} from "react-icons/fa";

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
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Local state to track tenant data with transaction information
  const [processedTenants, setProcessedTenants] = useState([]);

  // Process transactions and update tenant data
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

  // Custom payment handler to update data immediately
  const handlePayment = (tenant) => {
    // Update the tenant in our processed list to show "Paid" immediately
    setProcessedTenants((prevTenants) =>
      prevTenants.map((t) => {
        if (t._id === tenant._id) {
          // Calculate new due date (typically one month from now)
          const currentDate = new Date();
          const newDueDate = new Date(currentDate);
          newDueDate.setMonth(currentDate.getMonth() + 1);

          return {
            ...t,
            processedRentStatus: "Paid",
            processedDueDate: newDueDate.toISOString(),
          };
        }
        return t;
      })
    );

    // Call the original handler for backend processing
    handlePaymentClick(tenant);
  };

  return (
    <div className="w-full">
      {/* Tenants Table */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
      ) : processedTenants.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-800">
            No tenants found. Did they ghost us? 👻
          </p>
        </div>
      ) : (
        <>
          <div className="w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 shadow-lg">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      S.NO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase ">
                      TENANT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      CONTACT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      ROOM
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      JOIN DATE
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      DUE DATE
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      RENT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      RENT STATUS
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processedTenants.map((tenant, index) => {
                    // Format due date for display
                    const dueDate = tenant.processedDueDate
                      ? new Date(tenant.processedDueDate).toLocaleDateString()
                      : "-";

                    // Determine rent status
                    const rentStatus = tenant.processedRentStatus || "Due";

                    // Check if rent is overdue
                    const isOverdue =
                      tenant.processedDueDate &&
                      new Date(tenant.processedDueDate) < new Date() &&
                      rentStatus === "Due";

                    return (
                      <tr
                        key={tenant._id}
                        className={`hover:bg-gray-100 group relative ${
                          isOverdue ? "bg-red-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {(pageNumber - 1) * tenantPerPage + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {tenant.tenantName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {tenant.contact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {tenant.roomNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-28">
                          {tenant.moveInDate
                            ? new Date(tenant.moveInDate).toLocaleDateString()
                            : tenant.joinDate
                            ? new Date(tenant.joinDate).toLocaleDateString()
                            : "-"}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isOverdue
                              ? "text-red-600 font-bold"
                              : "text-gray-900"
                          } w-28`}
                        >
                          {dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{tenant.rentAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rentStatus === "Paid" ? (
                            <span className="text-green-600 font-medium">
                              Paid
                            </span>
                          ) : (
                            <span
                              className={`font-medium ${
                                isOverdue ? "text-red-600" : "text-orange-500"
                              }`}
                            >
                              Due
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handlePayment(tenant)}
                              className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700 shadow-sm flex items-center gap-1 transition cursor-pointer"
                            >
                              <FaMoneyBillWave size={12} />
                              Pay
                            </button>
                            <button
                              onClick={() => handleHistoryClick(tenant)}
                              className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600 shadow-sm flex items-center gap-1 transition cursor-pointer"
                            >
                              <FaHistory size={12} />
                              Previous
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap justify-between items-center mt-6 text-sm">
              <div className="flex items-center mb-2 sm:mb-0">
                <span className="mr-2">Items per page:</span>
                <select
                  value={tenantPerPage}
                  onChange={(e) =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                  className="border rounded p-1 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={pageNumber === 1}
                  className={`p-2 border rounded ${
                    pageNumber === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaAngleDoubleLeft />
                </button>
                <button
                  onClick={() => handlePageChange(pageNumber - 1)}
                  disabled={pageNumber === 1}
                  className={`p-2 border rounded ${
                    pageNumber === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaChevronLeft />
                </button>
                <span>
                  Page <strong>{pageNumber}</strong> of{" "}
                  <strong>{Math.ceil(totalTenants / tenantPerPage)}</strong>
                </span>
                <button
                  onClick={() => handlePageChange(pageNumber + 1)}
                  disabled={
                    pageNumber === Math.ceil(totalTenants / tenantPerPage)
                  }
                  className={`p-2 border rounded ${
                    pageNumber === Math.ceil(totalTenants / tenantPerPage)
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaChevronRight />
                </button>
                <button
                  onClick={() =>
                    handlePageChange(Math.ceil(totalTenants / tenantPerPage))
                  }
                  disabled={
                    pageNumber === Math.ceil(totalTenants / tenantPerPage)
                  }
                  className={`p-2 border rounded ${
                    pageNumber === Math.ceil(totalTenants / tenantPerPage)
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FaAngleDoubleRight />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginatedFeesTable;

import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";

const TenantTransactionModal = ({
  showModal,
  setShowModal,
  tenantName,
  transactions,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-6 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                Transaction History for {tenantName}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5"
              >
                <RxCrossCircled className="text-2xl text-red-600 cursor-pointer hover:text-red-900" />
              </button>
            </div>

            {/* Transaction List */}
            <div className="space-y-4">
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col space-y-2"
                  >
                    <div>
                      <span className="font-medium">Transaction ID: </span>
                      <span>{transaction.transactionId}</span>
                    </div>
                    <div>
                      <span className="font-medium">Amount Paid: </span>
                      <span>{transaction.amountPaid}</span>
                    </div>
                    <div>
                      <span className="font-medium">Payment Mode: </span>
                      <span>{transaction.paymentMode}</span>
                    </div>
                    <div>
                      <span className="font-medium">Date: </span>
                      <span>{transaction.paymentDate}</span>
                    </div>
                    <div>
                      <span className="font-medium">Remarks: </span>
                      <span>{transaction.remarks || "N/A"}</span>
                    </div>
                    <button
                      onClick={() => handleEditClick(tenant)}
                      className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-300 shadow-sm flex items-center gap-1 transition cursor-pointer"
                    >
                      <FaEdit size={12} />
                      Edit
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No transactions found.
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end items-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantTransactionModal;

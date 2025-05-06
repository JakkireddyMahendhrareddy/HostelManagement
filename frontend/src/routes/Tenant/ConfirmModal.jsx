import React from "react";
import { FaTimes } from "react-icons/fa";

const ConfirmModal = ({ confirmType, confirmDelete, setShowConfirmModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Modal header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-800">
            Confirm Delete
          </h3>
          <button
            onClick={() => setShowConfirmModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal content */}
        <div className="mt-4">
          <p className="text-gray-700">
            Are you sure you want to delete this {confirmType || "item"}? This
            action cannot be undone.
          </p>
        </div>

        {/* Modal footer */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowConfirmModal(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

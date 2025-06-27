import React from "react";
import { X } from "lucide-react";

const MessDetailsModal = ({ menu, setShowDetailsModal }) => {
  if (!menu) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal positioning */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all w-full max-w-[95%] sm:my-8 sm:align-middle sm:max-w-2xl">
          <div className="bg-white px-6 py-6 sm:p-8 relative">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Mess Menu Details - {menu.day}
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* 🍳 Breakfast */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 flex items-center">
                  <span className="mr-2">🍳</span> Breakfast
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Menu Items
                    </h4>
                    <p className="text-gray-800 whitespace-pre-line">
                      {menu.breakfast || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Timing
                    </h4>
                    <p className="text-gray-800">
                      {menu.breakfastTime || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 🍲 Lunch */}
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-amber-800 mb-3 flex items-center">
                  <span className="mr-2">🍲</span> Lunch
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Menu Items
                    </h4>
                    <p className="text-gray-800 whitespace-pre-line">
                      {menu.lunch || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Timing
                    </h4>
                    <p className="text-gray-800">
                      {menu.lunchTime || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 🍽️ Dinner */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-3 flex items-center">
                  <span className="mr-2">🍽️</span> Dinner
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Menu Items
                    </h4>
                    <p className="text-gray-800 whitespace-pre-line">
                      {menu.dinner || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Timing
                    </h4>
                    <p className="text-gray-800">
                      {menu.dinnerTime || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="rounded-lg px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer font-semibold transition-colors"
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

export default MessDetailsModal;

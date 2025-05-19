import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { Tooltip as ReactTooltip } from "react-tooltip";

const MessFormModal = ({
  setShowMessFormModal,
  newMenu,
  handleMenuChange,
  handleMenuSubmit,
  isEditing,
  resetForm,
  formErrors,
  isSubmitting,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal positioning */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-6 py-6 sm:p-8">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-center text-gray-700">
                {isEditing ? "Edit Mess Menu" : "Create New Mess Menu"}
              </h2>
              <button
                onClick={() => setShowMessFormModal(false)}
                className="absolute top-5 right-5"
                data-tooltip-id="close-tooltip"
                data-tooltip-content="Close"
                disabled={isSubmitting}
              >
                <RxCrossCircled className="text-2xl text-red-600 cursor-pointer hover:text-red-900" />
              </button>
              <ReactTooltip
                id="close-tooltip"
                place="left"
                effect="solid"
                className="!bg-red-700 !text-white !text-sm !rounded-sm !px-3 !py-1 shadow-lg"
              />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleMenuSubmit();
              }}
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Day of Week
                  </label>
                  <select
                    name="day"
                    value={newMenu.day}
                    onChange={handleMenuChange}
                    className={`w-full p-3 border rounded-lg ${
                      formErrors.day ? "border-red-500" : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="">Select Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                  {formErrors.day && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.day}
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-2">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    Breakfast
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Menu Items
                      </label>
                      <textarea
                        name="breakfast.item"
                        value={newMenu.meals.breakfast.item}
                        onChange={handleMenuChange}
                        className={`w-full p-3 border rounded-lg ${
                          formErrors.breakfastItem
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        rows="2"
                        placeholder="Milk, Bread, Eggs, etc."
                        disabled={isSubmitting}
                        required
                      />
                      {formErrors.breakfastItem && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.breakfastItem}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Timing
                      </label>
                      <input
                        type="text"
                        name="breakfast.time"
                        value={newMenu.meals.breakfast.time}
                        onChange={handleMenuChange}
                        className={`w-full p-3 border rounded-lg ${
                          formErrors.breakfastTime
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="7:00 AM - 9:00 AM"
                        disabled={isSubmitting}
                        required
                      />
                      {formErrors.breakfastTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.breakfastTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-2">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    Lunch
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Menu Items
                      </label>
                      <textarea
                        name="lunch.item"
                        value={newMenu.meals.lunch.item}
                        onChange={handleMenuChange}
                        className={`w-full p-3 border rounded-lg ${
                          formErrors.lunchItem
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        rows="2"
                        placeholder="Rice, Dal, Vegetables, etc."
                        disabled={isSubmitting}
                        required
                      />
                      {formErrors.lunchItem && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.lunchItem}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Timing
                      </label>
                      <input
                        type="text"
                        name="lunch.time"
                        value={newMenu.meals.lunch.time}
                        onChange={handleMenuChange}
                        className={`w-full p-3 border rounded-lg ${
                          formErrors.lunchTime
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="12:30 PM - 2:30 PM"
                        disabled={isSubmitting}
                        required
                      />
                      {formErrors.lunchTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.lunchTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-2">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    Dinner
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Menu Items
                      </label>
                      <textarea
                        name="dinner.item"
                        value={newMenu.meals.dinner.item}
                        onChange={handleMenuChange}
                        className={`w-full p-3 border rounded-lg ${
                          formErrors.dinnerItem
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        rows="2"
                        placeholder="Roti, Sabzi, Curry, etc."
                        disabled={isSubmitting}
                        required
                      />
                      {formErrors.dinnerItem && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.dinnerItem}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Timing
                      </label>
                      <input
                        type="text"
                        name="dinner.time"
                        value={newMenu.meals.dinner.time}
                        onChange={handleMenuChange}
                        className={`w-full p-3 border rounded-lg ${
                          formErrors.dinnerTime
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="7:30 PM - 9:30 PM"
                        disabled={isSubmitting}
                        required
                      />
                      {formErrors.dinnerTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.dinnerTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {formErrors.general && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{formErrors.general}</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end items-center gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto rounded-lg border border-gray-300 px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                  disabled={isSubmitting}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer disabled:bg-blue-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Saving..."
                    : isEditing
                    ? "Update Menu"
                    : "Save Menu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessFormModal;

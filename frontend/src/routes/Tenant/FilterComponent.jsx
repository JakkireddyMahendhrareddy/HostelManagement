import React, { useState } from "react";

const FilterComponent = ({ filterOpen, onFilterChange, onResetFilters }) => {
  // Initialize filter state
  const [filters, setFilters] = useState({
    roomNumber: "",
    joinDateFrom: "",
    joinDateTo: "",
    rentAmountMin: "",
    rentAmountMax: "",
  });

  // Handle change in input fields
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    onFilterChange(filters); // Pass the updated filters to the parent
  };

  // Handle reset button
  const resetFilters = () => {
    setFilters({
      roomNumber: "",
      joinDateFrom: "",
      joinDateTo: "",
      rentAmountMin: "",
      rentAmountMax: "",
    });
    onResetFilters(); // Trigger reset in parent
  };

  return (
    filterOpen && (
      <div className="p-4 border rounded-lg bg-gray-50">
        <h3 className="font-medium mb-3">Filter Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Numbers
            </label>
            <input
              type="text"
              name="roomNumber"
              value={filters.roomNumber}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Join Date From
            </label>
            <input
              type="date"
              name="joinDateFrom"
              value={filters.joinDateFrom}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Join Date To
            </label>
            <input
              type="date"
              name="joinDateTo"
              value={filters.joinDateTo}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Rent
            </label>
            <input
              type="number"
              name="rentAmountMin"
              value={filters.rentAmountMin}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Rent
            </label>
            <input
              type="number"
              name="rentAmountMax"
              value={filters.rentAmountMax}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
          >
            Reset Filters
          </button>
        </div>
      </div>
    )
  );
};

export default FilterComponent;


{/* Filter Panel */}
            {/* {filterOpen && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-medium mb-3">Filter Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Numbers
                    </label>
                    <input
                      type="text"
                      name="roomNumber"
                      value={filters.roomNumber}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Join Date From
                    </label>
                    <input
                      type="date"
                      name="joinDateFrom"
                      value={filters.joinDateFrom}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Join Date To
                    </label>
                    <input
                      type="date"
                      name="joinDateTo"
                      value={filters.joinDateTo}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Rent
                    </label>
                    <input
                      type="number"
                      name="rentAmountMin"
                      value={filters.rentAmountMin}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Rent
                    </label>
                    <input
                      type="number"
                      name="rentAmountMax"
                      value={filters.rentAmountMax}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )} */}
// TenantFilters.jsx
import React, { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";

const TenantFilters = ({ onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    rentMin: "",
    rentMax: "",
    joinDateFrom: "",
    joinDateTo: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const resetFilters = () => {
    const resetValues = {
      status: "",
      rentMin: "",
      rentMax: "",
      joinDateFrom: "",
      joinDateTo: "",
    };
    setFilters(resetValues);
    if (onFilterChange) {
      onFilterChange(resetValues);
    }
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer flex items-center space-x-2 hover:bg-gray-200"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FunnelIcon className="h-5 w-5" />
        <span>Filter</span>
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-2 py-1 border rounded-md text-sm"
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rent Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="rentMin"
                placeholder="Min"
                value={filters.rentMin}
                onChange={handleFilterChange}
                className="w-1/2 px-2 py-1 border rounded-md text-sm"
              />
              <input
                type="number"
                name="rentMax"
                placeholder="Max"
                value={filters.rentMax}
                onChange={handleFilterChange}
                className="w-1/2 px-2 py-1 border rounded-md text-sm"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Join Date
            </label>
            <div className="mb-2">
              <label className="text-xs text-gray-500">From:</label>
              <input
                type="date"
                name="joinDateFrom"
                value={filters.joinDateFrom}
                onChange={handleFilterChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">To:</label>
              <input
                type="date"
                name="joinDateTo"
                value={filters.joinDateTo}
                onChange={handleFilterChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={resetFilters}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
            >
              Reset
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantFilters;

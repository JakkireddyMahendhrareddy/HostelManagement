// FeesFilters.jsx
import React, { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";

const FeesFilters = ({ onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    rentMin: "",
    rentMax: "",
    paidMin: "",
    paidMax: "",
    paymentMode: "",
    dueFrom: "",
    dueTo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const resetFilters = {
      status: "",
      rentMin: "",
      rentMax: "",
      paidMin: "",
      paidMax: "",
      paymentMode: "",
      dueFrom: "",
      dueTo: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
    setShowFilters(false);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FunnelIcon className="h-5 w-5 text-gray-600" />
        <span>Filters</span>
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 p-4">
          <h3 className="font-semibold mb-2">Filter Payments</h3>

          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="">All</option>
              <option value="Paid">Paid</option>
              <option value="Due">Due</option>
              <option value="Partial">Partial</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">
              Payment Mode
            </label>
            <select
              name="paymentMode"
              value={filters.paymentMode}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="">All</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Card</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Min Rent
              </label>
              <input
                type="number"
                name="rentMin"
                value={filters.rentMin}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="₹"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Max Rent
              </label>
              <input
                type="number"
                name="rentMax"
                value={filters.rentMax}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="₹"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Min Paid
              </label>
              <input
                type="number"
                name="paidMin"
                value={filters.paidMin}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="₹"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Max Paid
              </label>
              <input
                type="number"
                name="paidMax"
                value={filters.paidMax}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="₹"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Due From
              </label>
              <input
                type="date"
                name="dueFrom"
                value={filters.dueFrom}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Due To</label>
              <input
                type="date"
                name="dueTo"
                value={filters.dueTo}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>

          <div className="flex justify-between mt-3">
            <button
              className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              onClick={resetFilters}
            >
              Reset
            </button>
            <button
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={applyFilters}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesFilters;

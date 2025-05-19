import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const MessTable = ({ loading, messDetails }) => {
  // Calculate total pages

  console.log(messDetails, "................");

  return (
    <div className="w-full bg-white">
      {/* Tenants Table */}
      {loading ? (
        <div className="flex justify-start items-start h-60">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        </div>
      ) : messDetails.length === 0 ? (
        <div className="text-start py-10">
          <p className="text-gray-800 text-center">
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
                    <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-16">
                      S.NO
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-16">
                      DAY
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-16">
                      BREAKFAST
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-16">
                      LUNCH
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-16">
                      DINNER
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-bold text-blue-600 uppercase tracking-wider w-16">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(messDetails).map(([day, meals], index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {day}
                      </td>
                      <td className="px-6 py-4 whitespace text-sm text-gray-900">
                        {meals.breakfast} 
                      </td>
                      <td className="px-6 py-4 whitespace text-sm text-gray-900">
                        {meals.lunch} 
                      </td>
                      <td className="px-6 py-4 whitespace text-sm text-gray-900">
                        {meals.dinner} 
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        <div className="flex justify-center gap-3">
                          <button className="text-blue-600 hover:text-blue-800">
                            <FaEye />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <FaEdit />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MessTable;

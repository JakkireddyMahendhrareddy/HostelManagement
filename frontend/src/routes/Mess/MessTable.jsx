import React from "react";

import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
const MessTable = ({
  menuData,
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
  loading,
}) => {
  // Sort days of week in order
  const daysOrder = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  const sortedMenuData = [...menuData].sort(
    (a, b) => daysOrder[a.day] - daysOrder[b.day]
  );

  return (
    <div className="overflow-x-auto divide-y divide-gray-200  border border-gray-200 rounded-lg border-t-0">
      <table className="min-w-full bg-white  border border-gray-200 shadow-md  overflow-hidden">
        <thead className="bg-blue-500 text-white ">
          <tr>
            <th className="py-3 px-4 text-left font-semibold">Day</th>
            <th className="py-3 px-4 text-left font-semibold">Breakfast</th>
            <th className="py-3 px-4 text-left font-semibold">Lunch</th>
            <th className="py-3 px-4 text-left font-semibold">Dinner</th>
            <th className="py-3 px-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="py-10 text-center text-gray-500">
                <div className="flex justify-center items-center">
                  <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
                  <span className="ml-2">Loading menu data...</span>
                </div>
              </td>
            </tr>
          ) : sortedMenuData.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-10 text-center text-gray-500">
                No mess menu data available
              </td>
            </tr>
          ) : (
            sortedMenuData.map((menu) => (
              <tr
                key={menu.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {menu.day}
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-600">
                    {menu.breakfast ? (
                      <div className="line-clamp-1">{menu.breakfast}</div>
                    ) : (
                      <span className="text-gray-400 italic">
                        Not specified
                      </span>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      {menu.breakfastTime || "No time specified"}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-600">
                    {menu.lunch ? (
                      <div className="line-clamp-1">{menu.lunch}</div>
                    ) : (
                      <span className="text-gray-400 italic">
                        Not specified
                      </span>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      {menu.lunchTime || "No time specified"}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-gray-600">
                    {menu.dinner ? (
                      <div className="line-clamp-1">{menu.dinner}</div>
                    ) : (
                      <span className="text-gray-400 italic">
                        Not specified
                      </span>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      {menu.dinnerTime || "No time specified"}
                    </div>
                  </div>
                </td>
                {/* <td className="py-3 px-4">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handleViewClick(menu)}
                      className="p-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditClick(menu)}
                      className="p-1.5 bg-amber-100 text-amber-600 rounded-md hover:bg-amber-200 transition-colors"
                      title="Edit Menu"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(menu.id)}
                      className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                      title="Delete Menu"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text- text-gray-900 w-32">
                  <div className="flex justify-start space-x-5">
                    <button
                      onClick={() => handleViewClick(menu)}
                      className="text-gray-700 hover:text-gray-900 cursor-pointer"
                      title="View"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditClick(menu)}
                      className="text-gray-700 hover:text-gray-900 cursor-pointer"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(menu.id)}
                      className="text-gray-700 hover:text-gray-900 cursor-pointer"
                      title="Delete"
                    >
                      <AiFillDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessTable;

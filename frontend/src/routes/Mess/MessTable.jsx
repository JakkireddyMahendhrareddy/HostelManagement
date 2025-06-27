import React from "react";

import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import TableHeading from "../../ui/Table/TableHeading";
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
    <div className="w-full mt-0 overflow-x-auto rounded-xl border border-white/20 shadow-2xl mx-auto bg-white/5 backdrop-blur-sm">
      <table className="min-w-[700px] w-full divide-y divide-white/10 text-sm">
        <TableHeading
          headingList={["Day", "breakfast", "Lunch", "dinner", "actoins"]}
        />

        <tbody className="divide-y divide-slate-600/30 bg-slate-800/40">
          {loading ? (
            <tr>
              <td colSpan="5" className="py-10 text-center text-white">
                <div className="flex justify-center items-center">
                  <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
                  <span className="ml-3">Loading menu data...</span>
                </div>
              </td>
            </tr>
          ) : sortedMenuData.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-10 text-center text-gray-300">
                No mess menu data available
              </td>
            </tr>
          ) : (
            sortedMenuData.map((menu, index) => (
              <tr
                key={menu.id}
                className="group relative hover:bg-white/10 transition-all duration-300 even:bg-white/5 cursor-pointer border-b border-white/5"
              >
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-white font-medium">
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg text-sm">
                    {menu.day}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-gray-300">
                  <div className="text-sm">
                    {menu.breakfast ? (
                      <div className="line-clamp-1 text-white">
                        {menu.breakfast}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">
                        Not specified
                      </span>
                    )}
                    <div className="text-xs text-cyan-400 mt-1">
                      {menu.breakfastTime || "No time specified"}
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 text-gray-300">
                  <div className="text-sm">
                    {menu.lunch ? (
                      <div className="line-clamp-1 text-white">
                        {menu.lunch}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">
                        Not specified
                      </span>
                    )}
                    <div className="text-xs text-cyan-400 mt-1">
                      {menu.lunchTime || "No time specified"}
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 text-gray-300">
                  <div className="text-sm">
                    {menu.dinner ? (
                      <div className="line-clamp-1 text-white">
                        {menu.dinner}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">
                        Not specified
                      </span>
                    )}
                    <div className="text-xs text-cyan-400 mt-1">
                      {menu.dinnerTime || "No time specified"}
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 w-32">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleViewClick(menu)}
                      title="View Details"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditClick(menu)}
                      title="Edit Menu"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(menu.id)}
                      title="Delete Menu"
                      className="text-red-400 hover:text-red-300 transition-colors"
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

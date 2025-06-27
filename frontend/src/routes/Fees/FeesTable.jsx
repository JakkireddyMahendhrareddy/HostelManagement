import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import TableHeading from "../../ui/Table/TableHeading";

// Status styling with the new dark theme
const statusColors = {
  Paid: "bg-green-500/20 text-green-400 border-green-500/30",
  "Partially Paid": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Overdue: "bg-red-500/20 text-red-400 border-red-500/30",
  Waived: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Refunded: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const FeesTable = ({
  fees,
  handleDeleteClick,
  loading,
  handleEditClick,
  handleViewClick,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const truncateText = (text, maxLength = 30) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="w-full mt-2 overflow-x-auto rounded-xl border border-white/20 shadow-2xl mx-auto bg-white/5 backdrop-blur-sm">
      <table className="min-w-[700px] w-full divide-y divide-white/10 text-sm">
        <TableHeading
          headingList={[
            "Student Name",
            "Room No.",
            "Fee Type",
            "Amount",
            "Status",
            "Due Date",
            "Actions",
          ]}
        />
        <tbody className="divide-y divide-slate-600/30 bg-slate-800/40">
          {loading ? (
            <tr>
              <td colSpan="7" className="py-4 px-4 text-center text-white">
                <div className="flex justify-center items-center">
                  <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
                  <span className="ml-2">Loading...</span>
                </div>
              </td>
            </tr>
          ) : fees.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-4 px-4 text-center text-gray-300">
                No fee records found
              </td>
            </tr>
          ) : (
            fees.map((fee, index) => (
              <tr
                key={fee._id}
                className="group relative hover:bg-white/10 transition-all duration-300 even:bg-white/5 cursor-pointer border-b border-white/5"
              >
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
                  {fee.studentName || "N/A"}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-white font-medium">
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg text-sm">
                    {fee.roomNo || "N/A"}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
                  {fee.feeType || "N/A"}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
                  {formatCurrency(fee.amount)}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      statusColors[fee.status] ||
                      "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {fee.status || "Pending"}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
                  {formatDate(fee.dueDate)}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-start space-x-4">
                    <button
                      onClick={() => handleViewClick(fee)}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="View Details"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditClick(fee)}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                      title="Edit Fee"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(fee._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Fee"
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

export default FeesTable;

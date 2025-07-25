import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import TableHeading from "../../ui/Table/TableHeading";

// Status and priority styling with the new dark theme
const statusColors = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Resolved: "bg-green-500/20 text-green-400 border-green-500/30",
  Completed: "bg-green-500/20 text-green-400 border-green-500/30",
  Cancelled: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

const priorityColors = {
  Low: "bg-green-500/20 text-green-400 border-green-500/30",
  Medium: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  High: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Critical: "bg-red-500/20 text-red-400 border-red-500/30",
  Urgent: "bg-red-500/20 text-red-400 border-red-500/30",
};

const MaintenanceTable = ({
  issues,
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

  const truncateText = (text, maxLength = 30) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="w-full mt-0  overflow-x-auto rounded-xl border border-white/20 shadow-2xl mx-auto bg-white/5 backdrop-blur-sm">
      <table className="min-w-[700px] w-full divide-y divide-white/10 text-sm">
        <TableHeading
          headingList={[
            "Room No.",
            "Issue",
            "Status",
            "Priority",
            "Requested By",
            "Created Date",
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
          ) : issues.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-4 px-4 text-center text-gray-300">
                No maintenance issues found
              </td>
            </tr>
          ) : (
            issues.map((issue, index) => (
              <tr
                key={issue._id}
                className="group relative hover:bg-white/10 transition-all duration-300 even:bg-white/5 cursor-pointer border-b border-white/5"
              >
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-white font-medium">
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg text-sm">
                    {issue.roomNo || "N/A"}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
                  {truncateText(issue.issue)}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      statusColors[issue.status] ||
                      "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {issue.status || "Pending"}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      priorityColors[issue.priority] ||
                      "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}
                  >
                    {issue.priority || "Medium"}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
                  {issue.requestedBy || "N/A"}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
                  {formatDate(issue.createdDate)}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-start space-x-4">
                    <button
                      onClick={() => handleViewClick(issue)}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="View Details"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditClick(issue)}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                      title="Edit Issue"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(issue._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Issue"
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

export default MaintenanceTable;

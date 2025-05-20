import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-green-100 text-green-800",
  Cancelled: "bg-gray-100 text-gray-800",
};

const priorityColors = {
  Low: "bg-blue-100 text-blue-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
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
    <div className="overflow-x-auto divide-y divide-gray-200 border border-gray-200 rounded-lg border-t-0">
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-4 border-b text-left">Room</th>
            <th className="py-3 px-4 border-b text-left">Issue</th>
            <th className="py-3 px-4 border-b text-left">Status</th>
            <th className="py-3 px-4 border-b text-left">Priority</th>
            <th className="py-3 px-4 border-b text-left">Requested</th>
            <th className="py-3 px-4 border-b text-left">Date</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {loading ? (
            <tr>
              <td colSpan="7" className="py-4 px-4 text-center">
                <div className="flex justify-center items-center">
                  <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
                  <span className="ml-2">Loading...</span>
                </div>
              </td>
            </tr>
          ) : issues.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-4 px-4 text-center text-gray-500">
                No maintenance issues found
              </td>
            </tr>
          ) : (
            issues.map((issue) => (
              <tr
                key={issue._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{issue.roomNo || "N/A"}</td>
                <td className="py-3 px-4">{truncateText(issue.issue)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[issue.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {issue.status || "Pending"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      priorityColors[issue.priority] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {issue.priority || "Medium"}
                  </span>
                </td>
                <td className="py-3 px-4">{issue.requestedBy || "N/A"}</td>
                <td className="py-3 px-4">{formatDate(issue.createdDate)}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-start space-x-5">
                    <button
                      onClick={() => handleViewClick(issue)}
                      className="text-gray-700 hover:text-gray-900 cursor-pointer"
                      title="View"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditClick(issue)}
                      className="text-gray-700 hover:text-gray-900 cursor-pointer"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(issue._id)}
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

export default MaintenanceTable;

import React from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  FaAngleDoubleLeft,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import TableHeading from "../../ui/Table/TableHeading";

const PaginatedTenantTable = ({
  tenants,
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
  loading,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  handleSort,
  sortConfig,
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  return (
    <div className="w-full">
      {/* Tenants Table */}
      <div className="w-full mt-0 overflow-x-auto rounded-xl border border-white/20 shadow-2xl mx-auto bg-white/5 backdrop-blur-sm">
        <table className="min-w-[700px] w-full divide-y divide-white/10 text-sm">
          <TableHeading
            headingList={[
              "S.No",
              "Tenant",
              "Contact",
              "Room",
              "join Date",
              "Rent",
              "Actions",
            ]}
          />

          <tbody className="divide-y divide-slate-600/30 bg-slate-800/40">
            {loading ? (
              <tr>
                <td colSpan="7" className="py-10 text-center text-white">
                  <div className="flex justify-center items-center">
                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
                    <span className="ml-3">Loading tenant data...</span>
                  </div>
                </td>
              </tr>
            ) : tenants.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10 text-center text-gray-300">
                  No tenants found. Add your first tenant to get started.
                </td>
              </tr>
            ) : (
              tenants.map((tenant, index) => (
                <tr
                  key={tenant._id || index}
                  className="group relative hover:bg-white/10 transition-all duration-300 even:bg-white/5 cursor-pointer border-b border-white/5"
                >
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-white font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-white">
                    <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg text-sm">
                      {tenant.tenantName}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-gray-300">
                    {tenant.contact}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-gray-300">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg text-sm">
                      {tenant.roomNumber}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-gray-300">
                    <div className="text-sm">
                      <div className="text-xs text-cyan-400 mt-1">
                        {tenant.moveInDate
                          ? new Date(tenant.moveInDate)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")
                          : tenant.joinDate
                          ? new Date(tenant.joinDate)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")
                          : "-"}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-gray-300">
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-sm">
                      ₹{tenant.rentAmount}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 w-32">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleViewClick(tenant)}
                        title="View Details"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <FaEye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditClick(tenant)}
                        title="Edit Tenant"
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(tenant._id)}
                        title="Delete Tenant"
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

      {/* Pagination Controls */}
      {!loading && tenants.length > 0 && (
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mt-6 gap-4 text-sm bg-black/30 p-4 rounded-xl border border-white/10">
          {/* Items Per Page Selector */}
          <div className="flex items-center gap-2">
            <span className="text-gray-300">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="bg-white/10 border border-white/20 text-white rounded-lg p-1 px-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className={`p-2 border border-white/20 cursor-pointer rounded-lg transition ${
                currentPage === 1
                  ? "text-gray-500 cursor-not-allowed bg-white/5"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 border border-white/20 cursor-pointer rounded-lg transition ${
                currentPage === 1
                  ? "text-gray-500 cursor-not-allowed bg-white/5"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <FaChevronLeft />
            </button>
            <span className="text-white px-2">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 border border-white/20 cursor-pointer rounded-lg transition ${
                currentPage === totalPages
                  ? "text-gray-500 cursor-not-allowed bg-white/5"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <FaChevronRight />
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`p-2 border border-white/20 cursor-pointer rounded-lg transition ${
                currentPage === totalPages
                  ? "text-gray-500 cursor-not-allowed bg-white/5"
                  : "hover:bg-white/10 text-white"
              }`}
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedTenantTable;

{
  /* <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 sm:px-4 md:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    S.No
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Tenant
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Contact
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Room
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Join Date
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Rent
                  </th>
                  <th className="px-2 sm:px-4 md:px-6 py-3 font-semibold text-gray-700 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead> */
}

// Table.jsx - Main Table Component
// import React from 'react';
// import { FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// // Main Table Container
// export const Table = ({ children, className = "" }) => {
//   return (
//     <div className={`w-full mt-4 overflow-x-auto rounded-xl border border-slate-600/30 shadow-lg backdrop-blur-sm ${className}`}>
//       <table className="min-w-[700px] w-full divide-y divide-slate-600/30 text-sm text-left">
//         {children}
//       </table>
//     </div>
//   );
// };

// // Table Heading Component
// export const TableHeading = ({ headings, className = "" }) => {
//   return (
//     <thead className={`bg-gradient-to-r from-slate-800/80 to-purple-900/60 ${className}`}>
//       <tr>
//         {headings.map((heading, index) => (
//           <th
//             key={index}
//             className="px-2 sm:px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider border-b border-slate-600/30"
//           >
//             {heading}
//           </th>
//         ))}
//       </tr>
//     </thead>
//   );
// };

// // Table Body Component
// export const TableBody = ({ children, className = "" }) => {
//   return (
//     <tbody className={`divide-y divide-slate-600/20 bg-gradient-to-b from-slate-800/40 to-purple-900/20 ${className}`}>
//       {children}
//     </tbody>
//   );
// };

// // Table Row Component
// export const TableRow = ({ children, onClick, className = "", hover = true }) => {
//   return (
//     <tr
//       onClick={onClick}
//       className={`
//         ${hover ? 'hover:bg-slate-700/50 hover:shadow-md transition-all duration-200' : ''}
//         ${onClick ? 'cursor-pointer' : ''}
//         group
//         ${className}
//       `}
//     >
//       {children}
//     </tr>
//   );
// };

// // Table Cell Component
// export const TableCell = ({ children, className = "", ...props }) => {
//   return (
//     <td
//       className={`px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap text-gray-200 ${className}`}
//       {...props}
//     >
//       {children}
//     </td>
//   );
// };

// // Action Buttons Component
// export const ActionButtons = ({ actions, className = "" }) => {
//   return (
//     <TableCell className={className}>
//       <div className="flex space-x-3">
//         {actions.map((action, index) => (
//           <button
//             key={index}
//             onClick={action.onClick}
//             className={`
//               text-gray-400 cursor-pointer hover:text-white transition-colors duration-200
//               hover:scale-110 transform
//               ${action.className || ''}
//             `}
//             title={action.title}
//             disabled={action.disabled}
//           >
//             {action.icon}
//           </button>
//         ))}
//       </div>
//     </TableCell>
//   );
// };

// // Status Badge Component
// export const StatusBadge = ({ status, variant = "default", className = "" }) => {
//   const variants = {
//     success: "bg-green-500/20 text-green-400 border-green-500/30",
//     warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
//     error: "bg-red-500/20 text-red-400 border-red-500/30",
//     info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
//     default: "bg-gray-500/20 text-gray-400 border-gray-500/30"
//   };

//   return (
//     <span className={`
//       inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
//       border backdrop-blur-sm
//       ${variants[variant]}
//       ${className}
//     `}>
//       {status}
//     </span>
//   );
// };

// // Pagination Component
// export const Pagination = ({
//   currentPage,
//   totalPages,
//   itemsPerPage,
//   onPageChange,
//   onItemsPerPageChange,
//   className = ""
// }) => {
//   return (
//     <div className={`flex flex-col sm:flex-row flex-wrap justify-between items-center mt-6 gap-4 text-sm ${className}`}>
//       {/* Items Per Page Selector */}
//       <div className="flex items-center gap-2">
//         <span className="text-gray-300">Items per page:</span>
//         <select
//           value={itemsPerPage}
//           onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
//           className="border border-slate-600/50 rounded-md p-1 px-2 text-gray-200 bg-slate-800/60 cursor-pointer
//                      focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm"
//         >
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={50}>50</option>
//         </select>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center gap-2 flex-wrap justify-center">
//         <button
//           onClick={() => onPageChange(1)}
//           disabled={currentPage === 1}
//           className={`p-2 border border-slate-600/50 cursor-pointer rounded-md transition-all duration-200 ${
//             currentPage === 1
//               ? "text-gray-500 cursor-not-allowed bg-slate-800/30"
//               : "hover:bg-slate-700/50 text-gray-300 hover:text-white hover:border-purple-500/50"
//           }`}
//         >
//           <FaAngleDoubleLeft />
//         </button>
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`p-2 border border-slate-600/50 cursor-pointer rounded-md transition-all duration-200 ${
//             currentPage === 1
//               ? "text-gray-500 cursor-not-allowed bg-slate-800/30"
//               : "hover:bg-slate-700/50 text-gray-300 hover:text-white hover:border-purple-500/50"
//           }`}
//         >
//           <FaChevronLeft />
//         </button>
//         <span className="text-gray-300 px-3 py-2 bg-slate-800/40 rounded-md border border-slate-600/30">
//           Page <strong className="text-purple-400">{currentPage}</strong> of{" "}
//           <strong className="text-purple-400">{totalPages}</strong>
//         </span>
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`p-2 border border-slate-600/50 cursor-pointer rounded-md transition-all duration-200 ${
//             currentPage === totalPages
//               ? "text-gray-500 cursor-not-allowed bg-slate-800/30"
//               : "hover:bg-slate-700/50 text-gray-300 hover:text-white hover:border-purple-500/50"
//           }`}
//         >
//           <FaChevronRight />
//         </button>
//         <button
//           onClick={() => onPageChange(totalPages)}
//           disabled={currentPage === totalPages}
//           className={`p-2 border border-slate-600/50 cursor-pointer rounded-md transition-all duration-200 ${
//             currentPage === totalPages
//               ? "text-gray-500 cursor-not-allowed bg-slate-800/30"
//               : "hover:bg-slate-700/50 text-gray-300 hover:text-white hover:border-purple-500/50"
//           }`}
//         >
//           <FaAngleDoubleRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Usage Example:
// /*
// import { Table, TableHeading, TableBody, TableRow, TableCell, ActionButtons, StatusBadge, Pagination } from './Table';
// import { FaEye, FaEdit, AiFillDelete } from 'react-icons/fa';

// const MyTableComponent = () => {
//   const handleView = (item) => console.log('View:', item);
//   const handleEdit = (item) => console.log('Edit:', item);
//   const handleDelete = (id) => console.log('Delete:', id);

//   return (
//     <>
//       <Table>
//         <TableHeading
//           headings={["Room No.", "Room Type", "Beds", "Available Beds", "Room Rent", "Status", "Actions"]}
//         />
//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={item.id}>
//               <TableCell>{item.roomNo}</TableCell>
//               <TableCell>{item.roomType}</TableCell>
//               <TableCell>{item.beds}</TableCell>
//               <TableCell>{item.availableBeds}</TableCell>
//               <TableCell>₹{item.rent}</TableCell>
//               <TableCell>
//                 <StatusBadge
//                   status={item.status}
//                   variant={item.status === 'Available' ? 'success' : 'error'}
//                 />
//               </TableCell>
//               <ActionButtons
//                 actions={[
//                   {
//                     icon: <FaEye size={16} />,
//                     onClick: () => handleView(item),
//                     title: "View",
//                     className: "hover:text-blue-400"
//                   },
//                   {
//                     icon: <FaEdit size={16} />,
//                     onClick: () => handleEdit(item),
//                     title: "Edit",
//                     className: "hover:text-green-400"
//                   },
//                   {
//                     icon: <AiFillDelete size={16} />,
//                     onClick: () => handleDelete(item.id),
//                     title: "Delete",
//                     className: "hover:text-red-400"
//                   }
//                 ]}
//               />
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         itemsPerPage={itemsPerPage}
//         onPageChange={setCurrentPage}
//         onItemsPerPageChange={setItemsPerPage}
//       />
//     </>
//   );
// };
// */

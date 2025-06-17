import React from "react";
import Table from "../../ui/Table/Table";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const HostelAndRoomDetails = ({
  setIsEditingHostel,
  hostel,
  handleDeleteHostelClick,
  setShowRoomFormModal,
  setEditRoomId,
  setNewRoom,
  displayedRooms,
  editRoom,
  handleDeleteRoomClick,
  setPageNumber,
  rooms,
  pageNumber,
  totalPages,
}) => {
  return (
    // <div className="w-full max-w-7xl mx-auto px-4 py-6">
    //   {/* Header: Hostel Overview + Action Buttons */}
    //   <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
    //     <h2 className="text-2xl font-semibold text-gray-700">
    //       Hostel Overview
    //     </h2>
    //     <div className="flex gap-4 flex-wrap">
    //       <button
    //         onClick={() => setIsEditingHostel(true)}
    //         className="text-blue-500 border-2 border-blue-500 px-4 py-1.5 rounded-lg flex items-center gap-2 hover:scale-105 transition"
    //       >
    //         <FaEdit size={18} />
    //         Edit
    //       </button>
    //       <button
    //         onClick={handleDeleteHostelClick}
    //         className="bg-blue-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 hover:scale-105 transition"
    //       >
    //         <FaTrash size={18} />
    //         Delete
    //       </button>
    //     </div>
    //   </div>

    //   {/* Hostel Details Card */}
    //   <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-5 rounded-2xl border border-gray-300 bg-white shadow-md text-lg grid gap-4">
    //     <p className="text-gray-700">
    //       Hostel Name:{" "}
    //       <span className="font-semibold text-xl">{hostel.name}</span>
    //     </p>
    //     <p className="text-gray-700">
    //       Category:{" "}
    //       <span className="font-semibold text-xl">{hostel.category}</span>
    //     </p>
    //     <p className="text-gray-700">
    //       Rooms:{" "}
    //       <span className="font-semibold text-xl">{hostel.totalRooms}</span>
    //     </p>
    //     <p className="text-gray-700">
    //       Max Capacity:{" "}
    //       <span className="font-semibold text-xl">{hostel.maxCapacity}</span>
    //     </p>
    //   </div>

    //   {/* Rooms List Section */}
    //   <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-4 mt-6 space-y-4">
    //     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    //       <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
    //         Rooms List
    //       </h3>
    //       <button
    //         onClick={() => {
    //           setShowRoomFormModal(true);
    //           setEditRoomId(null);
    //           setNewRoom({
    //             number: "",
    //             type: "",
    //             beds: "",
    //             availableBeds: "",
    //             rent: "",
    //             status: "available",
    //           });
    //         }}
    //         className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 hover:scale-105 transition"
    //       >
    //         <FaPlus className="text-white" />
    //         Add New Room
    //       </button>
    //     </div>

    //     {/* Rooms Table */}
    //     <div className="overflow-x-auto">
    //       <Table
    //         headingList={[
    //           "Room No.",
    //           "Room Type",
    //           "Beds",
    //           "Available Beds",
    //           "Room Rent",
    //           "Room Status",
    //         ]}
    //         bodyData={displayedRooms}
    //         editRoom={editRoom}
    //         handleDeleteRoomClick={handleDeleteRoomClick}
    //       />
    //     </div>

    //     {/* Empty State */}
    //     {rooms.length === 0 && (
    //       <p className="text-center font-medium text-lg text-red-500 py-4">
    //         No rooms available. Add a new room to get started.
    //       </p>
    //     )}

    //     {/* Pagination */}
    //     {rooms.length !== 0 && (
    //       <div className="flex justify-center items-center gap-6 mt-4 text-sm font-medium text-gray-700 flex-wrap">
    //         <button
    //           disabled={pageNumber === 1}
    //           onClick={() => setPageNumber((prev) => prev - 1)}
    //           className={`px-4 py-2 rounded-md ${
    //             pageNumber === 1
    //               ? "bg-gray-200 cursor-not-allowed"
    //               : "bg-gray-100 hover:bg-gray-200"
    //           }`}
    //         >
    //           Prev
    //         </button>
    //         <span>
    //           Page{" "}
    //           <span className="font-bold">
    //             {totalPages !== 0 ? pageNumber : 0}
    //           </span>{" "}
    //           of {totalPages}
    //         </span>
    //         <button
    //           disabled={pageNumber === totalPages}
    //           onClick={() => setPageNumber((prev) => prev + 1)}
    //           className={`px-4 py-2 rounded-md ${
    //             pageNumber === totalPages
    //               ? "bg-gray-200 cursor-not-allowed"
    //               : "bg-gray-100 hover:bg-gray-200"
    //           }`}
    //         >
    //           Next
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Header: Hostel Overview + Action Buttons */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Hostel Overview
          </h2>
          <p className="text-gray-400">
            Manage your hostel details and room configurations
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setIsEditingHostel(true)}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/20 hover:scale-105 transition-all duration-300 group"
          >
            <FaEdit
              size={18}
              className="group-hover:text-purple-400 transition-colors"
            />
            Edit Hostel
          </button>
          <button
            onClick={handleDeleteHostelClick}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:from-red-600 hover:to-red-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
          >
            <FaTrash size={18} />
            Delete Hostel
          </button>
        </div>
      </div>

      {/* Hostel Details Card */}
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mb-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">🏢</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Hostel Information
              </h3>
              <p className="text-gray-400 text-sm">
                Basic details and capacity
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-300 font-medium">Hostel Name:</span>
              <span className="font-bold text-xl text-purple-400">
                {hostel.data?.name}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-300 font-medium">Category:</span>
              <span className="font-bold text-xl text-cyan-400">
                {hostel.data?.category}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-300 font-medium">Total Rooms:</span>
              <span className="font-bold text-xl text-green-400">
                {hostel.data?.totalRooms}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-300 font-medium">Max Capacity:</span>
              <span className="font-bold text-xl text-yellow-400">
                {hostel.data?.maxCapacity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms List Section */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🏠</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Rooms Management
              </h3>
              <p className="text-gray-400 text-sm">
                Add, edit, and manage room details
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowRoomFormModal(true);
              setEditRoomId(null);
              setNewRoom({
                number: "",
                type: "",
                beds: "",
                availableBeds: "",
                rent: "",
                status: "available",
              });
            }}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-purple-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group"
          >
            <FaPlus className="text-white group-hover:rotate-90 transition-transform duration-300" />
            Add New Room
          </button>
        </div>

        {/* Rooms Table Container */}
        <div className="bg-black/20 backdrop-blur-md  border border-white/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table
              headingList={[
                "Room No.",
                "Room Type",
                "Beds",
                "Available Beds",
                "Room Rent",
                "Room Status",
              ]}
              bodyData={displayedRooms}
              editRoom={editRoom}
              handleDeleteRoomClick={handleDeleteRoomClick}
            />
          </div>
        </div>

        {/* Empty State */}
        {rooms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🏠</span>
            </div>
            <p className="text-xl font-semibold text-white mb-2">
              No Rooms Available
            </p>
            <p className="text-gray-400 mb-6">
              Add your first room to get started with room management
            </p>
            <button
              onClick={() => {
                setShowRoomFormModal(true);
                setEditRoomId(null);
                setNewRoom({
                  number: "",
                  type: "",
                  beds: "",
                  availableBeds: "",
                  rent: "",
                  status: "available",
                });
              }}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-purple-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 mx-auto"
            >
              <FaPlus className="text-white" />
              Add First Room
            </button>
          </div>
        )}

        {/* Pagination */}
        {rooms.length !== 0 && (
          <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((prev) => prev - 1)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                pageNumber === 1
                  ? "bg-white/5 text-gray-500 cursor-not-allowed"
                  : "bg-white/10 text-white hover:bg-white/20 hover:scale-105 border border-white/20"
              }`}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
              <span className="text-gray-300">Page</span>
              <span className="font-bold text-purple-400 text-lg">
                {totalPages !== 0 ? pageNumber : 0}
              </span>
              <span className="text-gray-300">of</span>
              <span className="font-bold text-cyan-400 text-lg">
                {totalPages}
              </span>
            </div>

            <button
              disabled={pageNumber === totalPages}
              onClick={() => setPageNumber((prev) => prev + 1)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                pageNumber === totalPages
                  ? "bg-white/5 text-gray-500 cursor-not-allowed"
                  : "bg-white/10 text-white hover:bg-white/20 hover:scale-105 border border-white/20"
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelAndRoomDetails;

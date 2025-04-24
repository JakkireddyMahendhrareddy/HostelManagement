import React from "react";
import Table from "../ui/Table/Table";
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
    <div className="w-full mx-auto p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-600">Hostel Overview</h2>
        <div className="flex gap-6 items-center">
          <button
            onClick={() => setIsEditingHostel(true)}
            className="text-blue-500 flex gap-2 p-1 w-24 border-2 border-blue-500 cursor-pointer justify-center items-center rounded-lg hover:scale-110 duration-300 transition"
          >
            <FaEdit size={18} />
            Edit
          </button>
          <button
            onClick={handleDeleteHostelClick}
            className="text-white bg-blue-500 cursor-pointer flex gap-2 p-2 w-24 justify-center items-center rounded-lg hover:scale-110 duration-300 transition"
          >
            <FaTrash size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* changes to card data wise */}
      <div className="p-6 rounded-2xl border border-gray-300 bg-white shadow-md text-lg w-1/2 grid grid-cols-1 gap-3">
        <p className="text-gray-700 text-lg">
          Hostel Name:{" "}
          <span className="font-semibold text-xl">{hostel.name}</span>
        </p>
        <p className="text-gray-700 text-lg">
          Category:{" "}
          <span className="font-semibold text-xl">{hostel.category}</span>
        </p>
        <p className="text-gray-700 text-lg">
          Rooms:{" "}
          <span className="font-semibold text-xl">{hostel.totalRooms}</span>
        </p>
        <p className="text-gray-700 text-lg">
          Max Capacity:{" "}
          <span className="font-semibold text-xl">{hostel.maxCapacity}</span>
        </p>
      </div>

      <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-4 mt-4 space-y-3">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Rooms List</h3>
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
            className="bg-blue-500 cursor-pointer text-white py-2 px-4 flex items-center gap-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-200"
          >
            <FaPlus className="text-white" />
            Add New Room
          </button>
        </div>

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

        {/* <table className="w-full mt-2 rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-gray-700 font-medium">Room No.</th>
              <th className="p-2 text-gray-700 font-medium">Room Type</th>
              <th className="p-2 text-gray-700 font-medium">Beds</th>
              <th className="p-2 text-gray-700 font-medium">Available Beds</th>
              <th className="p-2 text-gray-700 font-medium">Room Rent</th>
              <th className="p-2 text-gray-700 font-medium">Room Status</th>
              <th className="p-2 text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedRooms.map((room, index) => (
              <tr key={index} className="border-y border-gray-300">
                <td className="p-4 text-center">{room.number}</td>
                <td className="p-4 text-center">{room.type}</td>
                <td className="p-4 text-center">{room.beds}</td>
                <td className="p-4 text-center">{room.availableBeds}</td>
                <td className="p-4 text-center">{room.rent}</td>
                <td className="p-4 text-center font-bold">
                  <p
                    className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                      room.availableBeds > 0
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {room.availableBeds > 0 ? "Available" : "Occupied"}
                  </p>
                </td>
                <td className="p-4 flex justify-center items-center gap-2">
                  <button
                    onClick={() => editRoom(room.number)}
                    className="text-gray-600"
                  >
                    <FaPencilAlt size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteRoomClick(room.number)}
                    className="text-gray-600"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

        {rooms.length === 0 && (
          <p className="text-center font-medium text-lg mt-4 text-red-500 py-4">
            No rooms available. Add a new room to get started.
          </p>
        )}

        {/* Pagination */}
        {rooms.length !== 0 && (
          <div className="flex justify-center items-center gap-6 mt-4 text-sm font-medium text-gray-700">
            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((prev) => prev - 1)}
              className={`px-4 py-2 rounded-md ${
                pageNumber === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Prev
            </button>
            <span>
              Page{" "}
              <span className="font-bold">
                {totalPages !== 0 ? pageNumber : 0}
              </span>{" "}
              of {totalPages}
            </span>
            <button
              disabled={pageNumber === totalPages}
              onClick={() => setPageNumber((prev) => prev + 1)}
              className={`px-4 py-2 rounded-md ${
                pageNumber === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelAndRoomDetails;

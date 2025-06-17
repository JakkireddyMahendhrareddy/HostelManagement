import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
const TableBodyRow = ({ roomInfo, index, editRoom, handleDeleteRoomClick }) => {
  const { number, type, beds, availableBeds, rent } = roomInfo;

  const getStatusBadge = () => {
    if (status === "maintenance") {
      return (
        <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1.5 rounded-full text-xs font-medium border border-yellow-500/30">
          Maintenance
        </span>
      );
    } else if (availableBeds > 0) {
      return (
        <span className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-medium border border-green-500/30">
          Available
        </span>
      );
    } else {
      return (
        <span className="bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-xs font-medium border border-red-500/30">
          Occupied
        </span>
      );
    }
  };

  return (
    <tr className="group relative hover:bg-white/10 transition-all duration-300 even:bg-white/5 cursor-pointer border-b border-white/5">
      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-white font-medium">
        <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg text-sm">
          {number}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
        {type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
        {beds}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
        {availableBeds}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">
        {rent}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {getStatusBadge()}
      </td>

      {/* 🧊 Floating buttons */}
      <td className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-2 px-2 py-2 z-10">
        <button onClick={() => editRoom(number)} className="text-gray-700">
          <FaEdit size={18} />
        </button>
        <button
          onClick={() => handleDeleteRoomClick(number)}
          className="text-gray-700"
        >
          <AiFillDelete size={18} />
        </button>
      </td>
    </tr>
  );
};

export default TableBodyRow;

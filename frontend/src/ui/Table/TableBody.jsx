import TableBodyRow from "./TableBodyRow";

const TableBody = ({ bodyData, editRoom, handleDeleteRoomClick }) => {
  return (
    <tbody className="divide-y divide-white/10 bg-white/5">
      {bodyData.map((room, index) => (
        <TableBodyRow
          key={room.number}
          roomInfo={room}
          index={room.number}
          editRoom={editRoom}
          handleDeleteRoomClick={handleDeleteRoomClick}
        />
      ))}
    </tbody>
  );
};

export default TableBody;

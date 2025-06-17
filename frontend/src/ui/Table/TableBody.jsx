import TableBodyRow from "./TableBodyRow";

const TableBody = ({ bodyData, editRoom, handleDeleteRoomClick }) => {
  return (
    // <tbody className="divide-y divide-red-600/10 bg-red-500/5">
    //   {bodyData.map((room, index) => (
    //     <TableBodyRow
    //       key={room.number}
    //       roomInfo={room}
    //       index={room.number}
    //       editRoom={editRoom}
    //       handleDeleteRoomClick={handleDeleteRoomClick}
    //     />
    //   ))}
    // </tbody>
    <tbody className="divide-y divide-slate-600/30 bg-slate-800/40">
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

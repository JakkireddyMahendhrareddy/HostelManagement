import TableHeading from "./TableHeading";
import TableBody from "./TableBody";

const Table = ({ headingList, bodyData, editRoom, handleDeleteRoomClick }) => {
  return (
    <div className="w-full mt-2 overflow-x-auto rounded-xl border border-white/20 shadow-2xl mx-auto bg-white/5 backdrop-blur-sm">
      <table className="min-w-[700px] w-full divide-y divide-white/10 text-sm">
        <TableHeading headingList={headingList} />
        <TableBody
          bodyData={bodyData}
          editRoom={editRoom}
          handleDeleteRoomClick={handleDeleteRoomClick}
        />
      </table>
    </div>
  );
};

export default Table;

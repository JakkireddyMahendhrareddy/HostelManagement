const TableHeading = ({ headingList }) => {
  return (
    <thead className="bg-white/5   backdrop-blur-sm top-0 ">
       <tr>
        {headingList.map((heading) => (
          <th
            key={heading}
            className="px-4 md:px-6 py-4 text-left font-bold text-white tracking-wide whitespace-nowrap text-sm uppercase"
          >
            <span className="flex items-center gap-2">
              {getHeadingIcon(heading)}
              {heading}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeading;




// Helper function to get icons for headings
const getHeadingIcon = (heading) => {
  switch (heading.toLowerCase()) {
    case 'room no.':
      return <span className="text-purple-400">🏠</span>;
    case 'room type':
      return <span className="text-cyan-400">🏢</span>;
    case 'beds':
      return <span className="text-green-400">🛏️</span>;
    case 'available beds':
      return <span className="text-yellow-400">✅</span>;
    case 'room rent':
      return <span className="text-orange-400">💰</span>;
    case 'room status':
      return <span className="text-blue-400">📊</span>;

  //     "Room No.",
  // "Issue",
  // "Status",
  // "Priority",
  // "Requested By",
  // "Created Date",
  // "Actions"
    default:
      return null;
  }
};


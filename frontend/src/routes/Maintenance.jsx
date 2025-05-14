import React from "react";
import { useState, useEffect } from "react";
import NoHostelMessage from "./NoHostelMessage";
import { backendUrl, toastNoficationSettings } from "../utils/utils";

const Maintenance = () => {
  const maintenanceData = [
    {
      date: "2025-05-01",
      roomNo: "101",
      issue: "Leaking Tap",
      status: "Pending",
      remarks: "Plumber visit scheduled",
    },
    {
      date: "2025-05-03",
      roomNo: "202",
      issue: "Broken Chair",
      status: "Resolved",
      remarks: "Replaced",
    },
    {
      date: "2025-05-05",
      roomNo: "303",
      issue: "Fan Not Working",
      status: "In Progress",
      remarks: "Spare part ordered",
    },
    {
      date: "2025-05-07",
      roomNo: "105",
      issue: "Power Issue",
      status: "Resolved",
      remarks: "Fuse replaced",
    },
  ];

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Resolved: "bg-green-100 text-green-800",
    "In Progress": "bg-blue-100 text-blue-800",
  };

  const getHostelUrl = `${backendUrl}/api/hostel/view`;

  const [loading, setLoading] = useState(true);
  const [hostel, setHostel] = useState(null);

  const fetchHostel = async () => {
    try {
      setLoading(true);
      const response = await fetch(getHostelUrl, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data) {
          setHostel(data);
          fetchRooms();
        } else {
          setHostel(null);
        }
      }
    } catch (error) {
      toast.warning("Something Went Wrong", toastNoficationSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostel();
  }, []);

  return (
    <div>
      <div className="w-full pt-0 min-h-screen flex justify-center items-start relative">
        <div className="w-full pt-4 max-w-7xl">
          {loading ? (
            <div className="flex justify-center items-center h-60">
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            </div>
          ) : !hostel || Object.keys(hostel).length === 0 ? (
            <NoHostelMessage />
          ) : (
            <div className="p-6 bg-gray-50 min-h-screen">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Hostel Maintenance Records
              </h1>
              <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Room No</th>
                      <th className="px-4 py-2 text-left">Issue</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceData.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-2">{item.date}</td>
                        <td className="px-4 py-2">{item.roomNo}</td>
                        <td className="px-4 py-2">{item.issue}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              statusColors[item.status]
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">{item.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;

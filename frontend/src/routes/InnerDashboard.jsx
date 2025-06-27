import React from "react";
import { useState, useEffect } from "react";
import NoHostelMessage from "./NoHostelMessage";
import { toast } from "react-toastify";
import { backendUrl, toastNoficationSettings } from "../utils/utils";

const InnerDashboard = () => {
  // API URLs
  const getHostelUrl = `${backendUrl}/api/hostel/view`;
  const getRoomsUrl = `${backendUrl}/api/hostel/room/get`;
  const getMessUrl = `${backendUrl}/api/mess/`;
  const getMaintenanceUrl = `${backendUrl}/api/maintenance/`;
  const getPaymentsUrl = `${backendUrl}/api/payments/tenant`;
  const getTenantsUrl = `${backendUrl}/api/tenants/all`;

  // State variables
  const [loading, setLoading] = useState(true);
  const [hostel, setHostel] = useState(null);
  const [rooms, setRooms] = useState({
    total: 0,
    occupied: 0,
    vacant: 0,
  });
  const [payments, setPayments] = useState({
    paid: 0,
    unpaid: 0,
  });
  const [tenants, setTenants] = useState({
    total: 0,
    current: 0,
    percentage: 0,
  });
  const [messMenu, setMessMenu] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [maintenanceTickets, setMaintenanceTickets] = useState([]);

  // Fetch hostel data
  const fetchHostel = async () => {
    try {
      setLoading(true);
      const response = await fetch(getHostelUrl, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setHostel(data);
          // Fetch other data after hostel data is loaded
          await Promise.all([
            fetchRooms(),
            fetchMessMenu(),
            fetchMaintenanceTickets(),
            fetchPayments(),
            fetchTenants(),
          ]);
        } else {
          setHostel(null);
        }
      }
    } catch (error) {
      toast.warning("Failed to load hostel data", toastNoficationSettings);
      console.error("Error fetching hostel data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch rooms data
  const fetchRooms = async () => {
    try {
      const response = await fetch(getRoomsUrl, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.rooms) {
          const totalRooms = data.rooms.length;
          const occupiedRooms = data.rooms.filter(
            (room) => room.isOccupied
          ).length;

          setRooms({
            total: totalRooms,
            occupied: occupiedRooms,
            vacant: totalRooms - occupiedRooms,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching rooms data:", error);
    }
  };

  // Fetch mess menu
  const fetchMessMenu = async () => {
    try {
      const response = await fetch(getMessUrl, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.messDetails) {
          // Process mess menu data
          const todayMenu = data.messDetails[0]?.menu || {};

          setMessMenu({
            breakfast: todayMenu.breakfast
              ? [todayMenu.breakfast]
              : ["Standard Breakfast"],
            lunch: todayMenu.lunch
              ? [
                  todayMenu.lunch.veg || "Veg Meal",
                  todayMenu.lunch.nonVeg || "Non-Veg Option",
                ]
              : ["Veg Meal", "Non-Veg Option"],
            dinner: todayMenu.dinner
              ? [
                  todayMenu.dinner.veg || "Veg Meal",
                  todayMenu.dinner.nonVeg || "Non-Veg Option",
                ]
              : ["Veg Meal", "Non-Veg Option"],
          });
        }
      }
    } catch (error) {
      console.error("Error fetching mess data:", error);
    }
  };

  // Fetch maintenance tickets
  const fetchMaintenanceTickets = async () => {
    try {
      const response = await fetch(getMaintenanceUrl, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.issues) {
          // Get the 5 most recent unresolved tickets
          const unresolvedTickets = data.issues
            .filter((ticket) => ticket.status !== "resolved")
            .slice(0, 5)
            .map((ticket) => ({
              name: ticket.tenantName || "Unknown Tenant",
              issue: ticket.description || "No description provided",
              priority: ticket.priority?.toLowerCase() || "medium",
            }));

          setMaintenanceTickets(unresolvedTickets);
        }
      }
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    }
  };

  // Fetch payments data
  const fetchPayments = async () => {
    try {
      const response = await fetch(getPaymentsUrl, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.transactions) {
          // Calculate total paid and unpaid amounts
          let paidAmount = 0;
          let unpaidAmount = 0;

          data.transactions.forEach((transaction) => {
            if (transaction.status === "paid") {
              paidAmount += transaction.amount || 0;
            } else {
              unpaidAmount += transaction.amount || 0;
            }
          });

          setPayments({
            paid: paidAmount,
            unpaid: unpaidAmount,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching payments data:", error);
    }
  };

  // Fetch tenants data
  const fetchTenants = async () => {
    try {
      const response = await fetch(getTenantsUrl, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.tenants) {
          const totalCapacity = hostel?.capacity || 500;
          const currentTenants = data.tenants.length;
          const occupancyPercentage = Math.round(
            (currentTenants / totalCapacity) * 100
          );

          setTenants({
            total: totalCapacity,
            current: currentTenants,
            percentage: occupancyPercentage,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching tenants data:", error);
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchHostel();
  }, []);

  return (
    <div className="pt-0">
      <style>
        {`
          /* Custom Scrollbar */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `}
      </style>
      <div className="w-full pt-0 min-h-screen flex justify-center items-start relative custom-scrollbar">
        <div className="w-full max-w-full">
          {loading ? (
            <div className="flex justify-center items-center h-60">
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-purple-500" />
              <span className="ml-3 text-white">Loading...</span>
            </div>
          ) : !hostel || Object.keys(hostel).length === 0 ? (
            <NoHostelMessage />
          ) : (
            <div>
              <div
                className="min-h-screen bg-gradient-to-br from-slate-900
              via-slate-900 to-slate-900 p-5"
              >
                <div className="max-w-full mx-auto">
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Rooms Card */}
                    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 hover:bg-blue-900/40 transition-all duration-300 relative overflow-hidden">
                      {/* Room-themed background elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>

                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">🏠</span>
                        </div>
                        <h3 className="text-cyan-100 font-semibold text-lg">
                          Room Status
                        </h3>
                      </div>

                      <div className="grid grid-cols-3 gap-4 relative z-10">
                        <StatItem
                          label="Total"
                          value={rooms.total.toString()}
                          color="text-cyan-400"
                          icon="🔢"
                        />
                        <StatItem
                          label="Occupied"
                          value={rooms.occupied.toString()}
                          color="text-green-400"
                          icon="✅"
                        />
                        <StatItem
                          label="Vacant"
                          value={rooms.vacant.toString()}
                          color="text-amber-400"
                          icon="🔑"
                        />
                      </div>
                    </div>

                    {/* Payment Card */}
                    <div className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 backdrop-blur-md border border-green-500/20 rounded-2xl p-6 hover:bg-green-900/40 transition-all duration-300 relative overflow-hidden">
                      {/* Payment-themed background elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"></div>

                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">💰</span>
                        </div>
                        <h3 className="text-emerald-100 font-semibold text-lg">
                          Payment Status
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4 relative z-10">
                        <StatItem
                          label="Paid"
                          value={`₹ ${payments.paid.toLocaleString()}`}
                          color="text-green-400"
                          icon="✓"
                        />
                        <StatItem
                          label="Unpaid"
                          value={`₹ ${payments.unpaid.toLocaleString()}`}
                          color="text-red-400"
                          icon="⚠️"
                        />
                      </div>
                    </div>

                    {/* Amenities Card */}
                    <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 hover:bg-purple-900/40 transition-all duration-300 relative overflow-hidden">
                      {/* Amenities-themed background elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/5 rounded-full blur-3xl"></div>

                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">⭐</span>
                        </div>
                        <h3 className="text-purple-100 font-semibold text-lg">
                          Hostel Amenities
                        </h3>
                      </div>

                      <div className="grid grid-cols-5 gap-3 relative z-10">
                        {[
                          {
                            icon: "💡",
                            label: "Light",
                            color: "bg-yellow-500/20 border-yellow-500/30",
                          },
                          {
                            icon: "💧",
                            label: "Water",
                            color: "bg-blue-500/20 border-blue-500/30",
                          },
                          {
                            icon: "📶",
                            label: "Wifi",
                            color: "bg-green-500/20 border-green-500/30",
                          },
                          {
                            icon: "👕",
                            label: "Laundry",
                            color: "bg-cyan-500/20 border-cyan-500/30",
                          },
                          {
                            icon: "🔥",
                            label: "Hot Water",
                            color: "bg-red-500/20 border-red-500/30",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="text-center group cursor-pointer"
                          >
                            <div
                              className={`w-12 h-12 mx-auto rounded-full ${item.color} border flex items-center justify-center mb-2 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                            >
                              <span className="text-xl">{item.icon}</span>
                            </div>
                            <p className="text-gray-300 text-xs font-medium">
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Content Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Tenants Card */}
                    <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 backdrop-blur-md border border-pink-500/20 rounded-2xl p-8 hover:bg-pink-900/40 transition-all duration-300 relative overflow-hidden">
                      {/* Tenants-themed background elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl"></div>

                      <div className="flex items-center gap-3 mb-6 justify-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">👥</span>
                        </div>
                        <h3 className="text-pink-100 font-semibold text-xl">
                          Tenant Occupancy
                        </h3>
                      </div>

                      <div className="flex flex-col items-center relative z-10">
                        <div className="relative w-40 h-40 mb-6">
                          {/* Glowing effect behind the chart */}
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-xl"></div>

                          <svg
                            viewBox="0 0 200 200"
                            className="w-full h-full -rotate-90 relative z-10"
                          >
                            <circle
                              cx="100"
                              cy="100"
                              r="80"
                              fill="none"
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth="12"
                            />
                            <circle
                              cx="100"
                              cy="100"
                              r="80"
                              fill="none"
                              stroke="url(#tenant-gradient)"
                              strokeWidth="12"
                              strokeDasharray={`${Math.PI * 2 * 80}`}
                              strokeDashoffset={`${
                                Math.PI *
                                2 *
                                80 *
                                (1 - tenants.percentage / 100)
                              }`}
                              strokeLinecap="round"
                              className="animate-pulse"
                            />
                            <defs>
                              <linearGradient
                                id="tenant-gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#ec4899" />
                                <stop offset="100%" stopColor="#f43f5e" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/30 rounded-full w-24 h-24 flex items-center justify-center backdrop-blur-sm border border-white/10">
                              <span className="text-3xl font-bold text-white">
                                {tenants.percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
                            <p className="text-gray-400 text-xs mb-1">
                              Capacity
                            </p>
                            <p className="font-semibold text-pink-300 text-xl">
                              {tenants.total}
                            </p>
                          </div>
                          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
                            <p className="text-gray-400 text-xs mb-1">
                              Occupied
                            </p>
                            <p className="font-semibold text-rose-300 text-xl">
                              {tenants.current}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mess Menu Card */}
                    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-md border border-orange-500/20 rounded-2xl p-6 hover:bg-amber-900/40 transition-all duration-300 relative overflow-hidden">
                      {/* Food-themed background elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>

                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">🍽️</span>
                        </div>
                        <h3 className="text-orange-100 font-semibold text-lg">
                          Today's Mess Menu
                        </h3>
                      </div>

                      <div className="space-y-4 relative z-10">
                        <MealSection
                          title="Breakfast"
                          items={messMenu.breakfast}
                          icon="🍳"
                        />
                        <MealSection
                          title="Lunch"
                          items={messMenu.lunch}
                          icon="🍚"
                        />
                        <MealSection
                          title="Dinner"
                          items={messMenu.dinner}
                          icon="🍲"
                        />
                      </div>
                    </div>

                    {/* Tickets Card */}
                    <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 hover:bg-blue-900/40 transition-all duration-300 relative overflow-hidden">
                      {/* Maintenance-themed background elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl"></div>

                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl">🔧</span>
                          </div>
                          <h3 className="text-blue-100 font-semibold text-lg">
                            Maintenance Tickets
                          </h3>
                        </div>
                        <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium border border-red-500/30">
                          Unresolved - {maintenanceTickets.length}
                        </span>
                      </div>

                      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar relative z-10">
                        {maintenanceTickets.length > 0 ? (
                          maintenanceTickets.map((ticket, index) => (
                            <TicketItem key={index} ticket={ticket} />
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-400 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-2xl block mb-2">✅</span>
                            <p>All tickets resolved</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard
                      title="Visitors"
                      subtitle={`Total ${Math.min(2, rooms.vacant)}`}
                      items={[
                        `${hostel?.name || "Building A"} | Floor 2nd | Room ${
                          rooms.vacant > 0 ? "201" : "N/A"
                        }`,
                        `${hostel?.name || "Building A"} | Floor 1st | Room ${
                          rooms.vacant > 1 ? "103" : "N/A"
                        }`,
                      ]}
                      icon="👥"
                    />
                    <InfoCard
                      title="Reports"
                      items={[
                        `Total Vacant Rooms: ${rooms.vacant}`,
                        `Total Fees Collected: ₹ ${payments.paid.toLocaleString()}`,
                        `Occupancy Rate: ${tenants.percentage}%`,
                        `Maintenance Issues: ${maintenanceTickets.length}`,
                      ]}
                      icon="📊"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, color, icon }) => (
  <div className="text-center bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
    {icon && <div className="text-lg mb-1">{icon}</div>}
    <p className={`font-bold text-2xl ${color} mb-1`}>{value}</p>
    <p className="text-gray-400 text-xs">{label}</p>
  </div>
);

const MealSection = ({ title, items, icon }) => {
  // Different colors for different meal times
  const mealColors = {
    Breakfast: "border-yellow-500 bg-yellow-500/5",
    Lunch: "border-orange-500 bg-orange-500/5",
    Dinner: "border-red-500 bg-red-500/5",
  };

  const mealColor = mealColors[title] || "border-purple-500";

  return (
    <div className={`border-l-4 ${mealColor} pl-4 rounded-r-md p-2`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <p className="font-medium text-white">{title}:</p>
      </div>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-gray-300 text-sm pl-2 flex items-start"
          >
            <span className="mr-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TicketItem = ({ ticket }) => {
  const priorityConfig = {
    high: {
      border: "border-l-red-500",
      bg: "bg-red-500/10",
      hover: "hover:bg-red-500/20",
      badge: "bg-red-500/20 text-red-300 border-red-500/30",
      icon: "🔴",
      label: "High",
    },
    medium: {
      border: "border-l-yellow-500",
      bg: "bg-yellow-500/10",
      hover: "hover:bg-yellow-500/20",
      badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      icon: "🟡",
      label: "Medium",
    },
    low: {
      border: "border-l-green-500",
      bg: "bg-green-500/10",
      hover: "hover:bg-green-500/20",
      badge: "bg-green-500/20 text-green-300 border-green-500/30",
      icon: "🟢",
      label: "Low",
    },
  };

  const config = priorityConfig[ticket.priority] || priorityConfig.medium;

  return (
    <div
      className={`border-l-4 ${config.border} ${config.bg} ${config.hover} p-4 rounded-r-lg transition-all duration-300 backdrop-blur-sm border-t border-r border-b border-white/10 shadow-sm`}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-white font-medium text-sm flex items-center gap-2">
          <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs">
            {ticket.name.charAt(0).toUpperCase()}
          </span>
          {ticket.name}
        </p>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${config.badge} flex items-center gap-1`}
        >
          <span className="text-[8px]">{config.icon}</span>
          {config.label}
        </span>
      </div>
      <p className="text-gray-300 text-xs mt-1 pl-8">{ticket.issue}</p>
    </div>
  );
};

const InfoCard = ({ title, subtitle, items, icon }) => {
  // Different colors for different card types
  const cardColors = {
    Visitors: {
      gradient: "from-teal-900/30 to-emerald-900/30",
      hover: "hover:bg-teal-900/40",
      border: "border-teal-500/20",
      glow1: "bg-teal-500/5",
      glow2: "bg-emerald-500/5",
      iconBg: "from-teal-500 to-emerald-500",
      dotColor: "bg-teal-400",
      subtitleColor: "text-teal-400",
    },
    Reports: {
      gradient: "from-indigo-900/30 to-violet-900/30",
      hover: "hover:bg-indigo-900/40",
      border: "border-indigo-500/20",
      glow1: "bg-indigo-500/5",
      glow2: "bg-violet-500/5",
      iconBg: "from-indigo-500 to-violet-500",
      dotColor: "bg-indigo-400",
      subtitleColor: "text-indigo-400",
    },
  };

  const colors = cardColors[title] || cardColors["Reports"];

  return (
    <div
      className={`bg-gradient-to-br ${colors.gradient} backdrop-blur-md ${colors.border} rounded-2xl p-6 ${colors.hover} transition-all duration-300 relative overflow-hidden`}
    >
      {/* Background elements */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${colors.glow1} rounded-full blur-3xl`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-32 h-32 ${colors.glow2} rounded-full blur-3xl`}
      ></div>

      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 bg-gradient-to-r ${colors.iconBg} rounded-lg flex items-center justify-center shadow-lg`}
        >
          <span className="text-white text-xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-gray-100 font-semibold text-lg">{title}</h3>
          {subtitle && (
            <p className={`${colors.subtitleColor} text-sm`}>({subtitle})</p>
          )}
        </div>
      </div>

      <ul className="space-y-3 relative z-10">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-gray-300 text-sm flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <span className={`w-2 h-2 ${colors.dotColor} rounded-full`}></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InnerDashboard;

//  <div className="min-h-screen  px-4 sm:px-6 lg:px-8 py-6">
//                 <div className="max-w-7xl mx-auto space-y-6">
//                   {/* Rooms, Payment, Amenities */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {/* Rooms */}
//                     <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
//                       <h3 className={`${headingColor} font-bold text-lg mb-4`}>
//                         Rooms
//                       </h3>
//                       <div className="flex justify-between flex-wrap gap-4">
//                         <Stat label="Total" value="200" />
//                         <Stat label="Occupied" value="150" />
//                         <Stat label="Vacant" value="50" />
//                       </div>
//                     </div>

//                     {/* Payment */}
//                     <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
//                       <h3 className={`${headingColor} font-bold text-lg mb-4`}>
//                         Payment
//                       </h3>
//                       <div className="flex justify-between flex-wrap gap-4">
//                         <Stat label="Paid" value="₹ 1,20,345" />
//                         <Stat label="Unpaid" value="₹ 20,345" />
//                       </div>
//                     </div>

//                     {/* Amenities */}
//                     <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
//                       <h3 className={`${headingColor} font-bold text-lg mb-4`}>
//                         Amenities
//                       </h3>
//                       <div className="grid grid-cols-3 gap-3 md:flex md:justify-between text-center">
//                         {[
//                           { icon: "💡", label: "Light" },
//                           { icon: "💧", label: "Water" },
//                           { icon: "📶", label: "Wifi" },
//                           { icon: "👕", label: "Laundry" },
//                           { icon: "🔥", label: "Hot Water" },
//                         ].map((item, index) => (
//                           <div
//                             key={index}
//                             className="flex flex-col items-center hover:scale-110 transition"
//                           >
//                             <span className="text-2xl mb-1">{item.icon}</span>
//                             <p className="text-gray-600 text-sm">
//                               {item.label}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Tenants, Mess, Tickets */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {/* Tenants */}
//                     <div className="bg-white p-8 rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition transform hover:scale-[1.05] flex flex-col items-center">
//                       <h3 className={`${headingColor} font-bold text-xl mb-6`}>
//                         Tenants
//                       </h3>
//                       <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-6">
//                         <svg viewBox="0 0 200 200" className="w-full h-full">
//                           <circle
//                             cx="100"
//                             cy="100"
//                             r="90"
//                             fill="none"
//                             stroke="#e5e7eb"
//                             strokeWidth="16"
//                           />
//                           <circle
//                             cx="100"
//                             cy="100"
//                             r="90"
//                             fill="none"
//                             stroke="#3b82f6"
//                             strokeWidth="16"
//                             strokeDasharray={`${Math.PI * 2 * 90}`}
//                             strokeDashoffset={`${
//                               Math.PI * 2 * 90 * (1 - 0.75)
//                             }`} // 75% progress
//                             transform="rotate(-90 100 100)"
//                             strokeLinecap="round"
//                           />
//                         </svg>
//                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
//                           75%
//                         </div>
//                       </div>

//                       <div className="text-center">
//                         <p className="text-gray-600">
//                           Capacity: <span className="font-semibold">500</span>
//                         </p>
//                         <p className="text-gray-600">
//                           Occupied:{" "}
//                           <span className="font-semibold text-green-600">
//                             375
//                           </span>
//                         </p>
//                       </div>
//                     </div>

//                     {/* Mess Menu */}
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition transform hover:scale-[1.02]">
//                       <h3 className={`${headingColor} font-bold text-lg mb-4`}>
//                         Mess - Today's Meal
//                       </h3>
//                       <Meal title="Breakfast" items={["3 Idli Sambar"]} />
//                       <Meal
//                         title="Lunch"
//                         items={[
//                           "Veg: Sprouts | 3 Chapatis | Rice | Dal",
//                           "Non-Veg: Egg Biryani",
//                         ]}
//                       />
//                       <Meal
//                         title="Dinner"
//                         items={[
//                           "Veg: Sprouts | 3 Chapatis | Rice | Dal",
//                           "Non-Veg: Egg Curry | 3 Chapatis | Rice",
//                         ]}
//                       />
//                     </div>

//                     {/* Tickets */}
//                     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition transform hover:scale-[1.02]">
//                       <h3 className={`${headingColor} font-bold text-lg mb-4`}>
//                         Tickets{" "}
//                         <span className="text-sm font-normal text-gray-500">
//                           (Unresolved - 5)
//                         </span>
//                       </h3>
//                       <ul className="space-y-3 text-gray-700">
//                         {[
//                           { name: "Mike Ross", issue: "Water not coming" },
//                           {
//                             name: "Jennifer Grint",
//                             issue: "Light is not available since last night",
//                           },
//                           {
//                             name: "Casey Allen",
//                             issue:
//                               "WiFi is not working since past week, please fix it.",
//                           },
//                           {
//                             name: "Tina Harris",
//                             issue: "Laundry not working properly",
//                           },
//                           {
//                             name: "Rick Butcher",
//                             issue: "Hot water is broken",
//                           },
//                         ].map((ticket, index) => (
//                           <li
//                             key={index}
//                             className="pb-2 border-b border-gray-100 last:border-b-0 hover:pl-2 transition"
//                           >
//                             <span className="font-semibold text-gray-800">
//                               {ticket.name}:
//                             </span>{" "}
//                             {ticket.issue}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>

//                   {/* Visitors, Reports */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <Card
//                       title="Visitors (Total 2)"
//                       items={[
//                         "Building A | Floor 2nd | Room 201",
//                         "Building A | Floor 1st | Room 103",
//                       ]}
//                     />
//                     <Card
//                       title="Reports"
//                       items={[
//                         "Total Number of Vacant Rooms",
//                         "Total Fees Collected",
//                       ]}
//                     />
//                   </div>
//                 </div>
//               </div>

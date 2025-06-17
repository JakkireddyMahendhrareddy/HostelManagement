import React from "react";
import { useState, useEffect } from "react";
import NoHostelMessage from "./NoHostelMessage";
import { toast } from "react-toastify";
import { backendUrl, toastNoficationSettings } from "../utils/utils";

const InnerDashboard = () => {
  const headingColor = "text-gray-600";

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
      console.log(response, "response");
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setHostel(data);
          fetchMessMenu();
        } else {
          setHostel(null);
        }
      }
    } catch (error) {
      // toast.warning("Something Went Wrong", toastNoficationSettings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostel();
  }, []);

  return (
    <div className="pt-0">
      <div className="w-full pt-0 min-h-screen flex justify-center items-start relative">
        <div className="w-full  max-w-full">
          {loading ? (
            <div className="flex justify-center items-center h-60">
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            </div>
          ) : !hostel || Object.keys(hostel).length === 0 ? (
            <NoHostelMessage />
          ) : (
            <div>
              <div
                className="min-h-screen bg-gradient-to-br from-slate-900
              via-purple-900 to-slate-900 p-5"
              >
                <div className="max-w-full mx-auto">
                  {/* Welcome Header */}
                  {/* <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      Welcome Back,{" "}
                      <span className="text-purple-400">Mahendraboy</span>
                    </h1>
                    <p className="text-gray-300 flex items-center gap-2">
                      Hope your rooms are filling fast today
                      <span className="text-yellow-400">😊</span>
                    </p>
                  </div> */}

                  {/* Top Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Rooms Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                      <h3 className="text-gray-300 font-semibold text-lg mb-6">
                        Rooms
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <StatItem
                          label="Total"
                          value="200"
                          color="text-blue-400"
                        />
                        <StatItem
                          label="Occupied"
                          value="150"
                          color="text-green-400"
                        />
                        <StatItem
                          label="Vacant"
                          value="50"
                          color="text-orange-400"
                        />
                      </div>
                    </div>

                    {/* Payment Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                      <h3 className="text-gray-300 font-semibold text-lg mb-6">
                        Payment
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <StatItem
                          label="Paid"
                          value="₹ 1,20,345"
                          color="text-green-400"
                        />
                        <StatItem
                          label="Unpaid"
                          value="₹ 20,345"
                          color="text-red-400"
                        />
                      </div>
                    </div>

                    {/* Amenities Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                      <h3 className="text-gray-300 font-semibold text-lg mb-6">
                        Amenities
                      </h3>
                      <div className="grid grid-cols-5 gap-3">
                        {[
                          { icon: "💡", label: "Light" },
                          { icon: "💧", label: "Water" },
                          { icon: "📶", label: "Wifi" },
                          { icon: "👕", label: "Laundry" },
                          { icon: "🔥", label: "Hot Water" },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="text-center group cursor-pointer"
                          >
                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                              {item.icon}
                            </div>
                            <p className="text-gray-400 text-xs">
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
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                      <h3 className="text-gray-300 font-semibold text-xl mb-6 text-center">
                        Tenants
                      </h3>
                      <div className="flex flex-col items-center">
                        <div className="relative w-40 h-40 mb-6">
                          <svg
                            viewBox="0 0 200 200"
                            className="w-full h-full -rotate-90"
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
                              stroke="url(#gradient)"
                              strokeWidth="12"
                              strokeDasharray={`${Math.PI * 2 * 80}`}
                              strokeDashoffset={`${
                                Math.PI * 2 * 80 * (1 - 0.75)
                              }`}
                              strokeLinecap="round"
                              className="animate-pulse"
                            />
                            <defs>
                              <linearGradient
                                id="gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#06b6d4" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">
                              75%
                            </span>
                          </div>
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-gray-300">
                            Capacity:{" "}
                            <span className="font-semibold text-purple-400">
                              500
                            </span>
                          </p>
                          <p className="text-gray-300">
                            Occupied:{" "}
                            <span className="font-semibold text-green-400">
                              375
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mess Menu Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                      <h3 className="text-gray-300 font-semibold text-lg mb-6">
                        Mess - Today's Meal
                      </h3>
                      <div className="space-y-4">
                        <MealSection
                          title="Breakfast"
                          items={["3 Idli Sambar"]}
                          icon="🌅"
                        />
                        <MealSection
                          title="Lunch"
                          items={[
                            "Veg: Sprouts | 3 Chapatis | Rice | Dal",
                            "Non-Veg: Egg Biryani",
                          ]}
                          icon="☀️"
                        />
                        <MealSection
                          title="Dinner"
                          items={[
                            "Veg: Sprouts | 3 Chapatis | Rice | Dal",
                            "Non-Veg: Egg Curry | 3 Chapatis | Rice",
                          ]}
                          icon="🌙"
                        />
                      </div>
                    </div>

                    {/* Tickets Card */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-gray-300 font-semibold text-lg">
                          Tickets
                        </h3>
                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                          Unresolved - 5
                        </span>
                      </div>
                      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                        {[
                          {
                            name: "Mike Ross",
                            issue: "Water not coming",
                            priority: "high",
                          },
                          {
                            name: "Jennifer Grint",
                            issue: "Light is not available since last night",
                            priority: "medium",
                          },
                          {
                            name: "Casey Allen",
                            issue: "WiFi is not working since past week",
                            priority: "high",
                          },
                          {
                            name: "Tina Harris",
                            issue: "Laundry not working properly",
                            priority: "low",
                          },
                          {
                            name: "Rick Butcher",
                            issue: "Hot water is broken",
                            priority: "medium",
                          },
                        ].map((ticket, index) => (
                          <TicketItem key={index} ticket={ticket} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard
                      title="Visitors"
                      subtitle="Total 2"
                      items={[
                        "Building A | Floor 2nd | Room 201",
                        "Building A | Floor 1st | Room 103",
                      ]}
                      icon="👥"
                    />
                    <InfoCard
                      title="Reports"
                      items={[
                        "Total Number of Vacant Rooms",
                        "Total Fees Collected",
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

const StatItem = ({ label, value, color }) => (
  <div className="text-center">
    <p className={`font-bold text-2xl ${color} mb-1`}>{value}</p>
    <p className="text-gray-400 text-sm">{label}</p>
  </div>
);

const MealSection = ({ title, items, icon }) => (
  <div className="border-l-4 border-purple-500 pl-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-lg">{icon}</span>
      <p className="font-medium text-white">{title}:</p>
    </div>
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} className="text-gray-300 text-sm pl-2">
          • {item}
        </li>
      ))}
    </ul>
  </div>
);

const TicketItem = ({ ticket }) => {
  const priorityColors = {
    high: "border-l-red-500 bg-red-500/10",
    medium: "border-l-yellow-500 bg-yellow-500/10",
    low: "border-l-green-500 bg-green-500/10",
  };

  return (
    <div
      className={`border-l-4 ${
        priorityColors[ticket.priority]
      } p-3 rounded-r-lg hover:bg-white/5 transition-colors`}
    >
      <p className="text-white font-medium text-sm">{ticket.name}</p>
      <p className="text-gray-300 text-xs mt-1">{ticket.issue}</p>
    </div>
  );
};

const InfoCard = ({ title, subtitle, items, icon }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="text-gray-300 font-semibold text-lg">{title}</h3>
        {subtitle && <p className="text-purple-400 text-sm">({subtitle})</p>}
      </div>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="text-gray-300 text-sm flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

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

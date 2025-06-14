// import { useState, useEffect } from "react";
// import {
//   FaUser,
//   FaBed,
//   FaUsers,
//   FaMoneyBill,
//   FaUtensils,
//   FaTools,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import InnerDashboard from "../routes/InnerDashboard";
// import HostelInfo from "../routes/Hostel/HostelInfo";
// import TenantManagement from "../routes/Tenant/TenantInfo";
// import Fees from "../routes/Fees/FeesInfo";
// import MessDetails from "../routes/Mess/MessInfo";
// import Maintenance from "../routes/Maintenance/MaintenanceInfo";
// import Topbar from "./Topbar";
// import { Link } from "react-router-dom";

// const sections = [
//   { id: "admin", title: "Dashboard", icon: <FaUser /> },
//   { id: "hostel", title: "Hostel Management", icon: <FaBed /> },
//   { id: "students", title: "Tenant Management", icon: <FaUsers /> },
//   { id: "fees", title: "Payments", icon: <FaMoneyBill /> },
//   { id: "mess", title: "Mess", icon: <FaUtensils /> },
//   { id: "maintenance", title: "Maintenance", icon: <FaTools /> },
// ];

// export default function Sidebar() {
//   const [activeSection, setActiveSection] = useState("admin");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth < 768) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     // Set initial value
//     handleResize();

//     // Add event listener
//     window.addEventListener("resize", handleResize);

//     // Clean up
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const renderContent = () => {
//     switch (activeSection) {
//       case "admin":
//         return <InnerDashboard />;
//       case "hostel":
//         return <HostelInfo />;
//       case "students":
//         return <TenantManagement />;
//       case "fees":
//         return <Fees />;
//       case "mess":
//         return <MessDetails />;
//       case "maintenance":
//         return <Maintenance />;
//       default:
//         return (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-500 text-center text-lg font-medium">
//               Click on a section to view details
//             </p>
//           </div>
//         );
//     }
//   };

//   const handleSectionClick = (sectionId) => {
//     setActiveSection(sectionId);
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* Mobile Toggle Button */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={toggleSidebar}
//           className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//           aria-label="Toggle Sidebar"
//         >
//           {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         } fixed md:relative z-40 w-64 md:w-72 bg-gradient-to-b from-gray-3000 to-gray-500 text-gray-800 shadow-2xl h-screen flex flex-col border-r border-gray-100 transition-all duration-300 ease-in-out`}
//       >
//         <Link to="/" className="flex-shrink-0">
//           <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white font-bold text-xl md:text-2xl h-20 flex items-center justify-start px-4 md:px-6 text-start shadow-xl relative overflow-hidden">
//             {/* Enhanced Background Pattern */}
//             <div className="absolute inset-0 opacity-20">
//               <div className="absolute top-3 right-3 w-12 h-12 border-2 border-white rounded-full animate-pulse"></div>
//               <div className="absolute bottom-3 left-3 w-6 h-6 border border-white rounded-full"></div>
//               <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white rounded-full opacity-30"></div>
//             </div>

//             <div className="relative z-10 flex items-center space-x-4">
//               <div className="w-12 h-12 bg-white bg-opacity-25 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg border border-white border-opacity-30">
//                 <div className="text-2xl md:text-3xl">🏨</div>
//               </div>
//               <div>
//                 <p className="text-xl md:text-2xl font-bold tracking-wide">
//                   My Hostel
//                 </p>
//                 <p className="text-xs opacity-80 font-medium">
//                   Premium Management
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Link>

//         <ul className="flex-1 overflow-y-auto p-3 md:p-4 space-y-1">
//           {sections.map((section) => (
//             <li
//               key={section.id}
//               onClick={() => handleSectionClick(section.id)}
//               className={`group flex items-center gap-3 py-4 px-4 rounded-2xl cursor-pointer transition-all duration-300 text-sm font-medium relative border ${
//                 activeSection === section.id
//                   ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl border-blue-400 transform translate-x-1"
//                   : "bg-white hover:bg-blue-50 text-gray-700 border-gray-100 hover:border-blue-200 hover:shadow-md"
//               }`}
//             >
//               {/* Glowing effect for active item */}
//               {activeSection === section.id && (
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur-sm opacity-20 -z-10 transform scale-105"></div>
//               )}

//               <div
//                 className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
//                   activeSection === section.id
//                     ? "bg-white bg-opacity-25 shadow-lg"
//                     : "bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:shadow-lg"
//                 }`}
//               >
//                 <span
//                   className={`text-lg transition-all duration-300 ${
//                     activeSection === section.id ? "text-white" : "text-white"
//                   }`}
//                 >
//                   {section.icon}
//                 </span>
//               </div>

//               <span className="truncate flex-1 font-semibold">
//                 {section.title}
//               </span>

//               {/* Chevron for all items */}
//               <svg
//                 className={`w-5 h-5 transition-all duration-300 ${
//                   activeSection === section.id
//                     ? "text-white transform rotate-90"
//                     : "text-gray-400 group-hover:text-blue-600"
//                 }`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Backdrop for mobile */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-30"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden relative w-full md:ml-0">
//         {/* Fixed Topbar */}
//         <div className="sticky top-0 left-0 right-0 h-16 z-10 shadow-lg bg-white/80 backdrop-blur-md border-b border-gray-200">
//           <div className="pl-16 md:pl-0">
//             <Topbar />
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="flex-1 overflow-auto p-4 md:p-6">
//           <div className="bg-white rounded-3xl shadow-xl border border-gray-100 min-h-full backdrop-blur-sm">
//             <div className="p-6">{renderContent()}</div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// // <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
// //   {/* Mobile Toggle Button */}
// //   <div className="md:hidden fixed top-4 left-4 z-50">
// //     <button
// //       onClick={toggleSidebar}
// //       className="bg-blue-500 text-white p-2 rounded-md shadow-lg"
// //       aria-label="Toggle Sidebar"
// //     >
// //       {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
// //     </button>
// //   </div>

// //   {/* Sidebar */}
// //   <aside
// //     className={`${
// //       sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
// //     } fixed md:relative z-40 w-64 md:w-72 bg-white text-gray-900 shadow-xl h-screen flex flex-col border-r border-gray-300 transition-transform duration-300 ease-in-out`}
// //   >
// //     <Link to="/" className="flex-shrink-0">
// //       <div className="bg-blue-500 text-white font-bold text-xl md:text-2xl h-16 flex items-center justify-start px-4 md:px-6 text-start shadow-lg">
// //         <div className="text-4xl">🏨</div>
// //         <p className="text-xl font-semibold mt-2">My Hostel</p>
// //       </div>
// //     </Link>

// //     <ul className="flex-1 overflow-y-auto p-3 md:p-5 space-y-2 md:space-y-3">
// //       {sections.map((section) => (
// //         <li
// //           key={section.id}
// //           onClick={() => handleSectionClick(section.id)}
// //           className={`flex items-center gap-2 md:gap-3 py-2 md:py-3 px-3 md:px-5 rounded-md cursor-pointer transition-all duration-300 text-xs md:text-sm font-medium tracking-wide shadow-sm ${
// //             activeSection === section.id
// //               ? "bg-blue-500 text-white shadow-md"
// //               : "hover:bg-blue-700 hover:text-white hover:shadow-md text-gray-900"
// //           }`}
// //         >
// //           <span className="text-base md:text-lg">{section.icon}</span>
// //           <span className="truncate">{section.title}</span>
// //         </li>
// //       ))}
// //     </ul>
// //   </aside>

// //   {/* Backdrop for mobile */}
// //   {isMobile && sidebarOpen && (
// //     <div
// //       className="fixed inset-0 bg-black bg-opacity-50 z-30"
// //       onClick={() => setSidebarOpen(false)}
// //     ></div>
// //   )}

// //   {/* Main Content */}
// //   <main className="flex-1 flex flex-col bg-gray-50 overflow-hidden relative w-full md:ml-0">
// //     {/* Fixed Topbar */}
// //     <div className="sticky top-0 left-0 right-0 h-16 z-10 shadow-md bg-white">
// //       <div className="pl-16 md:pl-0">
// //         <Topbar />
// //       </div>
// //     </div>

// //     {/* Content Area */}
// //     <div className="flex-1  overflow-auto">
// //       <div className="bg-white rounded-lg shadow-md  border border-gray-200">
// //         {renderContent()}
// //       </div>
// //     </div>
// //   </main>
// // </div>
import { useState, useEffect } from "react";
import {
  FaUser,
  FaBed,
  FaUsers,
  FaMoneyBill,
  FaUtensils,
  FaTools,
  FaBars,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import InnerDashboard from "../routes/InnerDashboard";
import HostelInfo from "../routes/Hostel/HostelInfo";
import TenantManagement from "../routes/Tenant/TenantInfo";
import Fees from "../routes/Fees/FeesInfo";
import MessDetails from "../routes/Mess/MessInfo";
import Maintenance from "../routes/Maintenance/MaintenanceInfo";
import Topbar from "./Topbar";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "admin",
    title: "Dashboard",
    icon: <FaUser />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "hostel",
    title: "Hostel Management",
    icon: <FaBed />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "students",
    title: "Tenant Management",
    icon: <FaUsers />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "fees",
    title: "Payments",
    icon: <FaMoneyBill />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "mess",
    title: "Mess",
    icon: <FaUtensils />,
    color: "from-red-500 to-rose-500",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    icon: <FaTools />,
    color: "from-indigo-500 to-purple-500",
  },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("admin");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "admin":
        return <InnerDashboard />;
      case "hostel":
        return <HostelInfo />;
      case "students":
        return <TenantManagement />;
      case "fees":
        return <Fees />;
      case "mess":
        return <MessDetails />;
      case "maintenance":
        return <Maintenance />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center text-lg font-medium">
              Click on a section to view details
            </p>
          </div>
        );
    }
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        @keyframes glow-pulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.6);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 2s infinite;
        }
      `}</style>

      <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Mobile Toggle Button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={toggleSidebar}
            className="relative bg-white/10 backdrop-blur-xl  text-white p-3 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-3 group overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(219, 39, 119, 0.8))",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
            aria-label="Toggle Sidebar"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              {sidebarOpen ? (
                <FaTimes
                  size={20}
                  className="transform transition-transform duration-300 group-hover:rotate-90"
                />
              ) : (
                <FaBars
                  size={20}
                  className="transform transition-transform duration-300 group-hover:scale-110"
                />
              )}
            </div>
          </button>
        </div>

        {/* Ultra-Premium Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } fixed md:relative z-40 w-72 md:w-80 h-screen flex flex-col transition-all duration-700 ease-out transform `}
          style={{
            background:
              "linear-gradient(145deg, #0f0f23 0%, #1a1a3e 25%, #2d1b3d 50%, #1e1e3f 75%, #0f0f23 100%)",
            boxShadow:
              "25px 0 50px -12px rgba(0, 0, 0, 0.4), inset -1px 0 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute top-40 right-8 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-bounce"
              style={{ animationDuration: "3s" }}
            ></div>
            <div
              className="absolute bottom-32 left-12 w-28 h-28 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Premium Header */}
          <Link to="/" className="flex-shrink-0">
            <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white h-20 flex items-center px-6 overflow-hidden group cursor-pointer">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

              {/* Mesh Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </div>

              {/* Floating Elements */}
              <div
                className="absolute top-2 right-4 w-12 h-12 border border-white/20 rounded-full animate-spin"
                style={{ animationDuration: "20s" }}
              ></div>
              <div className="absolute bottom-2 right-6 w-6 h-6 border border-white/30 rounded-full animate-ping"></div>

              <div className="relative z-10 flex items-center space-x-4 group-hover:scale-105 transition-transform duration-500">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                    <div
                      className="text-2xl animate-bounce"
                      style={{ animationDuration: "2s" }}
                    >
                      🏨
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
                </div>
                <div>
                  <p className="text-xl font-black tracking-wide bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    My Hostel
                  </p>
                  <p className="text-xs font-medium text-purple-200 opacity-90">
                    Premium Management
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation Menu */}
          <ul className="flex-1 overflow-y-auto p-4 space-y-2">
            {sections.map((section, index) => (
              <li
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  activeSection === section.id ? "translate-x-2" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Item Background */}
                <div
                  className={`relative flex items-center gap-3 py-4 px-4 rounded-2xl border transition-all duration-500 overflow-hidden text-sm font-medium ${
                    activeSection === section.id
                      ? "bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl"
                      : "bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-xl"
                  }`}
                  style={{
                    background:
                      activeSection === section.id
                        ? `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`
                        : hoveredSection === section.id
                        ? `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))`
                        : `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`,
                  }}
                >
                  {/* Glowing Edge */}
                  {activeSection === section.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400 rounded-r-full shadow-lg shadow-purple-500/50 animate-pulse"></div>
                  )}

                  {/* Hover Gradient */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl bg-gradient-to-r ${section.color}`}
                  ></div>

                  {/* Icon Container */}
                  <div
                    className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${section.color} shadow-2xl`
                        : `bg-white/10 backdrop-blur-sm group-hover:bg-gradient-to-r group-hover:${section.color} group-hover:shadow-xl`
                    }`}
                  >
                    <span className="text-white text-lg group-hover:scale-110 transition-transform duration-300">
                      {section.icon}
                    </span>

                    {/* Icon Glow */}
                    {activeSection === section.id && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${section.color} rounded-xl blur opacity-50 -z-10 animate-pulse`}
                      ></div>
                    )}
                  </div>

                  {/* Text */}
                  <span
                    className={`flex-1 font-semibold transition-all duration-300 truncate ${
                      activeSection === section.id
                        ? "text-white"
                        : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {section.title}
                  </span>

                  {/* Chevron */}
                  <FaChevronRight
                    className={`w-4 h-4 transition-all duration-500 ${
                      activeSection === section.id
                        ? "text-white transform rotate-90 scale-110"
                        : "text-gray-400 group-hover:text-white group-hover:translate-x-1"
                    }`}
                  />

                  {/* Ripple Effect */}
                  {activeSection === section.id && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
                    </div>
                  )}
                </div>

                {/* Selection Indicator */}
                {activeSection === section.id && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full">
                    <div
                      className={`w-3 h-6 bg-gradient-to-r ${section.color} rounded-l-full shadow-lg animate-pulse`}
                    ></div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Premium Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Premium Dashboard Active</span>
            </div>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-500"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden relative w-full md:ml-0">
          {/* Fixed Topbar */}
          <div className="sticky top-0 left-0 right-0 h-20 z-10 shadow-lg bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="pl-16 md:pl-0">
              <Topbar />
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto ">
            <div className="bg-gradient-to-br from-[#2b2a5d] to-[#1e1e3f] rounded-sm shadow-xl border border-gray-100 min-h-full backdrop-blur-sm">
              <div className="p-6">{renderContent()}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

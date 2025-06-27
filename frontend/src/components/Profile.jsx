// import React from "react";
// import {
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaEdit,
//   FaUserShield,
//   FaBirthdayCake,
//   FaIdCard,
// } from "react-icons/fa";
// import { RxCrossCircled } from "react-icons/rx";
// import { Tooltip as ReactTooltip } from "react-tooltip";

// // Animation keyframes
// const keyframes = `
//   @keyframes float {
//     0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
//     50% { transform: translateY(-10px) rotate(5deg); opacity: 0.8; }
//   }

//   @keyframes pulse {
//     0%, 100% { transform: scale(1); opacity: 0.7; }
//     50% { transform: scale(1.05); opacity: 1; }
//   }

//   @keyframes shimmer {
//     0% { background-position: -100% 0; }
//     100% { background-position: 200% 0; }
//   }

//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(-20px); }
//     to { opacity: 1; transform: translateY(0); }
//   }

//   @keyframes fadeOut {
//     from { opacity: 1; transform: translateY(0); }
//     to { opacity: 0; transform: translateY(-20px); }
//   }
// `;

// const Profile = ({
//   setShowProfileModal,
//   profileData,
//   handleProfilePicChange,
// }) => {
//   const handleClose = () => {
//     // Add a smooth fade-out animation before closing
//     const modalElement = document.querySelector(".profile-modal");
//     if (modalElement) {
//       modalElement.style.animation = "fadeOut 0.3s forwards";
//       setTimeout(() => {
//         setShowProfileModal(false);
//       }, 280);
//     } else {
//       setShowProfileModal(false);
//     }
//   };

//   // Loading state
//   if (!profileData)
//     return (
//       <div className="fixed inset-0 z-[9999] overflow-y-auto">
//         <style>{keyframes}</style>
//         <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
//           {/* Background overlay with blur */}
//           <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//             <div className="absolute inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-md"></div>
//           </div>

//           {/* Loading modal - Centered */}
//           <div
//             className="relative inline-block rounded-2xl text-left overflow-hidden shadow-2xl transform max-w-md w-full mx-auto my-8 animate-fadeIn"
//             style={{
//               animation:
//                 "fadeIn 0.4s cubic-bezier(0.21, 1.02, 0.73, 1) forwards",
//             }}
//           >
//             {/* Animated background gradient */}
//             <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 opacity-90"></div>

//             {/* Mesh pattern overlay */}
//             <div className="absolute inset-0 opacity-10">
//               <div
//                 className="absolute inset-0"
//                 style={{
//                   backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
//                   backgroundSize: "20px 20px",
//                 }}
//               ></div>
//             </div>

//             <div className="relative p-8 max-w-lg w-full flex flex-col items-center">
//               <h1 className="text-xl text-white mb-8 font-medium">
//                 Loading your Profile, just a moment...
//               </h1>
//               <div className="flex justify-center items-center">
//                 <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-purple-500 shadow-lg shadow-purple-500/30"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );

//   // Extract profile data
//   const { name, avatarUrl, email, mobileNumber } = profileData;
//   const initials = name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();

//   return (
//     <div className="fixed inset-0 z-[9999] overflow-y-auto profile-modal">
//       <style>
//         {`
//           ${keyframes}
//           @keyframes fadeOut {
//             from { opacity: 1; transform: translateY(0); }
//             to { opacity: 0; transform: translateY(-20px); }
//           }
//         `}
//       </style>
//       <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
//         {/* Background overlay with blur */}
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-md"></div>
//         </div>

//         {/* Modal Panel - Centered with animation */}
//         <div
//           className="relative inline-block rounded-2xl text-left overflow-hidden shadow-2xl transform max-w-md w-full mx-auto my-8 animate-fadeIn"
//           style={{
//             animation: "fadeIn 0.4s cubic-bezier(0.21, 1.02, 0.73, 1) forwards",
//           }}
//         >
//           {/* Animated background gradient */}
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 "linear-gradient(135deg, #1e1e3f 0%, #2d1b3d 50%, #1a1a3e 100%)",
//               opacity: 0.95,
//             }}
//           ></div>

//           {/* Mesh pattern overlay */}
//           <div className="absolute inset-0 opacity-10">
//             <div
//               className="absolute inset-0"
//               style={{
//                 backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
//                 backgroundSize: "20px 20px",
//               }}
//             ></div>
//           </div>

//           {/* Animated glow spots */}
//           <div
//             className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
//             style={{ animation: "pulse 4s ease-in-out infinite" }}
//           ></div>
//           <div
//             className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
//             style={{ animation: "pulse 4s ease-in-out infinite 1s" }}
//           ></div>

//           {/* Floating particles */}
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-white/30 rounded-full"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animation: `float ${3 + Math.random() * 4}s linear infinite`,
//                 animationDelay: `${Math.random() * 5}s`,
//               }}
//             ></div>
//           ))}

//           {/* Content */}
//           <div className="relative p-8 max-w-lg w-full flex flex-col items-center">
//             {/* Header with title */}
//             <div className="w-full flex justify-between items-center mb-6">
//               <div className="flex items-center">
//                 <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
//                   <FaUserShield className="text-white text-lg" />
//                 </div>
//                 <h2 className="text-xl font-bold text-white">
//                   Profile Details
//                 </h2>
//               </div>

//               {/* Close button */}
//               <button
//                 onClick={handleClose}
//                 className="group"
//                 data-tooltip-id="profile-close-tooltip"
//                 data-tooltip-content="Close"
//               >
//                 <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-70 blur-md group-hover:blur transition-all duration-300"></div>
//                 <div className="relative">
//                   <RxCrossCircled className="text-2xl text-white hover:text-red-300 cursor-pointer transition-colors duration-300" />
//                 </div>
//               </button>
//               <ReactTooltip
//                 id="profile-close-tooltip"
//                 place="left"
//                 effect="solid"
//                 className="!bg-red-700 !text-white !text-sm !rounded-md !px-3 !py-1 shadow-lg"
//               />
//             </div>

//             {/* Profile Picture with animated border */}
//             <div className="relative mx-auto w-36 h-36 mb-6 group">
//               <div
//                 className="absolute -inset-2 rounded-full opacity-70"
//                 style={{
//                   background:
//                     "linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef, #8b5cf6, #6366f1)",
//                   backgroundSize: "200% 100%",
//                   animation: "shimmer 6s linear infinite",
//                   filter: "blur(8px)",
//                 }}
//               ></div>

//               {!avatarUrl ? (
//                 <div className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg border-2 border-white/30">
//                   {initials}
//                 </div>
//               ) : (
//                 <div className="relative w-full h-full rounded-full shadow-lg border-2 border-white/30 overflow-hidden">
//                   <img
//                     src={avatarUrl}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}

//               {/* Edit Icon Overlay */}
//               <label
//                 htmlFor="profilePicInput"
//                 className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded-full shadow-lg cursor-pointer hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 border border-white/30"
//                 data-tooltip-id="edit-pic-tooltip"
//                 data-tooltip-content="Change Picture"
//               >
//                 <FaEdit className="text-white" />
//               </label>
//               <ReactTooltip
//                 id="edit-pic-tooltip"
//                 place="bottom"
//                 effect="solid"
//                 className="!bg-purple-700 !text-white !text-sm !rounded-md !px-3 !py-1 shadow-lg"
//               />

//               {/* Hidden File Input */}
//               <input
//                 type="file"
//                 id="profilePicInput"
//                 className="hidden"
//                 onChange={handleProfilePicChange}
//                 accept="image/*"
//               />
//             </div>

//             {/* Admin Details */}
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                 {name}
//               </h2>
//               <div className="flex items-center justify-center mt-1">
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
//                   <FaIdCard className="mr-1" /> Hostel Administrator
//                 </span>
//               </div>
//             </div>

//             {/* Contact Information Card */}
//             <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg border border-white/20 w-full mb-6">
//               <h3 className="text-white text-lg font-semibold mb-4 border-b border-white/10 pb-2">
//                 Contact Information
//               </h3>

//               <div className="flex items-center justify-start mb-4 text-gray-200">
//                 <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
//                   <FaEnvelope className="text-white" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-xs text-gray-400">Email Address</span>
//                   <span className="truncate text-white">{email}</span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-start mb-4 text-gray-200">
//                 <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
//                   <FaPhone className="text-white rotate-90" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-xs text-gray-400">Phone Number</span>
//                   <span className="text-white">{mobileNumber}</span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-start text-gray-200">
//                 <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
//                   <FaMapMarkerAlt className="text-white" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-xs text-gray-400">Location</span>
//                   <span className="text-white">Hyderabad, India</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end w-full gap-3">
//               <button
//                 onClick={handleClose}
//                 className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
//               >
//                 Close
//               </button>
//               <button className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2.5 rounded-lg cursor-pointer hover:from-purple-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
//                 Edit Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaUserShield,
  FaBirthdayCake,
  FaIdCard,
} from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { Tooltip as ReactTooltip } from "react-tooltip";

// Animation keyframes
const keyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-10px) rotate(5deg); opacity: 0.8; }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  
  @keyframes shimmer {
    0% { background-position: -100% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(-20px); }
    to { opacity: 0; transform: translateY(-20px); }
  }
`;

const Profile = ({
  setShowProfileModal,
  profileData,
  handleProfilePicChange,
}) => {
  const handleClose = () => {
    setShowProfileModal(false);
  };

  // Loading state
  if (!profileData)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <style>{keyframes}</style>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-md"></div>
          </div>

          {/* Screen reader helper */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {/* Loading modal */}
          <div className="inline-block align-bottom bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 p-6 rounded-2xl shadow-2xl text-center max-w-md w-full overflow-hidden transform transition-all sm:align-middle animate-fadeIn">
            {/* Mesh pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>

            <div className="relative flex flex-col items-center">
              <h1 className="text-lg text-white mb-6 font-medium">
                Loading your Profile, just a moment...
              </h1>
              <div className="flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-purple-500 shadow-lg shadow-purple-500/30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  // Extract profile data
  const { name, avatarUrl, email, mobileNumber } = profileData;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <style>
        {`
          ${keyframes}
        `}
      </style>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay with blur */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75 backdrop-blur-sm"></div>
        </div>

        {/* Screen reader helper */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal Panel */}
        <div className="inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-2xl transform max-w-lg w-full transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fadeIn relative">
          {/* Animated background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #1e1e3f 0%, #2d1b3d 50%, #1a1a3e 100%)",
              opacity: 0.95,
            }}
          ></div>

          {/* Mesh pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          {/* Animated glow spots */}
          <div
            className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
            style={{ animation: "pulse 4s ease-in-out infinite" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
            style={{ animation: "pulse 4s ease-in-out infinite 1s" }}
          ></div>

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}

          {/* Content */}
          <div className="relative p-6 w-full flex flex-col items-center">
            {/* Header with title */}
            <div className="w-full flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <FaUserShield className="text-white text-lg" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Profile Details
                </h2>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="group"
                data-tooltip-id="profile-close-tooltip"
                data-tooltip-content="Close"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-70 blur-md group-hover:blur transition-all duration-300"></div>
                <div className="relative">
                  <RxCrossCircled className="text-2xl text-white hover:text-red-300 cursor-pointer transition-colors duration-300" />
                </div>
              </button>
              <ReactTooltip
                id="profile-close-tooltip"
                place="left"
                effect="solid"
                className="!bg-red-700 !text-white !text-sm !rounded-md !px-3 !py-1 shadow-lg"
              />
            </div>

            {/* Profile Picture with animated border */}
            <div className="relative mx-auto w-32 h-32 mb-4 group">
              <div
                className="absolute -inset-2 rounded-full opacity-70"
                style={{
                  background:
                    "linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef, #8b5cf6, #6366f1)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 6s linear infinite",
                  filter: "blur(8px)",
                }}
              ></div>

              {!avatarUrl ? (
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg border-2 border-white/30">
                  {initials}
                </div>
              ) : (
                <div className="relative w-full h-full rounded-full shadow-lg border-2 border-white/30 overflow-hidden">
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Edit Icon Overlay */}
              <label
                htmlFor="profilePicInput"
                className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded-full shadow-lg cursor-pointer hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 border border-white/30"
                data-tooltip-id="edit-pic-tooltip"
                data-tooltip-content="Change Picture"
              >
                <FaEdit className="text-white" />
              </label>
              <ReactTooltip
                id="edit-pic-tooltip"
                place="bottom"
                effect="solid"
                className="!bg-purple-700 !text-white !text-sm !rounded-md !px-3 !py-1 shadow-lg"
              />

              {/* Hidden File Input */}
              <input
                type="file"
                id="profilePicInput"
                className="hidden"
                onChange={handleProfilePicChange}
                accept="image/*"
              />
            </div>

            {/* Admin Details */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {name}
              </h2>
              <div className="flex items-center justify-center mt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <FaIdCard className="mr-1" /> Hostel Administrator
                </span>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 w-full mb-4">
              <h3 className="text-white text-base font-semibold mb-3 border-b border-white/10 pb-2">
                Contact Information
              </h3>

              <div className="flex items-center justify-start mb-3 text-gray-200">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                  <FaEnvelope className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Email Address</span>
                  <span className="truncate text-white">{email}</span>
                </div>
              </div>

              <div className="flex items-center justify-start mb-3 text-gray-200">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                  <FaPhone className="text-white rotate-90" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Phone Number</span>
                  <span className="text-white">{mobileNumber}</span>
                </div>
              </div>

              <div className="flex items-center justify-start text-gray-200">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Location</span>
                  <span className="text-white">Hyderabad, India</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 w-full">
              <button
                onClick={handleClose}
                className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-400 transition-colors duration-300"
              >
                Close
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded cursor-pointer hover:from-purple-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

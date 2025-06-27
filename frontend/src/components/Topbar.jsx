// import { FaUserCircle, FaSignOutAlt, FaBell, FaCog } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
// import { useState, useEffect } from "react";
// import {
//   backendUrl,
//   logoutToastNotificationSettings,
//   toastNoficationSettings,
// } from "../utils/utils";
// import Profile from "./Profile";
// import { Tooltip as ReactTooltip } from "react-tooltip";

// // Animation keyframes
// const keyframes = `
//   @keyframes shimmer {
//     0% { background-position: -100% 0; }
//     100% { background-position: 200% 0; }
//   }

//   @keyframes pulse {
//     0%, 100% { transform: scale(1); }
//     50% { transform: scale(1.05); }
//   }
// `;

// const Topbar = () => {
//   const navigate = useNavigate();

//   const [profileData, setProfileData] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [lastUploadedFileName, setLastUploadedFileName] = useState(null);

//   const getProfileData = async () => {
//     try {
//       const apiUrl = `${backendUrl}/api/user/view-profile`;
//       const options = {
//         method: "GET",
//         credentials: "include",
//       };
//       const response = await fetch(apiUrl, options);
//       if (response.ok) {
//         const data = await response.json();
//         const { profileInfo } = data;
//         setProfileData(profileInfo);
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getProfileData();
//   }, []);

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.name === lastUploadedFileName) {
//       toast.info("This image is already uploaded.", toastNoficationSettings);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("avatar", file);

//     updateUserImage(formData);
//     setLastUploadedFileName(file.name);
//   };

//   const updateUserImage = async (formData) => {
//     try {
//       const loadingToastId = toast.loading("Updating profile picture...");
//       const response = await fetch(`${backendUrl}/api/user/edit-profile`, {
//         method: "PATCH",
//         credentials: "include",
//         body: formData,
//       });

//       toast.dismiss(loadingToastId);

//       if (response.ok) {
//         getProfileData(); // Refresh UI
//       } else {
//         const error = await response.json();
//         toast.error(error.message || "Upload failed", toastNoficationSettings);
//       }
//     } catch (err) {
//       console.error("Profile Upload Error:", err);
//       toast.error("Something went wrong", toastNoficationSettings);
//     }
//   };

//   const handleLogout = () => {
//     Cookies.remove("jwtToken");
//     navigate("/");
//     toast.success("Logout Successful", logoutToastNotificationSettings);
//   };

//   return (
//     <div className="h-20 z-10 w-full">
//       <style>{keyframes}</style>
//       <div
//         className="h-20 z-10 flex w-full justify-between items-center p-2 sm:p-4 shadow-lg backdrop-blur-md relative overflow-hidden"
//         style={{
//           background:
//             "linear-gradient(to right, rgba(15, 15, 35, 0.95), rgba(42, 27, 61, 0.95))",
//           boxShadow:
//             "0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
//         }}
//       >
//         {/* Animated background elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
//         </div>

//         {/* Welcome Message - Responsive */}
//         {profileData !== null ? (
//           <div className="flex items-center gap-4 z-10">
//             {/* Profile avatar in topbar */}
//             <div
//               className="hidden md:flex relative w-12 h-12 cursor-pointer group"
//               onClick={() => setShowProfileModal(true)}
//             >
//               <div
//                 className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-70"
//                 style={{
//                   background: "linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef, #8b5cf6, #6366f1)",
//                   backgroundSize: "200% 100%",
//                   animation: "shimmer 6s linear infinite",
//                   filter: "blur(4px)"
//                 }}
//               ></div>

//               {!profileData.avatarUrl ? (
//                 <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xl font-bold border border-white/20">
//                   {profileData.name.split(" ").map(n => n[0]).join("").toUpperCase()}
//                 </div>
//               ) : (
//                 <div className="w-full h-full rounded-full overflow-hidden border border-white/20">
//                   <img
//                     src={profileData.avatarUrl}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Welcome text */}
//             <div className="flex flex-col max-w-full overflow-hidden">
//             <h1 className="text-sm sm:text-lg md:text-xl font-medium text-gray-200 flex items-center flex-wrap gap-1">
//               <span className="whitespace-nowrap">Welcome back,</span>
//               <span
//                 className="font-semibold truncate"
//                 style={{
//                   background: "linear-gradient(90deg, #a78bfa, #93c5fd)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent"
//                 }}
//               >
//                 {profileData?.name}
//               </span>
//             </h1>

//             <p className="text-xs sm:text-sm text-gray-400 mt-0 sm:mt-1 hidden sm:block tracking-wide">
//               Hope your rooms are filling fast today 🙂!
//             </p>
//           </div>
//         ) : (
//           <div className="flex flex-col max-w-full overflow-hidden z-10">
//             <h1 className="text-sm sm:text-lg md:text-xl font-medium text-gray-200">
//               Welcome back, Guest
//             </h1>
//             <p className="text-xs sm:text-sm text-gray-400 mt-0 sm:mt-1 italic hidden sm:block">
//               Hope your rooms are filling fast today!
//             </p>
//           </div>
//         )}

//         {/* Icons Section - Responsive */}
//         <div className="flex items-center gap-x-3 sm:gap-x-4 md:gap-x-5 px-2 sm:px-4 z-10">
//           {/* Settings Button */}
//           <button
//             className="relative group"
//             data-tooltip-id="settings-tooltip"
//             data-tooltip-content="Settings"
//           >
//             <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-70 blur-md group-hover:blur transition-all duration-300"></div>
//             <div className="relative flex items-center justify-center w-9 h-9 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
//               <FaCog className="text-white text-lg" />
//             </div>
//           </button>
//           <ReactTooltip
//             id="settings-tooltip"
//             place="bottom"
//             effect="solid"
//             positionStrategy="fixed"
//             className="!bg-blue-700 !text-white !text-sm !rounded-md !px-3 !py-1 shadow-md"
//           />

//           {/* Profile Icon */}
//           <button
//             className="relative group"
//             onClick={() => setShowProfileModal(true)}
//             data-tooltip-id="profile-tooltip"
//             data-tooltip-content="View Profile"
//           >
//             <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full opacity-0 group-hover:opacity-70 blur-md group-hover:blur transition-all duration-300"></div>
//             <div
//               className="relative flex items-center justify-center w-9 h-9 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
//               style={{
//                 background: "linear-gradient(135deg, #8b5cf6, #6366f1)"
//               }}
//             >
//               <FaUserCircle className="text-white text-lg" />
//             </div>
//           </button>
//           <ReactTooltip
//             id="profile-tooltip"
//             place="bottom"
//             effect="solid"
//             positionStrategy="fixed"
//             className="!bg-purple-700 !text-white !text-sm !rounded-md !px-3 !py-1 shadow-md"
//           />

//           {/* Logout Button */}
//           <button
//             className="relative group"
//             onClick={handleLogout}
//             data-tooltip-id="logout-tooltip"
//             data-tooltip-content="Logout"
//           >
//             <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-70 blur-md group-hover:blur transition-all duration-300"></div>
//             <div
//               className="relative flex items-center justify-center w-9 h-9 rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300"
//               style={{
//                 background: "linear-gradient(135deg, #ef4444, #f43f5e)"
//               }}
//             >
//               <FaSignOutAlt className="text-white text-lg" />
//             </div>
//           </button>

//           <ReactTooltip
//             id="logout-tooltip"
//             place="bottom"
//             effect="solid"
//             positionStrategy="fixed"
//             className="!bg-red-700 !text-white !text-sm !rounded-md !px-3 !py-1 shadow-md"
//           />
//         </div>
//       </div>
//       {showProfileModal && (
//         <Profile
//           setShowProfileModal={setShowProfileModal}
//           profileData={profileData}
//           setProfileData={setProfileData}
//           handleProfilePicChange={handleProfilePicChange}
//         />
//       )}
//   </div>
//   );
// };

// export default Topbar;

import { FaUserCircle, FaSignOutAlt, FaBell, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  backendUrl,
  logoutToastNotificationSettings,
  toastNoficationSettings,
} from "../utils/utils";
import Profile from "./Profile";
import { Tooltip as ReactTooltip } from "react-tooltip";

// Animation keyframes
const keyframes = `
  @keyframes shimmer {
    0% { background-position: -100% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const Topbar = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [lastUploadedFileName, setLastUploadedFileName] = useState(null);

  const getProfileData = async () => {
    try {
      const apiUrl = `${backendUrl}/api/user/view-profile`;
      const options = {
        method: "GET",
        credentials: "include",
      };
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const data = await response.json();
        const { profileInfo } = data;
        setProfileData(profileInfo);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name === lastUploadedFileName) {
      toast.info("This image is already uploaded.", toastNoficationSettings);
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    updateUserImage(formData);
    setLastUploadedFileName(file.name);
  };

  const updateUserImage = async (formData) => {
    try {
      const loadingToastId = toast.loading("Updating profile picture...");
      const response = await fetch(`${backendUrl}/api/user/edit-profile`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      toast.dismiss(loadingToastId);

      if (response.ok) {
        getProfileData(); // Refresh UI
      } else {
        const error = await response.json();
        toast.error(error.message || "Upload failed", toastNoficationSettings);
      }
    } catch (err) {
      console.error("Profile Upload Error:", err);
      toast.error("Something went wrong", toastNoficationSettings);
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/");
    toast.success("Logout Successful", logoutToastNotificationSettings);
  };

  return (
    <div className="h-20 z-10 w-full">
      <style>{keyframes}</style>
      <div
        className="h-20 z-10 flex w-full justify-between items-center p-2 sm:p-4 shadow-lg backdrop-blur-md relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to right, rgba(15, 15, 35, 0.95), rgba(42, 27, 61, 0.95))",
          boxShadow:
            "0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Welcome Message - Responsive */}
        {profileData !== null ? (
          <div className="flex items-center gap-4 z-10">
            {/* Profile avatar in topbar */}
            <div
              className="hidden md:flex relative w-12 h-12 cursor-pointer group"
              onClick={() => true}
            >
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-70"
                style={{
                  background:
                    "linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef, #8b5cf6, #6366f1)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 6s linear infinite",
                  filter: "blur(4px)",
                }}
              ></div>

              {!profileData.avatarUrl ? (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xl font-bold border border-white/20">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              ) : (
                <div className="w-full h-full rounded-full overflow-hidden border border-white/20">
                  <img
                    src={profileData.avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Welcome text */}
            <div className="flex flex-col max-w-full overflow-hidden">
              <h1 className="text-sm sm:text-lg md:text-xl font-medium text-gray-200 flex items-center flex-wrap gap-1">
                <span className="whitespace-nowrap">Welcome back,</span>
                <span
                  className="font-semibold truncate"
                  style={{
                    background: "linear-gradient(90deg, #a78bfa, #93c5fd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {profileData?.name}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-400 mt-0 sm:mt-1 hidden sm:block tracking-wide">
                Hope your rooms are filling fast today 🙂!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col max-w-full overflow-hidden z-10">
            <h1 className="text-sm sm:text-lg md:text-xl font-medium text-gray-200">
              Welcome back, Guest
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0 sm:mt-1 italic hidden sm:block">
              Hope your rooms are filling fast today!
            </p>
          </div>
        )}

        {/* Icons Section - Responsive */}
        <div className="flex items-center gap-x-3 sm:gap-x-4 md:gap-x-5 px-2 sm:px-4 z-10">
          {/* Settings Button */}
          <button
            className="relative group"
            data-tooltip-id="settings-tooltip"
            data-tooltip-content="Settings"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-70 blur-md group-hover:blur transition-all duration-300"></div>
            <div className="relative flex items-center justify-center w-9 h-9 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
              <FaCog className="text-white text-lg" />
            </div>
          </button>
          <ReactTooltip
            id="settings-tooltip"
            place="bottom"
            effect="solid"
            positionStrategy="fixed"
            className="!bg-blue-700 !text-white !text-sm !rounded-md !px-3 !py-1 shadow-md"
          />

          {/* Profile Icon */}
          <button
            className="relative group"
            onClick={() => setShowProfileModal(true)}
            data-tooltip-id="profile-tooltip"
            data-tooltip-content="View Profile"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full opacity-0 group-hover:opacity-70 blur-md group-hover:blur transition-all duration-300"></div>
            <div
              className="relative flex items-center justify-center w-9 h-9 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              }}
            >
              <FaUserCircle className="text-white text-lg" />
            </div>
          </button>
          <ReactTooltip
            id="profile-tooltip"
            place="bottom"
            effect="solid"
            positionStrategy="fixed"
            className="!bg-purple-700 !text-white !text-sm !rounded-md !px-3 !py-1 shadow-md"
          />

          {/* Logout Button */}
          <button
            className="relative group"
            onClick={handleLogout}
            data-tooltip-id="logout-tooltip"
            data-tooltip-content="Logout"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-70 blur-md group-hover:blur transition-all duration-300"></div>
            <div
              className="relative flex items-center justify-center w-9 h-9 rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #ef4444, #f43f5e)",
              }}
            >
              <FaSignOutAlt className="text-white text-lg" />
            </div>
          </button>

          <ReactTooltip
            id="logout-tooltip"
            place="bottom"
            effect="solid"
            positionStrategy="fixed"
            className="!bg-red-700 !text-white !text-sm !rounded-md !px-3 !py-1 shadow-md"
          />
        </div>
      </div>

      {/* Profile Modal - Rendered at the root level for proper z-index stacking */}
      {showProfileModal && (
        <Profile
          setShowProfileModal={setShowProfileModal}
          profileData={profileData}
          setProfileData={setProfileData}
          handleProfilePicChange={handleProfilePicChange}
        />
      )}
    </div>
  );
};

export default Topbar;

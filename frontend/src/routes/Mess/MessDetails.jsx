// import { useState, useEffect } from "react";
// import { Edit2, Save, X, Trash2 } from "lucide-react";
// import { backendUrl, toastNoficationSettings } from "../../utils/utils";
// import { toast } from "react-toastify"; // Assumed to be used based on toastNoficationSettings
// import NoHostelMessage from "../NoHostelMessage";

// export default function WeeklyMessMenu() {
//   const [loading, setLoading] = useState(true);
//   const [hostel, setHostel] = useState(null);
//   const [messDetails, setMessDetails] = useState({});
//   const [editMode, setEditMode] = useState({});
//   const [editedDetails, setEditedDetails] = useState({});
  
//   // Days of the week array
//   const daysOfWeek = [
//     "Monday", 
//     "Tuesday", 
//     "Wednesday", 
//     "Thursday", 
//     "Friday", 
//     "Saturday", 
//     "Sunday"
//   ];

//   // Meal times
//   const mealTimes = {
//     breakfast: "7:30 AM - 9:00 AM",
//     lunch: "12:30 PM - 2:00 PM",
//     dinner: "7:00 PM - 9:00 PM"
//   };
  
//   // API URLs
//   const getHostelUrl = `${backendUrl}/api/hostel/view`;
//   const getAllMessDetailsUrl = `${backendUrl}/api/mess/`;
//   const createMessDetailsUrl = `${backendUrl}/api/mess/`;
//   const updateMessDetailsUrl = `${backendUrl}/api/mess/edit/`;
//   const deleteMessDetailsUrl = `${backendUrl}/api/mess/delete/`;

//   // Fetch hostel data
  // const fetchHostel = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(getHostelUrl, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Hostel data:", data);
  //       if (data) {
  //         setHostel(data);
  //         fetchMessMenu();
  //       } else {
  //         setHostel(null);
  //       }
  //     }
  //   } catch (error) {
  //     toast.warning("Failed to fetch hostel data", toastNoficationSettings);
  //     console.error("Error fetching hostel:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

// //   // Fetch mess menu data
//   const fetchMessMenu = async () => {
//     try {
//       const response = await fetch(getAllMessDetailsUrl, {
//         method: "GET",
//         credentials: "include",
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Mess menu data:", data);
        
//         // Transform data into required format
//         const formattedData = {};
//         data.forEach(item => {
//           if (!formattedData[item.day]) {
//             formattedData[item.day] = {};
//           }
//           formattedData[item.day][item.mealType.toLowerCase()] = item.menu;
          
//           // Store ID for updates/deletes
//           formattedData[item.day][`${item.mealType.toLowerCase()}Id`] = item._id;
//         });
        
//         setMessDetails(formattedData);
//       } else {
//         toast.warning("Failed to fetch mess menu", toastNoficationSettings);
//       }
//     } catch (error) {
//       toast.warning("Something went wrong while fetching menu", toastNoficationSettings);
//       console.error("Error fetching mess menu:", error);
//     }
//   };

//   // Handle edit button click
//   const handleEdit = (day, meal) => {
//     const key = `${day}-${meal}`;
//     setEditMode({ ...editMode, [key]: true });
//     setEditedDetails({ 
//       ...editedDetails, 
//       [key]: messDetails[day]?.[meal] || "" 
//     });
//   };

//   // Handle change in textarea
//   const handleChange = (key, value) => {
//     setEditedDetails({ ...editedDetails, [key]: value });
//   };

//   // Handle save button click
//   const handleSave = async (key) => {
//     const [day, meal] = key.split("-");
//     const mealId = messDetails[day]?.[`${meal}Id`];
//     const menuContent = editedDetails[key];
    
//     try {
//       let response;
//       let method;
//       let url;
//       let body;
      
//       if (mealId) {
//         // Update existing meal
//         method = "PUT";
//         url = `${updateMessDetailsUrl}${mealId}`;
//         body = { menu: menuContent };
//       } else {
//         // Create new meal
//         method = "POST";
//         url = createMessDetailsUrl;
//         body = {
//           day: day,
//           mealType: meal.charAt(0).toUpperCase() + meal.slice(1),
//           menu: menuContent
//         };
//       }
      
//       response = await fetch(url, {
//         method: method,
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });
      
//       if (response.ok) {
//         // Update local state
//         setMessDetails(prevDetails => {
//           const newDetails = { ...prevDetails };
//           if (!newDetails[day]) newDetails[day] = {};
//           newDetails[day][meal] = menuContent;
          
//           // If this was a creation, store the ID
//           if (!mealId) {
//             const data = response.json();
//             newDetails[day][`${meal}Id`] = data._id;
//           }
          
//           return newDetails;
//         });
        
//         toast.success(`${day} ${meal} updated successfully!`, toastNoficationSettings);
//         // Exit edit mode
//         setEditMode({ ...editMode, [key]: false });
        
//         // Refresh data to ensure we have latest
//         fetchMessMenu();
//       } else {
//         toast.error("Failed to update menu item", toastNoficationSettings);
//       }
//     } catch (error) {
//       toast.error("Something went wrong", toastNoficationSettings);
//       console.error("Error saving menu item:", error);
//     }
//   };

//   // Handle cancel button click
//   const handleCancel = (key) => {
//     setEditMode({ ...editMode, [key]: false });
//   };
  
//   // Handle delete button click
//   const handleDelete = async (day, meal) => {
//     const mealId = messDetails[day]?.[`${meal}Id`];
    
//     if (!mealId) {
//       toast.warning("Cannot delete - item not found", toastNoficationSettings);
//       return;
//     }
    
//     if (window.confirm(`Are you sure you want to delete ${meal} for ${day}?`)) {
//       try {
//         const response = await fetch(`${deleteMessDetailsUrl}${mealId}`, {
//           method: "DELETE",
//           credentials: "include",
//         });
        
//         if (response.ok) {
//           // Update local state
//           setMessDetails(prevDetails => {
//             const newDetails = { ...prevDetails };
//             if (newDetails[day]) {
//               delete newDetails[day][meal];
//               delete newDetails[day][`${meal}Id`];
              
//               // If day has no more meals, remove the day
//               if (Object.keys(newDetails[day]).length === 0) {
//                 delete newDetails[day];
//               }
//             }
//             return newDetails;
//           });
          
//           toast.success(`${day} ${meal} deleted successfully!`, toastNoficationSettings);
//         } else {
//           toast.error("Failed to delete menu item", toastNoficationSettings);
//         }
//       } catch (error) {
//         toast.error("Something went wrong", toastNoficationSettings);
//         console.error("Error deleting menu item:", error);
//       }
//     }
//   };


//   // Initialize data on component mount
//   useEffect(() => {
//     fetchHostel();
//   }, []);

//   return (
//     <div>
//       <div className="w-full pt-0 min-h-screen flex justify-center items-start relative">
//         <div className="w-full pt-4 max-w-7xl">
//           {loading ? (
//             <div className="flex justify-center items-center h-60">
//               <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
//             </div>
//           ) : !hostel || Object.keys(hostel).length === 0 ? (
//             <NoHostelMessage />
//           ) : (
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-8">
//               <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-800 drop-shadow-md">
//                 🍽️ Weekly Mess Menu
//               </h1>

              
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
// //                 {daysOfWeek.map((day) => (
// //                   <div
// //                     key={day}
// //                     className="bg-white border border-blue-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
// //                   >
// //                     <div className="bg-blue-600 text-white px-6 py-3 rounded-t-xl">
// //                       <h2 className="text-xl font-bold">{day}</h2>
// //                     </div>

// //                     <div className="p-5">
// //                       {Object.keys(mealTimes).map((meal) => (
// //                         <div key={meal} className="mb-6 last:mb-0">
// //                           <div className="flex items-center justify-between mb-2">
// //                             <h3 className="font-semibold text-blue-700 capitalize">
// //                               {meal}
// //                             </h3>
// //                             <span className="text-xs text-gray-500">
// //                               {mealTimes[meal]}
// //                             </span>
// //                           </div>

// //                           {editMode[`${day}-${meal}`] ? (
// //                             <div className="mt-2">
// //                               <textarea
// //                                 value={editedDetails[`${day}-${meal}`]}
// //                                 onChange={(e) =>
// //                                   handleChange(`${day}-${meal}`, e.target.value)
// //                                 }
// //                                 className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm"
// //                                 rows={3}
// //                                 placeholder={`Enter ${meal} menu for ${day}...`}
// //                               />
// //                               <div className="flex gap-2 mt-2">
// //                                 <button
// //                                   onClick={() => handleSave(`${day}-${meal}`)}
// //                                   className="flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
// //                                 >
// //                                   <Save size={14} />
// //                                   Save
// //                                 </button>
// //                                 <button
// //                                   onClick={() => handleCancel(`${day}-${meal}`)}
// //                                   className="flex items-center justify-center gap-1 bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-400 transition"
// //                                 >
// //                                   <X size={14} />
// //                                   Cancel
// //                                 </button>
// //                               </div>
// //                             </div>
// //                           ) : (
// //                             <div className="relative bg-blue-50 p-3 rounded-lg border border-dashed border-blue-200 min-h-20">
// //                               <p className="text-gray-700 text-sm whitespace-pre-line pr-8">
// //                                 {messDetails[day]?.[meal] || "No meal added yet"}
// //                               </p>
// //                               <div className="absolute top-2 right-2 flex flex-col gap-2">
// //                                 <button
// //                                   onClick={() => handleEdit(day, meal)}
// //                                   className="p-1 bg-white rounded-md border border-blue-200 text-blue-600 hover:bg-blue-100 transition-colors"
// //                                   aria-label={`Edit ${meal} for ${day}`}
// //                                 >
// //                                   <Edit2 size={14} />
// //                                 </button>
// //                                 {messDetails[day]?.[meal] && (
// //                                   <button
// //                                     onClick={() => handleDelete(day, meal)}
// //                                     className="p-1 bg-white rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
// //                                     aria-label={`Delete ${meal} for ${day}`}
// //                                   >
// //                                     <Trash2 size={14} />
// //                                   </button>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
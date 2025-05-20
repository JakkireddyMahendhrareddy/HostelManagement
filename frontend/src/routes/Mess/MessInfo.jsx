import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import NoHostelMessage from "../NoHostelMessage";
import ConfirmModal from "../ConfirmModal";
import { backendUrl, toastNoficationSettings } from "../../utils/utils";
import MessTable from "./MessTable";
import MessFormModal from "./MessFormModal";
import MessDetailsModal from "./MessDetailsModal";

const MessInfo = () => {
  // API URLs
  const getHostelUrl = `${backendUrl}/api/hostel/view`;
  const getAllMessDetailsUrl = `${backendUrl}/api/mess/`;
  const createMessDetailsUrl = `${backendUrl}/api/mess/`;
  const updateMessDetailsUrl = `${backendUrl}/api/mess/edit`;
  const deleteMessDetailsUrl = `${backendUrl}/api/mess/delete`;

  // State variables
  const [messDetails, setMessDetails] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hostel, setHostel] = useState(null);
  const [showMessFormModal, setShowMessFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [messDayDelete, setMessDayDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New menu form state
  const [newMenu, setNewMenu] = useState({
    day: "",
    meals: {
      breakfast: {
        item: "",
        time: "",
      },
      lunch: {
        item: "",
        time: "",
      },
      dinner: {
        item: "",
        time: "",
      },
    },
  });

  // Fetch hostel details
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
          fetchMessMenu();
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

  // Fetch mess menu data from API
  const fetchMessMenu = async () => {
    setLoading(true);
    try {
      const response = await axios.get(getAllMessDetailsUrl, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("Mess menu data:", data);

        if (!data || data.length === 0) {
          toast.info(
            "No mess timetable found. Please add it first.",
            toastNoficationSettings
          );
          setMessDetails({});
          setMenuData([]);
          return;
        }

        const formattedData = {};
        data.forEach((item) => {
          const day = item.day;
          const meals = item.meals;

          if (!day || !meals) return;

          formattedData[day] = {
            breakfast: meals.breakfast?.item || "",
            breakfastTime: meals.breakfast?.time || "",
            lunch: meals.lunch?.item || "",
            lunchTime: meals.lunch?.time || "",
            dinner: meals.dinner?.item || "",
            dinnerTime: meals.dinner?.time || "",
            id: item._id || Math.random().toString(),
          };
        });

        setMessDetails(formattedData);

        // Convert for table format
        const tableData = Object.keys(formattedData).map((day) => {
          const meal = formattedData[day];
          return {
            id: meal.id,
            day,
            breakfast: meal.breakfast,
            breakfastTime: meal.breakfastTime,
            lunch: meal.lunch,
            lunchTime: meal.lunchTime,
            dinner: meal.dinner,
            dinnerTime: meal.dinnerTime,
          };
        });

        setMenuData(tableData);
      } else {
        toast.warning("Failed to fetch mess menu", toastNoficationSettings);
        setMenuData([]);
      }
    } catch (error) {
      console.error("Error fetching mess menu:", error);
      toast.error(
        "Something went wrong while fetching mess menu",
        toastNoficationSettings
      );
      setMenuData([]);
    } finally {
      setLoading(false);
    }
  };

  // Create new mess menu
  const createMessMenu = async (menuItem) => {
    setLoading(true);
    try {
      const response = await axios.post(createMessDetailsUrl, menuItem, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Mess menu added successfully", toastNoficationSettings);
        await fetchMessMenu(); // refresh list after create
        return true;
      } else {
        const errorData = response.data;
        toast.error(
          errorData.message || "Failed to add mess menu",
          toastNoficationSettings
        );
        return false;
      }
    } catch (error) {
      console.error("Error creating mess menu:", error);
      toast.error(
        "Something went wrong while adding mess menu",
        toastNoficationSettings
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update mess menu
  const editMessMenu = async (id, updatedMenuItem) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${updateMessDetailsUrl}/${id}`,
        updatedMenuItem,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(
          "Mess menu updated successfully",
          toastNoficationSettings
        );
        await fetchMessMenu(); // refresh after update
        return true;
      } else {
        const errorData = response.data;
        toast.error(
          errorData.message || "Failed to update mess menu",
          toastNoficationSettings
        );
        return false;
      }
    } catch (error) {
      console.error("Error updating mess menu:", error);
      toast.error(
        "Something went wrong while updating mess menu",
        toastNoficationSettings
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Simple handleDeleteClick function
  const handleDeleteClick = (menuId) => {
    console.log("Deleting menu with ID:", menuId);
    setMessDayDelete(menuId);
    setShowConfirmModal(true);
  };

  const deleteMessMenu = async () => {
  // Step 1: Check if we have an ID to delete
  if (!messDayDelete) {
    console.error("No menu ID to delete");
    toast.error(
      "Error: No menu selected for deletion",
      toastNoficationSettings
    );
    setShowConfirmModal(false);
    return;
  }
  
  const idToDelete = messDayDelete;
  console.log("Attempting to delete menu with ID:", idToDelete);
  
  try {
    // Step 2: Construct the delete URL with proper format
    const deleteUrl = `${deleteMessDetailsUrl}/${idToDelete}`;
    console.log("Delete URL:", deleteUrl);
    
    // Step 3: Send the delete request to the server
    const response = await axios.delete(deleteUrl, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
      
    // Step 4: Handle successful response
    console.log("Delete successful, response:", response);
    toast.success(
      "Mess menu deleted successfully",
      toastNoficationSettings
    );
    // Refresh the list to show updated data
    await fetchMessMenu();
    
  } catch (error) {
    console.error("Error deleting mess menu:", error);
    
    // Step 5: Handle specific error cases
    if (error.response) {
      // Server responded with an error status code
      console.error("Error response:", error.response);
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
      
      // Handle different error status codes
      if (error.response.status === 404) {
        toast.error(
          "Menu item not found. It may have been deleted already.",
          toastNoficationSettings
        );
        // Refresh to show current state - might need to be outside this condition
        await fetchMessMenu();
      } else {
        // Extract error message from response if available
        const errorMessage = 
          error.response.data && 
          (error.response.data.message || error.response.data.error || JSON.stringify(error.response.data))
            ? (error.response.data.message || error.response.data.error || JSON.stringify(error.response.data))
            : "Server error";
        
        toast.error(
          `Failed to delete: ${errorMessage}`,
          toastNoficationSettings
        );
      }
    } else if (error.request) {
      // No response received from server
      console.error("Error request:", error.request);
      toast.error(
        "Network error: No response from server",
        toastNoficationSettings
      );
    } else {
      // Other errors
      toast.error(`Error: ${error.message}`, toastNoficationSettings);
    }
  } finally {
    // Step 6: Always clean up the state regardless of success or failure
    setShowConfirmModal(false);
    setMessDayDelete(null);
  }
};

  // Initial data loading
  useEffect(() => {
    fetchHostel();
  }, []);

  // Handle form input changes
  const handleMenuChange = (e) => {
    const { name, value } = e.target;

    // Handle nested objects for meals
    if (name.includes(".")) {
      const [mealType, field] = name.split(".");
      setNewMenu((prev) => ({
        ...prev,
        meals: {
          ...prev.meals,
          [mealType]: {
            ...prev.meals[mealType],
            [field]: value,
          },
        },
      }));
    } else {
      // Handle regular fields
      setNewMenu((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};

    // Basic validation
    if (!newMenu.day?.trim()) {
      errors.day = "Day is required";
    }

    if (!newMenu.meals.breakfast.item?.trim()) {
      errors.breakfastItem = "Breakfast item is required";
    }

    if (!newMenu.meals.breakfast.time?.trim()) {
      errors.breakfastTime = "Breakfast time is required";
    }

    if (!newMenu.meals.lunch.item?.trim()) {
      errors.lunchItem = "Lunch item is required";
    }

    if (!newMenu.meals.lunch.time?.trim()) {
      errors.lunchTime = "Lunch time is required";
    }

    if (!newMenu.meals.dinner.item?.trim()) {
      errors.dinnerItem = "Dinner item is required";
    }

    if (!newMenu.meals.dinner.time?.trim()) {
      errors.dinnerTime = "Dinner time is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit form with validation
  const submitForm = async (e) => {
    if (e) e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        let success;
        if (isEditing) {
          success = await editMessMenu(selectedMenu.id, newMenu);
        } else {
          success = await createMessMenu(newMenu);
        }

        if (success) {
          // Reset form and close modal
          resetForm();
          setShowMessFormModal(false);
        }
      } catch (error) {
        console.error("Error submitting menu form:", error);
        toast.error("Error saving menu information. Please try again.");

        setFormErrors({
          general: "There was an error saving the menu. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.warning("Please correct the errors in the form");
    }
  };

  // Reset form after submission or cancel
  const resetForm = () => {
    setNewMenu({
      day: "",
      meals: {
        breakfast: {
          item: "",
          time: "",
        },
        lunch: {
          item: "",
          time: "",
        },
        dinner: {
          item: "",
          time: "",
        },
      },
    });
    setFormErrors({});
    setIsEditing(false);
    setSelectedMenu(null);
  };

  // Handle view details button click
  const handleViewClick = (menu) => {
    setSelectedMenu(menu);
    setShowDetailsModal(true);
  };

  // Handle edit button click
  const handleEditClick = (menu) => {
    setSelectedMenu(menu);

    // Format the menu data for the form
    setNewMenu({
      day: menu.day,
      meals: {
        breakfast: {
          item: menu.breakfast,
          time: menu.breakfastTime,
        },
        lunch: {
          item: menu.lunch,
          time: menu.lunchTime,
        },
        dinner: {
          item: menu.dinner,
          time: menu.dinnerTime,
        },
      },
    });

    setIsEditing(true);
    setShowMessFormModal(true);
  };

  // Handle delete button click
  // const handleDeleteClick = (menuId) => {
  //   setMessDayDelete(menuId);
  //   setShowConfirmModal(true);
  // };

  return (
    <div className="w-full bg-white pt-0 min-h-screen flex justify-center items-start relative">
      <div className="w-full pt-4 max-w-7xl px-4">
        {loading && menuData.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : !hostel || Object.keys(hostel).length === 0 ? (
          <NoHostelMessage />
        ) : (
          <div className="min-h-screen bg-white shadow-lg p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-800 drop-shadow-md">
                🍽️ Weekly Mess Menu
              </h1>
              <button
                onClick={() => {
                  resetForm();
                  setShowMessFormModal(true);
                }}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md shadow-md transition-colors"
              >
                <Plus size={20} />
                Create Mess Day
              </button>
            </div>

            {menuData.length === 0 ? (
              <div className="text-center text-gray-500 mt-4 text-lg font-medium">
                No mess timetable found. Please add one.
              </div>
            ) : (
              <MessTable
                menuData={menuData}
                handleDeleteClick={handleDeleteClick}
                loading={loading}
                handleEditClick={handleEditClick}
                handleViewClick={handleViewClick}
              />
            )}

            {/* Mess Form Modal */}
            {showMessFormModal && (
              <MessFormModal
                setShowMessFormModal={setShowMessFormModal}
                newMenu={newMenu}
                handleMenuChange={handleMenuChange}
                handleMenuSubmit={submitForm}
                isEditing={isEditing}
                resetForm={resetForm}
                formErrors={formErrors}
                isSubmitting={isSubmitting}
              />
            )}

            {/* Mess Details Modal */}
            {showDetailsModal && (
              <MessDetailsModal
                menu={selectedMenu}
                setShowDetailsModal={setShowDetailsModal}
              />
            )}

            {/* Confirm Delete Modal */}
            {showConfirmModal && (
              <ConfirmModal
                confirmType="mess"
                confirmDelete={deleteMessMenu}
                setShowConfirmModal={setShowConfirmModal}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessInfo;

// import { useState, useEffect } from "react";
// import { Eye, Edit, Trash2, X, Plus } from "lucide-react";
// import NoHostelMessage from "../NoHostelMessage";
// import { backendUrl, toastNoficationSettings } from "../../utils/utils";
// import { toast } from "react-toastify";
// import MessTable from "./MessTable";
// import ConfirmModal from "../ConfirmModal";

// // Main application component
// export default function MessMenuApp() {
//   const [menuData, setMenuData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [messDetails, setMessDetails] = useState({});
//   const [hostel, setHostel] = useState(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedMenu, setSelectedMenu] = useState(null);
//   const [messDayDelete, setMessDayDelete] = useState(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [newMenu, setNewMenu] = useState({
//     day: "",
//     breakfast: "",
//     lunch: "",
//     dinner: "",
//   });

//   //api's
//   const getHostelUrl = `${backendUrl}/api/hostel/view`;
//   const getAllMessDetailsUrl = `${backendUrl}/api/mess/`;
//   const createMessDetailsUrl = `${backendUrl}/api/mess/`;
//   const updateMessDetailsUrl = `${backendUrl}/api/mess/edit/`;
//   const deleteMessDetailsUrl = `${backendUrl}/api/mess/delete/`;

//   // Load data with simulated loading state
//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Handle opening the view modal
//   const handleView = (menu) => {
//     setSelectedMenu(menu);
//     setIsViewModalOpen(true);
//   };

//   // Handle opening the edit modal
//   const handleEdit = (menu) => {
//     setSelectedMenu({ ...menu });
//     setIsEditModalOpen(true);
//   };

//   // Handle opening the delete modal
//   const handleDelete = (menu) => {
//     setSelectedMenu(menu);
//     setIsDeleteModalOpen(true);
//   };

//   // Handle form input changes for new menu
//   const handleNewMenuChange = (e) => {
//     const { name, value } = e.target;
//     setNewMenu((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form input changes for edit menu
//   const handleEditMenuChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedMenu((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Save new menu item
//   const handleSaveNewMenu = () => {
//     setMenuData([...menuData, { id: menuData.length + 1, ...newMenu }]);
//     setNewMenu({
//       day: "",
//       breakfast: "",
//       lunch: "",
//       dinner: "",
//     });
//     setIsCreateModalOpen(false);
//   };

//   // Save edited menu item
//   const handleSaveEditMenu = () => {
//     setMenuData(
//       menuData.map((item) =>
//         item.id === selectedMenu.id ? selectedMenu : item
//       )
//     );
//     setIsEditModalOpen(false);
//   };

//   // Confirm delete menu item
//   const handleConfirmDelete = () => {
//     setMenuData(menuData.filter((item) => item.id !== selectedMenu.id));
//     setIsDeleteModalOpen(false);
//   };

//   //fetch hostel details
//   const fetchHostel = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(getHostelUrl, {
//         method: "GET",
//         credentials: "include",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         if (data) {
//           setHostel(data);
//           fetchRooms();
//         } else {
//           setHostel(null);
//         }
//       }
//     } catch (error) {
//       toast.warning("Something Went Wrong", toastNoficationSettings);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHostel();
//   }, []);

//   // Fetch mess menu data from API
//   const fetchMessMenu = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(getAllMessDetailsUrl, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Mess menu data:", data);

//         if (!data || data.length === 0) {
//           toast.info(
//             "No mess timetable found. Please add it first.",
//             toastNotificationSettings
//           );
//           setMessDetails({});
//           setMenuData([]);
//           return;
//         }

//         const formattedData = {};
//         data.forEach((item) => {
//           const day = item.day;
//           const meals = item.meals;

//           if (!day || !meals) return;

//           formattedData[day] = {
//             breakfast: meals.breakfast?.item || "",
//             breakfastTime: meals.breakfast?.time || "",
//             lunch: meals.lunch?.item || "",
//             lunchTime: meals.lunch?.time || "",
//             dinner: meals.dinner?.item || "",
//             dinnerTime: meals.dinner?.time || "",
//             id: item._id || Math.random().toString(),
//           };
//         });

//         setMessDetails(formattedData);

//         // Convert for table format
//         const tableData = Object.keys(formattedData).map((day) => {
//           const meal = formattedData[day];
//           return {
//             id: meal.id,
//             day,
//             breakfast: `${meal.breakfast} (${meal.breakfastTime})`,
//             lunch: `${meal.lunch} (${meal.lunchTime})`,
//             dinner: `${meal.dinner} (${meal.dinnerTime})`,
//           };
//         });

//         setMenuData(tableData);
//       } else {
//         toast.warning("Failed to fetch mess menu", toastNotificationSettings);
//         setMenuData([]);
//       }
//     } catch (error) {
//       console.error("Error fetching mess menu:", error);
//       toast.error(
//         "Something went wrong while fetching mess menu",
//         toastNotificationSettings
//       );
//       setMenuData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load data on component mount
//   useEffect(() => {
//     fetchMessMenu();
//   }, []);

//   const createMessMenu = async (newMenuItem) => {
//     setLoading(true);
//     try {
//       const response = await fetch(createMessDetailsUrl, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newMenuItem),
//       });

//       if (response.ok) {
//         toast.success(
//           "Mess menu added successfully",
//           toastNotificationSettings
//         );
//         await fetchMessMenu(); // refresh list after create
//       } else {
//         const errorData = await response.json();
//         toast.error(
//           errorData.message || "Failed to add mess menu",
//           toastNoficationSettings
//         );
//       }
//     } catch (error) {
//       console.error("Error creating mess menu:", error);
//       toast.error(
//         "Something went wrong while adding mess menu",
//         toastNoficationSettings
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     createMessMenu();
//   }, []);

//   const editMessMenu = async (id, updatedMenuItem) => {
//     // id is mess menu _id or unique id
//     // updatedMenuItem has same structure as create

//     setLoading(true);
//     try {
//       const response = await fetch(`${updateMessDetailsUrl}/${id}`, {
//         method: "PUT", // or PATCH depending on your API design
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedMenuItem),
//       });

//       if (response.ok) {
//         toast.success(
//           "Mess menu updated successfully",
//           toastNoficationSettings
//         );
//         await fetchMessMenu(); // refresh after update
//       } else {
//         const errorData = await response.json();
//         toast.error(
//           errorData.message || "Failed to update mess menu",
//           toastNoficationSettings
//         );
//       }
//     } catch (error) {
//       console.error("Error updating mess menu:", error);
//       toast.error(
//         "Something went wrong while updating mess menu",
//         toastNoficationSettings
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     editMessMenu();
//   }, []);

//   const deleteMessMenu = async () => {
//     const idToDelete = setMessDayDelete;

//     try {
//       const response = await fetch(`${deleteMessDetailsUrl}/${idToDelete}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (response.ok) {
//         toast.success(
//           "Mess menu deleted successfully",
//           toastNoficationSettings
//         );
//         await fetchMessMenu(); // refresh after delete
//       } else {
//         const errorData = await response.json();
//         toast.error(
//           errorData.message || "Failed to delete mess menu",
//           toastNoficationSettings
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting mess menu:", error);
//       toast.error(
//         "Something went wrong while deleting mess menu",
//         toastNoficationSettings
//       );
//     } finally {
//       setShowConfirmModal(false);
//       setTenantIdToDelete(null);
//     }
//   };

//   useEffect(() => {
//     deleteMessMenu();
//   }, []);

//   const handleDeleteClick = (day) => {
//     setMessDayDelete(day);
//     setShowConfirmModal(true);
//   };

//   return (
//     <div className="w-full bg-white pt-0 min-h-screen flex justify-center items-start relative">
//       <div className="w-full pt-4 max-w-7xl px-4">
//         {loading && messDetails.length === 0 ? (
//           <div className="flex justify-center items-center h-60">
//             <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
//           </div>
//         ) : !hostel || Object.keys(hostel).length === 0 ? (
//           <NoHostelMessage />
//         ) : messDetails.length === 0 ? (
//           <div className="text-center text-gray-500 mt-4 text-lg font-medium">
//             No mess timetable found. Please add one.
//           </div>
//         ) : (
//           <div className="min-h-screen bg-white shadow-lg p-4 md:p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-3xl md:text-4xl font-bold text-blue-800 drop-shadow-md">
//                 🍽️ Weekly Mess Menu
//               </h1>
//               <button
//                 onClick={() => setIsCreateModalOpen(true)}
//                 className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
//               >
//                 <Plus size={20} />
//                 Create New
//               </button>
//             </div>

//             {/* Menu Table */}
//             <MessTable
//               messDetails={messDetails}
//               handleDeleteClick={handleDeleteClick}
//               loading={loading}
//               handleEditClick={handleEditClick}
//               handleViewClick={handleViewClick}
//             />

//             {showConfirmModal && (
//               <ConfirmModal
//                 confirmType="mess"
//                 confirmDelete={deleteMessMenu}
//                 setShowConfirmModal={setShowConfirmModal}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// {
//   /* Create Modal */
// }

// // {isCreateModalOpen && (
// //   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
// //     <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl">
// //       <div className="flex justify-between items-center p-6 border-b">
// //         <h2 className="text-2xl font-bold text-gray-800">Add New Menu</h2>
// //         <button
// //           onClick={() => setIsCreateModalOpen(false)}
// //           className="text-gray-500 hover:text-gray-700"
// //         >
// //           <X size={24} />
// //         </button>
// //       </div>
// //       <div className="p-6">
// //         <div className="space-y-4">
// //           <div>
// //             <label className="block text-gray-700 font-medium mb-2">
// //               Day
// //             </label>
// //             <select
// //               name="day"
// //               value={newMenu.day}
// //               onChange={handleNewMenuChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             >
// //               <option value="">Select Day</option>
// //               <option value="Monday">Monday</option>
// //               <option value="Tuesday">Tuesday</option>
// //               <option value="Wednesday">Wednesday</option>
// //               <option value="Thursday">Thursday</option>
// //               <option value="Friday">Friday</option>
// //               <option value="Saturday">Saturday</option>
// //               <option value="Sunday">Sunday</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className="block text-gray-700 font-medium mb-2">
// //               Breakfast
// //             </label>
// //             <input
// //               type="text"
// //               name="breakfast"
// //               value={newMenu.breakfast}
// //               onChange={handleNewMenuChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Enter breakfast menu"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-gray-700 font-medium mb-2">
// //               Lunch
// //             </label>
// //             <input
// //               type="text"
// //               name="lunch"
// //               value={newMenu.lunch}
// //               onChange={handleNewMenuChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Enter lunch menu"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-gray-700 font-medium mb-2">
// //               Dinner
// //             </label>
// //             <input
// //               type="text"
// //               name="dinner"
// //               value={newMenu.dinner}
// //               onChange={handleNewMenuChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Enter dinner menu"
// //               required
// //             />
// //           </div>
// //         </div>
// //       </div>
// //       <div className="flex justify-end p-6 border-t gap-3">
// //         <button
// //           onClick={() => setIsCreateModalOpen(false)}
// //           className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
// //         >
// //           Cancel
// //         </button>
// //         <button
// //           onClick={handleSaveNewMenu}
// //           className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600"
// //         >
// //           Save Menu
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // )}

// // {/* View Modal */}
// // {isViewModalOpen && selectedMenu && (
// //   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
// //     <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl">
// //       <div className="flex justify-between items-center p-6 border-b">
// //         <h2 className="text-2xl font-bold text-gray-800">
// //           {selectedMenu.day}'s Menu
// //         </h2>
// //         <button
// //           onClick={() => setIsViewModalOpen(false)}
// //           className="text-gray-500 hover:text-gray-700"
// //         >
// //           <X size={24} />
// //         </button>
// //       </div>
// //       <div className="p-6">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div className="space-y-2">
// //             <h3 className="font-bold text-gray-700">Breakfast</h3>
// //             <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
// //               {selectedMenu.breakfast}
// //             </p>
// //           </div>
// //           <div className="space-y-2">
// //             <h3 className="font-bold text-gray-700">Lunch</h3>
// //             <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
// //               {selectedMenu.lunch}
// //             </p>
// //           </div>
// //           <div className="space-y-2">
// //             <h3 className="font-bold text-gray-700">Dinner</h3>
// //             <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
// //               {selectedMenu.dinner}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="flex justify-end p-6 border-t">
// //         <button
// //           onClick={() => setIsViewModalOpen(false)}
// //           className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600"
// //         >
// //           Close
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // )}

// // {/* Edit Modal */}
// // {isEditModalOpen && selectedMenu && (
// //   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
// //     <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl">
// //       <div className="flex justify-between items-center p-6 border-b">
// //         <h2 className="text-2xl font-bold text-gray-800">
// //           Edit {selectedMenu.day}'s Menu
// //         </h2>
// //         <button
// //           onClick={() => setIsEditModalOpen(false)}
// //           className="text-gray-500 hover:text-gray-700"
// //         >
// //           <X size={24} />
// //         </button>
// //       </div>
// //       <div className="p-6">
// //         <div className="space-y-4">
// //           <div>
// //             <label className="block text-gray-700 font-medium mb-2">
// //               Day
// //             </label>
// //             <select
// //               name="day"
// //               value={selectedMenu.day}
// //               onChange={handleEditMenuChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               required
// //             >
// //               <option value="Monday">Monday</option>
// //               <option value="Tuesday">Tuesday</option>
// //               <option value="Wednesday">Wednesday</option>
// //               <option value="Thursday">Thursday</option>
// //               <option value="Friday">Friday</option>
// //               <option value="Saturday">Saturday</option>
// //               <option value="Sunday">Sunday</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className="block text-gray-700 font-medium mb-2">
// //               Breakfast
// //             </label>
// //             <input
// //               type="text"
// //               name="breakfast"
// //               value={selectedMenu.breakfast}
// //               onChange={handleEditMenuChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Enter breakfast menu"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-gray-700 font-medium mb-2">
// //               Lunch
// //             </label>
// //             <input
// //               type="text"
// //               name="lunch"
// //               value={selectedMenu.lunch}
// //               onChange={handleEditMenuChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Enter lunch menu"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-gray-700 font-medium mb-2">
// //               Dinner
// //             </label>
// //             <input
// //               type="text"
// //               name="dinner"
// //               value={selectedMenu.dinner}
// //               onChange={handleEditMenuChange}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Enter dinner menu"
// //               required
// //             />
// //           </div>
// //         </div>
// //       </div>
// //       <div className="flex justify-end p-6 border-t gap-3">
// //         <button
// //           onClick={() => setIsEditModalOpen(false)}
// //           className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
// //         >
// //           Cancel
// //         </button>
// //         <button
// //           onClick={handleSaveEditMenu}
// //           className="px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600"
// //         >
// //           Update Menu
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // )}

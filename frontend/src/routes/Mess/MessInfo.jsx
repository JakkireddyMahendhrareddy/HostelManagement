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
      toast.success("Mess menu deleted successfully", toastNoficationSettings);
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
            (error.response.data.message ||
              error.response.data.error ||
              JSON.stringify(error.response.data))
              ? error.response.data.message ||
                error.response.data.error ||
                JSON.stringify(error.response.data)
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

  return (
    <div
      className="w-full px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-slate-900
              via-slate-900 to-slate-900 p-5"
    >
      <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-10">
        {loading && menuData.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-purple-500" />
          </div>
        ) : !hostel || Object.keys(hostel).length === 0 ? (
          <NoHostelMessage />
        ) : (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 min-h-[70vh]">
            {/* Header */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">🍽️</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Weekly Mess Menu
                  </h2>
                  <p className="text-gray-400">
                    Manage your hostel's weekly meal schedule
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowMessFormModal(true);
                }}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-purple-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group"
              >
                <Plus
                  size={20}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
                Create Mess Day
              </button>
            </div>

            {/* Table or No Data */}
            {menuData.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🍽️</span>
                </div>
                <p className="text-xl font-semibold text-white mb-2">
                  No Mess Menu Found
                </p>
                <p className="text-gray-400 mb-6">
                  Create your first mess day to get started with meal planning
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowMessFormModal(true);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-purple-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 mx-auto"
                >
                  <Plus size={20} />
                  Create First Mess Day
                </button>
              </div>
            ) : (
              <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                {/* <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📋</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Mess Menu Schedule
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Weekly meal plan for your hostel
                    </p>
                  </div>
                </div> */}
                <div className="overflow-x-auto">
                  <MessTable
                    menuData={menuData}
                    handleDeleteClick={handleDeleteClick}
                    loading={loading}
                    handleEditClick={handleEditClick}
                    handleViewClick={handleViewClick}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modals */}
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
        {showDetailsModal && (
          <MessDetailsModal
            menu={selectedMenu}
            setShowDetailsModal={setShowDetailsModal}
          />
        )}
        {showConfirmModal && (
          <ConfirmModal
            confirmType="mess"
            confirmDelete={deleteMessMenu}
            setShowConfirmModal={setShowConfirmModal}
          />
        )}
      </div>
    </div>
  );
};

export default MessInfo;

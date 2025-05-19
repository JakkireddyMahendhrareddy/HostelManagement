import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, X, Plus } from "lucide-react";
import NoHostelMessage from "../NoHostelMessage";
import { backendUrl, toastNoficationSettings } from "../../utils/utils";
import { toast } from "react-toastify";
import MessTable from "./MessTable";

// Sample initial data for the weekly mess menu
const initialMenuData = [
  {
    id: 1,
    day: "Monday",
    breakfast: "Idli, Sambar, Chutney",
    lunch: "Rice, Dal, Mixed Veg Curry",
    dinner: "Chapati, Paneer Butter Masala",
  },
  {
    id: 2,
    day: "Tuesday",
    breakfast: "Poha, Boiled Egg",
    lunch: "Rice, Sambar, Rasam, Curd",
    dinner: "Pulao, Raita, Gulab Jamun",
  },
  {
    id: 3,
    day: "Wednesday",
    breakfast: "Dosa, Chutney",
    lunch: "Rice, Dal Tadka, Aloo Gobi",
    dinner: "Chapati, Chicken Curry",
  },
];

// Main application component
export default function MessMenuApp() {
  const [menuData, setMenuData] = useState(initialMenuData);
  const [loading, setLoading] = useState(true);
  const [messDetails, setMessDetails] = useState({});
  const [hostel, setHostel] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [newMenu, setNewMenu] = useState({
    day: "",
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  //api's
  const getHostelUrl = `${backendUrl}/api/hostel/view`;
  const getAllMessDetailsUrl = `${backendUrl}/api/mess/`;
  const createMessDetailsUrl = `${backendUrl}/api/mess/`;
  const updateMessDetailsUrl = `${backendUrl}/api/mess/edit/`;
  const deleteMessDetailsUrl = `${backendUrl}/api/mess/delete/`;

  // Load data with simulated loading state
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Handle opening the view modal
  const handleView = (menu) => {
    setSelectedMenu(menu);
    setIsViewModalOpen(true);
  };

  // Handle opening the edit modal
  const handleEdit = (menu) => {
    setSelectedMenu({ ...menu });
    setIsEditModalOpen(true);
  };

  // Handle opening the delete modal
  const handleDelete = (menu) => {
    setSelectedMenu(menu);
    setIsDeleteModalOpen(true);
  };

  // Handle form input changes for new menu
  const handleNewMenuChange = (e) => {
    const { name, value } = e.target;
    setNewMenu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form input changes for edit menu
  const handleEditMenuChange = (e) => {
    const { name, value } = e.target;
    setSelectedMenu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save new menu item
  const handleSaveNewMenu = () => {
    setMenuData([...menuData, { id: menuData.length + 1, ...newMenu }]);
    setNewMenu({
      day: "",
      breakfast: "",
      lunch: "",
      dinner: "",
    });
    setIsCreateModalOpen(false);
  };

  // Save edited menu item
  const handleSaveEditMenu = () => {
    setMenuData(
      menuData.map((item) =>
        item.id === selectedMenu.id ? selectedMenu : item
      )
    );
    setIsEditModalOpen(false);
  };

  // Confirm delete menu item
  const handleConfirmDelete = () => {
    setMenuData(menuData.filter((item) => item.id !== selectedMenu.id));
    setIsDeleteModalOpen(false);
  };

  //fetch hostel details
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

  // Fetch mess menu data from API
  const fetchMessMenu = async () => {
    setLoading(true);
    try {
      const response = await fetch(getAllMessDetailsUrl, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Mess menu data:", data);

        if (!data || data.length === 0) {
          toast.info(
            "No mess timetable found. Please add it first.",
            toastNotificationSettings
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
            breakfast: `${meal.breakfast} (${meal.breakfastTime})`,
            lunch: `${meal.lunch} (${meal.lunchTime})`,
            dinner: `${meal.dinner} (${meal.dinnerTime})`,
          };
        });

        setMenuData(tableData);
      } else {
        toast.warning("Failed to fetch mess menu", toastNotificationSettings);
        setMenuData([]);
      }
    } catch (error) {
      console.error("Error fetching mess menu:", error);
      toast.error(
        "Something went wrong while fetching mess menu",
        toastNotificationSettings
      );
      setMenuData([]);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchMessMenu();
  }, []);

  const createMessMenu = async (newMenuItem) => {
    // newMenuItem should be like:
    // {
    //   day: "Monday",
    //   meals: {
    //     breakfast: { item: "Eggs", time: "8:00 AM" },
    //     lunch: { item: "Rice", time: "1:00 PM" },
    //     dinner: { item: "Chapati", time: "7:00 PM" }
    //   }
    // }

    setLoading(true);
    try {
      const response = await fetch(createMessDetailsUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMenuItem),
      });

      if (response.ok) {
        toast.success(
          "Mess menu added successfully",
          toastNotificationSettings
        );
        await fetchMessMenu(); // refresh list after create
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Failed to add mess menu",
          toastNotificationSettings
        );
      }
    } catch (error) {
      console.error("Error creating mess menu:", error);
      toast.error(
        "Something went wrong while adding mess menu",
        toastNoficationSettings
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    createMessMenu();
  }, []);

  const editMessMenu = async (id, updatedMenuItem) => {
    // id is mess menu _id or unique id
    // updatedMenuItem has same structure as create

    setLoading(true);
    try {
      const response = await fetch(`${updateMessDetailsUrl}/${id}`, {
        method: "PUT", // or PATCH depending on your API design
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMenuItem),
      });

      if (response.ok) {
        toast.success(
          "Mess menu updated successfully",
          toastNoficationSettings
        );
        await fetchMessMenu(); // refresh after update
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Failed to update mess menu",
          toastNoficationSettings
        );
      }
    } catch (error) {
      console.error("Error updating mess menu:", error);
      toast.error(
        "Something went wrong while updating mess menu",
        toastNoficationSettings
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    editMessMenu();
  }, []);

  const deleteMessMenu = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${deleteMessDetailsUrl}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success(
          "Mess menu deleted successfully",
          toastNotificationSettings
        );
        await fetchMessMenu(); // refresh after delete
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Failed to delete mess menu",
          toastNotificationSettings
        );
      }
    } catch (error) {
      console.error("Error deleting mess menu:", error);
      toast.error(
        "Something went wrong while deleting mess menu",
        toastNotificationSettings
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    deleteMessMenu();
  }, []);

  return (
    <div className="w-full bg-white pt-0 min-h-screen flex justify-center items-start relative">
      <div className="w-full pt-4 max-w-7xl px-4">
        {loading && messDetails.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        ) : !hostel || Object.keys(hostel).length === 0 ? (
          <NoHostelMessage />
        ) : messDetails.length === 0 ? (
          <div className="text-center text-gray-500 mt-4 text-lg font-medium">
            No mess timetable found. Please add one.
          </div>
        ) : (
          <div className="min-h-screen bg-white shadow-lg p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-800 drop-shadow-md">
                🍽️ Weekly Mess Menu
              </h1>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
              >
                <Plus size={20} />
                Create New
              </button>
            </div>

            {/* Menu Table */}
            <MessTable
              messDetails={messDetails}
              // handlePaymentClick={handlePaymentClick}
              // handleHistoryClick={handleHistoryClick}
              loading={loading}
            />
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Add New Menu</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Day
                  </label>
                  <select
                    name="day"
                    value={newMenu.day}
                    onChange={handleNewMenuChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Breakfast
                  </label>
                  <input
                    type="text"
                    name="breakfast"
                    value={newMenu.breakfast}
                    onChange={handleNewMenuChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter breakfast menu"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Lunch
                  </label>
                  <input
                    type="text"
                    name="lunch"
                    value={newMenu.lunch}
                    onChange={handleNewMenuChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter lunch menu"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Dinner
                  </label>
                  <input
                    type="text"
                    name="dinner"
                    value={newMenu.dinner}
                    onChange={handleNewMenuChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter dinner menu"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t gap-3">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewMenu}
                className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600"
              >
                Save Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedMenu.day}'s Menu
              </h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-700">Breakfast</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                    {selectedMenu.breakfast}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-700">Lunch</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                    {selectedMenu.lunch}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-700">Dinner</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                    {selectedMenu.dinner}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                Edit {selectedMenu.day}'s Menu
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Day
                  </label>
                  <select
                    name="day"
                    value={selectedMenu.day}
                    onChange={handleEditMenuChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Breakfast
                  </label>
                  <input
                    type="text"
                    name="breakfast"
                    value={selectedMenu.breakfast}
                    onChange={handleEditMenuChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter breakfast menu"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Lunch
                  </label>
                  <input
                    type="text"
                    name="lunch"
                    value={selectedMenu.lunch}
                    onChange={handleEditMenuChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter lunch menu"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Dinner
                  </label>
                  <input
                    type="text"
                    name="dinner"
                    value={selectedMenu.dinner}
                    onChange={handleEditMenuChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter dinner menu"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditMenu}
                className="px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600"
              >
                Update Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                Confirm Delete
              </h2>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Are you sure you want to delete {selectedMenu.day}'s menu? This
                action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end p-6 border-t gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

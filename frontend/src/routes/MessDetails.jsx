
import { useState, useEffect } from "react";
import { Edit2, Save, X } from "lucide-react";
import { backendUrl, toastNoficationSettings } from "../utils/utils";


export default function WeeklyMessMenu() {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const mealTimes = {
    breakfast: "7:30 AM - 9:00 AM",
    lunch: "12:30 PM - 2:00 PM",
    dinner: "7:00 PM - 9:00 PM"
  };
  
  const initialDetails = {
    Monday: {
      breakfast: "Poha, Boiled Eggs, Tea/Coffee",
      lunch: "Rice, Dal Makhani, Roti, Mixed Vegetables",
      dinner: "Jeera Rice, Paneer Butter Masala, Roti, Raita"
    },
    Tuesday: {
      breakfast: "Bread Toast, Fruit Jam, Tea/Coffee",
      lunch: "Rice, Dal Tadka, Roti, Aloo Gobi",
      dinner: "Pulao, Chana Masala, Roti, Salad"
    },
    Wednesday: {
      breakfast: "Idli Sambar, Coconut Chutney, Tea/Coffee",
      lunch: "Rice, Rajma, Roti, Bhindi Fry",
      dinner: "Rice, Dal Fry, Roti, Chicken Curry (Non-Veg)"
    },
    Thursday: {
      breakfast: "Upma, Boiled Eggs, Tea/Coffee",
      lunch: "Rice, Sambhar, Roti, Cabbage Thoran",
      dinner: "Fried Rice, Manchurian, Roti, Sweet Corn Soup"
    },
    Friday: {
      breakfast: "Aloo Paratha, Curd, Tea/Coffee",
      lunch: "Rice, Kadhi Pakora, Roti, Mix Veg",
      dinner: "Biryani, Raita, Roti, Salad"
    },
    Saturday: {
      breakfast: "Puri Bhaji, Tea/Coffee",
      lunch: "Rice, Sambar, Roti, Potato Fry",
      dinner: "Rice, Dal Tadka, Roti, Paneer Tikka Masala"
    },
    Sunday: {
      breakfast: "Chole Bhature, Tea/Coffee",
      lunch: "Special Pulao, Raita, Roti, Gulab Jamun",
      dinner: "Rice, Dal, Roti, Egg Curry (Non-Veg)"
    }
  };

  const [messDetails, setMessDetails] = useState(() => {
    const savedMenu = localStorage.getItem("messMenu");
    return savedMenu ? JSON.parse(savedMenu) : initialDetails;
  });
  
  const [editMode, setEditMode] = useState({});
  const [editedDetails, setEditedDetails] = useState({});
  const [currentEditMeal, setCurrentEditMeal] = useState({});

  useEffect(() => {
    localStorage.setItem("messMenu", JSON.stringify(messDetails));
  }, [messDetails]);

  const handleEdit = (day, meal) => {
    setEditMode({ ...editMode, [`${day}-${meal}`]: true });
    setEditedDetails({ 
      ...editedDetails, 
      [`${day}-${meal}`]: messDetails[day][meal] 
    });
    setCurrentEditMeal({ day, meal });
  };

  const handleChange = (dayMeal, value) => {
    setEditedDetails({ ...editedDetails, [dayMeal]: value });
  };

  const handleSave = (dayMeal) => {
    const [day, meal] = dayMeal.split("-");
    
    // Simulate API call to save data
    const apiUrl = "https://api.messmenu.example/update";
    console.log(`Saving to ${apiUrl}:`, { day, meal, menu: editedDetails[dayMeal] });
    
    // Update local state after "API call"
    const updatedDetails = { ...messDetails };
    updatedDetails[day] = {
      ...updatedDetails[day],
      [meal]: editedDetails[dayMeal]
    };
    
    setMessDetails(updatedDetails);
    setEditMode({ ...editMode, [dayMeal]: false });
  };

  const handleCancel = (dayMeal) => {
    setEditMode({ ...editMode, [dayMeal]: false });
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white-100 p-4 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-800 drop-shadow-md">
                🍽️ Weekly Mess Menu
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="bg-white border border-blue-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="bg-blue-600 text-white px-6 py-3 rounded-t-xl">
                      <h2 className="text-xl font-bold">{day}</h2>
                    </div>

                    <div className="p-5">
                      {Object.keys(mealTimes).map((meal) => (
                        <div key={meal} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-blue-700 capitalize">
                              {meal}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {mealTimes[meal]}
                            </span>
                          </div>

                          {editMode[`${day}-${meal}`] ? (
                            <div className="mt-2">
                              <textarea
                                value={editedDetails[`${day}-${meal}`]}
                                onChange={(e) =>
                                  handleChange(`${day}-${meal}`, e.target.value)
                                }
                                className="w-full p-3 rounded-lg border border-blue-200 bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm"
                                rows={3}
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleSave(`${day}-${meal}`)}
                                  className="flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
                                >
                                  <Save size={14} />
                                  Save
                                </button>
                                <button
                                  onClick={() => handleCancel(`${day}-${meal}`)}
                                  className="flex items-center justify-center gap-1 bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-400 transition"
                                >
                                  <X size={14} />
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="relative bg-blue-50 p-3 rounded-lg border border-dashed border-blue-200 min-h-16">
                              <p className="text-gray-700 text-sm whitespace-pre-line pr-8">
                                {messDetails[day]?.[meal] ||
                                  "No meal added yet"}
                              </p>
                              <button
                                onClick={() => handleEdit(day, meal)}
                                className="absolute top-2 right-2 p-1 bg-white rounded-md border border-blue-200 text-blue-600 hover:bg-blue-100 transition-colors"
                                aria-label={`Edit ${meal} for ${day}`}
                              >
                                <Edit2 size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


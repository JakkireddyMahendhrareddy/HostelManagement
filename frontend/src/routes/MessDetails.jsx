import React, { useState } from "react";

const initialMessDetails = {
  Monday: "Breakfast: Oatmeal, Eggs\nLunch: Vegetable Soup, Bread\nDinner: Chicken Curry, Rice",
  Tuesday: "Breakfast: Pancakes, Fruits\nLunch: Sandwiches, Salad\nDinner: Pasta, Garlic Bread",
  Wednesday: "Breakfast: Cereal, Milk\nLunch: Burgers, Fries\nDinner: Fish Curry, Rice",
  Thursday: "Breakfast: Toast, Boiled Eggs\nLunch: Pizza, Cola\nDinner: Vegetable Biryani",
  Friday: "Breakfast: Idli, Sambar\nLunch: Fried Rice, Manchurian\nDinner: Dal, Roti, Sabzi",
  Saturday: "Breakfast: Dosa, Chutney\nLunch: Noodles, Spring Rolls\nDinner: Paneer Butter Masala, Naan",
  Sunday: "Breakfast: Poha, Tea\nLunch: Pulao, Raita\nDinner: Special Thali"
};

const MessDetails = () => {
  const [messDetails, setMessDetails] = useState(initialMessDetails);
  const [editMode, setEditMode] = useState({});
  const [editedDetails, setEditedDetails] = useState({ ...initialMessDetails });

  const handleEdit = (day) => {
    setEditedDetails(prev => ({ ...prev, [day]: messDetails[day] }));
    setEditMode(prev => ({ ...prev, [day]: true }));
  };

  const handleChange = (day, value) => {
    setEditedDetails(prev => ({ ...prev, [day]: value }));
  };

  const handleSave = (day) => {
    setMessDetails(prev => ({ ...prev, [day]: editedDetails[day] }));
    setEditMode(prev => ({ ...prev, [day]: false }));
  };

  const handleCancel = (day) => {
    setEditMode(prev => ({ ...prev, [day]: false }));
  };

  const daysOfWeek = Object.keys(messDetails);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-80 to-bule-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600 drop-shadow-md">
        🍽️ Weekly Mess Menu
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="bg-white border border-blue-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">{day}</h2>

            {editMode[day] ? (
              <>
                <textarea
                  value={editedDetails[day]}
                  onChange={(e) => handleChange(day, e.target.value)}
                  className="w-full h-36 p-4 rounded-xl border border-bule-300 bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSave(day)}
                    className="flex-1 bg-bule-600 text-balck hover:text-black py-2 rounded-xl shadow-md hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancel(day)}
                    className="flex-1 bg-gray-400 text-white hover:text-black py-2 rounded-xl shadow-md hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="min-h-32 mb-4 text-gray-700 whitespace-pre-line bg-blue-50 p-4 rounded-xl border border-dashed border-blue-200">
                  {messDetails[day] || (
                    <span className="text-gray-400 italic">No meals added yet</span>
                  )}
                </div>
                <button
                  onClick={() => handleEdit(day)}
                  className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold shadow-md hover:bg-rose-700 transition"
                >
                  Edit Menu
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessDetails;

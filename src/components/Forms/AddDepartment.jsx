import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const departments = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Finance",
  "Product",
  "Operations",
];

const AddDepartmentForm = ({ onClose }) => {
  const [department, setDepartment] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employees/department", {
        department,
      });
      setShowPopup(true);
      setDepartment("");
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error("❌ Error saving department:", error);
      alert("Failed to save. Check backend or network.");
    }
  };

  return (
    <div className="bg-[#fef7f4] p-8 rounded-3xl shadow-2xl max-w-2xl relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X size={24} />
      </button>

      <h2 className="text-3xl font-bold mb-6">Add Department</h2>

      <div className="border-b mb-6">
        <nav className="-mb-px flex gap-8" aria-label="Tabs">
          <div className="text-blue-600 text-lg font-semibold border-b-2 border-blue-600 pb-2">
            Department Details
          </div>
        </nav>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
      >
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="p-2 border border-gray-300 bg-[#fef7f4] rounded-md focus:outline-none focus:ring-1 focus:ring-black-500"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mt-10 col-span-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Add Department
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow">
          ✅ Department added successfully!
        </div>
      )}
    </div>
  );
};

export default AddDepartmentForm;

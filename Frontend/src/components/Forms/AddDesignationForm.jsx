import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addDesignation } from "../../redux/EmployeeSlice";

const AddDesignationForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDesignation = { title, description };
    dispatch(addDesignation(newDesignation));
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setTitle("");
      setDescription("");
      onClose?.();
    }, 3000);
  };

  return (
    <div className="bg-[#fef7f4] p-8  rounded-3xl shadow-2xl max-w-10xl  relative">
      <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Add Designation</h2>

      <div className="flex justify-between border-b mb-4">
        <div className="py-2 px-3 text-2xl font-medium border-b-2 border-blue-600 text-blue-600">
          Designation Details
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-12 font-semibold">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Title</label>
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm bg-[#fef7f4] border-gray-300"
          >
            <option value="">Select Title</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Data Analyst">Data Analyst</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="px-3 py-2 border rounded-md text-sm border-gray-300"
          />
        </div>

        <div className="col-span-2 flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded text-sm"
          >
            Add Designation
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="absolute top-0 left-0 w-full p-4 bg-green-100 text-green-800 font-semibold text-center rounded-t">
          ✅ Designation added successfully!
        </div>
      )}
    </div>
  );
};

export default AddDesignationForm;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDesignation } from '../redux/EmployeeSlice';

const AddDesignationForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDesignation = {
      title,
      description,
    };

    console.log("Submitted Designation:", newDesignation);
    dispatch(addDesignation(newDesignation));
    
    // Optionally reset the form
    setTitle("");
    setDescription("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Designation</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <label className="font-medium">Title</label>
        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Title</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="HR Manager">HR Manager</option>
          <option value="Data Analyst">Data Analyst</option>
        </select>

        <label className="font-medium">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Designation
        </button>
      </form>
    </div>
  );
};

export default AddDesignationForm;

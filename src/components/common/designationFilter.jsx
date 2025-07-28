import React from "react";

const DesignationFilter = ({ isOpen, onClose, filters, setFilters, onApply }) => {
  const inputClass = "w-full px-3 py-2 border rounded-md text-sm border-gray-300";

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[360px] bg-white shadow-2xl z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Filter Designations</h2>
        <button onClick={onClose} className="text-red-600 font-bold text-xl">
          ×
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
        {/* Designation Filter Dropdown */}
        <label className="block text-sm font-medium text-gray-700">Designation</label>
        <select
          className={inputClass}
          value={filters.title || ""}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        >
          <option value="">All Designations</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="HR Manager">HR Manager</option>
          <option value="Data Analyst">Data Analyst</option>
        </select>

        {/* Add More Filters Here if Needed */}

        <button
          onClick={onApply}
          className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default DesignationFilter;

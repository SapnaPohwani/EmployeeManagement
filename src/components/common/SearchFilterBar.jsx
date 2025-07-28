import React, { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";

const SearchFilterBar = ({
  onSearch,
  onFilterChange,
  filterOptions = [],
  placeholder = "Search...",
  onFilterIconClick,
}) => {
  const [searchText, setSearchText] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };



  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    onFilterChange(value);
    setShowFilterDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-lg shadow-md mb-4 relative">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-400"
      />

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={onFilterIconClick}
          className="p-2 rounded hover:bg-gray-100 transition"
          title="Open Filter Sidebar"
        >
          <Filter size={20} className="text-gray-600" />
        </button>

        {showFilterDropdown && (
          <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-10">
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              className="w-40 p-2 border-0 focus:outline-none"
            >
              <option value="">All</option>
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;

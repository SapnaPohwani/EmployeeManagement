import React from "react";

const FilterSidebar = ({ isOpen, onClose, filters, setFilters, onApply }) => {
  const inputClass = "w-full px-3 py-2 border rounded-md text-sm border-gray-300";

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[360px] bg-white shadow-2xl z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Filter Employees</h2>
        <button onClick={onClose} className="text-red-600 font-bold text-xl">
          ×
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
        <input
          type="text"
          placeholder="Phone"
          className={inputClass}
          value={filters.phone}
          onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
        />

        <select
          className={inputClass}
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        >
          <option value="">All Countries</option>
          <option value="India">India</option>
          <option value="France">France</option>
          <option value="Russia">Russia</option>
          <option value="UK">UK</option>
        </select>

        <select
          className={inputClass}
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Joining (From - To)
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              className={`${inputClass} flex-1`}
              value={filters.dojFrom}
              onChange={(e) =>
                setFilters({ ...filters, dojFrom: e.target.value })
              }
            />
            <input
              type="date"
              className={`${inputClass} flex-1`}
              value={filters.dojTo}
              onChange={(e) =>
                setFilters({ ...filters, dojTo: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hours per Week
          </label>
          <input
            type="range"
            min="0"
            max="60"
            value={filters.hoursPerWeek}
            onChange={(e) =>
              setFilters({ ...filters, hoursPerWeek: e.target.value })
            }
            className="w-full"
          />
          <p className="text-sm text-gray-600">
            Current: {filters.hoursPerWeek} hrs
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salary Range
          </label>
          <input
            type="range"
            min="10000"
            max="10000000"
            step="5000"
            value={filters.salary}
            onChange={(e) =>
              setFilters({ ...filters, salary: e.target.value })
            }
            className="w-full"
          />
          <p className="text-sm text-gray-600">Up to ₹{filters.salary}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tax Deductions
          </label>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={filters.taxDeductions}
            onChange={(e) =>
              setFilters({ ...filters, taxDeductions: e.target.value })
            }
            className="w-full"
          />
          <p className="text-sm text-gray-600">
            Up to ₹{filters.taxDeductions}
          </p>
        </div>

        <select
          className={inputClass}
          value={filters.employmentType}
          onChange={(e) =>
            setFilters({ ...filters, employmentType: e.target.value })
          }
        >
          <option value="">All Types</option>
          <option value="Full time">Full time</option>
          <option value="Contractual">Contractual</option>
        </select>

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

export default FilterSidebar;

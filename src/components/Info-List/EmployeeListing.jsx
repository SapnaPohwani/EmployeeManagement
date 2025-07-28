import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../common/Table";
import FilterSidebar from "../common/filterSidebar";
import SearchFilterBar from "../common/SearchFilterBar";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    jobTitle: "",
    phone: "",
    country: "",
    gender: "",
    dojFrom: "",
    dojTo: "",
    hoursPerWeek: 0,
    salary: 200000,
    taxDeductions: 50000,
    employmentType: "",
  });

  // 🔄 Fetch employees from backend using filters
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees/list", {
        params: {
          ...filters,
          hoursPerWeek: parseInt(filters.hoursPerWeek),
          salary: parseInt(filters.salary),
          taxDeductions: parseInt(filters.taxDeductions),
        },
      });
      setEmployees(res.data);
      setFilteredEmployees(res.data);
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [filters]); // ✅ Update whenever filters change

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = employees.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.email.toLowerCase().includes(lowerQuery)
    );
    setFilteredEmployees(filtered);
  };

  const handleFilterChange = (value) => {
    const filtered = value
      ? employees.filter((item) => item.jobTitle === value)
      : employees;
    setFilteredEmployees(filtered);
  };

  return (
    <div className="relative">
      <SearchFilterBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        placeholder="Search by name or email..."
        filterOptions={[
          { label: "Software Engineer", value: "Software Engineer" },
          { label: "HR Executive", value: "HR Executive" },
          { label: "Intern", value: "Intern" },
          { label: "QA Tester", value: "QA Tester" },
        ]}
      />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowFilter(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          More Filters
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>

      {filteredEmployees.length === 0 ? (
        <p className="text-gray-500">No employees found.</p>
      ) : (
        <Table
          columns={[
            { header: "Job Title", accessor: "jobTitle" },
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email" },
            { header: "Phone", accessor: "phone" },
            { header: "Country", accessor: "country" },
            { header: "Gender", accessor: "gender" },
            { header: "DOJ", accessor: "dateOfJoining" },
            { header: "Hours/week", accessor: "hoursPerWeek" },
            { header: "Salary", accessor: "salary" },
            { header: "Tax Deductions", accessor: "taxDeductions" },
          ]}
          data={filteredEmployees}
        />
      )}

      <FilterSidebar
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={() => setShowFilter(false)} // ✅ Only closes the sidebar now
      />
    </div>
  );
};

export default EmployeeList;

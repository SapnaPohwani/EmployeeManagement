import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../common/Table';
import SearchFilterBar from '../common/SearchFilterBar';  
import DepartmentFilter from '../common/departmentFilter';

const DepartmentListing = () => {
  const [departments, setDepartments] = useState([]);
 const [filteredDepartments, setFilteredDepartments] = useState([]);
   const [showFilter, setShowFilter] = useState(false);
 const [filters, setFilters] = useState({
  department: "", // not title
});

 const columns = [{ header: "Department", accessor: "department" }];


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees/departmentlist");
        setDepartments(response.data);
      } catch (error) {
        console.error("❌ Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = departments.filter((item) =>
      item.title.toLowerCase().includes(lowerQuery) 
    );
    setFilteredDepartments(filtered);
  };

  const handleFilterChange = (value) => {
    if (value === "") {
      setFilteredDepartments(departments);
    } else {
      const filtered = departments.filter((item) => item.type === value);
      setFilteredDepartments(filtered);
    }
  };

  const handleApplyFilters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees/departmentlist", {
        params: filters,
      });
      setFilteredDepartments(response.data);
    } catch (error) {
      console.error("❌ Error applying filters:", error);
    } finally {
      setShowFilter(false);
    }
  };

  return (
    <div className="p-2">
      <SearchFilterBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        placeholder="Search by title or description..."
        onFilterIconClick={() => setShowFilter(true)}
        filterOptions={[
          { label: "All", value: "" },
          { label: "Managerial", value: "manager" },
          { label: "Technical", value: "tech" },
          { label: "HR", value: "hr" },
        ]}
      />
       {filteredDepartments.length === 0 ? (
        <p className="text-gray-500">No matching departments found.</p>
      ) : (
        <Table columns={columns} data={filteredDepartments} />
      )}
      
      <DepartmentFilter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default DepartmentListing;

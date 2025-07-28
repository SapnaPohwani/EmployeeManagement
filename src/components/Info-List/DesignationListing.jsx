import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../common/Table";
import SearchFilterBar from "../common/SearchFilterBar";
import DesignationFilter from "../common/designationFilter";

function DesignationListing() {
  const [designations, setDesignations] = useState([]);
  const [filteredDesignations, setFilteredDesignations] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    title: "",
    description: "",
  });

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
  ];

  const fetchDesignations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees/designationlist");
      setDesignations(response.data);
      setFilteredDesignations(response.data);
    } catch (error) {
      console.error("❌ Error fetching designations:", error);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = designations.filter((item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    );
    setFilteredDesignations(filtered);
  };

  const handleFilterChange = (value) => {
    if (value === "") {
      setFilteredDesignations(designations);
    } else {
      const filtered = designations.filter((item) => item.type === value);
      setFilteredDesignations(filtered);
    }
  };

  const handleApplyFilters = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees/designationlist", {
        params: filters,
      });
      setFilteredDesignations(response.data);
    } catch (error) {
      console.error("❌ Error applying filters:", error);
    } finally {
      setShowFilter(false);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4">Designation List</h2>

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

      {filteredDesignations.length === 0 ? (
        <p className="text-gray-500">No matching designations found.</p>
      ) : (
        <Table columns={columns} data={filteredDesignations} />
      )}

      <DesignationFilter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
      />
    </div>
  );
}

export default DesignationListing;

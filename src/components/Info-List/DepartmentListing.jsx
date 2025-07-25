import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../common/Table';

const DepartmentListing = () => {
  const [departments, setDepartments] = useState([]);

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

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4">Department List</h2>
      {departments.length === 0 ? (
        <p className="text-gray-500">No department added yet.</p>
      ) : (
        <Table columns={columns} data={departments} />
      )}
    </div>
  );
};

export default DepartmentListing;

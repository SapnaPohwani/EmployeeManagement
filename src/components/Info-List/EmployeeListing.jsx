import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import Table from "../common/Table";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const columns = [
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
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees/list");
        setEmployees(res.data);
      } catch (error) {
        console.error("❌ Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-2 ">
      <div className="relative w-[60%] mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white text-sm"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
      {employees.length === 0 ? (
        <p className="text-gray-500">No employees found.</p>
      ) : (
        <Table  columns={columns} data={employees} />
      )}
    </div>
  );
};

export default EmployeeList;

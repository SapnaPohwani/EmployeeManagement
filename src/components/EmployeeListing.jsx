import React from "react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.list);

  return (
    <div className="p-2 ">
      <div className="relative w-[60%] mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white text-sm"
        />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
      {employees.length === 0 ? (
        <p className="text-gray-500">No employees added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y  divide-gray-500 border rounded-lg">
            <thead className="bg-[#fef7f4]">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-600">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-600">
                  Job Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-600">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-600">
                  Phone
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-600">
                  Country
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-600">
                  Gender
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-600">
                  DOJ
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-600">
                  Hours/week
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-600">
                  Salary
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black-600">
                  Tax Deductions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#fef7f4] divide-y divide-gray-200">
              {employees.map((emp, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">
                    {emp?.jobTitle}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">
                    {emp?.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">
                    {emp.email}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">
                    {emp.phone}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">
                    {emp.country}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">
                    {emp.gender}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">
                    {emp.dateOfJoining}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">
                    {emp.hoursPerWeek}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">
                    {emp.salary}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-black-800">
                    {emp.taxDeductions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;

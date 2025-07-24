import React from 'react'
import Table from '../common/Table';
import { useSelector } from 'react-redux';

const DepartmentListing = () => {
 const departments = useSelector((state) => state.employees.departmentList);

  const columns = [
    { header: "Title", accessor: "title" },
    
  ];

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4">Department List</h2>
      {departments?.length === 0 ? (
        <p className="text-gray-500">No department added yet.</p>
      ) : (
        <Table columns={columns} data={departments || []} />
      )}
    </div>
  );
}

export default DepartmentListing
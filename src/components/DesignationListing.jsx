import React from 'react';
import Table from './common/Table';
import { useSelector } from 'react-redux';

function DesignationListing() {
  const designations = useSelector((state) => state.employees.designationList);

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
  ];

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4">Designation List</h2>
      {designations?.length === 0 ? (
        <p className="text-gray-500">No designations added yet.</p>
      ) : (
        <Table columns={columns} data={designations || []} />
      )}
    </div>
  );
}

export default DesignationListing;

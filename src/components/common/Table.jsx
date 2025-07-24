import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="   overflow-x-auto rounded-lg shadow-lg border border-gray-300">
      <table className="min-w-full divide-y divide-gray-500 rounded-lg overflow-hidden">
        <thead className="bg-[#d7ae9c]">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-2 text-left text-sm font-medium text-black-600"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#fef7f4] divide-y divide-x divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="divide-x divide-gray-100 hover:bg-red-50">
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 whitespace-nowrap text-sm text-black-800"
                >
                  {col.accessor ? row[col.accessor] : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

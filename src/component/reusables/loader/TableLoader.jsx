import React from "react";

const TableLoader = () => {
  return (
    <tr className="animate-pulse">
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded w-36"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded w-36"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-300 rounded w-48"></div>
      </td>
    </tr>
  );
};

export default TableLoader;

import React, { useState, useEffect, useRef } from "react";

const DataTable = ({
  headers,
  rows,
  onCheckboxChange,
  onDeleteSelected,
  onRowClick,
}) => {
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    setIsAnyChecked(rows.some((row) => row.isChecked));
  }, [rows]);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const offsetTop = tableRef.current.getBoundingClientRect().top;
        setIsSticky(offsetTop < 0);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full border border-primary-gray/40 rounded-md">
      {isAnyChecked && (
        <button
          onClick={onDeleteSelected}
          className="mb-4 mt-2 ml-2 px-2 py-1 bg-red-500 text-sm text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      )}
      <div className="overflow-y-auto max-h-[360px] lg:max-h-[236px] xl:max-h-[386px]">
        <table ref={tableRef} className="min-w-full border-collapse">
          <thead
            className={`sticky top-0 bg-gray-50 transition-all duration-300 ${
              isSticky ? "shadow-md" : ""
            }`}
          >
            <tr>
              <th className="p-4 border-b w-6">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    onCheckboxChange(checked, "all");
                  }}
                />
              </th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`p-4 border-b ${header.width} text-sm text-primary-gray text-left`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b cursor-pointer"
                onClick={() => onRowClick(row.id)}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={row.isChecked}
                    onChange={(e) => {
                      e.stopPropagation();
                      onCheckboxChange(!row.isChecked, row.id);
                    }}
                  />
                </td>
                {headers.map((header, index) => (
                  <td key={index} className="p-4 text-sm text-left">
                    {row[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

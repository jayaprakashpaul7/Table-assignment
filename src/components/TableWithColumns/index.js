import React, { useState } from "react";
import "./index.css";
import Select from "react-select";

const TableWithColumns = () => {
  const column1Options = [
    "Computer Science",
    "Web Technologies",
    "Software Development",
    "Designing",
  ];
  const [column2Options, setColumn2Options] = useState([
    { label: "ReactJs", value: "ReactJs" },
    { label: "Javascript", value: "Javascript" },
    { label: "Bootstarp", value: "Bootstarp" },
    { label: "Blockchain", value: "Blockchain" },
  ]);
  const [rows, setRows] = useState([{ column1: {}, column2: [] }]);
  const [newOption, setNewOption] = useState("");
  const [toggleDropdown, setToggle] = useState(false);

  const toggle = () => {
    setToggle((prevState) => !toggleDropdown);
  };

  // Add a new row
  const addRow = () => {
    setRows([...rows, { column1: "", column2: [] }]);
  };

  // Handle Column 1 dropdown change
  const handleColumn1Change = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].column1 = value;
    setRows(updatedRows);
  };

  // Handle Column 2 multi-select dropdown
  const handleColumn2Change = (index, value) => {
    setRows((prevRows) => {
      return prevRows.map((row, rowIndex) => {
        if (rowIndex === index) {
          // Check if the value is already selected
          const isSelected = row.column2.includes(value);
        }

        return row; // No changes for other rows
      });
    });
  };

  // Add a new option to Column 2
  const addColumn2Option = () => {
    if (newOption.trim() && !column2Options.includes(newOption)) {
      setColumn2Options([...column2Options, newOption]);
    }
  };

  const getAvailableColumn1Options = () => {
    const selectedOptions = rows.map((row) => row.column1);
    return column1Options.filter((option) => !selectedOptions.includes(option));
  };

  return (
    <div className="bg">
      <table className="table">
        <tr>
          <th className="data-cell">Education</th>
          <th className="data-cell">Skills</th>
        </tr>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {/* Column 1: Single-select dropdown */}
              <td className="data-cell">
                <select
                  value={row} // Use the current row's column1 value or an empty string as fallback
                  className="single-select"
                  onChange={(e) => handleColumn1Change(index, e.target.value)} // Update state on change
                >
                  <option>Select Option</option>
                  {getAvailableColumn1Options().map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>

              {/* Column 2: Multi-select dropdown */}
              <td className="data-cell">
                <Select options={column2Options} isMulti />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button" onClick={addRow}>
        Add New Row
      </button>
    </div>
  );
};

export default TableWithColumns;

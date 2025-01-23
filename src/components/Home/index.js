import React, { useState } from "react";
import "./index.css";

const App = () => {
  const column1Options = [
    "Computer Science",
    "Web Technologies",
    "Software Development",
    "Designing",
  ];
  const [column2Options, setColumn2Options] = useState([
    "ReactJs",
    "Javascript",
    "Bootstarp",
    "Blockchain",
  ]);
  const [rows, setRows] = useState([{ column1: {}, column2: [] }]);
  const [newOption, setNewOption] = useState("");

  // Add a new row
  const addRow = () => {
    setRows([...rows, { column1: {}, column2: [] }]);
  };

  // Handle Column 1 dropdown change
  const handleColumn1Change = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].column1 = value;
    setRows(updatedRows);
  };

  // Handle Column 2 multi-select dropdown
  const handleColumn2Change = (index, value) => {
    const updatedRows = [...rows];
    const selectedOptions = updatedRows[index].column2;

    if (selectedOptions.includes(value)) {
      updatedRows[index].column2 = selectedOptions.filter(
        (option) => option !== value
      ); // Remove option
    } else {
      updatedRows[index].column2.push(value); // Add option
    }

    setRows(updatedRows);
  };

  // Add a new option to Column 2
  const addColumn2Option = () => {
    if (newOption.trim() && !column2Options.includes(newOption)) {
      setColumn2Options([...column2Options, newOption]);
      setNewOption("");
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
                  value={row.column1}
                  className="single-select"
                  onChange={(e) => handleColumn1Change(index, e.target.value)}
                >
                  <option value="">Select Option</option>
                  {getAvailableColumn1Options().map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>

              {/* Column 2: Multi-select dropdown */}
              <td className="data-cell">
                <div style={{ position: "relative" }}>
                  <button
                    onClick={(e) => {
                      const dropdown = e.currentTarget.nextSibling;
                      dropdown.style.display =
                        dropdown.style.display === "block" ? "none" : "block";
                    }}
                    className="single-select"
                  >
                    {row.column2.length > 0
                      ? row.column2.join(", ")
                      : "Select Options"}
                  </button>
                  <div>
                    {column2Options.map((option) => (
                      <div key={option} style={{ marginBottom: "5px" }}>
                        <label>
                          <input
                            type="checkbox"
                            value={option}
                            checked={row.column2.includes(option)}
                            onChange={() => handleColumn2Change(index, option)}
                          />
                          {option}
                        </label>
                      </div>
                    ))}
                    {/* Add new option */}
                    <div>
                      <input
                        type="text"
                        value={newOption}
                        className="input-checkbox"
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="Add new option"
                      />
                      <button className="button" onClick={addColumn2Option}>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add new row button */}
      <button className="button" onClick={addRow}>
        Add New Row
      </button>
    </div>
  );
};

export default App;

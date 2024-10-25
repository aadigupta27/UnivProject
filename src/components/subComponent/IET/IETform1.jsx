import React, { useState } from "react";

const IETform1 = () => {
  // Initialize the state with an empty array of rows
  const [rows, setRows] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Function to add a new row
  const addRow = () => {
    setRows([...rows, { id: nextId, progName: "", progCode: "", sra: "" }]);
    setNextId(nextId + 1);
  };

  // Function to handle data change in a row
  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  // Function to delete a row
  const deleteRow = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  // Function to save the data (can be customized to actually store data)
  const saveData = () => {
    console.log("Table Data: ", rows);
    alert("Data saved! Check the console for the table data.");
  };

  return (
    <div className="container">
      <h2 className="text-center text-2xl font-semibold mt-6 mb-6 text-gray-700">Program Table</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border text-gray-800  text-lg">SN</th>
            <th className="px-4 py-2 border text-gray-800 text-lg">Prog_name</th>
            <th className="px-4 py-2 border text-gray-800 text-lg">Prog_code</th>
            <th className="px-4 py-2 border text-gray-800 text-lg">SRA</th>
            <th className="px-4 py-2 border text-gray-800 text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">
                <input
                  type="text"
                  value={row.progName}
                  onChange={(e) => handleRowChange(index, "progName", e.target.value)}
                  className=" rounded-md px-8 py-1 outline-slate-300  text-gray-800 text-md font-semibold"
                  spellCheck = {false}
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="text"
                  value={row.progCode}
                  onChange={(e) => handleRowChange(index, "progCode", e.target.value)}
                  className=" rounded-md px-8 py-1 outline-slate-300  text-gray-800 text-md font-semibold"
                  spellCheck = {false}
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="text"
                  value={row.sra}
                  onChange={(e) => handleRowChange(index, "sra", e.target.value)}
                  className=" rounded-md px-8 py-1 outline-slate-300  text-gray-800 text-md font-semibold"
                  spellCheck = {false}
                />
              </td>
              <td className="px-4 py-2 border">
                <button onClick={() => deleteRow(row.id)} className="bg-red-500 text-white px-3 py-1 rounded-md outline-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="m-4">
        <button onClick={addRow} className="bg-blue-500 text-white px-3 py-1 rounded-md outline-blue-800">
          Add Row
        </button>
        <button onClick={saveData} className="bg-green-500 text-white px-3 py-1 ml-2 rounded-md outline-green-800">
          Save
        </button>
      </div>
    </div>
  );
};

export default IETform1;

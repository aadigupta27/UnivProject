import React, { useState } from "react";

const IETform3 = () => {
  // Initialize the state with an empty array of rows
  const [rows, setRows] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Function to add a new row
  const addRow = () => {
    setRows([...rows, { id: nextId, progName: "", Semester: "", Exam_start_date: "", Exam_end_date: "", Result_date: "", Marksheet_dist: "" }]);
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
      <h2 className="text-center text-2xl font-semibold mt-6 mb-6 text-gray-700">Exams Table ( For last completed Sem )</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-3 py-2 border text-gray-800  text-lg">SN</th>
            <th className="px-3 py-2 border text-gray-800 text-lg">Prog_name</th>
            <th className="px-3 py-2 border text-gray-800 text-lg">Semester</th>
            <th className="px-3 py-2 border text-gray-800 text-lg">Exam_start_date</th>
            <th className="px-3 py-2 border text-gray-800 text-lg">Exam_end_date</th>
            <th className="px-3 py-2 border text-gray-800 text-lg">Result_Date</th>
            <th className="px-3 py-2 border text-gray-800 text-lg">Marksheet_dist</th>
            <th className="px-3 py-2 border text-gray-800 text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td className="px-2 py-2 border">{index + 1}</td>
              <td className="px-1 py-2 border">
                <input
                  type="text"
                  value={row.progName}
                  onChange={(e) => handleRowChange(index, "progName", e.target.value)}
                  className=" rounded-md px-auto py-1 outline-slate-300  text-gray-800 text-md font-semibold"
                  spellCheck = {false}
                />
              </td>
              <td className="px-1 py-2 border">
                <input
                  type="number"
                  value={row.Semester}
                  onChange={(e) => handleRowChange(index, "Semester", e.target.value)}
                  className=" rounded-md px-auto py-1 outline-slate-300  text-gray-800 text-md font-semibold"
                  spellCheck = {false}
                />
              </td>
              <td className="px-1 py-2 border">
                <input
                  type="date"
                  value={row.Exam_start_date}
                  onChange={(e) => handleRowChange(index, "Exam_start_date", e.target.value)}
                  className=" rounded-md px-auto py-1 outline-slate-300  text-gray-800 text-md font-semibold"
                  spellCheck = {false}
                />
              </td>
              <td className="px-1 py-2 border">
                <input
                  type="date"
                  value={row.Exam_end_date}
                  onChange={(e) => handleRowChange(index, "Exam_end_date", e.target.value)}
                  className=" rounded-md px-auto py-1 outline-slate-300  text-gray-800 text-md font-semibold"
                  spellCheck = {false}
                />
              </td>
              <td className="px-1 py-2 border">
                <input
                  type="date"
                  value={row.Result_date}
                  onChange={(e) => handleRowChange(index, "Result_date", e.target.value)}
                  className=" rounded-md px-auto py-1 outline-slate-300  text-gray-800 text-md font-semibold"
                  spellCheck = {false}
                />
              </td>
              <td className="px-1 py-2 border">
                <input
                  type="date"
                  value={row.Marksheet_dist}
                  onChange={(e) => handleRowChange(index, "Marksheet_dist", e.target.value)}
                  className=" rounded-md px-auto py-1 outline-slate-300  text-gray-800 text-md font-semibold"
                  spellCheck = {false}
                />
              </td>
              <td className="px-1 py-2 border">
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

export default IETform3;
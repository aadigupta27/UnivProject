import React, { useState, useEffect } from "react";
import axios from "axios";

const IETform1 = () => {
  const [rows, setRows] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/programs/iet@123"
        );
        const formattedData = response.data.map((item, index) => ({
          id: item.pid,
          sn: index + 1,
          progName: item.pname,
          progCode: item.pcode,
          sra: item.sra,
          newRow: false, // Add a property to track if the row is new
        }));
        setRows(formattedData);
        setNextId(formattedData.length + 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to add a new row
  const addRow = () => {
    setRows([
      ...rows,
      { id: nextId, progName: "", progCode: "", sra: "", newRow: true },
    ]); // Mark as new
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

  // Function to save only new data to the backend
  const saveData = async () => {
    try {
      for (let row of rows) {
        if (row.newRow) {
          // Only save rows marked as new
          await axios.post("http://localhost:8080/api/programs", {
            pcode: row.progCode,
            sn: row.sn,
            pname: row.progName,
            deptID: "iet@123",
            sra: row.sra,
          });
        }
      }
      alert("New data saved to database successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Check console for details.");
    }
  };

  // Function to export data as CSV
  const exportToCSV = () => {
    // Define CSV column headers
    const headers = ["SN", "Prog_name", "Prog_code", "SRA"];
    const rowsToExport = rows.map((row) => [
      row.sn,
      row.progName,
      row.progCode,
      row.sra,
    ]);

    // Create CSV content
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rowsToExport].map((e) => e.join(",")).join("\n");

    // Create and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ProgramData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle file upload and import CSV data
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result;
      const lines = csvData.split("\n");
      const result = [];

      // Parse CSV data and log it to console
      lines.slice(1).forEach((line) => {
        const [sn, progName, progCode, sra] = line.split(",");
        if (progName && progCode && sra) {
          result.push({ sn, progName, progCode, sra });
        }
      });
      console.log("Imported CSV Data:", result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <h2 className="text-center text-2xl font-semibold mt-6 mb-6 text-gray-700">
        Program Table
      </h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border text-gray-800 text-lg">SN</th>
            <th className="px-4 py-2 border text-gray-800 text-lg">
              Prog_name
            </th>
            <th className="px-4 py-2 border text-gray-800 text-lg">
              Prog_code
            </th>
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
                  onChange={(e) =>
                    handleRowChange(index, "progName", e.target.value)
                  }
                  className="rounded-md px-8 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="text"
                  value={row.progCode}
                  onChange={(e) =>
                    handleRowChange(index, "progCode", e.target.value)
                  }
                  className="rounded-md px-8 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="text"
                  value={row.sra}
                  onChange={(e) =>
                    handleRowChange(index, "sra", e.target.value)
                  }
                  className="rounded-md px-8 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => deleteRow(row.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md outline-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="m-4">
        <button
          onClick={addRow}
          className="bg-blue-500 text-white px-3 py-1 rounded-md outline-blue-800"
        >
          Add Row
        </button>
        <button
          onClick={saveData}
          className="bg-green-500 text-white px-3 py-1 ml-2 rounded-md outline-green-800"
        >
          Save
        </button>
        <button
          onClick={exportToCSV}
          className="bg-yellow-500 text-white px-3 py-1 ml-2 rounded-md outline-yellow-800"
        >
          Export as CSV
        </button>
        <input
          type="files"
          accept=".csv"
          onChange={handleFileUpload}
          className="ml-4 mt-2"
        />
        <span className="ml-2 text-gray-700 text-md">Import CSV</span>
      </div>
    </div>
  );
};

export default IETform1;

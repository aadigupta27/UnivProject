import React, { useState, useEffect } from "react";
import axios from "axios";

const IETform4 = () => {
  // Initialize the state with an empty array of rows
  const [rows, setRows] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/responses/department/4/iet@123"
        );

        const formattedData = response.data.map((item, index) => ({
          id: item.response_id, // Use response_id as the unique ID
          sn: index + 1,
          Name: item.fieldResponses.Name,
          Designation: item.fieldResponses.Designation,
          Email: item.fieldResponses.Email,
          Mobile: item.fieldResponses.Mobile,
          newRow: false, // Mark existing rows as not new
        }));

        setRows(formattedData);
        setNextId(formattedData.length + 1); // Set next ID for new rows
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
      {
        id: nextId,
        Name: "",
        Designation: "",
        Email: "",
        Mobile: "",
        newRow: true,
      },
    ]);
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

  // Function to save only new data to the backend in specified format
  const saveData = async () => {
    const submissionDateTime = new Date().toISOString(); // Set the current date and time

    try {
      const newRows = rows.filter((row) => row.newRow);

      for (let row of newRows) {
        const dataToSave = {
          form_id: 4,
          department_id: "iet@123",
          submission_date_time: submissionDateTime,
          fieldResponses: {
            Designation: row.Designation,
            Email: row.Email,
            Mobile: row.Mobile,
            Name: row.Name,
          },
        };

        await axios.post(
          "http://localhost:8080/api/responses/submit",
          dataToSave
        );
      }

      alert("New data saved to database successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Check console for details.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center text-2xl font-semibold mt-6 mb-6 text-gray-700">
        Members Table
      </h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border text-gray-800 text-lg">SN</th>
            <th className="px-4 py-2 border text-gray-800 text-lg">Name</th>
            <th className="px-4 py-2 border text-gray-800 text-lg">
              Designation
            </th>
            <th className="px-4 py-2 border text-gray-800 text-lg">Email</th>
            <th className="px-4 py-2 border text-gray-800 text-lg">Mobile</th>
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
                  value={row.Name}
                  onChange={(e) =>
                    handleRowChange(index, "Name", e.target.value)
                  }
                  className="rounded-md px-8 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="text"
                  value={row.Designation}
                  onChange={(e) =>
                    handleRowChange(index, "Designation", e.target.value)
                  }
                  className="rounded-md px-8 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="email"
                  value={row.Email}
                  onChange={(e) =>
                    handleRowChange(index, "Email", e.target.value)
                  }
                  className="rounded-md px-8 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="number"
                  value={row.Mobile}
                  onChange={(e) =>
                    handleRowChange(index, "Mobile", e.target.value)
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
      </div>
    </div>
  );
};

export default IETform4;

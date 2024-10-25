import React, { useState, useEffect } from "react";

const IETform2 = () => {
  const [rows, setRows] = useState([]);
  const [lastModifiedId, setLastModifiedId] = useState(null); // Track the last modified row ID

  let nextId = 1; // Initial next ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/responses/department/2/iet@123"
        );
        const data = await response.json();

        const fetchedRows = data.map((item) => ({
          id: nextId++, // Unique ID
          progName: item.fieldResponses["Program Name"] || "",
          Intake24: item.fieldResponses["Intake (2024-25)"] || "",
          Admission24: item.fieldResponses["Admission (2024-25)"] || "",
          Intake23: item.fieldResponses["Intake (2023-24)"] || "",
          Admission23: item.fieldResponses["Admission (2023-24)"] || "",
        }));

        setRows(fetchedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addRow = () => {
    const newRow = {
      id: nextId++, // Increment the ID for the new row
      progName: "",
      Intake24: "",
      Admission24: "",
      Intake23: "",
      Admission23: "",
    };

    setRows([...rows, newRow]);
    setLastModifiedId(newRow.id); // Set the last modified ID to the new row's ID
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
    setLastModifiedId(newRows[index].id); // Update the last modified ID
  };

  const deleteRow = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  const saveData = async (row) => {
    // Ensure all fields are filled
    if (
      !row.progName ||
      !row.Intake24 ||
      !row.Admission24 ||
      !row.Intake23 ||
      !row.Admission23
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }

    const submissionData = {
      form_id: 2,
      department_id: "iet@123",
      submission_date_time: new Date().toISOString(), // Use the current date-time
      fieldResponses: {
        "Program Name": row.progName,
        "Intake (2024-25)": row.Intake24,
        "Admission (2024-25)": row.Admission24,
        "Intake (2023-24)": row.Intake23,
        "Admission (2023-24)": row.Admission23,
      },
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/responses/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const saveLastModifiedData = async () => {
    const lastModifiedRow = rows.find((row) => row.id === lastModifiedId);
    if (lastModifiedRow) {
      await saveData(lastModifiedRow); // Save only the last modified row
    } else {
      alert("No data to save.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center text-2xl font-semibold mt-6 mb-6 text-gray-700">
        Admission Table
      </h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border text-gray-800 text-lg">SN</th>
            <th className="px-4 py-2 border text-gray-800 text-lg">
              Prog_name
            </th>
            <th className="px-4 py-2 border text-gray-800 text-lg">
              Intake_24
            </th>
            <th className="px-4 py-2 border text-gray-800 text-lg">
              Admission_24
            </th>
            <th className="px-4 py-2 border text-gray-800 text-lg">
              Intake_23
            </th>
            <th className="px-4 py-2 border text-gray-800 text-lg">
              Admission_23
            </th>
            <th className="px-4 py-2 border text-gray-800 text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td className="px-2 py-2 border">{index + 1}</td>
              <td className="px-2 py-2 border">
                <input
                  type="text"
                  value={row.progName}
                  onChange={(e) =>
                    handleRowChange(index, "progName", e.target.value)
                  }
                  className="rounded-md px-3 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-2 py-2 border">
                <input
                  type="number"
                  value={row.Intake24}
                  onChange={(e) =>
                    handleRowChange(index, "Intake24", e.target.value)
                  }
                  className="rounded-md px-3 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-2 py-2 border">
                <input
                  type="number"
                  value={row.Admission24}
                  onChange={(e) =>
                    handleRowChange(index, "Admission24", e.target.value)
                  }
                  className="rounded-md px-3 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-2 py-2 border">
                <input
                  type="number"
                  value={row.Intake23}
                  onChange={(e) =>
                    handleRowChange(index, "Intake23", e.target.value)
                  }
                  className="rounded-md px-3 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="number"
                  value={row.Admission23}
                  onChange={(e) =>
                    handleRowChange(index, "Admission23", e.target.value)
                  }
                  className="rounded-md px-3 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                  spellCheck={false}
                />
              </td>
              <td className="px-2 py-2 border">
                <button
                  onClick={() => deleteRow(row.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md outline-red-800"
                >
                  Delete
                </button>
                <button
                  onClick={() => saveData(row)} // Save individual row
                  className="bg-green-500 text-white px-3 py-1 ml-2 rounded-md outline-green-800"
                >
                  Save
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
          onClick={saveLastModifiedData} // Save last modified data only
          className="bg-yellow-500 text-white px-3 py-1 ml-2 rounded-md outline-yellow-800"
        >
          Save Last Modified
        </button>
      </div>
    </div>
  );
};

export default IETform2;

import React, { useEffect, useState } from "react";
import axios from "axios";

function Forms() {
  const [forms, setForms] = useState([]);
  const [nextRowId, setNextRowId] = useState(1);

  const apiURL = "http://localhost:8080/api/login/check";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL);
        const formattedData = response.data.forms.map((form) => ({
          ...form,
          rows: [], // Initialize rows for each form
        }));
        setForms(formattedData);
      } catch (err) {
        console.error("Error fetching API data:", err.message);
      }
    };

    fetchData();
  }, []);

  const addRow = (formId) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.form_id === formId
          ? {
              ...form,
              rows: [
                ...form.rows,
                {
                  id: nextRowId,
                  fields: form.fields.map((field) => ({
                    id: field.id,
                    value: "",
                  })),
                },
              ],
            }
          : form
      )
    );
    setNextRowId((prevId) => prevId + 1);
  };

  const handleFieldChange = (formId, rowId, fieldId, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.form_id === formId
          ? {
              ...form,
              rows: form.rows.map((row) =>
                row.id === rowId
                  ? {
                      ...row,
                      fields: row.fields.map((field) =>
                        field.id === fieldId ? { ...field, value } : field
                      ),
                    }
                  : row
              ),
            }
          : form
      )
    );
  };

  const deleteRow = (formId, rowId) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.form_id === formId
          ? {
              ...form,
              rows: form.rows.filter((row) => row.id !== rowId),
            }
          : form
      )
    );
  };

  const saveData = async () => {
    try {
      for (const form of forms) {
        for (const row of form.rows) {
          const newRowData = row.fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
          }, {});

          if (Object.values(newRowData).some((value) => value !== "")) {
            await axios.post(`http://localhost:8080/api/save`, newRowData);
          }
        }
      }
      alert("Data saved successfully");
    } catch (err) {
      console.error("Error saving data:", err.message);
      alert("Error saving data.");
    }
  };

  return (
    <div className="container">
      {forms.map((form) => (
        <div key={form.form_id} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700">{form.name}</h3>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                {form.fields.map((field) => (
                  <th key={field.id} className="px-4 py-2 border text-gray-800 text-lg">
                    {field.name}
                  </th>
                ))}
                <th className="px-4 py-2 border text-gray-800 text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {form.rows.map((row) => (
                <tr key={row.id}>
                  {row.fields.map((field) => (
                    <td key={field.id} className="px-4 py-2 border">
                      <input
                        type={field.field_data_type === "Integer" ? "number" : "text"}
                        value={field.value}
                        onChange={(e) =>
                          handleFieldChange(form.form_id, row.id, field.id, e.target.value)
                        }
                        className="rounded-md px-3 py-1 outline-slate-300 text-gray-800 text-md font-semibold"
                      />
                    </td>
                  ))}
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => deleteRow(form.form_id, row.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
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
              onClick={() => addRow(form.form_id)}
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Add Row
            </button>
          </div>
        </div>
      ))}
      <div className="m-4">
        <button
          onClick={saveData}
          className="bg-green-500 text-white px-3 py-1 ml-2 rounded-md"
        >
          Save All Data
        </button>
      </div>
    </div>
  );
}

export default Forms;

import React, { useEffect, useState } from "react";
import axios from "axios";

function IMSformRes() {
  const [responses, setResponses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);

  // Fetch data from the API when the component is mounted
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/responses/department/IMS")
      .then((response) => {
        setResponses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle the edit button click
  const handleEditClick = (response) => {
    setSelectedResponse(response);
    setIsEditing(true); // Show the editing form
  };

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedResponse((prev) => ({
      ...prev,
      fieldResponses: {
        ...prev.fieldResponses,
        [name]: value,
      },
    }));
  };

  // Handle form submission for updating the response (PUT)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedResponse = {
      ...selectedResponse,
      submission_date_time: new Date().toISOString(), // Ensure new timestamp
    };

    axios
      .put(
        `http://localhost:8080/api/responses/update/${selectedResponse.response_id}`,
        updatedResponse
      )
      .then(() => {
        setIsEditing(false);
        alert("Response updated successfully!");
        // Optionally, refetch the updated responses
        axios
          .get("http://localhost:8080/api/responses/department/IMS")
          .then((response) => {
            setResponses(response.data);
          })
          .catch((error) => {
            console.error("Error refetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating response:", error);
      });
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <h1 className="text-3xl text-gray-800 mb-4">IMS Form Responses</h1>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Response ID</th>
            <th className="px-4 py-2 border">Form ID</th>
            <th className="px-4 py-2 border">Submission Date</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Report File</th>
            <th className="px-4 py-2 border">Submission Date (Field)</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response.response_id}>
              <td className="px-4 py-2 border">{response.response_id}</td>
              <td className="px-4 py-2 border">{response.form_id}</td>
              <td className="px-4 py-2 border">
                {response.submission_date_time}
              </td>
              <td className="px-4 py-2 border">
                {response.fieldResponses.Title || response.fieldResponses.Titls}
              </td>
              <td className="px-4 py-2 border">
                {response.fieldResponses["Report File"]}
              </td>
              <td className="px-4 py-2 border">
                {response.fieldResponses["Submission Date"]}
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEditClick(response)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && selectedResponse && (
        <div className="mt-4">
          <h2 className="text-2xl mb-2">Edit Response</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="Title"
                value={selectedResponse.fieldResponses.Title || ""}
                onChange={handleInputChange}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Report File</label>
              <input
                type="text"
                name="Report File"
                value={selectedResponse.fieldResponses["Report File"] || ""}
                onChange={handleInputChange}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Submission Date</label>
              <input
                type="text"
                name="Submission Date"
                value={selectedResponse.fieldResponses["Submission Date"] || ""}
                onChange={handleInputChange}
                className="border px-2 py-1 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default IMSformRes;

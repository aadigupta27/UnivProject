import React from "react";

const FormCard = ({ form, formHandler }) => {
  if (!form) {
    return <div className="text-red-500">Form data is not available.</div>;
  }

  const { name, form_id, response_count } = form;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {name || "Unnamed Form"}
      </h2>
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => formHandler(form_id)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {`Form-${form_id || "N/A"}`}
        </button>
        <button
          className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
          disabled={!response_count}
        >
          {`Responses: ${response_count || 0}`}
        </button>
      </div>
    </div>
  );
};

export default FormCard;
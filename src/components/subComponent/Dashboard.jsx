import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import FormCard from "./FormCard";

function Dashboard() {
  const navigate = useNavigate();
  const { instituteData, isLoading, error } = useContext(AppContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { name, id, forms } = instituteData;

  const formHandler = (formId) => navigate(`/${id}/${formId}`);

  return (
    <div>
      <div className="flex bg-gray-800 justify-between items-center p-6 sticky z-60 top-0">
        <h1 className="text-2xl text-white">{name}</h1>
        <button
          onClick={() => navigate("/responses")}
          className="group relative w-auto justify-center py-1 px-2 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          My Responses
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {forms.map((form) => (
          <FormCard key={form.form_id} form={form} formHandler={formHandler} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

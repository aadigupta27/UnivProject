import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormCard = ({ form, formHandler }) => {
  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-auto">
      <h2 className="text-2xl font-semibold mb-4 text-start ml-4 text-gray-700">
        {form.name}
      </h2>
      <div className="flex space-x-3 justify-start shadow-lg p-4">
        <div className="flex flex-col gap-3 bg-white p-4">
          <button
            onClick={() => formHandler(form.form_id)}
            className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-700"
          >
            {`Form-${form.form_id}`}
          </button>
          <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
            Response: {form.response_count}
          </button>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:8080/api/login/check";

  const [instituteData, setInstituteData] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setInstituteData(response.data);
      } catch (err) {
        console.error("Error fetching API data", err.message);
      }
    };

    fetchApiData();
  }, []);


  if (!instituteData) {
    return <div>Loading...</div>; // Add a loading state
  }

  const { name, id, forms } = instituteData;

  const formHandler = (formId) => navigate(`/${id}/${formId}`);


  return (
    <>
      <div>
        <div className="flex bg-gray-800 justify-between items-center p-6 sticky z-60 top-0">
          <h1 className="text-2xl text-white">{name}</h1>
          <div className="flex justify-end items-end">
            <button
              onClick={() => navigate("/responses")}
              className="group relative w-auto justify-center py-1 px-2 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hidden"
            >
              My Responses
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {forms.map((form) => (
            <FormCard key={form.form_id} form={form} formHandler={formHandler} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

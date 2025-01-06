import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

function Login() {
  const [deptId, setDeptId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { isLoading, error } = useContext(AppContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!deptId || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/login/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_id: deptId, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);
        navigate(`/${deptId}`);
      } else if (response.status === 401) {
        setErrorMessage("Invalid password. Please try again.");
      } else if (response.status === 404) {
        setErrorMessage("Department ID not found.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setErrorMessage(
        "Unable to connect to the server. Please try again later."
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-md w-full">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="px-8 py-11">
          <h2 className="text-center text-3xl font-extrabold text-blue-700">
            Welcome Back
          </h2>
          <p className="mt-4 text-center text-indigo-950 font-semibold">
            Login to continue
          </p>
          <form onSubmit={submitHandler} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <input
                placeholder="Department ID"
                className="appearance-none caret-gray-400 relative block w-full px-3 py-2 border bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:z-10 sm:text-sm"
                type="text"
                spellCheck={false}
                value={deptId}
                onChange={(e) => setDeptId(e.target.value)}
              />
              <input
                placeholder="Password"
                className="appearance-none caret-gray-400 relative block w-full px-3 py-2 border bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:z-10 sm:text-sm mt-3"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <button
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              type="submit"
            >
              Login
            </button>
          </form>
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

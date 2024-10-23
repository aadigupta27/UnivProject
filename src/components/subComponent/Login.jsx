import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [deptId, setdeptId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("Department ID: ", deptId); // Log deptId for debugging
    console.log("Password: ", password); // Log password for debugging

    try {
      const response = await fetch(
        "http://localhost:8080/api/login/check_login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login_id: deptId,
            password: password,
          }),
        }
      );
      if (response.ok) {
        // Assuming successful login
        const loginId = await response.text();
        console.log("Login successful for department: ", loginId); // Log successful login
        navigate(`/${deptId}`); // Only navigate after successful login
      } else if (response.status === 401) {
        setErrorMessage("Invalid password. Please try again.");
        alert("Please Enter a valid password!");
      } else if (response.status === 404) {
        setErrorMessage("Department ID not found.");
        alert("Please Enter a Valid Department Id!");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(
        "Unable to connect to the server. Please try again later."
      );
    }
  };

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
              <div>
                <input
                  placeholder="Department Id"
                  className="appearance-none caret-gray-400 relative block w-full px-3 py-2 border bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:z-10 sm:text-sm"
                  type="text"
                  spellCheck={false}
                  value={deptId}
                  onChange={(e) => {
                    setdeptId(e.target.value);
                  }}
                />
              </div>
              <div className="mt-3">
                <input
                  placeholder="Password"
                  className="appearance-none caret-gray-400 relative block w-full px-3 py-2 border  bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:z-10 sm:text-sm"
                  required=""
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                />
              </div>
            </div>

            <div>
              <button
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 "
                type="submit"
              >
                Login
              </button>
            </div>
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

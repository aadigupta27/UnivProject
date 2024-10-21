import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [deptId, setdeptId] = useState("");
    const [Password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/${deptId}`)
    }

    return (

            <div className='max-w-md w-full'>
            <div
                className='bg-white rounded-lg shadow-2xl overflow-hidden'
            >
                <div className='px-8 py-11'>
                <h2 className='text-center text-3xl font-extrabold text-blue-700'>
                    Welcome Back
                </h2>
                <p className='mt-4 text-center text-indigo-950 font-semibold'>Login in to continue</p>
                <form onSubmit={submitHandler} className='mt-8 space-y-6'>
                    <div className='rounded-md shadow-sm'>
                    <div>
                        <input
                        placeholder="Department Id"
                        className='appearance-none caret-gray-400 relative block w-full px-3 py-2 border bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:z-10 sm:text-sm'
                        type="text"
                        spellCheck = {false}
                        value={deptId}
                        onChange={(e) => {setdeptId(e.target.value)}}
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                        placeholder="Password"
                        className='appearance-none caret-gray-400 relative block w-full px-3 py-2 border  bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:z-10 sm:text-sm'
                        required=""
                        value={Password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        type="password"
                        />
                    </div>
                    </div>

                    <div>
                    <button
                        className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 '
                        type="submit"
                    >
                        Login
                    </button>
                    </div>
                </form>
                </div>

            </div>

            <div></div>
            </div>

    )
}

export default Login

import React from 'react'
import { useNavigate } from 'react-router-dom'

function IETdashboard() {

    const formNav = useNavigate();

    const formHandler1 = () => {
        formNav('/iet@123/form1')
    }
    const formHandler2 = () => {
        formNav('/iet@123/form2')
    }
    const formHandler3 = () => {
        formNav('/iet@123/form3')
    }
    const formHandler4 = () => {
        formNav('/iet@123/form4')
    }
    const formHandler5 = () => {
        formNav('/iet@123/form5')
    }
    const responseHandler = () => {
        formNav('/iet@123/form/response')
    }

    return (
        <>
            <div>

                <div className='flex bg-gray-800 justify-between items-center p-6 sticky z-60 top-0'>
                    <h1 className='text-2xl text-white'> Institute of Engineering and Technology, Indore</h1>
                    <div className='flex justify-end items-end'>
                        <button onClick={responseHandler} className='group relative w-auto justify-center py-1 px-2 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hidden'>My Responses</button>
                    </div>
                </div>


                <div className='flex flex-col gap-3'>

                    <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-start ml-4 text-gray-700">Profile</h2>
                    <div className="flex space-x-3 justify-start shadow-lg p-4">
                        <div className='flex flex-col gap-3 bg-white p-4'>
                            <button onClick={formHandler1} className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-700">
                                Form-1
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
                                Response : 
                            </button>
                        </div>
                        <div className='flex flex-col gap-3 bg-white p-4'>
                            <button onClick={formHandler2} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
                                Form-2
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
                                Response : 
                            </button>
                        </div>
                        <div className='flex flex-col gap-3 bg-white p-4'>
                            <button onClick={formHandler3} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
                                Form-3
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
                                Response : 
                            </button>
                        </div>
                        <div className='flex flex-col gap-3 bg-white p-4'>
                            <button onClick={formHandler4} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
                                Form-4
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
                                Response : 
                            </button>
                        </div>
                        <div className='flex flex-col gap-3 bg-white p-4'>
                            <button onClick={formHandler5} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
                                Form-5
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
                                Response : 
                            </button>
                        </div>
                        
                    </div>
                    </div>
                    <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-start ml-4 text-gray-700">Research and Development</h2>
                    <div className="flex space-x-3 justify-start shadow-lg p-4">
                        <div className='flex flex-col gap-3 bg-white p-4'>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
                                Form-1
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
                                Response : 
                            </button>
                        </div>
                        <div className='flex flex-col gap-3 bg-white p-4'>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
                                Form-2
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
                                Response : 
                            </button>
                        </div>
                        <div className='flex flex-col gap-3 bg-white p-4'>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
                                Form-3
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
                                Response : 
                            </button>
                        </div>
                        <div className='flex flex-col gap-3 bg-white p-4'>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
                                Form-4
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
                                Response : 
                            </button>
                        </div>
                        <div className='flex flex-col gap-3 bg-white p-4'>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">
                                Form-5
                            </button>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-700">
                                Response : 
                            </button>
                        </div>
                        
                    </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default IETdashboard

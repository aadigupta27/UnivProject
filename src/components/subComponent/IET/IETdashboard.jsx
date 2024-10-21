import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function IETdashboard() {

    const formNav = useNavigate();
    const formHandler = () => {
        formNav('/iet@123/form')
    }

    return (
        <>
            <div>
                <div className='flex bg-gray-800 justify-between items-center p-6 '>
                    <h1 className='text-2xl text-white'> Institute of Engineering and Technology, Indore</h1>
                    <div className='flex justify-end items-end'>
                        <button className='group relative w-auto flex justify-center py-1 px-2 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600'>My Responses</button>
                    </div>
                </div>

                <div className='w-full h-full flex flex-col items-center justify-center px-10 py-24 bg-slate-100 gap-6'>

                <div className='flex justify-center align-center'>
                    <h1 className='text-3xl font-semibold text-gray-800'>Notifications</h1>
                </div>

                    <div className=' shadow-xl py-11 px-16 rounded-2xl bg-white flex flex-col gap-4'>
                        <div className='flex justify-between items-center gap-11 text-gray-800 text-md font-semibold'>
                            A form regarding the courses with the deadline dd/mm/yyyy 
                            <button onClick={formHandler} className='group relative w-auto flex justify-center py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600'>Forms</button>
                        </div>
                        <div className='flex justify-between items-center gap-7 text-gray-800 text-md font-semibold'>
                            A form regarding the Admissions with the deadline dd/mm/yyyy 
                            <button onClick={formHandler} className='group relative w-auto flex justify-center py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600'>Forms</button>
                        </div>
                        <div className='flex justify-between items-center gap-7 text-gray-800 text-md font-semibold'> 
                            A form regarding the Students with the deadline dd/mm/yyyy 
                            <button onClick={formHandler} className='group relative w-auto flex justify-center py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600'>Forms</button>
                        </div>
                        <div className='flex justify-between items-center gap-7 text-gray-800 text-md font-semibold'> 
                            A form regarding the Students with the deadline dd/mm/yyyy 
                            <button onClick={formHandler} className='group relative w-auto flex justify-center py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600'>Forms</button>
                        </div>
                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default IETdashboard

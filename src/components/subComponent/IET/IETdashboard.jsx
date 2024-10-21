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
                <div>
                    <h1> Institute of Engineering and Technology, Indore</h1>
                    <button>My Response</button>
                </div>
                <div>
                    <div>
                        A form regarding the courses with the deadline dd/mm/yyyy 
                        <button onClick={formHandler}>Forms</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IETdashboard

import React from 'react'
import Login from './subComponent/Login'

function Home() {
    return (

        <div className=' box-border p-0 m-0 h-full w-full overflow-x-hidden overflow-y-hidden'>

            <div className=''>
                <div className='flex justify-center gap-11 items-center bg-slate-200 p-8 '>
                    <div className='w-1/2 flex justify-center items-center'>
                    
                    <img className='' src='./src/20824344_6343823 (1).svg' alt='illustration'/>
                    </div>
                    <div className='w-1/2 flex justify-center items-center'>
                        <Login />
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}

export default Home

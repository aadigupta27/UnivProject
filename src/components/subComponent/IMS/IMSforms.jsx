import React from 'react'

function IMSforms() {
    return (
        <div className='p-10 flex flex-col justify-center items-center'>
            <h1 className="text-3xl text-gray-800 mb-4">IMS form </h1>

            <table className='min-w-full table-auto border-collapse'>
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">SN</th>
                        <th className="px-4 py-2 border">Prg_Code</th>
                        <th className="px-4 py-2 border">IIQA_PrgName</th>
                        <th className="px-4 py-2 border">deptID</th>
                        <th className="px-4 py-2 border">level</th>
                        <th className="px-4 py-2 border"> year_of_introduction</th>
                    </tr>
                </thead>
            </table>
       </div>
    )
}

export default IMSforms

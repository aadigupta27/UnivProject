import React from 'react'

function Header() {
    return (
        <div className='box-border max-w-full max-h-full shadow-xl overflow-x-hidden sticky top-0 z-50'>
             <div className='bg-blue-800 h-24 flex items-center justify-between py-2 px-6 sticky top-0'>
                <img className='h-20 w-20' src='https://upload.wikimedia.org/wikipedia/en/a/ae/Devi_Ahilya_Vishwavidyalaya_Logo.png'/>
                <h1 className='text-3xl font-semibold text-white flex justify-center'> Devi Ahilya Vishwavidyalaya, Indore</h1>
                <img 
                    className='h-24 w-20 rounded-full'
                    src='https://en-media.thebetterindia.com/uploads/2017/10/Maharani_Ahilya_Bai_Holkar.png' alt='image'/>
            </div>
        </div> 
    )
}

export default Header
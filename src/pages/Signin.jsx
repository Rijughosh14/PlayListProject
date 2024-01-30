import React from 'react'

const Signin = () => {
  return (
    <div className='flex flex-col h-64 w-96 bg-white px-6 py-6 rounded-b-2xl gap-10'>
        <div>
            <input type="text" className='focus:outline-none  border-b border-black border-opacity-30  w-full p-2 focus:border-opacity-60' placeholder='Name'/>
        </div>
        <div>
            <input type="password" className='focus:outline-none  border-b border-black border-opacity-30 w-full p-2 focus:border-opacity-60' placeholder='Password' />
        </div>
        <div className='mx-auto'>
            <button className='bg-purple-200 border border-gray-100 py-2 px-4 rounded-lg font-bold'>
              Sign In
            </button>
        </div>
    </div>
  )
}

export default Signin
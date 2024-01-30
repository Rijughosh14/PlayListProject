import { useState } from 'react'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import login from '../src/assets/login.svg'

function App() {
  const [Active, SetActive] = useState(true)

  return (
    <>
    <div className='container flex bg-gradient-to-br from-blue-200 to-blue-100 mx-auto min-h-screen rounded-2xl shadow-2xl shadow-black flex-row'>
      <div className='w-1/2'> 
        <img src={login} alt="login.svg" className='h-full w-full m-auto' />
      </div>
    <div className='flex m-auto'>
        <div className='m-auto flex flex-col shadow-xl'>
            <div className='flex flex-row h-12 w-full bg-white rounded-t-2xl hover:cursor-pointer '>
                <div className={`w-1/2 ${Active&&`shadow-2xl shadow-gray-500 border-b-2 border-blue-200`}   p-2 text-center rounded-b-xl font-serif text-lg`} onClick={()=>SetActive(true)}>
                    Signup
                </div>
                <div className={`w-1/2 ${!Active&&`shadow-2xl shadow-gray-500 border-b-2 border-blue-200`}   p-2 text-center rounded-b-xl font-serif text-lg`} onClick={()=>SetActive(false)}>
                    SignIn
                </div>
            </div>
            {Active?
            <Signup/>:
            <Signin/>}
        </div>
    </div>
    </div>
    </>
  )
}

export default App

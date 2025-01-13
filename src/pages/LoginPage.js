import React from 'react'
import Login from '../components/Login'

const LoginPage = () => {
  return (
    <div className='container m-10 '>
        <img
              alt="logo"
              src="https://www.pngfind.com/pngs/m/564-5646320_hd-png-psd-free-download-ah-logo-graphic.png"
              className="h-8 w-auto"
            />
        <div className='flex flex-col items-center space-y-4 justify-center pt-36'>
           <h1 className='text-3xl font-bold'><span className='text-blue-400 text-4xl'>A</span>rticle<span className='text-orange-500 text-4xl'>H</span>ub</h1>
            <Login/>
        </div>
        
    </div>
  )
}

export default LoginPage
import React from 'react'
import Navbar from '../pages/Navbar'
import User from './User/User'
import { Route, Routes} from 'react-router-dom'



const MainPage = () => {
  return (
    
    <div className='flex'>
        <div className='w-2/12 '>
        <Navbar />
        </div>
        
        <div className='w-10/12 px-4'>
        <Routes>
        <Route path="/user" element={<User/>} ></Route>
      
       
      </Routes>
        </div>
       
    </div>
  )
}

export default MainPage;
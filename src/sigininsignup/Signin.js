import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Signin = () => {
  const navigate = useNavigate();
  const email = useRef(null); 
  const password = useRef(null); 
  const [error, setError] = useState(null);

  const sign = () => {
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then(() => {
        navigate('/main');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-blue-600'>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className='text-2xl mb-4 text-center font-semibold text-gray-800'>Sign In</h2>
        <form onSubmit={e => e.preventDefault()} className='text-center'>
          <div className="mb-4">
            <input 
              className='w-full border-b border-gray-300 rounded-lg px-3 py-2 outline-none text-gray-800 focus:border-blue-400'
              ref={email} 
              type="text" 
              title="email" 
              placeholder="Email" 
            />
          </div>
          <div className="mb-6">
            <input 
              className='w-full border-b border-gray-300 rounded-lg px-3 py-2 outline-none text-gray-800 focus:border-blue-400'
              ref={password} 
              type="password" 
              title="password" 
              placeholder="Password" 
            />
          </div>
          <button 
            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            onClick={sign} 
            type="submit" 
          >
            Sign In
          </button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signin;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-champ.png';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate a mock Firebase call with a delay
    console.log('Logging in...');

    setTimeout(() => {
      // Mock success
      console.log('Login successful!');
      console.log('Username:', username);
      console.log('Password:', password);

      // Navigate to the Home page after successful login
      navigate('/home');
    }, 1000); // Simulating a 1-second delay
  };

  return (
    <div className='w-full bg-slate pt-12 p-24 flex flex-col justify-center items-center' 
    style={{
        background: `url(${logo}) repeat`, // repeat the background image
        backgroundSize: '150px', // adjust this based on your design needs
        backgroundPosition: '20px 20px',
      }}>
      <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-85'></div>
      <div className="md:w-1/2 md:max-w-md z-10 h-fit p-12 bg-black rounded-2xl">
        <h1 className="text-white text-4xl font-extrabold mb-12">Welcome Back!</h1>
        <div className="mb-4 flex flex-col items-start">
          <label className="text-white text-lg mb-2 block">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label className="text-white text-lg mb-2 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-yellow-500 text-black text-lg px-8 py-2 mt-8 rounded hover:bg-white focus:outline-none"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;

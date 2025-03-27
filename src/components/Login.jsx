
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/login`, {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      alert('Login Successful!');
      setIsLoading(false);
      navigate('/UserList')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } 
      
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="w-full max-w-5xl flex shadow-2xl rounded-3xl overflow-hidden bg-white">
       
        <div 
          className="hidden md:block w-1/2 relative"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%)'
          }}
        >
          <div className="absolute inset-0 opacity-10 bg-pattern"></div>
          <div className="relative z-10 p-12 text-white h-full flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in">Welcome Back!</h2>
            <p className="text-xl mb-8 opacity-80">
              Sign in to access your personalized dashboard and continue your journey.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                
                <span>Secure Authentication</span>
              </div>
              <div className="flex items-center space-x-4">
               
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Log In</h1>
              <p className="text-gray-500">Enter your credentials to access your account</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <div className="relative">
                
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <div className="relative">
               
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg 
              hover:from-indigo-600 hover:to-purple-700 transition duration-300 
              flex items-center justify-center space-x-2
              disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin w-5 h-5 border-2 border-t-2 border-white rounded-full mr-2"></div>
              ) : null}
              <span>{isLoading ? 'Logging In...' : 'Sign In'}</span>
            </button>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                  Sign Up
                </a>
              </p>
            </div>

           
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
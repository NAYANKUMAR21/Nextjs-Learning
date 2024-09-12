'use client';
import React, { useState } from 'react';

interface LoginCred {
  username: string;
  password: string;
}
const Login = () => {
  const [creds, SetCreds] = useState<LoginCred>({
    username: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetCreds({
      ...creds,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(creds);
  };
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" for="username">
                Username
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-gray-600"
                type="text"
                id="username"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-gray-600"
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>

            <button className="w-full bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-gray-600 mb-6">
              Log in
            </button>
          </form>

          <div className="text-center text-sm mb-4">Or login with</div>
          <div className="flex justify-between space-x-4">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-red-400">
              Google
            </button>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-400">
              Facebook
            </button>
          </div>

          <div className="flex justify-between space-x-4 mt-4">
            <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
              Twitter
            </button>

            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-gray-500">
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

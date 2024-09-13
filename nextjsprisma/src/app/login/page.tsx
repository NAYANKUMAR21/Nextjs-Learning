'use client';
import { CircleLoader } from '@/Components/Loaders';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface LoginCred {
  username: string;
  password: string;
}
interface error {
  message: string;
  error: boolean;
}

const Login = () => {
  const router = useRouter();
  const [creds, SetCreds] = useState<LoginCred>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<error>({
    message: '',
    error: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({ message: '', error: false });
    SetCreds({
      ...creds,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError({ message: '', error: false });

      const loginUser = await axios.post('/api/users/login', creds);

      setLoading(false);
      if (loginUser.data.success) {
        console.log('success');
        router.push('/');
        return;
      } else {
        return setError({ message: loginUser.data.message, error: true });
      }
    } catch (er: unknown) {
      setLoading(false);
      if (er instanceof Error) {
        return setError({ message: er.message, error: true });
      } else {
        return setError({ message: 'Something went wrong', error: true });
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-gray-600"
                type="text"
                id="username"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-gray-600"
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-gray-600 mb-6"
            >
              {loading ? <CircleLoader /> : 'Log in'}
            </button>
            {error.error && <p className="text-red-500">{error.message}</p>}
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

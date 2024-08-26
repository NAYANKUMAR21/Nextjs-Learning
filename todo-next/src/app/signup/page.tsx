'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

interface UserCreds {
  email: string;
  password: string;
  username: string;
}

function Signup() {
  const router = useRouter();
  const [Creds, setCreds] = useState<UserCreds>({
    email: '',
    password: '',
    username: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCreds({
      ...Creds,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // axios
    try {
      e.preventDefault();
      await axios.post('/api/user/signup', { ...Creds });
      router.push('/login');
    } catch (er: any) {
      return console.log(er.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images5.alphacoders.com/711/711093.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              onChange={handleChange}
              name="username"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              name="email"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              name="password"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-800 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

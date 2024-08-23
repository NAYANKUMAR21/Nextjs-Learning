'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

interface UserCreds {
  email: string;
  password: string;
}
function Login() {
  const router = useRouter();
  const [view, setView] = useState<boolean>(false);
  const [Creds, setCreds] = useState<UserCreds>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCreds({
      ...Creds,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      // axios
      let data = await axios.post('/api/user/login', { ...Creds });
      console.log(data);
      router.push(`/${data.data.id}`);
      return;
    } catch (er: any) {
      console.log(er.message);
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
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex items-center border border-gray-300 rounded-lg">
              <input
                type={view ? 'text' : 'password'}
                id="password"
                onChange={handleChange}
                name="password"
                className="text-black w-full px-4 py-2 rounded-l-lg focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setView(!view)}
                className={`px-4 py-2 bg-zinc-800 hover:bg-gray-300 rounded-r-lg`}
              >
                {view ? 'Hide' : 'View'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-800 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

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
    e.preventDefault();
    await axios.post('/api/users/signup', { ...Creds });
    router.push('/login');
  };

  return (
    <div className="text-black">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input type="text" id="username" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="text-black">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            className="text-black"
          />
        </div>
        <button type="submit" className="text-white">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;

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
    <div className="text-black">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input type="email" id="email" onChange={handleChange} name="email" />
        </div>
        <div className="flex text-white">
          <label htmlFor="password">Password</label>
          <input
            type={view == true ? 'text' : 'password'}
            id="password"
            onChange={handleChange}
            name="password"
            className="text-black"
          />
          <div
            onClick={() => {
              setView(!view);
            }}
          >
            View
          </div>
        </div>
        <button type="submit" className="text-white">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

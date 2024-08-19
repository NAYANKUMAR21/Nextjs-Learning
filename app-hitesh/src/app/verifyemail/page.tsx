'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function verifyEmailpage() {
  const [token, setToken] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [error, seterror] = useState<boolean>(false);

  const verifyEmailhandler = async () => {
    try {
      console.log('here');
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
    } catch (er: unknown) {
      seterror(true);
      setVerified(false);
      if (er instanceof Error) {
        console.log(er.message);
      } else {
        console.log('Somehting unknow happened...');
      }
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    console.log(urlToken);
    setToken(urlToken || '');
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyEmailhandler();
    }
  }, [token]);
  console.log(token, verified, error);

  return (
    <div className="flex flex-col items-center jusify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2>{token.length > 0 ? `${token}` : 'No Token'}</h2>
      {verified && (
        <div>
          <h2 className="text-2xl"> Email verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-400 text-black"> Error</h2>
        </div>
      )}
    </div>
  );
}

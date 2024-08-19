import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getDataFromToken = (
  request: NextRequest,
  Token: string | undefined
): String => {
  let token = Token;
  console.log(token);
  try {
    if (!token) {
      console.log('here...entered');
      token = request.cookies.get('token')?.value || '';
      console.log('here...entered', token);
    }
    console.log('here');
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      id: string;
      username: string;
      email: string;
      password: string;
    };
    console.log(decodedToken);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

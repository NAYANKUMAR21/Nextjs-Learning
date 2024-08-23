import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export default async function getIdFromToken(request: NextRequest) {
  try {
    let token = request.cookies.get('token')?.value || '';

    console.log(request.cookies.get('token'), token);
    if (!token) {
      console.log(process.env.TOKEN_SECRET!);
      throw Error('Token is empty string-> ' + token);
    }
    const decodedToken: any = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as any;
    console.log(decodedToken);
    return decodedToken.id;
  } catch (er: unknown) {
    if (er instanceof Error) {
      console.log(er.message);
      throw Error(er.message);
    } else {
      console.log('Something unknown happend in getToken file');
    }
  }
}

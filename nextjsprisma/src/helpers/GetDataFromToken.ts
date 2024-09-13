import jwt from 'jsonwebtoken';

export function GetDataFromToken(token: string) {
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as {
    id: string;
    email: string;
    username: string;
  };

  console.log(decodedToken);
  return decodedToken.id;
}

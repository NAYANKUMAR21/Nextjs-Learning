import jwt from 'jsonwebtoken';

export const getToken = ({
  id,
  email,
  username,
}: {
  id: string;
  email: string;
  username: string;
}): string => {
  const token = jwt.sign({ id, username, email }, process.env.TOKEN_SECRET!, {
    expiresIn: '1d',
  });
  return token;
};

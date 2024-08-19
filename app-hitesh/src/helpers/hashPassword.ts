import bcryptjs from 'bcryptjs';
export default async function hashpassword(password: string): Promise<string> {
  try {
    const genSalt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, genSalt);

    return hashedPassword;
  } catch (er: any) {
    throw new Error(er.message);
  }
}

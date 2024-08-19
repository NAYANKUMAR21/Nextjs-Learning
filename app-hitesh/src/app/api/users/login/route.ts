import { NextRequest, NextResponse } from 'next/server.js';
import { connect } from '../../../../dbconfig/db.config.js';
import UserModel from '../../../../models/userModels.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Route entered', body);
    const { email, password } = body;
    console.log('Destructing...');

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        {
          message: 'User Doesnt exist Please Signup first..',
        },
        { status: 400 }
      );
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          message: 'Invalid Credentials',
        },
        { status: 401 }
      );
    }

    const tokenData: { id: string; username: string; email: string } = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // if (!process.env.TOKEN_SECRET) {
    //   throw new Error('TOKEN_SECRET is not defined');
    // }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    let response: NextResponse = NextResponse.json(
      { message: 'Login Successfull!..', success: true },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
    });
    return response;
  } catch (er: any) {
    console.log('Login route', er.message);
    return NextResponse.json({ message: er.message, status: 500 });
  }
}

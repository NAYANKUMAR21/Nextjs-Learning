import connect from '@/dbconfig/db.config';
import userModel from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcyrpyt from 'bcryptjs';
import jwt from 'jsonwebtoken';
connect();
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await request.json();

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { message: 'User not present' },
        { status: 400 }
      );
    }

    const isMatch = await bcyrpyt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid Createntails' },
        { status: 400 }
      );
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        password: user.password,
      },
      process.env.TOKEN_SECRET!
    );

    const response = NextResponse.json(
      {
        message: 'User Logined Successfully',
        id: user._id,
        token,
        sucess: true,
      },
      { status: 200 }
    );

    console.log(token);
    response.cookies.set('token', token, { httpOnly: true });
    return response;
  } catch (er: unknown) {
    if (er instanceof Error) {
      return NextResponse.json({ message: er.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: 'Something unknown happend' },
        { status: 500 }
      );
    }
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const users = await userModel.find(); // Fetch all users
    return NextResponse.json(users); // Return users as JSON
  } catch (er: unknown) {
    if (er instanceof Error) {
      return NextResponse.json({ message: er.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: 'Something unknown happened' },
        { status: 500 }
      );
    }
  }
}

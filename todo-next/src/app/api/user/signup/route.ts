import connect from '@/dbconfig/db.config';
import userModel from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcyrpyt from 'bcryptjs';
connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { username, email, password } = await request.json();

    const user = await userModel.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        { message: 'User already present' },
        { status: 400 }
      );
    }

    let salt = await bcyrpyt.genSalt(10);
    const hashedPassword = await bcyrpyt.hash(password, salt);
    await userModel.create({ username, email, password: hashedPassword });
    return NextResponse.json({ message: 'User created successfully' });
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



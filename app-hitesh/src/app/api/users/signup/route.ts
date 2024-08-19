import { connect } from '@/dbconfig/db.config';
import UserModel from '@/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

export async function POST(request: NextRequest): Promise<NextResponse> {
  connect();
  try {
    const body = await request.json();
    const { username, email, password } = body;
    if (!body) {
      return NextResponse.json(
        { message: 'Body missing from the request' },
        { status: 400 }
      );
    }

    const singleData = await UserModel.findOne({ email: email });
    if (singleData) {
      return NextResponse.json(
        {
          message: ' Login please User already present.. ',
        },
        { status: 400 }
      );
    }

    const genSalt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, genSalt);

    const NewUser = new UserModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await NewUser.save(0);
    console.log(savedUser);

    await sendEmail({
      email,
      emailType: 'VERIFY',
      userId: savedUser._id,
    });

    return NextResponse.json(
      {
        message: 'User created successfully...',
        success: true,
        savedUser,
      },
      { status: 201 }
    );
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

export async function GET() {
  connect();
  try {
    const getData = await UserModel.find();
    return NextResponse.json({ data: getData }, { status: 200 });
  } catch (er: any) {
    console.log(er.message);
    return NextResponse.json({ message: er.message }, { status: 500 });
  }
}

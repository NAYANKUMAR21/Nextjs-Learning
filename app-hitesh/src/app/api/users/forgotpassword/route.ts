import { getDataFromToken } from '@/helpers/getDataFromToken';
import hashpassword from '@/helpers/hashPassword';
import { sendEmail } from '@/helpers/mailer';
import UserModel from '@/models/userModels';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const {
      email,
      Action,
      newPassword,
      confirmPassword,
      token,
    }: {
      email: string;
      Action: string;
      newPassword: string;
      confirmPassword: string;
      token: string;
    } = await request.json();

    if (Action === 'NEW-PASSWORD') {
      await StoreNewPassword(newPassword, token);

      return NextResponse.json(
        { message: 'Password storage successfull', success: true },
        { status: 200 }
      );
    }

    if (!email && email.includes('@gmail.com')) {
      return NextResponse.json({ message: 'Please enter company mail...!' });
    }
    const singleUser = await UserModel.findOne({ email: email });
    if (!singleUser) {
      return NextResponse.json(
        { message: 'Account does not exist Please signup first...' },
        { status: 500 }
      );
    }

    let mailsent = await sendEmail({
      email,
      emailType: 'RESET',
      userId: singleUser._id,
    });

    return NextResponse.json(
      { message: 'Mail sent successfully...!' },
      { status: 200 }
    );
  } catch (er: unknown) {
    if (er instanceof Error) {
      return NextResponse.json({ message: er.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: 'Something unknown happened...!' },
        { status: 500 }
      );
    }
  }
}

async function StoreNewPassword(newPassword: string, token: String) {
  try {
    let user = await UserModel.findOne({ forgotPasswordToken: token });

    if (!user) {
      return NextResponse.json(
        {
          message: 'User doesnt exist please signup....',
        },
        {
          status: 400,
        }
      );
    }
    if (!newPassword) {
      return NextResponse.json(
        {
          message:
            'Please enter newPassword and confirm password input boxes correctly.. ',
        },
        { status: 500 }
      );
    }
    let hashedPass = await hashpassword(newPassword);
    await UserModel.findByIdAndUpdate(
      { _id: user._id },
      { password: hashedPass },
      { new: true, runValidators: true }
    );

    return;
  } catch (er: any) {
    if (er instanceof Error) {
      return NextResponse.json({ message: er.message }, { status: 500 });
    } else {
      return NextResponse.json(
        {
          message: 'Something unknown error happened...',
        },
        { status: 500 }
      );
    }
  }
}

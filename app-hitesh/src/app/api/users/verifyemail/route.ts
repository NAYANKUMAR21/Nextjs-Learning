import { connect } from '@/dbconfig/db.config';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/userModels';
connect();

export async function POST(request: NextResponse) {
  try {
    const reqbody = await request.json();

    const { token } = reqbody;
    const userData = await UserModel.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!userData) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    userData.isVerified = true;
    userData.verifyToken = undefined;
    userData.verifyTokenExpiry = undefined;

    await userData.save();

    return NextResponse.json({
      message: 'Email verified successfully...',
      success: true,
    });
  } catch (er: unknown) {
    if (er instanceof Error) {
      return NextResponse.json({ message: er.message }, { status: 500 });
    } else {
    }
  }
}

import { prisma } from '../../../../../prisma';
import argon2 from 'argon2';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    const data = await prisma.user.findUnique({
      where: {
        username,
        email,
      },
    });
    if (data) {
      return NextResponse.json(
        { message: 'User already existed!...', success: false },
        { status: 500 }
      );
    }
    const hashPassword = await argon2.hash(password);
    const craetedUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    return NextResponse.json(
      {
        message: 'User created Successfully...!',
        success: true,
        data: craetedUser,
      },
      { status: 201 }
    );
  } catch (er: unknown) {
    if (
      er instanceof Error &&
      er.message.includes('Server selection timeout')
    ) {
      return NextResponse.json(
        {
          message:
            'Database connection cannot be established. Server error. Please try again later. ' +
            er.message,
          success: false,
        },
        { status: 500 }
      );
    } else if (er instanceof Error) {
      return NextResponse.json(
        { message: er.message, success: false },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: 'Something went wrong...', success: false },
        { status: 500 }
      );
    }
  }
}

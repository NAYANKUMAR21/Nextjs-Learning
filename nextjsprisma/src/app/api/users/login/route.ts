import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma';
import argon2 from 'argon2';
import { getToken } from '@/helpers/getToken';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    console.log('Headers: ', req.headers.get('x-coming-from'));

    const data = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!data) {
      return NextResponse.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    const match = await argon2.verify(data.password, password);
    if (!match) {
      return NextResponse.json(
        { message: 'Wrong password', success: false },
        { status: 401 }
      );
    }

    const token: string = getToken({
      id: data.id,
      email: data.email,
      username: data.username,
    });

    const response = NextResponse.json(
      { message: 'User logged in', success: true, data },
      { status: 200 }
    );
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return response;

    // return response;
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
export async function GET() {
  try {
    const data = await prisma.user.findMany();
    return NextResponse.json(
      {
        message: 'Successfull data fetched.. ',
        data,
        success: true,
      },
      {
        status: 200,
      }
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

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();
    let data = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return NextResponse.json(
      { message: 'User Created', success: true, data },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    let data = await prisma.user.findMany();
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
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}

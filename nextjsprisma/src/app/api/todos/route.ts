import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma';

import { GetDataFromToken } from '@/helpers/GetDataFromToken';

export async function GET(req: NextRequest) {
  try {
    let token = req.cookies.get('token')?.value || '';
    console.log('token: ', token);
    if (!token) {
      return NextResponse.json(
        { message: 'Token missing...', success: false },
        {
          status: 401,
        }
      );
    }
    let id = GetDataFromToken(token);
    console.log(id);
    const data = await prisma.todos.findMany({
      where: {
        userId: id,
      },
    });

    return NextResponse.json(
      { message: 'backend Up and running ', data, success: true },
      { status: 200 }
    );
  } catch (er: unknown) {
    if (er instanceof Error) {
      return NextResponse.json(
        { message: er.message, success: false },
        {
          status: 500,
        }
      );
    } else {
      throw new Error('Something went wrong');
    }
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    let token = req.cookies.get('token')?.value || '';
    let userId = GetDataFromToken(token);

    const body = await req.json();
    const { todoText } = body as { todoText: string };
    console.log(body, userId, token);
    let storeData = await prisma.todos.create({
      data: {
        todoText,
        userId,
        isCompleted: false,
      },
    });
    return NextResponse.json(
      {
        message: 'Todo Stored inside DB',
        storeData,
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      {
        status: 500,
      }
    );
  }
}

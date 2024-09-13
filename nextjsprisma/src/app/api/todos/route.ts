import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma';
import { GetDataFromToken } from '@/helpers/GetDataFromToken';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Retrieve the token from the cookies
    const token = req.cookies.get('token')?.value || '';
    console.log('token: ', token);

    if (!token) {
      return NextResponse.json(
        { message: 'Token missing...', success: false },
        { status: 401 }
      );
    }

    // Decode the token to get user ID
    const id = GetDataFromToken(token);
    console.log(id);

    // Fetch todos for the specific user
    const data = await prisma.todos.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        todoText: true,
        isCompleted: true,
        userId: true,
      },
    });

    return NextResponse.json(
      { message: 'Backend up and running', data, success: true },
      { status: 200 }
    );
  } catch (er: unknown) {
    // Type-safe error handling
    if (er instanceof Error) {
      return NextResponse.json(
        { message: er.message, success: false },
        { status: 500 }
      );
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Get token from cookies
    const token = req.cookies.get('token')?.value || '';
    const userId = GetDataFromToken(token);

    // Parse request body
    const body = await req.json();
    const { todoText } = body as { todoText: string };

    // Log the values for debugging
    console.log(body, userId, token);

    // Store the new todo
    const storeData = await prisma.todos.create({
      data: {
        todoText,
        userId,
        isCompleted: false,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Todo stored inside DB',
        storeData,
        success: true,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Type-safe error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 500 }
      );
    } else {
      throw new Error('Unknown error occurred');
    }
  }
}

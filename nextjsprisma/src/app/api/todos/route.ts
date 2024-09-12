import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma';

export async function GET() {
  try {
    // await prisma.$connect();

    let data = await prisma.todos.findMany({});

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
    const body = await req.json();
    const { todoText, userId } = body as { todoText: string; userId: string };
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

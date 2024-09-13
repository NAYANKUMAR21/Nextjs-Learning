import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params);

    const id = params.id || req.url.trim().split('/').pop();
    
    if (!id) {
      return NextResponse.json(
        { message: 'ID is required', success: false },
        { status: 400 }
      );
    }
    // await prisma.$connect();
    const data = await prisma.todos.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      message: 'Todo Deleted successfully..',
      data,
      success: true,
    });
  } catch (er: unknown) {
    if (er instanceof Error) {
      return NextResponse.json(
        { message: er.message, success: false },
        {
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        { message: 'Something wrong happened...', success: false },
        {
          status: 500,
        }
      );
    }
  }
}

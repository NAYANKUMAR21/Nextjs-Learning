import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma';
export async function GET(req: NextRequest) {
  try {
    
  } catch (er: any) {
    return NextResponse.json(
      { message: er.message, success: false },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.url.split('/').pop();
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
  } catch (er: any) {
    return NextResponse.json(
      { message: er.message, success: false },
      {
        status: 500,
      }
    );
  }
}

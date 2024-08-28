import connect from '@/dbconfig/db.config';
import todoModel from '@/models/todo.model';

import { NextRequest, NextResponse } from 'next/server';
connect();

export async function GET(request: NextRequest) {
  try {
    const id: string | undefined = request.nextUrl.pathname.split('/').pop();
    console.log(id);

    let data = await todoModel.find({ userId: id });

    return NextResponse.json({ message: 'Todo fetched  successfully', data });
  } catch (er: unknown) {
    if (er instanceof Error) {
      return NextResponse.json({ message: er.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: 'Something unknown happend' },
        { status: 500 }
      );
    }
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const id: string | undefined = request.nextUrl.pathname.split('/').pop();
    const { todo, isCompleted }: { todo: string; isCompleted: boolean } =
      await request.json();

    if (todo) {
      await todoModel.findByIdAndUpdate(
        { _id: id },
        {
          todo,
        }
      );
      return NextResponse.json(
        { message: 'Todo text updated successfully...!' },
        { status: 200 }
      );
    }
    console.log(id, todo, isCompleted);

    await todoModel.findByIdAndUpdate(
      { _id: id },
      { isCompleted },
      { new: true, runValidators: true }
    );
    console.log('Updated completed ');
    return NextResponse.json(
      { message: 'Todo is Completed updated successfully...!' },
      { status: 200 }
    );
  } catch (er: unknown) {
    if (er instanceof Error) {
      return NextResponse.json({ message: er.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: 'Something unknowm happened' },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const id: string | undefined = request.nextUrl.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json(
        { message: 'Todo document Id is missing ' },
        { status: 400 }
      );
    }
    await todoModel.findByIdAndDelete({ _id: id });
    return NextResponse.json(
      { message: 'Todo deleted successfully!...', success: true },
      { status: 200 }
    );
  } catch (er: unknown) {
    if (er instanceof Error) {
      return NextResponse.json({ message: er.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: 'Something unknowm happened' },
        { status: 500 }
      );
    }
  }
}

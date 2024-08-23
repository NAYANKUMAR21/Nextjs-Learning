import connect from '@/dbconfig/db.config';
import getIdFromToken from '@/helpers/getIdFromToken';
import todoModel from '@/models/todo.model';
import { NextRequest, NextResponse } from 'next/server';
connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    let id = await getIdFromToken(request);
    if (!id) {
      return NextResponse.json({ message: 'Login first' }, { status: 500 });
    }
    const { todo }: { todo: string } = await request.json();

    let x = await todoModel.create({
      userId: id,
      todo,
      isCompleted: false,
      createdAt: Date.now(),
    });
    console.log(todo, id);
    return NextResponse.json({ message: 'Todo is added successfully', x });
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


import { connect } from '@/dbconfig/db.config';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET() {
  try {
    console.log('get route inside logout directory');
    const response = NextResponse.json(
      {
        message: 'Logout Successfull..',
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.log('An unknown error occurred');
      return NextResponse.json(
        { error: 'An unknown error occurred!..' },
        { status: 500 }
      );
    }
  }
}

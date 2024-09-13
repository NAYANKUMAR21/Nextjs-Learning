import { NextRequest, NextResponse } from 'next/server';

export async function GetToken(req: NextRequest) {
  //   try {
  //     if (!token) {
  //       return NextResponse.json(
  //         { message: 'Token missing...' },
  //         { status: 401 }
  //       );
  //     }
  //     return token;
  //   } catch (er: unknown) {
  //     if (er instanceof Error) {
  //       return NextResponse.json(
  //         { message: er.message, success: false },
  //         { status: 500 }
  //       );
  //     } else {
  //       return NextResponse.json({
  //         message: 'Something went wrong in the GetToken helper...',
  //         success: false,
  //       });
  //     }
  //   }
}

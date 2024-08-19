import { connect } from '@/dbconfig/db.config';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import UserModel from '@/models/userModels';

import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const id = getDataFromToken(request, '');
    const UserData = await UserModel.findOne({ _id: id }, { password: -1 }, {});

    console.log(UserData);
    return NextResponse.json(
      {
        message: 'Data Successfully fetched',
        UserData,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (er: unknown) {
    if (er instanceof Error) {
      return NextResponse.json({ message: er.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: 'Some unknown error happened' },
        { status: 500 }
      );
    }
  }
}

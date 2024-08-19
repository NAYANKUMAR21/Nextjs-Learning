// if (Action === 'NEW-PASSWORD') {
//   console.log('Entered if condition...');
//   let userID = getDataFromToken(request, token);
//   console.log('here...');
//   return StoreNewPassword(newPassword, confirmPassword, userID);
// }
// export async function POST(
//   newPassword: string | undefined,
//   confirmPassword: string | undefined,
//   userID: String
// ) {
//   try {
//     let user = await UserModel.find({ _id: userID });
//     if (!user) {
//       return NextResponse.json(
//         {
//           message: 'User doesnt exist please signup....',
//         },
//         {
//           status: 400,
//         }
//       );
//     }
//     if (!newPassword) {
//       return NextResponse.json(
//         {
//           message:
//             'Please enter newPassword and confirm password input boxes correctly.. ',
//         },
//         { status: 500 }
//       );
//     }
//     let hashedPass = await hashpassword(newPassword);
//     await UserModel.findByIdAndUpdate(
//       userID,
//       { password: hashedPass },
//       { new: true, runValidators: true }
//     );

//     return NextResponse.redirect('/profile');
//   } catch (er: any) {
//     if (er instanceof Error) {
//       return NextResponse.json({ message: er.message }, { status: 500 });
//     } else {
//       return NextResponse.json({
//         message: 'Something unknown error happened...',
//       });
//     }
//   }
// }

//  domain.com/verifytoken/ajcjkdbdbc
//  domain.com/verifytoken?token=ajcjkdbdbc

import nodemailer from 'nodemailer';
import UserModel from '@/models/userModels';
import bcyrptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function sendEmail({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) {
  try {
    // Create a hashed token
    const hashedToken = await bcyrptjs.hash(userId.toString(), 10);
    if (emailType == 'VERIFY') {
      // Date.now() is the time stamp which give in milliseconds frm the start of Unix Epoch
      //new Date() will give the object for the manipulation.
      await UserModel.findByIdAndUpdate(
        { _id: userId },
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 },
        { new: true, runValidators: true }
      );
    } else if (emailType == 'RESET') {
      await UserModel.findByIdAndUpdate(
        { _id: userId },
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    const mailOptions = {
      from: 'naayaankumar@gmail.com',
      to: email,
      subject:
        emailType == 'VERIFY'
          ? 'Verification mail...'
          : 'Reset your password...!',
      html: `<p>Click <a href='${process.env.DOMAIN}/${emailType == 'VERIF' ? 'verifyemail' : 'forgotPassword'}?token=${hashedToken}'>Here</a> to ${
        emailType == 'VERIFY'
          ? 'Verification mail...'
          : 'Reset your password...!'
      }
      
      
        <br>${process.env.DOMAIN}/${emailType == 'VERIF' ? 'verifyemail' : 'forgotPassword'}?token=${hashedToken}</br>

      </p>`,
    };

    const sendmailData = await transporter.sendMail(mailOptions);
    return sendmailData;
  } catch (er: unknown) {
    if (er instanceof Error) {
      console.log(er.message);
    } else {
      console.log('Something unknow happened...');
    }
  }
}

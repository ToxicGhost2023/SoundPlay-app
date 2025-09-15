import { UserModel } from "@/models/User";
import { hashPassword } from "@/utils/authHash";
import connectDB from "@/utils/connectDB";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password, userName } = await req.json();
    if (!email || !password || !userName) {
      return NextResponse.json(
        { error: "The wrong email or password is" },
        { status: 422 }
      );
    }
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { error: "This account has already been created" },
        { status: 422 }
      );
    }
    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      email: email,
      userName: userName,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Create Acount SuccessFully " },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      {
        status: 500,
      }
    );
  }
}
export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "DB connect" });
  } catch (error) {}
}

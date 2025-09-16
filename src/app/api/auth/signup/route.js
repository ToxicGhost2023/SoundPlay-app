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
        { error: "Email, username and password are required" },
        { status: 422 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
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
    await UserModel.create({
      email,
      userName,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "DB connect" });
  } catch (error) {}
}

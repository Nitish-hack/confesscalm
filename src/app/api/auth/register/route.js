import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password } = await request.json();
    
  try {
   
  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name:name,
    email:email,
    password: hashedPassword,
  });

    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
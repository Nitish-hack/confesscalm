import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Confession from "@/models/Confession";

export const GET = async (request) => {

  try {
    await connect();

    const confessions = await Confession.find();

    return new NextResponse(JSON.stringify(confessions), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const { title, content, name } = await request.json();
  try {
    await connect();
    
   
    const newConfession = new Confession({
     title,name,content
    });
    
    await newConfession.save();

    return new NextResponse("Confession has been created", { status: 201 });
  } catch (err) {
  console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
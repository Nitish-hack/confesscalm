import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Confession from "@/models/Confession";

export const GET = async (request, { params }) => {
  const { name } = params;

  try {
    await connect();

    const confessions = await Confession.find({ name });

    return new NextResponse(JSON.stringify(confessions), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 }); 
  }
};

export const DELETE = async (request, { params }) => {
  const { name } = params;

  try {
    await connect();

    await Confession.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
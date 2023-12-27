import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Confession from "@/models/Confession";

export const POST = async (request, { params }) => {
  const { confessionId } = params;
  const { desc, name } = await request.json();

  try {
    await connect();
    const confession = await Confession.findOne({ _id: confessionId });
    confession.comments.push({ name, desc });
    await confession.save();
    return new NextResponse(JSON.stringify({name,desc}), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};


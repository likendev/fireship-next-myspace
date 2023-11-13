import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  console.log(users);

  return NextResponse.json(users);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const data = await request.json();
  data.age = Number(data.age);

  const user = await prisma.user.update({
    where: {
      email: currentUserEmail
    },
    data,
  })

  return NextResponse.json(user);
}
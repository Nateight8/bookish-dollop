import { NextResponse } from "next/server";
import books from "~/server/db/books";

export async function GET() {
  return NextResponse.json({ books });
}

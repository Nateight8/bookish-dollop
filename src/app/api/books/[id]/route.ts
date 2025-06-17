import { NextResponse } from "next/server";
import books from "~/server/db/books";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_: Request, { params }: RouteParams) {
  const { id } = await params;

  const book = books.find((book) => book.id === id);

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ book });
}

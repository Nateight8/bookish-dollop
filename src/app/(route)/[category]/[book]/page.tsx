import BookClient from "./_components/book-client";

export default async function Page({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const bookId = (await params).book;

  return <BookClient bookid={bookId} />;
}

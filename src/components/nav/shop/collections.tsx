import Image from "next/image";
import Link from "next/link";

const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishDate: "April 10, 1925",
    price: 12.99,
    image: "/covers/1.jpg",
    category: "classics",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishDate: "July 11, 1960",
    price: 10.5,
    image: "/covers/11.jpg",
    category: "classics",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    publishDate: "June 8, 1949",
    price: 9.99,
    image: "/covers/2.jpg",
    category: "dystopian",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publishDate: "January 28, 1813",
    price: 8.75,
    image: "/covers/3.jpg",
    category: "romance",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publishDate: "September 21, 1937",
    price: 11.99,
    image: "/covers/4.jpg",
    category: "fantasy",
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publishDate: "July 16, 1951",
    price: 9.99,
    image: "/covers/5.jpg",
    category: "modern",
  },
  {
    id: "7",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    publishDate: "July 29, 1954",
    price: 14.99,
    image: "/covers/6.jpg",
    category: "fantasy",
  },
  {
    id: "8",
    title: "The Odyssey",
    author: "Homer",
    publishDate: "8th century BC",
    price: 12.99,
    image: "/covers/7.jpg",
    category: "epic",
  },
  {
    id: "9",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    publishDate: "1866",
    price: 10.99,
    image: "/covers/9.jpg",
    category: "classic",
  },
  {
    id: "10",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    publishDate: "1866",
    price: 10.99,
    image: "/covers/9.jpg",
    category: "classic",
  },
];

export default function Collections() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 p-4 md:p-8">
      {books.map((book) => (
        <Link
          href={`/${book.category}/${book.id}`}
          key={book.id}
          className="border  md:aspect-[2/2] aspect-[5/6] flex justify-center items-center bg-muted"
        >
          <div className="w-full flex flex-col items-center">
            <div className="relative w-1/2 aspect-[5/6] mb-4 shadow-md shadow-black transition-all duration-300 ease-in-out hover:cursor-pointer transform hover:-translate-y-2 hover:shadow-xl hover:shadow-black/50 hover:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />
              <Image
                src={book.image}
                alt={`${book.title} cover`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-col items-center py-4 font-montserrat">
              <h3 className="text-sm font-semibold">{book.title}</h3>
              <p className="text-xs text-muted-foreground">
                {book.publishDate} — {book.author}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

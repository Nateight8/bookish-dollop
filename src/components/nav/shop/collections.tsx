"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";

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
    image: "/covers/2.jpg",
    category: "classics",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    publishDate: "June 8, 1949",
    price: 9.99,
    image: "/covers/3.jpg",
    category: "dystopian",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publishDate: "January 28, 1813",
    price: 8.75,
    image: "/covers/4.jpg",
    category: "romance",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publishDate: "September 21, 1937",
    price: 11.99,
    image: "/covers/5.jpg",
    category: "fantasy",
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publishDate: "July 16, 1951",
    price: 9.99,
    image: "/covers/6.jpg",
    category: "modern",
  },
  {
    id: "7",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    publishDate: "July 29, 1954",
    price: 14.99,
    image: "/covers/7.jpg",
    category: "fantasy",
  },
  {
    id: "8",
    title: "The Odyssey",
    author: "Homer",
    publishDate: "8th century BC",
    price: 12.99,
    image: "/covers/8.jpg",
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
    image: "/covers/10.jpg",
    category: "classic",
  },
];

export default function Collections() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 p-4 lg:p-8">
      <AnimatePresence mode="wait">
        {books.map((book) => {
          // Calculate a small delay based on index for a subtle staggered effect

          return (
            <div
              key={book.id}
              // initial={{ opacity: 0, y: 20 }}
              // animate={{
              //   opacity: 1,
              //   y: 0,
              //   transition: {
              //     delay,
              //     duration: 0.4,
              //     ease: [0.16, 1, 0.3, 1],
              //   },
              // }}
              // exit={{
              //   opacity: 0,
              //   y: -20,
              //   transition: {
              //     duration: 0.2,
              //   },
              // }}
              className="border md:aspect-[2/2] aspect-[5/6] flex justify-center items-center bg-muted"
            >
              <Link
                href={`/${book.category}/${book.id}`}
                className="w-full h-full flex flex-col items-center justify-center p-4"
              >
                <motion.div
                  // layoutId={`book-cover-${book.id}`}
                  className="relative w-1/2 aspect-[5/6] mb-4 shadow-md shadow-black hover:cursor-pointer group will-change-transform"
                  // transition={{
                  //   type: "spring",
                  //   stiffness: 250,
                  //   damping: 20,
                  //   mass: 0.8,
                  //   restDelta: 0.0001,
                  //   restSpeed: 0.001,
                  // }}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1)",
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    },
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={book.image}
                    alt={`${book.title} cover`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </motion.div>
                <div className="flex flex-col items-center py-4 font-montserrat">
                  <h3 className="text-sm font-semibold">{book.title}</h3>
                  <p className="text-xs text-muted-foreground text-center">
                    by {book.author} — {book.publishDate}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

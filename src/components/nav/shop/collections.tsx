"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

import { useBooks } from "~/hooks/use-book";
import type { Book } from "~/lib/types";

export default function Collections() {
  const { data: books, isLoading } = useBooks();

  if (isLoading) {
    return <div className="">loading...</div>;
  }

  if (!books) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        NO BOOKS FOUND
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 p-4 lg:p-8">
      <AnimatePresence mode="wait">
        {books?.map((book) => {
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

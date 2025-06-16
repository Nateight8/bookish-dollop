"use client";
import { Book } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Mock book data - replace with your actual data fetching

export default function BookPage({
  params,
}: {
  params: { book: string; category: string };
}) {
  const bookData = {
    id: "1",
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    publishDate: "1958",
    price: 12.99,
    image: `/covers/${params.book}.jpg`,
    category: "classics",
    description:
      "Set in pre-colonial Nigeria, Things Fall Apart tells the story of Okonkwo, a proud and powerful Igbo warrior whose life is disrupted by the arrival of European missionaries and colonial government. The novel explores the clash between traditional African culture and the forces of change, painting a complex portrait of a society in transition. Achebe's masterpiece is a powerful meditation on the consequences of cultural collision and the price of progress.",
  };

  const [, setIsLoaded] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-col lg:flex-row md:p-8 p-0 ">
        {/* left side on desktop, top on mobile */}
        <div className="bg-muted w-full md:flex-1 flex items-center justify-center p-4 md:p-8 will-change-transform">
          <div className="relative w-full max-w-xs aspect-[5/6] will-change-transform">
            <Image
              src={bookData.image}
              alt="Book cover"
              fill
              className="object-contain aspect-[5/6]"
              priority
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 35vw"
            />
          </div>
        </div>
        {/* right side on desktop, bottom on mobile */}
        <div className="w-full py-4 px-4 md:px-0 lg:p-16 flex-1">
          <div className="lg:max-w-2xl lg:mx-auto w-full">
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl">
                {bookData.title}
              </h1>
              <div>
                <p className="text-sm sm:text-base">by {bookData.author}</p>
                <p className="font-medium text-muted-foreground text-sm sm:text-base">
                  — {bookData.publishDate}
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-muted-foreground cursor-help w-fit">
                      <Book className="size-3" />
                      <p className="font-montserrat font-medium text-xs">
                        IN STOCK
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Hardcopy available</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="py-4 sm:py-6 w-full">
              <Button size="lg" className="w-full sm:w-auto sm:min-w-[200px] ">
                ADD TO BAG
              </Button>
            </div>

            <div className="border-y h-12 sm:h-14 w-full flex items-center">
              <p className="text-sm font-medium">Delivery to 28 countries</p>
            </div>

            <div className="py-4 sm:py-6">
              <p className="text-base leading-relaxed text-muted-foreground">
                {bookData.description}
              </p>
            </div>

            <div className="h-12 hidden sm:h-14 border-t border-b border-border/50 items-center overflow-x-auto hide-scrollbar -mx-4 px-4">
              <div className="flex space-x-4 sm:space-x-6 min-w-max">
                <button className="text-sm font-medium font-montserrat whitespace-nowrap">
                  Details
                </button>
                <button className="text-sm font-medium font-montserrat whitespace-nowrap">
                  Reviews
                </button>
                <button className="text-xs sm:text-sm font-medium font-montserrat whitespace-nowrap">
                  About the Author
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

{
  /* <div className="space-y-2">
              <p className="text-sm sm:text-base font-medium text-muted-foreground">
                Book Details
              </p>
              <div className="space-y-1">
                <p className="text-sm sm:text-base text-muted-foreground">
                  <span className="font-medium">Format:</span> {mockBook.aboutBook.details.format}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  <span className="font-medium">Pages:</span> {mockBook.aboutBook.details.pages}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  <span className="font-medium">Publisher:</span> {mockBook.aboutBook.details.publisher}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  <span className="font-medium">Language:</span> {mockBook.aboutBook.details.language}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  <span className="font-medium">ISBN:</span> {mockBook.aboutBook.details.isbn}
                </p>
              </div>
            </div> */
}

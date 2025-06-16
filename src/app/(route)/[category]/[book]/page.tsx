import { Book } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function BookPage() {
  return (
    <div className="flex flex-col lg:flex-row md:p-8 p-0">
      {/* left side on desktop, top on mobile */}
      <div className="bg-muted w-full md:flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full max-w-xs aspect-[5/6]">
          <Image
            src="/covers/14.jpg"
            alt="Book cover"
            fill
            className="object-contain aspect-[5/6]"
            priority
          />
        </div>
      </div>
      {/* right side on desktop, bottom on mobile */}
      <div className=" w-full py-4 px-4 md:px-0 lg:p-16 flex-1">
        <div className="lg:max-w-2xl lg:mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h3 className=" font-medium text-xl sm:text-2xl">
              Things Fall Apart
            </h3>
            <div>
              <p className="text-sm sm:text-base">by Chinua Achebe</p>
              <p className=" font-medium text-muted-foreground text-sm sm:text-base">
                — 1958
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
              Set in pre-colonial Nigeria,{" "}
              <span className="text-foreground">Things Fall Apart</span> tells
              the story of Okonkwo, a proud and powerful Igbo warrior whose life
              is disrupted by the arrival of European missionaries and colonial
              government. The novel explores the clash between traditional
              African culture and the forces of change, painting a complex
              portrait of a society in transition. Achebe&apos;s masterpiece is
              a powerful meditation on the consequences of cultural collision
              and the price of progress.
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

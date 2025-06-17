import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { CartAction } from "./cart-action";
import { useRouter } from "next/navigation";
import { useCart } from "~/hooks/use-book";
import type { CartItem } from "~/lib/types";
import { useMemo } from "react";

interface CartItemsProps {
  onViewBag?: () => void;
}

export default function CartItems({
  onViewBag,
}: CartItemsProps) {
  const { data: cart } = useCart();
  const router = useRouter();

  const items = useMemo(() => {
    if (!cart?.items) return [];
    
    return cart.items.map(item => ({
      id: item.id || item.bookId || '',
      bookId: item.bookId || item.id || '',
      title: item.title || 'Untitled Book',
      author: item.author || 'Unknown Author',
      image: item.image || '/placeholder-book.jpg',
      price: item.price || 0,
      quantity: item.quantity || 1,
      publishDate: item.publishDate,
      category: item.category,
      description: item.description,
    } as CartItem));
  }, [cart?.items]);

  const handleViewBag = () => {
    onViewBag?.();
    router.push("/bag");
  };

  // Helper function to safely get the image URL
  const getImageUrl = (item: CartItem): string => {
    if (item.image && typeof item.image === "string") return item.image;
    if ("cover" in item && typeof item.cover === "string") return item.cover;
    return "/placeholder-book.jpg";
  };

  // Helper function to safely get the title
  const getTitle = (item: CartItem): string => {
    if (item.title && typeof item.title === "string") return item.title;
    if ("bookName" in item && typeof item.bookName === "string")
      return item.bookName;
    return "Untitled Book";
  };

  // Helper function to safely get the author
  const getAuthor = (item: CartItem): string => {
    if (item.author && typeof item.author === "string") return item.author;
    return "Unknown Author";
  };

  // Helper function to safely get the price
  const getPrice = (item: CartItem): string => {
    if (item.price) {
      if (typeof item.price === "string") return item.price;
      return `$${item.price.toFixed(2)}`;
    }
    return "$0.00";
  };

  return (
    <>
      {items.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground">
          Your bag is empty
        </div>
      ) : (
        <ScrollArea className=" h-96 px-4 ">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-4 first:mt-4 first:pt-0 border-b last:border-b-0"
            >
              <div className="grid grid-cols-5  h-40">
                <div className=" col-span-2 bg-muted/50 border flex items-center justify-center">
                  <div className="border bg-muted-foreground w-2/3 aspect-[5/6] relative">
                    <img
                      src={getImageUrl(item)}
                      alt={getTitle(item)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-4 col-span-3 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-medium leading-tight mb-1 truncate"
                      title={getTitle(item)}
                    >
                      {getTitle(item)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getAuthor(item)}
                      {item.publishDate && (
                        <>
                          {" · "}
                          {new Date(item.publishDate).getFullYear()}
                        </>
                      )}
                    </p>
                    <p className="font-medium text-foreground">
                      {getPrice(item)}
                    </p>
                  </div>
                  <CartAction item={item} />
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      )}
      <div className="p-4 border-t">
        <Button className="w-full" onClick={handleViewBag}>
          VIEW YOUR BAG
        </Button>
      </div>
    </>
  );
}

import { Delete, DeleteIcon, MinusIcon, PlusIcon, X } from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { CartAction } from "./cart-action";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  bookName: string;
  author: string;
  cover: string;
  issueDate?: string;
  price?: string;
  quantity?: number;
}

interface CartItemsProps {
  cartItems: CartItem[];
  onViewBag?: () => void;
}

export default function CartItems({
  cartItems: initialCartItems,
  onViewBag,
}: CartItemsProps) {
  const [items, setItems] = useState<CartItem[]>(
    initialCartItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }))
  );

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Don't allow quantities less than 1
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const router = useRouter();

  const handleViewBag = () => {
    router.push("/bag");
    onViewBag?.();
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
                    <Image
                      src={item.cover}
                      className="object-cover"
                      alt={item.bookName}
                      fill
                    />
                  </div>
                </div>
                <div className="p-4 col-span-3 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-medium leading-tight mb-1 truncate"
                      title={item.bookName}
                    >
                      {item.bookName}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {item.author} ·{" "}
                      {item.issueDate
                        ? new Date(item.issueDate).getFullYear()
                        : ""}
                    </p>
                    <p className="font-medium text-foreground">{item.price}</p>
                  </div>
                  <CartAction
                    item={item}
                    removeItem={removeItem}
                    updateQuantity={updateQuantity}
                  />
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

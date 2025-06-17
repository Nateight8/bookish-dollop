"use client";
import React from "react";
import Image from "next/image";
import { CartAction } from "~/components/nav/shop/cart-action";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useCart } from "~/hooks/use-book";
import type { CartItem } from "~/lib/types";

export default function Page() {
  const { data: cart } = useCart();
  // Transform cart items to match the expected CartItem structure
  const cartItems = React.useMemo(() => {
    if (!cart?.items) return [];
    
    return cart.items.map(item => {
      // For cart operations, we need to use the bookId as the item ID
      // since that's what the backend API expects
      const itemId = item.id || item.bookId || '';
      
      return {
        id: itemId, // Use the bookId as the item ID for cart operations
        bookId: item.bookId || item.id || '',
        title: item.title || 'Untitled Book',
        author: item.author || 'Unknown Author',
        image: item.image || '/placeholder-book.jpg',
        price: item.price || 0,
        quantity: item.quantity || 1,
        publishDate: item.publishDate,
        category: item.category,
        description: item.description,
      } as CartItem;
    });
  }, [cart?.items]);

  return (
    <div className="grid md:grid-cols-5 divide-x h-full">
      <div className="md:col-span-3 w-full">
        <div className="p-4 lg:pl-8 ">
          <h3 className="text-lg font-medium">
            Bag ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
          </h3>
        </div>
        {cartItems.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Your bag is empty
          </div>
        ) : (
          <>
            <div className="divide-y  lg:hidden">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <ScrollArea className="hidden pl-8 lg:block h-[70svh] ">
              <div className="divide-y ">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
      <div className="md:col-span-2 divide-y p-4 md:p-0 mb-4 md:pr-8">
        {/* subtotal */}
        <div className="h-14 md:px-4 flex items-center text-sm justify-between text-muted-foreground">
          <h3 className="">Subtotal</h3>
          <p className="">${cart?.total || 0}</p>
        </div>
        {/* Estimated delivery */}
        <div className="py-4 md:px-4 space-y-4">
          <div className=" flex items-center text-sm justify-between text-muted-foreground">
            <h3 className="">Estimated delivery</h3>
            <p className="">$7.99</p>
          </div>
          <div className=" flex items-center text-sm justify-between text-muted-foreground">
            <h3 className="">VAT(incl.)</h3>
            <p className="">$0.99</p>
          </div>
        </div>
        {/* total */}
        <div className="h-14 md:px-4 flex items-center text-sm justify-between text-muted-foreground">
          <h3 className="">Total</h3>
          <p className="">${cart?.total || 0}</p>
        </div>
        {/* action */}
        <div className="py-4 grid md:px-4 lg:grid-cols-2 gap-4">
          <Button size="lg" variant="outline">
            Continue shopping
          </Button>
          <Button size="lg">CHECKOUT</Button>
        </div>
      </div>
    </div>
  );
}



function CartItem({ item }: { item: CartItem }) {
  // Safely handle price whether it's a string or number
  const price =
    typeof item.price === "string"
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, "") || "0")
      : typeof item.price === "number"
      ? item.price
      : 0;

  console.log("ITEMS:", item.quantity);

  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 py-4 ">
      <div className="bg-muted/50 border flex items-center justify-center">
        <div className="border bg-muted-foreground w-2/3 aspect-[5/6] relative">
          <Image
            src={item.image}
            className="object-cover"
            alt={item.title}
            fill
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <h3 className="font-medium leading-tight mb-1" title={item.title}>
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-3">
            {item.author} ·{" "}
            {item.publishDate ? new Date(item.publishDate).getFullYear() : ""}
          </p>
          <p className="font-medium text-foreground">
            {/* ${(price * quantity).toFixed(2)} */}
          </p>
        </div>
        <div className="pl-4">
          <CartAction item={item} />
        </div>
      </div>
    </div>
  );
}

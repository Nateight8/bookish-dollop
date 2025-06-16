"use client";
import React from "react";
import Image from "next/image";
import { CartAction } from "~/components/nav/shop/cart-action";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

interface CartItem {
  id: string;
  bookName: string;
  author: string;
  cover: string;
  issueDate?: string;
  price?: string;
  quantity?: number;
  genre?: string;
}

const mockBooks = [
  {
    id: "1",
    bookName: "The Midnight Library",
    author: "Matt Haig",
    cover: "/covers/1.jpg",
    issueDate: "2020",
    price: "$14.99",
    quantity: 1,
    genre: "Fiction",
  },
  {
    id: "2",
    bookName: "Atomic Habits",
    author: "James Clear",
    cover: "/covers/5.jpg",
    issueDate: "2018",
    price: "$16.99",
    quantity: 2,
    genre: "Self-Help",
  },
  {
    id: "3",
    bookName: "Dune",
    author: "Frank Herbert",
    cover: "/covers/2.jpg",
    issueDate: "1965",
    price: "$9.99",
    quantity: 1,
    genre: "Science Fiction",
  },
  {
    id: "4",
    bookName: "Becoming",
    author: "Michelle Obama",
    cover: "/covers/3.jpg",
    issueDate: "2018",
    price: "$18.99",
    quantity: 1,
    genre: "Memoir",
  },
  {
    id: "5",
    bookName: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/covers/6.jpg",
    issueDate: "2021",
    price: "$15.99",
    quantity: 1,
    genre: "Science Fiction",
  },
  {
    id: "6",
    bookName: "The Song of Achilles",
    author: "Madeline Miller",
    cover: "/covers/4.jpg",
    issueDate: "2011",
    price: "$12.99",
    quantity: 1,
    genre: "Historical Fiction",
  },
];

export default function Page() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>(mockBooks);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total items in cart
  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  // Calculate subtotal
  const subtotal = cartItems
    .reduce(
      (sum, item) =>
        sum +
        parseFloat(item.price?.replace("$", "") || "0") * (item.quantity || 1),
      0
    )
    .toFixed(2);

  return (
    <div className="grid md:grid-cols-5 divide-x h-full">
      <div className="md:col-span-3 w-full">
        <div className="p-4 lg:pl-8 ">
          <h3 className="text-lg font-medium">
            Bag ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h3>
        </div>
        {cartItems.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Your bag is empty
          </div>
        ) : (
          <>
            <div className="divide-y  lg:hidden">
              {cartItems.map((book) => (
                <CartItem
                  key={book.id}
                  item={book}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
            <ScrollArea className="hidden pl-8 lg:block h-[70svh] ">
              <div className="divide-y ">
                {cartItems.map((book) => (
                  <CartItem
                    key={book.id}
                    item={book}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
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
          <p className="">${subtotal}</p>
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
          <p className="">$39.99</p>
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

function CartItem({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}) {
  return (
    <div className="p-4 flex ">
      <div className="bg-muted p-4 border">
        <div className="relative aspect-[5/6] w-24">
          <Image
            src={item.cover}
            alt="Book cover"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
        <div className="">
          <h3 className=" text-base sm:text-lg">{item.bookName}</h3>
          <div>
            <p className="text-xs sm:text-sm">by {item.author}</p>
            <p className=" font-medium text-muted-foreground text-xs sm:text-sm">
              — {item.issueDate}
            </p>
          </div>
        </div>
        <CartAction
          item={item}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Image from "next/image";
import { CartAction } from "~/components/nav/shop/cart-action";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useCart } from "~/hooks/use-book";

import type { Book } from '~/lib/types';

interface CartItem extends Omit<Book, 'price'> {
  quantity?: number;
  price: string | number; // Allow both string and number for price
}

const mockBooks: CartItem[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    image: "/covers/5.jpg",
    publishDate: "2020-08-13",
    price: 17.99,
    category: "Fiction",
    description: "A novel about all the choices that go into a life well lived.",
    quantity: 1,
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    image: "/covers/2.jpg",
    publishDate: "2021-05-04",
    price: 12.99,
    category: "Science Fiction",
    description: "An astronaut must save the earth from disaster.",
    quantity: 1,
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    image: "/covers/3.jpg",
    publishDate: "1965-08-01",
    price: 18.99,
    category: "Science Fiction",
    description: "A story of politics, religion, and power set in a distant future.",
    quantity: 1,
  },
  {
    id: "4",
    title: "Becoming",
    author: "Michelle Obama",
    image: "/covers/3.jpg",
    publishDate: "2018-11-13",
    price: 18.99,
    category: "Memoir",
    description: "A memoir about the former First Lady's life.",
    quantity: 1,
  },
  {
    id: "5",
    title: "Project Hail Mary",
    author: "Andy Weir",
    image: "/covers/6.jpg",
    publishDate: "2021-05-04",
    price: 15.99,
    category: "Science Fiction",
    description: "An astronaut must save the earth from disaster.",
    quantity: 1,
  },
  {
    id: "6",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    image: "/covers/4.jpg",
    publishDate: "2011-09-20",
    price: 12.99,
    category: "Historical Fiction",
    description: "A novel about the Trojan War.",
    quantity: 1,
  },
];

export default function Page() {
  const { data: cart } = useCart();
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
    .reduce((sum, item) => {
      const price = typeof item.price === 'string'
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0
        : typeof item.price === 'number' 
          ? item.price 
          : 0;
      return sum + (price * (item.quantity || 1));
    }, 0)
    .toFixed(2);

  return (
    <div className="grid md:grid-cols-5 divide-x h-full">
      <div className="md:col-span-3 w-full">
        <div className="p-4 lg:pl-8 ">
          <h3 className="text-lg font-medium">
            Bag ({cart?.count || 0} {cart?.count === 1 ? "item" : "items"})
          </h3>
        </div>
        {cartItems.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Your bag is empty
          </div>
        ) : (
          <>
            <div className="divide-y  lg:hidden">
              {cart?.items.map((book) => (
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
                {cart?.items.map((book) => (
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

function CartItem({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}) {
  // Safely handle price whether it's a string or number
  const price = typeof item.price === 'string' 
    ? parseFloat(item.price.replace(/[^0-9.-]+/g, '') || '0')
    : typeof item.price === 'number' 
      ? item.price 
      : 0;
  const [quantity, setQuantity] = React.useState(item.quantity || 1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 py-4">
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
            {item.author} · {item.publishDate ? new Date(item.publishDate).getFullYear() : ''}
          </p>
          <p className="font-medium text-foreground">
            ${(price * quantity).toFixed(2)}
          </p>
        </div>
        <CartAction
          item={item}
          updateQuantity={(id, qty) => handleQuantityChange(qty)}
          removeItem={() => removeItem(item.id)}
        />
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Image from "next/image";
import { CartAction } from "~/components/nav/shop/cart-action";

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
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculate total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price?.replace('$', '') || '0') * (item.quantity || 1)),
    0
  ).toFixed(2);

  return (
    <div className="flex flex-col lg:flex-row divide-x min-h-screen">
      <div className="flex-1 border-r w-full">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Bag ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h3>
        </div>
        {cartItems.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Your bag is empty
          </div>
        ) : (
          <div className="divide-y">
            {cartItems.map((book) => (
              <CartItem 
                key={book.id} 
                item={book} 
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>
        )}
      </div>
      <div className="lg:w-80 p-6 border-t lg:border-t-0 lg:border-l">
        <div className="sticky top-6">
          <h3 className="text-lg font-medium mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${subtotal}</span>
            </div>
            <button 
              className="w-full bg-foreground text-background py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem({ 
  item, 
  updateQuantity,
  removeItem 
}: { 
  item: CartItem,
  updateQuantity: (id: string, quantity: number) => void,
  removeItem: (id: string) => void 
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
      <div className="flex-1 p-4">
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

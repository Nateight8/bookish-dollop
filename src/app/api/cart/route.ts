import { NextResponse } from "next/server";

import type {
  CartItem,
  Cart,
  AddToCartRequest,
  ApiResponse,
} from "~/lib/types";
import books from "~/server/db/books";

// In-memory cart storage
let cartItems: CartItem[] = [];

export async function GET(): Promise<NextResponse<ApiResponse<Cart>>> {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cart: Cart = {
    items: cartItems,
    total: parseFloat(total.toFixed(2)),
    count: cartItems.reduce((sum, item) => sum + item.quantity, 0),
  };

  return NextResponse.json({ data: cart });
}

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse<CartItem[]>>> {
  try {
    const body: AddToCartRequest = await request.json();
    const { bookId, quantity = 1 } = body;

    // Find the book
    const book = books.find((b) => b.id === bookId);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Check if item already exists in cart
    const existingItem = cartItems.find((item) => item.bookId === bookId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        bookId,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
        quantity,
      };
      cartItems.push(newItem);
    }

    return NextResponse.json({
      message: "Item added to cart",
      data: cartItems,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

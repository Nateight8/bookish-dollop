import { NextResponse } from "next/server";
import type { AddToCartRequest, UpdateCartRequest, ApiResponse, Cart, CartItem } from "~/lib/types";
import books from "~/server/db/books";
import { cartDb } from "~/server/db/cart";

export async function GET(): Promise<NextResponse<ApiResponse<Cart>>> {
  try {
    const cart = cartDb.getCart();
    return NextResponse.json({ data: cart });
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json(
      { error: "Failed to get cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse<Cart>>> {
  try {
    const body: AddToCartRequest = await request.json();
    const { bookId, quantity = 1 } = body;

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Find the book
    const book = books.find((b) => b.id === bookId);
    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    // Add item to cart
    const cart = cartDb.updateCartItem(
      bookId,
      quantity,
      {
        id: bookId,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
        description: book.description,
        category: book.category,
        publishDate: book.publishDate,
      }
    );

    return NextResponse.json({ data: cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request): Promise<NextResponse<ApiResponse<Cart>>> {
  try {
    const body: UpdateCartRequest = await request.json();
    const { bookId, quantity } = body;

    if (!bookId || typeof quantity === 'undefined') {
      return NextResponse.json(
        { error: "Book ID and quantity are required" },
        { status: 400 }
      );
    }

    // Get the current cart to find the existing item
    const currentCart = cartDb.getCart();
    const existingItem = currentCart.items.find(item => item.bookId === bookId);

    if (!existingItem) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    // Calculate the delta to add to the current quantity
    const delta = quantity - (existingItem.quantity || 1);
    
    // Update the item in the cart
    const cart = cartDb.updateCartItem(
      bookId,
      delta,
      {
        id: existingItem.id,
        title: existingItem.title,
        author: existingItem.author,
        price: existingItem.price,
        image: existingItem.image,
        description: existingItem.description,
        category: existingItem.category,
        publishDate: existingItem.publishDate,
      }
    );

    return NextResponse.json({ data: cart });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request): Promise<NextResponse<ApiResponse<Cart>>> {
  try {
    const { bookId } = await request.json();
    
    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Check if item exists
    const cart = cartDb.getCart();
    const existingItem = cart.items.find(item => item.bookId === bookId);

    if (!existingItem) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    // Remove the item from the cart
    const updatedCart = cartDb.removeCartItem(bookId);
    return NextResponse.json({ data: updatedCart });
  } catch (error) {
    console.error("Error removing cart item:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}

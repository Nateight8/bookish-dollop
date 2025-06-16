import { NextResponse } from "next/server";
import type { CartItem, UpdateCartRequest, ApiResponse } from "~/lib/types";

// Same cart storage
let cartItems: CartItem[] = [];

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<CartItem[]>>> {
  try {
    const { id: bookId } = params;
    const body: UpdateCartRequest = await request.json();

    // Validate request body
    if (typeof body.quantity === "undefined") {
      return NextResponse.json(
        { error: "Quantity is required" },
        { status: 400 }
      );
    }

    const { quantity } = body;
    const itemIndex = cartItems.findIndex((item) => item.bookId === bookId);

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    // Get the current item safely
    const currentItem = cartItems[itemIndex];
    if (!currentItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    // Update cart immutably
    cartItems = cartItems.map((item, idx) =>
      idx === itemIndex ? { ...item, quantity } : item
    );

    return NextResponse.json({
      message: "Cart updated",
      data: cartItems,
    });
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<CartItem[]>>> {
  const { id: bookId } = params;

  const itemIndex = cartItems.findIndex((item) => item.bookId === bookId);

  if (itemIndex === -1) {
    return NextResponse.json(
      { error: "Item not found in cart" },
      { status: 404 }
    );
  }

  cartItems.splice(itemIndex, 1);

  return NextResponse.json({
    message: "Item removed from cart",
    data: cartItems,
  });
}

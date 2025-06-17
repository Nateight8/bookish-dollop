import { IconTrash } from "@tabler/icons-react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useUpdateCart, useRemoveFromCart } from "~/hooks/use-book";
import type { CartItem } from "~/lib/types";

export function CartAction({ item }: { item: CartItem }) {
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: removeCart } = useRemoveFromCart();

  // Ensure quantity has a default value
  const currentQuantity = item.quantity ?? 1;

  console.log("ITEMS from cart action currentQuantity:", currentQuantity);

  const updateQuantity = (delta: number) => {
    const newQuantity = currentQuantity + delta;

    // Prevent quantity from going below 1
    if (newQuantity < 1) return;

    // Ensure we have a valid book ID
    const bookId = item.bookId;
    if (!bookId) {
      console.error("Cannot update cart item: No book ID found", item);
      return;
    }

    console.log("Updating cart item:", {
      bookId,
      currentQuantity,
      newQuantity,
      delta,
      item: JSON.stringify(item, null, 2),
    });

    updateCart(
      { id: item.id, bookId, quantity: newQuantity },
      {
        onError: (error) => {
          console.error("Error updating cart item:", error);
        },
      }
    );
  };

  const removeItem = () => {
    // Ensure we have a valid book ID
    const bookId = item.bookId;
    if (!bookId) {
      console.error("Cannot remove cart item: No book ID found", item);
      return;
    }

    console.log("Removing cart item:", {
      bookId,
      item: JSON.stringify(item, null, 2),
    });

    removeCart(bookId, {
      onError: (error) => {
        console.error("Error removing cart item:", error);
      },
    });
  };

  return (
    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center overflow-hidden">
        <button
          onClick={() => updateQuantity(-1)}
          disabled={currentQuantity <= 1} // Disable when quantity is 1
          className="p-1 hover:cursor-pointer rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <MinusIcon className="size-3" />
        </button>
        <span className="w-8 text-center text-sm font-medium">
          {currentQuantity}
        </span>
        <button
          onClick={() => updateQuantity(1)}
          className="p-1 hover:cursor-pointer rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Increase quantity"
        >
          <PlusIcon className="size-3" />
        </button>
      </div>
      <button
        onClick={removeItem}
        className="p-1 hover:cursor-pointer rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        aria-label="Remove item"
      >
        <IconTrash className="size-4" />
      </button>
    </div>
  );
}

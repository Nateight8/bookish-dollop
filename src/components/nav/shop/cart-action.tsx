import { IconTrash } from "@tabler/icons-react";
import { MinusIcon, PlusIcon } from "lucide-react";
import type { Book } from "~/lib/types";

interface CartItem extends Omit<Book, 'price'> {
  quantity?: number;
  price: string | number;
}

export function CartAction({
  updateQuantity,
  removeItem,
  item,
}: {
  item: CartItem;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
}) {
  return (
    <>
      {" "}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center  overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
            className="p-1 hover:cursor-pointer rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Decrease quantity"
          >
            <MinusIcon className="size-3" />
          </button>
          <span className="w-8 text-center text-sm font-medium">
            {item.quantity || 1}
          </span>
          <button
            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
            className="p-1 hover:cursor-pointer rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Increase quantity"
          >
            <PlusIcon className="size-3" />
          </button>
        </div>
        <button
          onClick={() => removeItem(item.id)}
          className="p-1 hover:cursor-pointer rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Remove item"
        >
          <IconTrash className="size-4" />
        </button>
      </div>
    </>
  );
}

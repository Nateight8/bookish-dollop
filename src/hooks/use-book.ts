import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/axios-instance";
import { booksApi, cartApi } from "~/server/services/books";
import type { AddToCartRequest, Cart, CartItem, Book } from "~/lib/types";

// Books queries
export const useBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async (): Promise<Book[]> => {
      const response = await api.get("/books");
      return response.data.books;
    },
  });
};

export const useBook = (id: string) => {
  return useQuery({
    queryKey: ["books", id],
    queryFn: () => booksApi.getById(id).then((res) => res.data.book),
    enabled: !!id,
  });
};

// Cart queries
export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await cartApi.get();
      console.log("Cart API response:", response.data);
      return response.data.data;
    },
  });
};

// Cart mutations
type CartResponse = {
  data: Cart;
  message?: string;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CartResponse, Error, AddToCartRequest>({
    mutationFn: async (data: AddToCartRequest) => {
      // Get current cart data
      const response = await cartApi.get();
      const currentCart = response.data.data; // Access the nested data property

      // Check if book is already in cart
      const existingItem = currentCart.items.find(
        (item: CartItem) => item.bookId === data.bookId
      );

      if (existingItem) {
        // Get book details to include in the message
        const bookResponse = await booksApi.getById(data.bookId);
        const bookName = bookResponse.data.book?.title || 'This book';
        
        // If already in cart, return early with a message
        return {
          data: currentCart,
          message: `${bookName} is already in your cart`,
        } as CartResponse;
      }

      // If not in cart, proceed with adding it
      const [addResponse, bookResponse] = await Promise.all([
        cartApi.add(data),
        booksApi.getById(data.bookId)
      ]);
      
      const bookName = bookResponse.data.book?.title || 'The book';
      return {
        ...addResponse.data,
        message: `${bookName} has been added to your cart`
      };
    },
    onSuccess: (data: CartResponse) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      // Show toast notification if the book was already in cart
      if (data.message) {
        // You can use your preferred toast/notification system here
        console.log(data.message);
      }
    },
    onError: (error: Error) => {
      console.error("Failed to add to cart:", error);
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      bookId,
      quantity,
    }: {
      id?: string;
      bookId: string;
      quantity: number;
    }) => cartApi.update(bookId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Failed to update cart:", error);
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => cartApi.remove(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

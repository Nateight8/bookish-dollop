import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/axios-instance";
import type { AddToCartRequest, Book } from "~/lib/types";
import { booksApi, cartApi } from "~/server/services/books";

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
      console.log('Cart API response:', response.data);
      return response.data.data;
    },
  });
};

// Cart mutations
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddToCartRequest) => cartApi.add(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Failed to add to cart:", error);
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, bookId, quantity }: { id?: string; bookId: string; quantity: number }) =>
      cartApi.update(bookId, quantity),
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

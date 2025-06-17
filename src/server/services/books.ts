import { api } from "~/lib/axios-instance";
import type { AddToCartRequest, Book, Cart } from "~/lib/types";

// Books API
export const booksApi = {
  getAll: () => api.get<{ books: Book[] }>("/books"),
  getById: (id: string) => api.get<{ book: Book }>(`/books/${id}`),
};

// Cart API
export const cartApi = {
  get: () => api.get<{ data: Cart }>("/cart"),
  add: (data: AddToCartRequest) => api.post<{ data: Cart }>("/cart", data),
  update: (bookId: string, quantity: number) =>
    api.put<{ data: Cart }>("/cart", { bookId, quantity }),
  remove: (bookId: string) => 
    api.delete<{ data: Cart }>("/cart", { data: { bookId } }),
};

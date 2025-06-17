export interface Book {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem {
  id: string; // Cart item ID
  bookId: string; // Reference to the book
  title: string;
  author: string;
  image: string;
  price: number | string;
  quantity: number;
  publishDate?: string;
  category?: string;
  description?: string;
  // Add any other book properties that might be needed
}

export interface Cart {
  items: CartItem[];
  total: number;
  count: number;
}

export interface AddToCartRequest {
  bookId: string;
  quantity?: number;
}

export interface UpdateCartRequest {
  bookId: string;
  quantity: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

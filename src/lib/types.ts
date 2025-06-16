export interface Book {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  price: number;
  image: string;
  category: string;
  description: string;
  quantity?: number;
}

export interface Cart {
  items: Book[];
  total: number;
  count: number;
}

export interface AddToCartRequest {
  bookId: string;
  quantity?: number;
}

export interface UpdateCartRequest {
  quantity: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

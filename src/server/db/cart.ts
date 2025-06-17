import type { CartItem, Cart } from "~/lib/types";

// Simple in-memory storage for development
// In production, replace this with a real database
let cartItems: CartItem[] = [];

// Helper function to ensure we have a valid price number
const parsePrice = (price: string | number | undefined): number => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') return parseFloat(price) || 0;
  return 0;
};

// Helper function to calculate cart total
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    const price = parsePrice(item.price);
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);
};

export const cartDb = {
  // Get all cart items
  getCart: () => {
    const items = [...cartItems];
    const total = parseFloat(calculateCartTotal(items).toFixed(2));
    const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    return { items, total, count };
  },

  // Add or update item in cart
  updateCartItem: (bookId: string, quantity: number, itemData: Omit<CartItem, 'bookId' | 'quantity'>): Cart => {
    const existingItemIndex = cartItems.findIndex(item => item.bookId === bookId);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const existingItem = cartItems[existingItemIndex];
      if (existingItem) {
        cartItems[existingItemIndex] = {
          ...existingItem,
          ...itemData,
          bookId, // Ensure bookId is set
          id: existingItem.id || bookId, // Ensure id is set
          quantity: (existingItem.quantity || 1) + quantity,
        };
      }
    } else {
      // Add new item
      const newItem: CartItem = {
        id: bookId, // Use bookId as the default id
        bookId,
        quantity: quantity || 1,
        title: itemData.title || 'Untitled Book',
        author: itemData.author || 'Unknown Author',
        price: parsePrice(itemData.price),
        image: itemData.image || '/placeholder-book.jpg',
        description: itemData.description || '',
        category: itemData.category || '',
        publishDate: itemData.publishDate || '',
      };
      cartItems.push(newItem);
    }

    return cartDb.getCart();
  },

  // Remove item from cart
  removeCartItem: (bookId: string): Cart => {
    cartItems = cartItems.filter(item => item.bookId !== bookId);
    return cartDb.getCart();
  },

  // Clear all items from cart (for testing)
  clearCart: (): Cart => {
    cartItems = [];
    return cartDb.getCart();
  }
};

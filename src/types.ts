export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  rating: number;
  coverImage?: string; // fallback or custom URL
  coverBg: string; // custom book card background theme (modern grad or solid color)
  coverPatternColor: string; // accent colored detailing
  description: string;
  synopsis: string;
  pages: number;
  publishedYear: number;
  language: string;
  stock: number;
  isBestseller?: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface CustomBookCover {
  title: string;
  author: string;
  genre: string;
  bgColor: string;
  textColor: string;
  sticker: 'star' | 'heart' | 'sparkle' | 'book' | 'globe' | 'compass';
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  shipping: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
  date: string;
  estimatedDelivery: string;
}

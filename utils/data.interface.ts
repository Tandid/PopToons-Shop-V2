export interface Product {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// export interface Shipping extends Product {
//   address: string;
// }

export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

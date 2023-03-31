import { CartItem } from "./data.interface";

export interface State {
  cart: {
    cartItems: CartItem[];
    // shippingAddress: Shipping;
  };
}

export interface Action {
  type: string;
  payload?: any;
}

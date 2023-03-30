import { CartItem } from "./data.interface";

export interface State {
  cart: {
    cartItems: CartItem[];
  };
}

export interface Action {
  type: string;
  payload?: any;
}

import { createContext, useReducer } from "react";

export const Store = createContext();

//? By default, there are no items in the cart
const initialState = {
  cart: { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      //? Add new item to the cart
      const newItem = action.payload;

      //? Check if item exists in the cart
      const existItem = state.cart.cartItems.find(
        (item) => item.slug == newItem.slug
      );

      //? If item exists, increase quantity in cart, else add new item to cart
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}

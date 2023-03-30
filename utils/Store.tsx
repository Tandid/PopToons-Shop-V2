import { createContext, useReducer } from "react";

export const Store = createContext();

//? By default, there are no items in the cart
const initialState = {
  cart: { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    //? Add new item to the cart
    //? If the item already exists in the cart, increase the quantity only
    //? Else update cart by adding the new item

    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug == newItem.slug
      );
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

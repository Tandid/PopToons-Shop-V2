import { createContext, useReducer } from "react";
import { Product } from "./data.interface"; //TS
import { State, Action } from "./state.interface"; //TS

//? By default, there are no items in the cart
const initialState = {
  cart: { cartItems: [] },
};

//! Was originally const Store = createContext() until I added TS
export const Store = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: State, action: Action) {
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
    case "CART_REMOVE_ITEM": {
      //? Return all items that do not equal to the slug of the item to be removed
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug != action.payload.slug
      );
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

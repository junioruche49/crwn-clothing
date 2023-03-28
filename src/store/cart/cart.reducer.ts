import { AnyAction } from "redux";
import { CategoryItems } from "../categories/category.types";
import { setCartIsOpen, setCartItems } from "./cart.action";
import { CartItem, CART_TYPES } from "./cart.types";

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export type CartState = {
  isCartOpen: boolean,
  cartItems: CartItem[],
};

export const cartReducer = (state = INITIAL_STATE, action: AnyAction):CartState => {
  if (setCartItems.match(action)) {
    return {
            ...state,
            cartItems: action.payload,
          };
  }
  
  if (setCartIsOpen.match(action)) {
    return {
            ...state,
            isCartOpen: action.payload,
          };
  }
  return state
  // switch (type) {
  //   case CART_TYPES.SET_CART_ITEMS:
  //     return {
  //       ...state,
  //       cartItems: payload,
  //     };
  //   case CART_TYPES.SET_CART_OPEN:
  //     return {
  //       ...state,
  //       isCartOpen: payload,
  //     };

  //   default:
  //     return state;
  // }
};

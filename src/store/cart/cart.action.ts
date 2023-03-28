import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItems } from "../categories/category.types";
import { CartItem, CART_TYPES } from "./cart.types";

const addCartItemCart = (cartItems: CartItem[], productItem: CategoryItems) :CartItem[] => {
  const foundItem = cartItems.find((data) => data.id === productItem.id);

  if (foundItem) {
    return cartItems.map((data) =>
      data.id === foundItem.id ? { ...data, quantity: data.quantity + 1 } : data
    );
  }
  return [...cartItems, { ...productItem, quantity: 1 }];
};

const removeCartItemCart = (cartItems: CartItem[], productItem: CartItem):CartItem[] => {
  const foundItem = cartItems.find((data) => data.id === productItem.id);

  if (foundItem && foundItem.quantity === 1) {
    return cartItems.filter((data) => data.id !== productItem.id);
  }

  return cartItems.map((data) =>
    data.id === productItem.id ? { ...data, quantity: data.quantity - 1 } : data
  );
};
const clearCartItemCart = (cartItems: CartItem[], productItem: CartItem): CartItem[] => {
  return cartItems.filter((data) => data.id !== productItem.id);
};

export type SetCartIsOpen = ActionWithPayload<CART_TYPES.SET_CART_OPEN, boolean>
export type SetAddCartItemS = ActionWithPayload<CART_TYPES.SET_CART_ITEMS, CartItem[]>

export const setCartIsOpen = withMatcher((boolean: boolean): SetCartIsOpen =>
  createAction(CART_TYPES.SET_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]):SetAddCartItemS => createAction(CART_TYPES.SET_CART_ITEMS, cartItems))

export const addCartItemToCart = (cartItems: CartItem[], productToAdd: CategoryItems) => {
  const cartItem = addCartItemCart(cartItems, productToAdd);
  return setCartItems(cartItem)
};

export const removeCartItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
  const cartItem = removeCartItemCart(cartItems, productToRemove);
  return setCartItems(cartItem)
};
export const clearCartItemFromCart = (cartItems: CartItem[], productToClear: CartItem) => {
  const cartItem = clearCartItemCart(cartItems, productToClear);
  return setCartItems(cartItem)
};

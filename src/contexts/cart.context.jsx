import { useReducer } from "react";
import { createContext } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addCartItemToCart: () => {},
  removeCartItemToCart: () => {},
  clearCartItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const addCartItemCart = (cartItems, productItem) => {
  const foundItem = cartItems.find((data) => data.id === productItem.id);

  if (foundItem) {
    return cartItems.map((data) =>
      data.id === foundItem.id ? { ...data, quantity: data.quantity + 1 } : data
    );
  }
  return [...cartItems, { ...productItem, quantity: 1 }];
};

const removeCartItemCart = (cartItems, productItem) => {
  const foundItem = cartItems.find((data) => data.id === productItem.id);

  if (foundItem.quantity === 1) {
    return cartItems.filter((data) => data.id !== productItem.id);
  }

  return cartItems.map((data) =>
    data.id === foundItem.id ? { ...data, quantity: data.quantity - 1 } : data
  );
};
const clearCartItemCart = (cartItems, productItem) => {
  return cartItems.filter((data) => data.id !== productItem.id);
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const defaultTypes = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_OPEN: "SET_CART_OPEN",
};

const updateCartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case defaultTypes.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case defaultTypes.SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error("something went wrong");
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(updateCartReducer, INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const addCartItemToCart = (productItem) => {
    const cartItem = addCartItemCart(cartItems, productItem);
    updateCartItemReducer(cartItem);
  };

  const removeCartItemToCart = (productItem) => {
    const cartItem = removeCartItemCart(cartItems, productItem);
    updateCartItemReducer(cartItem);
  };
  const clearCartItemFromCart = (productItem) => {
    const cartItem = clearCartItemCart(cartItems, productItem);
    updateCartItemReducer(cartItem);
  };

  const updateCartItemReducer = (cartItems) => {
    let cartCount = cartItems.reduce((prev, next) => {
      return prev + next.quantity;
    }, 0);

    let cartTotal = cartItems.reduce((prev, next) => {
      return prev + next.quantity * next.price;
    }, 0);

    dispatch(
      createAction(defaultTypes.SET_CART_ITEMS, {
        cartItems,
        cartCount,
        cartTotal,
      })
    );
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(defaultTypes.SET_CART_OPEN, bool));
  };

  const values = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addCartItemToCart,
    removeCartItemToCart,
    clearCartItemFromCart,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

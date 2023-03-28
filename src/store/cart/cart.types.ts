import { CategoryItems } from "../categories/category.types";

export enum CART_TYPES {
  SET_CART_ITEMS = "SET_CART_ITEMS",
  SET_CART_OPEN = "SET_CART_OPEN",
};

export type CartItem = CategoryItems & {
  quantity: number
}
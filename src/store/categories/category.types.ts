export enum CATEGORY_TYPES {
  CATEGORY_START = "CATEGORY_START",
  CATEGORY_SUCCESS = "CATEGORY_SUCCESS",
  CATEGORY_FAILED = "CATEGORY_FAILED",
};

export type CategoryItems = {
  id: number,
  imageUrl: string,
  name: string,
  price: number
}

export type Category = {
  title: string,
  imageUrl: string,
  items: CategoryItems[]
}

export type CategoryMap = {
  [key: string] : CategoryItems[]
}
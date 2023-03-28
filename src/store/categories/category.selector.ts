import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoryState } from "./category.reducer";
import { CategoryMap } from "./category.types";

export const categorySelectReducer = (state: RootState) :CategoryState => state.category;

export const selectCategories = createSelector(
  [categorySelectReducer],
  (category) => category.categories
);

export const categorySelector = createSelector(
  [selectCategories],
  (categories) :CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectIsLoading = createSelector(
  [categorySelectReducer],
  (categories) => categories.loading
);

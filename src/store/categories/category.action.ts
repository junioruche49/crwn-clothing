import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher
} from "../../utils/reducer/reducer.utils";
import { CATEGORY_TYPES, Category } from "./category.types";

export type FetchCategoriesStart = Action<CATEGORY_TYPES.CATEGORY_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORY_TYPES.CATEGORY_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORY_TYPES.CATEGORY_FAILED, Error>

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed

export const fetchCategoriesStart = withMatcher(():FetchCategoriesStart =>
  createAction(CATEGORY_TYPES.CATEGORY_START));

export const fetchCategoriesSuccess = withMatcher((category: Category[]):FetchCategoriesSuccess  =>
  createAction(CATEGORY_TYPES.CATEGORY_SUCCESS, category));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed =>
  createAction(CATEGORY_TYPES.CATEGORY_FAILED, error));

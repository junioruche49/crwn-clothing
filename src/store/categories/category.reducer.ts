import { CATEGORY_TYPES, Category } from "./category.types";
import { CategoryAction, fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { AnyAction } from "redux";

const INITIAL_STATE: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export type CategoryState = {
  categories: Category[],
  loading: boolean,
  error: Error| null
}

export const categoriesReducer = (state = INITIAL_STATE, action = {} as AnyAction ): CategoryState => {

  if (fetchCategoriesStart.match(action)) {
    return {
            ...state,
            loading: true,
          };
  }
  if (fetchCategoriesSuccess.match(action)) {
    return {
            ...state,
            categories: action.payload,
            loading: false,
          };
  }
  if (fetchCategoriesFailed.match(action)) {
    return {
            ...state,
            error: action.payload,
            loading: false,
          };
  }
  return state
  // switch (action.type) {
  //   case CATEGORY_TYPES.CATEGORY_START:
  //     return {
  //       ...state,
  //       loading: true,
  //     };
  //   case CATEGORY_TYPES.CATEGORY_SUCCESS:
  //     return {
  //       ...state,
  //       categories: action.payload,
  //       loading: false,
  //     };
  //   case CATEGORY_TYPES.CATEGORY_FAILED:
  //     return {
  //       ...state,
  //       error: action.payload,
  //       loading: false,
  //     };

  //   default:
  //     return state;
  // }
};

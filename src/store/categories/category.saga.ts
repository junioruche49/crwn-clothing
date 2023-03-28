import { takeLatest, call, put, all } from "typed-redux-saga/macro";
import { getCategoriesAndDocuments } from "../../utils/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./category.action";

import { CATEGORY_TYPES } from "./category.types";

// export const fetchCategoriesAsync = async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categories = await getCategoriesAndDocuments();
//     dispatch(fetchCategoriesSuccess(categories));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };

export function* fetchCategoriesAsync() {
  try {
    const categories = yield* call(getCategoriesAndDocuments, "categories");
    yield* put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(CATEGORY_TYPES.CATEGORY_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}

import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import {
  categorySelector,
  selectIsLoading,
} from "../../store/categories/category.selector";

const CategoriesPreview = () => {
  const categories = useSelector(categorySelector);
  const isLoading = useSelector(selectIsLoading);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categories).map((data, id) => {
          const products = categories[data];
          const title = data;

          return <CategoryPreview key={id} title={title} products={products} />;
        })
      )}
      ;
    </Fragment>
  );
};

export default CategoriesPreview;

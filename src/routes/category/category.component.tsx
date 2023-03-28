import { useEffect, Fragment, FC } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import {
  categorySelector,
  selectIsLoading,
} from "../../store/categories/category.selector";

import "./category.styles";
import { CategoryContainer, CategoryTitle } from "./category.styles";

type CategoryRouteParam = {
  category: string;
};

const Category: FC = () => {
  const { category } = useParams<
    keyof CategoryRouteParam
  >() as CategoryRouteParam;
  const categories = useSelector(categorySelector);
  const isLoading = useSelector(selectIsLoading);

  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);
  return (
    <Fragment>
      <CategoryTitle>{category}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;

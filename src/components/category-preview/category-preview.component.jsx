import ProductCard from "../product-card/product-card.component";
import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from "./category-preview.style";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <Title to={title}>{title.toUpperCase()}</Title>
      <Preview>
        {products
          .filter((_, id) => id < 4)
          .map((data) => {
            return <ProductCard key={data.id} product={data} />;
          })}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;

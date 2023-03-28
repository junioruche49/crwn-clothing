import { memo } from "react";
import "./cart-item.styles.scss";
const CartItem = memo(({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <h2 className="name">{name}</h2>
        <span className="price">
          {quantity} X ${price}
        </span>
      </div>
    </div>
  );
});

export default CartItem;

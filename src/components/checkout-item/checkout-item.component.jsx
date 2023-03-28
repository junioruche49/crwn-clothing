import { useDispatch, useSelector } from "react-redux";
import {
  addCartItemToCart,
  clearCartItemFromCart,
  removeCartItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import "./checkout-item.styles.scss";
const CheckOutItem = ({ cartIem }) => {
  const { name, price, quantity, imageUrl } = cartIem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addCartItemHandler = () => {
    dispatch(addCartItemToCart(cartItems, cartIem));
  };

  const removeCartItemHandler = () => {
    dispatch(removeCartItemFromCart(cartItems, cartIem));
  };

  const clearCarHandler = () => {
    dispatch(clearCartItemFromCart(cartItems, cartIem));
  };
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={removeCartItemHandler}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={addCartItemHandler}>
          &#10095;
        </span>
      </span>

      <span className="price">{price}</span>
      <span className="remove-btn" onClick={clearCarHandler}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckOutItem;

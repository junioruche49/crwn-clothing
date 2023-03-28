import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropDownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.jsx";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useCallback } from "react";
const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const navigateToCheckOut = useCallback(() => {
    navigate("/checkout");
  }, [navigate]);
  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((data) => <CartItem key={data.id} cartItem={data} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={navigateToCheckOut}>Go to Checkout</Button>
    </CartDropDownContainer>
  );
};

export default CartDropDown;

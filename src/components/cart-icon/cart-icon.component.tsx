import { useDispatch, useSelector } from "react-redux";
import { setCartIsOpen } from "../../store/cart/cart.action";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { CartIconContainer, ItemCount } from "./cart-icon.styles";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleCartDropdown = () => {
    dispatch(setCartIsOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={toggleCartDropdown}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};
export default CartIcon;

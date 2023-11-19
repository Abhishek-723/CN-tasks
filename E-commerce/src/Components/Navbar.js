import { useCart } from "../Global/CartContext";

export const Navbar = () => {
  const { cart } = useCart();
  const items = cart.totalItems;
  return (
    <div className="navbox">
      <div className="leftside">
        <img src="logobg.png" alt="Ecommerce_logo" />
      </div>

      <div className="rightside">
        <div className="cart-container">
          <span className="cart-icon">
            <i class="fa-solid fa-cart-shopping"></i>
          </span>
          <span className="cart-count">{items}</span>
          {/* Display the number of items in the cart as a superscript */}
        </div>

        <div className="logout-container">
          <span>
            <button className="logout-btn">Logout</button>
          </span>
        </div>
      </div>
    </div>
  );
};

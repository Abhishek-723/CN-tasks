import React from "react";
import CartItem from "./CartItem";
import { useGlobalContext } from "./context";

const CartContainer = () => {
  const { cart, total } = useGlobalContext();

  if (cart.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>Products In Cart</h2>
          <h4 className="empty-cart">Your cart is empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>Products In Cart</h2>
      </header>
      {cart.map((item) => (
        <CartItem product={item} />
      ))}

      <div className="cart-total">
        <h4>Total amount to be paid: ${total}</h4>
      </div>
      <button className="btn clear-btn">Clear cart</button>
    </section>
  );
};

export default CartContainer;

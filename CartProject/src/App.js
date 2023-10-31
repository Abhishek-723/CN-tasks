import React from "react";
import { useGlobalContext } from "./context";
import "./index.css";
import CartContainer from "./CartContainer";

function App() {
  const { loading, amount } = useGlobalContext();
  if (loading) {
    return (
      <div className="loading">
        <div class="loader"></div>
      </div>
    );
  }
  return (
    <main>
      <nav class="navbar">
        <div class="container">
          <div class="logo">CartPage</div>
          <div class="cart-count">Total Products: {amount}</div>
        </div>
      </nav>
      <CartContainer />
    </main>
  );
}

export default App;

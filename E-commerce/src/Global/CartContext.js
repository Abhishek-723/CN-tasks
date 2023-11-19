import React, { createContext, useContext, useReducer } from "react";

// Initial state of the cart
const initialCartState = {
  items: [],
  totalItems: 0,
};

// Define the reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        totalItems: state.totalItems + 1,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        totalItems: state.totalItems - 1,
      };
    default:
      return state;
  }
};

// Create the context
const CartContext = createContext();

// Create a custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const addItemToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItemFromCart = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartState,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

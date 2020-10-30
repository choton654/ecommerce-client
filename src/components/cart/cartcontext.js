import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "./cartreducer";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartstate, cartdispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ cartstate, cartdispatch }}>
      {children}
    </CartContext.Provider>
  );
};

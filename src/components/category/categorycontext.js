import React, { createContext, useReducer } from "react";
import { initialState, reducer } from "./categoryreducer";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [catstate, catdispatch] = useReducer(reducer, initialState);

  return (
    <CategoryContext.Provider value={{ catstate, catdispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};

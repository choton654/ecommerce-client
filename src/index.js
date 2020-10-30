import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./components/user/authcontext";
import { CategoryContextProvider } from "./components/category/categorycontext";
import { ProductContextProvider } from "./components/products/productcontext";
import { CartContextProvider } from "./components/cart/cartcontext";
import { SnackbarProvider } from "notistack";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SnackbarProvider maxSnack={3}>
        <UserContextProvider>
          <CategoryContextProvider>
            <ProductContextProvider>
              <CartContextProvider>
                <App />
              </CartContextProvider>
            </ProductContextProvider>
          </CategoryContextProvider>
        </UserContextProvider>
      </SnackbarProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

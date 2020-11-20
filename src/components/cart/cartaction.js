import BASE_URL from "../../api";

import axios from "axios";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const userId = user && user._id;

export const getCartItems = (cartdispatch) => {
  axios
    .get(`${BASE_URL}/cart/api/${userId}/getcart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data.cart);
      const cart = res.data.cart;
      cartdispatch({ type: "ADD_TO_CART", payload: cart });
    })
    .catch((err) => console.log(err));
};
export const handleRemove = (productId, price, cartdispatch) => {
  console.log(productId);
  axios
    .post(
      `${BASE_URL}/cart/api/${userId}/removeitem`,
      { productId, price },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      getCartItems(cartdispatch);
    })
    .catch((err) => console.log(err));
};
export const addTocart = (productId, price, cartdispatch, enqueueSnackbar) => {
  console.log(productId);
  // const price = state.product && state.product.price;
  axios
    .post(
      `${BASE_URL}/cart/api/${userId}/addcart`,
      { price, productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      const { success } = res.data;
      enqueueSnackbar(success, { variant: "success" });
      getCartItems(cartdispatch);
    })
    .catch((err) => {
      const error = err.response.data.err;
      cartdispatch({ type: "ERROR", payload: error });
      enqueueSnackbar(`${error}.Login first`, { variant: "error" });
      // userDispatch({ type: "LOGIN" });
      console.log(error);
    });
};

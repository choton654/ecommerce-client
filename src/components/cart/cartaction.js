import BASE_URL from "../../api";
import axios from "axios";

// const token = localStorage.getItem("token");
// console.log(token);
// const user = JSON.parse(localStorage.getItem("user"));
// const userId = user && user._id;
// console.log(userId);
export const getCartItems = (cartdispatch, token, userId) => {
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
    .catch((err) => {
      console.log(err);
      // const error = err.response.data;
      // cartdispatch({ type: "CART_ERROR", payload: error });
    });
};
export const handleRemove = (
  productId,
  price,
  cartdispatch,
  userId,
  token,
  itemNumber,
  setItemnumber
) => {
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
      // console.log(res.data);
      setItemnumber(parseInt(itemNumber) - 1);
      getCartItems(cartdispatch, token, userId);
    })
    .catch((err) => console.log(err));
};
export const removeCartitem = (productId, cartdispatch, userId, token) => {
  console.log(productId);
  axios
    .post(
      `${BASE_URL}/cart/api/${userId}/removewholeitem`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log(res.data.updatedCart);
      getCartItems(cartdispatch, token, userId);
    })
    .catch((err) => console.log(err));
};
export const addTocart = (
  productId,
  price,
  cartdispatch,
  enqueueSnackbar,
  userId,
  token,
  itemNumber,
  setItemnumber
) => {
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
      setItemnumber(parseInt(itemNumber) + 1);
      const { success } = res.data;
      enqueueSnackbar(success, { variant: "success" });
      getCartItems(cartdispatch, token, userId);
    })
    .catch((err) => {
      const error = err.response.data.err;
      cartdispatch({ type: "ERROR", payload: error });
      enqueueSnackbar(`${error}.Login first`, { variant: "error" });
      // userDispatch({ type: "LOGIN" });
      console.log(err);
    });
};

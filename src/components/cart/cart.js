import React, { useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Cartitem from "./cartitem";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  IconButton,
  Input,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import AddIcon from "@material-ui/icons/Add";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStyles } from "../layout/theme";
import { CartContext } from "./cartcontext";
import axios from "axios";
import BASE_URL from "../../api";
import { useSnackbar } from "notistack";
import { ProductContext } from "../products/productcontext";
import Placeorder from "./placeorder";
const Cart = () => {
  const history = useHistory();
  const classes = useStyles();
  const { cartstate, cartdispatch } = useContext(CartContext);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const { state, dispatch } = useContext(ProductContext);
  const { enqueueSnackbar } = useSnackbar();
  const cartItems =
    cartstate.cart.cartItem && cartstate.cart.cartItem.map((item) => item._id);
  console.log(cartItems);
  useEffect(() => {
    getCartItems();
  }, []);
  const getCartItems = () => {
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
  const handleRemove = (productId, price) => {
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
        getCartItems();
      })
      .catch((err) => console.log(err));
  };
  const handleShopping = () => {
    history.push("/");
  };
  if (cartstate) {
    console.log(cartstate);
  }
  const addTocart = (productId) => {
    console.log(productId);
    const price = state.product && state.product.price;
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
        getCartItems();
      })
      .catch((err) => {
        const error = err.response.data.err;
        cartdispatch({ type: "ERROR", payload: error });
        enqueueSnackbar(`${error}.Login first`, { variant: "error" });
        // userDispatch({ type: "LOGIN" });
        console.log(error);
      });
  };
  const handleOrder = (price) => {
    axios
      .post(
        `${BASE_URL}/order/api/${userId}/createorder`,
        { cartItems, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { order } = res.data;
        console.log(order);
        const { success } = res.data;
        cartdispatch({ type: "PLACE_ORDER", payload: order });
        enqueueSnackbar(success, { variant: "success" });
        history.push(`/${order._id}/vieworder`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={8}>
          <Grid item sm={12}>
            {cartstate.cart &&
            cartstate.cart.cartItem &&
            cartstate.cart.quantity &&
            cartstate.cart.quantity > 0 ? (
              cartstate.cart.cartItem.map((item) => (
                <Cartitem
                  item={item}
                  removeitem={handleRemove}
                  addtocart={addTocart}
                />
                /* <div
                  key={item._id}
                  style={{
                    padding: "24px",
                    border: "2px solid #287aed",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        height: "112px",
                        width: "112px",
                        position: "relative",
                        // margin: "0 auto",
                      }}
                    >
                      <img
                        src={
                          item.productId &&
                          `${BASE_URL}${item.productId.photo[0].img}`
                        }
                        alt="no-image"
                        style={{
                          position: "absolute",
                          bottom: "0",
                          left: "0",
                          right: "0",
                          top: "0",
                          margin: "auto",
                          opacity: "1",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        padding: "0 24px 12px",
                        verticalAlign: "top",
                        minHeight: "112px",
                        flex: "1 1",
                        overflow: "hidden",
                        maxWidth: "460px",
                      }}
                    >
                      <Typography style={{ maxWidth: "200px" }}>
                        <strong>{item.productId && item.productId.name}</strong>
                      </Typography>
                      <Typography style={{ marginTop: "10px" }}>
                        Seller:<span>{item.productId.brand}</span>
                      </Typography>
                      <Typography style={{ marginTop: "10px" }}>
                        <strong>
                          ₹<span>{item.productId.price}</span>
                        </strong>
                      </Typography>
                    </div>
                    <div>
                      <Typography>Delivered in 7 days</Typography>
                    </div>
                  </div>
                  <div style={{ paddingTop: "10px", display: "block" }}>
                    <div style={{ display: "flex" }}>
                      <IconButton
                        style={{
                          width: "28px",
                          height: "28px",
                          background: "linear-gradient(#fff,#f9f9f9)",
                          display: "inline-block",
                          border: "1px solid #c2c2c2",
                          cursor: "pointer",
                          fontSize: "16px",
                          borderRadius: "50%",
                          paddingTop: "1px",
                          lineHeight: "1",
                        }}
                        onClick={() =>
                          handleRemove(
                            item.productId && item.productId._id,
                            item.price
                          )
                        }
                      >
                        <RemoveIcon fontSize="default" />
                      </IconButton>

                      <div
                        style={{
                          display: "inline-block",
                          padding: "3px 6px",
                          width: "calc(100% - 60px)",
                          height: "100%",
                          width: "46px",
                          height: "28px",
                          borderRadius: "2px",
                          backgroundColor: "#fff",
                          border: "1px solid #c2c2c2",
                          margin: "0 5px",
                        }}
                      >
                        <input
                          type="text"
                          value={item.quantity}
                          style={{
                            border: "none",
                            width: "100%",
                            fontSize: "14px",
                            fontWeight: "500",
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        />
                      </div>
                      <IconButton
                        style={{
                          width: "28px",
                          height: "28px",
                          background: "linear-gradient(#fff,#f9f9f9)",
                          display: "inline-block",
                          border: "1px solid #c2c2c2",
                          cursor: "pointer",
                          fontSize: "16px",
                          borderRadius: "50%",
                          paddingTop: "1px",
                          lineHeight: "1",
                        }}
                        onClick={() => addTocart(item.productId._id)}
                      >
                        <AddIcon fontSize="default" />
                      </IconButton>
                      <div
                        style={{ paddingLeft: "20px", display: "inline-block" }}
                      >
                        <Button
                          style={{ height: "30px", marginRight: "20px" }}
                          // variant="contained"
                          color="secondary"
                          onClick={() =>
                            handleRemove(
                              item.productId && item.productId._id,
                              item.price
                            )
                          }
                        >
                          <RestoreFromTrashIcon
                            style={{ marginRight: "10px" }}
                          />{" "}
                          Remove Item
                        </Button>
                      </div>
                    </div>
                  </div>
                </div> */
              ))
            ) : (
              <Paper
                className={classes.paper}
                style={{
                  width: "100%",
                  border: "2px solid lightblue",
                  marginLeft: "100px",
                }}
              >
                <img
                  src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                  style={{ maxWidth: "30%" }}
                />
                <Typography variant="h6">Your cart is empty</Typography>
                <Typography variant="subtitle1">
                  It's good day to buy the items tou saved for latter!
                </Typography>

                <Typography
                  variant="subtitle2"
                  color="primary"
                  onClick={handleShopping}
                >
                  <strong style={{ cursor: "pointer" }}>Go to shopping</strong>
                </Typography>
              </Paper>
            )}
            {cartstate.cart.quantity > 0 && (
              <div style={{ position: "sticky", bottom: "0" }}>
                <div
                  style={{
                    borderTop: "1px solid #f0f0f0",
                    background: "#fff",
                    padding: "16px 22px",
                    boxShadow: "0 -2px 10px 0 rgba(0,0,0,.1)",
                    textAlign: "center",
                  }}
                >
                  <Button
                    style={{
                      background: "#287aed",
                      height: "30px",
                      marginLeft: "20px",
                      width: "90%",
                      marginTop: "auto",
                      marginBottom: "20px",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleOrder(cartstate.cart.price)}
                  >
                    <ShoppingBasketIcon style={{ marginRight: "10px" }} /> Place
                    Order
                  </Button>{" "}
                </div>
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          {cartstate.cart && cartstate.cart.quantity > 0 && (
            <Placeorder
              quantity={cartstate.cart.quantity}
              price={cartstate.cart.price}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;

{
  /* <Paper
style={{
  border: "2px solid lightblue",
  marginBottom: "20px",
}}
key={item._id}
>
<div>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <div>
      <img
        src={
          item.productId &&
          `${BASE_URL}${item.productId.photo[0].img}`
        }
        alt="no-image"
        style={{
          height: "200px",
          width: "200px",
          marginTop: "20px",
          marginLeft: "20px",
        }}
      />
      <div style={{ display: "flex", marginLeft: "20px" }}>
        <IconButton
          onClick={() =>
            handleRemove(
              item.productId && item.productId._id,
              item.price
            )
          }
        >
          <RemoveIcon fontSize="default" />
        </IconButton>

        <div
          style={{
            maxWidth: "50px",
            marginTop: "10px",
          }}
        >
          <Input
            type="text"
            value={item.quantity}
            style={{
              border: "1px solid black",
              textAlign: "center",
            }}
          />
        </div>
        <IconButton
          onClick={() => addTocart(item.productId._id)}
        >
          <AddIcon fontSize="default" />
        </IconButton>
      </div>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        width: "600px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",

          // justifyContent: "space-evenly",
          // marginTop: "20px",
          // width: "600px",
        }}
      >
        <Typography style={{ maxWidth: "200px" }}>
          <strong>
            {item.productId && item.productId.name}
          </strong>
        </Typography>
        <Typography style={{ marginTop: "10px" }}>
          <span>Quantity</span>
          {":"} {item.quantity}
        </Typography>
        <Typography style={{ marginTop: "10px" }}>
          <span>Price</span>
          {":"} {item.price}
        </Typography>
      </div>
      <div>
        <Button
          style={{ height: "30px", marginRight: "20px" }}
          // variant="contained"
          color="secondary"
          onClick={() =>
            handleRemove(
              item.productId && item.productId._id,
              item.price
            )
          }
        >
          <RestoreFromTrashIcon
            style={{ marginRight: "10px" }}
          />{" "}
          Remove Item
        </Button>
        <p />
      </div>
    </div>
  </div>
  <br />
  <Divider variant="middle" />
</div>
<div></div>
</Paper>
<Button
style={{
  height: "30px",
  marginLeft: "20px",
  width: "90%",
  marginTop: "auto",
  marginBottom: "20px",
}}
variant="contained"
color="primary"
onClick={() => handleOrder(cartstate.cart.price)}
>
<ShoppingBasketIcon style={{ marginRight: "10px" }} /> Place
Order
</Button> */
}

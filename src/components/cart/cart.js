import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "../layout/theme";
import { CartContext } from "./cartcontext";
import axios from "axios";
import BASE_URL from "../../api";
import { useSnackbar } from "notistack";
import { ProductContext } from "../products/productcontext";
const Cart = () => {
  const history = useHistory();
  const classes = useStyles();
  const { cartstate, cartdispatch } = useContext(CartContext);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const { state, dispatch } = useContext(ProductContext);
  const { enqueueSnackbar } = useSnackbar();

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
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={9}>
          {cartstate.cart &&
          cartstate.cart.cartItem &&
          cartstate.cart.quantity &&
          cartstate.cart.quantity > 0 ? (
            cartstate.cart.cartItem.map((item) => (
              <Paper style={{ border: "2px solid lightblue" }} key={item._id}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <img
                        src={item.productId && item.productId.photo[0].img}
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
                        justifyContent: "space-evenly",
                        marginTop: "20px",
                        width: "600px",
                      }}
                    >
                      <Typography>
                        {item.productId && item.productId.name}
                      </Typography>
                      <Typography>
                        <span>Quantity</span>
                        {":"} {item.quantity}
                      </Typography>

                      <Button
                        style={{ height: "30px" }}
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleRemove(
                            item.productId && item.productId._id,
                            item.price
                          )
                        }
                      >
                        Remove Item
                      </Button>
                    </div>
                  </div>
                  <br />
                  <Divider variant="middle" />
                </div>
              </Paper>
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
        </Grid>
        <Grid item xs={12} sm={3}>
          {cartstate.cart && cartstate.cart.quantity > 0 && (
            <Paper
              style={{
                height: "400px",
                width: "400px",
                border: "2px solid lightblue",
                position: "fixed",
              }}
            >
              <Typography varient="h4">{cartstate.cart.price}</Typography>
              <Typography varient="h4">{cartstate.cart.quantity}</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;

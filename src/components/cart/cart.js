import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import { useStyles } from "../layout/theme";
import { CartContext } from "./cartcontext";
import axios from "axios";
import BASE_URL from "../../api";
const Cart = () => {
  const history = useHistory();
  const classes = useStyles();
  const { cartstate, cartdispatch } = useContext(CartContext);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
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
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={9}>
          <Paper style={{ border: "2px solid lightblue" }}>
            {cartstate.cart &&
            cartstate.cart.cartItem &&
            cartstate.cart.quantity &&
            cartstate.cart.quantity > 0 ? (
              cartstate.cart.cartItem.map((item) => (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
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
              ))
            ) : (
              <Paper>
                <Typography varient="h4">Your cart is empty</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShopping}
                >
                  Go to shopping
                </Button>
              </Paper>
            )}
          </Paper>
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

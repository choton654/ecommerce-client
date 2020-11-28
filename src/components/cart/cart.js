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
// import { ProductContext } from "../products/productcontext";
import Placeorder from "./placeorder";
import { getCartItems, handleRemove, addTocart } from "./cartaction";
const Cart = () => {
  const history = useHistory();
  const classes = useStyles();
  const { cartstate, cartdispatch } = useContext(CartContext);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : "";
  const orderId = user ? user.history : undefined;
  console.log(orderId);
  // const { state, dispatch } = useContext(ProductContext);
  const { enqueueSnackbar } = useSnackbar();
  const cartItems =
    cartstate.cart &&
    cartstate.cart.cartItem &&
    cartstate.cart.cartItem.map((item) => item._id);
  console.log(cartItems);
  useEffect(() => {
    getCartItems(cartdispatch, token, userId);
  }, []);

  const handleShopping = () => {
    history.push("/");
  };
  if (cartstate) {
    console.log(cartstate);
  }

  const handleOrder = (price) => {
    axios
      .post(
        `${BASE_URL}/order/api/${userId}/createorder`,
        { cartItems, price, orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const { order, user: updatedUser } = res.data;
        const { success } = res.data;
        console.log(user.history, typeof updatedUser);
        user.history = updatedUser === "" ? orderId : updatedUser.history;
        console.log(user.history);
        cartdispatch({ type: "PLACE_ORDER", payload: order });
        enqueueSnackbar(success, { variant: "success" });
        window.location.assign(`/${order._id}/vieworder`);
        // history.push(`/${order._id}/vieworder`);
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
              cartstate.cart.cartItem.map((item, idx) => (
                <Cartitem
                  key={idx}
                  item={item}
                  removeitem={() =>
                    handleRemove(
                      item.productId._id,
                      item.productId.price,
                      cartdispatch,
                      userId,
                      token
                    )
                  }
                  addtocart={() =>
                    addTocart(
                      item.productId._id,
                      item.productId.price,
                      cartdispatch,
                      enqueueSnackbar,
                      userId,
                      token
                    )
                  }
                />
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
            {cartstate.cart && cartstate.cart.quantity > 0 && (
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

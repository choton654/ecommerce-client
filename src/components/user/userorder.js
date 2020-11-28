import {
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Typography,
  Collapse,
} from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { useStyles } from "../layout/theme";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import axios from "axios";
import BASE_URL from "../../api";
import { CartContext } from "../cart/cartcontext";
const Userorder = () => {
  const { cartstate, cartdispatch } = useContext(CartContext);
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const orderid = user.history;
  const token = localStorage.getItem("token");
  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    getUserOrder();
  }, []);
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const getUserOrder = () => {
    axios
      .get(`${BASE_URL}/order/api/${userId}/${orderid}/getorder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { order } = res.data;
        cartdispatch({ type: "PLACE_ORDER", payload: order });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper
      className={classes.paper}
      style={{
        background: "whitesmoke",
        height: "400px",
        border: "2px solid #287aed",
      }}
    >
      <Typography variant="h6">Your Orders</Typography>
      {cartstate.orders &&
        cartstate.orders.map((order) => (
          <List key={order._id}>
            <ListItem
              button
              onClick={handleClick1}
              style={{
                border: "3px solid #287aed",
                background: "whiteSmoke",
                height: "80px",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography>
                    Order Id:<strong> {order._id}</strong>
                  </Typography>
                  <Typography>
                    you have ordered{" "}
                    {order.orderItems && order.orderItems.length} items
                  </Typography>
                </div>
              </div>

              {open1 ? (
                <ExpandLess style={{ marginLeft: "auto" }} />
              ) : (
                <ExpandMore style={{ marginLeft: "auto" }} />
              )}
            </ListItem>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <div style={{ display: "flex", marginLeft: "20px" }}>
                <Typography variant="subtitle1">
                  <strong>Shipping Address:</strong>
                </Typography>
                <Typography variant="subtitle1" style={{ marginLeft: "5px" }}>
                  {order.shippingaddress && order.shippingaddress.address}
                </Typography>
              </div>
            </Collapse>
          </List>
        ))}
    </Paper>
  );
};

export default Userorder;

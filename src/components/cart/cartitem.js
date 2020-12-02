import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  IconButton,
  NativeSelect,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import BASE_URL from "../../api";
import { CartContext } from "./cartcontext";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {
  getCartItems,
  handleRemove,
  addTocart,
  removeCartitem,
} from "./cartaction";
import { useSnackbar } from "notistack";
import axios from "axios";
const Cartitem = ({ item2 }) => {
  const { cartstate, cartdispatch } = useContext(CartContext);
  const [itemNumber, setItemnumber] = useState("");
  const [itemid, setItemid] = useState(item2.quantity);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : "";
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (itemNumber) {
      axios
        .post(
          `${BASE_URL}/cart/api/${userId}/chandecartitem`,
          { itemid, itemNumber: parseInt(itemNumber) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.updatedCart);
          getCartItems(cartdispatch, token, userId);
        })
        .catch((err) => console.log(err));
    }
  }, [itemNumber]);
  const itemChange = (e, productId) => {
    setItemnumber(e.target.value);
    setItemid(productId);
    console.log(parseInt(itemNumber));
  };
  return (
    cartstate.cart &&
    cartstate.cart.cartItem &&
    cartstate.cart.quantity &&
    cartstate.cart.quantity > 0 &&
    cartstate.cart.cartItem.map((item, idx) => (
      <div
        key={idx}
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
                item.productId && `${BASE_URL}${item.productId.photo[0].img}`
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
              {/* Seller:<span>{item.productId.brand}</span> */}
            </Typography>
            <Typography style={{ marginTop: "10px" }}>
              <strong>
                ₹<span>{item.price}</span>
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
                  item.productId._id,
                  item.productId.price,
                  cartdispatch,
                  userId,
                  token,
                  itemNumber,
                  setItemnumber
                )
              }
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            {/* <input
              onKeyPress={(e) => console.log(e.key)}
              type="text"
              value={itemNumber}
              onChange={(e) => itemChange(e, item.productId._id)}
              style={{
                border: "1px solid #c2c2c2",
                marginLeft: "5px",
                marginRight: "5px",
                width: "40px",
                fontSize: "14px",
                fontWeight: "500",
                verticalAlign: "middle",
                textAlign: "center",
              }}
            /> */}
            <FormControl>
              <NativeSelect
                style={{ paddingLeft: "15px" }}
                value={item2.quantity}
                inputProps={{
                  name: "name",
                  id: "uncontrolled-native",
                }}
                onChange={(e) => itemChange(e, item.productId._id)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </NativeSelect>
            </FormControl>
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
                addTocart(
                  item.productId._id,
                  item.productId.price,
                  cartdispatch,
                  enqueueSnackbar,
                  userId,
                  token,
                  itemNumber,
                  setItemnumber
                )
              }
            >
              <AddIcon fontSize="small" />
            </IconButton>
            <Typography
              onClick={handleOpen}
              variant="subtitle2"
              style={{
                paddingLeft: "20px",
                display: "inline-block",
                color: "#287aed",
                cursor: "pointer",
              }}
            >
              <strong>REMOVE ITEM</strong>
            </Typography>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you want to remove this item ?"}
              </DialogTitle>

              <DialogActions style={{ margin: "0px auto" }}>
                <Button
                  onClick={handleClose}
                  autoFocus
                  variant="contained"
                  style={{ background: "#8bc34a" }}
                >
                  <strong style={{ color: "white" }}>Cancel</strong>
                </Button>
                <Button
                  style={{ background: "#d32f2f" }}
                  onClick={() =>
                    removeCartitem(
                      item.productId._id,
                      cartdispatch,
                      userId,
                      token
                    )
                  }
                  variant="contained"
                  autoFocus
                >
                  <strong style={{ color: "white" }}>Remove item</strong>
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    ))
  );
};

export default Cartitem;

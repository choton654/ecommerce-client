import React, { useEffect, useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Protectuser from "../user/protectuser";
import { getCartItems, handleRemove, addTocart } from "../cart/cartaction";
import {
  Collapse,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Checkbox,
  Typography,
  ListItemAvatar,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import VpnKeyTwoToneIcon from "@material-ui/icons/VpnKeyTwoTone";
import PaymentTwoToneIcon from "@material-ui/icons/PaymentTwoTone";
import ChildFriendlyTwoToneIcon from "@material-ui/icons/ChildFriendlyTwoTone";
import LocationOnTwoToneIcon from "@material-ui/icons/LocationOnTwoTone";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Placeorder from "../cart/placeorder";
import { useStyles } from "../layout/theme";
import { AuthContext } from "../user/authcontext";
import { CartContext } from "../cart/cartcontext";
import axios from "axios";
import BASE_URL from "../../api";
import Cartitem from "../cart/cartitem";
import { useSnackbar } from "notistack";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Order = () => {
  const history = useHistory();
  const { orderid } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  console.log(orderid);
  const classes = useStyles();
  const { state, dispatch } = useContext(AuthContext);
  const { cartstate, cartdispatch } = useContext(CartContext);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  user.history = orderid;
  localStorage.setItem("user", JSON.stringify(user));
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [deliveryAdd, setDeliveryAdd] = useState({
    addressid: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    contactNo: "",
    district: "",
  });

  const chnageAddress = (e) => {
    console.log(e.target.name);

    const selectedAddress =
      state.user.address &&
      state.user.address.find((address) => {
        return address._id.toString() === e.target.name.toString();
      });
    setDeliveryAdd({
      addressid: selectedAddress._id,
      address: selectedAddress.address,
      postalCode: selectedAddress.postalCode,
      city: selectedAddress.city,
      country: selectedAddress.country,
      contactNo: selectedAddress.contactNo,
      district: selectedAddress.district,
    });
    // setisChecked({ [deliveryAdd._id]: e.target.checked });
  };
  console.log(deliveryAdd);

  const addressSubmit = (orderid) => {
    console.log(orderid);
    axios
      .put(
        `${BASE_URL}/order/api/${orderid}/${userId}/submitaddress`,
        {
          deliveryAdd,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { neworder } = res.data;
        console.log(neworder);
        cartdispatch({ type: "ADD_ADDRESS", payload: neworder });
        setOpen2(false);
      })
      .catch((err) => console.log(err));
  };
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  useEffect(() => {
    getCartItems();
    singleUser();
  }, []);

  const singleUser = () => {
    axios
      .get(`${BASE_URL}/user/api/${userId}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { user } = res.data;
        dispatch({ type: "USER_PROFILE", payload: user });
      })
      .catch((err) => console.log(err));
  };
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
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={9}>
          <List>
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
                <ListItemIcon>
                  <VpnKeyTwoToneIcon style={{ marginTop: "10px" }} />
                </ListItemIcon>
                <div>
                  <Typography>LOGIN</Typography>
                  <Typography>
                    <strong>{user.username}</strong> {user.email}
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
              <Paper
                style={{
                  width: "90%",
                  border: "2px solid #287aed",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginLeft: "20px",
                    marginTop: "30px",
                  }}
                >
                  <Typography>Name</Typography>
                  <Typography style={{ marginLeft: "20px" }}>
                    <strong>{user.username}</strong>
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                >
                  <Typography>Email</Typography>
                  <Typography style={{ marginLeft: "20px" }}>
                    <strong>{user.email}</strong>
                  </Typography>
                </div>
                <Typography
                  style={{
                    marginLeft: "20px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <strong
                    style={{ color: "#287aed", cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout & signin to another account
                  </strong>
                </Typography>
              </Paper>
            </Collapse>
            <ListItem
              button
              onClick={handleClick2}
              style={{
                border: "3px solid #287aed",
                background: "whiteSmoke",
                height: "80px",
                marginBottom: "20px",
              }}
            >
              <ListItemIcon>
                <LocationOnTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="DELIVERY ADDRESS" />
              <ListItemText
                style={{ marginRight: "250px" }}
                primary={
                  cartstate.orders.length === 0 &&
                    cartstate.orders.shippingaddress === undefined
                    ? ""
                    : cartstate.orders.shippingaddress &&
                    cartstate.orders.shippingaddress.address
                }
              />
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <Paper
                style={{
                  maxWidth: "450px",
                  textAlign: "center",
                  marginBottom: "20px",
                  border: "2px solid #287aed",
                }}
              >
                <Typography variant="h6">Shipping address</Typography>
                <List>
                  {state.user.address &&
                    state.user.address.map((address) => (
                      <div>
                        <ListItem
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <LocationOnIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <Typography
                            variant="subtitle1"
                            style={{ marginRight: "30px", maxWidth: "60%" }}
                          >
                            <strong
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              {address.address}
                              {","}
                              {address.postalCode}
                              {","}
                              {address.city}
                              {","}
                              <br />
                              {address.district}
                              {","}
                              <br />
                              {address.country}
                              {","}
                              <br />
                              {address.contactNo}
                            </strong>
                          </Typography>

                          <Checkbox
                            // style={{ marginLeft: "20px" }}
                            name={address._id}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={
                              address._id.toString() ===
                              deliveryAdd.addressid.toString()
                            }
                            onChange={chnageAddress}
                          />
                        </ListItem>
                        <br />
                      </div>
                    ))}
                </List>
                <Button
                  style={{
                    marginBottom: "10px",
                    background: "#fb641b",
                    boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)",
                    border: "none",
                    color: "#fff",
                    height: "48px",
                    fontSize: "16px",
                    fontWeight: "400",
                    minWidth: "200px",
                  }}
                >
                  <strong onClick={() => addressSubmit(orderid)}>
                    Deliver here
                  </strong>
                </Button>
              </Paper>
            </Collapse>
            <ListItem
              button
              onClick={handleClick3}
              style={{
                border: "3px solid #287aed",
                background: "whiteSmoke",
                height: "80px",
                marginBottom: "20px",
              }}
            >
              <ListItemIcon>
                <ChildFriendlyTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="ORDER SUMMARY" />
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              {cartstate.cart &&
                cartstate.cart.cartItem &&
                cartstate.cart.cartItem.map((item) => (
                  <Paper>
                    <Cartitem
                      item2={item}
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
                      removeitem={() =>
                        handleRemove(
                          item.productId._id,
                          item.productId.price,
                          cartdispatch,
                          userId,
                          token
                        )
                      }
                    />
                  </Paper>
                ))}
            </Collapse>
            <ListItem
              button
              onClick={handleClick4}
              style={{
                border: "3px solid #287aed",
                background: "whiteSmoke",
                height: "80px",
                marginBottom: "20px",
              }}
            >
              <ListItemIcon>
                <PaymentTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="PAYMENT OPTIONS" />
              {open4 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open4} timeout="auto" unmountOnExit>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="payment"
                  name="payment1"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="paytm"
                    control={<Radio />}
                    label="Paytm"
                  />
                </RadioGroup>
                {deliveryAdd.addressid && <Button
                  style={{
                    background: "#fb641b",
                    boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)",
                    border: "none",
                    color: "#fff",
                    height: "48px",
                    fontSize: "16px",
                    fontWeight: "400",
                    minWidth: "200px",
                    marginTop: "15px",
                  }}
                  onClick={() => {
                    window.location.assign(
                      `${BASE_URL}/pay/${cartstate.cart.price}/orderid/${orderid}/cartid/${cartstate.cart._id}`
                    );
                    // history.push(`${BASE_URL}`);
                  }}
                >
                  <strong>PAY ₹{cartstate.cart.price}</strong>
                </Button>}

              </FormControl>
            </Collapse>
          </List>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Placeorder
            quantity={cartstate.cart.quantity}
            price={cartstate.cart.price}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Protectuser(Order);

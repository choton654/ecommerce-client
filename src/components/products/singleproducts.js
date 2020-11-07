import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Paper,
  Button,
  Tab,
  Tabs,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  IconButton,
  Divider,
  Box,
  Checkbox,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";
import { useStyles } from "../layout/theme";
import { ProductContext } from "./productcontext";
import axios from "axios";
import BASE_URL from "../../api";
import { useParams, useHistory } from "react-router-dom";
import { TabContext, TabList } from "@material-ui/lab";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Rating from "@material-ui/lab/Rating";
import { useSnackbar } from "notistack";
import { CartContext } from "../cart/cartcontext";
import { AuthContext } from "../user/authcontext";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const Singleproduct = () => {
  const { state: userState, dispatch: userDispatch } = useContext(AuthContext);
  const { cartstate, cartdispatch } = useContext(CartContext);
  const { state, dispatch } = useContext(ProductContext);
  console.log(state.product);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const { productId } = useParams();
  const history = useHistory();
  const [image, setImage] = useState(0);
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const [ratings, setRatings] = useState(0);
  console.log(ratings);
  const handleRatings = (event) => {
    setRatings(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const imageChange = (e, newValue) => {
    setImage(newValue);
  };
  useEffect(() => {
    if (productId) {
      getProduct();
    }
  }, [productId]);

  const getProduct = (e) => {
    axios
      .get(`${BASE_URL}/product/api/${productId}/getproduct`)
      .then((res) => {
        const { product, diffProducts } = res.data;
        dispatch({ type: "PRODUCT", payload: { product, diffProducts } });
      })
      .catch((err) => console.log(err));
  };

  const addTocart = () => {
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
        history.push("/viewcart");
      })
      .catch((err) => {
        const error = err.response.data.err;
        cartdispatch({ type: "ERROR", payload: error });
        enqueueSnackbar(`${error}.Login first`, { variant: "error" });
        userDispatch({ type: "LOGIN" });
        console.log(error);
      });
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      {state.product ? (
        <Grid item xs={12} sm={12}>
          <Paper
            style={{
              height: "670px",
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "none",
            }}
          >
            <Paper
              style={{
                width: "40%",
                border: "2px solid #287aed",
                height: "100%",
              }}
            >
              <div style={{ display: "flex" }}>
                <Tabs
                  value={image}
                  onChange={imageChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  orientation="vertical"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  style={{ width: "100px" }}
                >
                  {state.product.photo ? (
                    state.product.photo.map((pic) => (
                      <Tab
                        key={pic._id}
                        style={{
                          opacity: 1,
                          minWidth: "80px",
                        }}
                        label={
                          <img
                            src={`${BASE_URL}${pic.img}`}
                            style={{
                              height: "80px",
                              width: "80px",
                              border: "2px solid #287aed",
                            }}
                            alt="no-image"
                          />
                        }
                        {...a11yProps(state.product.photo.indexOf(pic))}
                      />
                    ))
                  ) : (
                    <h1>Loading..</h1>
                  )}
                </Tabs>
                {state.product.photo ? (
                  state.product.photo.map((pic) => (
                    <TabPanel
                      key={pic._id}
                      value={image}
                      index={state.product.photo.indexOf(pic)}
                      // style={{ marginLeft: "2rem" }}
                    >
                      <img
                        src={pic.img}
                        alt="no-image"
                        style={{
                          height: "500px",
                          width: "350px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={addTocart}
                          style={{
                            height: "50px",
                            width: "150px",
                            display: "flex",
                            marginTop: "50px",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <ShoppingCartIcon fontSize="small" />
                          Go to Cart
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            marginLeft: "10px",
                            width: "150px",
                            display: "flex",
                            marginTop: "50px",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <ShoppingBasketIcon
                            fontSize="small"
                            // style={{ marginLeft: "20px" }}
                          />
                          Buy Now
                        </Button>
                      </div>
                    </TabPanel>
                  ))
                ) : (
                  <h1>Loading..</h1>
                )}
              </div>
            </Paper>
            <Paper
              style={{
                width: "58%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "2px solid #287aed",
              }}
            >
              {state.product && (
                <div style={{ marginLeft: "20px" }}>
                  <Typography variant="h6">{state.product.name}</Typography>
                  <Typography variant="h6">
                    <span>Price</span>
                    {":"}
                    {state.product.price}
                  </Typography>
                  <Typography variant="h6">
                    <span>Brand</span>
                    {":"} {state.product.brand}
                  </Typography>
                </div>
              )}
              <br />
              <Divider variant="middle" />
              <div style={{ marginLeft: "20px" }}>
                <Typography variant="h6">Rate this product</Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={ratings}
                    onChange={handleRatings}
                  >
                    <FormControlLabel
                      value={5}
                      control={<Radio />}
                      label={
                        <Rating
                          name="customized-10"
                          value={5}
                          max={5}
                          style={{ marginLeft: "10px", marginTop: "8px" }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={4}
                      control={<Radio />}
                      label={
                        <Rating
                          name="customized-10"
                          value={4}
                          max={4}
                          style={{ marginLeft: "10px", marginTop: "8px" }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label={
                        <Rating
                          name="customized-10"
                          value={3}
                          max={3}
                          style={{ marginLeft: "10px", marginTop: "8px" }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label={
                        <Rating
                          name="customized-10"
                          value={2}
                          max={2}
                          style={{ marginLeft: "10px", marginTop: "8px" }}
                        />
                      }
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label={
                        <Rating
                          name="customized-10"
                          value={1}
                          max={1}
                          style={{ marginLeft: "10px", marginTop: "8px" }}
                        />
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <Divider variant="middle" />

              <Typography variant="h6" style={{ marginLeft: "20px" }}>
                Similar products you can find
              </Typography>
              {state.diff_product ? (
                <Tabs
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  onChange={handleChange}
                  value={value}
                >
                  {" "}
                  (
                  {state.diff_product.map((prod) => (
                    <Tab
                      key={prod._id}
                      style={{
                        marginLeft: "10px",
                        opacity: 1,
                      }}
                      label={
                        <Card className={classes.cardroot}>
                          <CardMedia
                            className={classes.media}
                            // style={{ width: "100px" }}
                            image={prod.photo[0].img}
                            onClick={(e) => {
                              history.push(`/${prod._id}/product`);
                              setImage(0);
                            }}
                            title="Product"
                          />
                          <CardContent
                            style={{ padding: "0px", paddingBottom: "16px" }}
                          >
                            <div style={{ display: "flex" }}>
                              <div className={classes.rating}>
                                <Rating
                                  name="half-rating"
                                  defaultValue={0}
                                  precision={0.5}
                                  style={{
                                    paddingTop: "10px",
                                    paddingLeft: "10px",
                                  }}
                                />
                              </div>
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                component="p"
                                style={{
                                  paddingTop: "10px",
                                  marginLeft: "30px",
                                }}
                              >
                                <strong>Rs.</strong>
                                {prod.price}
                              </Typography>
                            </div>
                          </CardContent>
                        </Card>
                      }
                      value={prod._id}
                    />
                  ))}
                  ){" "}
                </Tabs>
              ) : (
                <h1>Loading..</h1>
              )}
            </Paper>
          </Paper>
        </Grid>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};

export default Singleproduct;

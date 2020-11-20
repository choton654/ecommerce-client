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
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
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
import Slide from "@material-ui/core/Slide";

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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Singleproduct = () => {
  const { state: userState, dispatch: userDispatch } = useContext(AuthContext);
  const { cartstate, cartdispatch } = useContext(CartContext);
  const { state, dispatch } = useContext(ProductContext);
  // console.log(state.product);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const { productId } = useParams();
  const history = useHistory();
  const [image, setImage] = useState(0);
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const [productRating, setRatings] = useState(0);
  const [isChecked, setisChecked] = useState({
    checked_1: false,
    checked_2: false,
    checked_3: false,
    checked_4: false,
    checked_5: false,
  });
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [errorReviews, setErrorReviews] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(productRating);

  const addRatings = () => {
    console.log(content);
    axios
      .put(
        `${BASE_URL}/product/api/${userId}/${productId}/addratings`,
        { productRating, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const product = res.data.rateProduct;
        console.log(product);
        dispatch({ type: "ADD_RATINGS", payload: product });
        handleClose();
        setContent("");
        setRatings(0);
      })
      .catch((err) => {
        console.log(err.response.data.err);
        const { err: err1 } = err.response.data;
        setErrorReviews(err1);
      });
  };

  const handleRatings = (event) => {
    console.log(event.target.checked, event.target.name);
    setRatings(event.target.value);
    setisChecked({ [event.target.name]: event.target.checked });
  };

  const handleReview = () => {
    if (productRating === 0 && content.trim() === "") {
      console.log(productRating, content.trim());
      setErrorReviews("Give some reviews & ratings");
    } else {
      addRatings();
    }
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
        // history.push("/viewcart");
      })
      .catch((err) => {
        const error = err.response.data.err;
        cartdispatch({ type: "ERROR", payload: error });
        enqueueSnackbar(`${error}.Login first`, { variant: "error" });
        userDispatch({ type: "LOGIN" });
        console.log(error);
      });
  };
  const handleBuy = () => {
    addTocart();
    // history.push("/vieworder");
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      {state.product ? (
        <Grid item xs={12} sm={12}>
          <div
            style={{
              height: "670px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              boxShadow: "none",
            }}
          >
            <Paper className={classes.paper6}>
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
                        src={`${BASE_URL}${pic.img}`}
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
                            background: "#ff9f00",
                            height: "50px",
                            width: "78%",
                            display: "flex",
                            marginTop: "50px",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <ShoppingCartIcon fontSize="small" />
                          <strong>Go to Cart</strong>
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            background: "#fb641b",
                            marginLeft: "10px",
                            width: "78%",
                            display: "flex",
                            marginTop: "50px",
                            justifyContent: "space-evenly",
                          }}
                          onClick={handleBuy}
                        >
                          <ShoppingBasketIcon
                            fontSize="small"
                            // style={{ marginLeft: "20px" }}
                          />
                          <strong>Buy Now</strong>
                        </Button>
                      </div>
                    </TabPanel>
                  ))
                ) : (
                  <h1>Loading..</h1>
                )}
              </div>
            </Paper>
            <Paper className={classes.paper7}>
              {state.product && (
                <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                  <Typography variant="subtitle1">
                    <strong style={{ color: "rgb(135, 135, 135)" }}>
                      {state.product.brand}
                    </strong>
                  </Typography>
                  <Typography variant="h6">{state.product.name}</Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ color: "#26a541", marginTop: "10px" }}
                  >
                    <strong>spacial price</strong>
                  </Typography>
                  <Typography variant="h4" style={{ marginTop: "10px" }}>
                    <strong>₹{state.product.price}</strong>
                  </Typography>
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <div
                      style={{
                        padding: "2px 7px",
                        borderRadius: "14px",
                        fontSize: "16px",
                        backgroundColor: "#26a541",
                        verticalAlign: "baseline",
                        lineHeight: "normal",
                        display: "inline-block",
                        color: "#fff",
                        fontWeight: "900",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <span style={{ marginTop: "3px", marginLeft: "2px" }}>
                          <strong>{state.product.ratings}</strong>
                        </span>
                        <StarRateIcon
                          fontSize="small"
                          style={{ marginTop: "2px" }}
                        />
                      </div>
                    </div>

                    <Typography
                      variant="subtitle1"
                      style={{
                        color: "rgb(135, 135, 135)",
                        marginLeft: "10px",
                      }}
                    >
                      <strong>
                        {" "}
                        {state.product.ratingsCollection &&
                          state.product.ratingsCollection.length}{" "}
                        ratings and{" "}
                        {state.product.reviews && state.product.reviews.length}{" "}
                        reviews
                      </strong>
                    </Typography>
                    <span
                      style={{
                        marginLeft: "12px",
                        verticalAlign: "middle",
                        fontSize: "20px",
                      }}
                    >
                      <img
                        style={{
                          marginTop: "-4px",
                          height: "18px",
                          verticalAlign: "middle",
                        }}
                        height="21"
                        src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                      />
                    </span>
                  </div>
                  <div>
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: "rgb(135, 135, 135)",
                        marginLeft: "10px",
                        marginTop: "30px",
                      }}
                    >
                      <strong>Available offers</strong>
                    </Typography>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ display: "flex" }}>
                        <img
                          src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                          width="18"
                          height="18"
                          style={{ marginLeft: "10px" }}
                        />
                        <span
                          style={{
                            color: "#212121",
                            fontWeight: "500",
                            paddingLeft: "10px",
                            // marginBottom: "20px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            style={{ marginLeft: "5px" }}
                          >
                            {" "}
                            <strong>Spacial offer</strong>
                            <span>
                              {" "}
                              Get extra 5% off (price inclusive of discount)
                            </span>
                          </Typography>
                        </span>
                      </span>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      <span style={{ display: "flex" }}>
                        <img
                          src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                          width="18"
                          height="18"
                          style={{ marginLeft: "10px" }}
                        />
                        <span
                          style={{
                            color: "#212121",
                            fontWeight: "500",
                            paddingLeft: "10px",
                            // marginBottom: "20px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            style={{ marginLeft: "5px" }}
                          >
                            {" "}
                            <strong>Bank offer</strong>
                            <span>
                              {" "}
                              5% Unlimited Cashback on Flipkart Axis Bank Credit
                              Card
                            </span>
                          </Typography>
                        </span>
                      </span>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      <span style={{ display: "flex" }}>
                        <img
                          src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                          width="18"
                          height="18"
                          style={{ marginLeft: "10px" }}
                        />
                        <span
                          style={{
                            color: "#212121",
                            fontWeight: "500",
                            paddingLeft: "10px",
                            // marginBottom: "20px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            style={{ marginLeft: "5px" }}
                          >
                            {" "}
                            <strong>Bank offer</strong>
                            <span>
                              {" "}
                              5% off* with Axis Bank Buzz Credit Card
                            </span>
                          </Typography>
                        </span>
                      </span>
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      <span style={{ display: "flex" }}>
                        <img
                          src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/49f16fff-0a9d-48bf-a6e6-5980c9852f11.png?q=90"
                          width="18"
                          height="18"
                          style={{ marginLeft: "10px" }}
                        />
                        <span
                          style={{
                            color: "#212121",
                            fontWeight: "500",
                            paddingLeft: "10px",
                            // marginBottom: "20px",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            style={{ marginLeft: "5px" }}
                          >
                            <span>
                              {" "}
                              No Cost EMI on Flipkart Axis Bank Credit Card
                            </span>
                          </Typography>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <br />
              <Divider variant="middle" />
              <div style={{ margin: "20px 0px 20px 30px" }}>
                <Typography variant="h6">
                  <strong>Product Details</strong>
                </Typography>
                <Typography>{state.product.description}</Typography>
              </div>
              <Divider variant="middle" />
              <div
                style={{
                  margin: "20px 0px 20px 30px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">
                  <strong>Ratings & Reviews</strong>
                </Typography>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      height: "25px",
                      padding: "2px 7px",
                      borderRadius: "14px",
                      fontSize: "16px",
                      backgroundColor: "#26a541",
                      verticalAlign: "baseline",
                      lineHeight: "normal",
                      display: "inline-block",
                      color: "#fff",
                      fontWeight: "900",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <span style={{ marginTop: "3px", marginLeft: "2px" }}>
                        <strong>{state.product.ratings}</strong>
                      </span>
                      <StarRateIcon
                        fontSize="small"
                        style={{ marginTop: "2px" }}
                      />
                    </div>
                  </div>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: "rgb(135, 135, 135)",
                      marginLeft: "10px",
                    }}
                  >
                    <strong>
                      {state.product.ratingsCollection &&
                        state.product.ratingsCollection.length}{" "}
                      ratings and{" "}
                      {state.product.reviews && state.product.reviews.length}{" "}
                      reviews
                    </strong>
                  </Typography>
                </div>

                <Button
                  onClick={handleClickOpen}
                  style={{
                    marginRight: "20px",
                    background: "#2874f0",
                    color: "white",
                  }}
                >
                  <strong>Rate product</strong>
                </Button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {"Use Google's location service?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Let Google help apps determine location. This means
                      sending anonymous location data to Google, even when no
                      apps are running.
                    </DialogContentText>
                  </DialogContent>

                  <div
                    style={{
                      marginLeft: "40px",
                      marginBottom: "20px",
                      display: "flex",
                    }}
                  >
                    <div>
                      <Typography variant="h6">
                        <strong style={{ color: "rgb(135, 135, 135)" }}>
                          Rate this product
                        </strong>
                      </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="gender"
                          name="gender1"
                          value={productRating}
                          onChange={handleRatings}
                        >
                          <FormControlLabel
                            value={5}
                            control={
                              <Radio
                                checked={isChecked.checked_5}
                                name="checked_5"
                              />
                            }
                            label={
                              <Rating
                                name="checked-5"
                                value={5}
                                max={5}
                                style={{ marginLeft: "10px", marginTop: "8px" }}
                              />
                            }
                          />
                          <FormControlLabel
                            value={4}
                            control={
                              <Radio
                                checked={isChecked.checked_4}
                                name="checked_4"
                              />
                            }
                            label={
                              <Rating
                                name="checked-4"
                                value={4}
                                max={4}
                                style={{ marginLeft: "10px", marginTop: "8px" }}
                              />
                            }
                          />
                          <FormControlLabel
                            value={3}
                            control={
                              <Radio
                                checked={isChecked.checked_3}
                                name="checked_3"
                              />
                            }
                            label={
                              <Rating
                                name="checked-3"
                                value={3}
                                max={3}
                                style={{ marginLeft: "10px", marginTop: "8px" }}
                              />
                            }
                          />
                          <FormControlLabel
                            value={2}
                            control={
                              <Radio
                                checked={isChecked.checked_2}
                                name="checked_2"
                              />
                            }
                            label={
                              <Rating
                                name="checked-2"
                                value={2}
                                max={2}
                                style={{ marginLeft: "10px", marginTop: "8px" }}
                              />
                            }
                          />
                          <FormControlLabel
                            value={1}
                            control={
                              <Radio
                                checked={isChecked.checked_1}
                                name="checked_1"
                              />
                            }
                            label={
                              <Rating
                                name="checked-1"
                                value={1}
                                max={1}
                                style={{ marginLeft: "10px", marginTop: "8px" }}
                              />
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div style={{ marginLeft: "40px" }}>
                      <Typography variant="h6" style={{ marginBottom: "20px" }}>
                        <strong style={{ color: "rgb(135, 135, 135)" }}>
                          Say something about the product
                        </strong>
                      </Typography>
                      <TextField
                        style={{ marginLeft: "20px" }}
                        id="outlined-multiline-flexible"
                        label="Comment here"
                        error={errorReviews === "" ? false : true}
                        helperText={errorReviews}
                        multiline
                        rowsMax={4}
                        value={content}
                        onChange={(e) => {
                          setErrorReviews("");
                          setContent(e.target.value);
                        }}
                        variant="outlined"
                      />
                    </div>
                  </div>
                  <DialogActions>
                    <Button
                      onClick={handleReview}
                      style={{
                        background: "#2874f0",
                        color: "white",
                        width: "100%",
                      }}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <Divider variant="middle" />
            </Paper>
          </div>
        </Grid>
      ) : (
        <h1>Loading...</h1>
      )}
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
                    image={`${BASE_URL}${prod.photo[0].img}`}
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
                          defaultValue={prod.ratings}
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
                        <strong>₹{prod.price}</strong>
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
    </Container>
  );
};

export default Singleproduct;

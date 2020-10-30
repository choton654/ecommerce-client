import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useStyles } from "../layout/theme";
import axios from "axios";
import BASE_URL from "../../api";
import { ProductContext } from "./productcontext";
import {
  Container,
  Grid,
  Paper,
  Typography,
  FormControl,
  Input,
  InputLabel,
  Button,
  TextField,
  Tab,
  TabScrollButton,
  Tabs,
  Box,
  AppBar,
} from "@material-ui/core";
// import { TabPanel, TabContext, TabList } from "@material-ui/lab";
import { useSnackbar } from "notistack";

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

const Createproducts = () => {
  const { state, dispatch } = useContext(ProductContext);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user._id;
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState([]);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlePhoto = (e) => {
    setPhoto([...photo, e.target.files[0]]);
  };
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("price", parseInt(price));
  data.append("count", parseInt(count));
  data.append("brand", brand);
  data.append("category", category);
  for (let i = 0; i < photo.length; i++) {
    data.append("photo", photo[i]);
  }
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = () => {
    axios
      .get(`${BASE_URL}/product/api/getallproducts`)
      .then((res) => {
        console.log(res.data.products);
        const allProducts = res.data.products;
        dispatch({ type: "GET_ALL_PRODUCTS", payload: allProducts });
      })
      .catch((err) => console.log(err));
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log(photo);
    axios
      .post(`${BASE_URL}/product/api/${id}/addproduct`, data, {
        headers: {
          Authorization: `Barer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.err) {
          const error = res.data.err;
          dispatch({ type: "ERROR", payload: error });
        } else {
          const { product, success } = res.data;
          console.log(product);
          dispatch({ type: "ADD_PRODUCT", payload: product });
          enqueueSnackbar(success, { variant: "success" });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        const error = err.response.data;
        dispatch({ type: "ERROR", payload: error });
      });
  };
  return (
    <Container className={classes.root}>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={4}>
          <Paper
            className={classes.paper}
            style={{
              background: "whitesmoke",
              height: "500px",
              border: "2px solid lightblue",
            }}
          >
            <Typography variant="h6">Add Products</Typography>
            <br />
            <form onSubmit={handleClick}>
              <FormControl
                margin="dense"
                style={{ marginRight: "1rem", width: "60%" }}
              >
                <div className={classes.userfield}>
                  <InputLabel htmlFor="prodname">Name</InputLabel>
                  <Input
                    id="prodname"
                    name="prod_name"
                    type="text"
                    inputProps={{ "aria-label": "description" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                  />
                </div>
              </FormControl>
              <br />
              <FormControl
                margin="dense"
                style={{ marginRight: "1rem", width: "60%" }}
              >
                <div className={classes.userfield}>
                  <InputLabel htmlFor="proddesc">Description</InputLabel>
                  <Input
                    id="proddesc"
                    name="prod_desc"
                    type="text"
                    inputProps={{ "aria-label": "description" }}
                    value={description}
                    onChange={(e) => setDesc(e.target.value)}
                    required={true}
                  />
                </div>
              </FormControl>
              <br />
              <FormControl
                margin="dense"
                style={{ marginRight: "1rem", width: "60%" }}
              >
                <div className={classes.userfield}>
                  <InputLabel htmlFor="prodprice">Price</InputLabel>
                  <Input
                    id="prodprice"
                    name="prod_price"
                    type="text"
                    inputProps={{ "aria-label": "description" }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required={true}
                  />
                </div>
              </FormControl>
              <br />
              <FormControl
                margin="dense"
                style={{ marginRight: "1rem", width: "60%" }}
              >
                <div className={classes.userfield}>
                  <InputLabel htmlFor="prodcount">Count</InputLabel>
                  <Input
                    id="prodcount"
                    name="prod_count"
                    type="text"
                    inputProps={{ "aria-label": "description" }}
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    variant="outlined"
                  />
                </div>
              </FormControl>
              <br />
              <FormControl
                margin="dense"
                style={{ marginRight: "1rem", width: "60%" }}
              >
                <div className={classes.userfield}>
                  <InputLabel htmlFor="prodbrand">Brand</InputLabel>
                  <Input
                    id="prodbrand"
                    name="prod_brand"
                    type="text"
                    inputProps={{ "aria-label": "description" }}
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    variant="outlined"
                  />
                </div>
              </FormControl>
              <br />
              <FormControl
                margin="dense"
                style={{ marginRight: "1rem", width: "60%" }}
              >
                <div className={classes.userfield}>
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Input
                    id="category"
                    name="prod_cat"
                    type="text"
                    inputProps={{ "aria-label": "description" }}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    variant="outlined"
                  />
                </div>
              </FormControl>
              <br />
              <FormControl
                margin="dense"
                style={{ marginRight: "1rem", width: "60%" }}
              >
                <div className={classes.userfield}>
                  <InputLabel htmlFor="prodphoto">Photo</InputLabel>
                  <Input
                    id="prodphoto"
                    name="prod_photo"
                    type="file"
                    inputProps={{ "aria-label": "description" }}
                    onChange={handlePhoto}
                    variant="outlined"
                  />
                </div>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                type="submit"
                style={{ width: "50%", marginTop: "1rem", marginRight: "1rem" }}
              >
                Save
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper
            className={classes.paper}
            style={{
              background: "whitesmoke",
              height: "500px",
              border: "2px solid lightblue",
            }}
          >
            <Typography variant="h6">Products List</Typography>
            <div className={classes.tabroot}>
              {state.products && (
                <div className={classes.root}>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                    >
                      {state.products.map((prod) => (
                        <Tab
                          label={`${prod.name}`}
                          {...a11yProps(state.products.indexOf(prod))}
                        />
                      ))}
                    </Tabs>
                  </AppBar>
                  {state.products.map((prod) => (
                    <TabPanel
                      value={value}
                      index={state.products.indexOf(prod)}
                      style={{ background: "azure" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "left",
                            width: "50%",
                          }}
                        >
                          <Typography variant="h6">
                            <strong>Product Name:</strong> {prod.name}
                          </Typography>
                          <Typography>
                            <strong>About product:</strong> {prod.description}
                          </Typography>
                          <Typography>
                            <strong>Price:</strong> {prod.price}
                          </Typography>
                          <Typography>
                            <strong>No. of products:</strong> {prod.count}
                          </Typography>
                          <Typography>
                            <strong>Brand:</strong> {prod.brand}
                          </Typography>
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          {prod.photo &&
                            prod.photo.map((pic) => (
                              <img
                                src={pic.img}
                                style={{ height: "100px", width: "100px" }}
                              />
                            ))}
                        </div>
                      </div>
                    </TabPanel>
                  ))}
                </div>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Createproducts;

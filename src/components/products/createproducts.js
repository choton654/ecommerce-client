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
  Select,
  MenuItem,
} from "@material-ui/core";
import Adminresource from "../user/adminresource";
import { useSnackbar } from "notistack";
import Productlist from "./productlist";
import { CategoryContext } from "../category/categorycontext";
import Productdetails from "./productdetails";

const Createproducts = () => {
  const { catstate, catdispatch } = useContext(CategoryContext);
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

  const selectCategory =
    catstate.categories &&
    catstate.categories.filter((category) => category.parentId !== undefined);
  console.log(category);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [valuePic, setValuePic] = useState(0);
  const picChange = (event, newValue) => {
    setValuePic(newValue);
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
  const deleteProd = (productid) => {
    axios
      .delete(`${BASE_URL}/product/api/${productid}/${id}/deleteproduct`, {
        headers: {
          Authorization: `Barer ${token}`,
        },
      })
      .then((res) => {
        const delProd = res.data.msg;
        enqueueSnackbar(delProd, { variant: "success" });
        dispatch({ type: "DELETE_PROD", payload: productid });
        setValue(0);
      })
      .catch((err) => console.log(err));
  };
  const picDelete = (picid, productid) => {
    console.log("delete", picid, productid);
    axios
      .delete(`${BASE_URL}/product/api/${productid}/${id}/deletepic/${picid}`, {
        headers: {
          Authorization: `Barer ${token}`,
        },
      })
      .then((res) => {
        const photo = res.data.product.photo;
        dispatch({ type: "DELETE_PROD_PIC", payload: { productid, photo } });
      })
      .catch((err) => console.log(err));
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const editProduct = () => {
    setOpen(true);
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
              border: "2px solid #287aed",
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
                    autoFocus
                    fullWidth
                    margin="dense"
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
                    autoFocus
                    fullWidth
                    margin="dense"
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
                    autoFocus
                    fullWidth
                    margin="dense"
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
                    autoFocus
                    fullWidth
                    margin="dense"
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
                    autoFocus
                    fullWidth
                    margin="dense"
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

              <div>
                <FormControl style={{ marginRight: "1rem", width: "60%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {selectCategory.map((category, idx) => (
                      <MenuItem key={idx} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <br />
              <FormControl
                margin="dense"
                style={{ marginRight: "1rem", width: "60%" }}
              >
                <div className={classes.userfield}>
                  <InputLabel htmlFor="prodphoto">Photo</InputLabel>
                  <Input
                    autoFocus
                    fullWidth
                    margin="dense"
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
            className={classes.paper5}
            style={{
              background: "whitesmoke",
              // height: "120%",
              border: "2px solid #287aed",
            }}
          >
            <Productlist
              editProduct={editProduct}
              deleteProduct={deleteProd}
              open={open}
              close={handleClose}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Adminresource(Createproducts);

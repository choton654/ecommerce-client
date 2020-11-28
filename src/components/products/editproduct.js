import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { useStyles } from "../layout/theme";
import axios from "axios";
import BASE_URL from "../../api";
import { ProductContext } from "./productcontext";
import { CategoryContext } from "../category/categorycontext";
import { useParams } from "react-router-dom";
const Editproduct = ({ open, close }) => {
  const { state, dispatch } = useContext(ProductContext);
  const { catstate, catdispatch } = useContext(CategoryContext);
  const { productid } = useParams();
  let selectCategory;
  const [singleProduct, setSingleproduct] = useState({});
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = (e) => {
    axios
      .get(`${BASE_URL}/product/api/${productid}/getproduct`)
      .then((res) => {
        const { product } = res.data;
        setSingleproduct(product);
        // dispatch({ type: "PRODUCT", payload: { product, diffProducts } });
        setName(product.name);
        setDesc(product.description);
        setPrice(product.price);
        setCount(product.count);
        setBrand(product.brand);
        setCategory(product.category.name);
      })
      .catch((err) => console.log(err));
  };

  if (catstate) {
    selectCategory = catstate.categories.filter(
      (category) => category.parentid !== null
    );
  } else {
    console.log("no cat");
  }

  const classes = useStyles();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user._id;
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const submitProduct = () => {
    axios
      .put(
        `${BASE_URL}/product/api/${productid}/${id}/updateproduct`,
        {
          name,
          description,
          price,
          count,
          brand,
          category,
        },
        {
          headers: {
            Authorization: `Barer ${token}`,
          },
        }
      )
      .then((res) => {
        const { updatedProduct } = res.data;
        const item = updatedProduct;
        console.log(item);
        dispatch({ type: "EDIT_PRODUCT", payload: { item, productid } });
        close();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent style={{ width: "350px" }}>
          <FormControl
            margin="dense"
            style={{ marginRight: "1rem", width: "95%" }}
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
            style={{ marginRight: "1rem", width: "95%" }}
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
            style={{ marginRight: "1rem", width: "95%" }}
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
            style={{ marginRight: "1rem", width: "95%" }}
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
            style={{ marginRight: "1rem", width: "95%" }}
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
            <FormControl style={{ marginRight: "1rem", width: "95%" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {selectCategory.map((category) => (
                  <MenuItem key={category._id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={submitProduct} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Editproduct;

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
  TextField,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { useStyles } from "../layout/theme";
import axios from "axios";
import BASE_URL from "../../api";
import { ProductContext } from "./productcontext";

const Editproduct = ({ open, close, productid }) => {
  const { state, dispatch } = useContext(ProductContext);
  const singleProduct = state
    ? state.products.find(
        (prod) => prod._id.toString() === productid.toString()
      )
    : null;
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user._id;
  const [name, setName] = useState(singleProduct.name);
  const [description, setDesc] = useState(singleProduct.description);
  const [price, setPrice] = useState(singleProduct.price);
  const [count, setCount] = useState(singleProduct.count);
  const [brand, setBrand] = useState(singleProduct.brand);
  const [category, setCategory] = useState(
    singleProduct.category && singleProduct.category.name
  );
  const submitProduct = () => {
    console.log(singleProduct);
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
    <div>
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
          <FormControl
            margin="dense"
            style={{ marginRight: "1rem", width: "95%" }}
          >
            <div className={classes.userfield}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Input
                autoFocus
                fullWidth
                margin="dense"
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
    </div>
  );
};

export default Editproduct;

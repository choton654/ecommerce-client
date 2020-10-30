import React, { useContext, useState, useEffect } from "react";
import { Divider, Paper, Typography } from "@material-ui/core";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { useStyles } from "../layout/theme";
import { CategoryContext } from "./categorycontext";
// import { ProductContext } from "../products/productcontext";
import axios from "axios";
import BASE_URL from "../../api";

const Filterproduct = ({ prodbrand, subcatid }) => {
  const { catstate, catdispatch } = useContext(CategoryContext);
  const classes = useStyles();
  const [state, setBrand] = useState(null);
  console.log(state);
  useEffect(() => {
    if (state) {
      filterProduct();
    }
  }, [state]);

  const filterProduct = () => {
    const filters = state;
    console.log(filters);
    axios
      .post(`${BASE_URL}/product/api/${subcatid}/filter`, { filters })
      .then((res) => {
        const { product } = res.data;
        console.log(product);
        catdispatch({ type: "FILTER_PRODUCT", payload: product });
      })
      .catch((err) => console.log(err));
  };
  let brand = [];
  if (prodbrand) {
    for (let i = 0; i < prodbrand.length; i++) {
      brand.push({
        label: `${prodbrand[i]}`,
        value: prodbrand[i],
        brand: `${prodbrand[i]}`,
      });
    }
  }

  return (
    <Paper
      className={classes.paper}
      style={{
        height: "500px",
        cursor: "pointer",
        background: "white",
        border: "3px solid lightblue",
      }}
    >
      <Typography variant="h6">
        <strong>Filters</strong>
      </Typography>
      <Divider style={{ width: "100%", marginTop: "10px" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          <strong>Brand</strong>
        </Typography>
        <ReactMultiSelectCheckboxes
          getDropdownButtonLabel={({ placeholderButtonLabel, value }) => {
            return (placeholderButtonLabel = "Select the product brand...");
          }}
          onChange={setBrand}
          options={brand}
          placeholderButtonLabel="Select the product brand..."
          rightAligned={true}
          style={{ width: "100%" }}
        />
      </div>
    </Paper>
  );
};

export default Filterproduct;

import React, { useContext, useState, useEffect } from "react";
import {
  Checkbox,
  Divider,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  Slider,
  Typography,
} from "@material-ui/core";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { useStyles } from "../layout/theme";
import { CategoryContext } from "./categorycontext";
// import { ProductContext } from "../products/productcontext";
import axios from "axios";
import BASE_URL from "../../api";
const priceRange = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

const Filterproduct = ({ prodbrand, subcatid, subcatname }) => {
  const { catstate, catdispatch } = useContext(CategoryContext);
  const classes = useStyles();
  const [brandName, setBeandName] = useState([]);
  const [price, setPrice] = useState([30, 70]);
  const [min, setMinMoney] = useState(0);
  const [max, setMaxMoney] = useState(500);
  const priceBySubcategory = {
    subcatname,
    priceRange,
  };
  const handleBrandChange = (event) => {
    setBeandName(event.target.value);
  };
  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };
  const handleMinMoneyChange = (event) => {
    setMinMoney(event.target.value);
  };
  const handleMaxMoneyChange = (event) => {
    setMaxMoney(event.target.value);
  };
  function valuetext() {
    return `Rs.${price * 10}`;
  }
  // console.log(price);
  console.log(parseInt(min), parseInt(max));
  useEffect(() => {
    if (max || min || brandName) {
      filterProduct();
    }
  }, [max, brandName, min]);

  const filterProduct = () => {
    const money = [parseInt(min), parseInt(max)];
    const filters = [{ brand: brandName }, { price: money }];
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

  return (
    <Paper
      // className={classes.paper}
      style={{
        height: "500px",
        cursor: "pointer",
        background: "white",
        padding: "10px 15px",
        border: "3px solid lightblue",
      }}
    >
      <Typography variant="h6">
        <strong>Filters</strong>
      </Typography>
      <Divider style={{ width: "100%", marginTop: "10px" }} />
      <div>
        <Typography id="range-slider" gutterBottom>
          <strong>Price</strong>
        </Typography>
        <Slider
          value={price}
          step={10}
          defaultValue={30}
          scale={(x) => x * 5}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <FormControl>
            <NativeSelect
              value={min}
              onChange={handleMinMoneyChange}
              inputProps={{
                name: "age",
                id: "age-native-label-placeholder",
              }}
            >
              <option value={0}>Min</option>
              {priceRange.map((currency) => (
                <option value={currency}>{currency}</option>
              ))}
            </NativeSelect>
          </FormControl>

          <Typography variant="subtitle1">to</Typography>

          <FormControl>
            <NativeSelect
              value={max}
              onChange={handleMaxMoneyChange}
              inputProps={{
                name: "age",
                id: "age-native-label-placeholder",
              }}
            >
              {priceRange.map((currency) => (
                <option value={currency}>{currency}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
      </div>
      <Divider
        style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle1">
          <strong>Brand</strong>
        </Typography>
        <FormControl>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={brandName}
            onChange={handleBrandChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {prodbrand.map((brand) => (
              <MenuItem key={brand} value={brand}>
                <Checkbox checked={brandName.indexOf(brand) > -1} />
                <ListItemText primary={brand} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Paper>
  );
};

export default Filterproduct;

import React, { useContext, useState, useEffect } from "react";
import {
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  Slider,
  Typography,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useStyles } from "../layout/theme";
import { CategoryContext } from "./categorycontext";
// import { ProductContext } from "../products/productcontext";
import axios from "axios";
import BASE_URL from "../../api";
const priceRange = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
const smallPriceRange = priceRange.map((price) => price * 5);
const marks = smallPriceRange.map((mark) => ({
  value: mark,
  label: `${mark}`,
}));
console.log(marks);
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Filterproduct = ({ prodbrand, subcatid, subcatname }) => {
  const { catstate, catdispatch } = useContext(CategoryContext);
  const classes = useStyles();
  const [brandName, setBeandName] = useState([]);
  const [price, setPrice] = useState([30, 70]);
  const [min, setMinMoney] = useState(0);
  const [max, setMaxMoney] = useState(2500);
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
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
  console.log(price);
  console.log(parseInt(min), parseInt(max));
  useEffect(() => {
    if (max || min || brandName || subcatname) {
      catstate.product_by_choice.length = 0;
      filterProduct();
    }
  }, [max, brandName, min, subcatname]);

  const filterProduct = () => {
    const money = [parseInt(min), parseInt(max)];
    const filters = [{ brand: brandName }, { price: money }];
    // console.log(filters);
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
        border: "3px solid #287aed",
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
          scale={(x) => x * 25}
          valueLabelDisplay="auto"
          onChange={handlePriceChange}
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
              {smallPriceRange.map((currency) => (
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
              {smallPriceRange.map((currency) => (
                <option value={currency}>{currency}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
      </div>
      <Divider
        style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}
      />
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={prodbrand}
        disableCloseOnSelect
        onChange={(e, value) => setBeandName(value)}
        getOptionLabel={(option) => option}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </React.Fragment>
        )}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            // variant="outlined"
            label="Brand"
            placeholder="Favorites"
          />
        )}
      />
      ;
    </Paper>
  );
};

export default Filterproduct;

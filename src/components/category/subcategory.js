import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../api";
import { CategoryContext } from "./categorycontext";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Tab,
  Tabs,
  CardHeader,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useStyles } from "../layout/theme";
import Filterproduct from "./filterproduct";
const Subcategory = () => {
  const classes = useStyles();
  const { catstate, catdispatch } = useContext(CategoryContext);

  const { id, name } = useParams();
  const history = useHistory();
  const [choice, setChoice] = useState({
    order: "",
    sortBy: "",
    limit: 6,
  });
  useEffect(() => {
    if (name) {
      catstate.filtered_prod.length = 0;
      catstate.product_by_choice.length = 0;
      getProductByCategory();
    }
  }, [name]);

  const getProductByCategory = () => {
    axios
      .get(`${BASE_URL}/product/api/${id}/bycategory`)
      .then((res) => {
        const { product } = res.data;
        catdispatch({ type: "PRODUCT_BY_CAT", payload: product });
      })
      .catch((err) => {
        const error = err.response.data;
        catdispatch({ type: "ERROR", payload: error });
      });
  };
  const getProductByChoice = () => {
    axios
      .get(
        `${BASE_URL}/product/api/${id}/choice?order=${choice.order}&sortBy=${choice.sortBy}&limit=${choice.limit}`
      )
      .then((res) => {
        const { product } = res.data;
        catdispatch({ type: "PRODUCT_BY_CHOICE", payload: product });
      })
      .catch((err) => {
        const error = err.response.data;
        catdispatch({ type: "ERROR", payload: error });
      });
  };
  const ascClick = () => {
    setChoice({ ...choice, order: "asc" });
    getProductByChoice();
  };
  const descClick = () => {
    setChoice({ ...choice, order: "desc" });
    getProductByChoice();
  };
  const newClick = () => {
    setChoice({ ...choice, sortBy: "createdAt" });
    getProductByChoice();
  };

  const brand = catstate && catstate.product_cat.map((prod) => prod.brand);
  console.log(catstate.filtered_prod);

  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={4} sm={3}>
          <Filterproduct prodbrand={brand} subcatid={id} subcatname={name} />
        </Grid>
        <Grid item xs={8} sm={9}>
          <Paper
            style={{ background: "whitesmoke", border: "3px solid #287aed" }}
          >
            <div>
              <Typography
                varient="h6"
                style={{
                  display: "flex",
                  marginLeft: "20px",
                  paddingTop: "20px",
                }}
              >
                <strong>{name}</strong>
              </Typography>
              <div style={{ display: "flex", marginLeft: "20px" }}>
                <Typography
                  color="secondary"
                  variant="subtitle1"
                  style={{
                    marginTop: "17px",
                  }}
                >
                  <strong>Sort By:</strong>
                </Typography>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "20px",
                    marginTop: "17px",
                  }}
                >
                  <Typography
                    color="primary"
                    variant="subtitle1"
                    onClick={ascClick}
                    style={{ cursor: "pointer" }}
                  >
                    <strong>Price---Low to high</strong>
                  </Typography>
                  <Typography
                    color="primary"
                    variant="subtitle1"
                    onClick={descClick}
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                  >
                    <strong>Price---High to Low</strong>
                  </Typography>
                  <Typography
                    color="primary"
                    variant="subtitle1"
                    onClick={newClick}
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                  >
                    <strong>Newest Products</strong>
                  </Typography>
                </div>
              </div>
              {catstate.product_by_choice.length === 0 ? (
                <div
                  className={classes.paper}
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                  }}
                >
                  {catstate.filtered_prod.map((product) => (
                    <Card
                      key={product._id}
                      className={classes.cardroot}
                      style={{
                        background: "lightblue",
                        marginLeft: "20px",
                        cursor: "pointer",
                      }}
                    >
                      <CardMedia
                        className={classes.media}
                        image={product.photo[0].img}
                        onClick={(e) => {
                          history.push(`/${product._id}/product`);
                        }}
                        title="Product"
                      />
                      <CardContent
                        style={{ padding: "0px", paddingBottom: "16px" }}
                      >
                        <div style={{ display: "flex" }}>
                          <IconButton aria-label="add to favorites">
                            <FavoriteIcon fontSize="small" />
                            <FavoriteIcon fontSize="small" />
                            <FavoriteIcon fontSize="small" />
                            <FavoriteIcon fontSize="small" />
                            <FavoriteIcon fontSize="small" />
                          </IconButton>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            component="p"
                            style={{
                              paddingTop: "10px",
                              marginLeft: "40px",
                            }}
                          >
                            <span>Rs.</span>
                            {product.price}
                          </Typography>
                        </div>

                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          component="p"
                        >
                          {product.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div
                  className={classes.paper}
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                  }}
                >
                  {catstate.product_by_choice.map((product) => (
                    <Card key={product._id} className={classes.cardroot}>
                      <CardMedia
                        className={classes.media}
                        image={product.photo[0].img}
                        onClick={(e) => {
                          history.push(`/${product._id}/product`);
                        }}
                        title="Product"
                      />
                      <CardContent
                        style={{ padding: "0px", paddingBottom: "16px" }}
                      >
                        <div style={{ display: "flex" }}>
                          <IconButton aria-label="add to favorites">
                            <FavoriteIcon fontSize="small" />
                            <FavoriteIcon fontSize="small" />
                            <FavoriteIcon fontSize="small" />
                            <FavoriteIcon fontSize="small" />
                            <FavoriteIcon fontSize="small" />
                          </IconButton>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            component="p"
                            style={{
                              paddingTop: "10px",
                              marginLeft: "40px",
                            }}
                          >
                            <span>Rs.</span>
                            {product.price}
                          </Typography>
                        </div>

                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          component="p"
                        >
                          {product.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Subcategory;

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
} from "@material-ui/core";
import { useStyles } from "../layout/theme";
import Filterproduct from "./filterproduct";
const Subcategory = () => {
  const classes = useStyles();
  const { catstate, catdispatch } = useContext(CategoryContext);

  const { id, name } = useParams();
  const history = useHistory();
  const [choice, setChoice] = useState({
    order: "asc",
    sortBy: "price",
    limit: 6,
  });
  useEffect(() => {
    if (name) {
      catstate.filtered_prod = [];
      getProductByChoice();
    }
  }, [name]);

  const getProductByChoice = () => {
    // console.log(id);
    axios
      .get(
        `${BASE_URL}/product/api/${id}/choice?order=${choice.order}&sortBy=${choice.sortBy}&limit=${choice.limit}`
      )
      .then((res) => {
        const { product } = res.data;
        catdispatch({ type: "PRODUCT_BY_CAT", payload: product });
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
          <Filterproduct prodbrand={brand} subcatid={id} />
        </Grid>
        <Grid item xs={8} sm={9}>
          <Paper
            style={{ background: "whitesmoke", border: "3px solid lightblue" }}
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
                {name}
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
              {catstate.filtered_prod.length === 0
                ? catstate.product_cat.map((product) => (
                    <div
                      key={product._id}
                      className={classes.paper}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{ display: "flex", cursor: "pointer" }}
                        onClick={(e) => history.push(`/${product._id}/product`)}
                      >
                        <img
                          src={product.photo && product.photo[0].img}
                          alt="no image"
                          style={{ height: "200px", width: "100px" }}
                        />
                        <Card
                          variant="outlined"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "20px",
                            background: "whitesmoke",
                          }}
                        >
                          <CardContent
                            style={{
                              width: "300px",
                              textAlign: "initial",
                              paddingTop: "0px",
                            }}
                          >
                            <Typography varient="h1">{product.name}</Typography>
                            <Typography varient="h6">
                              {product.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </div>
                      <h1> Rs.{product.price}</h1>
                    </div>
                  ))
                : catstate.filtered_prod.map((product) => (
                    <div
                      key={product._id}
                      className={classes.paper}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{ display: "flex", cursor: "pointer" }}
                        onClick={(e) => history.push(`/${product._id}/product`)}
                      >
                        <img
                          src={product.photo && product.photo[0].img}
                          alt="no image"
                          style={{ height: "200px", width: "100px" }}
                        />
                        <Card
                          variant="outlined"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "20px",
                            background: "whitesmoke",
                          }}
                        >
                          <CardContent
                            style={{
                              width: "300px",
                              textAlign: "initial",
                              paddingTop: "0px",
                            }}
                          >
                            <Typography varient="h1">{product.name}</Typography>
                            <Typography varient="h6">
                              {product.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </div>
                      <h1> Rs.{product.price}</h1>
                    </div>
                  ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Subcategory;

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
  Box,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
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

  const allbrand = catstate && catstate.product_cat.map((prod) => prod.brand);
  const uniquebrand = [...new Set(allbrand)];
  console.log(uniquebrand);
  console.log(catstate.filtered_prod);

  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="row">
        <Box
          style={{
            flex: "0 0 280px",
            maxWidth: "280px",
            padding: "0px 10px 0px 0px",
            flexDirection: "column",
          }}
        >
          <Filterproduct
            prodbrand={uniquebrand}
            subcatid={id}
            subcatname={name}
          />
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            overflow: "hidden",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h6">{name}</Typography>
            <div
              style={{
                display: "flex",
                width: "100%",
                backgroundColor: "rgb(255, 255, 255)",
                alignItems: "flex-end",
                flexDirection: "row",
              }}
            >
              <div style={{ display: "flex", marginLeft: "30px" }}>
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
            </div>
            <div
              style={{
                display: "block",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  background: "rgb(255, 255, 255)",
                }}
              >
                {catstate.product_by_choice.length === 0 ? (
                  <div
                    className={classes.paper}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {catstate.filtered_prod.map((product) => (
                      <div
                        style={{
                          display: "block",
                          width: "25%",
                        }}
                      >
                        <div
                          style={{
                            margin: "0px 8px",
                            position: "relative",
                            transition: "box-shadow 0.2s ease-in-out 0s",
                            height: "100%",
                            filter: "none",
                            overflow: "hidden",
                          }}
                        >
                          <div>
                            <div>
                              <div
                                style={{
                                  paddingTop: "120%",
                                  width: "100%",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    //   position: "absolute",
                                    //   top: "0",
                                    //   left: "0",
                                    //   width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Card
                                    key={product._id}
                                    className={classes.cardroot}
                                  >
                                    <CardMedia
                                      style={{
                                        border: "2px solid rgb(135, 135, 135)",
                                        marginTop: "10px",
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        bottom: "0",
                                        right: "0",
                                        maxWidth: "91.6%",
                                        maxHeight: "100%",
                                        transition: "opacity .5s linear",
                                        opacity: "1",
                                        // margin: "auto",
                                        zIndex: "0",
                                      }}
                                      onClick={(e) => {
                                        history.push(`/${product._id}/${name}`);
                                      }}
                                      image={`${BASE_URL}${product.photo[0].img}`}
                                      alt="no-image"
                                    />
                                  </Card>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              marginLeft: "10px",
                              border: "2px solid rgb(135, 135, 135)",
                              width: "80%",
                              padding: "5px 16px 8px",
                              background: "rgb(255, 255, 255)",
                            }}
                          >
                            <div
                              style={{
                                color: "rgb(135, 135, 135)",
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              {product.brand}
                            </div>
                            <a
                              style={{
                                display: "inline-block",
                                width: "calc(100% - 80px)",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                padding: "0px",
                              }}
                            >
                              {product.name}
                            </a>
                            <div
                              style={{
                                display: "inline-block",
                                fontSize: "0px",
                              }}
                            >
                              <img
                                height="18"
                                src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                              />
                            </div>
                            <Rating
                              name="half-rating"
                              defaultValue={2.5}
                              precision={0.5}
                              style={{
                                paddingTop: "10px",
                                paddingLeft: "10px",
                              }}
                            />
                            <div>
                              <strong>₹{product.price}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className={classes.paper}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {catstate.product_by_choice.map((product) => (
                      <div
                        style={{
                          display: "block",
                          width: "25%",
                        }}
                      >
                        <div
                          style={{
                            margin: "0px 8px",
                            position: "relative",
                            transition: "box-shadow 0.2s ease-in-out 0s",
                            height: "100%",
                            filter: "none",
                            overflow: "hidden",
                          }}
                        >
                          <div>
                            <div>
                              <div
                                style={{
                                  paddingTop: "120%",
                                  width: "100%",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    //   position: "absolute",
                                    //   top: "0",
                                    //   left: "0",
                                    //   width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Card
                                    key={product._id}
                                    className={classes.cardroot}
                                  >
                                    <CardMedia
                                      style={{
                                        border: "2px solid rgb(135, 135, 135)",
                                        marginTop: "10px",
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        bottom: "0",
                                        right: "0",
                                        maxWidth: "91.6%",
                                        maxHeight: "100%",
                                        transition: "opacity .5s linear",
                                        opacity: "1",
                                        // margin: "auto",
                                        zIndex: "0",
                                      }}
                                      onClick={(e) => {
                                        history.push(`/${product._id}/product`);
                                      }}
                                      image={`${BASE_URL}${product.photo[0].img}`}
                                      alt="no-image"
                                    />
                                  </Card>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              marginLeft: "10px",

                              border: "2px solid rgb(135, 135, 135)",
                              width: "80%",
                              padding: "5px 16px 8px",
                              transitionProperty: "transform",
                              transitionDuration: "0.35s, 0.35s",
                              transitionDelay: "0s, 0s",
                              transitionTimingFunction:
                                "cubic-bezier(0.17, 0.67, 0.21, 1), cubic-bezier(0.17, 0.67, 0.21, 1)",
                              willChange: "transform",
                              position: "relative",
                              background: "rgb(255, 255, 255)",
                              zIndex: "2",
                              transform: "translate3d(0px, 0px, 0px)",
                            }}
                          >
                            <div
                              style={{
                                color: "rgb(135, 135, 135)",
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              {product.brand}
                            </div>
                            <a
                              style={{
                                display: "inline-block",
                                width: "calc(100% - 80px)",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                padding: "0px",
                              }}
                            >
                              {product.name}
                            </a>
                            <div
                              style={{
                                display: "inline-block",
                                fontSize: "0px",
                              }}
                            >
                              <img
                                height="18"
                                src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                              />
                            </div>
                            <Rating
                              name="half-rating"
                              defaultValue={2.5}
                              precision={0.5}
                              style={{
                                paddingTop: "10px",
                                paddingLeft: "10px",
                              }}
                            />
                            <div>
                              <strong>₹{product.price}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Subcategory;

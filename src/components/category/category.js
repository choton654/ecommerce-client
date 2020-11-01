import React, { useContext, useEffect, useState } from "react";
import { Paper, Menu, MenuItem, Divider, Typography } from "@material-ui/core";
import { useStyles } from "../layout/theme";
import { CategoryContext } from "./categorycontext";
import axios from "axios";
import BASE_URL from "../../api";
import { Link } from "react-router-dom";

const Category = () => {
  const classes = useStyles();
  const { catstate, catdispatch } = useContext(CategoryContext);
  useEffect(() => {
    if (catstate.categories) {
      getCategory();
    }
  }, []);
  const getCategory = () => {
    axios
      .get(`${BASE_URL}/category/api/getcategory`)
      .then((res) => {
        // console.log(res.data.category);
        const categories = res.data.category;
        catdispatch({ type: "ADD_CATEGORY", payload: categories });
      })
      .catch((err) => console.log(err));
  };
  const [subcatMenu, setSubCatMenu] = useState(null);
  const isSubCatMenuOpen = Boolean(subcatMenu);
  const subCatMenuOpen = (event, id) => {
    const subCatArr = catstate.categories.filter((subcat) => {
      if (
        subcat.parentId !== undefined &&
        subcat.parentId._id.toString() === id.toString()
      ) {
        return subcat;
      } else {
        return null;
      }
    });

    catdispatch({ type: "SUBCATEGORY", payload: subCatArr });
    setSubCatMenu(event.currentTarget);
  };
  const handleSubCatMenuClose = () => {
    setSubCatMenu(null);
  };
  return (
    <div className={classes.mainpaper}>
      <Paper
        square="true"
        className={classes.paper1}
        style={{ paddingTop: "20px" }}
      >
        {catstate ? (
          catstate.categories.map(
            (cat) =>
              cat.parentId === undefined && (
                <div key={cat._id}>
                  <Typography
                    variant="subtitle1"
                    className={classes.paperItem}
                    style={{ cursor: "pointer" }}
                    onMouseOver={(event) => {
                      subCatMenuOpen(event, cat._id);
                      console.log(cat._id);
                    }}
                  >
                    <strong>{cat.name}</strong>
                  </Typography>
                  <Menu
                    anchorEl={subcatMenu}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    id="primary-search-account-menu"
                    // keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={isSubCatMenuOpen}
                    onClose={handleSubCatMenuClose}
                    style={{ marginLeft: "30px" }}
                  >
                    {catstate.subcategories ? (
                      catstate.subcategories.map((subcat) => (
                        <div>
                          <Link
                            to={`/${subcat._id}/subcategory/${subcat.name}`}
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem>
                              <Typography variant="subtitle1">
                                {subcat.name}
                              </Typography>
                            </MenuItem>
                          </Link>
                          <Divider />
                        </div>
                      ))
                    ) : (
                      <h1>Loading...</h1>
                    )}
                  </Menu>
                </div>
              )
          )
        ) : (
          <h1>Loading...</h1>
        )}
      </Paper>
    </div>
  );
};

export default Category;

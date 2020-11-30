import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Collapse,
  List,
  ListItem,
} from "@material-ui/core";
import { useStyles } from "../layout/theme";
import { CategoryContext } from "./categorycontext";
import axios from "axios";
import BASE_URL from "../../api";
import { Link, useHistory } from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
const Category = () => {
  const history = useHistory();
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
  const [open, setOpen] = useState(true);
  const [subcatMenu2, setSubCatMenu2] = useState(null);
  const isSubCatMenuOpen2 = Boolean(subcatMenu2);
  const subCatMenu2Open = (event, id) => {
    const subCatArr2 = catstate.categories.filter((subcat) => {
      if (
        subcat.parentId !== undefined &&
        subcat.parentId._id.toString() === id.toString()
      ) {
        setOpen(!open);
        return subcat;
      } else {
        return null;
      }
    });

    catdispatch({ type: "SUBCATEGORY2", payload: subCatArr2 });
    setSubCatMenu2(event.currentTarget);
  };
  const handleSubCatMenuClose2 = () => {
    setSubCatMenu2(null);
  };
  return (
    <div className={classes.mainpaper}>
      <Paper
        square={true}
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
                    onMouseEnter={(event) => {
                      subCatMenuOpen(event, cat._id);
                    }}
                    // onMouseLeave={handleSubCatMenuClose}
                  >
                    <strong>{cat.name}</strong>
                  </Typography>
                  <Menu
                    elevation={1}
                    getContentAnchorEl={null}
                    transitionDuration="auto"
                    anchorEl={subcatMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    id="primary-search-account-menu"
                    // keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    open={isSubCatMenuOpen}
                    onClose={handleSubCatMenuClose}
                    style={{ marginLeft: "30px" }}
                  >
                    {catstate.subcategories ? (
                      catstate.subcategories.map((subcat) => (
                        <div key={subcat._id}>
                          <MenuItem>
                            <Typography
                              variant="subtitle1"
                              onClick={(event) => {
                                subCatMenu2Open(event, subcat._id);
                              }}
                            >
                              {subcat.name}
                            </Typography>
                          </MenuItem>
                          <Divider />
                          <Menu
                            elevation={1}
                            getContentAnchorEl={null}
                            transitionDuration="auto"
                            anchorEl={subcatMenu2}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            id="primary-search-account-menu"
                            // keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                            open={isSubCatMenuOpen2}
                            onClose={handleSubCatMenuClose2}
                            style={{ marginLeft: "30px" }}
                          >
                            {catstate.subcategories2 &&
                              catstate.subcategories2.map((cat) => (
                                /* <Link
                                  key={cat._id}
                                  to={`/${cat._id}/subcategory/${cat.name}`}
                                  style={{ textDecoration: "none" }}
                                > */
                                <MenuItem
                                  onClick={() => {
                                    history.push(
                                      `/${cat._id}/subcategory/${cat.name}`
                                    );
                                    handleSubCatMenuClose2();
                                    handleSubCatMenuClose();
                                  }}
                                >
                                  <Typography variant="subtitle1">
                                    {cat.name}
                                  </Typography>
                                </MenuItem>
                                /* </Link> */
                              ))}
                          </Menu>
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

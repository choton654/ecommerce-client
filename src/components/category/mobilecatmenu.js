import React, { useContext, useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { CategoryContext } from "./categorycontext";
const Mobilecatmenu = ({ catMenu, isCatMenuOpen, catmenuClose }) => {
  const { catstate, catdispatch } = useContext(CategoryContext);
  const [subCategory, setSubCategory] = useState([]);
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
    setSubCategory(subCatArr);
    setSubCatMenu(event.currentTarget);
  };
  const handleSubCatMenuClose = () => {
    setSubCatMenu(null);
  };
  return (
    <Menu
      anchorEl={catMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isCatMenuOpen}
      onClose={catmenuClose}
      style={{ marginLeft: "30px" }}
    >
      {catstate.categories.map((cat) => {
        if (cat.parentId === undefined) {
          return (
            <div>
              <MenuItem
                onClick={(event) => subCatMenuOpen(event, cat._id)}
                style={{ cursor: "pointer" }}
              >
                {cat.name}
              </MenuItem>
              <Menu
                anchorEl={subcatMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                id="primary-search-account-menu"
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={isSubCatMenuOpen}
                onClose={handleSubCatMenuClose}
                style={{ marginLeft: "30px" }}
              >
                {subCategory.map((subcat) => (
                  <div>
                    <Link
                      to={`/${subcat._id}/subcategory/${subcat.name}`}
                      style={{ textDecoration: "none" }}
                    >
                      <MenuItem>{subcat.name}</MenuItem>
                    </Link>
                  </div>
                ))}
              </Menu>
            </div>
          );
        }
      })}
    </Menu>
  );
};

export default Mobilecatmenu;

import React, { useContext, useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
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
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
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
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id="primary-search-account-menu"
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isSubCatMenuOpen}
                onClose={handleSubCatMenuClose}
                style={{ marginLeft: "30px" }}
              >
                {subCategory.map((subcat) => (
                  <div>
                    <MenuItem>{subcat.name}</MenuItem>
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

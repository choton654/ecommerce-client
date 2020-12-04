import React, { useContext, useEffect } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "../cart/cartcontext";
import firebase from "firebase";
const Profilemenu = ({ anchorEl, isMenuOpen, menuClose }) => {
  const { cartstate, cartdispatch } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const handleClick1 = (menuClose) => {
    menuClose();
    history.push("/user");
  };
  const handleClick2 = (menuClose) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Sign-out successful");
      })
      .catch(function (error) {
        console.log("An error happened");
      });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    cartdispatch({ type: "CLEAR_CART" });
    history.push("/");
    menuClose();
  };
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={menuClose}
    >
      <MenuItem onClick={() => handleClick1(menuClose)}>Profile</MenuItem>
      <MenuItem onClick={() => handleClick2(menuClose)}>Log Out</MenuItem>
      {user && user.role === 1 && (
        <div>
          <MenuItem
            onClick={() => {
              history.push("/addcategory");
              menuClose();
            }}
          >
            All category
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/products");
              menuClose();
            }}
          >
            All product
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/allUsers");
              menuClose();
            }}
          >
            All Users
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/allorders");
              menuClose();
            }}
          >
            All Orders
          </MenuItem>
        </div>
      )}
    </Menu>
  );
};

export default Profilemenu;

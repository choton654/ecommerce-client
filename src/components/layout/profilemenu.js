import React, { useContext } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "../cart/cartcontext";
const Profilemenu = ({ anchorEl, isMenuOpen, menuClose }) => {
  const { cartstate, cartdispatch } = useContext(CartContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  const handleClick1 = (menuClose) => {
    menuClose();
    history.push("/user");
  };
  const handleClick2 = (menuClose) => {
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
          <MenuItem>
            <Link to="/addcategory" style={{ textDecoration: "none" }}>
              Add category
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/products" style={{ textDecoration: "none" }}>
              Add product
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/allUsers" style={{ textDecoration: "none" }}>
              All Users
            </Link>
          </MenuItem>
        </div>
      )}
    </Menu>
  );
};

export default Profilemenu;

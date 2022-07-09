import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Paper,
  Avatar,
  Badge,
  MenuList,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import CategoryIcon from "@material-ui/icons/Category";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FaceIcon from "@material-ui/icons/Face";
import ExtensionIcon from "@material-ui/icons/Extension";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SearchIcon from "@material-ui/icons/Search";
import FolderIcon from "@material-ui/icons/Folder";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import Login from "../user/login";
import HomeIcon from "@material-ui/icons/Home";
import Profilemenu from "./profilemenu";
import { useStyles } from "./theme";
import Mobilecatmenu from "../category/mobilecatmenu";
import { AuthContext } from "../user/authcontext";
import { CartContext } from "../cart/cartcontext";
import BASE_URL from "../../api";
import axios from "axios";
import JwtDecode from "jwt-decode";
const useNavstyles = makeStyles((theme) => ({
  menuButton: {
    // marginLeft: "5px",
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    // flexGrow: 1,
    marginLeft: "50px",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "#0a0a0a",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { cartstate, cartdispatch } = useContext(CartContext);
  const quantity = cartstate.cart && cartstate.cart.quantity;
  const history = useHistory();
  const classes = useStyles();
  const navclasses = useNavstyles();
  const [isOpen, setState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [catMenu, setCatMenu] = useState(null);
  const isCatMenuOpen = Boolean(catMenu);
  const isMenuOpen = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const token = localStorage.getItem("token") || "";
  // const [search, setSearch] = useState("");
  // console.log(search);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handlecategoryMenuOpen = (event) => {
    setCatMenu(event.currentTarget);
  };
  const handleCatMenuClose = () => {
    setCatMenu(null);
  };
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(!isOpen);
  };
  const [search, setSearch] = useState("");

  useEffect(() => {
    const itemSearch = () => {
      axios
        .post(`${BASE_URL}/product/api/search`, { search })
        .then((res) => {
          const item = res.data.findProduct;
          console.log(item);
          setSearchedProducts(item);
        })
        .catch((err) => console.log(err));
    }
    itemSearch();
  }, [search])
  const [searchmenu, setSearchmenu] = useState(null);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchmenu(e.currentTarget);
  };
  return (
    <div>
      <AppBar>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "#287aed",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={navclasses.menuButton}
            onClick={toggleDrawer}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Drawer open={isOpen} onClose={toggleDrawer}>
            <List
              component="nav"
              className={classes.list}
              style={{ paddingTop: "0px" }}
            >
              <ListItem
                style={{
                  height: "60px",
                  background: "#287aed",
                }}
              >
                <PersonIcon style={{ color: "white", background: "#287aed" }} />
                <Typography
                  variant="h6"
                  style={{ marginLeft: "20px", color: "white" }}
                >
                  {" "}
                  welcome!
                </Typography>
              </ListItem>
              <ListItem>
                <HomeIcon />
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="subtitle1"
                    style={{ marginLeft: "20px", color: "grey" }}
                  >
                    <strong>Home</strong>
                  </Typography>
                </Link>
              </ListItem>
              <ListItem
                button
                onClick={handlecategoryMenuOpen}
                style={{ background: "white", display: "flex" }}
              >
                <CategoryIcon />
                <br />

                <Typography
                  variant="subtitle1"
                  style={{ marginLeft: "20px", color: "grey" }}
                >
                  <strong>All Category</strong>
                </Typography>
              </ListItem>
              <ListItem button style={{ background: "white", display: "flex" }}>
                <PersonIcon />
                <Link to="/user" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: "20px",
                      color: "grey",
                    }}
                  >
                    <strong>My Account</strong>
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <ViewCompactIcon />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginLeft: "20px",
                    cursor: "pointer",
                    color: "grey",
                  }}
                >
                  <strong>My Orders</strong>
                </Typography>
              </ListItem>
              <ListItem>
                <ShoppingCartIcon />
                <Link to="/viewcart" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: "20px",
                      cursor: "pointer",
                      color: "grey",
                    }}
                  >
                    <strong>My Cart</strong>
                  </Typography>
                </Link>
              </ListItem>
              {user.role === 1 && (
                <div>
                  <ListItem>
                    <AddBoxIcon />
                    <Link to="/addcategory" style={{ textDecoration: "none" }}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          marginLeft: "20px",
                          cursor: "pointer",
                          color: "grey",
                        }}
                      >
                        <strong>Add Category</strong>
                      </Typography>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <ExtensionIcon />
                    <Link to="/products" style={{ textDecoration: "none" }}>
                      <Typography
                        variant="subtitle1"
                        style={{
                          marginLeft: "20px",
                          cursor: "pointer",
                          color: "grey",
                        }}
                      >
                        <strong>Add Products</strong>
                      </Typography>
                    </Link>
                  </ListItem>
                </div>
              )}
              <Mobilecatmenu
                catMenu={catMenu}
                isCatMenuOpen={isCatMenuOpen}
                catmenuClose={handleCatMenuClose}
              />
            </List>
          </Drawer>
          <Typography variant="h6" className={navclasses.title} color="inherit">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                  src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_4ee2f9.png"
                  style={{ width: 75 }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    fontStyle: "italic",
                    marginTop: "-1px",
                  }}
                >
                  Explore{" "}
                  <span
                    style={{
                      marginRight: "2px",
                      fontWeight: 500,
                      color: "#ffe500",
                    }}
                  >
                    Plus{" "}
                  </span>
                  <img
                    src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/plus_b13a8b.png"
                    style={{ width: 10 }}
                  />{" "}
                </span>
              </div>
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search items"
              value={search}
              onChange={handleSearch}
              classes={{
                root: navclasses.inputRoot,
                input: navclasses.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {/* <Searchitems
            searchmenu={searchmenu}
            searchedProducts={searchedProducts}
          /> */}
          <Menu
            id="simple-menu"
            anchorEl={searchmenu}
            open={Boolean(searchmenu)}
            onClose={() => setSearchmenu(null)}
            style={{
              marginTop: "35px",
            }}
          >
            <MenuList>
              {searchedProducts.length > 0 ? searchedProducts.map((item, idx) => (
                <MenuItem onClose={() => setSearchmenu(null)} key={idx}>
                  <Typography variant="subtitle1">
                    <Link to={`/${item._id}/product`}>{item.name}</Link>
                  </Typography>
                </MenuItem>
              )) : <MenuItem onClose={() => setSearchmenu(null)}>
                  <Typography variant="subtitle1">
                    Nothing found.. try more..
              </Typography>
                </MenuItem>}
            </MenuList>
          </Menu>
          <div className={classes.buttonWrapper}>
            {token ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "50px",
                  cursor: "pointer",
                }}
              >
                <IconButton color="inherit" onMouseOver={handleProfileMenuOpen}>
                  {user.role === 1 ? (
                    <FaceIcon />
                  ) : user.pic ? (
                    <img
                      src={user.pic}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                        <AccountCircle />
                      )}
                </IconButton>
                <Typography variant="h6" style={{ paddingTop: "10px" }}>
                  <strong>{token && user.username}</strong>
                </Typography>
                <Profilemenu
                  anchorEl={anchorEl}
                  isMenuOpen={isMenuOpen}
                  menuClose={handleMenuClose}
                />
              </div>
            ) : (
                <Button
                  style={{ background: "white", marginRight: "50px" }}
                  onClick={() => {
                    dispatch({ type: "LOGIN" });
                  }}
                >
                  <strong style={{ color: "#287aed" }}>Login</strong>
                </Button>
              )}
            <Login
              openModal={state && state.loginOpen}
              close={() => dispatch({ type: "LOGIN" })}
            />
            {token && (
              <IconButton
                color="inherit"
                aria-label="add to shopping cart"
                onClick={() => history.push("/viewcart")}
              >
                <Badge badgeContent={quantity} color="error">
                  <AddShoppingCartIcon />
                </Badge>
                <Typography variant="subtitle1">
                  <strong>Cart</strong>
                </Typography>
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

import React, { useState, useContext } from "react";
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
import AccountCircle from "@material-ui/icons/AccountCircle";
import FaceIcon from "@material-ui/icons/Face";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SearchIcon from "@material-ui/icons/Search";
import FolderIcon from "@material-ui/icons/Folder";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import Login from "../user/login";
import Profilemenu from "./profilemenu";
import { useStyles } from "./theme";
import Mobilecatmenu from "../category/mobilecatmenu";
import { AuthContext } from "../user/authcontext";
import { CartContext } from "../cart/cartcontext";
import BASE_URL from "../../api";
import axios from "axios";
const useNavstyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: theme.spacing(2),
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
  const quantity = cartstate && cartstate.cart.quantity;
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
  const [search, setSearch] = useState("");
  console.log(search);
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
  const [searchmenu, setSearchmenu] = useState(null);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchmenu(e.currentTarget);
    axios
      .post(`${BASE_URL}/product/api/search`, { search })
      .then((res) => {
        const item = res.data.findProduct;
        setSearchedProducts(item);
        console.log(searchedProducts);
      })
      .catch((err) => console.log(err));
  };
  console.log(searchedProducts);
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
            <MenuIcon />
          </IconButton>
          <Drawer open={isOpen} onClose={toggleDrawer}>
            <List component="nav" className={classes.list}>
              <ListItem style={{ height: "80px" }}>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItem>
              <ListItem
                button
                onClick={handlecategoryMenuOpen}
                style={{ background: "lightblue" }}
              >
                <Avatar>
                  <FolderIcon />
                </Avatar>
                <br />
                <ListItemText
                  primary="Category"
                  style={{ paddingLeft: "20px" }}
                />
              </ListItem>
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
                <a
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
                </a>
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
              {searchedProducts.map((item) => (
                <MenuItem onClose={() => setSearchmenu(null)}>
                  <Typography variant="subtitle1">
                    <Link to={`/${item._id}/product`}>{item.name}</Link>
                  </Typography>
                </MenuItem>
              ))}
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
                  {user.role === 1 ? <FaceIcon /> : <AccountCircle />}
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

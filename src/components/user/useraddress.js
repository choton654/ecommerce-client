import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "../layout/theme";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import { AuthContext } from "../user/authcontext";
import AddIcon from "@material-ui/icons/Add";
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}
const Useraddress = ({ state, value, handleChange, handleaddressOpen }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  // const { state, dispatch } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [address, setAddress] = useState({
    address: "",
    postalCode: "",
    city: "",
    country: "",
    contactNo: "",
    district: "",
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const editAddress = () => {
    setAnchorEl(null);
    handleaddressOpen();
  };
  return (
    <Paper
      className={classes.paper}
      style={{
        background: "whitesmoke",
        height: "400px",
        border: "2px solid #287aed",
      }}
    >
      <div style={{ textAlign: "left", marginLeft: "20px" }}>
        <Typography variant="h6">
          <strong>Manage Addressess:</strong>
        </Typography>
        <div
          style={{
            maxWidth: "90%",
            border: "2px solid grey",
            height: "50px",
            marginTop: "20px",
            display: "flex",
            cursor: "pointer",
          }}
        >
          <AddIcon
            style={{ color: "#287aed", marginLeft: "20px", marginTop: "12px" }}
          />
          <Typography
            onClick={handleaddressOpen}
            variant="subtitle2"
            style={{
              color: "#287aed",
              marginLeft: "10px",
              marginTop: "14px",
            }}
          >
            {" "}
            <strong>ADD A NEW ADDRESS</strong>
          </Typography>
        </div>
      </div>
      <Tabs
        style={{ marginRight: "50px", width: "100%", height: "310px" }}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="on"
        orientation="vertical"
        aria-label="scrollable auto tabs example"
      >
        {state.user &&
          state.user.address &&
          state.user.address.map((address) => (
            <Tab
              style={{ maxWidth: "100%", marginRight: "35px" }}
              label={
                <div
                  style={{
                    maxWidth: "90%",
                    border: "1px solid grey",
                    height: "30%",
                    marginTop: "20px",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <strong>{user.username}</strong>
                    <strong style={{ marginLeft: "10px" }}>
                      {address.contactNo}
                    </strong>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                      marginBottom: "10px",
                      marginRight: "20px",
                    }}
                  >
                    {address.address} {address.city} {address.postalCode}{" "}
                    {address.district} {address.country}
                  </Typography>
                  <div>
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => editAddress(address._id)}>
                        <Typography>Edit</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Typography>Delete</Typography>
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              }
              {...a11yProps(state.user.address.indexOf(address))}
            />
          ))}
      </Tabs>
    </Paper>
  );
};

export default Useraddress;

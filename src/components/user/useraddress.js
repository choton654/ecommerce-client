import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { useStyles } from "../layout/theme";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import { AuthContext } from "./authcontext";
import BASE_URL from "../../api";
import AddIcon from "@material-ui/icons/Add";
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}
const Useraddress = ({ state, value, handleChange, handleaddressOpen }) => {
  // const { dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userId = user._id;
  let editAddressname = {};
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [addOpen, setAddOpen] = useState(false);
  const [delAddOpen, setdelAddOpen] = useState(false);
  const [add, setAddress] = useState({
    address: "",
    postalCode: "",
    city: "",
    country: "",
    contactNo: "",
    district: "",
  });
  const deleteAddressOpen = () => {
    setdelAddOpen(true);
  };
  const deleteAddressClose = () => {
    setdelAddOpen(false);
  };
  const addressChange = (e) => {
    setAddress({ ...add, [e.target.name]: e.target.value });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editAddress = (e, id) => {
    editAddressname =
      state.user &&
      state.user.address &&
      state.user.address.find(
        (address) => address._id.toString() === id.toString()
      );
    setAddress({
      address: editAddressname.address,
      postalCode: editAddressname.postalCode,
      city: editAddressname.city,
      country: editAddressname.country,
      contactNo: editAddressname.contactNo,
      district: editAddressname.district,
    });
    console.log(editAddressname);
    setAnchorEl(null);
    setAddOpen(true);
  };
  const handleAddresssClose = () => {
    setAddOpen(false);
  };
  const handleAddressSubmit = (id) => {
    console.log(add);
    axios
      .put(
        `${BASE_URL}/user/api/${userId}/${id}/updateaddress`,
        { add },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { updatedUserAddress } = res.data;
        state.user.address = updatedUserAddress;
        handleAddresssClose();
      })
      .catch((err) => console.log(err));
  };
  const deleteAddress = (e, id) => {
    axios
      .delete(`${BASE_URL}/user/api/${userId}/${id}/deleteaddress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const { updatedUserAddress } = res.data;
        state.user.address = updatedUserAddress;
        handleClose();
        deleteAddressClose();
      })
      .catch((err) => console.log(err));
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
                      <MenuItem onClick={(e) => editAddress(e, address._id)}>
                        <Typography style={{ color: "#33691e" }}>
                          <strong>Edit</strong>
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={deleteAddressOpen}>
                        <Typography style={{ color: "#b71c1c" }}>
                          <strong>Delete</strong>
                        </Typography>
                      </MenuItem>
                    </Menu>
                    <Dialog
                      open={addOpen}
                      onClose={handleAddresssClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">Address</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          To order your products, please enter your address
                          here. We will send updates occasionally.
                        </DialogContentText>

                        <TextField
                          label="Address"
                          id="address"
                          margin="dense"
                          name="address"
                          variant="outlined"
                          value={add.address}
                          onChange={(event) => addressChange(event)}
                          className={classes.textField}
                          helperText="Enter your address"
                        />
                        <TextField
                          style={{ marginLeft: "20px" }}
                          label="Postal Code"
                          id="postal code"
                          margin="dense"
                          name="postalCode"
                          variant="outlined"
                          value={add.postalCode}
                          onChange={(event) => addressChange(event)}
                          className={classes.textField}
                          helperText="Enter your postal code"
                        />
                        <TextField
                          label="City"
                          id="city"
                          margin="dense"
                          name="city"
                          variant="outlined"
                          value={add.city}
                          onChange={(event) => addressChange(event)}
                          className={classes.textField}
                          helperText="Enter your city"
                        />
                        <TextField
                          style={{ marginLeft: "20px" }}
                          label="District"
                          id="district"
                          margin="dense"
                          name="district"
                          variant="outlined"
                          value={add.district}
                          onChange={(event) => addressChange(event)}
                          className={classes.textField}
                          helperText="Enter your district"
                        />
                        <TextField
                          label="Country"
                          id="country"
                          margin="dense"
                          name="country"
                          variant="outlined"
                          value={add.country}
                          onChange={(event) => addressChange(event)}
                          className={classes.textField}
                          helperText="Enter your country"
                        />
                        <TextField
                          style={{ marginLeft: "20px" }}
                          label="Contact No."
                          id="phon no"
                          margin="dense"
                          name="contactNo"
                          variant="outlined"
                          value={add.contactNo}
                          onChange={(event) => addressChange(event)}
                          className={classes.textField}
                          helperText="Enter your contact no."
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleAddresssClose}
                          color="secondery"
                          variant="contained"
                        >
                          <strong>Cancel</strong>
                        </Button>
                        <Button
                          onClick={() => handleAddressSubmit(address._id)}
                          color="primary"
                          variant="contained"
                        >
                          <strong>Submit</strong>
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog
                      open={delAddOpen}
                      onClose={deleteAddressClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Do you want to delete address ?"}
                      </DialogTitle>

                      <DialogActions style={{ margin: "0px auto" }}>
                        <Button
                          onClick={deleteAddressClose}
                          autoFocus
                          variant="contained"
                          style={{ background: "#8bc34a" }}
                        >
                          <strong style={{ color: "white" }}>Cancel</strong>
                        </Button>
                        <Button
                          style={{ background: "#d32f2f" }}
                          onClick={(e) => deleteAddress(e, address._id)}
                          variant="contained"
                          autoFocus
                        >
                          <strong style={{ color: "white" }}>Delete</strong>
                        </Button>
                      </DialogActions>
                    </Dialog>
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

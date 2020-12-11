import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  Avatar,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tabs,
  Tab,
} from "@material-ui/core";

import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import { AuthContext } from "./authcontext";
import { useStyles } from "../layout/theme";
import BASE_URL from "../../api";
import Protectuser from "./protectuser";
import Useraddress from "./useraddress";
import Userorder from "./userorder";

const User = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const [isEdit1, setState1] = useState(false);
  const [isEdit2, setState2] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const token = localStorage.getItem("token");
  const classes = useStyles();
  const { state, dispatch } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    singleUser();
  }, []);
  const handleClick1 = () => {
    setState1(!isEdit1);
  };
  const handleClick2 = () => {
    setState2(!isEdit2);
  };
  const singleUser = () => {
    axios
      .get(`${BASE_URL}/user/api/${userId}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { user } = res.data;
        dispatch({ type: "USER_PROFILE", payload: user });
      })
      .catch((err) => console.log(err));
  };
  const editProfile = () => {
    axios
      .put(
        `${BASE_URL}/user/api/${userId}/updateuser`,
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.updatedUser);
        const updatedUser = res.data.updatedUser;
        dispatch({ type: "EDIT_USER", payload: updatedUser });
      })
      .catch((err) => console.log(err));
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    history.push("/user/address");
  };
  const handleaddressOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [address, setAddress] = useState("");
  const [postalCode, setPostalcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [district, setDistrict] = useState("");

  const newAddress = {
    address,
    postalCode,
    city,
    country,
    contactNo,
    district,
  };

  const handleSubmit = () => {
    console.log(newAddress, userId);
    console.log(newAddress);
    axios
      .post(
        `${BASE_URL}/user/api/${userId}/address`,
        { newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { updatedUser } = res.data;
        console.log(updatedUser);
        dispatch({ type: "ADD_ADDRESS", payload: updatedUser });
        // localStorage.setItem("address", updatedUser.address);
      })
      .catch((err) => console.log(err));
    handleClose();
  };
  const handleProfile = () => {
    history.push("/user");
  };
  return (
    <Container className={classes.root}>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={4}>
          <Paper
            className={classes.paper}
            style={{
              background: "whitesmoke",
              height: "15%",
              border: "2px solid #287aed",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                alt="Remy Sharp"
                src={
                  user.pic
                    ? user.pic
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLlQ9DL2jP_heI_mtZXdw8cxNdGunsejk7FQ&usqp=CAU"
                }
                style={{
                  border: "2px solid #287aed",
                  width: "70px",
                  height: "65px",
                  marginLeft: "30px",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "50px",
                }}
              >
                <Typography
                  variant="caption"
                  align="center"
                  color="primary"
                  style={{ textAlign: "center" }}
                >
                  Hello
                </Typography>
                <Typography variant="subtitle1" style={{ width: "100%" }}>
                  <strong>{user.username}</strong>
                </Typography>
              </div>
            </div>
          </Paper>
          <br />
          <Paper
            className={classes.paper}
            style={{
              background: "whitesmoke",
              height: "60%",
              border: "2px solid #287aed",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <MenuItem style={{ display: "flex" }} onClick={handleProfile}>
                <AssignmentIndIcon fontSize="default" color="primary" />
                <Typography
                  variant="h6"
                  color="primary"
                  style={{ marginLeft: "20px" }}
                >
                  Profile Information
                </Typography>
              </MenuItem>
              <MenuItem
                style={{ display: "flex" }}
                onClick={() => history.push("/user/order")}
              >
                <AirportShuttleIcon fontSize="default" color="primary" />
                <Typography
                  variant="h6"
                  color="primary"
                  style={{ marginLeft: "20px" }}
                >
                  My Orders
                </Typography>
              </MenuItem>
              <MenuItem
                style={{ display: "flex", marginTop: "5px" }}
                onClick={handleClickOpen}
              >
                <EditLocationIcon fontSize="default" color="primary" />
                <Typography
                  variant="h6"
                  color="primary"
                  style={{ marginLeft: "20px" }}
                >
                  Manage Addresses
                </Typography>
              </MenuItem>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Address</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To order your products, please enter your address here. We
                    will send updates occasionally.
                  </DialogContentText>

                  <TextField
                    label="Address"
                    id="address"
                    margin="dense"
                    name="address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={classes.textField}
                    helperText="Enter your address"
                  />
                  <TextField
                    style={{ marginLeft: "20px" }}
                    label="Postal Code"
                    id="postal code"
                    margin="dense"
                    name="postalcode"
                    variant="outlined"
                    value={postalCode}
                    onChange={(e) => setPostalcode(e.target.value)}
                    className={classes.textField}
                    helperText="Enter your postal code"
                  />
                  <TextField
                    label="City"
                    id="city"
                    margin="dense"
                    name="city"
                    variant="outlined"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className={classes.textField}
                    helperText="Enter your district"
                  />
                  <TextField
                    label="Country"
                    id="country"
                    margin="dense"
                    name="country"
                    variant="outlined"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={classes.textField}
                    helperText="Enter your country"
                  />
                  <TextField
                    style={{ marginLeft: "20px" }}
                    label="Contact No."
                    id="phon no"
                    margin="dense"
                    name="contactno"
                    variant="outlined"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                    className={classes.textField}
                    helperText="Enter your contact no."
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} color="primary">
                    Add address
                  </Button>
                </DialogActions>
              </Dialog>
              <MenuItem style={{ display: "flex", marginTop: "5px" }}>
                <ExitToAppIcon fontSize="default" color="primary" />
                <Typography
                  variant="h6"
                  color="primary"
                  style={{ marginLeft: "20px" }}
                  onClick={handleLogout}
                >
                  Log Out
                </Typography>
              </MenuItem>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          {history.location.pathname === "/user/address" ? (
            <Useraddress
              state={state}
              value={value}
              handleChange={handleChange}
              handleaddressOpen={handleaddressOpen}
            />
          ) : history.location.pathname === "/user/order" ? (
            <Userorder />
          ) : (
            <Paper
              className={classes.paper}
              style={{
                background: "whitesmoke",
                height: "400px",
                border: "2px solid #287aed",
              }}
            >
              <FormControl
                className={classes.control}
                margin="dense"
                style={{ marginRight: "8rem" }}
              >
                <Typography variant="h6" style={{ marginRight: "4rem" }}>
                  Personal Information
                </Typography>
                <br />
                <div className={classes.userfield}>
                  <Typography
                    color="primary"
                    variant="subtitle1"
                    onClick={handleClick1}
                    style={{ cursor: "pointer" }}
                  >
                    {isEdit1 ? "cancle" : "Edit"}
                  </Typography>
                  <TextField
                    label="Username"
                    id="outlined-margin-none"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isEdit1 ? false : true}
                    required={true}
                    variant="outlined"
                  />
                  <Button
                    onClick={editProfile}
                    variant="contained"
                    color="primary"
                    style={isEdit1 ? { opacity: "1" } : { opacity: "0" }}
                  >
                    Save
                  </Button>
                </div>
                <br />
                <div className={classes.userfield}>
                  <Typography
                    variant="subtitle1"
                    onClick={handleClick2}
                    style={{ cursor: "pointer" }}
                  >
                    {isEdit2 ? "cancle" : "Edit"}
                  </Typography>
                  <TextField
                    label="Email"
                    id="outlined-margin-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isEdit2 ? false : true}
                    required={true}
                    variant="outlined"
                  />
                  <Button
                    onClick={editProfile}
                    variant="contained"
                    color="primary"
                    style={isEdit2 ? { opacity: "1" } : { opacity: "0" }}
                  >
                    Save
                  </Button>
                </div>
              </FormControl>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Protectuser(User);

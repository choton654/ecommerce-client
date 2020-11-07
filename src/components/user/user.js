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
} from "@material-ui/core";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import { AuthContext } from "./authcontext";
import { useStyles } from "../layout/theme";
import BASE_URL from "../../api";
import Protectuser from "./protectuser";
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
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [address, setAddress] = useState("");
  const handleSubmit = () => {
    console.log(address, userId);
    axios
      .post(
        `${BASE_URL}/user/api/${userId}/address`,
        { address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { updatedUser } = res.data;
        dispatch({ type: "ADD_ADDRESS", payload: updatedUser });
      })
      .catch((err) => console.log(err));
    handleClose();
  };
  return (
    <Container className={classes.root}>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={4}>
          <Paper
            className={classes.paper}
            style={{
              background: "whitesmoke",
              height: "50px",
              border: "2px solid #287aed",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                alt="Remy Sharp"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLlQ9DL2jP_heI_mtZXdw8cxNdGunsejk7FQ&usqp=CAU"
                style={{ width: "70px", height: "60px", marginLeft: "30px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "130px",
                }}
              >
                <Typography
                  variant="caption"
                  align="right"
                  color="primary"
                  style={{ textAlign: "initial" }}
                >
                  Hello
                </Typography>
                <Typography variant="h6">{user.username}</Typography>
              </div>
            </div>
          </Paper>
          <br />
          <Paper
            className={classes.paper}
            style={{
              background: "whitesmoke",
              height: "300px",
              border: "2px solid #287aed",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <MenuItem style={{ display: "flex" }}>
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
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
          <Paper
            className={classes.paper}
            style={{
              background: "whitesmoke",
              height: "400px",
              border: "2px solid #287aed",
            }}
          >
            <FormControl
              margin="dense"
              style={{ marginRight: "8rem", width: "60%" }}
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
              <br />
              <div style={{ textAlign: "left", marginLeft: "20px" }}>
                <Typography variant="subtitle1">
                  <strong>Address</strong>
                </Typography>
                <Typography variant="subtitle2">
                  <strong>{state.user && state.user.address}</strong>
                </Typography>
              </div>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Protectuser(User);

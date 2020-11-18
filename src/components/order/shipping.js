import React, { useState, useContext, useEffect } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../layout/theme";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import axios from "axios";
import BASE_URL from "../../api";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import { AuthContext } from "../user/authcontext";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Shipping = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AuthContext);
  const [checked, setChecked] = useState([0]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const userId = user._id;
  useEffect(() => {
    singleUser();
  }, []);
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

  return (
    <Paper style={{ maxWidth: "450px", textAlign: "center", margin: "0 auto" }}>
      <Typography variant="h6">Shipping address</Typography>
      <List>
        {state.user.address &&
          state.user.address.map((address) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocationOnIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={address.address} secondary="Jan 9, 2014" />
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={true}
              />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};

export default Shipping;

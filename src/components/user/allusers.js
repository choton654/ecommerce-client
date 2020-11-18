import {
  Container,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Switch,
} from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useStyles } from "../layout/theme";
import BASE_URL from "../../api";
import { AuthContext } from "./authcontext";
import Adminresource from "./adminresource";

const Allusers = () => {
  const { state, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user._id;
  const token = localStorage.getItem("token");
  const [adminUser, setAdminUser] = useState({
    user: false,
    admin: true,
  });
  const [role, setRole] = useState({
    name: "",
  });
  let adminORuser;
  const handleChecked = (event, userid) => {
    setRole({ [event.target.name]: event.target.checked });
    adminORuser = event.target.checked;
    console.log(adminORuser);
    setAdminOrUser(userid);
  };
  console.log(role);
  const setAdminOrUser = (userid) => {
    axios
      .put(
        `${BASE_URL}/user/api/${id}/${userid}/checkadmin`,
        { adminORuser },
        {
          headers: {
            Authorization: `Barer ${token}`,
          },
        }
      )
      .then((res) => {
        const { user } = res.data;
        console.log(user);
        dispatch({ type: "ADMIN_USERS", payload: user });
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = () => {
    axios
      .get(`${BASE_URL}/user/api/${id}/allusers`, {
        headers: {
          Authorization: `Barer ${token}`,
        },
      })
      .then((res) => {
        const { users } = res.data;

        dispatch({ type: "ALL_USERS", payload: users });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container className={classes.root}>
      <Grid item xs={12} sm={12}>
        <Paper
          className={classes.paper}
          style={{ marginTop: "20px", border: "2px solid #287aed" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              border: "2px solid #287aed",
              marginLeft: "60px",
            }}
          >
            <Typography variant="h6" style={{ marginLeft: "10px" }}>
              Username
            </Typography>
            <Typography variant="h6" style={{ marginRight: "20px" }}>
              Email
            </Typography>
            <Typography variant="h6" style={{ marginRight: "40px" }}>
              Role
            </Typography>
          </div>
          {state.users && (
            <div
              style={{
                width: "90%",
                border: "2px solid #287aed",
                marginLeft: "60px",
                marginTop: "10px",
              }}
            >
              {state.users.map((user) => (
                <MenuItem
                  key={user._id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle1">{user.username}</Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ textAlign: "center" }}
                  >
                    {user.email}
                  </Typography>
                  <div>
                    <div style={{ display: "flex" }}>
                      <Typography variant="subtitle1">
                        {user.role === 0 ? "user" : "admin"}
                      </Typography>
                      <Switch
                        checked={
                          user.role === 0 ? adminUser.user : adminUser.admin
                        }
                        onChange={(e) => handleChecked(e, user._id)}
                        name={user.username}
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </div>
                  </div>
                </MenuItem>
              ))}
            </div>
          )}
        </Paper>
      </Grid>
    </Container>
  );
};

export default Adminresource(Allusers);

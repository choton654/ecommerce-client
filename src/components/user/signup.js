import React, { useState, useContext } from "react";
import {
  Modal,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import { useSnackbar } from "notistack";
import { AuthContext } from "./authcontext";
import { useStyles } from "../layout/theme";
import BASE_URL from "../../api";

const Signup = ({ isOpen, close }) => {
  const { state, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
    showPassword: false,
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    // console.log(values);
    const data = {
      email: values.email,
      password: values.password,
      username: values.username,
    };
    axios
      .post(`${BASE_URL}/user/api/signup`, data)
      .then((res) => {
        const { success } = res.data;
        if (res.data.err) {
          const error = res.data.err;
          dispatch({ type: "ERROR", payload: error });
        } else {
          const { user } = res.data;
          console.log(user);
          enqueueSnackbar(success, { variant: "success" });
          close(e);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        const error = err.response.data;
        dispatch({ type: "ERROR", payload: error });
      });
  };
  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.paper2}>
          <div className={classes.modalDiv}>
            <Typography variant="h6" style={{ marginLeft: "60px" }}>
              Register Here
            </Typography>
            <FormControl>
              <InputLabel htmlFor="input-with-username">Username</InputLabel>
              <Input
                id="input-with-username"
                type="text"
                name="username"
                value={values.username}
                required={true}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                }
                error={state.error !== null && true}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
              <Input
                id="input-with-icon-adornment"
                type="email"
                name="email"
                value={values.email}
                required={true}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                }
                error={state.error !== null && true}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                required={true}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                error={state.error !== null && true}
              />
            </FormControl>
          </div>
          <br />
          <Typography variant="subtitle1" color="error">
            <strong style={{ marginLeft: "80px" }}>
              {state.error && state.error}
            </strong>
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            style={{ marginLeft: "140px" }}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default Signup;

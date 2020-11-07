import {
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Signup from "./signup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AuthContext } from "./authcontext";
import BASE_URL from "../../api";
import { useStyles } from "../layout/theme";

const Login = ({ openModal, close }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const { enqueueSnackbar } = useSnackbar();
  const [signUp, setSignup] = useState(false);
  const showSignup = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSignup(!signUp);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClick = () => {
    // console.log(values);
    const data = {
      email: values.email,
      password: values.password,
    };
    axios
      .post(`${BASE_URL}/user/api/login`, data)
      .then((res) => {
        const { user } = res.data;
        const { token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "ADD_USER", payload: user });
        enqueueSnackbar("User has successfully logged in", {
          variant: "success",
        });
        setValues({
          email: "",
          password: "",
        });
        dispatch({ type: "LOGIN" });
      })
      .catch((err) => {
        const error = err.response.data.err;
        dispatch({ type: "ERROR", payload: error });
      });
  };
  return (
    <div>
      <Modal
        className={classes.modal}
        open={state && state.loginOpen}
        onClose={() => {
          dispatch({ type: "LOGIN" });
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.paper2}>
          <div
            style={{
              width: "50%",
              height: "100%",
              background: "#287aed",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className={classes.modalDiv} style={{ paddingRight: "30px" }}>
              <Typography variant="h5" style={{ marginTop: "20px" }}>
                <strong style={{ color: "white" }}>Login</strong>
              </Typography>
              <Typography variant="h6" style={{ color: "white" }}>
                Get access to your orders, Wishlist and Recomendation
              </Typography>
            </div>
            <img
              src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
              style={{
                maxWidth: "50%",
                marginLeft: "40px",
                marginBottom: "30px",
              }}
            />
          </div>
          <div>
            <div className={classes.modalDiv}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="input-with-icon-adornment">
                  Email
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  type="email"
                  name="email"
                  value={values.email}
                  required={true}
                  color="primary"
                  onChange={handleChange}
                  error={state.error !== null && true}
                />
              </FormControl>
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  required={true}
                  color="primary"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={state.error !== null && true}
                />
              </FormControl>
            </div>
            <br />
            <div className={classes.modalDiv2}>
              <Typography variant="subtitle1" color="error">
                <strong style={{ marginLeft: "60px" }}>
                  {state.error && state.error}
                </strong>
              </Typography>
              <Button
                color="primary"
                variant="outlined"
                onClick={handleClick}
                style={{ width: "100%" }}
              >
                Submit
              </Button>
              <Typography
                variant="subtitle2"
                style={{ marginLeft: "70px", marginTop: "10px" }}
              >
                Don't have an account?{"    "}
                <strong
                  onClick={showSignup}
                  style={{ cursor: "pointer", color: "darkblue" }}
                >
                  Signup here
                </strong>
                <Signup isOpen={signUp} close={showSignup} />
              </Typography>
            </div>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default Login;

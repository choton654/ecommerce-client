import React, { useState } from "react";
import {
  Paper,
  FormControl,
  Input,
  InputLabel,
  Button,
} from "@material-ui/core";
import { useStyles } from "../layout/theme";
import axios from "axios";
import BASE_URL from "../../api";

const Shipping = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    console.log(name, email, amount, phone);
    axios
      .post(`${BASE_URL}/paynow`, { name, email, amount, phone })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <Paper>
      <form onSubmit={handleClick}>
        <FormControl
          margin="dense"
          style={{ marginRight: "1rem", width: "60%" }}
        >
          <div className={classes.userfield}>
            <InputLabel htmlFor="catname">Name</InputLabel>
            <Input
              id="name"
              name="name"
              type="text"
              inputProps={{ "aria-label": "description" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
              variant="outlined"
            />
          </div>
        </FormControl>
        <br />
        <FormControl
          margin="dense"
          style={{ marginRight: "1rem", width: "60%" }}
        >
          <div className={classes.userfield}>
            <InputLabel htmlFor="catname">Email</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              inputProps={{ "aria-label": "description" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              variant="outlined"
            />
          </div>
        </FormControl>
        <br />
        <FormControl
          margin="dense"
          style={{ marginRight: "1rem", width: "60%" }}
        >
          <div className={classes.userfield}>
            <InputLabel htmlFor="catname">Amount</InputLabel>
            <Input
              id="amount"
              name="amount"
              type="text"
              inputProps={{ "aria-label": "description" }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required={true}
              variant="outlined"
            />
          </div>
        </FormControl>
        <br />
        <FormControl
          margin="dense"
          style={{ marginRight: "1rem", width: "60%" }}
        >
          <div className={classes.userfield}>
            <InputLabel htmlFor="catname">Phone</InputLabel>
            <Input
              id="phone"
              name="phone"
              type="text"
              inputProps={{ "aria-label": "description" }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required={true}
              variant="outlined"
            />
          </div>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ width: "50%", marginTop: "1rem", marginRight: "1rem" }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Shipping;

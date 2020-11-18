import { Divider, Paper, Typography } from "@material-ui/core";
import React from "react";

const Placeorder = ({ quantity, price }) => {
  return (
    <Paper
      style={{
        height: "400px",
        width: "400px",
        border: "2px solid lightblue",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
      }}
    >
      <Typography
        style={{ marginLeft: "20px", marginTop: "20px" }}
        variant="h6"
      >
        <strong>Price Details</strong>
      </Typography>
      <Divider orientation="horizontal" style={{ marginTop: "20px" }} />
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Typography variant="subtitle1" style={{ marginLeft: "20px" }}>
            Price( {quantity} items)
          </Typography>
          <Typography varient="h4"></Typography>
          <Typography varient="h4" style={{ marginRight: "20px" }}>
            Rs.{price}
          </Typography>
        </div>
        <Divider orientation="horizontal" style={{ marginTop: "20px" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            style={{ marginTop: "20px", marginLeft: "20px" }}
          >
            <strong>Total amount</strong>
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ marginRight: "20px", marginTop: "20px" }}
          >
            <strong>
              <span>Rs.</span>
              {price}
            </strong>
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Placeorder;

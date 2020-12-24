import React, {
  useEffect,
  useContext,
  useState
} from "react";
import axios from "axios";
import BASE_URL from "../../api";
import {
  CartContext
} from "../cart/cartcontext";
import {
  makeStyles
} from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {Typography, Switch} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    margin: "0px auto",
    marginTop: "30px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
const Allorders = () => {
  const {
    cartstate,
    cartdispatch
  } = useContext(CartContext);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [orderStatus, setOrderstatus]= useState({
    delivered:true,
    notDelivered:false
  })
  useEffect(() => {
    getAllOrders();
  }, []);
  const getAllOrders = () => {
    axios
    .get(`${BASE_URL}/order/api/allorders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      const {
        order
      } = res.data;
      cartdispatch({
        type: "PLACE_ORDER", payload: order
      });
    })
    .catch((err) => {
      const error = err.response.err;
      cartdispatch({
        type: "ERROR", payload: error
      });
    });
  };
  const classes = useStyles();
  const [expanded,
    setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel: false);
  };
  
  const handleChecked = (e, orderid)=>{
    console.log(token, user._id)
    axios.put(`${BASE_URL}/order/api/${orderid}/${user._id}/editorder`,{},{ headers: 
     {
      Authorization: `Bearer ${token}`,
     },
    })
    .then((res)=> {
    console.log(res.data);
    const {order} = res.data;
    // window.location.reload();
    cartdispatch({type:"EDIT_ORDER", payload:order._id})
    })
    .catch((err)=> console.log(err))
  }

  return (
    <div className={classes.root}>
      {cartstate &&
      cartstate.orders &&
      cartstate.orders.map((order) => (
        <Accordion
          style={ { background: "#90caf9" }}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                {order.userId && order.userId.username}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                orderid:<strong>{order._id}</strong>
              </Typography>
              <Typography style={ { marginLeft: "auto" }}>
                {order.isPaid === true ? (
              <strong style={ { color: "#1b5e20" }}>PAID</strong>
            ): (
              <strong style={ { color: "#c62828" }}>NOT PAID</strong>
            )}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={ { background: "#fff3e0" }}>
            <div style={ { display: "flex" }}>
              <Typography variant="subtitle1">
                Change order status:
              </Typography>
              <Typography variant="subtitle1">
              {order.isDelivered === true ? "Delivered": "Not delivered"}
              </Typography>
             <Switch
               checked={
                order.isDelivered
              }
              onChange={(e) => handleChecked(e, order._id)}
              name={order._id}
              inputProps={ { "aria-label": "secondary checkbox" }}
              />
            </div>
            </AccordionDetails>
          </Accordion>
      ))}
    </div>
  );
};

export default Allorders;
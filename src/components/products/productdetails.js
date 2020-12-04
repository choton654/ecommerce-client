import React, { useState, useContext, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import MobileStepper from "@material-ui/core/MobileStepper";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { ProductContext } from "./productcontext";
import { useParams } from "react-router-dom";
import ExtensionTwoToneIcon from "@material-ui/icons/ExtensionTwoTone";
import Editproduct from "./editproduct";
import axios from "axios";
import BASE_URL from "../../api";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const Productdetails = (props) => {
  // console.log(props.match.path === "/:productid/productdetails");
  const { productid } = useParams();
  const { state, dispatch } = useContext(ProductContext);
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = () => {
    axios
      .get(`${BASE_URL}/product/api/getallproducts`)
      .then((res) => {
        console.log(res.data.products);
        const allProducts = res.data.products;
        dispatch({ type: "GET_ALL_PRODUCTS", payload: allProducts });
      })
      .catch((err) => console.log(err));
  };
  const singleProduct =
    state.products &&
    state.products.find(
      (product) => product._id.toString() === productid.toString()
    );
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
      margin: "0px auto",
      border: "1px solid #1e88e5",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: "#1e88e5",
    },
    img: {
      height: 255,
      display: "block",
      maxWidth: 200,
      marginLeft: "90px",
      overflow: "hidden",
      width: "100%",
    },
  }));
  const tutorialSteps =
    singleProduct &&
    singleProduct.photo.map((pic, idx) => ({
      key: idx,
      label: singleProduct.name,
      imgPath: pic.img,
    }));
  // console.log(tutorialSteps);
  console.log(tutorialSteps);

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tutorialSteps && tutorialSteps.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const editProduct = () => {
    setOpen(true);
  };
  return (
    <Paper className={classes.root}>
      <Typography variant="h6">
        {" "}
        <ExtensionTwoToneIcon />
        Product Details
      </Typography>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemText primary="Name" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
      <div>
        <Paper square elevation={0} className={classes.header}>
          <Typography variant="subtitle1">
            <strong style={{ color: "#e3f2fd" }}>
              {tutorialSteps && tutorialSteps[activeStep].label}
            </strong>
          </Typography>
          <Tooltip title="edit">
            <EditIcon
              fontSize="small"
              onClick={editProduct}
              style={{
                marginRight: "10px",
                color: "green",
                border: "1px solid grey",
                backgroundColor: "lightgreen",
              }}
            />
          </Tooltip>
        </Paper>
        <AutoPlaySwipeableViews
          style={{ backgroundColor: "#e0f2f1" }}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps &&
            tutorialSteps.map((step, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <img
                    className={classes.img}
                    src={`${BASE_URL}/${step.imgPath}`}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          style={{ backgroundColor: "#1e88e5" }}
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <Typography variant="subtitle2">
                <strong style={{ color: "#e3f2fd" }}>Next</strong>
              </Typography>
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              <Typography variant="subtitle2">
                <strong style={{ color: "#e3f2fd" }}>Back</strong>
              </Typography>
            </Button>
          }
        />
        <Editproduct open={open} close={handleClose} productid={productid} />
      </div>
    </Paper>
  );
};

export default Productdetails;

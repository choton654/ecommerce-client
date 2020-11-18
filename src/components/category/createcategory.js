import React, { useState, useContext } from "react";
import { useStyles } from "../layout/theme";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Paper,
  Typography,
  FormControl,
  Input,
  InputLabel,
  Button,
  Tab,
  TextField,
  Tabs,
  AppBar,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Avatar,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import axios from "axios";
import { CategoryContext } from "./categorycontext";
import Adminresource from "../user/adminresource";
import BASE_URL from "../../api";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const Createcategory = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  const { catstate, catdispatch } = useContext(CategoryContext);
  const token = localStorage.getItem("token");
  const id = user._id;
  const [name, setCatname] = useState("");
  const [parentCatname, setCatid] = useState("");
  const [value, setValue] = useState(0);
  const [isEdit1, setState1] = useState(false);
  const [catname, setcat] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const handleClick1 = () => {
    setState1(!isEdit1);
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log(name, parentCatname);
    const data = { name, parentCatname };
    axios
      .post(`${BASE_URL}/category/api/${id}/create`, data, {
        headers: {
          Authorization: `Barer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.category);
        const singleCategory = res.data.category;
        catdispatch({ type: "ADD_SINGLE_CATEGORY", payload: singleCategory });
        setCatname("");
        setCatid("");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const catEdit = (catid) => {
    const name = catname;
    console.log(name);
    axios
      .put(
        `${BASE_URL}/category/api/${catid}/${id}/updatecategory`,
        { name },
        {
          headers: {
            Authorization: `Barer ${token}`,
          },
        }
      )
      .then((res) => {
        const { catagory } = res.data;
        catdispatch({ type: "EDIT_SINGLE_CATEGORY", payload: catagory });
        setcat("");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const deleteCat = (catid) => {
    axios
      .delete(`${BASE_URL}/category/api/${catid}/${id}/deletecategory`, {
        headers: {
          Authorization: `Barer ${token}`,
        },
      })
      .then((res) => {
        const delCat = res.data.msg;
        enqueueSnackbar(delCat, { variant: "success" });
        catdispatch({ type: "DELETE_CAT", payload: catid });
      })
      .catch((err) => console.log(err));
  };
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState([]);
  const data = new FormData();
  for (let i = 0; i < photo.length; i++) {
    data.append("photo", photo[i]);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addCatpic = (catid) => {
    handleClose();
    axios
      .post(`${BASE_URL}/category/api/${catid}/${id}/addphoto`, data, {
        headers: {
          Authorization: `Barer ${token}`,
        },
      })
      .then((res) => {
        const { category } = res.data;
        console.log(category);
        catdispatch({ type: "ADD_PHOTO", payload: { category, catid } });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={4}>
          <Paper
            className={classes.paper}
            style={{
              background: "whitesmoke",
              height: "400px",
              border: "2px solid #287aed",
            }}
          >
            <Typography variant="h6">Add Category</Typography>
            <br />
            <form onSubmit={handleClick}>
              <FormControl
                margin="dense"
                style={{ marginRight: "1rem", width: "60%" }}
              >
                <div className={classes.userfield}>
                  <InputLabel htmlFor="catname">Category</InputLabel>
                  <Input
                    id="catname"
                    name="cat_name"
                    type="text"
                    inputProps={{ "aria-label": "description" }}
                    value={name}
                    onChange={(e) => setCatname(e.target.value)}
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
                  <InputLabel htmlFor="catid">Parent Category</InputLabel>
                  <Input
                    id="catid"
                    name="cat_id"
                    type="text"
                    inputProps={{ "aria-label": "description" }}
                    value={parentCatname}
                    onChange={(e) => setCatid(e.target.value)}
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
                Save
              </Button>
            </form>
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
            <Typography variant="h6">Category List</Typography>
            <div className={classes.tabroot}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="on"
                  aria-label="scrollable auto tabs example"
                >
                  {catstate.categories ? (
                    catstate.categories.map((cat) => (
                      <Tab
                        style={{ opacity: 1 }}
                        label={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle2">
                              <strong>{cat.name}</strong>
                            </Typography>
                            <DeleteForeverIcon
                              onClick={() => deleteCat(cat._id)}
                              fontSize="small"
                              color="secondary"
                              style={{ marginLeft: "20px" }}
                            />
                          </div>
                        }
                        {...a11yProps(catstate.categories.indexOf(cat))}
                      />
                    ))
                  ) : (
                    <h1>Loading...</h1>
                  )}
                </Tabs>
              </AppBar>
              {catstate.categories ? (
                catstate.categories.map((cat) => (
                  <TabPanel
                    value={value}
                    style={{ paddingTop: "10px" }}
                    index={catstate.categories.indexOf(cat)}
                  >
                    <div className={classes.userfield}>
                      <Typography color="primary" variant="subtitle1">
                        <strong>Category Name:</strong> {cat.name}
                      </Typography>

                      <Typography
                        color="primary"
                        variant="subtitle1"
                        onClick={handleClick1}
                        style={{ cursor: "pointer" }}
                      >
                        {isEdit1 ? "cancle" : "Edit"}
                      </Typography>
                      <TextField
                        label="Category name"
                        id="outlined-margin-none"
                        name="catname"
                        value={catname}
                        onChange={(e) => setcat(e.target.value)}
                        disabled={isEdit1 ? false : true}
                        required={true}
                        variant="outlined"
                      />
                      <Button
                        onClick={() => catEdit(cat._id)}
                        variant="contained"
                        color="primary"
                        style={isEdit1 ? { opacity: "1" } : { opacity: "0" }}
                      >
                        Save
                      </Button>
                    </div>
                    <div style={{ display: "flex", marginLeft: "20px" }}>
                      <IconButton
                        color="primary"
                        style={{ marginLeft: "10px" }}
                        onClick={handleClickOpen}
                      >
                        <AddAPhotoIcon fontSize="medium" />
                      </IconButton>
                      {cat.photo &&
                        cat.photo.map((pic) => (
                          <Avatar
                            alt="Remy Sharp"
                            src={`${BASE_URL}${pic.img}`}
                          />
                        ))}

                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="form-dialog-title">
                          Add Photo
                        </DialogTitle>
                        <DialogContent>
                          <Input
                            autoFocus
                            margin="dense"
                            id="photo"
                            type="file"
                            fullWidth
                            onChange={(e) =>
                              setPhoto([...photo, e.target.files[0]])
                            }
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button
                            onClick={() => addCatpic(cat._id)}
                            color="primary"
                          >
                            Add photo
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </TabPanel>
                ))
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Adminresource(Createcategory);

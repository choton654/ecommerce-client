import { fade, makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "80px",
    [theme.breakpoints.up("md")]: {
      marginTop: "0px",
    },
  },
  list: {
    width: "200px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    marginRight: "50px",
    width: "70%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(2),
      width: "50%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#287aed",
  },

  buttonWrapper: {
    display: "inline-flex",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "80%",
    [theme.breakpoints.up("md")]: {
      width: "90%",
    },
    // height: "130%",
    // [theme.breakpoints.up("md")]: {
    //   height: "120%",
    // },
    // color: theme.palette.text.secondary,
  },
  gridItem: {
    marginTop: "20px",
  },
  userfield: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  paper2: {
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    width: 700,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "600px",
    marginTop: "100px",
  },
  modalDiv: {
    // marginLeft: "80px",
    // width: "60%",
    padding: theme.spacing(2, 3, 3),
  },
  modalDiv2: {
    padding: theme.spacing(2, 3, 3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mainpaper: {
    marginTop: "50px",
    position: "sticky",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  paper1: {
    height: "40px",
    display: "flex",
    justifyContent: "space-around",
  },
  paperItem: {
    marginTop: "20px",
  },
  tabroot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    height: 300,
  },
  avatar: {
    backgroundColor: "red",
  },
  media: {
    height: "50px",
    width: 240,
    paddingTop: "56.25%", // 16:9
    borderBottom: "2px solid lightblue",
  },
  cardroot: {
    maxWidth: 240,
    background: "whitesmoke",
    marginLeft: "20px",
    marginBottom: "10px",
    cursor: "pointer",
    border: "2px solid #287aed",
  },
  large: {
    width: "260px",
    height: "260px",
  },
  rating: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
  control: {
    width: "80%",
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
  },
  paper5: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "80%",
    [theme.breakpoints.up("md")]: {
      width: "90%",
    },
    height: "190%",
    [theme.breakpoints.up("sm")]: {
      height: "120%",
    },
  },
  paper6: {
    // border: "2px solid #287aed",
    height: "100%",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
  },
  paper7: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // border: "2px solid #287aed",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "58%",
    },
    // marginTop: "10px",
    // [theme.breakpoints.up("sm")]: {
    //   marginTop: "0px",
    // },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

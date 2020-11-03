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
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginRight: "50px",
    width: "70%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(1),
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
    width: "250px",
    paddingTop: "56.25%", // 16:9
    border: "2px solid lightblue",
  },
  cardroot: {
    maxWidth: 250,
    background: "lightblue",
    marginLeft: "20px",
    cursor: "pointer",
  },
  large: {
    width: "260px",
    height: "260px",
  },
}));

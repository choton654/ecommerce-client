import React from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
const Adminresource = (Component) => {
  const Admin = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user.role !== 1) {
      enqueueSnackbar(`Admin resources`, { variant: "error" });
      history.push("/");
      console.log("not logged in");
    }

    return <Component />;
  };
  return Admin;
};

export default Adminresource;

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

const Protectuser = (Component) => {
  const MustLogin = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const token = localStorage.getItem("token");
    if (token === null) {
      enqueueSnackbar(`Login first`, { variant: "error" });
      history.push("/");
      console.log("not logged in");
    }

    return <Component />;
  };
  return MustLogin;
};

export default Protectuser;

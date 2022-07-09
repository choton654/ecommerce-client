import { Grid } from "@material-ui/core";
import React from "react";
import Category from "../components/category/category";
import Navbar from "./layout/navbar";
import Searchitems from "./layout/searchitems";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Category />
    </div>
  );
};

export default Home;

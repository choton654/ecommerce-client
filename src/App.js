import React from "react";
import Createproducts from "./components/products/createproducts";
import User from "./components/user/user";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/home";
import Createcategory from "./components/category/createcategory";
import Singleproduct from "./components/products/singleproducts";
import Subcategory from "./components/category/subcategory";
import Cart from "./components/cart/cart";
import Allusers from "./components/user/allusers";
import JwtDecode from "jwt-decode";
import Homeproduct from "./components/homeproduct";
function App() {
  const history = useHistory();
  const token = localStorage.getItem("token") || "";
  const decode = token && JwtDecode(token);
  const date = Date.now() / 1000;
  const isExpTime = decode.exp - date <= 0;
  console.log(date, decode.exp, decode.exp - date, isExpTime);
  if (isExpTime === true) {
    localStorage.removeItem("token");
    history.push("/");
  }
  return (
    <div>
      <Home />
      <Switch>
        <Route exact path="/" component={Homeproduct} />
        <Route exact path="/user" component={User} />
        <Route exact path="/allusers" component={Allusers} />
        <Route exact path="/products" component={Createproducts} />
        <Route exact path="/:productId/product" component={Singleproduct} />
        <Route exact path="/addcategory" component={Createcategory} />
        <Route exact path="/:id/subcategory/:name" component={Subcategory} />
        <Route exact path="/viewcart" component={Cart} />
      </Switch>
    </div>
  );
}

export default App;

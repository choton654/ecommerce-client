import React from "react";
import Createproducts from "./components/products/createproducts";
import User from "./components/user/user";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Createcategory from "./components/category/createcategory";
import Singleproduct from "./components/products/singleproducts";
import Subcategory from "./components/category/subcategory";
import Cart from "./components/cart/cart";
function App() {
  return (
    <div>
      <Home />
      <Switch>
        <Route exact path="/user" component={User} />
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

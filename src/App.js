import React, { useState, useEffect, useContext } from "react";
import Createproducts from "./components/products/createproducts";
import User from "./components/user/user";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/home";
import Createcategory from "./components/category/createcategory";
import Singleproduct from "./components/products/singleproducts";
import Subcategory from "./components/category/subcategory";
import Cart from "./components/cart/cart";
import Allusers from "./components/user/allusers";
import Order from "./components/order/order";
import Shipping from "./components/order/shipping";
import JwtDecode from "jwt-decode";
import Homeproduct from "./components/homeproduct";
import Searchitems from "./components/layout/searchitems";
import Productdetails from "./components/products/productdetails";
import axios from "axios";
import BASE_URL from "./api";
import Allorders from "./components/order/allorders";
import firebase from "firebase";
import firebaseConfig from "./components/firebase/firebaseconfig";
import { useSnackbar } from "notistack";
import { AuthContext } from "./components/user/authcontext";
import Login from "./components/user/login";
import Footer from "./components/footer";

function App() {
  const { state, dispatch } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);
  const token = localStorage.getItem("token") || "";
  const decode = token && JwtDecode(token);
  const date = Date.now() / 1000;
  const isExpTime = decode.exp - date <= 0;
  console.log(date, decode.exp, decode.exp - date, isExpTime);
  if (isExpTime === true) {
    localStorage.removeItem("token");
    history.push("/");
  }
  const [search, setSearch] = useState("");
  const [searchmenu, setSearchmenu] = useState(null);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchmenu(e.currentTarget);
    axios
      .post(`${BASE_URL}/product/api/search`, { search })
      .then((res) => {
        const item = res.data.findProduct;
        setSearchedProducts(item);
        console.log(searchedProducts);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Home searchitem={handleSearch} search={search} />
      <Searchitems
        searchmenu={searchmenu}
        searchedProducts={searchedProducts}
      />
      <Switch>
        <Route exact path="/" component={Homeproduct} />
        <Route exact path="/user" component={User} />
        <Route exact path="/allusers" component={Allusers} />
        <Route exact path="/products" component={Createproducts} />
        <Route exact path="/:orderid/vieworder" component={Order} />
        <Route exact path="/user/address" component={User} />
        <Route exact path="/user/order" component={User} />
        <Route
          exact
          path="/:productid/productdetails"
          component={Productdetails}
        />
        <Route
          exact
          path="/:productId/:productname"
          component={Singleproduct}
        />
        <Route exact path="/addcategory" component={Createcategory} />
        <Route exact path="/:id/subcategory/:name" component={Subcategory} />
        <Route exact path="/viewcart" component={Cart} />
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/payment" component={Shipping} />
        <Route exact path="/allorders" component={Allorders} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

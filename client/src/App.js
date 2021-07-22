import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Components
import Home from "./components/Home";
import Compare from "./components/Compare";
import Product from "./components/Product";
// import Product from "./components/devices/desktop/Product";
import Wishlist from "./components/WishList";
import Profile from "./components/devices/desktop/Profile";
import AdminSignin from "./components/admin/SignIn";
import AdminDashboard from "./components/admin/Dashboard";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/compare" exact component={Compare} />
        <Route path="/product" component={Product} />
        <Route path="/wishlist" exact component={Wishlist} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/admin" exact component={AdminSignin} />
        <Route path="/admindashboard" exact component={AdminDashboard} />
      </Router>
    </React.Fragment>
  );
}

export default App;
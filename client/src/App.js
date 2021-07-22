import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Home from "./components/Home";
import Compare from "./components/Compare";
import Product from "./components/Product";
import Product1 from "./components/devices/desktop/Product";
import Wishlist from "./components/WishList";
import Profile from "./components/devices/desktop/Profile";
import AdminSignin from "./components/admin/SignIn";
import AdminDashboard from "./components/admin/Dashboard";
import ViewProducts from "./components/admin/ViewProducts";
import useWindowDimensions from "./components/useWindowDimensions";

import { DataProvider } from "./components/admin/context/dataContext.js";

function App() {
  const { width } = useWindowDimensions();
  const [data, setData] = useState({});
  return (
    <DataProvider>
      <React.Fragment>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/compare" exact component={Compare} />
          {width > 992 ? (
            <Route path="/product" component={Product1} />
          ) : (
            <Route path="/product" component={Product} />
          )}
          <Route path="/wishlist" exact component={Wishlist} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/admin" exact component={AdminSignin} />
          <Route
            path="/admindashboard/add"
            exact
            component={() => <AdminDashboard />}
          />
          <Route
            path="/admindashboard/view"
            exact
            component={() => <ViewProducts />}
          />
        </Router>
      </React.Fragment>
    </DataProvider>
  );
}

export default App;

import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem component={Link} to="/admindashboard/add" button>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Products" />
    </ListItem>
    <ListItem component={Link} to="/admindashboard/view" button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="View Products" />
    </ListItem>
  </div>
);

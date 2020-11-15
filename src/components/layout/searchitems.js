import React from "react";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
const Searchitems = ({ searchmenu, searchedProducts }) => {
  return (
    <Collapse in={Boolean(searchmenu)} timeout="auto" unmountOnExit>
      <List style={{ maxWidth: "300px" }}>
        <ListItem style={{ display: "flex", flexDirection: "column" }}>
          {searchedProducts.map((item) => (
            <Link to={`/${item._id}/product`}>
              {" "}
              <ListItemText primary={`${item.name}`} />
            </Link>
          ))}
        </ListItem>
      </List>
    </Collapse>
  );
};

export default Searchitems;

import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import {
  Box,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ProductContext } from "./productcontext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Editproduct from "./editproduct";
import MoreIcon from "@material-ui/icons/More";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const Productlist = ({ editProduct, deleteProd, open, close }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(ProductContext);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [imageOpen, setImageOpen] = useState(false);
  const handleImageOpen = () => {
    setImageOpen(true);
  };
  const handleImageClose = () => {
    setImageOpen(false);
  };
  const columns = [
    { id: "name", label: "Name", minWidth: 170, backgroundColor: "lightpink" },
    {
      id: "price",
      label: "Price",
      minWidth: 100,
      backgroundColor: "lightpink",
    },
    {
      id: "brand",
      label: "Brand",
      minWidth: 170,
      align: "right",
      backgroundColor: "lightpink",
    },
    {
      id: "count",
      label: "Count",
      minWidth: 170,
      align: "right",
      backgroundColor: "lightpink",
    },
    {
      id: "category",
      label: "Category",
      minWidth: 170,
      align: "right",
      backgroundColor: "lightpink",
    },
  ];

  const rows =
    state.products &&
    state.products.map((prod) => ({
      id: prod._id,
      name: prod.name,
      price: `₹${prod.price}`,
      brand: prod.brand,
      count: prod.count,
      category: prod.category.name,
      photo: prod.photo,
    }));
  console.log(rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">Products List</Typography>

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <Fragment key={row.id}>
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                        >
                          <Tooltip title="more">
                            <MoreIcon
                              onClick={() =>
                                history.push(`/${row.id}/productdetails`)
                              }
                              style={{
                                color: "#287aed",
                              }}
                              fontSize="small"
                            />
                          </Tooltip>

                          <Tooltip title="delete">
                            <DeleteForeverIcon
                              style={{
                                marginLeft: "10px",
                                color: "red",
                                border: "1px solid grey",
                                backgroundColor: "lightpink",
                              }}
                              fontSize="small"
                              onClick={deleteProd}
                            />
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                    {/* <Editproduct open={open} close={close} productid={row.id} /> */}
                  </Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default Productlist;

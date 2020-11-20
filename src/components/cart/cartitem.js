import { Button, IconButton, Typography } from "@material-ui/core";
import React from "react";
import BASE_URL from "../../api";
import RemoveIcon from "@material-ui/icons/Remove";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import AddIcon from "@material-ui/icons/Add";
const Cartitem = ({ item, removeitem, addtocart }) => {
  return (
    <div
      key={item._id}
      style={{
        padding: "24px",
        border: "2px solid #287aed",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: "112px",
            width: "112px",
            position: "relative",
            // margin: "0 auto",
          }}
        >
          <img
            src={item.productId && `${BASE_URL}${item.productId.photo[0].img}`}
            alt="no-image"
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              top: "0",
              margin: "auto",
              opacity: "1",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>

        <div
          style={{
            padding: "0 24px 12px",
            verticalAlign: "top",
            minHeight: "112px",
            flex: "1 1",
            overflow: "hidden",
            maxWidth: "460px",
          }}
        >
          <Typography style={{ maxWidth: "200px" }}>
            <strong>{item.productId && item.productId.name}</strong>
          </Typography>
          <Typography style={{ marginTop: "10px" }}>
            Seller:<span>{item.productId.brand}</span>
          </Typography>
          <Typography style={{ marginTop: "10px" }}>
            <strong>
              ₹<span>{item.productId.price}</span>
            </strong>
          </Typography>
        </div>
        <div>
          <Typography>Delivered in 7 days</Typography>
        </div>
      </div>
      <div style={{ paddingTop: "10px", display: "block" }}>
        <div style={{ display: "flex" }}>
          <IconButton
            style={{
              width: "28px",
              height: "28px",
              background: "linear-gradient(#fff,#f9f9f9)",
              display: "inline-block",
              border: "1px solid #c2c2c2",
              cursor: "pointer",
              fontSize: "16px",
              borderRadius: "50%",
              paddingTop: "1px",
              lineHeight: "1",
            }}
            onClick={removeitem}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <div
            style={{
              display: "inline-block",
              padding: "3px 6px",
              width: "calc(100% - 60px)",
              height: "100%",
              width: "46px",
              height: "28px",
              borderRadius: "2px",
              backgroundColor: "#fff",
              border: "1px solid #c2c2c2",
              margin: "0 5px",
            }}
          >
            <input
              type="text"
              value={item.quantity}
              style={{
                border: "none",
                width: "100%",
                fontSize: "14px",
                fontWeight: "500",
                verticalAlign: "middle",
                textAlign: "center",
              }}
            />
          </div>
          <IconButton
            style={{
              width: "28px",
              height: "28px",
              background: "linear-gradient(#fff,#f9f9f9)",
              display: "inline-block",
              border: "1px solid #c2c2c2",
              cursor: "pointer",
              fontSize: "16px",
              borderRadius: "50%",
              paddingTop: "1px",
              lineHeight: "1",
            }}
            onClick={addtocart}
          >
            <AddIcon fontSize="small" />
          </IconButton>
          <div style={{ paddingLeft: "20px", display: "inline-block" }}>
            <Button
              style={{ height: "30px", marginRight: "20px" }}
              // variant="contained"
              color="secondary"
              onClick={removeitem}
            >
              <RestoreFromTrashIcon style={{ marginRight: "10px" }} /> Remove
              Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;

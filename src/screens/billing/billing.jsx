import React, { useEffect, useState } from "react";
import "./billing.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { farmItems } from "../../service/b2c";
const Billing = () => {
  const [products, setProducts] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const [search, setSearch] = useState();

  useEffect(() => {
    const data = {
      lat: 12.984879,
      lng: 80.260219,
      pincode: "600041",
    };
    farmItems(data).then((res) => {
      setProducts(res.data.result);
    });
  }, []);

  useEffect(() => {
    console.log(
        products.filter((value) => {
            return (
              value.productName.toLowerCase().indexOf(search.toLowerCase()) > -1
            );
          }),
      "aaaaaaaaaaa"
    );
    setSearchList(
      products.filter((value) => {
        return (
          value.productName.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      })
    );
  }, [search]);
  return (
    <div className="billing">
      <div className="billing1">
        <div className="billing1-sub1">
          <TextField
            placeholder="scan or search for the product"
            size="small"
            style={{ width: "99%", margin: "1% 0%" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {searchList &&
            searchList.map((value) => {
              return <div>{value.productName}</div>;
            })}
          <TableContainer component={Paper}>
            <Table
              style={{ width: "100%", fontSize: "14px" }}
              size="small"
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderRight: 0.5 }}>#</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>ITEM CODE</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>PRODUCT NAME</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>QTY </TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>UNIT</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>PRICE/UNIT</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>DISCOUNT</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>TAX</TableCell>
                  <TableCell>TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ height: "100%" }}>
                <TableRow>
                  <TableCell sx={{ borderRight: 0.5 }}>1</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>APP</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>Apple</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>1</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>KG</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>150</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>0</TableCell>
                  <TableCell sx={{ borderRight: 0.5 }}>0</TableCell>
                  <TableCell>150</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="billing1-sub2">
          <button>Change quantity</button>
          <button>Add Item Discount</button>
          <button>Remove Item</button>
        </div>
      </div>
      <div className="billing2">
        <div className="billing2-sub1">
          <div className="billing2-sub3">
            <h4>Customer Details</h4>
            <div className="billing-sub3-text">
              <TextField
                label="Customer Name"
                size="small"
                sx={{ width: "45%" }}
              />
              <TextField label="Mobile" size="small" sx={{ width: "45%" }} />
            </div>
          </div>
          <div className="billing2-sub4">
            <h4>Bill Details</h4>
            <div className="billing2-sub4-content">
              <p>Sub Total</p>
              <p>₹0.00</p>
            </div>
            <div className="billing2-sub4-content">
              <p>Discount</p>
              <p>₹0.00</p>
            </div>
            <div className="billing2-sub4-content">
              <p>Tax</p>
              <p>₹0.00</p>
            </div>
            <hr />
            <div className="billing2-sub4-content">
              <h4>Total Amount</h4>
              <h4>₹0.00</h4>
            </div>
          </div>
        </div>
        <div className="billing2-sub2">
          <div className="billing2-sub5">
            <h4>Payment</h4>
            <div className="billing2-sub5-content">
              <p>Payment Mode</p>
              <FormControl sx={{ width: "50%" }} size="small">
                <InputLabel id="demo-multiple-name-label">
                  Payment Mode
                </InputLabel>
                <Select label="Payment Mode">
                  <MenuItem>Cash</MenuItem>
                  <MenuItem>UPI</MenuItem>
                  <MenuItem>Card</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="billing2-sub5-content">
              <p>Amount Received</p>
              <TextField
                placeholder="0.00"
                sx={{ width: "50%" }}
                size="small"
              />
            </div>
          </div>
          <Button variant="contained">Save and Print</Button>
        </div>
      </div>
    </div>
  );
};

export default Billing;

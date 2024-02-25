import React, { useEffect, useState } from "react";
import "./billing.css";
import {
  Button,
  FormControl,
  InputAdornment,
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
  // {
  //   productCode:"Product Code",
  //   productName:"Product Name",
  //   quantity:"Qty",
  //   unit:"Unit",
  //   unitValue:"KG",
  //   price:"price",
  //   offer:"Discount",
  //   gst:"gst",
  //   total:"total"
  // }
  const [products, setProducts] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [billingList, setBillingList] = useState([]);

  const [search, setSearch] = useState();
  const [selected, setSelected] = useState();
  const [customer, setCustomer] = useState("");
  const [mobile, setMobile] = useState();
  const [paymentMode, setPaymentMode] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

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
    setSearchList(
      products.filter((value) => {
        return (
          value.productName.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      })
    );
  }, [search]);

  const handleSelect = (value) => {
    const index = billingList.findIndex(
      (item) => item.productName === value.productName
    );
    if (index !== -1) {
      const updatedBillingList = [...billingList];
      updatedBillingList[index] = {
        ...updatedBillingList[index],
        quantity: value.quantity,
        price: value.price * value.quantity,
      };
      setBillingList(updatedBillingList);
    } else {
      var discountAmount = value.price - (value.price * value.offer) / 100;
      setBillingList([...billingList, { ...value, price: discountAmount }]);
    }
  };

  const handleRemove = () => {
    const index = billingList.findIndex(
      (item) => item.productName === selected.productName
    );
    const updatedBillingList = [...billingList];
    updatedBillingList.splice(index, 1);
    setBillingList(updatedBillingList);
  };

  useEffect(() => {
    const total = billingList.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );
    setSubTotal(total);
    setTotal(total);
  }, [billingList]);
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
          <div className="searchList">
            {searchList &&
              searchList.map((value) => {
                return (
                  <div onClick={() => handleSelect(value)}>
                    {value.productName}
                  </div>
                );
              })}
          </div>
          <div className="billing-table">
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
                    <TableCell sx={{ borderRight: 0.5 }}>
                      PRODUCT NAME
                    </TableCell>
                    <TableCell sx={{ borderRight: 0.5 }}>QTY </TableCell>
                    <TableCell sx={{ borderRight: 0.5 }}>UNIT</TableCell>
                    <TableCell sx={{ borderRight: 0.5 }}>PRICE/UNIT</TableCell>
                    <TableCell sx={{ borderRight: 0.5 }}>DISCOUNT</TableCell>
                    <TableCell sx={{ borderRight: 0.5 }}>TAX</TableCell>
                    <TableCell>TOTAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                  {billingList.map((value, index) => {
                    return (
                      <TableRow
                        style={{
                          backgroundColor:
                            selected &&
                            selected.productName === value.productName
                              ? "#c0c0c0"
                              : "#fff",
                        }}
                        onClick={() => setSelected(value)}
                      >
                        <TableCell sx={{ borderRight: 0.5 }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ borderRight: 0.5 }}>
                          {value.productCode}
                        </TableCell>
                        <TableCell sx={{ borderRight: 0.5 }}>
                          {value.productName}
                        </TableCell>
                        <TableCell sx={{ borderRight: 0.5 }}>
                          {value.unit}
                        </TableCell>
                        <TableCell sx={{ borderRight: 0.5 }}>
                          {value.unitValue}
                        </TableCell>
                        <TableCell sx={{ borderRight: 0.5 }}>
                          {value.actualPrice.toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ borderRight: 0.5 }}>
                          {value.offer}
                        </TableCell>
                        <TableCell sx={{ borderRight: 0.5 }}>
                          {value.gst}
                        </TableCell>
                        <TableCell>{value.price.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="billing1-sub2">
          <Button>Change quantity</Button>
          <Button>Add Item Discount</Button>
          <Button onClick={handleRemove}>Remove Item</Button>
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
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
              <TextField
                label="Mobile"
                size="small"
                sx={{ width: "45%" }}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
          <div className="billing2-sub4">
            <h4>Bill Details</h4>
            <div className="billing2-sub4-content">
              <p>Sub Total</p>
              <p>₹{subTotal.toFixed(2)}</p>
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
              <h4>₹{total.toFixed(2)}</h4>
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
                <Select
                  label="Payment Mode"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <MenuItem value={"Cash"}>Cash</MenuItem>
                  <MenuItem value={"UPI"}>UPI</MenuItem>
                  <MenuItem value={"Card"}>Card</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="billing2-sub5-content">
              <p>Amount Received</p>
              <TextField
                placeholder="0.00"
                sx={{ width: "50%" }}
                size="small"
                value={total}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
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

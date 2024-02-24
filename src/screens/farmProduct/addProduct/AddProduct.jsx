import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import {
  categoryService,
  farmItems,
  farmerMasterService,
  productMasterService,
  productTypeService,
  unitMasterService,
} from "../../../service/b2c";
import "./AddProduct.css";

const AddProduct = () => {
  const [category, setCategory] = useState([]);
  const [unit, setUnit] = useState([]);
  const [productType, setProductType] = useState([]);
  const [farmer, setFarmer] = useState([]);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({
    farmer: "",
    productCategory: "",
    productTypeMaster: "",
    productType: "",
    product: "",
    unit: "",
    unitValue: "",
    pricePerKg: "",
    margin: "",
    offer: "",
    itemCode: "",
    minStock: "",
    location: "",
  });

  const location = {
    lat: 12.984879,
    lng: 80.260219,
    pincode: "600041",
  };

  useEffect(() => {
    categoryService()
      .then((res) => {
        setCategory(res.data.result);
      })
      .catch((err) => console.warn(err));

    unitMasterService()
      .then((res) => {
        console.log(res.data.result);
        setUnit(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    productTypeService()
      .then((res) => {
        setProductType(res.data.result);
      })
      .catch((err) => console.log(err));

    farmerMasterService()
      .then((res) => {
        setFarmer(res.data.result);
      })
      .catch((err) => console.log(err));

    farmItems(location).then((res) => {
      setProducts(res.data.result);
    });
  }, []);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {};
  return (
    <div className="Addproduct">
      <div className="Addproduct1">
        <h3>Add Product</h3>
        <div className="Addproduct2">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 3, width: "15%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              name="productName"
              onChange={handleChange}
              value={data.productName}
              label="Item"
              size="small"
            />
            <FormControl sx={{ m: 3, width: "15%" }} size="small">
              <InputLabel id="demo-multiple-name-label">Category</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                name="productCategory"
                value={data.productCategory}
                label="Product Category"
                onChange={handleChange}
              >
                {category.map((value, index) => {
                  return (
                    <MenuItem value={value.categoryName}>
                      {value.categoryName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 3, width: "15%" }} size="small">
              <InputLabel id="demo-multiple-name-label">Unit</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                name="unitValue"
                value={data.unitValue}
                label="Unit"
                onChange={handleChange}
              >
                {unit.map((value, index) => {
                  return <MenuItem value={index}>{value.unitSymbol}</MenuItem>;
                })}
              </Select>
            </FormControl>
            {/* <TextField
            name="unit"
            onChange={handleChange}
            value={data.unit}
            label="Unit"
          /> */}

            <TextField
              name="itemCode"
              onChange={handleChange}
              value={data.itemCode}
              label="Item Code"
              size="small"
            />
          </Box>
          <div>
            <h4>Pricing/Stock</h4>
            <div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 3, width: "15%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  name="purchasePrice"
                  onChange={handleChange}
                  value={data.unit}
                  label="Purchase Price"
                  size="small"
                />
                <TextField
                  name="discount"
                  onChange={handleChange}
                  value={data.pricePerKg}
                  label="Discount"
                  size="small"
                />
                <TextField
                  name="salePrice"
                  onChange={handleChange}
                  value={data.pricePerKg}
                  label="Sale Price"
                  size="small"
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 3, width: "15%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  name="stock"
                  onChange={handleChange}
                  value={data.pricePerKg}
                  label="Opening Stock"
                  size="small"
                />
                <TextField
                  name="minStock"
                  onChange={handleChange}
                  value={data.pricePerKg}
                  label="Minimum Stock"
                  size="small"
                />
              </Box>
            </div>
          </div>
        </div>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;

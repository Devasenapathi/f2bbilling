import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./farmProduct.css";
import { useTheme } from "@mui/material/styles";
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
} from "../../service/b2c";

const Farmproduct = () => {
  //   const theme = useTheme();
  // const [personName, setPersonName] = useState([]);
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const handleChange = (event) => {

    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = () =>{
    console.log(data,'sssssssssssssssssssss ')
  }
  return (
    <div className="farmproduct">
      <div className="farmproduct1">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 3, width: "45%" },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl sx={{ m: 3, width: "45%" }}>
            <InputLabel id="demo-multiple-name-label">Farmer Name</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              name="farmer"
              value={data.farmer}
              label="Farmer Name"
              onChange={handleChange}
            >
              {farmer.map((value, index) => {
                return <MenuItem value={index}>{value.farmerName}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 3, width: "45%" }}>
            <InputLabel id="demo-multiple-name-label">
              Product Category
            </InputLabel>
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

          <FormControl sx={{ m: 3, width: "45%" }}>
            <InputLabel id="demo-multiple-name-label">
              Product Type Master
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              name="productTypeMaster"
              value={data.productTypeMaster}
              label="Product Type Master"
              onChange={handleChange}
            >
              {productType.map((value, index) => {
                return (
                  <MenuItem value={value.productType}>
                    {value.productType}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 3, width: "45%" }}>
            <InputLabel id="demo-multiple-name-label">Product Type</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              name="productType"
              value={data.productType}
              label="Product Type"
              onChange={handleChange}
            >
              <MenuItem value={"Normal"}>Normal</MenuItem>
              <MenuItem value={"ComboBag"}>Combobag</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 3, width: "45%" }}>
            <InputLabel id="demo-multiple-name-label">Product</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              name="product"
              value={data.product}
              label="Product"
              onChange={handleChange}
            >
              {products.map((value, index) => {
                return (
                  <MenuItem value={value.productName}>
                    {value.productName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField name="unit" onChange={handleChange} value={data.unit} label="Unit" />
          <FormControl sx={{ m: 3, width: "45%" }}>
            <InputLabel id="demo-multiple-name-label">Unit Value</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              name="unitValue"
              value={data.unitValue}
              label="Unit Value"
              onChange={handleChange}
            >
              {unit.map((value, index) => {
                return (
                  <MenuItem value={value.unitSymbol}>
                    {value.unitSymbol}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField name="pricePerKg" onChange={handleChange} label="Price Per KG" />
          <TextField name="margin" onChange={handleChange} label="Margin" />
          <TextField name="offer" onChange={handleChange} label="Offer" />
        </Box>
        <Button variant="contained" onClick={()=>handleSubmit()}>Submit</Button>
      </div>
    </div>
  );
};

export default Farmproduct;

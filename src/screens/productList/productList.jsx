import React, { useEffect, useState } from "react";
import {
  categoryService,
  farmItems,
  getFarmProductByIdService,
  updateFarmProductService,
} from "../../service/b2c";
import { getToken } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [category, setCategory] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const data = {
    lat: 12.984879,
    lng: 80.260219,
    pincode: "600041",
  };

  useEffect(() => {

    if(getToken().length>0){
      console.log(getToken().length)
    getCategories();
    getValue();
  }else{
    navigate('/')
  }
  }, []);

  const getValue = () => {
    getFarmProductByIdService()
      .then((res) => {
        console.log(res.data.result, "got farmproduct by id");
        setProductList(res.data.result.filter((res)=>res.farmId._id==="611a5a5d55c5cb38895fce12"));
        setProducts(res.data.result.filter((res)=>res.farmId._id==="611a5a5d55c5cb38895fce12"));
      })
      .catch((err) => {
        console.log(err, "error in getting farmProduct by Id");
      });
  };

  const getCategories = () => {
    categoryService()
      .then((res) => {
        setCategory(res.data.result);
      })
      .catch((err) => {
        console.log(err, "error in category fetching in price Update screen");
      });
  };

  const handleChange = (e, val) => {
    const index = products.findIndex((res) => res._id === val._id);
    const updatedProducts = [...products];

    updatedProducts[index][e.target.name] = e.target.value;
    updatedProducts[index][`${e.target.name}color`] = "lightblue";

    // setProducts(updatedProducts);

    updateFarmProductService({ ...val, [e.target.name]: e.target.value })
      .then((res) => {
        if(res.status === 200){
        updatedProducts[index][`${e.target.name}color`] = "lightgreen";
        setProducts(updatedProducts);
        }else{
          console.log('error')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeCategory=(e,val)=>{
    console.log(e.target.value,val)
  }

  const filterCategory = (e) => {
    setProductList(
      products.filter((res) => res.productCategoryId.categoryName === e)
    );
  };

  const handleImagePopup = (product) => {
    setSelectedProduct(product);
    setDisplayImage(product.image);
  };

  const closePopup = () => {
    setDisplayImage(null);
    setSelectedProduct(null);
  };

  return (
    <div>
      {displayImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
            display: "grid",
            placeItems: "center",
          }}
          onClick={closePopup}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={displayImage}
              alt="Product"
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <input type="file" name="image" id="image" />
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
      <select
        name="category"
        onChange={(e) => {
          filterCategory(e.target.value);
        }}
      >
        <option value="" disabled selected>
          Select category
        </option>
        {category &&
          category.map((res) => {
            return (
              <option key={res.categoryName} value={res.categoryName}>
                {res.categoryName}
              </option>
            );
          })}
      </select>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Status</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Actual Price</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Unit Value</th>
            <th>Max Unit</th>
          </tr>
        </thead>
        <tbody>
          {productList &&
            productList
              .sort((a, b) => {
                if (a.status > b.status) return 1;
                if (a.status < b.status) return -1;
                return 0;
              })
              .map((res, key) => (
                <tr key={key}>
                  <td>
                    <img
                      src={res.image}
                      alt="img"
                      style={{ height: "50px", width: "50px" }}
                      onClick={() => handleImagePopup(res)}
                    />
                  </td>
                  <td>
                    <button
                      style={{
                        color: res.status === 1 ? "green" : "red",
                        fontSize: "12px",
                      }}
                      name="status"
                      id="status"
                      value={res.status === 1 ? 2 : 1}
                      onClick={(e) => handleChange(e, res)}
                    >
                      {res.status === 1 ? "Enabled" : "Disabled"}
                    </button>
                  </td>
                  <td>
                    <input
                      type="text"
                      style={{
                        backgroundColor: res.productNamecolor || "",
                      }}
                      name="productName"
                      id="productName"
                      value={res.productName}
                      onChange={(e) => handleChange(e, res)}
                    />
                  </td>
                  <td>
                  <select name="productCategoryId" id="productCategoryId" onChange={(e)=>handleChange(e,res)}>
                    <option value="">{res.productCategoryId.categoryName}</option>
                    {category.map((res)=>{return <option value={res._id}>{res.categoryName&&res.categoryName}</option>})}
                  </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      style={{
                        backgroundColor: res.actualPricecolor || "",
                      }}
                      name="actualPrice"
                      id="actualPrice"
                      value={res.actualPrice}
                      onChange={(e) => handleChange(e, res)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      style={{
                        backgroundColor: res.pricecolor || "",
                      }}
                      name="price"
                      id="price"
                      value={res.price}
                      onChange={(e) => handleChange(e, res)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      style={{
                        backgroundColor: res.unitcolor || "",
                      }}
                      name="unit"
                      id="unit"
                      value={res.unit}
                      onChange={(e) => handleChange(e, res)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      style={{
                        backgroundColor: res.unitValuecolor || "",
                      }}
                      name="unitValue"
                      id="unitValue"
                      value={res.unitValue}
                      onChange={(e) => handleChange(e, res)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      style={{
                        backgroundColor: res.maxOrderQuantitycolor || "",
                      }}
                      name="maxOrderQuantity"
                      id="maxOrderQuantity"
                      value={res.maxOrderQuantity}
                      onChange={(e) => handleChange(e, res)}
                    />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

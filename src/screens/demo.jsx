import React, { useEffect, useState } from 'react';
import { addMultipleFarmProductService, categoryService, productTypeService, unitMasterService } from '../service/b2c';
import ProductList from './productList/productList';

const AppTab = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState()
  const [productType, setProductType] = useState([])
  const [unitType, setUnitType] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    // Initialize products with 4 empty products
    setProducts(new Array(1).fill({}));
    getCategories()
    unitTypes()
    productTypes()
  }, []);

  const unitTypes =()=>{
    unitMasterService().then((res)=>{
      console.log(res)
      setUnitType(res.data.result)
    }).catch((err)=>console.log(err))
  }

  const productTypes =()=>{
    productTypeService().then((res)=>{
      console.log(res,'product type service')
      setProductType(res.data.result)
    }).catch((err)=>console.log(err))
  }
  
  const getCategories=()=>{
    categoryService().then((res)=>{
      setCategory(res.data.result)
    }).catch((err)=>{console.log(err,'error in category fecthing in price Update screen')})
  }
  const handleAddInput = () => {
    setProducts([...products, {}]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setProducts(newProducts);
  };

  const handleSubmit = () => {
    var length = 0;
    if(selectedCategory){
      for(let data of products){
        const index = products.findIndex((res) => res._id === data._id);
        const updatedProducts = [...products];
        length =+1;
        const object ={
          "categoryName":selectedCategory,
          "deliveryRadius":100,
          "description":'',
          "Margin": 0,
          "offer": 0,
          "expectedDeliveryDays": 1,
          "createdBy":"Deva",
          "farmId":"611a5a5d55c5cb38895fce12",
          "farmCircleId":"611a492555c5cb38895fc65e",
          "farmerId":"645870d544c927042c61b387",
          "productTypeMasterId":productType.filter(res=>res.productType === data.productTypeMaster)[0]?._id
        }
        console.log(data)
        addMultipleFarmProductService({...data,...object}).then((res)=>{
          updatedProducts[index]['color'] = "lightgreen";
          setProducts(updatedProducts);
        }).catch((err)=>{
          console.log(err,'error in instering multiple farmproduct')
        })
      }
    }else{
      setError("Select the Category")
    }
  };

  return (
    <>
    <select name="category" onChange={(e)=>{
      setSelectedCategory(e.target.value);
      setError('')
      }}>
        <option value="1" disabled selected>select category</option>
        {category&&category.map((res)=>{
          return <option value={res.categoryName}>{res.categoryName}</option>
        })}
      </select>
      {error&&<p style={{color:"red"}}>select the category</p>}
      <table>
        <thead>
          <tr>
            <th></th>
            {/* <th>Image</th> */}
            <th>Product Name</th>
            <th>Actual Price</th>
            <th>Price</th>
            <th>UnitType</th>
            <th>Unit</th>
            <th>Unit Value</th>
            <th>Product Type Master</th>
            <th>Product Type</th>
            <th>Max Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} style={{backgroundColor:product.color&&"green"}}>
              <td><button style={{color:"red"}} onClick={{}}>-</button></td>
              {/* <td>{product.image?<img
                      src={product.image}
                      alt="img"
                      style={{ height: "50px", width: "50px" }}
                    />:<input type="file" name="image" id="image" />}</td> */}
              <td><input type="text" name="productName" value={product.productName} onChange={(e) => handleInputChange(index, e)} /></td>
              <td><input type="text" name="actualPrice" value={product.actualPrice} onChange={(e) => handleInputChange(index, e)} /></td>
              <td><input type="text" name="price" value={product.price} onChange={(e) => handleInputChange(index, e)} /></td>
              <td>
                <select name="unitType" id="unitType">
                  <option value="null" selected disabled>Unit Type</option>
                  {unitType && Array.from(new Set(unitType.map(res => res.unitType))).map((res)=>{
                    return <option value={res}>{res}</option>
                  })}
                </select>
              </td>
              <td><input type="text" name="unit" value={product.unit} onChange={(e) => handleInputChange(index, e)} /></td>
              {/* <td><input type="text" name="unitValue" value={product.unitValue} onChange={(e) => handleInputChange(index, e)} /></td> */}
              <td>
                <select name="unitValue" id="unitValue" onChange={(e) => handleInputChange(index, e)}>
                  <option value="null" selected disabled>Unit Value</option>
                  {unitType && unitType.map((res)=>{
                    return <option value={res.unitSymbol}>{res.unitSymbol}</option>
                  })}
                </select>
              </td>
              <td><select name="productTypeMaster" id="productTypeMaster" onChange={(e)=>handleInputChange(index,e)}>
                <option value="null" selected disabled>Select product type master</option>
                {productType && productType.map((res)=>{
                  return <option value={res.productType}>{res.productType}</option>
                })}
                </select></td>
              <td>
                <select name="productType" id="productType" onChange={(e)=>handleInputChange(index,e)}>
                  <option value="null" selected disabled>select product type</option>
                  <option value="Normal">Normal</option>
                  <option value="Combo">Combo</option>
                </select>
              </td>
              <td><input type="text" name="maxOrderQuantity" value={product.maxOrderQuantity} onChange={(e) => handleInputChange(index, e)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <input type='button' style={{marginRight:"10px",height:"25px", width:"75px", color:"blue"}} value="Add Row" onClick={handleAddInput} />
      <input type="button" style={{marginRight:"10px",height:"25px", width:"75px", color:"green"}} value="Submit" onClick={handleSubmit} />
      <br />
      <br />
      <ProductList/>
    </>
  );
}

export default AppTab;
import React, { useEffect, useRef, useState } from "react";
import "./billing_screen.css";
import { farmItems } from "../../service/b2c";
import {
  getBill,
  getOfflineBill,
  setBill,
  setOfflineBill,
} from "../../utils/storage";
import { OrderSave } from "../../service/order_service";

const BillingScreen = () => {
  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState();
  const [phoneNumber, setPhoneNUmber] = useState();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    unitValue: "",
    unit: 0,
  });
  const [billingList, setBillingList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Initial online status

  const selectRef = useRef(null);

  useEffect(() => {
    selectRef.current.focus();
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
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);
    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      if (getOfflineBill().length > 0) {
        getOfflineBill().map((val, index) => {});
      }
    }
  }, [isOnline]);

  const handleProduct = (e) => {
    const selectedProductName = e.target.value;
    const unitValue1 = products.find(
      (product) => product.productName === e.target.value
    ).unitValue;
    const units = products.find(
      (product) => product.productName === e.target.value
    ).unit;
    setNewProduct({
      ...newProduct,
      name: selectedProductName,
      price: "",
      unitValue: unitValue1,
      unit: units,
    });
  };

  const handleQuantity = (e) => {
    const quantity = e.target.value;
    const price =
      newProduct.name && !isNaN(quantity)
        ? (
            products.find((product) => product.productName === newProduct.name)
              .price * quantity
          ).toFixed(2)
        : "";
    setNewProduct({
      ...newProduct,
      quantity: quantity,
      price: price,
    });
  };

  const handleAddToBillingList = () => {
    const existingProductIndex = billingList.findIndex(
      (item) => item.name === newProduct.name
    );

    if (existingProductIndex !== -1) {
      // Update existing product
      const updatedBillingList = [...billingList];
      updatedBillingList[existingProductIndex] = {
        ...updatedBillingList[existingProductIndex],
        quantity: newProduct.quantity,
        price: newProduct.price,
      };
      setBillingList(updatedBillingList);
    } else {
      // Add new product to the list
      setBillingList([...billingList, { ...newProduct }]);
    }
    setNewProduct({ name: "", price: "", quantity: "" });
    setTotalAmount(0);
  };

  const handleRemoveFromBillingList = (index) => {
    const updatedBillingList = [...billingList];
    updatedBillingList.splice(index, 1);
    setBillingList(updatedBillingList);
    setTotalAmount(0); // Reset total amount
  };

  // Calculate total amount whenever billingList or newProduct changes
  useEffect(() => {
    const total = billingList.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0
    );
    setTotalAmount(total);
  }, [billingList, newProduct]);

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.target.tagName === "SELECT") {
        // If the Enter key is pressed on the <select> element, move focus to the next element
        moveFocusToNextElement();
      } else if (e.target.tagName === "BUTTON") {
        // If the Enter key is pressed on the "Add" button, move focus to the first input element
        moveFocusToFirstInputElement();
      } else {
        // For other elements, move focus to the next element
        moveFocusToNextElement();
      }
    }
  };

  const moveFocusToFirstInputElement = () => {
    selectRef.current.focus();
  };

  const moveFocusToNextElement = () => {
    // Define the order of elements to focus on
    const focusOrder = ["product", "quantity", "addButton"];

    // Get the currently focused element
    const currentElement = document.activeElement;

    // Find the index of the currently focused element in the order array
    const currentIndex = focusOrder.indexOf(currentElement.id);

    // Move the focus to the next element in the order
    if (currentIndex !== -1 && currentIndex + 1 < focusOrder.length) {
      const nextElementId = focusOrder[currentIndex + 1];
      const nextElement = document.getElementById(nextElementId);
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const isAddButtonDisabled = !newProduct.name || !newProduct.quantity;

  const onBilling = () => {
    const data = {
      customerName: customerName,
      farmId: products[0].farmId._id,
      farmCircleId: products[0].farmCircleId,
      orderId: new Date().getTime(),
      farmName: "FM0001",
      deviceType: "Retail",
      orderDateTime: new Date(),
      itemQuantity: billingList.length,
      paymentStatus: "Success",
      gstAmount: 9,
      commissionAmount: 0,
      discount: 0,
      orderAmount: totalAmount,
      netAmount: totalAmount,
      totalWeight: 0,
      orderCode: "",
      packingPrice: 0,
      orderStatus: "Success",
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      orderDate: new Date().getDate(),
      mobile: phoneNumber,
      purchaseDetails: billingList,
      billAmount: totalAmount,
      paymentType: "cash",
    };
    if (isOnline) {
      setBill([...getBill(), data]);
      OrderSave(data)
        .then((res) => {
          if (res.status === 200) {
            setBillingList([]);
            setCustomerName("");
            setPhoneNUmber("");
          } else {
          }
        })
        .catch((err) => console.log(err, "error"));
    } else {
      setOfflineBill([...getOfflineBill(), data]);
      console.log("offline data to soter in local storage");
    }
  };

  return (
    <div className={`billing ${isOnline ? "online" : "offline"}`}>
      <div className="head">
        <div className="details">
          <div>
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={customerName}
              name="customerName"
              onChange={(e) => setCustomerName(e.target.value)}
            />{" "}
          </div>
          <div>
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="number"
              placeholder="Enter Number"
              minLength={10}
              maxLength={10}
              value={phoneNumber}
              name="mobile"
              onChange={(e) => setPhoneNUmber(e.target.value)}
            />
          </div>
        </div>
        <div className="head-sub">
          <div
            className="internet"
            style={{
              backgroundColor: isOnline ? "green" : "red",
              height: "20px",
              width: "20px",
              borderRadius: "50%",
            }}
          ></div>
          <div>{isOnline ? "Online" : "Offline"}</div>
        </div>
      </div>

      <div>
        <h2>Add Product</h2>
        <div className="billing_content">
          <div className="billing_main">
            <label htmlFor="product">Product</label>
            <select
              ref={selectRef}
              value={newProduct.name}
              id="product"
              onChange={(e) => handleProduct(e)}
              onKeyUp={(e) => handleKeyUp(e)}
            >
              <option value="" disabled>
                Select a Product
              </option>
              {products.map((product) => (
                <option
                  key={product.name}
                  value={product.productName}
                  onKeyUp={(e) => handleKeyUp(e)}
                >
                  {product.productName}
                </option>
              ))}
            </select>
          </div>
          <div className="billing_main">
            <label htmlFor="quantity">Quantity</label>
            <div style={{ display: "flex" }}>
              <input
                type="number" // Use type "text" instead of "number"
                placeholder="Quantity"
                value={newProduct.quantity}
                onChange={(e) => handleQuantity(e)}
                onKeyUp={(e) => handleKeyUp(e)}
                id="quantity"
                step="0.25"
                pattern="^\d+(?:\.\d{1,2})?$"
              />
              {newProduct.name && (
                <p>
                  {newProduct.unit}
                  {newProduct.unitValue}
                </p>
              )}
            </div>
          </div>
          <div className="billing_main">
            <label>Rate</label>
            <p>
              ₹ {newProduct.name && newProduct.quantity ? newProduct.price : 0}
            </p>
          </div>
          <div>
            <button
              onClick={handleAddToBillingList}
              disabled={isAddButtonDisabled}
              onKeyUp={(e) => handleKeyUp(e)}
              id="addButton"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2>Billing List</h2>
        <table>
          <tr>
            <th>S.No</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {billingList.map((item, index) => {
            return (
              <tr key={index} className="table-row">
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>Rs.{item.price}</td>
                <td>
                  <button onClick={() => handleRemoveFromBillingList(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td>total</td>
            <td> Rs.{totalAmount.toFixed(2)}</td>
          </tr>
        </table>
      </div>
      {/* <div>
        <h2>Total Amount: Rs.{totalAmount.toFixed(2)}</h2>
      </div> */}
      <div className="print-button-div">
        <button className="print-button" onClick={onBilling}>
          Print
        </button>
      </div>
    </div>
  );
};

export default BillingScreen;

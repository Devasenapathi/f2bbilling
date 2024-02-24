import React, { useEffect, useState } from "react";
import "./Home.css";
import SideBar from "../SideBar/SideBar";
import AddProduct from "../farmProduct/addProduct/AddProduct";
import Farmproduct from "../farmProduct/farmProduct";
import Billing from "../billing/billing";
const Home = () => {
  const [visible, setVisible] = useState("home");
  return (
    <div className="home">
      <div className="home0">
        <div className="home1">
          <SideBar state={{ setVisible }} />
        </div>
        <div className="home2">
          {visible === "home" && <Billing />}
          {visible === "addProduct" && <AddProduct />}
          {visible === "product" && <Farmproduct />}
        </div>
      </div>
    </div>
  );
};

export default Home;

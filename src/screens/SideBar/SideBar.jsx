import React from "react";
import './SideBar.css'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useLocation } from "react-router-dom";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SideBar = ({state}) => {
  return (
    <div className="sidebar">
        <ul>
            <li onClick={()=>state.setVisible("home")}>Home</li>
            <li onClick={()=>state.setVisible("product")}>Add Product</li>
            <li onClick={()=>state.setVisible("purchase")}>Purchase</li>
            <li onClick={()=>state.setVisible("sale")}>Sales</li>
            <li onClick={()=>state.setVisible("billing")}>Billing</li>
        </ul>
    </div>
  );
};

export default SideBar;

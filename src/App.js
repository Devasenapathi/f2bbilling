import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import BillScreen from "./screens/billing/billScreen";
import Billing from "./screens/billing/billing";
import AppTab from "./screens/demo";
import Home from "./screens/home/home";
import Login from "./screens/login/login";
import ProductList from "./screens/productList/productList";

function App() {
  return (
    <div className="app">
      {/* <Home/> */}
      {/* <Billing/> */}
      {/* <BillScreen/> */}
      {/* <AppTab/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/priceChange" element={<AppTab/>}></Route>
        </Routes>
      </Router>
      {/* <ProductList/> */}
    </div>
  );
}

export default App;

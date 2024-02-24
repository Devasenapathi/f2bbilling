import "./App.css";
import BillScreen from "./screens/billing/billScreen";
import Billing from "./screens/billing/billing";
import AppTab from "./screens/demo";
import Home from "./screens/home/home";

function App() {
  return (
    <div className="app">
      {/* <Home/> */}
      {/* <Billing/> */}
      <BillScreen/>
      {/* <AppTab/> */}
    </div>
  );
}

export default App;

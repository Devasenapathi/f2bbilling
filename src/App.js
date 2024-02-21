import './App.css';
import Billing from './screens/billingScreen/billing_screens';
import Farmproduct from './screens/farmProduct/farmProduct';
import MenuBar from './screens/menuBar/menubar';

function App() {
  return(
    <div>
      <MenuBar/>
      {/* <Billing/> */}
      <Farmproduct/>
    </div>
  )
}

export default App;

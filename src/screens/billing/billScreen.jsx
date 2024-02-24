import React, { useState } from "react";
import Billing from "./billing";
import './billScreen.css'

const BillScreen = () => {
  const [tabs, setTabs] = useState([{ id: 1 }]);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const handleTabClose = (id) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
    // If the closed tab was the active tab, set the first tab as active
    if (activeTab === id && tabs.length > 1) {
      setActiveTab(tabs[0].id);
    }
  };

  const handleAddTab = () => {
    const newTabId = Math.max(...tabs.map((tab) => tab.id), 0) + 1;
    setTabs((prevTabs) => [
      ...prevTabs,
      {
        id: newTabId,
        label: `Tab ${newTabId}`,
        content: `Content for Tab ${newTabId}`,
      },
    ]);
    setActiveTab(newTabId);
  };

  return (
    <div className="billTab">
      <div className="billTab1">
        {tabs.map((value, index) => {
          return (
            <div className="billTab2">
              <span onClick={() => handleTabClick(value.id)}>Tab {index}</span>
              <button onClick={() => handleTabClose(value.id)}>&times;</button>
            </div>
          );
        })}
        <button onClick={handleAddTab}>+</button>
      </div>
      <Billing state={activeTab}/>
    </div>
  );
};

export default BillScreen;

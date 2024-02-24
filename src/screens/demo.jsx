import React, { useState } from 'react';

const Tab = ({ label, isActive, onClick, onClose }) => (
  <div className={`tab ${isActive ? 'active' : ''}`}>
    <span onClick={onClick}>{label}</span>
    <button onClick={onClose}>&times;</button>
  </div>
);

const TabContent = ({ content }) => <div className="tab-content">{content}</div>;

const AppTab = () => {
  const [tabs, setTabs] = useState([{ id: 1, label: 'Tab 1', content: 'Content for Tab 1' }]);
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
    setTabs((prevTabs) => [...prevTabs, { id: newTabId, label: `Tab ${newTabId}`, content: `Content for Tab ${newTabId}` }]);
    setActiveTab(newTabId);
  };

  return (
    <div className="app-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={tab.id === activeTab}
            onClick={() => handleTabClick(tab.id)}
            onClose={() => handleTabClose(tab.id)}
          />
        ))}
        <button onClick={handleAddTab}>+</button>
      </div>
      <TabContent content={tabs.find((tab) => tab.id === activeTab)?.content || ''} />
    </div>
  );
};

export default AppTab;

import React, { useState } from 'react';

const Tabs = ({ tabs }: { tabs: string[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div>
        {tabs.map((tab, index) => (
          <button key={index} onClick={() => setActiveTab(index)}>
            {tab}
          </button>
        ))}
      </div>
      <div>{`Content of ${tabs[activeTab]}`}</div>
    </div>
  );
};

export default Tabs;

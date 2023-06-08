

import { Button } from 'bootstrap';
import React, { useState } from 'react';
import SupportTicketPopUp from '../suppoprtTicketPopUp/SupportTicketPopUp';

function TabForViewOrder({orderId}) {
  const [activeTab, setActiveTab] = useState('tab1');
  const [showTicketPopUp, setShowTicketPopUp] = useState(false);
  const [popupId, setPopupId] = useState('');
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const closePopup = () => setShowTicketPopUp(false);
  const generateId = () => {
    // Generate an ID using your logic (e.g., library or custom code)
    const id = Math.random().toString(36).substr(2, 9);
    return id;
  };
  const handleShowTicketPopUp=()=>{
    setShowTicketPopUp(true)
    setPopupId(generateId); // Set the generated ID
  }
  return (
    <div className="TabForViewOrder">
      <button
        className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}
        onClick={() => handleTabClick('tab1')}
      >
        Discussion </button>
      <button
        className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}
        onClick={() => handleTabClick('tab2')}
      >
      Support Tickets
      </button>
      <button
        className={`tab ${activeTab === 'tab3' ? 'active' : ''}`}
        onClick={() => handleTabClick('tab3')}
      >
       File Manager
      </button>

      <div id="tab1" className={`tab-content ${activeTab === 'tab1' ? 'active' : ''}`}>
        <h2>Discussion Content</h2>
      </div>

      <div id="tab2" className={`tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
        <h2> Support Tickets</h2>
        
<button className='status-btn' onClick={handleShowTicketPopUp}>Create A Support Ticket</button>
     {
         showTicketPopUp &&  (
            <SupportTicketPopUp
            userOrderId={orderId}
            onClose={closePopup}
            ticketId={popupId}
            
            />
            )
     }
     
      </div>

      <div id="tab3" className={`tab-content ${activeTab === 'tab3' ? 'active' : ''}`}>
        <h2>  File Manager</h2>
      </div>
    </div>
  );
}

export default TabForViewOrder;

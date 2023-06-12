import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import SupportTicketPopUp from '../suppoprtTicketPopUp/SupportTicketPopUp';
import axios from 'axios';
import UsersStoredSupportTickets from '../userStoredSupportTicket/UsersStoredSupportTickets';

function TabForViewOrder({orderId}) {
  const [activeTab, setActiveTab] = useState('tab1');
  const [showTicketPopUp, setShowTicketPopUp] = useState(false);
  const [showStoredTicketPopUp, setShowStoredTicketPopUp] = useState(false);
  const [popupId, setPopupId] = useState('');
  const [usersTickets, setUsersTickets] = useState([]);
  const [shownPopupTicketId, setShownPopupTicketId] = useState(null);

  const fetchChatLog = async () => {
    try {
      // const response = await axios.get(`http://localhost:5000/getOrderIdmessages/${orderId}`);
      const response = await axios.get(`https://mserver.printbaz.com/getOrderIdmessages/${orderId}`);
      setUsersTickets(response.data.messages);
      console.log("response.data.messages",response.data.messages);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    // Fetch the chat log from the server when the component mounts
    fetchChatLog();
    
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const closePopup = () => {setShowTicketPopUp(false);setShowStoredTicketPopUp(false)};
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
     <hr />
     <h4 style={{marginTop:"20px"}}>All Support Tickets</h4>
     {
   usersTickets?.map(tickets =>
       <ul>
         <li  className='status-btn' onClick={() => setShownPopupTicketId(tickets?.ticketId)}>
          
             {tickets?.ticketId}
         </li>
         {
           shownPopupTicketId === tickets?.ticketId && (
               <UsersStoredSupportTickets
                   userOrderId={orderId}
                   onClose={() => setShownPopupTicketId(null)}
                   ticketId={tickets?.ticketId}
               />
           )
         }
       </ul>)
}

       
     
      </div>

      <div id="tab3" className={`tab-content ${activeTab === 'tab3' ? 'active' : ''}`}>
        <h2>  File Manager</h2>
      </div>
    </div>
  );
}

export default TabForViewOrder;

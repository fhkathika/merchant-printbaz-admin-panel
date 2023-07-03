import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import SupportTicketPopUp from '../suppoprtTicketPopUp/SupportTicketPopUp';
import axios from 'axios';
import UsersStoredSupportTickets from '../userStoredSupportTicket/UsersStoredSupportTickets';
import Accordion from 'react-bootstrap/Accordion';
function TabForViewOrder({orderId,email,viewClient}) {
  const {name}=viewClient;
  const [activeTab, setActiveTab] = useState('tab1');
  const [showTicketPopUp, setShowTicketPopUp] = useState(false);
  const [showStoredTicketPopUp, setShowStoredTicketPopUp] = useState(false);
  const [popupId, setPopupId] = useState('');
  const [usersTickets, setUsersTickets] = useState([]);
  const [shownPopupTicketId, setShownPopupTicketId] = useState(null);
  useEffect(() => {
    // Fetch the chat log from the server when the component mounts
    fetchChatLog();
    
  }, []);
  const fetchChatLog = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getOrderIdmessages/${orderId}`);
      // const response = await axios.get(`https://mserver.printbaz.com/getOrderIdmessages/${orderId}`);
      setUsersTickets(response.data.messages);
      console.log("response.data.messages",response.data.messages);
    } catch (err) {
      console.error(err);
    }
  };


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
            fetchTickets={fetchChatLog}
            userEmail={email}
            userName={name}
            
            />
            )
     }
     <hr />
     <h4 style={{marginTop:"20px"}}>All Support Tickets</h4>
     {
   usersTickets?.map(tickets =>
    <>
       <Accordion defaultActiveKey="0">
     
      <Accordion.Item eventKey="1">
        <Accordion.Header>
         Ticket Id:  <span style={{color:"blue",fontWeight:"bold",marginLeft:"10px"}}>{ tickets?.ticketId}</span> 
         
      {
         tickets?.ticketStatus==="open" &&
         <span style={{marginLeft:"10px",color:"purple",fontStyle:"italic"}}>{ tickets?.ticketStatus} </span> 
      }  
       {
         tickets?.ticketStatus==="replied" &&
         <span style={{marginLeft:"10px",color:"green",fontStyle:"italic"}}>{ tickets?.ticketStatus} </span> 
      } 
       {
         tickets?.ticketStatus==="pending" &&
         <span style={{marginLeft:"10px",color:"orange",fontStyle:"italic"}}>{ tickets?.ticketStatus} </span> 
      }  {
         tickets?.ticketStatus==="closed" &&
         <span style={{marginLeft:"10px",color:"red",fontStyle:"italic"}}>{ tickets?.ticketStatus} </span> 
      }
         </Accordion.Header>
        <Accordion.Body>
        <UsersStoredSupportTickets
                   userOrderId={orderId}
                   onClose={() => setShownPopupTicketId(null)}
                   ticketId={tickets?.ticketId}
                   ticketIssue={tickets?.ticketIssue}
                   userEmail={email}
                   userName={name}
               />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
   
      {/* {
           shownPopupTicketId === tickets?.ticketId && (
             
           )
         }  
        */}
      
    </>
      
       
       
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

import { Button } from 'bootstrap';
import React, { useContext, useEffect, useRef, useState } from 'react';
import SupportTicketPopUp from '../suppoprtTicketPopUp/SupportTicketPopUp';
import axios from 'axios';
import UsersStoredSupportTickets from '../userStoredSupportTicket/UsersStoredSupportTickets';
import Accordion from 'react-bootstrap/Accordion';
import { AuthContext } from '../../authProvider/AuthProvider';
function TabForViewOrder({orderId,email,viewClient,viewOrder,clientName}) {
  const {adminUser,loading,loginAdminUser,currentUser}=useContext(AuthContext);
  // const {clientName}=viewOrder;
  const [activeTab, setActiveTab] = useState('tab1');
  const [showTicketPopUp, setShowTicketPopUp] = useState(false);
  const [showStoredTicketPopUp, setShowStoredTicketPopUp] = useState(false);
  const [popupId, setPopupId] = useState('');
  const [usersTickets, setUsersTickets] = useState([]);
  const [usersDiscussMsg, setUsersDiscussMsg] = useState([]);
  const [shownPopupTicketId, setShownPopupTicketId] = useState(null);
  const [newMsg, setNewMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [usersStoredMessage, setUsersStoredMessage] = useState([]);
  const messagesEndRef = useRef(null);
  const[fetchAllTicket,setFetchAllTicket]=useState([])
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

// fetch msg for support ticket 
const fetchChatLog = async () => {
  try {
    // const response = await axios.get(`http://localhost:5000/getOrderIdmessages/${orderId}`);
    const response = await axios.get(`https://mserver.printbaz.com/getOrderIdmessages/${orderId}`);
    setUsersTickets(response.data.messages);
    // console.log("response.data.messages",response.data.messages);
  } catch (err) {
    console.error(err);
  }
};
// console.log("setUsersTicketsdd",usersTickets); 
  useEffect(() => {
    // Fetch the chat log from the server when the component mounts
    fetchChatLog();
    fetchDiscussionMsg();
    fetchAllTicketData()
   
    
  },scrollToBottom,[]);
  // discussion message input 
  const handleNewMessageChange = (e) => {
    // console.log(e.target.value);
    setNewMsg(e.target.value);
};
useEffect(scrollToBottom, [usersDiscussMsg]);  // This will scroll to bottom on new messages
///time format 
function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
let createTime=new Date().toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })
 // fetch msg for discussion msg 
 const fetchDiscussionMsg = async () => {
  try {
    // const response = await axios.get(`http://localhost:5000/getDiscussionMsg/${orderId}`);
    const response = await axios.get(`https://mserver.printbaz.com/getDiscussionMsg/${orderId}`);
    setUsersDiscussMsg(response.data.messages);
    // console.log("response.data.messages",response.data?.messages);
  } catch (err) {
    console.error(err);
  }
};
///send discussion message handler 
const handleSendDiscussionMessage = async (e) => {
  e.preventDefault();
  try {
    if (!newMsg.trim() ) {
      setShowAlert(true)
      return;
  }  
 
  const formData=new FormData();
    const newMessage = {  unread:true,clientOrderId:orderId, content: newMsg,userEmail:adminUser?.email,userName:"admin",userRole:"admin" };

    const chatMessage = {
     
      content: newMessage.content,
      userEmail: newMessage.userEmail,
      userName: newMessage.userName,
      unread: newMessage.unread,
      userRole:newMessage.userRole,
      clientOrderId:newMessage.clientOrderId,
      createTime: createTime, // this won't be the exact timestamp saved in the DB
    };
    Object.entries(chatMessage).forEach(([key,value])=>{
      formData.append(key,value)
    })

    // Add the new message to the local state immediately
    setChatLog([...chatLog, chatMessage]);
    

    // const response = await axios.post('http://localhost:5000/discussionMsg', formData, {
    const response = await axios.post('https://mserver.printbaz.com/discussionMsg', formData, {
headers: {
  'Content-Type': 'multipart/form-data',
},
});
    if (!response?.data?.success) {
      // If the message was not sent successfully, revert the local state
      setChatLog(oldChatLog => oldChatLog.filter(msg => msg !== chatMessage));
      setUsersStoredMessage(oldTickets => oldTickets.filter(ticket => ticket !== chatMessage));
      // console.error('Failed to send message');
    }
    setUsersStoredMessage(oldTickets => [...oldTickets, {
      ...chatMessage,
      messages: [chatMessage]
    }]);
    setNewMsg('');
    fetchDiscussionMsg()
    //  setCreateTicketnotify(true)
      // fetchTickets()
    // console.log("chatLog",chatLog);
  } catch (err) {
    console.error(err);
  }
}; 



 
  const fetchAllTicketData = async () => {
    try {
      // const response = await axios.get('http://localhost:5000/allTicket');
      const response = await axios.get('https://mserver.printbaz.com/allTicket');
      setFetchAllTicket(response.data);
   
    } catch (err) {
      console.error(err);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const closePopup = () => {setShowTicketPopUp(false);setShowStoredTicketPopUp(false)};
  let idCounter = 1; // Initialize a counter for the IDs
  const generateId = () => {
    const paddedId = String(idCounter).padStart(6, '0'); // Convert counter to string and pad with leading zeros
  
    if (fetchAllTicket?.filter(users => users?.ticketId === paddedId).length > 0) {
      idCounter++; // Increment the counter
      return generateId(); // Recursively call the function to generate the next ID
    }
  
    idCounter++; // Increment the counter
    return paddedId;
  };
  
  
  
  const handleShowTicketPopUp = () => {
    fetchAllTicketData()
    setShowTicketPopUp(true);
    
    setPopupId(generateId()); // Call the generateId function to get the generated ID
  };
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
        <div className="admin-dis-chat">
                    <div className="col-12">
                      <form onSubmit={handleSendDiscussionMessage}>
                        <input type="text" name="msg" value={newMsg} onChange={handleNewMessageChange} placeholder="Write Your Message....." />
                        <button className='btn_phone' type="submit">Post</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-12 admin-dis-post" style={{overflow:"scroll",maxHeight:"70vh"}}>
                    {
                      usersDiscussMsg?.map((msg,index)=>{
                        return(
                          <div className="dis-post pb-4"  key={index}>
                          <div>
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                            {/* <div className="text-muted small text-nowrap mt-2">{msg?.createTime}</div> */}
                          </div>
                          <div className="flex-shrink-1 rounded px-3 ml-3">
                            <div className=" font-weight-bold mb-1  block_phone "  style={{display:"flex" ,justifyContent:"cenetr",alignItems:"center"}}><p className='font_16 weight_600' style={{fontSize:"20px",fontWeight:"700"}}>{msg?.userEmail}</p>
                             <span style={{fontSize: '12px', fontWeight: 700, backgroundColor: 'rgb(255, 38, 38)', color: 'white', padding: '5px',marginLeft:"5px", borderRadius: '5px'}}>{msg?.userRole}</span>
                             <small style={{fontSize:"14px",marginLeft:"15px",color:"gray",fontWeight:"400"}}>{msg?.createTime}</small>
                             </div>
                            {msg?.content}
                          </div>
                        </div>
                        )
                      
                      })
                    }
                       <div ref={messagesEndRef} />
                  
                    {/* <div className="dis-post pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:34 am</div>
                      </div>
                      <div className="flex-shrink-1 rounded px-3 ml-3">
                        <div className="font-weight-bold mb-1" style={{fontSize: '20px', fontWeight: 700}}>Abir Ali Khan <span style={{fontSize: '12px', fontWeight: 700, backgroundColor: 'rgb(38, 139, 255)', color: 'white', padding: '5px', borderRadius: '5px'}}>Designer</span></div>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                      </div>
                    </div> */}
                 
                  </div>
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
            userName={clientName}
            
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
                   userName={clientName}
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

import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import "../../css/style.css"
import CreateTicketAlertbox from '../createTickwtAlert/CreateTicketAlertbox';
const SupportTicketPopUp = ({ message,ticketId,userOrderId,onClose,fetchTickets }) => {
  
  const [chatLog, setChatLog] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [ticketIssue, setTicketIssue] = useState('');
  const [createTicketnotify, setCreateTicketnotify] = useState(false);
  useEffect(() => {
    // Fetch the chat log from the server when the component mounts
    fetchChatLog();
  
    
  }, [ticketIssue]);


  const fetchChatLog = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/getmessages/${ticketId}`);
        const response = await axios.get(`https://mserver.printbaz.com/getmessages/${ticketId}`);
        setChatLog(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    const handleNewMessageChange = (e) => {
      console.log(e.target.value);
      setNewMsg(e.target.value);
  };
 console.log("newMessage",newMsg); 

 const getViewClientColor = (status) => {
  if (status === "onHold artwork issue") {
    return "Orange";
  }
  if (status === "onHold billing issue") {
    return "Orange";
  }
  if (status === "onHold out of stock") {
    return "Orange";
  }  
   
  
  if (status === "returned") {
    return "red";
  } 

    if (status === "cancellation") {
    return "red";
  }
   
  // you can add more conditions here or just return a default color
  // return "defaultColor";
};

const handleInputTicketIssueChange = async (e) => {
  e.preventDefault()

setTicketIssue(e.target.value)
 
 }

 console.log("status",ticketIssue);
 const handleSendMessage = async (e) => {
  e.preventDefault();
  try {
    console.log("ticketId",ticketId);
    const newMessage = { ticketId: ticketId,userOrderId:userOrderId,ticketIssue:ticketIssue,ticketStatus:"open", user: 'Admin', content: newMsg };

    
    // Check if the message was sent successfully
    // if (response?.data?.success) {
      // Append the newMessage to chatLog
      const chatMessage = {
        ticketId: newMessage.ticketId,  // added this line
        content: newMessage.content,
        ticketIssue: newMessage.ticketIssue,
        ticketStatus: newMessage.ticketStatus,
        admin: newMessage.user,
        orderId:newMessage.userOrderId,
        timestamp: new Date().toISOString(), // this won't be the exact timestamp saved in the DB
      };
      setChatLog([...chatLog, chatMessage]);
      // const response = await axios.post('http://localhost:5000/sendmessages',chatMessage);
      const response = await axios.post('https://mserver.printbaz.com/sendmessages',chatMessage);
      console.log("chatLog",chatLog);
      setNewMsg('');
     
      setCreateTicketnotify(true)
      fetchTickets()
    //  window.location.reload();
    // } else {
    //   // Handle error if the message was not sent successfully
    //   console.error('Failed to send message');
    // }
  } catch (err) {
    console.error(err);
  }
};

    

  return (
    <>
      <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\nbackground: #001846 !important;\npadding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\nwidth: 120px;\n}\n\n.nav-link {\ncolor: #ffffff !important;\nfont-size: 18px;\nfont-weight: 500;\ntext-align: center;\ntext-transform: uppercase;\npadding: 20px 20px 20px 20px;\nmargin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\nbackground-color: #ffffff;\ncolor: #001846 !important;\ntransition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\nbackground-color: #001846;\n}\n\n.nav-dropdown-item {\ncolor: #ffffff;\ntext-transform: uppercase;\n}\n\n.navbar-toggler {\nbackground-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .chat-user-list {\n    display: flex;\n    flex-direction: column;\n    max-height: 220px !important;\n    overflow-y: scroll;\n}\n\n.chat-messages {\n    display: flex;\n    flex-direction: column;\n    max-height: 220px !important;\n    overflow-y: scroll;\n}\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n.chat-page {\n    margin: 20px !important;\n}\n\n}\n.chat-page {\n   width:45%;\n}\n\n.chat-list-tab2 {\n    color: #001846 !important;\n    padding: 10px 25px 10px 25px;\n    margin: 0;\n}\n\n.chat-online {\n    color: #34ce57\n}\n\n.chat-offline {\n    color: #e4606d\n}\n\n.chat-user-list {\n    display: flex;\n    flex-direction: column;\n    max-height: 620px;\n    overflow-y: scroll;\n}\n\n.chat-messages {\n    display: flex;\n    flex-direction: column;\n    max-height: 620px;\n    overflow-y: scroll;\n}\n\n.chat-message-left,\n.chat-message-right {\n    display: flex;\n    flex-shrink: 0\n}\n\n.chat-message-left {\n    margin-right: auto\n}\n\n.chat-message-right {\n    flex-direction: row-reverse;\n    margin-left: auto\n}\n.py-3 {\n    padding-top: 1rem!important;\n    padding-bottom: 1rem!important;\n}\n.px-4 {\n    padding-right: 1.5rem!important;\n    padding-left: 1.5rem!important;\n}\n.flex-grow-0 {\n    flex-grow: 0!important;\n}\n.border-top {\n    border-top: 1px solid #dee2e6!important;\n}\n\n    " }} />
      <div className="" onClick={onClose} />
      <div className=" " >
        {/* <h2>{message}</h2> */}
        <p style={{color:"black",cursor:"pointer",textAlign:"right"}} onClick={onClose}>Cancel</p>
       
            <div className="card">
              <div className="row g-0">
               
                <div className="col-12 col-lg-7 col-xl-12">
                  <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="flex align-items-center py-1" >
                        <div className='d-flex align-items-center'>

                       
                      <div className="flex-grow-1 pl-3" style={{ marginLeft:"10px",textAlign:"left"}}>
                        <p>Order Id: <span style={{color:"blue"}}>{userOrderId}</span></p>
                        <p>Ticket id: <span style={{color:"orange"}}>{ticketId}</span> </p>
                       
                      </div>
                        </div>
                    
                      <div>
                      <select
                          id="status-filter"
                          className="status-btn"
                          
                          style={{
                            border: "none",
                            padding: "8px",
                            marginRight:'20px',
                            backgroundColor: getViewClientColor(
                              ticketIssue
                            ),
                          }}
                          name="ticketIssue"
                          value={ticketIssue}
                          required
                          onChange={ (e)=>handleInputTicketIssueChange(e)}
                        >
                     
                     <option value="">select issue</option>
                      <option value="onHold artwork issue">On hold- Artwork issue</option>
                      <option value="onHold billing issue">On hold- Billing Issue</option>
                     <option value="onHold out of stock">On hold- Out of stock</option>
                     <option value="returned">Returned</option>
                     <option value="cancellation">Cancellation</option>
                     <option value="general query">General Query</option>
                           
                              
                       
                        </select>
                      </div> 
                       
                     
                    </div>
                  </div>
                  <div className="position-relative">
                  {/* <div className="chat-messages p-4">
      { chatLog?.map(msg => (
        <div className={msg.admin === 'user' ? 'chat-message-right pb-4' : 'chat-message-left pb-4'}>
          <div>
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={msg.sender} width={40} height={40} />
            <div className="text-muted small text-nowrap mt-2">{new Date(msg.id).toLocaleTimeString()}</div>
          </div>
          <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            <div className="font-weight-bold mb-1">{msg?.admin}</div>
            {msg.content}
          </div>
        </div>
      ))}
     
     
    </div> */}
                  </div>
                  <div className="flex-grow-0 py-3 px-4 border-top">
                    <div >
                    <form className="input-group chat-messages p-4" onSubmit={handleSendMessage}>
        <textarea 
          type="text"
          rows="15" cols="33"
          value={newMsg}
          onChange={handleNewMessageChange}
          placeholder="Type your message here..."
          required
        />
       
         <button style={{textAlign:"right"}} className="btn"><i className="fa fa-paperclip" aria-hidden="true" /></button>
        <button className="btn btn-primary" type="submit">Create Ticket</button>
     
        {/* <input type="text" className="form-control"   value={newMessage}
          onChange={handleNewMessageChange} placeholder="Type your message" />
                      <button className="btn"><i className="fa fa-paperclip" aria-hidden="true" /></button>
                      <button className="btn btn-primary">Reply</button> */}
      </form>
      {
        createTicketnotify &&
        <CreateTicketAlertbox
        closeCreateTicketPopup={onClose}
        onClose={() => setCreateTicketnotify(false)}
        message="Your Ticket Createed Successfully"
        />
      }
                     
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
        
      </div>
    </>
  );
};

SupportTicketPopUp.propTypes = {
  message: PropTypes.string.isRequired,
  userOrderId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SupportTicketPopUp;

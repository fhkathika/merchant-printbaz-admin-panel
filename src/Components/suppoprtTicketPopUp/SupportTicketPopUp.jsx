import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const SupportTicketPopUp = ({ message,ticketId,userOrderId, onClose }) => {
  
  const [chatLog, setChatLog] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  useEffect(() => {
    // Fetch the chat log from the server when the component mounts
    fetchChatLog();
  }, []);

  const fetchChatLog = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getmessages');
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
  const handleSendMessage = async (e) => {
      e.preventDefault();
      try {
        const newMessage = { ticketId: ticketId, sender: 'user', message: chatLog };
        const response = await axios.post('http://localhost:5000/sendmessages', newMessage);
        // Update the chat log with the message received from the server
        setChatLog([...chatLog, response.data]);
        console.log("chatLog",chatLog);
        console.log("response.data",response.data);
      } catch (err) {
        console.error(err);
      }
      // setNewMsg('');
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
          <style dangerouslySetInnerHTML={{__html: "\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\nbackground: #001846 !important;\npadding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\nwidth: 120px;\n}\n\n.nav-link {\ncolor: #ffffff !important;\nfont-size: 18px;\nfont-weight: 500;\ntext-align: center;\ntext-transform: uppercase;\npadding: 20px 20px 20px 20px;\nmargin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\nbackground-color: #ffffff;\ncolor: #001846 !important;\ntransition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\nbackground-color: #001846;\n}\n\n.nav-dropdown-item {\ncolor: #ffffff;\ntext-transform: uppercase;\n}\n\n.navbar-toggler {\nbackground-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .chat-user-list {\n    display: flex;\n    flex-direction: column;\n    max-height: 220px !important;\n    overflow-y: scroll;\n}\n\n.chat-messages {\n    display: flex;\n    flex-direction: column;\n    max-height: 220px !important;\n    overflow-y: scroll;\n}\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n.chat-page {\n    margin: 20px !important;\n}\n\n}\n.chat-page {\n    margin: 20px 50px 50px 50px;\n}\n\n.chat-list-tab2 {\n    color: #001846 !important;\n    padding: 10px 25px 10px 25px;\n    margin: 0;\n}\n\n.chat-online {\n    color: #34ce57\n}\n\n.chat-offline {\n    color: #e4606d\n}\n\n.chat-user-list {\n    display: flex;\n    flex-direction: column;\n    max-height: 620px;\n    overflow-y: scroll;\n}\n\n.chat-messages {\n    display: flex;\n    flex-direction: column;\n    max-height: 620px;\n    overflow-y: scroll;\n}\n\n.chat-message-left,\n.chat-message-right {\n    display: flex;\n    flex-shrink: 0\n}\n\n.chat-message-left {\n    margin-right: auto\n}\n\n.chat-message-right {\n    flex-direction: row-reverse;\n    margin-left: auto\n}\n.py-3 {\n    padding-top: 1rem!important;\n    padding-bottom: 1rem!important;\n}\n.px-4 {\n    padding-right: 1.5rem!important;\n    padding-left: 1.5rem!important;\n}\n.flex-grow-0 {\n    flex-grow: 0!important;\n}\n.border-top {\n    border-top: 1px solid #dee2e6!important;\n}\n\n    " }} />
      <div className="alert-overlay" onClick={onClose} />
      <div className="alert-box chat-page">
        {/* <h2>{message}</h2> */}
        <p style={{color:"black",cursor:"pointer",textAlign:"right"}} onClick={onClose}>Cancel</p>
       
            <div className="card">
              <div className="row g-0">
               
                <div className="col-12 col-lg-7 col-xl-12">
                  <div className="py-2 px-4 border-bottom d-none d-lg-block">
                    <div className="d-flex align-items-center py-1" style={{justifyContent:"space-between"}}>
                        <div className='d-flex align-items-center'>

                        <div className="position-relative">
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={1684051962640} width={40} height={40} />
                      </div>
                      <div className="flex-grow-1 pl-3" style={{ marginLeft:"10px",textAlign:"left"}}>
                        <p>Order Id: <span style={{color:"blue"}}>{userOrderId}</span></p>
                        <p>Ticket id: <span style={{color:"orange"}}>{ticketId}</span> </p>
                        <div className="text-muted small"><em>Typing...</em></div>
                      </div>
                        </div>
                    
                      <div>
                        <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block" style={{backgroundColor: '#E70000', border: 'none'}}><svg width={24} height={24} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" /></svg></button>
                        <button className="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal feather-lg"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg></button>
                      </div>
                    </div>
                  </div>
                  <div className="position-relative">
                  <div className="chat-messages p-4">
      {chatLog.map(msg => (
        <div className={msg.sender === 'user' ? 'chat-message-right pb-4' : 'chat-message-left pb-4'}>
          <div>
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={msg.sender} width={40} height={40} />
            <div className="text-muted small text-nowrap mt-2">{new Date(msg.id).toLocaleTimeString()}</div>
          </div>
          <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            <div className="font-weight-bold mb-1">{msg.sender}</div>
            {msg.message}
          </div>
        </div>
      ))}
    </div>
                  </div>
                  <div className="flex-grow-0 py-3 px-4 border-top">
                    <div >
                    <form className="input-group" onSubmit={handleSendMessage}>
        <input 
          type="text"
          value={newMsg}
          onChange={handleNewMessageChange}
          placeholder="Type your message here..."
        />
         <button className="btn"><i className="fa fa-paperclip" aria-hidden="true" /></button>
        <button className="btn btn-primary" type="submit">Send</button>
     
        {/* <input type="text" className="form-control"   value={newMessage}
          onChange={handleNewMessageChange} placeholder="Type your message" />
                      <button className="btn"><i className="fa fa-paperclip" aria-hidden="true" /></button>
                      <button className="btn btn-primary">Reply</button> */}
      </form>
                     
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

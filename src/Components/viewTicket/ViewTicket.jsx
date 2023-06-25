


import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useLocation } from 'react-router-dom';
import AlertMessage from '../alert/AlertMessage';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { Overlay, Tooltip } from 'react-bootstrap';

const ViewTicket = () => {
  const messagesEndRef = React.useRef(null);
    const location = useLocation();
    const [openTextBox, setOpenTextBox] = useState(false);
    const [chatLog, setChatLog] = useState([]);
    const [newMsg, setNewMsg] = useState('');
    const viewTicketDetail = location.state ? location?.state?.allTicket : null;
    const [usersStoredTickets, setUsersStoredTickets] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [ticketClose, setTicketClose] = useState(false);
    const [ticketStatus, setTicketStatus] = useState(viewTicketDetail?.ticketStatus);
    const [showAlert, setShowAlert] = useState(false);
    const [showMailTooltip, setShowMailTooltip] = useState(false);
  const target = useRef(null);
    const [formatType, setFormatType] = useState({});
    console.log("viewTicketDetail",viewTicketDetail);
    console.log("openTextBox",openTextBox);
    console.log("ticketStatus",ticketStatus);

    const { quill, quillRef, Quill } = useQuill({
      modules: { blotFormatter: {} }
    });
    if (Quill && !quill) {
      // const BlotFormatter = require('quill-blot-formatter');
      Quill.register('modules/blotFormatter', BlotFormatter);
    }
  
    useEffect(() => {
      if (quill) {
        quill.on('text-change', (delta, oldContents) => {
          // const text =  quillRef.current.getEditor().getText();
          // setNewMsg(text)
          console.log("delta,delta",delta);
          delta.ops.forEach((op) => {
            if (typeof op.insert === 'string') {
              console.log('Inserted text:', op.insert);
              console.log('Applied formats:', op.attributes);
            } else if (op.insert && typeof op.insert === 'object') {
              // handle embeds like images, video etc.
              Object.keys(op.insert).forEach((key) => {
                console.log('Inserted object of type:', key);
                console.log('Object value:', op.insert[key]);
                console.log('Applied formats:', op.attributes);
              });
            }
          });
          const currentContents = quill.getContents();
          console.log(currentContents.diff(oldContents));
  
          const text = quill.getText();
          const format=quill.getFormat();
          console.log('Typed text:', format);
          // setNewMsg(text)
          setNewMsg(quill.root.innerHTML);
        });
      }
    }, [quill, Quill]);
    console.log("formatType",formatType);


    useEffect(() => {
        // Fetch the chat log from the server when the component mounts
       
        fetchOrderIddata();
            // Fetch the chat log every 10 seconds
      const intervalId = setInterval(fetchOrderIddata, 10000);

      // Clean up the interval on unmount
      return () => clearInterval(intervalId);
      }, [messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })]);
      const fetchOrderIddata = async () => {
        try {
          // const response = await axios.get(`http://localhost:5000/getOrderIdmessages/${viewTicketDetail?.orderId}`);
          const response = await axios.get(`https://mserver.printbaz.com/getOrderIdmessages/${viewTicketDetail?.orderId}`);
 
          setUsersStoredTickets(response.data.messages);
       
        } catch (err) {
          console.error(err);
        }
      };
      let filterByTicketId=usersStoredTickets?.find(ticket=>ticket.ticketId===viewTicketDetail?.ticketId)
      const SendTicketCopy = (ticketCopy) => {
        console.log("SendTicketCopy clicked");
        // axios.post('http://localhost:5000/sendTicketCopy', ticketCopy)
        axios.post('https://mserver.printbaz.com/sendTicketCopy', ticketCopy)
          .then((response) => {
            console.log("send ticket mail", response);
            setShowMailTooltip(true)
            setTimeout(() => {
              setShowMailTooltip(false);
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
          });
      };
   console.log("filterByTicketId",filterByTicketId);
    ///input text
      const handleNewMessageChange = (e) => {
        console.log(e.target.value);
        setNewMsg(e.target.value);
    };
    //upload files
    const handleFileChange = (e) => {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    };

    //close ticket
        const closeTicket = async (e) => {
         let status="close"
         try {
          const response = await fetch(
            
            `https://mserver.printbaz.com/TicketCloseStatus/${viewTicketDetail?.ticketId}`,
          // `http://localhost:5000/TicketCloseStatus/${viewTicketDetail?.ticketId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ticketStatus: status }),
            }
          );
      
          if (response.ok) {
            // Update the approval status in the viewClient object
            setTicketStatus(status);
            setTicketClose(true);
      
            // console.log("Success:", viewOrder);
            // Update your state or perform any other necessary operations with the updated viewClient object
          } else {
            console.error("status Error:", response);
            // Handle error here
          }
        } catch (error) {
          console.error("Error:", error.message);
          // Handle error here
        }
   
    };

  
 
    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
          if (!newMsg.trim() && !selectedFiles.length) {
            setShowAlert(true)
            return;
        }

          const formData=new FormData();
          Array.from(selectedFiles).forEach((file)=>{
            formData.append('files',file)
          })
          const newMessage = {
             ticketId: viewTicketDetail?.ticketId,
             ticketIssue: viewTicketDetail?.ticketIssue,
             ticketStatus:"replied",
             unread:true,
             userEmail:viewTicketDetail?.userEmail,
             userName:viewTicketDetail?.userName,
             userOrderId:viewTicketDetail?.orderId,
              user: 'Printbaz',
               content: newMsg };
      
          const chatMessage = {
            ticketId: newMessage.ticketId,  // added this line
            content: newMessage.content,
            ticketStatus: newMessage.ticketStatus,
            ticketIssue: newMessage.ticketIssue,
            unread: newMessage.unread,
            userEmail: newMessage.userEmail,
            userName: newMessage.userName,
            admin: newMessage.user,
            orderId:newMessage.userOrderId,
            timestamp: new Date().toISOString(), // this won't be the exact timestamp saved in the DB
          };
          Object.entries(chatMessage).forEach(([key,value])=>{
            formData.append(key,value)
          })
      
          // Add the new message to the local state immediately
          setChatLog([...chatLog, chatMessage]);
          
      
          // const response = await axios.post('http://localhost:5000/sendmessages', formData, {
          const response = await axios.post('https://mserver.printbaz.com/sendmessages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
          if (!response?.data?.success) {
            // If the message was not sent successfully, revert the local state
            setChatLog(oldChatLog => oldChatLog.filter(msg => msg !== chatMessage));
            setUsersStoredTickets(oldTickets => oldTickets.filter(ticket => ticket !== chatMessage));
            console.error('Failed to send message');
          }
          setUsersStoredTickets(oldTickets => [...oldTickets, {
            ...chatMessage,
            messages: [chatMessage]
          }]);
          if (quill) {
            quill.setContents([]);
          }
          setNewMsg('');
          fetchOrderIddata()
          console.log("chatLog",chatLog);
        } catch (err) {
          console.error(err);
        }
      };  
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
     
    return (
    <div>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    <link rel="stylesheet" href="styles.css" />
    <title>Admin Dashboard</title>
    <style dangerouslySetInnerHTML={{__html: "\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        ul,\n        li,\n        a {\n            text-decoration: none;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        /* Nav Bar CSS Start */\n\n        .navbar {\n            background: #001846 !important;\n            padding: 0 20px 0 20px;\n        }\n\n        .navbar-brand img {\n            width: 120px;\n        }\n\n        .nav-link {\n            color: #ffffff !important;\n            font-size: 18px;\n            font-weight: 500;\n            text-align: center;\n            text-transform: uppercase;\n            padding: 20px 20px 20px 20px;\n            margin: 0 10px 0 10px;\n        }\n\n        .nav-link:hover {\n            background-color: #ffffff;\n            color: #001846 !important;\n            transition: linear 0.2s;\n        }\n\n        .nav-dropdown-menu {\n            background-color: #001846;\n        }\n\n        .nav-dropdown-item {\n            color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .navbar-toggler {\n            background-color: #ffffff !important;\n        }\n\n        /* Nav Bar CSS End */\n\n        /* Ticket System CSS Start */\n\n        .ticket-system {\n            margin: 50px;\n        }\n\n        .ticket-header {}\n\n        .ticket-header h1 {\n            background: #ffffff;\n            padding: 20px;\n            font-size: 30px;\n            font-weight: 700;\n            margin: 0;\n        }\n\n        .ticket-top-menu {\n            background: #F5F7F9;\n            padding: 20px;\n            margin: 0;\n            box-shadow: 0 2px 4px 0 rgba(24, 50, 71, .08);\n        }\n\n        .ttm-button {\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n        }\n\n        .ttm-button:hover {\n            border: 1px solid #cfd7df;\n            color: #12344d;\n            background: #EBEDF0;\n            transition: .1s ease-in;\n        }\n\n        .ticket-top-menu .sort-by {\n            display: inline-block;\n            float: right;\n        }\n\n        /* Ticket Display */\n\n        .ticket-info {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n            margin-top: 3px;\n            margin-bottom: 3px;\n\n        }\n\n        .ticket-info img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n\n        }\n\n        .ticket-info h2 {\n            display: inline-block;\n            font-size: 25px;\n            font-weight: 700;\n        }\n\n        .ticket-info p {\n            font-size: 14px;\n            font-weight: 600;\n            margin-left: 35px;\n            margin-bottom: 0;\n        }\n\n        .mer-info {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n\n        }\n\n        .mer-info img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n            border-radius: 5px;\n\n        }\n\n        .mer-info h2 {\n            display: inline-block;\n            font-size: 20px;\n            font-weight: 700;\n            color: rgb(0, 157, 255);\n        }\n\n        .mer-info button {\n            float: right;\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n\n        }\n\n        .mer-info button:hover {\n            border: 1px solid #cfd7df;\n            color: #ca0909;\n            background: #EBEDF0;\n            transition: .1s ease-in;\n\n        }\n\n        .mer-info h3 {\n            font-size: 14px;\n            font-weight: 400;\n            margin-left: 35px;\n            margin-bottom: 0;\n            font-style: italic;\n        }\n\n        .mer-info p {\n            font-size: 16px;\n            font-weight: 400;\n            margin-left: 35px;\n            margin-bottom: 0;\n        }\n\n        .ticket-replay {\n            background: #ffffff;\n            padding: 25px 20px 20px 20px;\n\n        }\n\n        .ticket-replay img {\n            display: inline-block;\n            width: 25px;\n            margin-bottom: 0.5rem;\n            margin-right: 5px;\n            border-radius: 5px;\n\n        }\n\n\n        /* finter Section */\n\n        .filter-section {\n            margin-top: 3px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n            height: 100%;\n        }\n\n        .filter-text h2 {\n            font-size: 18px;\n            font-weight: 600;\n        }\n\n        .filter-text h3 {\n            font-size: 14px;\n            font-weight: 400;\n            font-style: italic;\n            margin-bottom: 25px;\n        }\n\n        .filter-dropdown {\n            margin-bottom: 30px;\n        }\n\n        .filter-dropdown .dropdown-menu {\n            width: 100%;\n        }\n\n        .dropdown-toggle::after {\n            float: right;\n            margin-top: 10px;\n        }\n\n        .filter-update-button button {\n            width: 100%;\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n            font-weight: 700;\n\n        }\n\n        .filter-update-button button:hover {\n            border: 1px solid #cfd7df;\n            color: #ffffff;\n            background: rgb(0, 194, 0);\n            transition: .1s ease-in;\n\n        }\n\n        .profile-section {\n            margin-top: 3px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n            height: 100%;\n        }\n\n        .profile-section img {\n            width: 80px;\n            display: inline-block;\n            border-radius: 5px;\n            margin-left: 30%;\n        }\n\n        .profile-section h2 {\n            margin-top: 20px;\n            font-size: 18px;\n            font-weight: 700;\n            display: inline-block;\n        }\n\n        .profile-section h3 {\n            font-size: 14px;\n            font-weight: 400;\n            font-style: italic;\n            display: inline-block;\n        }\n\n        .profile-section p {\n            margin-top: 15px;\n            font-size: 16px;\n            font-weight: 600;\n            display: inline-block;\n        }\n\n    " }} />
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
          <img src="https://media.discordapp.net/attachments/1069579536842379305/1097040318043537449/Logo-02.png?width=1440&height=392" alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>

            </li> 
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/allMerchants">Merchants</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/orderList">Orders</Link>
            </li>
          
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Analytics
              </a>
              <ul className="dropdown-menu nav-dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item nav-dropdown-item" href="#">Merchants</a></li>
                <li><a className="dropdown-item nav-dropdown-item" href="#">Order</a></li>
                <li><a className="dropdown-item nav-dropdown-item" href="#">Transaction</a></li>
              </ul>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/mailBox">Mail Box</Link>
            </li>
            <li className="nav-item">
          
              <Link className="nav-link active" aria-current="page" to="/liveChat">Live Chat</Link>
           
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/ticket">Ticket</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/filemanager">File Manager</Link>
      
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section className="ticket-system">
      <div className="row">
        <div className="col-12">
          <div className="ticket-header">
            <h1>Ticket View</h1>
          </div>
          <div className="ticket-top-menu">
           
           {
             (openTextBox!==true  && ticketStatus!=="close") && 
             <button className="ttm-button" onClick={()=>setOpenTextBox(true)}><i className="fa fa-reply" aria-hidden="true" style={{marginRight: '5px'}} />Reply</button>
           }
               
             <button className="ttm-button" onClick={closeTicket}><i className="fa fa-check-circle" aria-hidden="true" style={{marginRight: '5px'}} />Close</button>
            {/* <button className="ttm-button"><i className="fa fa-trash" aria-hidden="true" style={{marginRight: '5px'}} />Delete</button> */}
            <button className="ttm-button" ref={target}
            onClick={() => SendTicketCopy({ userMail: filterByTicketId?.userEmail, ticketId: filterByTicketId?.ticketId, ticketIssue: filterByTicketId?.ticketIssue,messages:filterByTicketId?.messages })}
            >
  <i
    className="fa fa-paper-plane"
    aria-hidden="true"
    style={{ marginRight: '5px' }}
   
  />
  Send Mail
</button>
<Overlay target={target.current} show={showMailTooltip} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
           send mail!
          </Tooltip>
        )}
      </Overlay>
   
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-12">
              <div className="ticket-info">
                <img src="https://media.discordapp.net/attachments/1069579536842379305/1117395441697443860/pngegg_15.png" alt="" />
               
                <h2>{viewTicketDetail?.ticketIssue==="onHold out of stock" &&
               " Out of Stock"
                
                }</h2>  
                <h2>{viewTicketDetail?.ticketIssue==="onHold artwork issue" &&
               "Artwork Issue"
                
                }</h2>  
                <h2>{viewTicketDetail?.ticketIssue==="onHold billing issue" &&
               "Billing Issue"
                
                }</h2>
                  <h2>{viewTicketDetail?.ticketIssue==="returned" &&
               "Returned"
                
                }</h2> 
                <h2>{viewTicketDetail?.ticketIssue==="cancellation" &&
               "Cancellation"
                
                }</h2>
                <h2>{viewTicketDetail?.ticketIssue==="general query" &&
               "General Query"
                
                }</h2>
                <p>Order ID: {viewTicketDetail?.orderId}</p>
                <p>Ticket ID: {viewTicketDetail?.ticketId}</p>
              </div>
            </div>
          </div>
          <div className="" style={{overflow:"scroll",maxHeight:"30rem"}}>
              {
                  filterByTicketId?.messages?.map(viewTick=>
                  
                    <div className="col-12">
                {/* clent messages  */}
                {
                viewTick.admin===viewTicketDetail?.userName && 
           
                <div className="col-12">
                <div className="mer-info">
                  <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                  <h2 >{viewTicketDetail?.userName}</h2>
                  <h3 >{timeSince(new Date(viewTick?.timestamp))} ({new Date(viewTick?.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })})</h3>
                  <hr className='hr_lineStyle'/>
              
                  {/* <p>   {viewTick.content}</p> */}
                  <div dangerouslySetInnerHTML={{ __html: viewTick.content }} />
                
                  {/* // upload image  */}
                  {
  viewTick?.files?.map(adminFile => {
    const fileId = adminFile.split('/d/')[1].split('/view')[0];
    const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
    return (
      <>
        
          <iframe src={previewURL}  style={{width: "auto", height: "auto",alignItems:"center"}}></iframe>
      </>
    )
  })
} 

                
                </div>
              </div>
              }
                 
              {
                viewTick.admin==="Printbaz" && 
                <div className="col-12">
                <div className="mer-info">
                  <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                  <h2 style={{color: 'red'}}>{viewTick.admin}</h2>
                  <h3>{timeSince(new Date(viewTick?.timestamp))} ({new Date(viewTick?.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })})</h3>
                  {/* <p style={{}}>{viewTick?.content}</p> */}
                  <div dangerouslySetInnerHTML={{ __html: viewTick.content }} />
                  {/* <ReactMarkdown >{viewTick.content}</ReactMarkdown> */}
                  {/* {
  viewTick?.files?.map(adminFile => {
    const fileId = adminFile.split('/d/')[1].split('/view')[0];
    const directURL = `https://drive.google.com/uc?export=view&id=${fileId}`;
    // Check if the URL ends with .png, .jpg, or .svg
    if (directURL.endsWith('.png') || directURL.endsWith('.jpg') || directURL.endsWith('.svg')) {
      return <img src={directURL} alt="chat img"/>
    } else {
      return <p>{directURL}</p>
    }
  })
} */}

{
  viewTick?.files?.map(adminFile => {
    const fileId = adminFile.split('/d/')[1].split('/view')[0];
    const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
    return (
      <>
        
          <iframe src={previewURL}  style={{width: "auto", height: "auto",alignItems:"center"}}></iframe>
      </>
    )
  })
}




                
                </div>
              </div>
              }

             
                  </div>
                    )
              }
               <div ref={messagesEndRef} />
           

          </div>
          <div className="row">
            <div className="col-12">
              {
                (openTextBox!==true  && ticketStatus!=="close" )  && 
                <div className="ticket-replay">
                <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                <button className="ttm-button" onClick={()=>setOpenTextBox(true)}><i className="fa fa-reply" aria-hidden="true" style={{marginRight: '5px'}} />Reply</button>
                <button className="ttm-button"><i className="fa fa-sticky-note" aria-hidden="true" style={{marginRight: '5px'}} />Add Note</button>
              </div>
              }

               
               {
                (ticketClose || ticketStatus==="close") && 
                <h3 style={{textAlign:"center"}}>support ticket closed!</h3>
              }
            
            </div>
          </div> 
            <div className="row">
              <div className='col-12'>
              {
             openTextBox && 
             <form className="input-group chat-messages p-4" onSubmit={handleSendMessage}>
      
      <div   ref={quillRef}  />
      {/* <textArea
        className='col-12'
        type="text"
        rows="11" cols="33"
        value={newMsg}
        onChange={handleNewMessageChange}
        placeholder="Type your message here..."
     
      /> */}
      <div className=' col-12' style={{marginTop:"5px"}}>
     

        </div>  
      <div className='flex col-12' style={{}}>
        
        <button className="btn"><i className="fa fa-paperclip" aria-hidden="true" />      
          <input
            className="btn"
            type="file"
            name="file"
            multiple
            onChange={handleFileChange}
          />
        </button>
        <div>
          <button className="ttm-button" onClick={()=>setOpenTextBox(false)}> <i className="fa fa-trash" aria-hidden="true" style={{ marginRight: '5px' }} /></button>
          <button className="ttm-button" type="submit"><i className="fa fa-reply" aria-hidden="true" style={{marginRight: '5px'}} />Reply</button>
        </div>
      </div>
    </form>
           }

{
             showAlert &&
             <AlertMessage 
             message="input field required"
             showAlert={showAlert}
             setShowAlert={setShowAlert}
             
             />
           }
              </div>
        
           
                     
           
          </div>
        </div>
        <div className="col-2">
          <div className="filter-section">
            <div className="filter-text">
              <h2>Open<i className="fa fa-circle" aria-hidden="true" style={{color: 'rgb(0, 194, 0)', marginLeft: '5px', fontSize: '16px'}} /></h2>
              <h3>by Mon, Jun 12, 2023 4:00 PM</h3>
            </div>
            <div className="dropdown filter-dropdown">
              <button style={{width: '100%', textAlign: 'left'}} className="btn dropdown-toggle ttm-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Issue
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">General Query</a></li>
                <li><a className="dropdown-item" href="#">On hold- Artwork issue</a></li>
                <li><a className="dropdown-item" href="#">On hold- Billing Issue</a></li>
                <li><a className="dropdown-item" href="#">On hold - Out of stock</a></li>
                <li><a className="dropdown-item" href="#">Returned</a></li>
                <li><a className="dropdown-item" href="#">Cancellation</a></li>
              </ul>
            </div>
            
            {/* <div className="filter-update-button">
              <button>Update</button>
            </div> */}
          </div>
        </div>
        {/* <div className="col-2">
          <div className="profile-section">
            <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
            <h2 style={{display: 'inline-block'}}>Md. Raihan Ahamad Rabbi</h2>
            <h3>by Mon, Jun 12, 2023 4:00 PM</h3><br />
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree" style={{margin: 0, width: '100%'}}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Merchent Information
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <p style={{marginBottom: 0}}>Email: <br /><span style={{fontWeight: 'normal'}}>raihanibnsiraj.pencil@gmail.com</span></p><br />
                  <p>Phone: <br /><span style={{fontWeight: 'normal'}}>01688700662</span></p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour" style={{margin: 0, width: '100%'}}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Time Logs
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <p style={{marginBottom: 0}}>Md. Raihan Ahamad Rabbi: <br /><span style={{fontWeight: 'normal'}}>2 days ago (Fri, 9 Jun 2023 at 3:46 AM)</span></p><br />
                  <p style={{marginBottom: 0}}>Shuvro Haque: <br /><span style={{fontWeight: 'normal'}}>a few seconds ago (Sun, 11 Jun 2023 at 11:40 AM)</span></p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  </div>
  );
};

export default ViewTicket;
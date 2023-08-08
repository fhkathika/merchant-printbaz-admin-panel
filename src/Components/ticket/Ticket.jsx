import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRoleAsignData } from '../../hooks/useRoleAsignData';
import Navigationbar from '../navigationBar/Navigationbar';

const Ticket = () => {
  const[fetchAllTicket,setFetchAllTicket]=useState([])
  const [filterOrders,setFilterOrders]=useState('');
  let searchByOrderId= fetchAllTicket?.filter(OrederId => OrederId?.orderId?.includes(filterOrders));
let searchByTicketId= fetchAllTicket?.filter(OrederId => OrederId?.ticketId?.includes(filterOrders));
// console.log("closeQuery",closeQuery);
const [ticketIssue, setTicketIssue] = useState( "all" );
const {value_count}=useRoleAsignData()
  // const [ticketStatus, setTicketStatus] = useState("");
  useEffect(() => {
    // Fetch the chat log from the server when the component mounts
   
    fetchOrderIddata();
  }, []);

  const fetchOrderIddata = async () => {
    try {
      // const response = await axios.get('http://localhost:5000/allTicket');
      const response = await axios.get('https://mserver.printbaz.com/allTicket');
      setFetchAllTicket(response.data);
   
    } catch (err) {
      console.error(err);
    }
  };
  console.log("fetchAllTicket",fetchAllTicket);
  const handleInputTicketIssueChange = async (e) => {
    e.preventDefault()
  
  setTicketIssue(e.target.value)
   
   }  
   const handleInputTicketStatusChange = async (e) => {
    e.preventDefault()
    setTicketIssue(e.target.value)
   
   }
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

// console.log("ticketIssue",ticketIssue);
let artWorkIssue=fetchAllTicket?.filter(users=>users?.ticketIssue==="onHold artwork issue");
let billingIssue=fetchAllTicket?.filter(users=>users?.ticketIssue==="onHold billing issue");
let outOfStock=fetchAllTicket?.filter(users=>users?.ticketIssue==="onHold out of stock");
let returned=fetchAllTicket?.filter(users=>users?.ticketIssue==="returned");
let cancellation=fetchAllTicket?.filter(users=>users?.ticketIssue==="cancellation");
let generalQuery=fetchAllTicket?.filter(users=>users?.ticketIssue==="general query");
let closeQuery=fetchAllTicket?.filter(users=>users?.ticketStatus==="close");
let repliedQuery=fetchAllTicket?.filter(users=>users?.ticketStatus==="replied");
let openQuery=fetchAllTicket?.filter(users=>users?.ticketStatus==="open");
let pendingQuery=fetchAllTicket?.filter(users=>users?.ticketStatus==="pending");

console.log("searchByTicketId",searchByTicketId);
const handleOrderIdChange = (e) => {
  const value = e.target.value;
  // console.log(value);
  setFilterOrders(value);
  setTicketIssue("")
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
    <style dangerouslySetInnerHTML={{__html: "\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        ul,\n        li,\n        a {\n            text-decoration: none;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        /* Nav Bar CSS Start */\n\n        .navbar {\n            background: #001846 !important;\n            padding: 0 20px 0 20px;\n        }\n\n        .navbar-brand img {\n            width: 120px;\n        }\n\n        .nav-link {\n            color: #ffffff !important;\n            font-size: 18px;\n            font-weight: 500;\n            text-align: center;\n            text-transform: uppercase;\n            padding: 20px 20px 20px 20px;\n            margin: 0 10px 0 10px;\n        }\n\n        .nav-link:hover {\n            background-color: #ffffff;\n            color: #001846 !important;\n            transition: linear 0.2s;\n        }\n\n        .nav-dropdown-menu {\n            background-color: #001846;\n        }\n\n        .nav-dropdown-item {\n            color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .navbar-toggler {\n            background-color: #ffffff !important;\n        }\n\n        /* Nav Bar CSS End */\n\n        /* Ticket System CSS Start */\n\n        .ticket-system {\n            margin: 50px;\n        }\n\n        .ticket-header {}\n\n        .ticket-header h1 {\n            background: #ffffff;\n            padding: 20px;\n            font-size: 30px;\n            font-weight: 700;\n            margin: 0;\n        }\n\n        .ticket-top-menu {\n            background: #F5F7F9;\n            padding: 20px;\n            margin: 0;\n            box-shadow: 0 2px 4px 0 rgba(24, 50, 71, .08);\n        }\n\n        .ttm-button {\n            margin-right: 10px;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            border: 1px #cfd7df solid;\n            background: #ffffff;\n        }\n\n        .ttm-button:hover {\n            border: 1px solid #cfd7df;\n            color: #12344d;\n            background: #EBEDF0;\n            transition: .1s ease-in;\n        }\n\n        .ticket-top-menu .sort-by {\n            display: inline-block;\n            float: right;\n        }\n\n        /* Ticket Display */\n\n        .ticket-display {\n            margin-top: 20px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n            cursor: pointer;\n        }\n\n        .td-box1 {\n            position: relative;\n        }\n\n        .box1-left {\n            display: inline-block;\n            position: absolute;\n            top: 25%;\n        }\n\n        .box1-right {\n            display: inline-block;\n            margin-left: 100px;\n        }\n\n        .box1-left img {\n            width: 70px;\n            border-radius: 5px;\n        }\n\n        .box1-right h3 {\n            font-size: 18px;\n            font-weight: 600;\n        }\n\n        .box1-right h4 {\n            font-size: 14px;\n            font-weight: 600;\n            color: #4d4d4d;\n        }\n\n        .box1-right h5 {\n            font-size: 14px;\n            font-weight: 600;\n            color: #4d4d4d;\n        }\n\n        .box1-right h6 {\n            font-size: 12px;\n            font-weight: 600;\n            color: #ffffff;\n            background-color: red;\n            display: inline-block;\n            padding: 5px 10px 5px 10px;\n            border-radius: 5px;\n            margin-bottom: 15px;\n        }\n\n        .box1-right p {\n            font-size: 14px;\n            font-weight: 400;\n            color: #4d4d4d;\n            margin: 0;\n        }\n\n        .td-box2 {}\n\n        .td-box2 .box-text {\n            margin-top: 10px;\n        }\n\n        .td-box2 .box-text p {\n            font-size: 14px;\n            color: #4d4d4d;\n        }\n\n        .td-box2 .box-text i {\n            margin-right: 10px;\n        }\n\n        /* finter Section */\n\n        .filter-section {\n            margin-top: 20px;\n            padding: 25px 20px 20px 20px;\n            background-color: #fff;\n            box-shadow: 0 1px 0 0 #cfd7df;\n            display: table;\n            width: 100%;\n            box-sizing: border-box;\n        }\n\n        .filter-dropdown {\n            margin-bottom: 30px;\n        }\n\n        .filter-dropdown .dropdown-menu {\n            width: 100%;\n        }\n\n        .dropdown-toggle::after {\n            float: right;\n            margin-top: 10px;\n        }\n\n    " }} />
    <Navigationbar/>
    <section className="ticket-system">
      <div className="row">
        <div className="col-12">
          <div className="ticket-header">
            <h1>All Tickets</h1>
          </div>
          <div className="ticket-top-menu flex" >
            {/* <input type="checkbox" className="ttm-button" /> */}
            {/* <button className="ttm-button"><i className="fa fa-user-plus" aria-hidden="true" style={{marginRight: '5px'}} />Assign</button> */}
            <div className="col-lg-2 col-sm-4">
            <button className="ttm-button"><i className="fa fa-check-circle" aria-hidden="true" style={{marginRight: '5px'}} />Close</button>
            </div>
            
            <div className="col-lg-2 col-sm-4">
                <label htmlFor="id-filter" style={{marginBottom:"8px"}}>Order Id:</label>
                <input type="text" id="id-filter" className="form-control" onChange={(e) =>  handleOrderIdChange(e)} />
              </div>
              <div className="col-lg-2 col-sm-2">
                <label htmlFor="id-filter" style={{marginBottom:"8px"}}>Ticket Id:</label>
                <input type="text" id="id-filter" className="form-control" onChange={(e) =>  handleOrderIdChange(e)} />
              </div>
            {/* <button className="ttm-button"><i className="fa fa-trash" aria-hidden="true" style={{marginRight: '5px'}} />Delete</button> */}
            {/* <div className="dropdown sort-by">
              <button className="btn dropdown-toggle ttm-button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Sort by:
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">Date created</a></li>
                <li><a className="dropdown-item" href="#">Due by time</a></li>
                <li><a className="dropdown-item" href="#">Last modified</a></li>
                <li><a className="dropdown-item" href="#">Priority</a></li>
                <li><a className="dropdown-item" href="#">Status</a></li>
                <li><a className="dropdown-item" href="#">Closed time</a></li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-10">
        {
           filterOrders && searchByOrderId?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-7">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&" Out of Stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&" Artwork Issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName ? allTicket?.userName : "Printbaz"}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className='col-1 '>
                {
                 allTicket?.ticketStatus==="pending" &&

                   <span  className='notification-badge-individual'>New Message</span> 
              
                 
               }
             
                </div>
                  <div className="col-4 ">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&" Out of Stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&" Artwork Issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName ? allTicket?.userName : "Printbaz"}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          } {
           filterOrders && searchByTicketId?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-7">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&" Out of Stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&" Artwork Issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName ? allTicket?.userName : "Printbaz"}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className='col-1 '>
                {
                 allTicket?.ticketStatus==="pending" &&

                   <span  className='notification-badge-individual'>New Message</span> 
              
                 
               }
             
                </div>
                  <div className="col-4 ">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&" Out of Stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&" Artwork Issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName ? allTicket?.userName : "Printbaz"}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          }
          {
          ticketIssue==="all" && fetchAllTicket?.sort((a, b) => {
            // Sort by lastTimestamp in descending order
            const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
            const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
            return timestampB - timestampA;
          })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-7">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&" Out of Stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&" Artwork Issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName ? allTicket?.userName : "Printbaz"}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className='col-1 '>
                {
                 allTicket?.ticketStatus==="pending" &&

                   <span  className='notification-badge-individual'>New Message</span> 
              
                 
               }
             
                </div>
                  <div className="col-4 ">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&" Out of Stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&" Artwork Issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName ? allTicket?.userName : "Printbaz"}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          } 
           
    {
            ticketIssue==="onHold artwork issue" &&  artWorkIssue?.sort((a, b) => {
              // Sort by lastTimestamp in descending order
              const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
              const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
              return timestampB - timestampA;
            })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          } 
           {
            ticketIssue==="onHold billing issue" &&  billingIssue?.sort((a, b) => {
              // Sort by lastTimestamp in descending order
              const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
              const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
              return timestampB - timestampA;
            })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          }  
          {
            ticketIssue==="onHold out of stock" &&  outOfStock?.sort((a, b) => {
              // Sort by lastTimestamp in descending order
              const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
              const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
              return timestampB - timestampA;
            })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          }
          {
            ticketIssue==="returned" &&  returned?.sort((a, b) => {
              // Sort by lastTimestamp in descending order
              const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
              const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
              return timestampB - timestampA;
            })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&" Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&" Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          } 
           {
            ticketIssue==="cancellation" &&  cancellation?.sort((a, b) => {
              // Sort by lastTimestamp in descending order
              const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
              const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
              return timestampB - timestampA;
            })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          } 
           {
            ticketIssue==="general query" &&  generalQuery?.sort((a, b) => {
              // Sort by lastTimestamp in descending order
              const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
              const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
              return timestampB - timestampA;
            })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          }


{
            ticketIssue==="close" &&  closeQuery?.sort((a, b) => {
              // Sort by lastTimestamp in descending order
              const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
              const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
              return timestampB - timestampA;
            })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          } 
          {
            ticketIssue==="replied" &&  repliedQuery?.sort((a, b) => {
              // Sort by lastTimestamp in descending order
              const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
              const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
              return timestampB - timestampA;
            })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          }    
           {
            ticketIssue==="pending" &&  pendingQuery?.sort((a, b) => {
              // Sort by lastTimestamp in descending order
              const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
              const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
              return timestampB - timestampA;
            })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-7">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className='col-1 '>
                {
                 allTicket?.ticketStatus==="pending" &&

                   <span  className='notification-badge-individual'>New Message</span> 
              
                 
               }
             
                </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          }   {
            ticketIssue==="open" &&  openQuery?.sort((a, b) => {
              // Sort by lastTimestamp in descending order
              const timestampA = new Date(a.messages[a.messages.length - 1].timestamp);
              const timestampB = new Date(b.messages[b.messages.length - 1].timestamp);
              return timestampB - timestampA;
            })?.map((allTicket,index)=>{ 
              let lastTimestamp = null;
              let exactTime=null
              let lastUser=null
              if (allTicket?.messages?.length > 0) {
                const lastMessage = allTicket.messages[allTicket.messages.length - 1];
                lastTimestamp = new Date(lastMessage.timestamp).toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
                exactTime=timeSince((new Date(lastTimestamp)))
                lastUser = lastMessage.admin;
              }
              return(
                value_count?.ticketView?
                <Link to={`/viewTicket/${allTicket?._id}`} state={{allTicket}} key={index}>

<div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </Link>
                :
                <div className="ticket-display">
                <div className="row">
                  <div className="col-8">
                    <div className="td-box1">
                      <div className="box1-left">
                        <input className="check-box" type="checkbox" />
                        <img src="https://media.discordapp.net/attachments/1069579536842379305/1107191553501450260/Logo-01.jpg?width=616&height=616" alt="" />
                      </div>
                      <div className="box1-right">
                        
                        <h6>{allTicket?.ticketIssue==="onHold out of stock" &&"Out of stock"}
               {allTicket?.ticketIssue==="onHold artwork issue" &&"Artwork issue"}
                {allTicket?.ticketIssue==="onHold billing issue" &&"Billing Issue"}
                {allTicket?.ticketIssue==="returned" &&"Returned"}
                {allTicket?.ticketIssue==="cancellation" &&"Cancellation"}
                {allTicket?.ticketIssue==="general query" &&"General Query"}
               </h6>  
               
                        <h3>{allTicket?.userName}</h3>
                        <h4>Order ID: {allTicket?.orderId}</h4>
                        <h5>Ticket ID: {allTicket?.ticketId}</h5>
                       
                        <span>
                             {lastTimestamp && <p>{exactTime} {lastTimestamp}</p>}
  
                        </span>
                         
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="td-box2">
                      <div className="box-text">
                        {
                          allTicket?.ticketIssue==="onHold billing issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'red'}} />High</p>
                        }
                          {
                          allTicket?.ticketIssue==="returned" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                          {
                          allTicket?.ticketIssue==="onHold artwork issue" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        }
                         {
                          allTicket?.ticketIssue==="cancellation" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'blue'}} />Medium</p>
                        } 
                         {
                          allTicket?.ticketIssue==="onHold out of stock" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        } 
                        {
                          allTicket?.ticketIssue==="general query" &&
                          <p><i className="fa fa-square" aria-hidden="true" style={{color: 'yellow'}} />Low</p>
                        }
                       
                        <p><i className="fa fa-user" aria-hidden="true" style={{color: 'rgb(0, 174, 255)'}} />{lastUser}</p>
                        <p><i className="fa fa-envelope-open" aria-hidden="true" style={{color: 'rgb(0, 172, 0)'}} />{allTicket?.ticketStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              )
             
                         } )
          } 
        
        </div>
        <div className="col-2">
          <div className="filter-section">
          
            <div className="dropdown filter-dropdown">
             
            
                      <select
                          id="status-filter"
                          // className="status-btn"

                          
                          style={{
                            border: "1px solid #d1d1d1",
                            padding: "8px",
                            marginRight:'20px',
                            width:"100%",
                            background:"none"
                            
                          }}
                          name="ticketIssue"
                          value={ticketIssue}
                          required
                          onChange={ (e)=>handleInputTicketIssueChange(e)}
                        >
                     
                     <option value="all">All</option>
                      <option value="onHold artwork issue">Artwork Issue</option>
                      <option value="onHold billing issue"> Billing Issue</option>
                     <option value="onHold out of stock">Out of Stock</option>
                     <option value="returned">Returned</option>
                     <option value="cancellation">Cancellation</option>
                     <option value="general query">General Query</option>
                        </select>
                    
                      
            </div>
            
            <div className="dropdown filter-dropdown">
             
            
                      <select
                          id="status-filter"
                          // className="status-btn"

                          
                          style={{
                            border: "1px solid #d1d1d1",
                            padding: "8px",
                            marginRight:'20px',
                            width:"100%",
                            background:"none"
                            
                          }}
                          name="ticketIssue"
                          value={ticketIssue}
                          required
                          onChange={ (e)=>handleInputTicketStatusChange(e)}
                        >
                     
                     <option value="">select status</option>
                      <option value="close">Close</option>
                     <option value="replied">Replied </option>
                     <option value="pending">Pending </option>
                     <option value="open">Open</option>
                        </select>
                    
                      
            </div>

       
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Ticket;

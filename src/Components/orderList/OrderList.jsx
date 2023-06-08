import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetMongoData from '../../hooks/useGetMongoData';

const OrderList = () => {
  const { orderAll } = useGetMongoData();
  const [allMerchant,setAllMerchant]=useState([])
  console.log("orderAll", orderAll);
  const [filterOrders,setFilterOrders]=useState('all')
  useEffect(()=>{
    const getOrders = async () => {
     await fetch('https://mserver.printbaz.com/alluser') //for main site
    //  await fetch('http://localhost:5000/alluser') //for testing site
    .then(res=>res.json())
    .then(data => setAllMerchant(data))
    }
    getOrders()
},[allMerchant])
let matchingMerchant

let date = new Date(orderAll?.createdAt); // create a new Date object

let options = { year: 'numeric', month: 'long', day: 'numeric' }; // options for toLocaleDateString

let formattedDate = date.toLocaleDateString('en-US', options); // use toLocaleDateString to format the date
const handleInputChange = (event, index) => {
  const { name, value } = event.target;
  setFilterOrders(value)
}
const handlePaymentStausInputChange = (event, index) => {
  const { name, value } = event.target;
  setFilterOrders(value)
}
let pendingOrders=orderAll?.filter(users=>users?.orderStatus==="Pending");
let approvedOrders=orderAll?.filter(users=>users?.orderStatus==="Approved");
let onHoldOrders=orderAll?.filter(users=>users?.orderStatus==="on-hold");
let onHoldArtworkIssueOrders=orderAll?.filter(users=>users?.orderStatus==="on hold artwork issue");
let onHoldBillingIssueOrders=orderAll?.filter(users=>users?.orderStatus==="on hold billing issue");
let onHoldOutOfStockOrders=orderAll?.filter(users=>users?.orderStatus==="on hold out of stock");
let inProductionOrders=orderAll?.filter(users=>users?.orderStatus==="in-production");
let outForDeliveryOrders=orderAll?.filter(users=>users?.orderStatus==="out for delivery");
let deliveredOrders=orderAll?.filter(users=>users?.orderStatus==="delivered");
let cancelOrders=orderAll?.filter(users=>users?.orderStatus==="cancel");
// payment staus
let paidOrders=orderAll?.filter(users=>users?.paymentStatus==="paid");
let unPaidOrders=orderAll?.filter(users=>users?.paymentStatus==="Unpaid");

const getViewClientColor = (status) => {
  if (status === "Pending") {
    return "Orange";
  }
  if (status === "Approved") {
    return "green";
  } 
  if (status === "on-hold") {
    return "yellow";
  }
    if (status === "in-production") {
    return "blue";
  }
    if (status === "out for delivery") {
    return "sea green";
  }  
  if (status === "delivered") {
    return "sea green";
  } 
   if (status === "payment-released") {
    return "sea green";
  } 
      if (status === "returned") {
    return "red";
  }
  if (status === "on hold artwork issue") {
    return "#cafc03";
  }      if (status === "on hold billing issue") {
    return "#ca5fdf";
  }      if (status === "on hold out of stock") {
    return "#8ae1ed";
  }  
    if (status === "cancel") {
    return "#ed8a8a";
  }   
   if (status === "paid") {
    return "#b8ed8a";
  }    if (status === "Unpaid") {
    return "#360eea";
  }
  // you can add more conditions here or just return a default color
  // return "defaultColor";
};
    return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        /* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n\n}\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        a {\n            text-decoration: none;\n            color: #000;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        .order-section {\n            margin: 50px;\n        }\n\n        h2 {\n            color: #333;\n            padding-bottom: 10px;\n            font-weight: 700;\n            text-transform: uppercase;\n        }\n\n        .row {\n            display: flex;\n            flex-wrap: wrap;\n            margin: 0 -15px;\n        }\n\n        .order-filter {\n        }\n\n        .client-order-list {\n            margin-top: 50px;\n            padding: 50px;\n            border: 1px solid #ccc;\n            border-radius: 20px;\n            background-color: #ffffff;\n        }\n\n        .client-list {\n            cursor: pointer;\n            padding-top: 20px;\n        }\n\n        .client-list-title h4 {\n            text-transform: uppercase;\n            font-weight: bold;\n        }\n\n        .client-list p {\n            margin-bottom: 10px;\n        }\n\n        .client-list:hover {\n            background-color: aliceblue;\n            border-radius: 15px;\n            transition: linear 0.2s;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n        }\n\n        .p-status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #00aeff;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {\n\n        }\n\n        @media screen and (max-width: 768px) {\n\n        }\n\n    " }} />
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
          <div className="order-section">
            <div className="row">
              <div className="col-12">
                <h2>All Orders</h2>
              </div>
            </div>
            <div className="row order-filter">
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="name-filter">Name:</label>
                <input type="text" id="name-filter" className="form-control" />
              </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="id-filter">Order Id:</label>
                <input type="number" id="id-filter" className="form-control" />
              </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="brand-filter">Recipient Info:</label>
                <input type="text" id="brand-filter" className="form-control" />
              </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="status-filter">Payment:</label>
                <select id="status-filter" className="form-control" onChange={(e)=>handlePaymentStausInputChange(e)}>
                  <option value>None</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="date-filter">Date:</label>
                <input type="date" id="date-filter" className="form-control" />
              </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="status-filter">Status:</label>
                <select id="status-filter" className="form-control" onChange={(e) =>  handleInputChange(e)}>
                  <option value="all">all</option>
                  <option value="Pending">Pending</option>
                  <option value="on-hold">On Hold</option>
                  <option value="on hold artwork issue">On hold -  Artwork issue</option>
                  <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                  <option value="Approved">Approved</option>
                  <option value="in-production">In Production</option>
                  <option value="out for delivery">Out for delivery</option>
                 <option value="delivered">Delivered</option>
                  <option value="payment-released">Payment Released</option>
                  <option value="returned">Returned</option>
                  <option value="cancel">Cancel</option>
                  
                </select>
              </div>
            </div>
            <div className="client-order-list">
              <div className="row" style={{marginBottom: '30px'}}>
                <div className="col-lg-2 col-sm-12">
                  <h4>Name</h4>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <h4>Order Id</h4>
                </div>
                <div className="col-lg-3 col-sm-12">
                  <h4>Recipient Info</h4>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <h4>Payment</h4>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <h4>Amount</h4>
                </div>
                <div className="col-lg-1 col-sm-12">
                  <h4>Status</h4>
                </div>
              </div>
              {
                   filterOrders==="paid" && paidOrders.map((orders,index)=>{ 
                    matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
                   return (
                      <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                      <div key={orders?._id} className="row client-list">
                        <div className="col-lg-2 col-sm-12">
                         {/* Display the corresponding allMerchant name */}
                         <p>{matchingMerchant?.name}</p>
              {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                       
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          <p>{orders?._id}</p>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                          <p>{orders?.name}</p>
                          <p>{orders?.address}</p>
                          <p>{orders?.phone}</p>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          <p className="p-status-btn">{orders?.paymentStatus}</p>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          <p>{orders?.recvMoney} TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                                orders?.orderStatus
                                ),}}>{orders?.orderStatus}</p>
                          {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                        </div>
                      </div>
                    </Link>
                   
                   )
                    }
                      )
              } 
                {
                   filterOrders==="Unpaid" && unPaidOrders.map((orders,index)=>{ 
                    matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
                   return (
                      <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                      <div key={orders?._id} className="row client-list">
                        <div className="col-lg-2 col-sm-12">
                         {/* Display the corresponding allMerchant name */}
                         <p>{matchingMerchant?.name}</p>
              {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                       
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          <p>{orders?._id}</p>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                          <p>{orders?.name}</p>
                          <p>{orders?.address}</p>
                          <p>{orders?.phone}</p>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          <p className="p-status-btn">{orders?.paymentStatus}</p>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          <p>{orders?.recvMoney} TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                                orders?.orderStatus
                                ),}}>{orders?.orderStatus}</p>
                          {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                        </div>
                      </div>
                    </Link>
                   
                   )
                    }
                      )
              }
              {
              filterOrders==="all" && orderAll.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }  
              {
              filterOrders==="Pending" && pendingOrders.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              } 
                {
              filterOrders==="Approved" && approvedOrders.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }
              
                {
              filterOrders==="on-hold" && onHoldOrders.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }  
                {
              filterOrders==="in-production" && inProductionOrders.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }
              {
              filterOrders==="out for delivery" && outForDeliveryOrders.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }  
                {
              filterOrders==="delivered" && deliveredOrders.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }
              {
              filterOrders==="on hold artwork issue" && onHoldArtworkIssueOrders.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }
             {
              filterOrders==="on hold billing issue" && onHoldBillingIssueOrders.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              } 
                {
              filterOrders==="on hold out of stock" && onHoldOutOfStockOrders.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }  
               {
              filterOrders==="cancel" && cancelOrders.map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{matchingMerchant?.name}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.recvMoney} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }
          
             
            </div>
          </div>
        </div>
    );
};

export default OrderList;

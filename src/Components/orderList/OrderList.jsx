import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetMongoData from '../../hooks/useGetMongoData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navigationbar from '../navigationBar/Navigationbar';
const OrderList = () => {
  const { orderAll } = useGetMongoData();
  const [allMerchant,setAllMerchant]=useState([])
  // console.log("orderAll", orderAll);
  const [show, setShow] = useState({});
  const [filterOrders,setFilterOrders]=useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); 
  const [startDate,setStartDate]=useState(null);
  const [endDate,setEndDate]=useState(null);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
//  console.log("allMerchant",allMerchant);
let date = new Date(orderAll?.createdAt); // create a new Date object

let options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }; // options for toLocaleDateString

let formattedDate = date.toLocaleDateString('en-US', options); // use toLocaleDateString to format the date
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
// console.log("formattedDate",formattedDate);
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
let  confirmedOrders=orderAll?.filter(users=>users?.orderStatus==="confirmed");
let onHoldArtworkIssueOrders=orderAll?.filter(users=>users?.orderStatus==="on hold artwork issue");
let onHoldBillingIssueOrders=orderAll?.filter(users=>users?.orderStatus==="on hold billing issue");
let onHoldOutOfStockOrders=orderAll?.filter(users=>users?.orderStatus==="on hold out of stock");
let inProductionOrders=orderAll?.filter(users=>users?.orderStatus==="in-production");
let outForDeliveryOrders=orderAll?.filter(users=>users?.orderStatus==="out for delivery");
let deliveredOrders=orderAll?.filter(users=>users?.orderStatus==="delivered");
let cancelOrders=orderAll?.filter(users=>users?.orderStatus==="cancel");
let returnOrders=orderAll?.filter(users=>users?.orderStatus==="returned");
// payment staus
let paidOrders=orderAll?.filter(users=>users?.paymentStatus==="paid");

let unPaidOrders=orderAll?.filter(users=>users?.paymentStatus==="Unpaid");
let searchByOrderId= orderAll?.filter(OrederId => OrederId?._id?.includes(filterOrders));
let filterByClientPhone=orderAll?.filter(users=>users?.clientPhone===filterOrders);
let filterByBrandName=orderAll?.filter(users=>users?.clientbrandName===filterOrders);
// console.log("filterByBrandName",filterByBrandName);
// console.log("filterByClientPhone",filterByClientPhone);
const handleOrderIdChange = (e) => {
  const value = e.target.value;
  // console.log(value);
  setFilterOrders(value);
}
const getViewClientColor = (status) => {
  if (status === "Pending") {
    return "Orange";
  }
  if (status === "on-hold") {
    return "Orange";
  }
  if (status === "on hold artwork issue") {
    return "Orange";
  }  
      if (status === "on hold billing issue") {
    return "Orange";
  } 
  if (status === "on hold out of stock") {
    return "Orange";
  }  
  if (status === "Approved") {
    return "green";
  } 

    if (status === "in-production") {
    return "green";
  }
    if (status === "out for delivery") {
    return "green";
  }  
  if (status === "delivered") {
    return "green";
  } 
   if (status === "payment-released") {
    return "green";
  } 
  if (status === "returned") {
    return "red";
  }    
    if (status === "cancel") {
    return "red";
  }   
   if (status === "paid") {
    return "#1fea70";
  }  
  if (status === "Unpaid") {
    return "#360eea";
  }
  // you can add more conditions here or just return a default color
  // return "defaultColor";
};
// start date Handler 
const handleChangeStartDate=(date)=>{
  setStartDate(date)
  setFilterOrders('')
}
const handleChangeEndDate=(date)=>{
  setEndDate(date)
  setFilterOrders('')
}
// const filerByOrderDate=orderAll.filter(order=>{
//   const date=new Date(order?.createdAt)
//   const orderDate=date
 
//   return orderDate>=new Date(startDate) && orderDate<=new Date(endDate)
// })
// console.log("filerByOrderDate",filerByOrderDate);
const filerByOrderDate = orderAll.filter(order => {
  const date = new Date(order?.createdAt);
  const orderDate = date;
  
   if (startDate && endDate) {
    // return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1); // Adjust the end date to the next day
    return orderDate >= start && orderDate < end;
  } 
   else if (startDate && !endDate) {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setDate(end.getDate() + 1); // Set the end date to the next day
    return orderDate >= start && orderDate < end;
  }

  return false;
});

// console.log("filterByOrderDate", filerByOrderDate);


const actualIndexOfLastItem = indexOfLastItem > orderAll.length ? orderAll.length : indexOfLastItem;
const actualIndexOfLastItemOfpendingOrders = indexOfLastItem > pendingOrders.length ? pendingOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfapprovedOrders = indexOfLastItem > approvedOrders.length ? approvedOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfconfirmedOrders = indexOfLastItem >  confirmedOrders.length ?  confirmedOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfonHoldArtworkIssueOrders = indexOfLastItem > onHoldArtworkIssueOrders.length ? onHoldArtworkIssueOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfonHoldBillingIssueOrders = indexOfLastItem > onHoldBillingIssueOrders.length ? onHoldBillingIssueOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfonHoldOutOfStockOrders = indexOfLastItem > onHoldOutOfStockOrders.length ? onHoldOutOfStockOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfinProductionOrders = indexOfLastItem > inProductionOrders.length ? inProductionOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfoutForDeliveryOrders = indexOfLastItem > outForDeliveryOrders.length ? outForDeliveryOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfdeliveredOrders = indexOfLastItem > deliveredOrders.length ? deliveredOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfcancelOrders = indexOfLastItem > cancelOrders.length ? cancelOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfreturnOrders = indexOfLastItem > returnOrders.length ? returnOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfPaidOrders = indexOfLastItem > paidOrders.length ? paidOrders.length : indexOfLastItem;
const actualIndexOfLastItemOfUnpaidOrders = indexOfLastItem > unPaidOrders.length ? unPaidOrders.length : indexOfLastItem;
    return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        /* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n\n}\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        a {\n            text-decoration: none;\n            color: #000;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        .order-section {\n            margin: 50px;\n        }\n\n        h2 {\n            color: #333;\n            padding-bottom: 10px;\n            font-weight: 700;\n            text-transform: uppercase;\n        }\n\n        .row {\n            display: flex;\n            flex-wrap: wrap;\n            margin: 0 -15px;\n        }\n\n        .order-filter {\n        }\n\n        .client-order-list {\n            margin-top: 50px;\n            padding: 50px;\n            border: 1px solid #ccc;\n            border-radius: 20px;\n            background-color: #ffffff;\n        }\n\n        .client-list {\n            cursor: pointer;\n            padding-top: 20px;\n        }\n\n        .client-list-title h4 {\n            text-transform: uppercase;\n            font-weight: bold;\n        }\n\n        .client-list p {\n            margin-bottom: 10px;\n        }\n\n        .client-list:hover {\n            background-color: aliceblue;\n            border-radius: 15px;\n            transition: linear 0.2s;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n        }\n\n        .p-status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #00aeff;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {\n\n        }\n\n        @media screen and (max-width: 768px) {\n\n        }\n\n    " }} />
          <Navigationbar/>
          <div className="order-section">
            <div className="row">
              <div className="col-12">
                <h2>All Orders</h2>
              </div>
            </div>
            <div className="row order-filter">
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="name-filter" style={{marginBottom:"8px"}}>Client Number</label>
                <input type="text" id="name-filter" className="form-control"onChange={handleInputChange}  />
              </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="id-filter" style={{marginBottom:"8px"}}>Order Id:</label>
                <input type="text" id="id-filter" className="form-control" onChange={(e) =>  handleOrderIdChange(e)} />
              </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="brand-filter" style={{marginBottom:"8px"}}>Brand Name</label>
                <input type="text" id="brand-filter" onChange={ handleInputChange} className="form-control" />
              </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="status-filter" style={{marginBottom:"8px"}}>Payment:</label>
                <select id="status-filter" className="form-control" onChange={(e)=>handlePaymentStausInputChange(e)}>
                  <option value>None</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
             
              <div className="col-lg-1 col-sm-12">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <DatePicker className='form-control' selected={startDate} onChange={handleChangeStartDate} selectsStart startDate={startDate} endDate={endDate} />
                 
                
                  </div>   
                   <div className="col-lg-1 col-sm-12">
               
                 
                  <label style={{textAlign:"start"}} htmlFor="endDate" className="form-label">End Date</label>
                  <DatePicker className='form-control' selected={endDate} onChange={handleChangeEndDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
                  </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="status-filter" style={{marginBottom:"8px"}}>Status:</label>
                <select id="status-filter"  className="form-control" onChange={(e) =>  handleInputChange(e)}>
                  <option   value="all">all</option>
                  <option value="Pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
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
              {
                 filterOrders === "all" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItem} of {orderAll.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(orderAll.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }   {
                 filterOrders === "Pending" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfpendingOrders} of {pendingOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(pendingOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }   {
                 filterOrders === "confirmed" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfconfirmedOrders} of { confirmedOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil( confirmedOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }  {
                 filterOrders === "Approved" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfapprovedOrders} of {approvedOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(approvedOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              } {
                 filterOrders === "in-production" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfinProductionOrders} of {inProductionOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(inProductionOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              } {
                 filterOrders === "on hold artwork issue" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfonHoldArtworkIssueOrders} of {onHoldArtworkIssueOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(onHoldArtworkIssueOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }{
                 filterOrders === "on hold billing issue" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfonHoldBillingIssueOrders} of {onHoldBillingIssueOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(onHoldBillingIssueOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }{
                 filterOrders === "on hold out of stock" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfonHoldOutOfStockOrders} of {onHoldOutOfStockOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(onHoldOutOfStockOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }
              {
                 filterOrders === "out for delivery" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfoutForDeliveryOrders} of {outForDeliveryOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(outForDeliveryOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              } {
                 filterOrders === "delivered" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfdeliveredOrders} of {deliveredOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(deliveredOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }{
                 filterOrders === "cancel" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfcancelOrders} of {cancelOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(cancelOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }{
                 filterOrders === "returned" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfreturnOrders} of {returnOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(returnOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }
              {
                 filterOrders === "paid" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfPaidOrders} of {paidOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(paidOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }  {
                 filterOrders === "Unpaid" && 
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItemOfUnpaidOrders} of {unPaidOrders.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(unPaidOrders.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
              }
            </div>
            <div className="client-order-list">
              <div className="row" style={{marginBottom: '30px'}}>
                <div className="col-lg-2 col-sm-12">
                  <h4>Client Name</h4>
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
                   filerByOrderDate.map((orders,index)=>{ 
                    matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
                   let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                    return (
                      <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                      <div key={orders?._id} className="row client-list">
                        <div className="col-lg-2 col-sm-12">
                         {/* Display the corresponding allMerchant name */}
                         <p>{orders?.clientName}</p>
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
                          <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="" style={{backgroundColor:getViewClientColor(orders?.orderStatus)}}>{orders?.orderStatus}</p>
                          {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                          <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                        </div>
                      </div>
                    </Link>
                   
                   )
                    }
                      )
              }  
              {/* filter bny brand name   */}
               {
                   filterByBrandName.map((orders,index)=>{ 
                    matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
                   let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                    return (
                      <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                      <div key={orders?._id} className="row client-list">
                        <div className="col-lg-2 col-sm-12">
                         {/* Display the corresponding allMerchant name */}
                         <p>{orders?.clientName}</p>
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
                          <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="" style={{backgroundColor:getViewClientColor(orders?.orderStatus)}}>{orders?.orderStatus}</p>
                          {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                          <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                        </div>
                      </div>
                    </Link>
                   
                   )
                    }
                      )
              }   
              {/* filter by clinet number  */}
              {
                   filterOrders && filterByClientPhone?.map((orders,index)=>{ 
                   const matchingMerchantOrders = orderAll?.filter(merchantOrder => merchantOrder?.userMail === orders?.email)
                  //  console.log("matchingMerchantOrders",matchingMerchantOrders);
                   let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                    return (
                      <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchantOrders}} key={index}>
                      <div key={matchingMerchantOrders?._id} className="row client-list">
                        <div className="col-lg-2 col-sm-12">
                        
                         <p>{orders?.clientName}</p>
              
                       
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
                          <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="" style={{backgroundColor:getViewClientColor(orders?.orderStatus)}}>{orders?.orderStatus}</p>
                          <p style={{fontSize: '14px'}}>{formattedDate}</p>
                        </div>
                      </div>
                    </Link>
                   
                   )
                    }
                      )
              } 

              {
                   filterOrders && searchByOrderId
                   ?.map((orders,index)=>{ 
                    matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
                   let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                    return (
                      <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                      <div key={orders?._id} className="row client-list">
                        <div className="col-lg-2 col-sm-12">
                         {/* Display the corresponding allMerchant name */}
                         <p>{orders?.clientName}</p>
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
                          <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="" style={{backgroundColor:getViewClientColor(orders?.orderStatus)}}>{orders?.orderStatus}</p>
                          <p style={{fontSize: '14px'}}>{formattedDate}</p>
                        </div>
                      </div>
                    </Link>
                   
                   )
                    }
                      )
              } 
                 {
                   filterOrders==="paid" && paidOrders
                   ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                   .map((orders,index)=>{ 
                    matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
                   let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                    return (
                      <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                      <div key={orders?._id} className="row client-list">
                        <div className="col-lg-2 col-sm-12">
                         {/* Display the corresponding allMerchant name */}
                         <p>{orders?.clientName}</p>
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
                          <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="" style={{backgroundColor:getViewClientColor(orders?.orderStatus)}}>{orders?.orderStatus}</p>
                          {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                          <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                        </div>
                      </div>
                    </Link>
                   
                   )
                    }
                      )
              } 
                {
                   filterOrders==="Unpaid" && unPaidOrders
                   ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                   .map((orders,index)=>{ 
                    matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
                   let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                    return (
                      <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                      <div key={orders?._id} className="row client-list">
                        <div className="col-lg-2 col-sm-12">
                         {/* Display the corresponding allMerchant name */}
                         <p>{orders?.clientName}</p>
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
                          <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                                orders?.orderStatus
                                )}}>{orders?.orderStatus}</p>
                                  <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                          {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                        </div>
                      </div>
                    </Link>
                   
                   )
                    }
                      )
              }
              {
              filterOrders==="all" && orderAll?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
            let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                 return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p> {totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{backgroundColor:getViewClientColor(orders?.orderStatus)}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                      <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                     
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }  
              {
              filterOrders==="Pending" && pendingOrders?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                               <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              } 
                {
              filterOrders==="Approved" && approvedOrders
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                             <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }
              
                {
              filterOrders==="confirmed" &&  confirmedOrders
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                               <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }  
                {
              filterOrders==="in-production" && inProductionOrders
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                               <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }
              {
              filterOrders==="out for delivery" && outForDeliveryOrders
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                               <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }  
                {
              filterOrders==="delivered" && deliveredOrders
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                               <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }
              {
              filterOrders==="on hold artwork issue" && onHoldArtworkIssueOrders
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            )}}>{orders?.orderStatus}</p>
                              <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }

                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }
             {
              filterOrders==="on hold billing issue" && onHoldBillingIssueOrders
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            )}}>{orders?.orderStatus}</p>
                              <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              } 
                {
              filterOrders==="on hold out of stock" && onHoldOutOfStockOrders
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
               let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                              <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }  
               {
              filterOrders==="cancel" && cancelOrders
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
                let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                              <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                    </div>
                  </div>
                </Link>
               
               )
                }
                  )
               
              }
               {
              filterOrders==="returned" && returnOrders
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
                let  totalPrintBazCostWithDeliveryFee=Number(orders?.printbazcost) + Number(orders?.deliveryFee)
                return (
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
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
                      <p>{totalPrintBazCostWithDeliveryFee} TK</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{    backgroundColor: getViewClientColor(
                            orders?.orderStatus
                            ),}}>{orders?.orderStatus}</p>
                              <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {new Date(orders?.statusDate).toLocaleDateString('en-US', options)}</p>
                      }
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

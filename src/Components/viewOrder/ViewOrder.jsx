import React, { useState,useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TabForViewOrder from '../tabForViewOrder.jsx/TabForViewOrder';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Ticket from '../ticket/Ticket';
import SendOrderStatusMail from '../sendOrderStatusMail/SendOrderStatusMail';
const ViewOrder = () => {
  const location = useLocation();
  const viewOrder = location.state ? location?.state?.orders : null;
  const viewClient = location.state?.matchingMerchant;
  const [orderStatus, setOrderStatus] = useState(viewOrder?.orderStatus);
  const [paymentStatus, setPaymentStatus] = useState(viewOrder?.paymentStatus);

  const [show, setShow] = useState(false);
  const target = useRef(null);
  let date = new Date(viewOrder?.createdAt); // create a new Date object

  let options = {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'  }; // options for toLocaleDateString
  
  let formattedDate = date.toLocaleDateString('en-US', options); // use toLocaleDateString to format the date
  
  console.log(formattedDate); 
  
  const handleInputChange = async (e) => {
    const status = e.target.value; // the new status
  console.log("status",status);

    //   await fetch(`http://localhost:5000/update-approval/${viewClient?._id}`, { //for testing site
    try {
      const response = await fetch(
        
        `https://mserver.printbaz.com/updateOrderStatus/${viewOrder?._id}`,
      // `http://localhost:5000/updateOrderStatus/${viewOrder?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderStatus: status }),
        }
      );
  
      if (response.ok) {
        // Update the approval status in the viewClient object
        setOrderStatus(status);
        SendOrderStatusMail({status:status,_id:viewOrder?._id,userMail:viewOrder?.userMail })
        console.log("Success:", viewOrder);
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
  
  const handleInputPaymentChange = async (e) => {
    const status = e.target.value; // the new status
  console.log("status",status);

    //   await fetch(`http://localhost:5000/update-approval/${viewClient?._id}`, { //for testing site
    try {
      const response = await fetch(
        
        `https://mserver.printbaz.com/updatePaymentStatus/${viewOrder?._id}`,
      // `http://localhost:5000/updatePaymentStatus/${viewOrder?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentStatus: status }),
        }
      );
  
      if (response.ok) {
        // Update the approval status in the viewClient object
        setPaymentStatus(status);
  
        console.log("Success:", viewOrder);
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
  function downloadImage(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = true;
    link.click();
  }
  const copyOrderId = () => {
    navigator.clipboard.writeText(viewOrder?._id);
    
    setShow(true)
    console.log("viewOrder?._id",viewOrder?._id);
    setTimeout(() => {
      setShow(false);
    }, 1000);
    
    // Show a notification or perform any other action after copying the ID
  };
    return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        /* Nav Bar CSS Start */\n\n        .navbar {\n            background: #001846 !important;\n            padding: 0 20px 0 20px;\n        }\n\n        .navbar-brand img {\n            width: 120px;\n        }\n\n        .nav-link {\n            color: #ffffff !important;\n            font-size: 18px;\n            font-weight: 500;\n            text-align: center;\n            text-transform: uppercase;\n            padding: 20px 20px 20px 20px;\n            margin: 0 10px 0 10px;\n        }\n\n        .nav-link:hover {\n            background-color: #ffffff;\n            color: #001846 !important;\n            transition: linear 0.2s;\n        }\n\n        .nav-dropdown-menu {\n            background-color: #001846;\n        }\n\n        .nav-dropdown-item {\n            color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .navbar-toggler {\n            background-color: #ffffff !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {}\n\n        @media screen and (max-width: 768px) {\n            .nav-link {\n                text-align: left;\n            }\n\n            .nav-link:hover {\n                width: 100%;\n\n            }\n\n            .view-client {\n                padding: 30px;\n            }\n\n        }\n\n        /* Nav Bar CSS End */\n\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        .all-content {\n            margin: 50px;\n        }\n\n        .all-title {\n            font-weight: 700;\n            margin-bottom: 30px;\n        }\n\n        .rec-title h5 {\n            margin-top: 40px;\n            font-weight: 600;\n        }\n\n        .rec-title p {\n            font-size: 18px;\n        }\n\n        .amu-title h3 {\n            margin-bottom: 15px !important;\n        }\n\n        .amu-title h6 {\n            display: inline-block;\n            width: 75%;\n            font-weight: 600;\n            margin: 0;\n            margin-top: 10px;\n        }\n\n        .amu-title p {\n            display: inline-block;\n            width: 20%;\n            margin: 0;\n        }\n\n        .trak-info h3 {\n            font-weight: 700;\n        }\n\n        .trak-status .col-3 {\n            text-align: center;\n        }\n\n        .trak-status p {\n            font-weight: 600;\n            margin-top: 10px;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n            border: none;\n        }\n\n        .view-client-title a {\n            font-weight: 700;\n            font-size: 30px;\n            text-decoration: none;\n            color: #000;\n        }\n\n        .order-details {\n            background-color: #fff;\n        }\n\n        .card {\n            border: 0;\n            margin-bottom: 5px;\n            border-radius: 4px\n        }\n\n        .card.card-transparent {\n            background: 0 0 !important;\n            box-shadow: none\n        }\n\n        .file-options {\n            position: absolute;\n            right: 0;\n            top: 0;\n            visibility: hidden;\n            opacity: 0;\n            -webkit-transition: all .2s ease-in-out;\n            -moz-transition: all .2s ease-in-out;\n            -o-transition: all .2s ease-in-out;\n            transition: all .2s ease-in-out;\n            z-index: 999;\n        }\n\n        .file:hover .file-options,\n        .folder:hover .file-options {\n            visibility: visible;\n            opacity: 1\n        }\n\n        .file-options>a {\n            margin: 15px 10px;\n            display: block;\n            color: #384c6d;\n            opacity: .6;\n            -webkit-transition: all .2s ease-in-out;\n            -moz-transition: all .2s ease-in-out;\n            -o-transition: all .2s ease-in-out;\n            transition: all .2s ease-in-out;\n        }\n\n        .file-options>a i {\n            font-size: 19px\n        }\n\n        .file-options>a:hover {\n            opacity: 1\n        }\n\n        .file-options>a::after {\n            display: none\n        }\n\n        .file .file-info p {\n            font-weight: 500;\n            margin-bottom: 0;\n        }\n\n        .file .file-info span.file-size {\n            color: rgba(0, 0, 0, .4)\n        }\n\n        .file .file-info span.file-date {\n            font-size: 12px;\n            color: rgba(0, 0, 0, .4);\n            margin-top: 10px;\n            display: block\n        }\n\n        .card-body {\n            flex: 1 1 auto;\n            padding: 0;\n        }\n\n        .order-list-title {\n            margin-bottom: 20px;\n        }\n\n        .order-list-title h4 {\n            font-size: 24px;\n            font-weight: 500;\n        }\n\n        .order-tab {\n            padding: 10px 0 10px 0;\n        }\n\n        .admin-dis-a {\n    color: #000000 !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 !important;\n}\n\n.admin-dis {\n    width: 100%;\n    margin: 0 auto;\n    padding: 20px;\n    box-sizing: border-box;\n    list-style-type: none;\n    padding: 0;\n}\n\n.admin-dis-tab {\n    margin-bottom: 20px;\n}\n\n.admin-dis-li {\n    display: inline-block;\n}\n\n.admin-dis-a {\n    padding: 10px 20px;\n    display: block;\n    text-decoration: none;\n    color: #000;\n}\n\n.admin-dis-a.active {\n    background-color: #f2f2f2;\n    color: #000;\n}\n\n.admin-dis-chat {\n    background-color: #fff;\n    padding: 20px;\n    border-radius: 4px;\n    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);\n}\n\n.admin-dis-chat form {\n    display: flex;\n    align-items: center;\n}\n\n.admin-dis-chat form input[type=\"text\"] {\n    flex: 1;\n    padding: 10px;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n    margin-right: 10px;\n}\n\n.admin-dis-chat form button {\n    padding: 10px 20px;\n    background-color: #007BFF;\n    color: #fff;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n\n.admin-dis-chat form button:hover {\n    background-color: #0056b3;\n}\n\n.dis-post {\n    display: flex;\n    flex-shrink: 0\n}\n\n.admin-dis-post {\n    margin-top: 20px;\n    background: #fff;\n    padding: 20px;\n}\n\n    " }} />
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
          <div className="all-content">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="view-client-title my-3">
                  <Link to="/orderList"><span style={{fontSize: '30px'}}>
                      &lt; </span> View Order Details</Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="order-id bg-white p-4  shadow-sm" >
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <h3 className="d-inline-block font-weight-bold" onClick={copyOrderId}>ORDER ID: {viewOrder?._id} &nbsp;<span style={{cursor:"pointer",padding:"5px",fontSize:"16px"}} ref={target}  onClick={copyOrderId}><i class="fa fa-copy ml-2 mt-1 text-green cursor-pointer text-sm"></i></span> <h5 style={{marginTop:"10px"}}>{formattedDate}</h5></h3>
                  {/* <button className="status-btn d-inline-block py-2 px-3 font-weight-bold">{viewOrder?.orderStatus}</button> */}
                  <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
           copied!
          </Tooltip>
        )}
      </Overlay>
                  <div
                        className=" d-inline-block  font-weight-bold"
                        style={{ marginBottom: "20px" }}
                      >
                        <div style={{display:"flex"}}>
                        <select
                          id="status-filter"
                          className="status-btn"
                          style={{
                            border: "none",
                            padding: "8px",
                            marginRight:'20px',
                            backgroundColor: getViewClientColor(
                              paymentStatus
                            ),
                          }}
                          onChange={(e) => handleInputPaymentChange(e)}
                        >
                          <option value={orderStatus}>
                            {paymentStatus=== "paid"&& "Paid" }
                            {paymentStatus=== "Unpaid"&& "Unpaid" }
                           
                        
                          </option>
                      
                      

                       


{paymentStatus === "paid" && (
                            <>
                              {/* <option value="paid">Paid</option> */}
                              <option value="Unpaid">Unpaid</option>
                           
                            </>
                          )}

{paymentStatus === "Unpaid" && (
                            <>
                            <option value="paid">Paid</option>
                            {/* <option value="Unpaid">Unpaid</option> */}
                           
                              
                            </>
                          )}
                        </select>
                        <select
                          id="status-filter"
                          className="status-btn"
                          style={{
                            border: "none",
                            padding: "8px",
                            backgroundColor: getViewClientColor(
                              orderStatus
                            ),
                          }}
                          onChange={(e) => handleInputChange(e)}
                        >
                          <option value={orderStatus}>
                            {orderStatus=== "Pending"&& "Pending" }
                            {orderStatus=== "on-hold"&& "On Hold" }
                            {orderStatus=== "Approved"&& "Approved" }
                            {orderStatus=== "in-production"&& "In Production" }
                            {orderStatus=== "out for delivery"&& "Out for delivery" }
                            {orderStatus=== "delivered"&& "Delivered" }
                            {orderStatus=== "payment-released"&& "Payment Released" }
                            {orderStatus=== "returned"&& "Returned" }
                            {orderStatus=== "on hold artwork issue"&& "On hold -Artwork issue" }
                            {orderStatus=== "on hold billing issue"&& "On hold - Billing issue" }
                            {orderStatus=== "on hold out of stock"&& "On hold - Out of stock" }
                            {orderStatus=== "cancel"&& "Cancel" }
                        
                          </option>
                          {orderStatus === "Approved" && (
                            <>
                              <option value="Pending">Pending</option>
                              <option value="on-hold">On Hold</option>
                              <option value="on hold artwork issue">On hold -  Artwork issue</option>
                  <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                              <option value="in-production">In Production</option>
                              <option value="out for delivery">Out for delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="payment-released">Payment Released</option>
                              <option value="returned">Returned</option>
                              <option value="cancel">Cancel</option>
                            </>
                          )}
                          {orderStatus === "Pending" && (
                            <>
                             
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
                            </>
                          )}
                          {orderStatus === "on-hold" && (
                            <>
                             <option value="Pending">Pending</option>
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
                            </>
                          )}  
                            {orderStatus === "in-production" && (
                            <>
                                <option value="on-hold">On Hold</option>
                                <option value="on hold artwork issue">On hold -  Artwork issue</option>
                  <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                             <option value="Pending">Pending</option>
                             <option value="Approved">Approved</option>
                              <option value="out for delivery">Out for delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="payment-released">Payment Released</option>
                              <option value="returned">Returned</option>
                              <option value="cancel">Cancel</option>
                            </>
                          )}  
                              {orderStatus === "out for delivery" && (
                            <>
                                <option value="on-hold">On Hold</option>
                                <option value="on hold artwork issue">On hold -  Artwork issue</option>
                  <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                             <option value="Pending">Pending</option>
                             <option value="Approved">Approved</option>
                             <option value="in-production">In Production</option>
                              <option value="delivered">Delivered</option>
                              <option value="payment-released">Payment Released</option>
                              <option value="returned">Returned</option>
                              <option value="cancel">Cancel</option>
                            </>
                          )}
                            {orderStatus === "delivered" && (
                            <>
                                <option value="on-hold">On Hold</option>
                                <option value="on hold artwork issue">On hold -  Artwork issue</option>
                  <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                             <option value="Pending">Pending</option>
                             <option value="Approved">Approved</option>
                             <option value="in-production">In Production</option>
                             <option value="out for delivery">Out for delivery</option>
                              <option value="payment-released">Payment Released</option>
                              <option value="returned">Returned</option>
                              <option value="cancel">Cancel</option>
                            </>
                          )} 
                           {orderStatus === "payment-released" && (
                            <>
                                <option value="on-hold">On Hold</option>
                                <option value="on hold artwork issue">On hold -  Artwork issue</option>
                  <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                             <option value="Pending">Pending</option>
                             <option value="Approved">Approved</option>
                             <option value="in-production">In Production</option>
                             <option value="out for delivery">Out for delivery</option>
                             <option value="delivered">Delivered</option>
                              <option value="returned">Returned</option>
                              <option value="cancel">Cancel</option>
                            </>
                          )}  
                          {orderStatus === "returned" && (
                            <>
                                <option value="on-hold">On Hold</option>
                                <option value="on hold artwork issue">On hold -  Artwork issue</option>
                  <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                             <option value="Pending">Pending</option>
                             <option value="Approved">Approved</option>
                             <option value="in-production">In Production</option>
                             <option value="out for delivery">Out for delivery</option>
                             <option value="delivered">Delivered</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="cancel">Cancel</option>
                             
                            </>
                          )}

                          {orderStatus === "on hold artwork issue" && (
                            <>
                              <option value="Pending">Pending</option>
                              <option value="on-hold">On Hold</option>
                              <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                              <option value="Approved">Approved</option>
                              <option value="in-production">In Production</option>
                              <option value="out for delivery">Out for delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="payment-released">Payment Released</option>
                              <option value="returned">Returned</option>
                              <option value="cancel">Cancel</option>
                            </>
                          )}

{orderStatus === "on hold billing issue" && (
                            <>
                              <option value="Pending">Pending</option>
                              <option value="on-hold">On Hold</option>
                              <option value="on hold artwork issue">On hold - Artwork Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                              <option value="Approved">Approved</option>
                              <option value="in-production">In Production</option>
                              <option value="out for delivery">Out for delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="payment-released">Payment Released</option>
                              <option value="returned">Returned</option>
                              <option value="cancel">Cancel</option>
                            </>
                          )}

{orderStatus === "on hold out of stock" && (
                            <>
                              <option value="Pending">Pending</option>
                              <option value="on-hold">On Hold</option>
                              <option value="on hold artwork issue">On hold - Artwork Issue</option>
                              <option value="on hold billing issue">On hold - Billing Issue</option>
                              <option value="Approved">Approved</option>
                              <option value="in-production">In Production</option>
                              <option value="out for delivery">Out for delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="payment-released">Payment Released</option>
                              <option value="returned">Returned</option>
                              <option value="cancel">Cancel</option>
                            </>
                          )}

{orderStatus === "cancel" && (
                            <>
                              <option value="Pending">Pending</option>
                              <option value="on-hold">On Hold</option>
                              <option value="on hold artwork issue">On hold - Artwork Issue</option>
                              <option value="on hold billing issue">On hold - Billing Issue</option>
                              <option value="on hold out of stock">On hold - Out Of Stock</option>
                              <option value="Approved">Approved</option>
                              <option value="in-production">In Production</option>
                              <option value="out for delivery">Out for delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="payment-released">Payment Released</option>
                              <option value="returned">Returned</option>
                              
                            </>
                          )}
                        </select>
                        </div>
                        
                       
                <p style={{textAlign:"center",marginTop:'10px'}}>Status changed at: {viewOrder?.statusDate}</p>

                      </div>
                </div>
              
                     
                </div>
            
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="trak-info bg-white p-4 my-3 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title mb-4">Tracking Details</h3>
                    </div>
                  </div>
                  <div className="row trak-status">
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868453112680478/ic-confirmed-red.f41e73a9.png" alt="" />
                     {
                      orderStatus==="returned"|| orderStatus==="Approved" || orderStatus==="in-production" ||  orderStatus==="out for delivery" ||  orderStatus==="payment-released"||   orderStatus==="delivered"    ?
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                      :
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} />

                     }
                     
                      <p>Accepted</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                                         orderStatus==="returned" || orderStatus==="in-production" ||  orderStatus==="out for delivery" ||  orderStatus==="payment-released"||   orderStatus==="delivered"   ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>In Production</p>
                    </div>  
                      <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                       orderStatus==="returned"|| orderStatus==="out for delivery" || orderStatus==="payment-released"||  orderStatus==="delivered"   ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>Out for Delivery</p>
                    </div>  
                     <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                   orderStatus==="returned"||   orderStatus==="payment-released"|| orderStatus==="delivered"  ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>Delivered</p>
                    </div>
                    
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-12 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Client Details</h3>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Name</h5>
                      <p>{viewClient?.name}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Brand Name</h5>
                      <p>{viewClient?.brandName}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Email</h5>
                      <p>{viewClient?.email}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Contact Number</h5>
                      <p>{viewClient?.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Recipient Details</h3>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Name</h5>
                      <p>{viewOrder?.name}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Phone</h5>
                      <p>{viewOrder?.phone}</p>
                    </div>
                    <div className="col-12">
                      <h5>Address</h5>
                      <p>{viewOrder?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="bg-white p-4 shadow-sm">
                  <div className="row amu-title">
                    <div className="col-12">
                      <h3 className="all-title">Cost of Order</h3>
                      <h6>Printbaz Cost</h6>
                      <p>{viewOrder?.printbazcost} BDT</p>
                      <h6>Delivery Fee</h6>
                      <p>{viewOrder?.deliveryFee} BDT</p>
                      <h6>Collect Amount</h6>
                      <p>{viewOrder?.collectAmount} BDT</p>
                      <h6>Cash Handling Fee</h6>
                      <p>2% BDT</p>
                      <h6>Receivable Amount</h6>
                      <p>{viewOrder?.recvMoney} BDT</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* //instruction box  */}
              <div className="col-lg-12 col-md-12 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Instruction</h3>
                    </div>
                  </div>
               
                  <div className="row order-list-title">
                    <div className="col-12">
                      <h4>{viewOrder?.instruction}</h4>
                    </div>
              
                  </div>
               
                
                 
                </div>
              </div>

              <div className="col-lg-12 col-md-12 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Order Details</h3>
                    </div>
                  </div>
               
                  <div className="row order-list-title">
                    <div className="col-2">
                      <h4>Color</h4>
                    </div>
                    <div className="col-2">
                      <h4>T-shirt Size</h4>
                    </div>
                    <div className="col-2">
                      <h4>Quantity</h4>
                    </div>
                    <div className="col-2">
                      <h4>Print Size</h4>
                    </div>
                    <div className="col-2">
                      <h4>Main File</h4>
                    </div>
                    <div className="col-2">
                      <h4>Picture</h4>
                    </div>
                    {/* <div className="col-2">
                      <h4>Picture</h4>
                    </div> */}
                  </div>
                  {
                    viewOrder?.orderDetailArr?.map((orderDetail,orderIndex)=><>
                      <div className="row order-tab" key={orderIndex}>
                    <div className="col-2">
                      <p>{orderDetail?.color}</p>
                    </div>
                    <div className="col-2">
                      {orderDetail?.teshirtSize}
                    </div>
                    <div className="col-2">
                    {orderDetail?.quantity}
                    </div>
                    <div className="col-2">
                    {/* {orderDetail?.printSide} */}
                    <p>frontSide :{orderDetail?.printSize}</p>
                    {
                     (orderDetail?.printSide=== "backSide" ||  orderDetail?.printSide=== "bothSide") && 
                     <p>backSide:{orderDetail?.printSizeBack}</p>
                   }
                  
                     
                    </div>
                    <div className="col-lg-2">
                    <div className="card file">
  {
    orderDetail?.file?.map((fileUrl,fileIndex) => {
     // Extract the file ID from the URL
     let fileId = "";
     if (fileUrl.includes("/file/d/")) {
       fileId = fileUrl.split("/file/d/")[1].split("/")[0];
     } else if (fileUrl.includes("id=")) {
       fileId = fileUrl.split("id=")[1];
     }
     // Construct the direct download link
     const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
     let dropdownId = `dropdown${orderIndex}-${fileIndex}`;
      return (
        <div key={fileIndex}>
         
          <div className="card-body file-info">
            
            <a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>{fileUrl.substring(fileUrl.lastIndexOf('/') + 1)}</p></a>
            {/* <ul className="file-options dropdown" >
            <a className="dropdown-toggle" href="#" id={dropdownId} data-bs-toggle="dropdown" aria-expanded="false">
              <i className="material-icons">more_vert</i>
            </a>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a className="dropdown-item"    href="#">View Details</a>
              </li>
              <li>
                <a className="dropdown-item" href={downloadUrl} download>Download</a>
               
              </li>
              <li>
                <a className="dropdown-item" href="#">Copy Link</a>
              </li>
            </ul>
          </ul> */}
          </div>
        </div>
      )
    })
  }
</div>






                    </div>
                    <div className="col-lg-2">
                    <div className="card file">
  {
    orderDetail?.image?.map(imageUrl => {
     // Extract the file ID from the URL
     let fileId = "";
     if (imageUrl.includes("/file/d/")) {
       fileId = imageUrl.split("/file/d/")[1].split("/")[0];
     } else if (imageUrl.includes("id=")) {
       fileId = imageUrl.split("id=")[1];
     }
     // Construct the direct download link
     const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

      return (
        <div key={imageUrl}>
          {/* <ul className="file-options dropdown">
            <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="material-icons">more_vert</i>
            </a>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a className="dropdown-item" href="#">View Details</a>
              </li>
              <li>
                <a className="dropdown-item" href={downloadUrl} download>Download</a>
               
              </li>
              <li>
                <a className="dropdown-item" href="#">Copy Link</a>
              </li>
            </ul>
          </ul> */}
          <div className="card-body file-info">
           
            <a className="dropdown-item" href={downloadUrl} download> <p>{imageUrl.substring(imageUrl.lastIndexOf('/') + 1)}</p></a>
            {/* <span className="file-size">1009.2kb</span><br /> */}
          </div>
        </div>
      )
    })
  }
</div>
                    </div>
                  </div>
                    </>)
                  }
                
                 
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                <div className="admin-dis section">
                  <div className="row admin-dis-tab">
                    <div className="col-12">
                      <TabForViewOrder orderId={viewOrder?._id} email={viewClient?.email} viewClient={viewClient}></TabForViewOrder>
                      {/* <Ticket style={{visibility:"none"}}  email={viewClient?.email}/> */}
                      {/* <ul className="nav nav-tabs admin-dis">
                        <li className="nav-item admin-dis-li">
                          <a className="nav-link admin-dis-a active" aria-current="page" href="#">Discussion</a>
                        </li>
                        <li className="nav-item admin-dis-li">
                          <a className="nav-link admin-dis-a" href="#">Support Tickets</a>
                        </li>
                        <li className="nav-item admin-dis-li">
                          <a className="nav-link admin-dis-a" href="#">File Manager</a>
                        </li>
                      </ul> */}
                    </div>
                  </div>
                  <div className="admin-dis-chat">
                    <div className="col-12">
                      <form action>
                        <input type="text" placeholder="Write Your Message....." />
                        <button type="submit">Post</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-12 admin-dis-post">
                    <div className="dis-post pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">3:04 am</div>
                      </div>
                      <div className="flex-shrink-1 rounded px-3 ml-3">
                        <div className="font-weight-bold mb-1" style={{fontSize: '20px', fontWeight: 700}}>Shuvro Haque <span style={{fontSize: '12px', fontWeight: 700, backgroundColor: 'rgb(255, 38, 38)', color: 'white', padding: '5px', borderRadius: '5px'}}>Admin</span></div>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                      </div>
                    </div>
                    <div className="dis-post pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:34 am</div>
                      </div>
                      <div className="flex-shrink-1 rounded px-3 ml-3">
                        <div className="font-weight-bold mb-1" style={{fontSize: '20px', fontWeight: 700}}>Abir Ali Khan <span style={{fontSize: '12px', fontWeight: 700, backgroundColor: 'rgb(38, 139, 255)', color: 'white', padding: '5px', borderRadius: '5px'}}>Designer</span></div>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                      </div>
                    </div>
                    <div className="dis-post pb-4">
                      <div>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Parsha Priya" width={40} height={40} />
                        <div className="text-muted small text-nowrap mt-2">2:15 am</div>
                      </div>
                      <div className="flex-shrink-1 rounded px-3 ml-3">
                        <div className="font-weight-bold mb-1" style={{fontSize: '20px', fontWeight: 700}}>Tashfin Rahaman <span style={{fontSize: '12px', fontWeight: 700, backgroundColor: 'rgb(255, 38, 38)', color: 'white', padding: '5px', borderRadius: '5px'}}>Admin</span></div>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default ViewOrder;



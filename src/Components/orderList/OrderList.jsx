import React, { useEffect, useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import useGetMongoData from '../../hooks/useGetMongoData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navigationbar from '../navigationBar/Navigationbar';
import { useRoleAsignData } from '../../hooks/useRoleAsignData';

const OrderList = () => {

  const { orderAll } = useGetMongoData();
  const [allMerchant,setAllMerchant]=useState([])
  const {value_count}=useRoleAsignData()
  const [show, setShow] = useState({});
  const [filterOrders,setFilterOrders]=useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); 
  const navigate = useNavigate();
  const location = useLocation();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
  const [filterOrderId, setFilterOrderId] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterDeliveryAssignStatus, setFilterDeliveryAssignStatus] = useState('');
  const [filterTrackingId, setFilterTrackingId] = useState('');
console.log("filterTrackingId",filterTrackingId);
 
  const [previousPath, setPreviousPath] = useState('');
  useEffect(() => {
    // Update the previousPath state when the location changes
    setPreviousPath(location.pathname);
  }, [location.pathname]);
  
  useEffect(()=>{
    const getOrders = async () => {
     await fetch('https://mserver.printbaz.com/alluser') //for main site
    //  await fetch('http://localhost:5000/alluser') //for testing site
    .then(res=>res.json())
    .then(data => setAllMerchant(data))
    }
    getOrders()
},[allMerchant])

const handleInputChange = (event) => {
  const { id, value } = event.target;
  switch (id) {
    case 'status-filter':
      setFilterStatus(value);
      break; 
       case 'paymentStatus-filter':
      setFilterPaymentStatus(value);
      break;
    case 'id-filter':
      setFilterOrderId(value);
      break;
      case 'name-filter':
  setFilterName(value);
  break; 
   case 'brand-filter':
  setFilterBrand(value);
  break; 
  case 'deliveryAssign-filter':
    setFilterDeliveryAssignStatus(value);
  break; 
  case 'tracking-filter':
  setFilterTrackingId(value);
  break;
    // ...other cases
    default:
      break;
  }
  
};

const handleChangeStartDate = (date) => {
  setStartDate(date);
    // Update local storage
   
};

const handleChangeEndDate = (date) => {
  setEndDate(date);
    // Update local storage
    
};
let matchingMerchant
//  console.log("allMerchant",allMerchant);
let date = new Date(orderAll?.createdAt); // create a new Date object

let options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }; // options for toLocaleDateString

const applyFilters = () => {
  return orderAll.filter((order) => {
    console.log("order from applyFilters",order?.trackingId);
    // Filter by status
    if (filterStatus !== 'all' && order.orderStatus !== filterStatus) {
      return false;
    }
 // Filter by delivery assign
    if (filterDeliveryAssignStatus !== '' && order.deliveryAssignTo !== filterDeliveryAssignStatus) {
      return false;
    }

    // Filter by payment status
    if (filterPaymentStatus && order.paymentStatus !== filterPaymentStatus) {
      return false;
    }

    // Filter by order ID
    if (filterOrderId && !order._id.includes(filterOrderId)) {
      return false;
    } 
    // if (filterTrackingId && order.trackingId && !order.trackingId.includes(filterTrackingId)) {
    //   console.log("Filtering based on tracking ID", { filterTrackingId, orderTrackingId: order.trackingId });
    //   return false;
    // }
         // Filter by tracking ID
         if (filterTrackingId) {
          if (!order?.trackingId) {
            return false; // Skip this order if trackingId is undefined or null
          }
          if (!order.trackingId.includes(filterTrackingId)) {
            return false; // Skip this order if trackingId doesn't match the filter
          }
        }
    
    if ((order && order.statusDate) || (order && order.createdAt)) {
      const formattedStatusDate = order.statusDate?.replace(" at", "");
  const userDate = new Date(formattedStatusDate);
  
     // Now you can proceed with your date comparisons as before.
     userDate.setHours(0, 0, 0, 0);
    
     if (startDate && endDate) {
       // Both start and end dates are selected
       const start = new Date(startDate);
       start.setHours(0, 0, 0, 0);
     
       const end = new Date(endDate);
       end.setHours(23, 59, 59, 999); // Set to end of day
     
       if (userDate < start || userDate > end) return false;
     
     } else if (startDate) {
       // Only start date is selected
       const start = new Date(startDate);
       start.setHours(0, 0, 0, 0);
     
       const end = new Date(startDate);
       end.setHours(23, 59, 59, 999); // Set to end of day
     
       if (userDate < start || userDate > end) return false;
     
     } else if (endDate) {
       // Only end date is selected
       const end = new Date(endDate);
       end.setHours(23, 59, 59, 999); // Set to end of day
     
       if (userDate > end) return false;
     }
    } else {
      console.error("order or order.statusDate is undefined.");
    }
  
    // Filter by recipient name
    // if (filterName && !order.phone.includes(filterName)) {
    //   return false;
    // }
    if (filterName && order.phone.indexOf(filterName) === -1) return false;

    // Filter by brand
    if (filterBrand && (!order?.clientbrandName || !order.clientbrandName.includes(filterBrand))) {
      return false;
  }
  

    return true;
  });
};


const orderMap=applyFilters()

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

const actualIndexOfLastItem = indexOfLastItem > orderAll.length ? orderAll.length : indexOfLastItem;
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
                <label htmlFor="name-filter" style={{marginBottom:"8px"}}>Recipient Number</label>
                <input type="text" id="name-filter" className="form-control" value={filterName} onChange={handleInputChange}  />
              </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="id-filter" style={{marginBottom:"8px"}}>Order Id:</label>
                <input type="text" id="id-filter" className="form-control" value={filterOrderId}  onChange={handleInputChange} />
              </div>
              <div className="col-lg-1 col-sm-12">
                <label htmlFor="brand-filter" style={{marginBottom:"8px"}}>Brand Name</label>
                <input type="text" id="brand-filter" value={filterBrand} onChange={(e) =>  handleInputChange(e)}  className="form-control" />
              </div>
              <div className="col-lg-1 col-sm-12">
                <label htmlFor="paymentStatus-filter" style={{marginBottom:"8px"}}>Payment:</label>
                <select id="paymentStatus-filter" value={filterPaymentStatus} className="form-control" onChange={(e) =>  handleInputChange(e)}>
                  <option value=''>none</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </div> 
                <div className="col-lg-2 col-sm-12">
                <label htmlFor="tracking-filter" style={{marginBottom:"8px"}}>Tracking Id:</label>
                <input type="text" id="tracking-filter" className="form-control" value={filterTrackingId}  onChange={handleInputChange} />
              </div>  
               <div className="col-lg-1 col-sm-12">
                <label htmlFor="deliveryAssign-filter" style={{marginBottom:"8px"}}>Delivery Assign:</label>
                <select id="deliveryAssign-filter" value={filterDeliveryAssignStatus} className="form-control" onChange={(e) =>  handleInputChange(e)}>
                <option value=""> None</option>
                <option value="pathao"> Pathao</option>
                          <option value="delivery tiger">Delivery Tiger</option>
                          <option value="others">Others</option>
                </select>
              </div>
             
              <div className="col-lg-1 col-sm-12">
                  <label htmlFor="startDate" className="form-label">Start Date</label>

                                   <DatePicker className='form-control' value={startDate} selected={startDate} onChange={handleChangeStartDate} selectsStart startDate={startDate} endDate={endDate} />
                
                  </div>   
                   <div className="col-lg-1 col-sm-12">
               
                 
                  <label style={{textAlign:"start"}} htmlFor="endDate" className="form-label">End Date</label>
                  <DatePicker className='form-control' selected={endDate} value={endDate} onChange={handleChangeEndDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
                  </div>
              <div className="col-lg-2 col-sm-12">
                <label htmlFor="status-filter" style={{marginBottom:"8px"}}>Status:</label>
                <select id="status-filter"  className="form-control" value={filterStatus} onChange={(e) =>  handleInputChange(e)}>
                  <option   value="all">All</option>
                  <option value="Pending">Pending</option>
                  <option value="on hold artwork issue">On hold -  Artwork issue</option>
                  <option value="on hold billing issue">On hold - Billing Issue</option>
                  <option value="on hold out of stock">On hold - Out of Stock</option>
                  <option value="Approved">Approved</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-production">In Production</option>
                  <option value="out for delivery">Out for delivery</option>
                 <option value="delivered">Delivered</option>
                  <option value="payment-released">Payment Released</option>
                  <option value="returned">Returned</option>
                  <option value="cancel">Cancel</option>
                  
                </select>
              </div>
              
               
                 <div style={{textAlign:"right"}}>
                 <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItem < 30 ? orderMap.length :actualIndexOfLastItem} of {orderMap.length}</span>
           <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
           <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(orderAll.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
          
                 </div>
                
                 
            </div>
            <div className="client-order-list">
              <div className="row" style={{marginBottom: '30px'}}>
                <div className="col-lg-2 col-sm-12">
                  <h4>Client Name</h4>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <h4>Order Id</h4>
                </div>
                 <div className="col-lg-2 col-sm-12">
                  <h4>Tracking Id</h4>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <h4>Recipient Info</h4>
                </div>
                <div className="col-lg-1 col-sm-12">
                  <h4>Payment</h4>
                </div>
                <div className="col-lg-1 col-sm-12">
                  <h4>Collect Amount</h4>
                </div>
                <div className="col-lg-1 col-sm-12">
                  <h4>Delivery Assign </h4>
                </div> 
                <div className="col-lg-1 col-sm-12">
                  <h4>Status</h4>
                </div>
              </div>
           
              {
              orderMap
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((orders,index)=>{ 
                matchingMerchant = allMerchant.find(merchant => merchant?.email === orders?.userMail)
            let  totalPrintBazCostWithoutDeliveryFee=Number(orders?.collectAmount)
                 return (
                  value_count?.OrderView ?
                  <Link to={`/viewOrder/${orders?._id}`} state={{orders,previousPath,matchingMerchant}} key={index}>
                  <div key={orders?._id} className="row client-list">
                    <div className="col-lg-2 col-sm-12">
                     {/* Display the corresponding allMerchant name */}
                     <p>{orders?.clientName}</p>
          {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
                   
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?._id}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.trackingId}</p>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <p>{orders?.name}</p>
                      <p>{orders?.address}</p>
                      <p>{orders?.phone}</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="p-status-btn">{orders?.paymentStatus}</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p> {totalPrintBazCostWithoutDeliveryFee} TK</p>
                    </div>  
                    <div className="col-lg-1 col-sm-12">
                    <p> {orders?.deliveryAssignTo}</p>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <p className="status-btn" style={{backgroundColor:getViewClientColor(orders?.orderStatus)}}>{orders?.orderStatus}</p>
                      {/* <p style={{fontSize: '14px'}}>{formattedDate}</p> */}
                      <p style={{fontSize: '14px'}}> created at: {new Date(orders?.createdAt).toLocaleDateString('en-US', options)}</p>
                      {
                        orders?.statusDate  && 
                        <p style={{fontSize: '14px'}}> uppdated at: {orders?.statusDate}</p>
                      }
                     
                    </div>
                  </div>
                </Link>
                :    
                <div key={orders?._id} className="row client-list">
                  
                <div className="col-lg-2 col-sm-12">
                 {/* Display the corresponding allMerchant name */}
                 <p>{orders?.clientName}</p>
      {/* {index < allMerchant.length && <p>{allMerchant[index]?.name}</p>} */}
               
                </div>
                <div className="col-lg-2 col-sm-12">
                  <p>{orders?._id}</p>
                </div>
                <div className="col-lg-2 col-sm-12">
                <p>{orders?.trackingId}</p>
                </div>
                
                <div className="col-lg-1 col-sm-12">
                  <p>{orders?.name}</p>
                  <p>{orders?.address}</p>
                  <p>{orders?.phone}</p>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <p className="p-status-btn">{orders?.paymentStatus}</p>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <p> {totalPrintBazCostWithoutDeliveryFee} TK</p>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <p> {orders?.deliveryAssignTo} TK</p>
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

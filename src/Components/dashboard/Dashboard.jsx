import React, { useContext ,useState,useEffect} from 'react';
import ApexCharts from 'apexcharts'
import { Link,useLocation } from 'react-router-dom';
import { AuthContext } from '../../authProvider/AuthProvider';
import Navigationbar from '../navigationBar/Navigationbar';
import useGetMongoData from '../../hooks/useGetMongoData';
import useGetDeliveryList from '../../hooks/useGetDeliveryList';
import useGetPendingOrders from '../../hooks/useGetPendingOrders';
import * as XLSX from 'xlsx';
import GetOrdersXl from '../GetOrdersXl';
import GetTotalTshirtDispatched from '../GetTotalTshirtDispatched';
import useGetAllTickets from '../../hooks/useGetAllTickets';
const Dashboard = () => {
  const {adminUser,loading,loginAdminUser,currentUser}=useContext(AuthContext);
  const { orderAll } = useGetMongoData();
  const {fetchAllTicket}=useGetAllTickets()
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState('');
  const [worstMerchants, setWorstMerchants] = useState([]);
  const {pendingOrdersAll,
    error,
    currentPage,
    totalPages,setCurrentPage}=useGetPendingOrders()
    const goToNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    };
  
    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
      }
    };
    const [emailCounts, setEmailCounts] = useState({});

    const [topMerchants, setTopMerchants] = useState([]);

    useEffect(() => {
      // Aggregate data
      const counts = {};
  
      orderAll.forEach(item => {
          if (!counts[item.clientbrandName]) {
              counts[item.clientbrandName] = { delivered: 0, returned: 0 };
          }
  
          if (item.orderStatus === 'delivered') {
              counts[item.clientbrandName].delivered++;
          } else if (item.orderStatus === 'returned') {
              counts[item.clientbrandName].returned++;
          }
      });
  
      // Sort merchants and include their delivered count
      const sortedMerchants = Object.keys(counts)
          .sort((a, b) => {
              if (counts[b].delivered !== counts[a].delivered) {
                  return counts[b].delivered - counts[a].delivered;
              }
              return counts[b].returned - counts[a].returned;
          })
          .slice(0, 3)
          .map(brandName => ({
              name: brandName,
              deliveredCount: counts[brandName].delivered
          }));
  
      setTopMerchants(sortedMerchants);

       // Sort for worst merchants
    const sortedWorstMerchants = Object.keys(counts)
    .sort((a, b) => counts[b].returned - counts[a].returned)
    .slice(0, 3)
    .map(brandName => ({
        name: brandName,
        deliveredCount: counts[brandName].delivered,
        returnedCount: counts[brandName].returned
    }));

setWorstMerchants(sortedWorstMerchants);
  }, [orderAll]);
    console.log(('emailCounts',emailCounts));
    useEffect(() => {
      // Update the previousPath state when the location changes
      setPreviousPath(location.pathname);
    }, [location.pathname]);
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error loading orders.</div>;



  let pendingOrders = orderAll?.filter(users => users?.orderStatus === "Pending");
let   approvedOrders=orderAll?.filter(users=>users?.orderStatus==="Approved");
let   confirmedOrders=orderAll?.filter(users=>users?.orderStatus==="confirmed");
let onHoldOutOfStockOrders=orderAll?.filter(users=>users?.orderStatus==="on hold out of stock");
let inProductionOrders=orderAll?.filter(users=>users?.orderStatus==="in-production");
let outForDeliveryOrders=orderAll?.filter(users=>users?.orderStatus==="out for delivery");
let deliveredOrders=orderAll?.filter(users=>users?.orderStatus==="delivered");

let returnOrders=orderAll?.filter(users=>users?.orderStatus==="returned");
let pendingTickets=fetchAllTicket?.filter(ticket=>ticket?.ticketStatus==="pending");
let repliedTickets=fetchAllTicket?.filter(ticket=>ticket?.ticketStatus==="replied");
let openTickets=fetchAllTicket?.filter(ticket=>ticket?.ticketStatus==="open");
let paidAndDeliveredOrders=orderAll?.filter(payment=>payment?.paymentStatus==="paid" && payment?.orderStatus==="delivered" );
// filter  sum of total quantity tshirt
const tShirtQuantityForOutFOrDelivery= outForDeliveryOrders?.reduce((sum, order) => {
  return sum + (order?.orderDetailArr?.reduce((innerSum, item) => innerSum + parseInt(item.quantity || 0), 0));
}, 0);
const tShirtQuantityForDeliveredOrders= deliveredOrders?.reduce((sum, order) => {
  return sum + (order?.orderDetailArr?.reduce((innerSum, item) => innerSum + parseInt(item.quantity || 0), 0));
}, 0);
const tShirtQuantityForReturnOrders= returnOrders?.reduce((sum, order) => {
  return sum + (order?.orderDetailArr?.reduce((innerSum, item) => innerSum + parseInt(item.quantity || 0), 0));
}, 0);
const tShirtQuantityForDeliveredAndPaidOrders= paidAndDeliveredOrders?.reduce((sum, order) => {
  return sum + (order?.orderDetailArr?.reduce((innerSum, item) => innerSum + parseInt(item.quantity || 0), 0));
}, 0);

const colorQuantitiesForReturn = returnOrders?.reduce((acc, order) => {
  return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
      if (item.color === "white") {
          innerAcc.white += parseInt(item.quantity || 0);
      } else if (item.color === "black") {
          innerAcc.black += parseInt(item.quantity || 0);
      }
      return innerAcc;
  }, acc);
}, { white: 0, black: 0 });
const colorQuantitiesForOutForDelivery = outForDeliveryOrders?.reduce((acc, order) => {
  return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
      if (item.color === "white") {
          innerAcc.white += parseInt(item.quantity || 0);
      } else if (item.color === "black") {
          innerAcc.black += parseInt(item.quantity || 0);
      }
      return innerAcc;
  }, acc);
}, { white: 0, black: 0 });
const colorQuantitiesForDelivered = deliveredOrders?.reduce((acc, order) => {
  return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
      if (item.color === "white") {
          innerAcc.white += parseInt(item.quantity || 0);
      } else if (item.color === "black") {
          innerAcc.black += parseInt(item.quantity || 0);
      }
      return innerAcc;
  }, acc);
}, { white: 0, black: 0 });

const whiteQuantity = (colorQuantitiesForReturn?.white)+(colorQuantitiesForOutForDelivery?.white)+(colorQuantitiesForDelivered?.white) || 0;
const blackQuantity = (colorQuantitiesForReturn?.black)+(colorQuantitiesForOutForDelivery?.black)+(colorQuantitiesForDelivered?.black) || 0;

    // in production black ,white tshirt size count 
    // const sizeCountsForInProduction = inProductionOrders?.reduce((acc, order) => {
    //   return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
    //     if (item.color === "black") {
    //       // Initialize the size object for black if it doesn't exist
    //       if (!innerAcc.black[item.teshirtSize]) {
    //         innerAcc.black[item.teshirtSize] = 0;
    //       }
    //       innerAcc.black[item.teshirtSize] += parseInt(item.quantity || 0);
    //     } else if (item.color === "white") {
    //       // Initialize the size object for white if it doesn't exist
    //       if (!innerAcc.white[item.teshirtSize]) {
    //         innerAcc.white[item.teshirtSize] = 0;
    //       }
    //       innerAcc.white[item.teshirtSize] += parseInt(item.quantity || 0);
    //     }
    //     return innerAcc;
    //   }, acc);
    // }, { white: {}, black: {} }); 
    // const sizeCountsForconfirmedOrders = inProductionOrders?.reduce((acc, order) => {
    //   return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
    //     if (item.color === "black") {
    //       // Initialize the size object for black if it doesn't exist
    //       if (!innerAcc.black[item.teshirtSize]) {
    //         innerAcc.black[item.teshirtSize] = 0;
    //       }
    //       innerAcc.black[item.teshirtSize] += parseInt(item.quantity || 0);
    //     } else if (item.color === "white") {
    //       // Initialize the size object for white if it doesn't exist
    //       if (!innerAcc.white[item.teshirtSize]) {
    //         innerAcc.white[item.teshirtSize] = 0;
    //       }
    //       innerAcc.white[item.teshirtSize] += parseInt(item.quantity || 0);
    //     }
    //     return innerAcc;
    //   }, acc);
    // }, 
    // { white: {}, black: {} }); 
    // const sizeCountsForpendingOrders= pendingOrders?.reduce((acc, order) => {
    //   return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
    //     if (item.color === "black") {
    //       // Initialize the size object for black if it doesn't exist
    //       if (!innerAcc.black[item.teshirtSize]) {
    //         innerAcc.black[item.teshirtSize] = 0;
    //       }
    //       innerAcc.black[item.teshirtSize] += parseInt(item.quantity || 0);
    //     } else if (item.color === "white") {
    //       // Initialize the size object for white if it doesn't exist
    //       if (!innerAcc.white[item.teshirtSize]) {
    //         innerAcc.white[item.teshirtSize] = 0;
    //       }
    //       innerAcc.white[item.teshirtSize] += parseInt(item.quantity || 0);
    //     }
    //     return innerAcc;
    //   }, acc);
    // }, { white: {}, black: {} });
    //  const sizeCountsForapprovedOrders= approvedOrders?.reduce((acc, order) => {
    //   return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
    //     if (item.color === "black") {
    //       // Initialize the size object for black if it doesn't exist
    //       if (!innerAcc.black[item.teshirtSize]) {
    //         innerAcc.black[item.teshirtSize] = 0;
    //       }
    //       innerAcc.black[item.teshirtSize] += parseInt(item.quantity || 0);
    //     } else if (item.color === "white") {
    //       // Initialize the size object for white if it doesn't exist
    //       if (!innerAcc.white[item.teshirtSize]) {
    //         innerAcc.white[item.teshirtSize] = 0;
    //       }
    //       innerAcc.white[item.teshirtSize] += parseInt(item.quantity || 0);
    //     }
    //     return innerAcc;
    //   }, acc);
    // }, { white: {}, black: {} });

    const countSizeForOrders = (orders, size) => {
      return orders?.reduce((acc, order) => {
        return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
          if (item.color === "black") {
            // Initialize the size object for black if it doesn't exist
            if (!innerAcc.black[item.teshirtSize]) {
              innerAcc.black[item.teshirtSize] = 0;
            }
            innerAcc.black[item.teshirtSize] += parseInt(item.quantity || 0);
          } else if (item.color === "white") {
            // Initialize the size object for white if it doesn't exist
            if (!innerAcc.white[item.teshirtSize]) {
              innerAcc.white[item.teshirtSize] = 0;
            }
            innerAcc.white[item.teshirtSize] += parseInt(item.quantity || 0);
          }
          return innerAcc;
        }, acc);
      }, { white: {}, black: {} });
    };
    
    const sizeCountsForInProduction = countSizeForOrders(inProductionOrders);
    const sizeCountsForConfirmedOrders = countSizeForOrders(confirmedOrders);
    const sizeCountsForPendingOrders = countSizeForOrders(pendingOrders);
    const sizeCountsForApprovedOrders = countSizeForOrders(approvedOrders);
    
    const sumSizeAcrossOrdersWhite = (size) => {
      return [
        sizeCountsForInProduction,
        sizeCountsForConfirmedOrders,
        sizeCountsForPendingOrders,
        sizeCountsForApprovedOrders
      ].reduce((acc, sizeCounts) => acc + (sizeCounts.white?.[size] || 0), 0);
    }; 
      const sumSizeAcrossOrdersBlack= (size) => {
      return [
       
        sizeCountsForConfirmedOrders,
        sizeCountsForPendingOrders,
        sizeCountsForApprovedOrders
      ].reduce((acc, sizeCounts) => acc + (sizeCounts.black?.[size] || 0), 0);
    };
    
    const whiteMNeeded = sumSizeAcrossOrdersWhite("m");
    const whiteLNeeded = sumSizeAcrossOrdersWhite("L");
    const whiteXlNeeded = sumSizeAcrossOrdersWhite("XL");
    const whiteXxlNeeded = sumSizeAcrossOrdersWhite("XXL");
    const blackMNeeded =  sumSizeAcrossOrdersBlack("m");
    const blackLNeeded =  sumSizeAcrossOrdersBlack("L");
    const blackXlNeeded = sumSizeAcrossOrdersBlack("XL");
    const blackXxlNeeded =sumSizeAcrossOrdersBlack("XXL");
    
    console.log("whiteMNeeded:", whiteMNeeded);
    console.log("whiteLNeeded:", whiteLNeeded);
    console.log("whiteXxlNeeded:", whiteXxlNeeded);
    console.log("whiteXlNeeded:", whiteXlNeeded);
    console.log("blackMNeeded:",  blackMNeeded);
    console.log("blackLNeeded:",  blackLNeeded);
    console.log("blackXlNeeded:", blackXlNeeded);
    console.log("blackXxlNeeded:",blackXxlNeeded);
    

let countTotalTshirtDispatched=tShirtQuantityForOutFOrDelivery+tShirtQuantityForDeliveredOrders+tShirtQuantityForReturnOrders
let countPendingOrders = pendingOrders?.length || 0;
let countapprovedOrders = approvedOrders?.length || 0;
let countconfirmedOrders = confirmedOrders?.length || 0;
let countinProductionOrders = inProductionOrders?.length || 0;
let countoutForDeliveryOrders = outForDeliveryOrders?.length || 0;
let countdeliveredOrders = deliveredOrders?.length || 0;
let countreturnOrders = returnOrders?.length || 0;
let countpendingTickets = pendingTickets?.length || 0;
let countrepliedTickets = repliedTickets?.length || 0;
let countopenTickets = openTickets?.length || 0;
let countPaidAndDeliveredOrders=(paidAndDeliveredOrders?.length || 0)
let countODROrders = countoutForDeliveryOrders+countreturnOrders+countdeliveredOrders;
const totalpendingPBazCost = pendingOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0), 0);
const totalapprovedPBazCost = approvedOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0), 0);
const totalconfirmedPBazCost = confirmedOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0), 0);
const totalinProductionPBazCost = inProductionOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0), 0);
const totaloutForDeliveryPBazCost = outForDeliveryOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0), 0);
const totaldeliveredPBazCost = deliveredOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0), 0)
const totalreturnPBazCost = returnOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0), 0);
const TotalODR= Number(totaldeliveredPBazCost+totaloutForDeliveryPBazCost+totalreturnPBazCost)
const totalpaidAndDeliveredPBazCost = paidAndDeliveredOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0), 0);
console.log("outForDeliveryOrders",outForDeliveryOrders);

const downloadInfIntoXl = (event) => {
  const dynmamicId = event.currentTarget.dataset.orderId;
  console.log("downloadInfIntoXl", dynmamicId);
    const shippingDetailElement = document.getElementById(dynmamicId);

    // Assume the element contains a table. 
    // If not, you'll need to extract and format the data appropriately for Excel.
    const table = shippingDetailElement.querySelector('table');

    // Convert the table to a Workbook object
    const wb = XLSX.utils.table_to_book(table);

    // Write the workbook to a blob
    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });

    // Trigger a download
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'OrderList.xlsx';

    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Note: This approach assumes that the shipping details are in a table format inside the 'shipping-detail' element.
console.log("topMerchants,",topMerchants);
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" integrity="sha512-vKMx8UnXk60zUwyUnUPM3HbQo8QfmNx7+ltw8Pm5zLusl1XIfwcxo8DbWCqMGKaWeNxWA8yrx5v3SaVpMvR3CA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n        \n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n\n}\n\n.dashboard-container {\n    margin: 50px;\n    display: block;\n    -webkit-transition: all .2s ease-in-out;\n    -moz-transition: all .2s ease-in-out;\n    -o-transition: all .2s ease-in-out;\n    transition: all .2s ease-in-out\n}\n\n.card {\n    border: 0;\n    box-shadow: 0 3px 10px rgba(62, 85, 120, .045);\n    margin-bottom: 25px;\n    border-radius: 4px\n}\n\n.card .card-body {\n    padding: 25px\n}\n\n.card .card-body .card-title {\n    font-size: 14px;\n    margin-bottom: 20px;\n    color: #000\n}\n\n.card-img-top {\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px\n}\n\n.card-header {\n    padding: 10px 15px;\n    margin-bottom: 0;\n    background-color: #f2f2f2;\n    border-bottom: 1px solid #e6e6e6;\n    border-top-left-radius: 4px !important;\n    border-top-right-radius: 4px !important\n}\n\n.card-header-pills {\n    margin-right: 0;\n    margin-left: 0\n}\n\n.card-header-tabs {\n    margin-right: 0;\n    margin-bottom: -10px;\n    margin-left: 0;\n    border-bottom: 0\n}\n\n.card-footer {\n    padding: 10px 15px;\n    background-color: #f2f2f2;\n    border-top: 1px solid #e6e6e6\n}\n\n.card.text-white .card-title {\n    color: #fff\n}\n\n.card.card-transparent {\n    background: 0 0 !important;\n    box-shadow: none\n}\n\n.client-list {\n    cursor: pointer;\n    padding-top: 20px;\n}\n\n.client-list-title h4 {\n    text-transform: uppercase;\n    font-weight: bold;\n}\n\n.client-list p {\n    margin-bottom: 10px;\n}\n\n.client-list:hover {\n    background-color: aliceblue;\n    border-radius: 15px;\n    transition: linear 0.2s;\n}\n\n\n.p-status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #00aeff;\n    color: #fff;\n    font-weight: bold;\n    cursor: pointer;\n\n}\n\n\n.status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #4caf50;\n    color: #fff;\n    font-weight: bold;\n    cursor: pointer;\n}\n    " }} />
     <Navigationbar/>
        <div className="dashboard-container">
          <div className="dashboard-body">
<div className="row">
              <div className="col-md-3">
               
                <div className="card stat-card"  style={{height:"152px"}}>
                <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                  <div className="card-body pb-0">
                    <h5 className="">Total Pending Orders</h5>
                    <h2 className="float-right">{totalpendingPBazCost} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"flex-end"}}>
                   
                    <h4 className="float-right" style={{marginTop:"2px"}}>{countPendingOrders}</h4>
                    </div>
                    </div>
                  <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px"}}>
                   
                    <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-pending"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
                <div id="order-detail-pending"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
                <GetOrdersXl orderList={[pendingOrders]}/>
            </div> 
              
                  </div>
                </div>
               
              

              </div>  
               
              
                <div className="col-md-3">
               
                <div className="card stat-card" style={{height:"152px"}}>
                <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                  <div className="card-body">
                    <h5 className="">Total Approved Orders</h5>
                    <h2 className="float-right">{totalapprovedPBazCost} TK</h2>
                    </div>
                <div>
                <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                   <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countapprovedOrders}</h4>
                   </div>
                   <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
                 
                 <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-approved"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
             <div id="order-detail-approved"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
             <GetOrdersXl orderList={[approvedOrders]}/>
         </div> 
           
               </div>
                </div>
                
                    </div>
                  <div>
                  
                  </div>
                </div>
               
              

              </div>  
              <div className="col-md-3">
               
                <div className="card stat-card" style={{height:"152px"}}>
                <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                  <div className="card-body">
                    <h5 className="">Total Confirmed Orders</h5>
                    <h2 className="float-right">{totalconfirmedPBazCost} TK</h2>
                    </div>
                <div>
                <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                   <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countconfirmedOrders}</h4>
                   </div>
                   <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
                
                <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-confirmed"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
            <div id="order-detail-confirmed"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
            <GetOrdersXl orderList={[confirmedOrders]}/>
        </div> 
          
              </div>
                </div>
                 
                    </div>
                  <div>
                  
                  </div>
                </div>
               
              

              </div>  <div className="col-md-3">
               
                <div className="card stat-card" style={{height:"152px"}}>
                <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                  <div className="card-body">
                    <h5 className="">Total In Production Orders</h5>
                    <h2 className="float-right">{totalinProductionPBazCost} TK</h2>
                    </div>
                <div>
                <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                   <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countinProductionOrders}</h4>
                   </div>
                   <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
               
               <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-inProduction"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
           <div id="order-detail-inProduction"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
           <GetOrdersXl orderList={[inProductionOrders]}/>
       </div> 
         
             </div>
                </div>
               
                    </div>
                  <div>
                  
                  </div>
                </div>
                </div>
                <div className="col-md-3">
               
                <div className="card stat-card" style={{height:"152px"}}>
                <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                  <div className="card-body">
                    <h5 className="">Total Out For Delivery orders</h5>
                    <h2 className="float-right">{totaloutForDeliveryPBazCost} TK</h2>
                    </div>
                <div>
                    <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countoutForDeliveryOrders}({tShirtQuantityForOutFOrDelivery})</h4>
                    </div>
                    <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
               
               <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-outForDelivery"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
           <div id="order-detail-outForDelivery"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
           <GetOrdersXl orderList={[outForDeliveryOrders]}/>
       </div> 
         
             </div>
                </div>
                
                    </div>
                  <div>
                  
                  </div>
                </div>
               
              

              </div>
           
              <div className="col-md-3">
                <div className="card stat-card"  style={{height:"152px"}}>
                <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                  <div className="card-body pb-0">
                    <h5 className="">Total Dispatched</h5>
                    <h2 className="float-right">{TotalODR} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"flex-end"}}>
                   
                    <h4 className="float-right" style={{marginTop:"2px"}}>{countODROrders}</h4>
                    </div>
                    </div>
                  <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 25px"}}>
                   
                    <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-ODI"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
                <div id="order-detail-ODI" style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
                <GetOrdersXl orderList={[outForDeliveryOrders,deliveredOrders,returnOrders]}/>
              
            </div> 
              
                  </div>
                </div>

              </div> 
              <div className="col-md-3">
                <div className="card stat-card"  style={{height:"152px"}}>
                <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                  <div className="card-body pb-0">
                    <h5 className="">Total Delivered And Paid </h5>
                    <h2 className="float-right">{totalpaidAndDeliveredPBazCost} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"flex-end"}}>
                   
                    <h4 className="float-right" style={{marginTop:"2px"}}>{countPaidAndDeliveredOrders}({tShirtQuantityForDeliveredAndPaidOrders})</h4>
                    </div>
                    </div>
                  <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 25px"}}>
                   
                    <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-ODI"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
                <div id="order-detail-ODI" style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
                <GetOrdersXl orderList={[outForDeliveryOrders,deliveredOrders,returnOrders]}/>
              
            </div> 
              
                  </div>
                </div>
                

              </div>
           
              <div className="col-md-3">
               
               <div className="card stat-card" style={{height:"152px"}}>
               <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                 <div className="card-body ">
                 <h5 className="">Total T-Shirt Dispatched</h5>
                    <h5 className="float-right">White - {whiteQuantity}</h5>
                    <h5 className="float-right">Black - {blackQuantity}</h5>
                   </div>
               <div>
               <div className="card-body" style={{display:"flex",justifyContent:"center",height:"50%"}}>
                  
                  <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countTotalTshirtDispatched}</h4>
                  </div>
               <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
                  
                  <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-totalTShirt"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
              <div id="order-detail-totalTShirt"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
              <GetTotalTshirtDispatched countTotalTshirtDispatched={countTotalTshirtDispatched} whiteQuantity={whiteQuantity} blackQuantity={blackQuantity}/>
          </div> 
            
                </div>
               </div>
              
                   </div>
                  
               </div>
              
             

             </div> 
            
             <div className="col-md-3">
               
               <div className="card stat-card" style={{height:"152px"}}>
               <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                 <div className="card-body ">
                 <h5 className="">White T-shirt In Production </h5>
                 <div style={{display:"flex"}}>
<div>
<p className="float-right">M  - {sizeCountsForInProduction.white?.m?sizeCountsForInProduction.white?.m:0}</p>
                    <p className="float-right">L  -  {sizeCountsForInProduction.white?.L?sizeCountsForInProduction.white?.L:0}</p>
</div>
<div style={{marginLeft:"20px"}}>
<p className="float-right"> XL - {sizeCountsForInProduction.white?.XL?sizeCountsForInProduction.white?.XL:0}</p>
                    <p className="float-right"> XXL  -  {sizeCountsForInProduction.white?.XXL?sizeCountsForInProduction.white?.XXL:0}</p>
</div>
                 </div>
                  
                   
                   </div>
               <div>
               <div className="card-body" style={{display:"flex",justifyContent:"center",height:"50%"}}>
                  
                  {/* <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countTotalTshirtDispatched}</h4> */}
                  </div>
               <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
                  
                  {/* <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-totalTShirt"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span> */}
              <div id="order-detail-totalTShirt"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
              <GetTotalTshirtDispatched countTotalTshirtDispatched={countTotalTshirtDispatched} whiteQuantity={whiteQuantity} blackQuantity={blackQuantity}/>
          </div> 
            
                </div>
               </div>
              
                   </div>
                  
               </div>
              
             

             </div>
              <div className="col-md-3">
               
               <div className="card stat-card" style={{height:"152px"}}>
               <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                 <div className="card-body ">
                 <h5 className="">Black T-shirt In production</h5>
                 <div style={{display:"flex"}}>
<div>

<p className="float-right">M  - {sizeCountsForInProduction.black?.m?sizeCountsForInProduction.black?.m:0}</p>
                    <p className="float-right">L  -  {sizeCountsForInProduction.black?.L?sizeCountsForInProduction.black?.L:0}</p>
</div>
<div style={{marginLeft:"20px"}}>
<p className="float-right"> XL - {sizeCountsForInProduction.black?.XL?sizeCountsForInProduction.black?.XL:0}</p>
                    <p className="float-right"> XXL  -  {sizeCountsForInProduction.black?.XXL?sizeCountsForInProduction.black?.XXL:0}</p>
</div>
                 </div>
                  
                   
                   </div>
               <div>
               <div className="card-body" style={{display:"flex",justifyContent:"center",height:"50%"}}>
                  
                  {/* <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countTotalTshirtDispatched}</h4> */}
                  </div>
               <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
                  
                  {/* <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-totalTShirt"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span> */}
              <div id="order-detail-totalTShirt"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
              <GetTotalTshirtDispatched countTotalTshirtDispatched={countTotalTshirtDispatched} whiteQuantity={whiteQuantity} blackQuantity={blackQuantity}/>
          </div> 
            
                </div>
               </div>
              
                   </div>
                  
               </div>
              
             

             </div> <div className="col-md-3">
               
               <div className="card stat-card" style={{height:"152px"}}>
               <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                 <div className="card-body ">
                 <h5 className="">White T-shirt Needed</h5>
                 <div style={{display:"flex"}}>
<div>
<p className="float-right">M  - {whiteMNeeded}</p>
 <p className="float-right">L  -  {whiteLNeeded}</p>
</div>
<div style={{marginLeft:"20px"}}>
<p className="float-right"> XL - {whiteXlNeeded}</p>
 <p className="float-right"> XXL  -  {whiteXxlNeeded}</p>
</div>
                 </div>
                  
                   
                   </div>
               <div>
               <div className="card-body" style={{display:"flex",justifyContent:"center",height:"50%"}}>
                  
                  {/* <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countTotalTshirtDispatched}</h4> */}
                  </div>
               <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
                  
                  {/* <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-totalTShirt"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span> */}
              <div id="order-detail-totalTShirt"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
              <GetTotalTshirtDispatched countTotalTshirtDispatched={countTotalTshirtDispatched} whiteQuantity={whiteQuantity} blackQuantity={blackQuantity}/>
          </div> 
            
                </div>
               </div>
              
                   </div>
                  
               </div>
              
             

             </div>
              <div className="col-md-3">
               
               <div className="card stat-card" style={{height:"152px"}}>
               <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                 <div className="card-body ">
                 <h5 className="">Black T-shirt Needed</h5>
                 <div style={{display:"flex"}}>
<div>

<p className="float-right">M  - {blackMNeeded}</p>
   <p className="float-right">L  -  {blackLNeeded}</p>
</div>
<div style={{marginLeft:"20px"}}>
<p className="float-right"> XL - {blackXlNeeded}</p>
  <p className="float-right"> XXL  -  {blackXxlNeeded}</p>
</div>
                 </div>
                  
                   
                   </div>
               <div>
               <div className="card-body" style={{display:"flex",justifyContent:"center",height:"50%"}}>
                  
                  {/* <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countTotalTshirtDispatched}</h4> */}
                  </div>
               <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
                  
                  {/* <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-totalTShirt"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span> */}
              <div id="order-detail-totalTShirt"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
              <GetTotalTshirtDispatched countTotalTshirtDispatched={countTotalTshirtDispatched} whiteQuantity={whiteQuantity} blackQuantity={blackQuantity}/>
          </div> 
            
                </div>
               </div>
              
                   </div>
                  
               </div>
              
             

             </div>

             <div className="col-md-3">
               
               <div className="card stat-card" style={{height:"152px"}}>
               <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                 <div className="card-body">
                   <h5 className="">Total Pending Tickets</h5>
                   {/* <h2 className="float-right">{totaldeliveredPBazCost} TK</h2> */}
                   </div>
               <div>
<div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                  
                   <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countpendingTickets}</h4>
                   </div>

                   <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
              
              {/* <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-delivered"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span> */}
          <div id="order-detail-delivered"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
          <GetOrdersXl orderList={[deliveredOrders]}/>
      </div> 
        
            </div>
               </div>
                
                   </div>
                 <div>
                 
                 </div>
               </div>
              
             

             </div>
              <div className="col-md-3">
               
               <div className="card stat-card" style={{height:"152px"}}>
               <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                 <div className="card-body">
                   <h5 className="">Total Replied Tickets</h5>
                   {/* <h2 className="float-right">{totaldeliveredPBazCost} TK</h2> */}
                   </div>
               <div>
<div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                  
                   <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countrepliedTickets}</h4>
                   </div>

                   <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
              
              {/* <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-delivered"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span> */}
          <div id="order-detail-delivered"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
          <GetOrdersXl orderList={[deliveredOrders]}/>
      </div> 
        
            </div>
               </div>
                
                   </div>
                 <div>
                 
                 </div>
               </div>
              
             

             </div>
             <div className="col-md-3">
               
               <div className="card stat-card" style={{height:"152px"}}>
               <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                 <div className="card-body">
                   <h5 className="">Total Open Tickets</h5>
                   {/* <h2 className="float-right">{totaldeliveredPBazCost} TK</h2> */}
                   </div>
               <div>
<div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                  
                   <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countopenTickets}</h4>
                   </div>

                   <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
              
              {/* <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-delivered"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span> */}
          <div id="order-detail-delivered"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
          <GetOrdersXl orderList={[deliveredOrders]}/>
      </div> 
        
            </div>
               </div>
                
                   </div>
                 <div>
                 
                 </div>
               </div>
              
             

             </div>
            </div>

          
   
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="flex">
                    <h5 className="">Last Orders</h5>
                              {/* Pagination controls */}
      <div className="pagination-controls" style={{ display: "flex", justifyContent: "flex-end",alignItems:"center",marginBottom:"10px" }}>
        <button style={{marginRight:"10px",padding:"3px",color:"black",borderRadius:"5px"}} onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <span style={{marginRight:"10px"}}>Page {currentPage} of {totalPages}</span>
        <button style={{marginRight:"10px",padding:"3px",color:"black",borderRadius:"5px"}} onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
                    </div>
                    <hr />
                    
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
                          
                            pendingOrdersAll?.map((pendingOrders,index)=>{ 
                            let createDate = new Date(pendingOrders?.createdAt); 
                            let updateDate = new Date(pendingOrders?.updatedAt); 
                            let options = { year: 'numeric', month: 'long', day: 'numeric' }; 
                            let UpdatedformattedDate = updateDate.toLocaleDateString('en-US', options); 
                            let creatededformattedDate = createDate.toLocaleDateString('en-US', options); 
                     return(
                      <Link to={`/viewOrder/${pendingOrders?._id}`} state={{pendingOrders,previousPath}} key={index}>

                      <div className="row client-list">
                                        
                                             
                                        <div className="col-lg-2 col-sm-12">
                                        <p>{pendingOrders?.clientName}</p>
                                      </div>
                                      <div className="col-lg-2 col-sm-12">
                                        <p>{pendingOrders?._id}</p>
                                      </div>
                                      <div className="col-lg-3 col-sm-12">
                                        <p>{pendingOrders?.name}</p>
                                        <p>{pendingOrders?.address}</p>
                                        <p>{pendingOrders?.phone}</p>
                                      </div>
                                      <div className="col-lg-2 col-sm-12">
                                        <p className="p-status-btn">{pendingOrders?.paymentStatus}</p>
                                      </div>
                                      <div className="col-lg-2 col-sm-12">
                                        <p>{pendingOrders?.printbazcost} TK</p>
                                      </div>
                                      <div className="col-lg-1 col-sm-12">
                                        <p className="status-btn">{pendingOrders?.orderStatus}</p>
                                        <p style={{fontSize: '14px'}}> Updated at: {UpdatedformattedDate}</p>
                                        <p style={{fontSize: '14px'}}>Created at: {creatededformattedDate}</p>
                                      </div>
                                      
                                      
                                      
                                    
                                  
                                  </div>   
                                                  </Link> 
                     )
      
                            }) 
                    }
                 
                   
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;


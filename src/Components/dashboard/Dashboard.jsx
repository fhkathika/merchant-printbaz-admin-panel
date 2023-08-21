import React, { useContext ,useState,useEffect} from 'react';
import ApexCharts from 'apexcharts'
import { Link,useLocation } from 'react-router-dom';
import { AuthContext } from '../../authProvider/AuthProvider';
import Navigationbar from '../navigationBar/Navigationbar';
import useGetMongoData from '../../hooks/useGetMongoData';
import useGetDeliveryList from '../../hooks/useGetDeliveryList';
import useGetPendingOrders from '../../hooks/useGetPendingOrders';
import Button from 'react-bootstrap/Button';
import * as XLSX from 'xlsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GetOrdersXl from '../GetOrdersXl';
const Dashboard = () => {
  const {adminUser,loading,loginAdminUser,currentUser}=useContext(AuthContext);
  const { orderAll } = useGetMongoData();
  const {deliveryAll}=useGetDeliveryList()
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState('');
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
    useEffect(() => {
      // Update the previousPath state when the location changes
      setPreviousPath(location.pathname);
    }, [location.pathname]);
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error loading orders.</div>;
  
  let LatestPendingOrders = orderAll
    ?.filter(users => users?.orderStatus === "Pending")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // This sorts in descending order

  let pendingOrders = orderAll?.filter(users => users?.orderStatus === "Pending");
let approvedOrders=orderAll?.filter(users=>users?.orderStatus==="Approved");
let confirmedOrders=orderAll?.filter(users=>users?.orderStatus==="confirmed");
let onHoldArtworkIssueOrders=orderAll?.filter(users=>users?.orderStatus==="on hold artwork issue");
let onHoldBillingIssueOrders=orderAll?.filter(users=>users?.orderStatus==="on hold billing issue");
let onHoldOutOfStockOrders=orderAll?.filter(users=>users?.orderStatus==="on hold out of stock");
let inProductionOrders=orderAll?.filter(users=>users?.orderStatus==="in-production");
let outForDeliveryOrders=orderAll?.filter(users=>users?.orderStatus==="out for delivery");
let deliveredOrders=orderAll?.filter(users=>users?.orderStatus==="delivered");
let paymentReleaseddOrders=orderAll?.filter(users=>users?.orderStatus==="paymentReleased");
let cancelOrders=orderAll?.filter(users=>users?.orderStatus==="cancel");
let returnOrders=orderAll?.filter(users=>users?.orderStatus==="returned");

let countPendingOrders = pendingOrders?.length || 0;
let countapprovedOrders = approvedOrders?.length || 0;
let countconfirmedOrders = confirmedOrders?.length || 0;
let countonHoldArtworkIssueOrders = onHoldArtworkIssueOrders?.length || 0;
let countonHoldBillingIssueOrders = onHoldBillingIssueOrders?.length || 0;
let countonHoldOutOfStockOrders = onHoldOutOfStockOrders?.length || 0;
let countinProductionOrders = inProductionOrders?.length || 0;
let countoutForDeliveryOrders = outForDeliveryOrders?.length || 0;
let countdeliveredOrders = deliveredOrders?.length || 0;
let countpaymentReleaseddOrders = paymentReleaseddOrders?.length || 0;
let countcancelOrders = cancelOrders?.length || 0;
let countreturnOrders = returnOrders?.length || 0;
let countODROrders = countoutForDeliveryOrders+countreturnOrders+countdeliveredOrders;
const totalpendingPBazCost = pendingOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totalapprovedPBazCost = approvedOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totalconfirmedPBazCost = confirmedOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totalonHoldArtworkIssuePBazCost = onHoldArtworkIssueOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totalonHoldBillingIssuePBazCost = onHoldBillingIssueOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totalonHoldOutOfStockPBazCost = onHoldOutOfStockOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totalinProductionPBazCost = inProductionOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totaloutForDeliveryPBazCost = outForDeliveryOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totaldeliveredPBazCost = deliveredOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totalpaymentReleasedPBazCost = paymentReleaseddOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totalcancelPBazCost = cancelOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const totalreturnPBazCost = returnOrders?.reduce((acc, curr) => acc +parseFloat (curr.printbazcost || 0)+parseInt(curr.deliveryFee), 0);
const TotalODR= Number(totaldeliveredPBazCost+totaloutForDeliveryPBazCost+totalreturnPBazCost)



const downloadInfIntoXl = () => {
  console.log("downloadInfIntoXl");
    const shippingDetailElement = document.getElementById('order-detail');

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
    a.download = 'ShippingDetail.xlsx';

    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Note: This approach assumes that the shipping details are in a table format inside the 'shipping-detail' element.

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
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countPendingOrders}</h4>
                    </div>
                    </div>
                  <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 40px"}}>
                   
                    <span onClick={downloadInfIntoXl}><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
                <div id="order-detail"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
                <GetOrdersXl filterOrders={pendingOrders}/>
            </div> 
              
                  </div>
                </div>
               
              

              </div>  
               <div className="col-md-3">
               
                <div className="card stat-card" style={{height:"152px"}}>
                <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                  <div className="card-body">
                    <h5 className="">Total On Hold Artwork Issue Orders</h5>
                    <h2 className="float-right">{totalonHoldArtworkIssuePBazCost} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countonHoldArtworkIssueOrders}</h4>
                    </div>
                    </div>
                  <div>
                  
                  </div>
                </div>
               
              

              </div>   <div className="col-md-3">
               
                <div className="card stat-card" style={{height:"152px"}}>
                <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                  <div className="card-body">
                    <h5 className="">Total On Hold Billing Issue Orders</h5>
                    <h2 className="float-right">{totalonHoldBillingIssuePBazCost} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countonHoldBillingIssueOrders}</h4>
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
                    <h5 className="">Total On Hold Out Of Stock Orders</h5>
                    <h2 className="float-right">{totalonHoldOutOfStockPBazCost} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countonHoldOutOfStockOrders}</h4>
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
                    <h5 className="">Total Approved Orders</h5>
                    <h2 className="float-right">{totalapprovedPBazCost} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countapprovedOrders}</h4>
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
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countconfirmedOrders}</h4>
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
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countinProductionOrders}</h4>
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
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countoutForDeliveryOrders}</h4>
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
                    <h5 className="">Total Delivered Orders</h5>
                    <h2 className="float-right">{totaldeliveredPBazCost} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countdeliveredOrders}</h4>
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
                    <h5 className="">Total Payment Released Orders</h5>
                    <h2 className="float-right">{totalpaymentReleasedPBazCost} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countpaymentReleaseddOrders}</h4>
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
                    <h5 className="">Total Returned Orders</h5>
                    <h2 className="float-right">{totalreturnPBazCost} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countreturnOrders}</h4>
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
                    <h5 className="">Total Canceled Orders</h5>
                    <h2 className="float-right">{totalcancelPBazCost} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countcancelOrders}</h4>
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
                    <h5 className="">Total ODR</h5>
                    <h2 className="float-right">{TotalODR} TK</h2>
                    </div>
                
                  <div className="card-body" style={{display:"flex",justifyContent:"center"}}>
                   
                    <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countODROrders}</h4>
                    </div>
                    </div>
                  <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 40px"}}>
                   
                    <span onClick={downloadInfIntoXl}><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
                <div id="order-detail"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
                <GetOrdersXl 
                filterOutFOrDelivOrders1={outForDeliveryOrders}
                filterDelivOrders2={deliveredOrders}
                filterReturnedOrders3={returnOrders}
/>
            </div> 
              
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


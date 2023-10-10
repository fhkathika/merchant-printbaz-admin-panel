import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../authProvider/AuthProvider';
import Navigationbar from '../navigationBar/Navigationbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Don't forget to import the CSS.
import { Button } from 'bootstrap';
import GetMercahntOrderXl from '../GetMercahntOrderXl';
import * as XLSX from 'xlsx';
const PaymentHistory = (props) => {
    const {adminUser}=useContext(AuthContext);
    const { merchantId } = useParams();
    const [getDataById,setGetDataById]=useState()
    const [filterByEmail,setFilterByEmail]=useState('')
    const [filterByPaidBy,setFilterByPaidBy]=useState()
    const [startDate,setStartDate]=useState(null);
    const [endDate,setEndDate]=useState(null);
    const handleChangeStartDate=(date)=>{
        console.log('Start date changed:', date);
        setStartDate(date)
       
      }
      const handleChangeEndDate=(date)=>{
        setEndDate(date)
       
      }
      const merchPaymentDetail=getDataById?.payments
?.filter(merchant =>merchant._id === merchantId )

      const downloadInfIntoXl = (event) => {
        const dynmamicId = event.currentTarget.dataset.orderId;
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
      console.log("startDate",startDate);
      console.log("endDate",endDate);
    useEffect(()=>{
        const getUserById=async()=>{
                 // Fetch the updated order details
        // await fetch(`https://mserver.printbaz.com/getUser/${merchantId}`)
        await fetch(`http://localhost:5000/getUser/${merchantId}`)
        .then(res=>res.json())
        .then(data => {setGetDataById(data)})
          
        
             }
             getUserById()
            },[getDataById])
            console.log("getDataById",getDataById?.payments);
            const handleInputChange = (event) => {
                const { id, value } = event.target;
                switch (id) {
                  case 'byEmail-filter':
                    setFilterByEmail(value);
                    break;
               
                  // ...other cases
                  default:
                    break;
                }
                
              };
              console.log("filterByEmail",filterByEmail);
              function parseStatusDate(statusDate) {
                // Replace 'at' with ',' to unify the format
                const cleanedStatusDate = statusDate.replace(' at ', ', ');
              
                // Try to parse it into a JavaScript Date object
                const parsedDate = new Date(cleanedStatusDate);
              
                // Check if the date is valid
                if (isNaN(parsedDate)) {
                  console.error("Invalid date format");
                  return null;
                }
              
                return parsedDate;
              }
              
              const applyFilters = () => {
               return getDataById?.payments.filter((payment) => {
                  
                  // console.log("order from applyFilters",order?.trackingId);
                 
                  if (filterByEmail && !payment.paymentReleasedBy.includes(filterByEmail)) {
                    return false;
            
                  } 
                 
                  if (payment && payment?.paymentReleasedDate) {
                    const formattedStatusDate = payment.paymentReleasedDate;
                console.log("formattedStatusDate",formattedStatusDate);
                    // Check if formattedStatusDate is not an empty string
                    if (formattedStatusDate.trim() === '') {
                      console.error("statusDate is empty.");
                      return false;
                    }
                
                    const userDate = parseStatusDate(formattedStatusDate);
                    if (!userDate) return false;
                // 
                    // console.log("User Date:", userDate); // Debugging line
                
                    if (startDate && endDate) {
                      // Both start and end dates are selected
                      const start = new Date(startDate);
                      const end = new Date(endDate);
                      end.setHours(23, 59, 59, 999); // Set to end of the day
                      
                      // console.log("Start and End Dates:", start, end); // Debugging line
                
                      if (userDate < start || userDate > end) return false;
                
                    } else if (startDate) {
                      // Only start date is selected
                      const start = new Date(startDate);
                      start.setHours(0, 0, 0, 0); // Set to start of the day
                
                      // console.log("Start Date:", start); // Debugging line
                
                      if (userDate < start) return false;
                
                    } else if (endDate) {
                      // Only end date is selected
                      const end = new Date(endDate);
                      end.setHours(23, 59, 59, 999); // Set to end of the day
                
                      // console.log("End Date:", end); // Debugging line
                
                      if (userDate > end) return false;
                    }
                
                    return true;  // Return true if none of the conditions to return false are met
                
                  }
               return true;
                });
              };
              const paymentHistoryMap=applyFilters()
              console.log("paymentHistoryMap",paymentHistoryMap);
    return (
        <div >
            <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n.status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #4caf50;\n    color: #fff !important;\n    font-weight: bold;\n    border: none;\n}\n\n\n.sales_report {\n    margin: 50px;\n}\n\n.seals_report_title h1{\n    margin-bottom: 50px;\n    font-weight: 600;\n}\n\n#cardbox1 {\n    -moz-box-shadow: 0 0 5px #888;\n    -webkit-box-shadow: 0 0 5px #888;\n    box-shadow: 0 0 5px #888;\n    color: #e4e5e7;\n    cursor: pointer;\n    background-color: #001846;\n    height: 130px;\n    margin-bottom: 25px;\n    border-radius: 4px;\n}\n\n.statistic-box {\n    padding: 25px;\n}\n\n.pull-right {\n    font-size: 22px !important;\n}\n\n.statistic-box h3 {\n    margin-top: 5px;\n    font-weight: 600;\n    font-size: 22px;\n}\n\n/* Total Number Of Tee Shirts Sold */\n\n.lobipanel {\n    background: white;\n    padding: 25px;\n    margin-top: 25px;\n    margin-bottom: 25px;\n    box-shadow: 0 0 5px #88888850;\n    border-radius: 4px;\n}\n\n.panel-title{\n    padding-bottom: 15px;\n    border-bottom: #001846 1px solid;\n}\n\n.panel-title h4{\n    font-size: 25px;\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n.panel-button button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 48%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n}\n\n.panel-button button:hover {\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n}\n\n#overlay {\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: #999;\n    width: 100%;\n    height: 100%;\n    opacity: 0.5;\n    z-index: 100;\n  }\n  #popup {\n    display: none;\n    position: absolute;\n    top: 25%;\n    background: #fff;\n    width: 90%;\n    height: 35%;\n    z-index: 200;\n    border-radius: 15px;\n  }\n  #popupclose {\n    float: right;\n    font-weight: 700;\n    font-size: 20px;\n    padding: 10px;\n    cursor: pointer;\n  }\n  .popupcontent {\n    padding: 10px;\n  }\n  #button {\n    cursor: pointer;\n  }\n\n  /* popup box */\n\n  .popupcontent {\n    padding: 40px;\n  }\n\n  .popup-title-01 {\n    margin-bottom: 50px;\n  }\n\n  .popup-title-01 h2{\n    font-size: 30px;\n    font-weight: 600;\n    color: #001846;\n    text-transform: uppercase;\n    position: relative;\n    text-align: center;\n  }\n\n  .popup-title-01 h2::before{\n        content: \"\";\n        display: block;\n        width: 100%;\n        height: 3px;\n        background: #001846;\n        left: 0;\n        top: 100%;\n        position: absolute;\n  }\n\n   .popup-title-02 h3{\n    font-size: 20px;\n    font-weight: 600;\n  }\n\n  .popup-title-03 h4{\n    font-size: 18px;\n    margin-bottom: 20px;\n  }\n\n  .popupcontent input{\n    width: 100px;\n  }\n\n   .popupcontent button{\n    margin-top: 20px;\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 100%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .popupcontent button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n\n    .panel-button-tr input {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 32%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .panel-button-tr button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 32%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n   .panel-button-tr button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n    " }} />
             
       <Navigationbar/>
 
           <div  className="row col-lg-12 col-sm-12   mr-3"style={{display:"flex",marginLeft:"150px",marginTop:"70px"}}>
          <div style={{marginBottom:"30px"}}>
          <Link to={`/viewClient/${merchantId}`}  state={{getDataById}} style={{borderRadius:"5px",color:"#09224f",fontSize:"16px",marginBottom:"10px", display: 'inline-block'}}>
    <img style={{width:"30px", height:"30px", verticalAlign: 'middle', display: 'inline-block'}} src="/images/left-arrow.png" alt="" />
    <h3 style={{display:"inline-block", textAlign:"center",fontWidth:"800", margin: "10px", verticalAlign: 'middle'}}>PAYMENT HISTORY</h3>
</Link>
          </div>
          
      

           <div className="col-lg-2 col-sm-12 ">
              <label htmlFor="byEmail-filter" className="form-label">Payment Released By:</label>
              <input type="text" id="byEmail-filter" value={filterByEmail} className="form-control" onChange={(e) =>  handleInputChange(e)} />
            </div> 
             <div className="col-lg-2 col-sm-12 ">
              <label htmlFor="byEmail-filter" className="form-label">Payment Released By:</label>
              <input type="text" id="byEmail-filter" value={filterByEmail} className="form-control" onChange={(e) =>  handleInputChange(e)} />
            </div> 
          
           
            <div className="col-lg-2 col-sm-12">
                  <label htmlFor="startDate" className="form-label">Start Date</label>

            <DatePicker className='form-control' value={startDate} selected={startDate} onChange={handleChangeStartDate} selectsStart startDate={startDate} endDate={endDate} />
                
                  </div>   
                   <div className="col-lg-2 col-sm-12">
               
                 
                  <label style={{textAlign:"start"}} htmlFor="endDate" className="form-label">End Date</label>
                  <DatePicker className='form-control' selected={endDate} value={endDate} onChange={handleChangeEndDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
                  </div>
           
           </div>
            
                
          
       
      
        <div className="row input-bar-01">
              <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10 m-auto">
                <div className="lobipanel">
                  
                  <div className="panel-body">
                  <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px ",marginBottom:"10px"}}>
                  
                  <span style={{cursor:"pointer",border:"1px solid #dad5d5",padding:"5px",borderRadius:"4px"}} onClick={downloadInfIntoXl} data-order-id="view-order-detail"><img style={{width:"30px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
              <div id="view-order-detail"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
              <GetMercahntOrderXl merchOrders={[merchPaymentDetail]}/>
          </div> 
            
                </div>
                    <table className="table">
                      <thead>
                        <tr>
                        <th style={{padding:"5px",textAlign:"center"}}>Payment Released Date</th>
<th style={{padding:"5px",textAlign:"center"}}>Released Amount</th>
<th style={{padding:"5px",textAlign:"center"}}>Payment Released By</th>
                        </tr>
                      </thead>
                      <tbody>

 

                      {
   paymentHistoryMap?.map((payData, index) => {
      
       return (
           <tr className="info">
               <td style={{textAlign:"center"}}>{payData?.paymentReleasedDate}</td>
               <td style={{textAlign:"center"}}>{payData?.paymentReleasedAmount}</td>
               <td style={{textAlign:"center"}}>{payData?.paymentReleasedBy}</td>
               
           </tr>
       );
   })
   
}


                      </tbody>
                    </table>
                  </div>
                
                
                
                </div>
              </div>
            </div>
       
        </div>
    );
};

export default PaymentHistory;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetDeliveryList from '../../hooks/useGetDeliveryList';
import useGetMongoData from '../../hooks/useGetMongoData';
import useGetRcvList from '../../hooks/useGetRcvList';
import AddDeliveryList from '../alert/AddDeliveryList';
import AddRecevedList from '../alert/AddRecevedList';
import OrderUpdateAlert from '../alert/OrderUpdateAlert';
import Navigationbar from '../navigationBar/Navigationbar';

const DeliverySystem = () => {
  const {orderAll}=useGetMongoData()
  const {deliveryAll}=useGetDeliveryList()
  const {rcvAll}=useGetRcvList()
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertRecvAmount, setShowAlertRecvAmount] = useState(false);
  const totalCollectAmount = deliveryAll?.reduce((acc, curr) => acc +parseFloat (curr.collectAmount || 0), 0);
  const totalDeliveryAmount = deliveryAll?.reduce((acc, curr) => acc + parseFloat(curr.deliveryFee || 0), 0);
  const totalCollectAmountByCourier = deliveryAll?.reduce((acc, curr) => acc + parseFloat(curr.cashCollectNyCourier || 0), 0);
 
  const totalReturnAmount = deliveryAll?.reduce((acc, curr) => acc + parseFloat(curr.returnValue || 0), 0);

  //  calculate the total sum of printbazRcv
const totalPrintbazRcv = deliveryAll?.reduce((acc, list) => {
  let amount = 0;
  if (list?.orderStatus === "returned") {
      amount = 0 - (list?.deliveryFeeForAdmin);
  } else {
      amount = (list?.collectAmount) - (list?.deliveryFeeForAdmin);
  }
  return acc + amount;
}, 0); 

// First, calculate the total sum of received amount
const totalRcvAmount = rcvAll?.slice(0, 4).reduce((acc, rcvAmount) => {
  return Number(acc + (rcvAmount?.receievedAmount || 0));
}, 0);

const totalReceivable= deliveryAll?.reduce((acc, list) => {
  if (list?.searchByOrderId?.paymentStatus === "paid") {
      // Skip this value and continue with the accumulation
      return acc;
  }

  let amount = 0;
  if (list?.orderStatus === "returned") {
      amount = 0 - (list?.deliveryFeeForAdmin);
  } else {
      amount = (list?.collectAmount) - (list?.deliveryFeeForAdmin);
  }

  return acc + amount;
}, 0);
console.log("totalRcvAmount",totalRcvAmount);
  const [startDate,setStartDate]=useState(null);
  // const [findOrderById, setFindOrderById] = useState();
    // const [searchByOrderId, setSearchByOrderId] = useState();
    const[ collectAmount,setCollectAmount]=useState()
const navigate=useNavigate()
    console.log("deliveryAll",deliveryAll);
    let searchByOrderId
    const handleInputOrderId = (e, idx) => {
      const newRows = [...rows];
      newRows[idx].orderId = e.target.value;
      console.log(" newRows[idx].orderId", newRows[idx].orderId);
      const order = orderAll?.find(order => order?._id?.includes(newRows[idx].orderId));
      console.log("orders from d system pop up",order);
      newRows[idx].searchByOrderId = order || {};
      setRows(newRows);
    }  
      const handleEmailChange = (e, idx) => {
      const newRows = [...rows];
      newRows[idx].deliveryFeeForAdmin = e.target.value;
      console.log(" newRows[idx].deliveryFeeForAdmin", newRows[idx].deliveryFeeForAdmin);
 
    }
    
 
   
  const returnValue=Number(searchByOrderId?.printbazcost)+Number(searchByOrderId?.deliveryFee)
  const handleInputColAmount = (e, idx) => {
    const newRows = [...rows];
    newRows[idx].cashCollectNyCourier = e.target.value;
    setRows(newRows);
  }
  const handleReturnValue = (e, idx) => {
    const newRows = [...rows];
    
    // Here, e.target.value represents the updated value of the returnAmount input field.
    newRows[idx].returnAmount = e.target.value;
    
    setRows(newRows);
  }
  
  
  const [rows, setRows] = useState([
    { statusDate: '', orderId:'', collectAmount: '', deliveryFeeForAdmin: '', orderStatus: '', cashCollectNyCourier:collectAmount, returnValue:0 }
  ]);
  console.log("searchByOrderId sdfsf",rows);
  // useEffect(() => {
  //   const order = orderAll?.find(order => order?._id?.includes(findOrderById));
  //   setSearchByOrderId(order);
  // }, [findOrderById]);

//  orderAll?.forEach(total=>
//   totalCollectAmount=+total?.collectAmount
  
//     )
const handleAddDeliveryPopUp=()=>{
  console.log("click delivery system popup",showAlert);
  setShowAlert(true)
}
const handleAddReceiePopUp=()=>{

  setShowAlertRecvAmount(true)
}
const handleChangeStartDate = (date, idx) => {
  // Copy the current rows array
  const newRows = [...rows];
  
  // Update the date property of the relevant row
  newRows[idx].date = date;
  
  // Update the rows state with the new array
  setRows(newRows);
}

// const handleInputOrderId=(e, index)=>{
//   const value=e.target.value
//   console.log("order Id",value);
//   setFindOrderById(value)
// }



// const filerByOrderDate = orderAll.filter(order => {
//   const date = new Date(order?.createdAt);
//   const orderDate = date;
  
//    if (startDate) {
//     // return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
//     const start = new Date(startDate);
//     // const end = new Date(endDate);
//     // end.setDate(end.getDate() + 1); // Adjust the end date to the next day
//     return orderDate >= start ;
//   } 
//   //  else if (startDate && !endDate) {
//   //   const start = new Date(startDate);
//   //   const end = new Date(startDate);
//   //   end.setDate(end.getDate() + 1); // Set the end date to the next day
//   //   return orderDate >= start && orderDate < end;
//   // }

//   return false;
// });

const gotoAllDeliveries=()=>{
  navigate("/alldeliveries")
}
const gotoAllRcvAmount=()=>{
  navigate("/allRcvMoney")
}
    return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n.status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #4caf50;\n    color: #fff !important;\n    font-weight: bold;\n    border: none;\n}\n\n\n.sales_report {\n    margin: 50px;\n}\n\n.seals_report_title h1{\n    margin-bottom: 50px;\n    font-weight: 600;\n}\n\n#cardbox1 {\n    -moz-box-shadow: 0 0 5px #888;\n    -webkit-box-shadow: 0 0 5px #888;\n    box-shadow: 0 0 5px #888;\n    color: #e4e5e7;\n    cursor: pointer;\n    background-color: #001846;\n    height: 130px;\n    margin-bottom: 25px;\n    border-radius: 4px;\n}\n\n.statistic-box {\n    padding: 25px;\n}\n\n.pull-right {\n    font-size: 22px !important;\n}\n\n.statistic-box h3 {\n    margin-top: 5px;\n    font-weight: 600;\n    font-size: 22px;\n}\n\n/* Total Number Of Tee Shirts Sold */\n\n.lobipanel {\n    background: white;\n    padding: 25px;\n    margin-top: 25px;\n    margin-bottom: 25px;\n    box-shadow: 0 0 5px #88888850;\n    border-radius: 4px;\n}\n\n.panel-title{\n    padding-bottom: 15px;\n    border-bottom: #001846 1px solid;\n}\n\n.panel-title h4{\n    font-size: 25px;\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n.panel-button button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 48%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n}\n\n.panel-button button:hover {\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n}\n\n#overlay {\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: #999;\n    width: 100%;\n    height: 100%;\n    opacity: 0.5;\n    z-index: 100;\n  }\n  #popup {\n    display: none;\n    position: absolute;\n    top: 25%;\n    background: #fff;\n    width: 90%;\n    height: 35%;\n    z-index: 200;\n    border-radius: 15px;\n  }\n  #popupclose {\n    float: right;\n    font-weight: 700;\n    font-size: 20px;\n    padding: 10px;\n    cursor: pointer;\n  }\n  .popupcontent {\n    padding: 10px;\n  }\n  #button {\n    cursor: pointer;\n  }\n\n  /* popup box */\n\n  .popupcontent {\n    padding: 40px;\n  }\n\n  .popup-title-01 {\n    margin-bottom: 50px;\n  }\n\n  .popup-title-01 h2{\n    font-size: 30px;\n    font-weight: 600;\n    color: #001846;\n    text-transform: uppercase;\n    position: relative;\n    text-align: center;\n  }\n\n  .popup-title-01 h2::before{\n        content: \"\";\n        display: block;\n        width: 100%;\n        height: 3px;\n        background: #001846;\n        left: 0;\n        top: 100%;\n        position: absolute;\n  }\n\n   .popup-title-02 h3{\n    font-size: 20px;\n    font-weight: 600;\n  }\n\n  .popup-title-03 h4{\n    font-size: 18px;\n    margin-bottom: 20px;\n  }\n\n  .popupcontent input{\n    width: 100px;\n  }\n\n   .popupcontent button{\n    margin-top: 20px;\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 100%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .popupcontent button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n\n    .panel-button-tr input {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 32%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .panel-button-tr button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 32%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n   .panel-button-tr button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n    " }} />
         <Navigationbar/>
          <section className="sales_report">
            <div className="row">
              <div className="col-12">
                <div className="seals_report_title">
                  <h1>Delivery Report</h1>
                </div>
              </div>
            </div>
            <div className="row non-input-bar-01">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3>Amount Receivable</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">{totalReceivable}</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row input-bar-01">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Delivery List</h4>
                  </div>
                  <div className="panel-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Order ID</th>
                          <th>Cash Collection Amount</th>
                          <th>Delivery Assign To</th>
                          <th>Delivery Fee</th>
                          <th>Delivery Status</th>
                          <th>Printbaz Receivable</th>
                          <th>Payment Status</th>
                          <th>Return Value</th>
                        </tr>
                      </thead>
                      <tbody>
                     
                      {
   deliveryAll?.slice(0,5).map((list, index) => {
       let date = new Date(list?.date); 
       let options = { year: 'numeric', month: 'long', day: 'numeric' }; 
       let formattedDate = date.toLocaleDateString('en-US', options); 
       let printbazRcv=0
       if(list?.orderStatus==="returned"){
         printbazRcv=0-(list?.deliveryFeeForAdmin)
       }
       else{
        printbazRcv=(list?.collectAmount)-(list?.deliveryFeeForAdmin)
       }
    
    
       return (
           <tr className="info">
               <td>{list?.searchByOrderId?.statusDate}</td>
              <td><a href={`/viewOrder/${list?.orderId}`} target="_blank" rel="noreferrer">{list?.orderId}</a>
              </td>
               <td>{list?.collectAmount} TK</td>
               <td>{list?.searchByOrderId?.deliveryAssignTo}</td>
               <td>{list?.deliveryFeeForAdmin}TK</td>
               <td><p className="status-btn">{list?.orderStatus}</p></td>
               <td>{printbazRcv} TK</td>
               <td > <p className="status-btn" > {list?.searchByOrderId?.paymentStatus}</p> </td>
               <td style={{color:"red"}}>{list?.returnValue} TK</td>
           </tr>
       );
   })
   
}


                        <tr className="info">
                          <td style={{fontWeight: 700}}>Total</td>
                          <td style={{fontWeight: 700}} />
                          <td style={{fontWeight: 700}}>{totalCollectAmount} TK</td>
                          <td style={{fontWeight: 700}} />
                          <td style={{fontWeight: 700}}>{totalDeliveryAmount} TK</td>
                          <td style={{fontWeight: 700}} />
                          <td style={{fontWeight: 700}}>{totalPrintbazRcv} TK</td>
                          <td style={{fontWeight: 700}} />
                          <td style={{fontWeight: 700}}>{totalReturnAmount} TK</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="panel-button">
                    <button id="button" onClick={handleAddDeliveryPopUp}>Add Delivery</button>
                    <button onClick={gotoAllDeliveries} style={{float: 'right'}}>View More</button>
                  </div>
                
                
                
                </div>
              </div>
            </div>
            {/* <div className="row input-bar-01">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Received List</h4>
                  </div>
                  <div className="panel-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Order Id</th>
                          <th>Received Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          rcvAll?.slice(0,4).map(rcvAmount=>{
                            let date = new Date(rcvAmount?.date); 
                            let options = { year: 'numeric', month: 'long', day: 'numeric' }; 
                            let formattedDate = date.toLocaleDateString('en-US', options); 
                     
                            return(
                              <tr className="info">
                              <td>{formattedDate}</td>
                              <td>{rcvAmount?._id}</td>
                              <td>{rcvAmount?.receievedAmount} TK</td>
                            </tr>
                            )
                          }
                           
                            )
                        }

<tr className="info">
                          <td style={{fontWeight: 700}}>Total</td>
                          <td style={{fontWeight: 700}} />
                           <td style={{fontWeight: 700}}>{totalRcvAmount} TK</td>
                        </tr>
                       
                      </tbody>
                    </table>
                  </div>
                  <div className="panel-button">
                    <button id="button" onClick={handleAddReceiePopUp}>Add Received Payment List</button>
                    <button style={{float: 'right'}} onClick={gotoAllRcvAmount}>View More</button>
                  </div>
                
                </div>
              </div>
            </div> */}
            {showAlert===true && (
          
          <AddDeliveryList
          rows={rows}
          // returnValue={returnValue}
          setRows={setRows}
          collectAmount={collectAmount}
          setCollectAmount={setCollectAmount}
          handleInputColAmount={handleInputColAmount}
          handleReturnValue={handleReturnValue}
          searchByOrderId={searchByOrderId}
          handleInputOrderId={handleInputOrderId}
          handleEmailChange={handleEmailChange}
          handleChangeStartDate={handleChangeStartDate}
          showAlert={showAlert}
          startDate={startDate}
          message="Your delivery list has been updated successfully."
          onClose={() => setShowAlert(false)}
       
          
          
          />
          
          
          )
          
          
          } 
            {showAlertRecvAmount===true && (
          
          <AddRecevedList
       
          // returnValue={returnValue}
         
          searchByOrderId={searchByOrderId}
         
          showAlertRecvAmount={showAlertRecvAmount}
          startDate={startDate}
          message="Your receieved list has been updated successfully."
          onClose={() => setShowAlertRecvAmount(false)}
       
          
          
          />
          
          
          )
          
          
          }
          </section>
        </div>
      );
    
};

export default DeliverySystem;


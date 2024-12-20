import React, { useRef, useState } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import useGetMongoData from "../../hooks/useGetMongoData";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AlertMessage from "./AlertMessage";
import DeliveryListAddedAlert from "./DeliveryListAddedAlert";
import useGetDeliveryList from "../../hooks/useGetDeliveryList";
const AddDeliveryList = ({ deliveryExist,showAlert,onClose,startDate,returnValue,handleReturnValue,handleInputColAmount,collectAmount,setCollectAmount,setRows,rows,handleChangeStartDate,handleInputOrderId,ordersDetail,searchByOrderId,handleEmailChange}) => {
  const {deliveryAll}=useGetDeliveryList()
  const [exitIdAlert, setExitIdAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [delSuccessAlert, setDelSuccessAlert] = useState(false);

  const target = useRef(null);
  if (!showAlert) return null;
 console.log(("rows",rows));
// const addField = () => {
//   setRows([...rows, { date: '', orderId: "", collectAmount: "", deliveryFee: "", orderStatus: "", cashCollectNyCourier: "", returnValue: "" }]);
// };

const addField = () => {
  setRows(prevRows => [...prevRows,{returnValue:Number(searchByOrderId?.printbazcost)+Number(searchByOrderId?.deliveryFee)}]);
};

// remove field
const removeField = (indexToRemove) => {
  setRows(prevRows => prevRows.filter((_, index) => index !== indexToRemove));
};
console.log("ordersDetail",ordersDetail);

const handleSubmitDeliveryList = (e) => {
  e.preventDefault();
  
  if(deliveryExist==="deliveryId exists"){
    setExitIdAlert(true)
    return
  }
  // Optional: Data Validation before sending
  // if (!isValid(rows)) {
  //   alert('Invalid data');
  //   return;
  // }
  
  // Set a loading state if you have one.
  // setLoading(true);

  // fetch('http://localhost:5000/submitDeliveryList', {
  fetch('https://mserver.printbaz.com/submitDeliveryList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rows)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Server responded with a ${response.status} status.`);
    }
    setDelSuccessAlert(true)
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Optionally provide feedback to user
    // alert('Data submitted successfully!');
  })
  .catch(error => {
    console.error('Error:', error);
    // Optionally provide feedback to user
    // alert('An error occurred.');
  })
  .finally(() => {
    // Clear loading state if you have one.
    // setLoading(false);
  });
};


  return (
      <div>
 <div className="alert-overlay" >
      <div className="alert-box-delivery-list" >
     
                    <div >
                      <span id="popupclose" onClick={onClose}>X</span>
                    </div>
                    <form onSubmit={handleSubmitDeliveryList}>
                    <div className="popupcontent">
                      <div className="row ">
                        <div className="">
                          <div className="">
                            <h2>Delivery List Update</h2>
                            <hr />
                          </div>
                         
                        </div>
                      </div>
                      <div className="row mb-3">

                        <div className="col-lg-11" style={{display:"flex",alignItem:"left"}}>
                       
                        </div> 
                        <div className="col-lg-1" style={{display:"flex",alignItem:"left"}}>
                        <Button onClick={addField} className="addButtonStyle" style={{color:"black",fontSize:"20px"}}>+</Button  >
                        </div>
                   
                      </div>
                      
                      <div className="row">
                        <div className="col-2">
                          <div className="popup-title-02">
                            <p >Date</p>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="popup-title-02">
                            <p >Order ID</p>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="popup-title-02">
                            <p >Cash Collection Amount
                            </p>
                          </div>
                        </div>
                        <div className="col-1">
                          <div className="popup-title-02">
                            <p >Delivery Fee</p>
                          </div>
                        </div>
                         <div className="col-1">
                          <div className="popup-title-02">
                            <p >Paymnet Status</p>
                          </div>
                        </div>
                        <div className="col-1">
                          <div className="popup-title-02">
                            <p >Assign To</p>
                          </div>
                        </div>
                        <div className="col-1">
                          <div className="popup-title-02">
                            <p >Delivery Status</p>
                          </div>
                        </div>
                       
                        <div className="col-2" >
                          <div className="popup-title-02" >
                            <p>Returned Value</p>
                          </div>
                        </div>
                      </div>
                      {
                        rows?.map((row,index)=>{ 
                       console.log("row?.searchByOrderId?.statusDate", row)
                    let returnAmount=Number(row?.searchByOrderId?.printbazcost)+Number(row?.searchByOrderId?.deliveryFee)
                  row.collectAmount=row?.searchByOrderId?.collectAmount
                  row.orderStatus=row?.searchByOrderId?.orderStatus
                  row.deliveryFee=row?.searchByOrderId?.deliveryFee
                    if ( row?.searchByOrderId?.orderStatus === "returned") {
                    row.returnValue=returnAmount
                  }
                  else{
                    row.returnValue=0
                  }
                    
                          const copyOrderId = (index) => {
                            // Copy collectAmount into cashCollectNyCourier of the specific row
                            const newRows = [...rows];
                            newRows[index].cashCollectNyCourier = rows[index].searchByOrderId?.collectAmount || "";
                            setRows(newRows);
                          
                            // Show a tooltip or some other indicator to signify that the copy was successful
                            setShow(true);
                            setTimeout(() => {
                              setShow(false);
                            }, 1000);
                          };
                          
                          return( 
                          <div className="row">
                          {/* <div className="col-lg-1 col-sm-12" >
                            
                          <DatePicker
            selected={row?.date}
            onChange={(date) => handleChangeStartDate(date, index)}
          />
                          </div> */}
                          <div className="col-2">
                            <input type="text"  required id={`statusDate-${index}`} style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px',textAlign:"center"}} value={row?.searchByOrderId?.statusDate} readOnly />
                          </div>
                          <div className="col-2">
                          <input type="text" required id={`orderId-${index}`} style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} className="form-control" value={row?.orderId}  onChange={(e) =>  handleInputOrderId(e,index)} />
                          </div>
                          <div className="col-2">
                            <input type="text" required id={`colectAmount-${index}`} style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px',textAlign:"center"}} value={row?.searchByOrderId?.collectAmount}   readOnly/>
                          </div>
                          <div className="col-1">
                            <input type="text" required id={`deliveryFeeForAdmin-${index}`} style={{width:"auto",border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px',textAlign:"center"}} value={row?.deliveryFeeForAdmin} onChange={(e) =>  handleEmailChange(e,index)} />
                          </div> 
                           <div className="col-1">
                            <input type="text" required id={`paymnetStatus-${index}`} style={{width:"auto",border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px',textAlign:"center",backgroundColor: '#4caf50',color:"#fff"}} value={row?.searchByOrderId?.paymentStatus} onChange={(e) =>  handleEmailChange(e,index)} />
                          </div>
                          <div className="col-1" style={{color:'1px solid red'}}>
                          <input type="text" required id={`deliveryAssignTo-${index}`} style={{marginTop: '0px', padding: '10px 10px', borderRadius: '5px', backgroundColor: '#4caf50', color: '#fff', fontWeight: 'bold', border: 'none'}} value={row?.searchByOrderId?.deliveryAssignTo} readOnly />
                          
                          </div>
                          <div className="col-1">
                          <input type="text" required id={`orderStatus-${index}`} style={{marginTop: '0px', padding: '10px 10px', borderRadius: '5px', backgroundColor: '#4caf50', color: '#fff', fontWeight: 'bold', border: 'none'}} value={row?.searchByOrderId?.orderStatus} readOnly />
                          
                          </div>
                         
                          
                            
   
                        <div className="col-2">
                        {
  row?.searchByOrderId?.orderStatus === "returned" ?
  <input 
    type="text"  
    id={`returnValue-${index}`}   
    onChange={(e) => { 
      console.log("Inline e.target.value", e.target.value);
      handleReturnValue(e, index);
    }}
    required 
    style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px', textAlign: "center", color: "red"}}  
    value={returnAmount}
  />
  :
  <input 
    type="text" 
    id={`returnValue-${index}`} 
    onChange={(e) => handleReturnValue(e, index)} 
    required 
    style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px', textAlign: "center", color: "red"}} 
    value="0"  
  />
}

                          </div>
                        </div>
                        )})
                      }
                     
                      <div className="row">
                        <div className="col-12">
                          <button style={{marginTop: '30px'}} type="submit">Submit</button>
                        </div>
                      </div>
                      {
                        exitIdAlert &&
                        <span style={{color:'red'}}>Tracking id already exist</span>
                      }
                    </div>
                    </form>
                  
         
                 
      </div>
        {
             delSuccessAlert===true &&
<DeliveryListAddedAlert
message="Delivery List added Successfully" 
setDelSuccessAlert={setDelSuccessAlert}
delSuccessAlert={delSuccessAlert}
onClose={onClose}

/>
           }    
    </div>
      </div>
   
  );
};

export default AddDeliveryList;
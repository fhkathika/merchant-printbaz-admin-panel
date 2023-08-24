

import React, { useRef, useState } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import useGetMongoData from "../../hooks/useGetMongoData";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AlertMessage from "./AlertMessage";
import DeliveryListAddedAlert from "./DeliveryListAddedAlert";
const AddRecevedList = ({ showAlertRecvAmount,onClose}) => {
    const [rows, setRows] = useState([
        { date: '', orderId: "", receievedAmount: "" }
      ]);
  const [show, setShow] = useState(false);
  const [rcvSuccessAlert, setRcvSuccessAlert] = useState(false);

  const target = useRef(null);
  if (!showAlertRecvAmount) return null;
 console.log(("rows",rows));
const addField = () => {
  setRows([...rows, { date: '', orderId: "", receievedAmount: ""}]);
};
const handleInputOrderIdForRevAmm = (e, idx) => {
    const newRows = [...rows];
    newRows[idx].orderId = e.target.value;
 
    setRows(newRows);
  } 
  const handleInpuRcvAmount = (e, idx) => {
    const newRows = [...rows];
    newRows[idx].receievedAmount = e.target.value;
    setRows(newRows);
  }
  const handleChangeRcvDate = (date, idx) => {
    // Copy the current rows array
    const newRows = [...rows];
    
    // Update the date property of the relevant row
    newRows[idx].date = date;
    
    // Update the rows state with the new array
    setRows(newRows);
  }
  
// const addField = () => {
//   setRows(prevRows => [...prevRows,{returnValue:Number(searchByOrderId?.printbazcost)+Number(searchByOrderId?.deliveryFee)}]);
// };

// remove field
const removeField = (indexToRemove) => {
  setRows(prevRows => prevRows.filter((_, index) => index !== indexToRemove));
};


const handleSubmitDeliveryList = (e) => {
  e.preventDefault();
  console.log("rows from receieve payment",rows);
  // Optional: Data Validation before sending
  // if (!isValid(rows)) {
  //   alert('Invalid data');
  //   return;
  // }
  
  // Set a loading state if you have one.
  // setLoading(true);

  fetch('http://localhost:5000/submitRecvedList', {
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
    setRcvSuccessAlert(true)
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
                            <h2>Receieved List Update</h2>
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
                        <div className="col-3">
                          <div className="popup-title-02">
                            <p >Date</p>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="popup-title-02">
                            <p >Order ID</p>
                          </div>
                        </div>
                       <div className="col-3">
                          <div className="popup-title-02">
                            <p >Receieved Amount</p>
                          </div>
                        </div> 
                      </div>
                      {
                        rows?.map((row,index)=>{ 
                      return( 
                          <div className="row">
                <div className="col-lg-3 col-sm-12"  >
               
              <DatePicker style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} className='form-control'  selected={row?.date}
            onChange={(date) => handleChangeRcvDate(date, index)} />
            </div>
                          {/* <div className="col-lg-3 col-sm-12" >
                            
                          <DatePicker
            selected={row?.date}
            onChange={(date) => handleChangeStartDate(date, index)}
          />
                          </div> */}
                        
                          <div className="col-3">
                          <input type="text" required id={`orderId-${index}`} style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} className="form-control" value={row?.orderId}  onChange={(e) =>  handleInputOrderIdForRevAmm(e,index)} />
                          </div>
                        
                         
                            
                          <div className="col-3">
  
      
        <input 
          type="number" 
          id={`cashCollectNyCourier-${index}`} 
          required  
          value={rows[index].cashCollectNyCourier} 
          onChange={(e) => handleInpuRcvAmount(e, index)} 
          style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px', textAlign: "center"}} 
        />
       
      
  
</div>
  </div>
                        )})
                      }
                     
                      <div className="row">
                        <div className="col-12">
                          <button style={{marginTop: '30px'}} type="submit">Submit</button>
                        </div>
                      </div>
                    </div>
                    </form>
                  
         
                 
      </div>
        {
             rcvSuccessAlert===true &&
<DeliveryListAddedAlert
message="Receieved List added Successfully" 
setDelSuccessAlert={setRcvSuccessAlert} ///to prevent error  setDelSuccessAlert varaiable as name is passed only
delSuccessAlert={rcvSuccessAlert}
onClose={onClose}

/>
           }    
    </div>
      </div>
   
  );
};

export default AddRecevedList;
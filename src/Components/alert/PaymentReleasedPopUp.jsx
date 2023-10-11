
import React, { useContext, useRef, useState } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import useGetMongoData from "../../hooks/useGetMongoData";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AlertMessage from "./AlertMessage";
import DeliveryListAddedAlert from "./DeliveryListAddedAlert";
import useGetDeliveryList from "../../hooks/useGetDeliveryList";
import { AuthContext } from "../../authProvider/AuthProvider";
const PaymentReleasedPopUp = ({ 
    paymentReleasedPopUp,
setPaymentReleasedPopUp,
    dueAmount,
    merchantsId,
    totalReturnAmmountBase,
    totalBill,
    totalReceiveBase,
    onClose}) => {
  const {adminUser}=useContext(AuthContext);
  const [delSuccessAlert, setDelSuccessAlert] = useState(false);
  const [inputValue, setInputValue] = useState('');
  if (!paymentReleasedPopUp) return null;

// Create a new date object for the current date and time
const now = new Date();

// Define month names for formatting
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Extract required components
const month = monthNames[now.getMonth()];
const day = now.getDate();
const year = now.getFullYear();
const hours = now.getHours();
const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes(); // add a zero prefix if minutes is less than 10
const ampm = hours >= 12 ? 'PM' : 'AM';

// Convert 24-hour time format to 12-hour format
const hours12 = hours % 12 || 12;

// Format the date
const formattedCurrentDate = `${month} ${day}, ${year} at ${hours12}:${minutes} ${ampm}`;

console.log(formattedCurrentDate); // Outputs something like: "September 6, 2023 at 12:23 PM"

  // Handler for input changes
  const handleInputChange = (event) => {
      setInputValue(event.target.value);
  }

  
  const handlePayReleased = (e) => {
    e.preventDefault();
  
    // Create the repeated data structure
    const paymentData = {
      totalReturnAmmountBase: totalReturnAmmountBase,
      totalBill: totalBill,
      totalReceiveBase: totalReceiveBase,
      paymentReleasedAmount: inputValue,
      paymentReleasedBy: adminUser?.email,
      paymentReleasedDate:formattedCurrentDate
    };
  
    // Construct the data you want to send
    const dataToSend = {
      dueAmountNow: dueAmount-inputValue,
      payments: [paymentData]

    };
  
    // fetch(`http://localhost:5000/updateUserbyReleasedPay/${merchantsId}`, {
    fetch(`https://mserver.printbaz.com/updateUserbyReleasedPay/${merchantsId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server responded with a ${response.status} status.`);
      }
      setDelSuccessAlert(true);
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
  return (
      <div>
 <div className="alert-overlay" >
      <div className="alert-box-delivery-list" >
     
                    <div >
                    
                    </div>
                    <form onSubmit={handlePayReleased}>
                    <div className="row ">
                        <div id="container" style={{position:"relative"}}>
    <h2>Payment Released</h2>
    <span id="popupclose" style={{position:"absolute",top:0,right:0,padding:"10px",cursor:"pointer"}} onClick={onClose}>X</span>
    <hr />
</div>

                      </div>
                      <div className="row mb-3">

                        <div className="col-lg-11" style={{display:"flex",alignItem:"left"}}>
                        <table className="table">
        <thead>
          <tr>
            
            <th>Due Amount Now</th>
            <th>Payment Released Amount</th>
          </tr>
        </thead>
        <tbody>
                <tr className="info">
                    <td style={{padding:"5px",textAlign:"center",borderRadius:"5px"}}>{dueAmount}</td>
                    <td style={{padding:"5px",textAlign:"center",borderRadius:"5px"}}>
                        {/* 2. Assign state variable to value prop, 3. Assign onChange handler */}
                        <input type="number" min="0" value={inputValue} onChange={handleInputChange} />
                    </td>
                </tr>
            </tbody>
      </table>
                        </div> 
                     
                   
                      </div>
                    
                      <div className="row mb-3">

<div className="col-lg-11" style={{display:"flex",alignItem:"left"}}>

</div> 


</div>
                  
                       <div className="row">
                        <div className="col-12">
                        <Button style={{width:"20%",marginTop: '30px',backgroundColor:"#0b0e32",border:"none"}} type="submit">Submit</Button>
                        </div>
                      </div>
                  
                    </form>
                 
      </div>
        {
             delSuccessAlert===true &&
<DeliveryListAddedAlert
message="Damaged Tshirt List added Successfully" 
setDelSuccessAlert={setDelSuccessAlert}
delSuccessAlert={delSuccessAlert}
onClose={onClose}

/>
           }    
    </div>
      </div>
   
  );
};

export default PaymentReleasedPopUp;
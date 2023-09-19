
import React, { useRef, useState } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import useGetMongoData from "../../hooks/useGetMongoData";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AlertMessage from "./AlertMessage";
import DeliveryListAddedAlert from "./DeliveryListAddedAlert";
import useGetDeliveryList from "../../hooks/useGetDeliveryList";
const AddTshirtPurchased = ({ showAlert,onClose,setTshirtDetail,tShirtDetail,fetchData}) => {
       
  const [exitIdAlert, setExitIdAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [delSuccessAlert, setDelSuccessAlert] = useState(false);

  if (!showAlert) return null;
  const updateField=(e,field,index)=>{
const value=e.target.value;
//make a copy of theexisting array
const updated=[...tShirtDetail]
  // If the object doesn't exist at that index, create it
  if (!updated[index]) {
    updated[index] = {};
  }
  // Update the specific field in the object at the given index
  updated[index][field] = value;

  // Update the state
  setTshirtDetail(updated);
  }

  let totalcostOfTshirt
const handleSubmitDeliveryList = (e) => {
  e.preventDefault();
  console.log("tShirtDetail",tShirtDetail);

  // Set a loading state if you have one.
  // setLoading(true);

  // fetch('http://localhost:5000/addPurchasedTshirt', {
  fetch('https://mserver.printbaz.com/addPurchasedTshirt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tShirtDetail)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Server responded with a ${response.status} status.`);
    }
    setDelSuccessAlert(true)
      // Reset tShirtDetail to initial state here
 
    return response.json();
    
  })
  .then(data => {
    console.log(data);
    fetchData()
    // Optionally provide feedback to user
    // alert('Data submitted successfully!');
  })
  .catch(error => {
    console.error('Error:', error);
 
  })
  .finally(() => {
    // setTshirtDetail( {
    //   tshirtColor:"",
    //   sizeM:"",
    //   sizeL:"",
    //   sizeXL:"",
    //   sizeXXL:"",
    //   sizeS:"",
    //   perpisCost:"",
    //   totalCost:"",
    //   date:""
      
    // })
  
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
                    <div className="row ">
                        <div className="">
                          <div className="">
                            <h2>New Purchased T-Shirt</h2>
                            <hr />
                          </div>
                         
                        </div>
                      </div>
                      <div className="row mb-3">

                        <div className="col-lg-11" style={{display:"flex",alignItem:"left"}}>
                       
                        </div> 
                     
                   
                      </div>
                      
                      <div className="row">
                       
                        <div className="col-2">
                          <div className="popup-title-02">
                            <p >T-Shirt Color</p>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="popup-title-02">
                            <p >Total Cost
                            </p>
                          </div>
                        </div>
                        <div className="col-1">
                          <div className="popup-title-02">
                            <p >Size: S
                            </p>
                          </div>
                        </div> 
                       
                        <div className="col-1">
                          <div className="popup-title-02">
                            <p >Size: M</p>
                          </div>
                        </div>
                         <div className="col-1">
                          <div className="popup-title-02">
                            <p >Size: L</p>
                          </div>
                        </div>
                        <div className="col-1">
                          <div className="popup-title-02">
                            <p >Size: XL</p>
                          </div>
                        </div>
                        <div className="col-1">
                          <div className="popup-title-02">
                            <p >Size: XXL</p>
                          </div>
                        </div>
                         <div className="col-1">
                          <div className="popup-title-02">
                            <p >Per pcs</p>
                          </div>
                        </div>
                       
                        <div className="col-2">
                          <div className="popup-title-02">
                            <p >Date</p>
                          </div>
                        </div>
                      </div>
                      
                    {
                        tShirtDetail?.map((item,index)=>{
                          item.totalCost=item.perpisCost*(Number(item.sizeS)+Number(item.sizeM)+Number(item.sizeL)+Number(item.sizeXL)+Number(item.sizeXXL))
                          return(
<form onSubmit={handleSubmitDeliveryList}>
                    <div className="popupcontent">
                     <div className="row">
                          {/* <div className="col-lg-1 col-sm-12" >
                            
                          <DatePicker
            selected={row?.date}
            onChange={(date) => handleChangeStartDate(date, index)}
          />
                          </div> */}
                          <div className="col-2">
                          {/* <input
                          style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}}
          type="text"
         
          placeholder="T-Shirt Color"
        /> */}

<select id="status-filter" required style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}}  className="form-control"  value={item.tshirtColor || ""}
          onChange={(e) => updateField(e, "tshirtColor", index)}>
                  <option   value="" disabled>select color</option>
                  <option   value="black">Black</option>
                  <option value="white">White</option>
                  <option value="others">Others</option>
                 
                  
                </select>
                          </div>
                           <div className="col-2">
                          <input
                          style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}}
          type="number"
          value={item.totalCost|| ""}
          onChange={(e) => updateField(e, "totalCost", index)}
          placeholder="totalcost"
          min="0"
        />
                          </div> 
                           <div className="col-1">
                          <input
                          style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}}
          type="number"
          value="0"
          onChange={(e) => updateField(e, "sizeS", index)}
          placeholder="Size-S"
          min="0"
        />
                          </div>
                          
                           <div className="col-1">
                          <input
                          style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}}
          type="number"
          value={item.sizeM || ""}
          onChange={(e) => updateField(e, "sizeM", index)}
          placeholder="Size-M"
          min="0"
        />
                          </div> <div className="col-1">
                          <input
                          style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}}
          type="number"
          value={item.sizeL || ""}
          onChange={(e) => updateField(e, "sizeL", index)}
          placeholder="Size-L"
          min="0"
        />
                          </div> <div className="col-1">
                          <input
                          style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}}
          type="number"
          value={item.sizeXL || ""}
          onChange={(e) => updateField(e, "sizeXL", index)}
          placeholder="Size-XL"
          min="0"
        />
                          </div> 
                          <div className="col-1">
                          <input
                          style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}}
          type="number"
          value={item.sizeXXL || ""}
          onChange={(e) => updateField(e, "sizeXXL", index)}
          placeholder="Size-XXL"
          min="0"
        />
                          </div> 
                           <div className="col-1">
                          <input
                          style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}}
          type="number"
          value={item.perpisCost || ""}
          onChange={(e) => updateField(e, "perpisCost", index)}
          placeholder="per pis cost"
          min="0"
        />
                          </div> 
                          <div className="col-2">
                          <input
                          style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}}
          type="date"
          value={item.date || ""}
          onChange={(e) => updateField(e, "date", index)}
          placeholder="Purchase date"
          required
        />
                          </div>
                        
   
                        </div>
                       
                     
                      <div className="row">
                        <div className="col-12">
                          <button style={{marginTop: '30px'}} type="submit">Submit</button>
                        </div>
                      </div>
                 
                    </div>
                    </form>
                          )

                          })
                    }
                    
                  
         
                 
      </div>
        {
             delSuccessAlert===true &&
<DeliveryListAddedAlert
message="Purchased tshirt List added Successfully" 
setDelSuccessAlert={setDelSuccessAlert}
delSuccessAlert={delSuccessAlert}
onClose={onClose}

/>
           }    
    </div>
      </div>
   
  );
};

export default AddTshirtPurchased;
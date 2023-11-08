

import React, { useEffect, useRef, useState } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import useGetMongoData from "../../hooks/useGetMongoData";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AlertMessage from "./AlertMessage";
import DeliveryListAddedAlert from "./DeliveryListAddedAlert";
import useGetDeliveryList from "../../hooks/useGetDeliveryList";
const UpdatePriceAlert = ({ 
    getUpdateTshirtById,
    setTshirtDetail,
    tShirtDetail,
    updatepopUp,
    selectProductType,
    message,
    onClose}) => {
  const [exitIdAlert, setExitIdAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [delSuccessAlert, setDelSuccessAlert] = useState(false);
  console.log("getUpdateTshirtById",getUpdateTshirtById)
  useEffect(() => {
    setTshirtDetail({
        printSizeFront: getUpdateTshirtById?.printSizeFront ,
        frontSideprice: getUpdateTshirtById?.frontSideprice ,
        backSideprice: getUpdateTshirtById?.backSideprice ,
        
      
    });
}, [getUpdateTshirtById]);
// selectProductType==="Blank Round Neck" ||
// selectProductType==="Blank Drop Sholder" ||
// selectProductType==="Blank Hoodie" ?
console.log("tShirtDetail",tShirtDetail?.printSizeFront)
const handleInputChange = (event, index) => {
    const { name, value } = event.target;
   
        setTshirtDetail({ ...tShirtDetail, [name]: value });
        // setSum(formData.reduce((total, input) => total + Number(input.value), 0));
      
    } 
  if (!updatepopUp) return null;

  const updateField = (e, field) => {
    const updatedDetail = { ...tShirtDetail };
    updatedDetail[field] = e.target.value;


    setTshirtDetail(updatedDetail);
};

console.log("tshirtDetail",tShirtDetail);
  let totalcostOfTshirt
  const handleSubmitDeliveryList = (e) => {
    e.preventDefault();
    console.log("tShirtDetail", tShirtDetail);

    // Assuming you have the ID of the T-shirt you want to update
    const tShirtId = getUpdateTshirtById._id; 

    fetch(`https://mserver.printbaz.com/editCalcPriceTshirt/${tShirtId}`, {
    // fetch(`http://localhost:5000/editCalcPriceTshirt/${tShirtId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tShirtDetail)
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
     
        // Optionally provide feedback to user
        // alert('Data updated successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        // Any final code you want to run after the request finishes (like resetting state or clearing a loading spinner) goes here.
    });
};


  return (
      <div>
 <div className="alert-overlay" >
      <div className="alert-box-delivery-list" >
     
                    <div  style={{textAlign:"right",cursor:"pointer"}}>
                      <span id="popupclose"  onClick={onClose}>X</span>
                    </div>
                    <form onSubmit={handleSubmitDeliveryList}>
                    <div className="row ">
                        <div className="">
                          <div className="">
                            <h2>Update Price</h2>
                            <hr />
                          </div>
                         
                        </div>
                      </div>
                      <div className="row mb-3">

<div className="col-lg-11" style={{display:"flex",alignItem:"left"}}>

</div> 

</div>
                      
                      
                     
                    <div className="popupcontent">
                      <div className="row">
                      <div className="col-lg-11" style={{display:"flex",alignItem:"left"}}>

</div>               

</div>
                    <div className="row">
            
      
       
 {
   (selectProductType==="Round Neck" ||
  selectProductType==="Drop Sholder" ||
   selectProductType==="Hoodie") &&
   <div className="col-4">
  <label className="mb-2">PrintSize (front)</label>
    <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="text" value={tShirtDetail?.printSizeFront || ""} readOnly />
  </div>
 }
 {
   (selectProductType==="Round Neck" ||
   selectProductType==="Drop Sholder" ||
    selectProductType==="Hoodie") ?
    <div className="col-4">
    <label className="mb-2">front side print cost</label>
      <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="text" value={tShirtDetail?.frontSideprice || ""} onChange={(e) => updateField(e, "frontSideprice")} placeholder="" min="0" />
    </div>
    :
    <div className="col-8 m-auto">
    <label className="mb-2"> print cost</label>
      <input style={{border: '1px solid #ececec', width: '100%',textAlign:"center", height: '50px', padding: '5px'}} type="text" value={tShirtDetail?.frontSideprice || ""} onChange={(e) => updateField(e, "frontSideprice")} placeholder="" min="0" />
    </div>
 }
  

{
     (selectProductType==="Round Neck" ||
     selectProductType==="Drop Sholder" ||
      selectProductType==="Hoodie") &&
      <div className="col-4">
      <label className="mb-2">DTF Price</label>
        <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="text" value={tShirtDetail?.backSideprice || ""} onChange={(e) => updateField(e, "backSideprice")} placeholder="" min="0" />
      </div>
}
 

  {/* <div className="col-3">
  <label className="mb-2">Additional Cost</label>
    <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="text" value={tShirtDetail?.additionalCost || ""} onChange={(e) => updateField(e, "additionalCost")} placeholder="" min="0" />
  </div> */}

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
message="Price updated Successfully" 
setDelSuccessAlert={setDelSuccessAlert}
delSuccessAlert={delSuccessAlert}
onClose={onClose}

/>
           }    
    </div>
      </div>
   
  );
};

export default UpdatePriceAlert;
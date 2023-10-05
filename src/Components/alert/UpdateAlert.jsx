
import React, { useEffect, useRef, useState } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import useGetMongoData from "../../hooks/useGetMongoData";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AlertMessage from "./AlertMessage";
import DeliveryListAddedAlert from "./DeliveryListAddedAlert";
import useGetDeliveryList from "../../hooks/useGetDeliveryList";
const UpdateAlert = ({ fetchData,
    getPurchaseTshirtById,
    setTshirtDetail,
    tShirtDetail,
    updatepopUp,
    message,
    onClose}) => {
       console.log("getPurchaseTshirtById from update ",getPurchaseTshirtById);
  const [exitIdAlert, setExitIdAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [delSuccessAlert, setDelSuccessAlert] = useState(false);
  useEffect(() => {
    setTshirtDetail({
        tshirtColor: getPurchaseTshirtById?.tshirtColor ,
        sizeM: getPurchaseTshirtById?.sizeM ,
        sizeL: getPurchaseTshirtById?.sizeL ,
        sizeXL: getPurchaseTshirtById?.sizeXL ,
        sizeXXL: getPurchaseTshirtById?.sizeXXL ,
        sizeS: getPurchaseTshirtById?.sizeS ,
        perpisCost: getPurchaseTshirtById?.perpisCost ,
        totalCost: getPurchaseTshirtById?.totalCost ,
        date: getPurchaseTshirtById?.date ,
        category: getPurchaseTshirtById?.category 
    });
}, [getPurchaseTshirtById]);


const handleInputChange = (event, index) => {
    const { name, value } = event.target;
   
        setTshirtDetail({ ...tShirtDetail, [name]: value });
        // setSum(formData.reduce((total, input) => total + Number(input.value), 0));
      
    } 
  if (!updatepopUp) return null;

  const updateField = (e, field) => {
    const updatedDetail = { ...tShirtDetail };
    updatedDetail[field] = e.target.value;

    // Always recalculate the total cost
    updatedDetail.totalCost = updatedDetail.perpisCost * 
        (Number(updatedDetail.sizeS || 0) + 
         Number(updatedDetail.sizeM || 0) + 
         Number(updatedDetail.sizeL || 0) + 
         Number(updatedDetail.sizeXL || 0) + 
         Number(updatedDetail.sizeXXL || 0));

    setTshirtDetail(updatedDetail);
};

console.log("tshirtDetail",tShirtDetail);
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
                    <form onSubmit={handleSubmitDeliveryList}>
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
                      
                      
                     
                    <div className="popupcontent">
                      <div className="row">
                      <div className="col-lg-11" style={{display:"flex",alignItem:"left"}}>

</div>               

</div>
                    <div className="row">
            
                    <div className="col-1">
                    <label className="mb-2">Date</label>
                    <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="date" value={tShirtDetail?.date } onChange={(e) => updateField(e, "date")} placeholder="Purchase date" required />
  </div>
                    <div className="col-2">
                      <label className="mb-2">Product Category</label>
    <select id="status-filter" required style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} className="form-control" value={tShirtDetail?.category || ""} onChange={(e) => updateField(e, "category")}>
      <option value="" disabled>select product type</option>
      <option value="Round Neck">Round Neck</option>
      <option value="Drop Sholder">Drop Sholder</option>
      <option value="Hoodie">Hoodie</option>
    </select>
  </div>
  <div className="col-2">
  <label className="mb-2">Color</label>
    <select id="status-filter" required style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} className="form-control" value={tShirtDetail?.tshirtColor || ""} onChange={(e) => updateField(e, "tshirtColor")}>
      <option value="" disabled>select color</option>
      {
        (tShirtDetail?.category === "Round Neck" || tShirtDetail?.category==="Drop Sholder")&&
        <>
           <option value="black">Black</option>
        <option value="white">White</option>
        <option value="maroon">Maroon</option>
        <option value="green">Green</option>
        </>
     
      }
      {
        tShirtDetail?.category === "Hoodie" &&
        <>
           <option value="black">Black</option>
        <option value="gray">Gray</option>
        <option value="navy blue">Navy Blue</option>
        <option value="green">Green</option>
        <option value="green">Red</option>
        </>
     
      }
   
    </select>
  </div>

 
  <div className="col-1">
  <label className="mb-2">Size: S</label>
    <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="number" value={tShirtDetail?.sizeS || ""} onChange={(e) => updateField(e, "sizeS")} placeholder="Size-S" min="0" />
  </div>

  <div className="col-1">
  <label className="mb-2">Size: M</label>
    <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="number" value={tShirtDetail?.sizeM || ""} onChange={(e) => updateField(e, "sizeM")} placeholder="Size-M" min="0" />
  </div>

  <div className="col-1">
  <label className="mb-2">Size: L</label>
    <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="number" value={tShirtDetail?.sizeL || ""} onChange={(e) => updateField(e, "sizeL")} placeholder="Size-L" min="0" />
  </div>

  <div className="col-1">
  <label className="mb-2">Size: XL</label>
    <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="number" value={tShirtDetail?.sizeXL || ""} onChange={(e) => updateField(e, "sizeXL")} placeholder="Size-XL" min="0" />
  </div>

  <div className="col-1">
  <label className="mb-2">Size: XXL</label>
    <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="number" value={tShirtDetail?.sizeXXL || ""} onChange={(e) => updateField(e, "sizeXXL")} placeholder="Size-XXL" min="0" />
  </div>

  <div className="col-1">
  <label className="mb-2">Per pcs</label>
    <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} type="number" value={tShirtDetail?.perpisCost || ""} onChange={(e) => updateField(e, "perpisCost")} placeholder="per pis cost" min="0" />
  </div>
  <div className="col-1">
  <label className="mb-2">Total cost</label>
  <input style={{border: '1px solid #ececec', width: '100%', height: '50px', padding: '5px'}} 
       type="number" 
       value={tShirtDetail?.totalCost || 0}
       readOnly  // This makes the input read-only
       placeholder="totalcost" />

  </div>
  <div className="row mb-3">

<div className="col-lg-11" style={{display:"flex",alignItem:"left"}}>

</div> 


</div>
 

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

export default UpdateAlert;
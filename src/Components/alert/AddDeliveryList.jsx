

import React from "react";
import { Button } from "react-bootstrap";
import useGetMongoData from "../../hooks/useGetMongoData";

const AddDeliveryList = ({ showAlert,onClose,orderAll}) => {
  if (!showAlert) return null;

  return (
      <div >
 <div className="alert-overlay" >
      <div className="alert-box-delivery-list" >
     
                    <div >
                      <span id="popupclose" onClick={onClose}>X</span>
                    </div>
                    <div className="popupcontent">
                      <div className="row">
                        <div className="col-12">
                          <div className="popup-title-01">
                            <h2>Delivery List Update</h2>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-1">
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
                        <div className="col-2">
                          <div className="popup-title-02">
                            <p >Delivery Fee</p>
                          </div>
                        </div>
                        <div className="col-1">
                          <div className="popup-title-02">
                            <p >Delivery Status</p>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="popup-title-02">
                            <p >Cash Collected by the courier</p>
                          </div>
                        </div>  <div className="col-1">
                          <div className="popup-title-02">
                            <p >Returned Value</p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-1">
                          <input type="date" required style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px'}} />
                        </div>
                        <div className="col-2">
                          <input type="text" required style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px'}} />
                        </div>
                        <div className="col-2">
                          <input type="text" required style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px'}} />
                        </div>
                        <div className="col-2">
                          <input type="text" required style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px'}} />
                        </div>
                        <div className="col-1">
                          <button style={{marginTop: '0px', padding: '10px 10px', borderRadius: '5px', backgroundColor: '#4caf50', color: '#fff !important', fontWeight: 'bold', border: 'none'}}>Delivery</button>
                        </div>
                        <div className="col-2">
                          <input type="text" required style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px'}} />
                        </div> <div className="col-1">
                          <input type="text" required style={{border: '1px solid #ececec', width: '75%', height: '50px', padding: '5px'}} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <button style={{marginTop: '30px'}}>Submit</button>
                        </div>
                      </div>
                    </div>
               
                 
      </div>
    </div>
      </div>
   
  );
};

export default AddDeliveryList;
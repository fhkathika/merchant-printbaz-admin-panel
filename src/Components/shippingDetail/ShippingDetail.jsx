import React from 'react';
import { useLocation } from "react-router-dom";

const ShippingDetail = ({getSpecificOrderById}) => {
    // const location = useLocation();
    // const viewOrder = location.state ? location?.state?.orderInfo : null;
  
    return (
        <div >
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* <a target="_blank" href="https://printbaz.com/">
                  <img src="https://media.discordapp.net/attachments/1069579536842379305/1103281899469811712/logo01.png?width=1440&height=392" style={{width: '10%', marginTop: '50px'}} alt="" />
                </a> */}
              </div>
              <div className="row" style={{marginTop: '50px'}}>
                <div className="col-6 invoice-to" style={{display: 'inline-block'}}>
                  <h2>Shipping Detail </h2>
                
                </div>
               
        
              </div>
            
            
            
              <div className="row" style={{marginTop: '50px', marginBottom: '30px', backgroundColor: 'aliceblue'}}>
            
                <div className="col-md-6 col-sm-12 mb-3">
                  
                  <strong>Name: <p>{getSpecificOrderById?.name}</p></strong>
                  <strong>Contact: <p>{getSpecificOrderById?.phone}</p></strong>
                  <strong>Address: <p>{getSpecificOrderById?.address}</p></strong>
                </div>
              
                <div className="col-md-6 col-sm-12 mb-3 mt-3">
                  <strong>Collect Amount</strong>
                  <p>{getSpecificOrderById?.collectAmount}tk</p>
                  <strong>Brand Name: <p>{getSpecificOrderById?.clientbrandName}</p></strong>
   
                  
                </div>
               
               
              </div>
          
            
            </div>
          </div>
        </div>
     );
    };
    
    export default ShippingDetail;
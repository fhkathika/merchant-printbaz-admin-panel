import React from 'react';
import { useLocation } from "react-router-dom";

const ShippingDetail = ({getSpecificOrderById}) => {
    // const location = useLocation();
    // const viewOrder = location.state ? location?.state?.orderInfo : null;
  // console.log("getSpecificOrderById",getSpecificOrderById?._id);
    return (
        <div >
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
          <div className="container">
            <div className="row">
              {/* <div className="col-12">
                <a target="_blank" href="https://printbaz.com/">
                  <img src="https://media.discordapp.net/attachments/1069579536842379305/1103281899469811712/logo01.png?width=1440&height=392" style={{width: '10%', marginTop: '50px'}} alt="" />
                </a>
              </div> */}
              <div className="row" style={{marginTop: '50px'}}>
                <div className='flex'>
                <div className='col-6'>
                <div className=" invoice-to" style={{display: 'inline-block'}}>
                  <h2>Shipping Detail </h2>
                
                </div>
               <div>
                 <h4>Order ID: <span>{getSpecificOrderById?._id}</span></h4>
                
               </div>

                </div>
                <div className=" invoice-to" style={{display: 'inline-block'}}>
                <h4>Tracking Id : <span>{getSpecificOrderById?.trackingId}</span></h4>
                
                </div>
                </div>
                
                
        
              </div>
            
            
            
              <div className="row" style={{marginTop: '50px', marginBottom: '30px', backgroundColor: 'aliceblue'}}>
            
                <div className="col-md-6 col-sm-12 mb-3">
                  
                  <p style={{fontWeight:"600",fontSize:"25px",marginTop:"15px"}}>Name: <span>{getSpecificOrderById?.name}</span></p>
                  <p style={{fontWeight:"600",fontSize:"25px"}}>Contact: <span>{getSpecificOrderById?.phone}</span></p>
                  <p style={{fontWeight:"600",fontSize:"25px"}}>Address: <span>{getSpecificOrderById?.address}</span></p>
                </div>
              
                <div className="col-md-6 col-sm-12 mb-3 mt-3">
                  <p style={{fontWeight:"600",fontSize:"25px"}}>Collect Amount</p>

<p style={{fontWeight:"600",fontSize:"25px"}}>{ getSpecificOrderById?.paymentStatus==="paid" ? 0 : getSpecificOrderById?.collectAmount}tk</p>
                
                 
                  <p style={{fontWeight:"600",fontSize:"25px"}}>Brand Name: <span>{getSpecificOrderById?.clientbrandName}</span></p>
   
                  
                </div>
               
               
              </div>
          
            
            </div>
          </div>
        </div>
     );
    };
    
    export default ShippingDetail;
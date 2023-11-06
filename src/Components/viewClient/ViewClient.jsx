import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/style.css";
import useGetMongoData from "../../hooks/useGetMongoData";
import { useRoleAsignData } from "../../hooks/useRoleAsignData";
import Navigationbar from "../navigationBar/Navigationbar";
import SendUserApproveMail from "../sendUserApproveMail/SendUserApproveMail";
import * as XLSX from 'xlsx';
import GetMercahntOrderXl from "../GetMercahntOrderXl";
import useSingleMercahntorder from "../../hooks/useSingleMercahntorder";
import { AuthContext } from "../../authProvider/AuthProvider";
import { Button } from "react-bootstrap";
import PaymentReleasedPopUp from "../alert/PaymentReleasedPopUp";
import axios from "axios";
const ViewClient = () => {
  const { orderAll } = useGetMongoData();
  const { merchantOrder } = useSingleMercahntorder();
  const location = useLocation();
  const viewClient = location.state ? location?.state?.merchants :location.state ? location?.state?.getDataById : null;
  const [getUserById, setGetUserById] = useState();
  const [paymentReleasedPopUp, setPaymentReleasedPopUp] = useState(false);
  const {value_count}=useRoleAsignData()
  const {adminUser}=useContext(AuthContext);
  const navigate=useNavigate()

  // console.log("getUserById",getUserById);
  const [registeredInfo,setRegisteredInfo]=useState({
      _id: adminUser?._id,
      name: adminUser?.name,
      fbPageLink: adminUser?.fbPageLink,
      fbAccount:adminUser?.fbAccount,
      phone: adminUser?.phone,
      whatsapp: adminUser?.whatsapp,
      address: adminUser?.address,
      email: adminUser?.email,
      password: adminUser?.password,
      businessDuration: adminUser?.businessDuration,
      brandName: adminUser?.brandName,
      bankName:adminUser?.bankName,
      accountName: adminUser?.accountName,
      accountNumber: adminUser?.accountNumber,
      routingNumber: adminUser?.routingNumber,
      branchName: adminUser?.branchName,
      bkashAccount: adminUser?.bkashAccount,
      nagadAccount:adminUser?.nagadAccount,
      rocketAccount:adminUser?.rocketAccount,
      brandLogo:adminUser?.brandLogo,
      brandLogoURL:adminUser?.brandLogoURL,
      approval: adminUser?.approval
    
  })

const downloadInfIntoXl = (event) => {
    const dynmamicId = event.currentTarget.dataset.orderId;
      const shippingDetailElement = document.getElementById(dynmamicId);
  
      // Assume the element contains a table. 
      // If not, you'll need to extract and format the data appropriately for Excel.
      const table = shippingDetailElement.querySelector('table');
  
      // Convert the table to a Workbook object
      const wb = XLSX.utils.table_to_book(table);
  
      // Write the workbook to a blob
      const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
  
      // Trigger a download
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'OrderList.xlsx';
  
      document.body.appendChild(a);
      a.click();
  
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
  }

  // merchant payment released 

//   const handleMerchPaymentReleasedInputChange = async (e) => {
  
//     try {
//           const response = await fetch(
//           //  `https://mserver.printbaz.com/updateMercahntPaymentRecvable/${adminUser?._id}`, {
//            `http://localhost:5000/updateMercahntPaymentRecvable/${adminUser?._id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             // body: JSON.stringify({
//             //     totalDues: totalDues,
//             //     paymentRelasedAmount: newDueAmount,
//             //     dueAmountNow: newDueAmountNow,
//             //     paymentReleasedBy: adminUser?.email,
//             //     paymentReleasedArr: [...rows, { date: new Date().toLocaleDateString(), dueAmountNow: newDueAmountNow }]
//             // }),
//         });

//         if (!response.ok) {
//             console.error('Status Error:', response);
//         }
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// };


  // Payment Released
   const orderStatusPaymentReleased=orderAll
  ?.filter(order => order.userMail === viewClient?.email && order.orderStatus==="payment-released" ) 
  //return amount
 
    const orderSatatusReturned=orderAll
  ?.filter(order =>order.userMail === viewClient?.email && order.orderStatus==="returned" )
  // console.log("orderStatus pament released",orderStatusPaymentReleased);


const merchOrders=orderAll
?.filter(order =>order.userMail === viewClient?.email  )



  const updateReturnedAmount = async (orderId, returnedAmount) => {
    try {
      const response = await fetch(
        `https://mserver.printbaz.com/returnOrderAddition/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ returnedAmount }),
        }
      );
  
      if (response.ok) {
        // Update the approval status in the viewClient object
        // You can update the state or do whatever you want here
      } else {
        console.error("Status Error:", response);
        // Handle error here
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error here
    }
  };
  
  let totalReceiveBase=0,totalReturnAmmountBase=0;
for(let i=0;i<orderStatusPaymentReleased?.length;i++){
  let totalReceive=Number(orderStatusPaymentReleased[i]?.recvMoney);
 
  totalReceiveBase =totalReceiveBase+totalReceive;
// console.log("totalReceiveBase",totalReceiveBase);
}
// for(let i=0;i<orderSatatusReturned?.length;i++){
//   let totalReturn=orderSatatusReturned[i]?.returnedAmount;
//   if(totalReturn){
//     totalReturnAmmountBase +=totalReturn;
//   }


// }
// Check if orderStatusReturned is an array before looping
let totalReturn=0;
let deliveryFee=0;
if (Array.isArray(orderSatatusReturned)) {
  for (let i = 0; i < orderSatatusReturned.length; i++) {
     totalReturn = Number(orderSatatusReturned[i]?.returnedAmount);
     deliveryFee = Number(orderSatatusReturned[i]?.deliveryFee);
    
    // If totalReturn and deliveryFee exist and are numbers, add them to totalReturnAmountBase
   
      totalReturnAmmountBase += (totalReturn + deliveryFee + deliveryFee/2);
    
  }
}
console.log("totalReturn",totalReturn)
console.log("deliveryFee",deliveryFee)
console.log("totalReturnAmmountBase",totalReturnAmmountBase)

// Now, totalReturnAmountBase contains the sum of all returnedAmounts and their associated deliveryFees


//patmnet status =paid,orderstatus :delivered
const PaymentStausPaid=orderAll
?.filter(order => order.userMail === viewClient?.email && order.paymentStatus==="paid" && order?.orderStatus==="delivered")
const returnValueFilter=orderAll?.filter(order =>  order.userMail === viewClient?.email&& order?.orderStatus==="returned")


let statusPaidbase=0; let totalpaid
for(let i=0;i<PaymentStausPaid?.length;i++){
   totalpaid=Number(PaymentStausPaid[i]?.recvMoney);
  statusPaidbase =Number(statusPaidbase)+totalpaid;
 
  // setTotalBill(totalBill+totalpaid);

}

// Calculate initial due amount
let dueAmount = Number(statusPaidbase - (totalReceiveBase + totalReturnAmmountBase));
console.log("getUserById",getUserById)
// Fetch the latest payment made by user
let lastPayementDetail = getUserById?.payments?.length > 0 ? 
                         getUserById.payments[getUserById.payments.length-1] : null;

// Calculate the grand due amount
let grandDueNow = dueAmount;

if (lastPayementDetail && lastPayementDetail.paymentReleasedAmount) {
    grandDueNow -= lastPayementDetail.totalReleasedAmount;
}

console.log("Initial dueAmount:", dueAmount);
console.log("Last payment amount:", lastPayementDetail?.paymentReleasedAmount || 0);
console.log("Grand Due Amount:", grandDueNow);


useEffect(()=>{
  const getOrderById=async()=>{
           // Fetch the updated order details
  await fetch(`https://mserver.printbaz.com/getUser/${viewClient?._id}`)
  // await fetch(`http://localhost:5000/getUser/${viewClient?._id}`)
  .then(res=>res.json())
  .then(data => {setGetUserById(data)})
    }
       getOrderById()
      },[getUserById])
   
   useEffect(() => {
    const getOrderByIdfromMerchant = async () => {
        // Ensure there's an ID before making a request
        console.log("totalBill test",statusPaidbase);
        console.log("dueAmount test",dueAmount);
        console.log("totalReceiveBase test",totalReceiveBase);
        console.log("totalReturnAmmountBase test",totalReturnAmmountBase);
        console.log("totalReturnAmmountBase test",totalReturnAmmountBase);
        if (viewClient?._id) {
            try {
          
                const response = await fetch(
                    `https://mserver.printbaz.com/updateBill/${viewClient._id}`,
                    // `http://localhost:5000/updateBill/${viewClient._id}`,
                    {
                      method: "PUT",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ 
                          totalBill: statusPaidbase, 
                          totalReceiveBase: totalReceiveBase,
                          totalReturnAmmountBase: totalReturnAmmountBase,
                          dueAmount:  grandDueNow 
                      }),
                  }
                );
  
                const data = await response.json();
                if (response.status === 200) {
                    // Handle success, for instance:
                    console.log("Total bill updated successfully:", data);
                } else {
                    // Handle error
                    console.error("Error updating the bill:", data.message);
                }
  
            } catch (error) {
                console.error("Network or server error:", error);
            }
        }
    };
  
    getOrderByIdfromMerchant();
  
  }, [viewClient?._id,statusPaidbase, totalReceiveBase, totalReturnAmmountBase, dueAmount]);
  
  

  const handleInputChange = async (e) => {
    const status = e.target.value; // the new status
    // status === "request" && setApprovalRequest("request");
    // status === "ban" && setApprovalRequest("ban");
    // status === "approved" && setApprovalRequest("approved");
 
    //  await fetch('https://mserver.printbaz.com/update-approval/${viewClient?._id') //for main site

    //   await fetch(`http://localhost:5000/update-approval/${viewClient?._id}`, { //for testing site
    try {
      const response = await fetch(
        `https://mserver.printbaz.com/update-approval/${viewClient?._id}`,
        // `http://localhost:5000/update-approval/${viewClient?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ approval: status }),
        }
      );
  
      if (response.ok) {
        // Update the approval status in the viewClient object
        viewClient.approval = status;
  
        SendUserApproveMail({email:viewClient?.email,requestStatus:viewClient?.approval})
        // Update your state or perform any other necessary operations with the updated viewClient object
      } else {
        console.error("Error:", response.status);
        // Handle error here
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };
  const getViewClientColor = (status) => {
    if (status === "request") {
      return "#ff6f00";
    }
    if (status === "approved") {
      return "green";
    } 
    if (status === "ban") {
      return "red";
    }
    // you can add more conditions here or just return a default color
    return "defaultColor";
  };
const handleDoPaymentPopUp=()=>{
  setPaymentReleasedPopUp(true)
}
const handlePaymentHistory=()=>{
  const merchantId = viewClient?._id;
  navigate(`/paymentHistory/${merchantId}`);
}
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />
      <title>Admin Dashboard</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        /* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        .view-client {\n            padding: 50px 100px 50px 100px;\n        }\n\n        .back-button {\n            text-align: right;\n            display: inline-block;\n        }\n\n        .back-button img {\n            width: 20%;\n        }\n\n        .view-client-title a {\n            font-weight: 700;\n            font-size: 30px;\n            text-decoration: none;\n            color: #000;\n        }\n\n        .client-details {\n            margin-top: 50px;\n            padding: 50px 0 50px 0;\n            border: 1px solid #ccc;\n            border-radius: 20px;\n            background-color: #ffffff;\n        }\n\n        .cd01 {\n            text-align: center;\n        }\n\n        .cd01 img {\n            width: 20%;\n            border-radius: 50%;\n        }\n\n        .cd01 h3 {\n            margin-top: 10px;\n            font-weight: 700;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n        }\n\n        .cd02 h3 {\n            font-weight: 700;\n            text-transform: uppercase;\n            margin-bottom: 20px;\n        }\n\n        .client-order-list {\n            margin-top: 50px;\n            padding: 50px;\n            border: 1px solid #ccc;\n            border-radius: 20px;\n            background-color: #ffffff;\n        }\n\n        .client-list {\n            cursor: pointer;\n            padding-top: 20px;\n        }\n\n        .client-list-title h4 {\n            text-transform: uppercase;\n            font-weight: bold;\n        }\n\n        .client-list p {\n            margin-bottom: 10px;\n        }\n\n        .client-list:hover {\n            background-color: aliceblue;\n            border-radius: 15px;\n            transition: linear 0.2s;\n        }\n\n        .p-status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #00aeff;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {}\n\n        @media screen and (max-width: 768px) {\n            .nav-link {\n                text-align: left;\n            }\n\n            .nav-link:hover {\n                width: 100%;\n\n            }\n\n            .view-client {\n                padding: 30px;\n            }\n\n        }\n\n    .red-btn{\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: red;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n        }\n\n",
        }}
      />
       <Navigationbar/>
      <div className="row">
        <div className="view-client">
          <div className="col-lg-12 col-sm-12">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="view-client-title">
                  <Link to="/allMerchants">
                    <span style={{ fontSize: "30px" }}>&lt; </span> View
                    Merchants Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="row m-2">
              <div className="col-lg-3 col-sm-12">
                <div className="client-details">
                  <div className="row">
                    <div className="col-lg-12 cd01">
                      <img
                        src={
                          viewClient?.brandLogo
                            ? viewClient?.brandLogo
                            : viewClient?.brandLogoURL
                        }
                        alt=""
                      />
                      <h3>{viewClient?.name}</h3>
                      <p>{viewClient?.createdAt?.slice(0,10)}</p>
                      <div
                        className="col-lg-12 col-sm-12"
                        style={{ marginBottom: "20px" }}
                      >
                        {
                          value_count?.merchant_approval ?
                          <select
                          id="status-filter"
                          className="status-btn"
                          style={{
                            border: "none",
                            padding: "8px",
                            backgroundColor: getViewClientColor(
                              viewClient?.approval
                            ),
                          }}
                          onChange={(e) => handleInputChange(e)}
                        >
                          <option value={viewClient?.approval}>
                            {viewClient?.approval=== "approved"&& "Approved" }
                            {viewClient?.approval=== "request"&& "Request" }
                            {viewClient?.approval=== "ban"&& "Ban" }
                          </option>
                          {viewClient?.approval === "approved" && (
                            <>
                              <option value="ban">Ban</option>
                              <option value="request">Request</option>
                            </>
                          )}
                          {viewClient?.approval === "request" && (
                            <>
                              <option value="approved">Approved</option>
                              <option value="ban">Ban</option>
                            </>
                          )}
                          {viewClient?.approval === "ban" && (
                            <>
                              <option value="approved">Approved</option>
                              <option value="request">Request</option>
                            </>
                          )}
                        </select>
                        :
                        <select
                        id="status-filter"
                        className="status-btn"
                        disabled
                        style={{
                          border: "none",
                          padding: "8px",
                          backgroundColor: getViewClientColor(
                            viewClient?.approval
                          ),
                        }}
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option value={viewClient?.approval}>
                          {viewClient?.approval=== "approved"&& "Approved" }
                          {viewClient?.approval=== "request"&& "Request" }
                          {viewClient?.approval=== "ban"&& "Ban" }
                        </option>
                        {viewClient?.approval === "approved" && (
                          <>
                            <option value="ban">Ban</option>
                            <option value="request">Request</option>
                          </>
                        )}
                        {viewClient?.approval === "request" && (
                          <>
                            <option value="approved">Approved</option>
                            <option value="ban">Ban</option>
                          </>
                        )}
                        {viewClient?.approval === "ban" && (
                          <>
                            <option value="approved">Approved</option>
                            <option value="request">Request</option>
                          </>
                        )}
                      </select>
                        }
                       
                      </div>

                      {/* <p className="status-btn">{viewClient?.approval}</p> */}
                    </div>
                    <div className="accordion" id="accordionExample">
                      {
                        value_count?.basicInformation &&
                        <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Basic Information
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <h5>Account ID</h5>
                            <p>{viewClient?._id}</p>
                            <h5>Email</h5>
                            <p>{viewClient?.email}</p>
                            <h5>Password</h5>
                            {viewClient?.password.length > 8 ? (
                              <p className="new-line">{viewClient?.password}</p>
                            ) : (
                              <p>{viewClient?.password}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      }
                      {
                        value_count?.personalInformation &&
<div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="true"
                            aria-controls="collapseTwo"
                          >
                            Personal Information
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <h5>Name</h5>
                            <p>{viewClient?.name}</p>
                            <h5>Phone Number</h5>
                            <p>{viewClient?.phone}</p>
                            <h5>Whatsapp Number</h5>
                            <p>{viewClient?.whatsapp}</p>
                            <h5>Facebook/Instagram Profile Link</h5>
                            <p>{viewClient?.fbAccount}</p>
                            <h5>Duration of Business</h5>
                            <p>{viewClient?.businessDuration}</p>
                            <h5>Address</h5>
                            <p>{viewClient?.address}</p>
                          </div>
                        </div>
                      </div>
                      }
                    {
                         value_count?.brandInformation &&
                         <div className="accordion-item">
                         <h2 className="accordion-header" id="headingThree">
                           <button
                             className="accordion-button collapsed"
                             type="button"
                             data-bs-toggle="collapse"
                             data-bs-target="#collapseThree"
                             aria-expanded="false"
                             aria-controls="collapseThree"
                           >
                             Brand Information
                           </button>
                         </h2>
                         <div
                           id="collapseThree"
                           className="accordion-collapse collapse"
                           aria-labelledby="headingThree"
                           data-bs-parent="#accordionExample"
                         >
                           <div className="accordion-body">
                             <h5>Brand Name</h5>
                             <p>{viewClient?.brandName}</p>
                             <h5>Facebook/Instagram Page Link</h5>
                             <p>{viewClient?.fbPageLink}</p>
                             <h5>Logo</h5>
                             <img
                               style={{ width: "50%" }}
                               src={
                                 viewClient?.brandLogo
                                   ? viewClient?.brandLogo
                                   : viewClient?.brandLogoURL
                               }
                               alt=""
                             />
                           </div>
                         </div>
                       </div>
                    }
                      {
                        value_count?.paymentInformation &&
                        <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFour">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                          >
                            Payment Information
                          </button>
                        </h2>
                        <div
                          id="collapseFour"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFour"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            {viewClient?.rocketAccount && (
                              <>
                                <h5>Rocket</h5>{" "}
                                <p>{viewClient?.rocketAccount}</p>
                              </>
                            )}
                            {viewClient?.bkashAccount && (
                              <>
                                <h5>Bkash</h5>
                                <p>{viewClient?.bkashAccount}</p>{" "}
                              </>
                            )}
                            {viewClient?.nagadAccount && (
                              <>
                                <h5>Nagad</h5> <p>{viewClient?.nagadAccount}</p>
                              </>
                            )}
                            {viewClient?.bankName && (
                              <table style={{ width: "100%" }}>
                                <tr>
                                  <th>bankName</th>
                                  <td>{viewClient?.bankName}</td>
                                </tr>
                                <tr>
                                  <th>accountName</th>
                                  <td>{viewClient?.accountName}</td>
                                </tr>
                                <tr>
                                  <th>branchName</th>
                                  <td>{viewClient?.branchName}</td>
                                </tr>
                                <tr>
                                  <th>accountNumber</th>
                                  <td>{viewClient?.accountNumber}</td>
                                </tr>
                                <tr>
                                  <th>routingNumber</th>
                                  <td>{viewClient?.routingNumber}</td>
                                </tr>
                              </table>
                            )}

                            {/* <p>01716964478</p> */}
                          </div>
                        </div>
                      </div>
                      }
                    
                    
                    </div>
                  </div>
                </div>
              
          
          <div className="bg-white p-4 shadow-sm mb-3 client-details">
                  <div className="row amu-title">
                    <div className="col-12">
                      <h3 className="all-title">Payments</h3>
                      <div className='flex'>
                      <h6>Total Payment Released:</h6>
                      <span style={{marginTop:"10px",color:"orange",fontSize:'16px'}}>{lastPayementDetail?.totalReleasedAmount?lastPayementDetail?.totalReleasedAmount:0} TK</span>
                      </div>
                      <div className='flex'>
                      <h6>Total Bill:</h6>
                      <span style={{marginTop:"10px",color:"orange",fontSize:'16px'}}>{parseInt(lastPayementDetail?.totalBill)} TK</span>
                      {/* <span style={{marginTop:"10px",color:"orange",fontSize:'16px'}}>{parseInt(getUserById?.totalBill?getUserById?.totalBill :statusPaidbase)} TK</span> */}
                      </div> 
                      <div className='flex'>
                      <h6>Return Value:</h6>
                      <span style={{marginTop:"10px",color:"orange",fontSize:'16px'}}> {Number(lastPayementDetail?.totalReturnAmmountBase)} TK</span>
                      </div> 
                      <div className='flex'>
                      
                      <h6>Due Amount:</h6>
                      <span style={{marginTop:"10px",color:"orange",fontSize:'16px'}}>{Math.floor(getUserById?.dueAmountNow)} TK</span>
                      </div>
                   
                      
                    </div>
                    <div className="flex mt-3">
                    {/* <Button onClick={handleDoPaymentPopUp} style={{width:"40%",backgroundColor:"orange",border:"none"}}>Pay</Button> */}
                      {
                        getUserById?.dueAmountNow<1000 || dueAmount<1000 ?
                        <Button onClick={handleDoPaymentPopUp} style={{width:"40%",backgroundColor:"gray",border:"none", cursor: "not-allowed"}} disabled>Pay</Button>
                        :
                        <Button onClick={handleDoPaymentPopUp} style={{width:"40%",backgroundColor:"orange",border:"none"}}>Pay</Button>
                      }
                  
                  <Button style={{width:"40%",backgroundColor:"#0c0c30",border:"none"}}  onClick={handlePaymentHistory}>Payment History</Button>
                {
                  paymentReleasedPopUp===true &&
                  <PaymentReleasedPopUp
                  paymentReleasedPopUp={paymentReleasedPopUp}
                  setPaymentReleasedPopUp={setPaymentReleasedPopUp}
                  dueAmount={grandDueNow}
                  mercahantDetail={getUserById}
                  totalReturnAmmountBase={totalReturnAmmountBase}
                  totalBill={statusPaidbase}
                  totalReceiveBase={totalReceiveBase}
                  merchantsId={viewClient?._id}
                  onClose={() => setPaymentReleasedPopUp(false)}
                  />
                }
                </div>
                  </div>
                </div>
              
              </div>
             
              <div className="col-lg-9 col-sm-12">
             
                {
                  value_count?.orderList &&
                  
                  <div className="client-order-list">
                     <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px ",marginBottom:"10px"}}>
                  
                  <span style={{cursor:"pointer",border:"1px solid #dad5d5",padding:"5px",borderRadius:"4px"}} onClick={downloadInfIntoXl} data-order-id="view-order-detail"><img style={{width:"30px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
              <div id="view-order-detail"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
              <GetMercahntOrderXl merchOrders={[merchOrders]}/>
          </div> 
            
                </div>
                  <div className="row" style={{ marginBottom: "30px" }}>
                    <div className="col-lg-2 col-sm-12">
                      <h4>Name</h4>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <h4>Order Id</h4>
                    </div>
                    <div className="col-lg-3 col-sm-12">
                      <h4>Recipient Info</h4>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <h4>Payment</h4>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <h4>Amount</h4>
                    </div>
                    <div className="col-lg-1 col-sm-12">
                      <h4>Status</h4>
                    </div>
                  </div>
                  {orderAll
                    ?.filter((order) => order.userMail === viewClient?.email)
                    ?.map((orderInfo, index) => {
     // You can conditionally update returnedAmount based on the orderStatus
     if (orderInfo?.orderStatus === "returned") {
      updateReturnedAmount(orderInfo._id, orderInfo.printbazcost, orderInfo.deliveryFee);
    }
     return(
                      <div className="row client-list">
                        <div className="col-lg-2 col-sm-12">
                          <p>{orderInfo?.name}</p>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          {orderInfo?._id.length > 8 && (
                            <p className="new-line">{orderInfo?._id}</p>
                          )}
                        </div>
                        <div className="col-lg-3 col-sm-12">
                          <p>{orderInfo?.address}</p>
                          <p>{orderInfo?.phone}</p>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          <p className="p-status-btn">
                            {orderInfo?.paymentStatus}
                          </p>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          <p>{Math.floor(orderInfo?.recvMoney)}TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="status-btn">{orderInfo?.orderStatus}</p>
                        </div>
                      </div>
                    )})}
                </div>
                }
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;

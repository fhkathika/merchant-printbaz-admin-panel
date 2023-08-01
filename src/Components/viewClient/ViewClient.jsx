import React, { useEffect, useState } from "react";
import { Form, Link, useLocation } from "react-router-dom";
import "../../css/style.css";
import useGetMongoData from "../../hooks/useGetMongoData";
import Navigationbar from "../navigationBar/Navigationbar";
import SendUserApproveMail from "../sendUserApproveMail/SendUserApproveMail";

const ViewClient = () => {
  const { orderAll } = useGetMongoData();
  const location = useLocation();
  const viewClient = location.state ? location?.state?.merchants : null;
  const [getUserById, setGetUserById] = useState();
  console.log("viewClient",viewClient);
useEffect(()=>{
  const getOrderById=async()=>{
           // Fetch the updated order details
  // await fetch(`https://mserver.printbaz.com/getUser/${viewClient?._id}`)
  await fetch(`http://localhost:5000/getUser/${viewClient?._id}`)
  .then(res=>res.json())
  .then(data => {setGetUserById(data)})
    
  
       }
       getOrderById()
      },[getUserById])

      console.log("getUserById",getUserById);
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
  
        console.log("Success:", viewClient);
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
            <div className="row">
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
                      </div>

                      {/* <p className="status-btn">{viewClient?.approval}</p> */}
                    </div>
                    <div className="accordion" id="accordionExample">
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-sm-12">
                <div className="client-order-list">
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
                    ?.map((orderInfo, index) => (
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
                          <p>{orderInfo?.recvMoney}TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="status-btn">{orderInfo?.orderStatus}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;

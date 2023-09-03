import React, { useState,useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TabForViewOrder from '../tabForViewOrder.jsx/TabForViewOrder';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Ticket from '../ticket/Ticket';
import SendOrderStatusMail from '../sendOrderStatusMail/SendOrderStatusMail';
import { Button } from 'react-bootstrap';
import UpdateOrder from '../updateOrder/UpdateOrder';
import Navigationbar from '../navigationBar/Navigationbar';
import { useParams } from "react-router-dom";
import ShippingDetail from '../shippingDetail/ShippingDetail';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useHistory } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { useRoleAsignData } from '../../hooks/useRoleAsignData';
import useGetMongoData from '../../hooks/useGetMongoData';
const ViewOrder = () => {
  let { id } = useParams();
  const {orderAll}=useGetMongoData()
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [exitIdAlert, setExitIdAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [getSpecificOrderById, setGetSpecificOrderById] = useState();
  const [trackingId, setTrackingId] = useState();
  const [fetchTrackingId, setFetchtrackingId] = useState();
  const viewOrder = location.state ? location?.state?.orders : null;
  const previousPathLocation = location.state ? location?.state?.previousPath : null;
  const viewClient = location.state?.matchingMerchant;
  const {value_count}=useRoleAsignData()
  const handleBack = () => {
    console.log("back btn");
    navigate(previousPathLocation); // Go back to the previous page
  };

  console.log("previousPathLocation",previousPathLocation);
  useEffect(()=>{
    const getOrderById=async()=>{
             // Fetch the updated order details
    await fetch(`https://mserver.printbaz.com/getorder/${id}`)
    // await fetch(`http://localhost:5000/getorder/${id}`)
    .then(res=>res.json())
    .then(data => {setGetSpecificOrderById(data)
      setOrderStatus(data.orderStatus);
      setPaymentStatus(data.paymentStatus);
      setDeliverAssign(data?.deliveryAssignTo);
      setFetchtrackingId(data?.trackingId);
    })
      
    
         }
         getOrderById()
          // Update the previousPath state when the location changes
 
        },[getSpecificOrderById])
      console.log("getSpecificOrderById",getSpecificOrderById);
  const [orderStatus, setOrderStatus] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const [deliverAssign, setDeliverAssign] = useState();
  const [updateOrder, setUpdateOrder] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  console.log("deliverAssign",deliverAssign);
  const returnValue=Number(getSpecificOrderById?.printbazcost)+Number(getSpecificOrderById?.deliveryFee)
  let date = new Date(getSpecificOrderById?.createdAt); // create a new Date object

  let options = {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'  }; // options for toLocaleDateString
  
  let formattedDate = date.toLocaleDateString('en-US', options); // use toLocaleDateString to format the date
  const handleInputTrackingID=(e)=>{
    
setTrackingId(e.target.value)
  }
 
 
  const handleInputChange = async (e) => {
    const status = e.target.value;
    try {
        const response = await fetch(
           `https://mserver.printbaz.com/updateOrderStatus/${id}`,{ 
      // `http://localhost:5000/updateOrderStatus/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderStatus: status }),
        });

        if (response.ok) {
            setOrderStatus(status);
            SendOrderStatusMail({
              status: status,
              _id: getSpecificOrderById?._id,
              userMail: getSpecificOrderById?.userMail 
            });

            // Check if the new status requires an update/addition to the DeliveryList
            if (['out for delivery', 'delivered', 'returned'].includes(status.toLowerCase())) {
                // Construct the deliveryList data based on the changed order
                const deliveryData = {
                    // add your delivery list data here,
                    orderId:getSpecificOrderById?._id,
                    statusDate:getSpecificOrderById?.statusDate,
                    collectAmount:getSpecificOrderById?.collectAmount,
                    trackingId:getSpecificOrderById?.trackingId,
                    recvMoney:getSpecificOrderById?.recvMoney,
                    printbazcost:getSpecificOrderById?.printbazcost,
                    orderStatus:status,
                    paymentStatus:getSpecificOrderById?.paymentStatus,
                    deliveryAssignTo:getSpecificOrderById?.deliveryAssignTo,
                    printBazRcvable:'',
                    returnValue:status==="returned"?returnValue:0,
                    deliveryFeeForAdmin:'',
                    deliveryFeeForClient:getSpecificOrderById?.deliveryFee

                };

                // Add/update the data in the DeliveryList
                const deliveryResponse = await fetch('https://mserver.printbaz.com/addOrUpdateDeliveryList', {
                  // const deliveryResponse = await fetch('http://localhost:5000/addOrUpdateDeliveryList', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(deliveryData),
                });

                if (!deliveryResponse.ok) {
                    console.error('Failed to update DeliveryList');
                }
            }
            else if (status.toLowerCase() === 'cancel') {
              // Delete the order from the delivery list
              const deleteResponse = await fetch(`https://mserver.printbaz.com/deleteFromDeliveryList/${id}`, {
              // const deleteResponse = await fetch(`http://localhost:5000/deleteFromDeliveryList/${id}`, {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json',
                  }
              });
              
              if (deleteResponse.ok) {
                  console.log('Successfully deleted from DeliveryList');
              } else {
                  console.error('Failed to delete from DeliveryList');
              }
          }
        } else {
            console.error('status Error:', response);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

  const handleInputPaymentChange = async (e) => {
    const status = e.target.value; // the new status
  // console.log("status",status);

    //   await fetch(`http://localhost:5000/update-approval/${viewClient?._id}`, { //for testing site
    try {
      const response = await fetch(
        
        `https://mserver.printbaz.com/updatePaymentStatus/${id}`,
      // `http://localhost:5000/updatePaymentStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentStatus: status }),
        }
      );
  
      if (response.ok) {
        // Update the approval status in the viewClient object
        setPaymentStatus(status);
        const deliveryData = {
          // add your delivery list data here,
          orderId:getSpecificOrderById?._id,
          statusDate:getSpecificOrderById?.statusDate,
          collectAmount:getSpecificOrderById?.collectAmount,
          trackingId:getSpecificOrderById?.trackingId,
          recvMoney:getSpecificOrderById?.recvMoney,
          printbazcost:getSpecificOrderById?.printbazcost,
          orderStatus:getSpecificOrderById?.orderStatus,
          paymentStatus:status,
          deliveryAssignTo:getSpecificOrderById?.deliveryAssignTo,
          printBazRcvable:'',
          returnValue:getSpecificOrderById?.orderStatus==="returned"?returnValue:0,
          deliveryFeeForAdmin:'',
          deliveryFeeForClient:getSpecificOrderById?.deliveryFee

      };
      if (['out for delivery', 'delivered', 'returned'].includes(getSpecificOrderById?.orderStatus.toLowerCase())) {
      // Add/update the data in the DeliveryList
      const deliveryResponse = await fetch('https://mserver.printbaz.com/addOrUpdateDeliveryList', {
        // const deliveryResponse = await fetch('http://localhost:5000/addOrUpdateDeliveryList', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(deliveryData),
      });

      if (!deliveryResponse.ok) {
          console.error('Failed to update DeliveryList');
      }
        // console.log("Success:", getSpecificOrderById);
        // Update your state or perform any other necessary operations with the updated viewClient object
    }
      } else {
        console.error("status Error:", response);
        // Handle error here
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error here
    }
  };
  const handleDeliverAssignChange = async (e) => {
    const status = e.target.value; // the new status
  console.log("status",status);

    //   await fetch(`http://localhost:5000/update-approval/${viewClient?._id}`, { //for testing site
    try {
      const response = await fetch(
        
        `https://mserver.printbaz.com/deliveryAssignTo/${id}`,
      // `http://localhost:5000/deliveryAssignTo/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deliveryAssignTo: status }),
        }
      );
  
      if (response.ok) {
        // Update the approval status in the viewClient object
        setDeliverAssign(status);
        const deliveryData = {
          // add your delivery list data here,
          orderId:getSpecificOrderById?._id,
          statusDate:getSpecificOrderById?.statusDate,
          collectAmount:getSpecificOrderById?.collectAmount,
          trackingId:getSpecificOrderById?.trackingId,
          recvMoney:getSpecificOrderById?.recvMoney,
          printbazcost:getSpecificOrderById?.printbazcost,
          orderStatus:getSpecificOrderById?.orderStatus,
          paymentStatus:getSpecificOrderById?.paymentStatus,
          deliveryAssignTo:status,
          printBazRcvable:'',
          returnValue:getSpecificOrderById?.orderStatus==="returned"?returnValue:0,
          deliveryFeeForAdmin:'',
          deliveryFeeForClient:getSpecificOrderById?.deliveryFee

      };
      if (['out for delivery', 'delivered', 'returned'].includes(getSpecificOrderById?.orderStatus.toLowerCase())) {
      // Add/update the data in the DeliveryList
      const deliveryResponse = await fetch('https://mserver.printbaz.com/addOrUpdateDeliveryList', {
        // const deliveryResponse = await fetch('http://localhost:5000/addOrUpdateDeliveryList', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(deliveryData),
      });

      if (!deliveryResponse.ok) {
          console.error('Failed to update DeliveryList');
      }
        // console.log("Success:", getSpecificOrderById);
        // Update your state or perform any other necessary operations with the updated viewClient object
    }
      } else {
        console.error("status Error:", response);
        // Handle error here
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error here
    }
  };
  const handleTrackingIdSubmit=async(e)=>{
    e.preventDefault()
   const existTrackingId= orderAll.find(order => order.trackingId === trackingId);
   if(existTrackingId){
     setExitIdAlert(true)
     return
   }
    try {
      const response = await fetch(
        
        `https://mserver.printbaz.com/addTrackingID/${id}`,
      // `http://localhost:5000/addTrackingID/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ trackingId: trackingId }),
        }
      );
  
      if (response.ok) {
        // Update the approval status in the viewClient object
        setTrackingId(trackingId);
        setShowAlert(true)
        const deliveryData = {
          // add your delivery list data here,
          orderId:getSpecificOrderById?._id,
          statusDate:getSpecificOrderById?.statusDate,
          collectAmount:getSpecificOrderById?.collectAmount,
          trackingId:trackingId,
          recvMoney:getSpecificOrderById?.recvMoney,
          printbazcost:getSpecificOrderById?.printbazcost,
          orderStatus:getSpecificOrderById?.orderStatus,
          paymentStatus:getSpecificOrderById?.paymentStatus,
          deliveryAssignTo:getSpecificOrderById?.deliveryAssignTo,
          printBazRcvable:'',
          returnValue:getSpecificOrderById?.orderStatus==="returned"?returnValue:0,
          deliveryFeeForAdmin:'',
          deliveryFeeForClient:getSpecificOrderById?.deliveryFee

      };
      if (['out for delivery', 'delivered', 'returned'].includes(getSpecificOrderById?.orderStatus.toLowerCase())) {
      // Add/update the data in the DeliveryList
      const deliveryResponse = await fetch('https://mserver.printbaz.com/addOrUpdateDeliveryList', {
        // const deliveryResponse = await fetch('http://localhost:5000/addOrUpdateDeliveryList', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(deliveryData),
      });
        // console.log("Success:", getSpecificOrderById);
        // Update your state or perform any other necessary operations with the updated viewClient object
    }
      } else {
        console.error("status Error:", response);
        // Handle error here
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error here
    }
  }
  const handleUpdatePopUp=(e)=>{
    e.preventDefault()

    setUpdateOrder(true)
    // console.log("setUpdateOrder",updateOrder);
  }
  const downloadShippingDetail = async () => {
    const shippingDetailElement = document.getElementById('shipping-detail');

    // Capture a screenshot of the component with html2canvas
    html2canvas(shippingDetailElement, { scale: 1 })  // adjust the scale as needed
    .then((canvas) => {
        // Convert the canvas to a data URL
        const imgData = canvas.toDataURL('image/png');

        // Create a new PDF with jsPDF
        const pdf = new jsPDF('p', 'mm', 'a4');  // create A4 portrait pdf
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("ShippingDetail.pdf");
    });
}


  const getViewClientColor = (status) => {
    if (status === "Pending") {
      return "Orange";
    }
    if (status === "on-hold") {
      return "Orange";
    }
    if (status === "on hold artwork issue") {
      return "Orange";
    }  
        if (status === "on hold billing issue") {
      return "Orange";
    } 
    if (status === "on hold out of stock") {
      return "Orange";
    }  
    if (status === "Approved") {
      return "green";
    } 
  
      if (status === "in-production") {
      return "green";
    }
      if (status === "out for delivery") {
      return "green";
    }  
    if (status === "delivered") {
      return "green";
    } 
     if (status === "payment-released") {
      return "green";
    } 
    if (status === "returned") {
      return "red";
    }    
      if (status === "cancel") {
      return "red";
    }   
     if (status === "paid") {
      return "#1fea70";
    }  
    if (status === "Unpaid") {
      return "#360eea";
    }
    // you can add more conditions here or just return a default color
    // return "defaultColor";
  };
  function downloadImage(fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = true;
    link.click();
  }
  const copyOrderId = () => {
    navigator.clipboard.writeText(getSpecificOrderById?._id);
    
    setShow(true)
    // console.log("viewOrder?._id",viewOrder?._id);
    setTimeout(() => {
      setShow(false);
    }, 1000);
    
    // Show a notification or perform any other action after copying the ID
  };
  const fileId = getSpecificOrderById?.qrCodeUrl?.split('/d/')[1].split('/view')[0];
  const qrDownLoadURL = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
    return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        /* Nav Bar CSS Start */\n\n        .navbar {\n            background: #001846 !important;\n            padding: 0 20px 0 20px;\n        }\n\n        .navbar-brand img {\n            width: 120px;\n        }\n\n        .nav-link {\n            color: #ffffff !important;\n            font-size: 18px;\n            font-weight: 500;\n            text-align: center;\n            text-transform: uppercase;\n            padding: 20px 20px 20px 20px;\n            margin: 0 10px 0 10px;\n        }\n\n        .nav-link:hover {\n            background-color: #ffffff;\n            color: #001846 !important;\n            transition: linear 0.2s;\n        }\n\n        .nav-dropdown-menu {\n            background-color: #001846;\n        }\n\n        .nav-dropdown-item {\n            color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .navbar-toggler {\n            background-color: #ffffff !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {}\n\n        @media screen and (max-width: 768px) {\n            .nav-link {\n                text-align: left;\n            }\n\n            .nav-link:hover {\n                width: 100%;\n\n            }\n\n            .view-client {\n                padding: 30px;\n            }\n\n        }\n\n        /* Nav Bar CSS End */\n\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        .all-content {\n            margin: 50px;\n        }\n\n        .all-title {\n            font-weight: 700;\n            margin-bottom: 30px;\n        }\n\n        .rec-title h5 {\n            margin-top: 40px;\n            font-weight: 600;\n        }\n\n        .rec-title p {\n            font-size: 18px;\n        }\n\n        .amu-title h3 {\n            margin-bottom: 15px !important;\n        }\n\n        .amu-title h6 {\n            display: inline-block;\n            width: 75%;\n            font-weight: 600;\n            margin: 0;\n            margin-top: 10px;\n        }\n\n        .amu-title p {\n            display: inline-block;\n            width: 20%;\n            margin: 0;\n        }\n\n        .trak-info h3 {\n            font-weight: 700;\n        }\n\n        .trak-status .col-3 {\n            text-align: center;\n        }\n\n        .trak-status p {\n            font-weight: 600;\n            margin-top: 10px;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n            border: none;\n        }\n\n        .view-client-title a {\n            font-weight: 700;\n            font-size: 30px;\n            text-decoration: none;\n            color: #000;\n        }\n\n        .order-details {\n            background-color: #fff;\n        }\n\n        .card {\n            border: 0;\n            margin-bottom: 5px;\n            border-radius: 4px\n        }\n\n        .card.card-transparent {\n            background: 0 0 !important;\n            box-shadow: none\n        }\n\n        .file-options {\n            position: absolute;\n            right: 0;\n            top: 0;\n            visibility: hidden;\n            opacity: 0;\n            -webkit-transition: all .2s ease-in-out;\n            -moz-transition: all .2s ease-in-out;\n            -o-transition: all .2s ease-in-out;\n            transition: all .2s ease-in-out;\n            z-index: 999;\n        }\n\n        .file:hover .file-options,\n        .folder:hover .file-options {\n            visibility: visible;\n            opacity: 1\n        }\n\n        .file-options>a {\n            margin: 15px 10px;\n            display: block;\n            color: #384c6d;\n            opacity: .6;\n            -webkit-transition: all .2s ease-in-out;\n            -moz-transition: all .2s ease-in-out;\n            -o-transition: all .2s ease-in-out;\n            transition: all .2s ease-in-out;\n        }\n\n        .file-options>a i {\n            font-size: 19px\n        }\n\n        .file-options>a:hover {\n            opacity: 1\n        }\n\n        .file-options>a::after {\n            display: none\n        }\n\n        .file .file-info p {\n            font-weight: 500;\n            margin-bottom: 0;\n        }\n\n        .file .file-info span.file-size {\n            color: rgba(0, 0, 0, .4)\n        }\n\n        .file .file-info span.file-date {\n            font-size: 12px;\n            color: rgba(0, 0, 0, .4);\n            margin-top: 10px;\n            display: block\n        }\n\n        .card-body {\n            flex: 1 1 auto;\n            padding: 0;\n        }\n\n        .order-list-title {\n            margin-bottom: 20px;\n        }\n\n        .order-list-title h4 {\n            font-size: 24px;\n            font-weight: 500;\n        }\n\n        .order-tab {\n            padding: 10px 0 10px 0;\n        }\n\n        .admin-dis-a {\n    color: #000000 !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 !important;\n}\n\n.admin-dis {\n    width: 100%;\n    margin: 0 auto;\n    padding: 20px;\n    box-sizing: border-box;\n    list-style-type: none;\n    padding: 0;\n}\n\n.admin-dis-tab {\n    margin-bottom: 20px;\n}\n\n.admin-dis-li {\n    display: inline-block;\n}\n\n.admin-dis-a {\n    padding: 10px 20px;\n    display: block;\n    text-decoration: none;\n    color: #000;\n}\n\n.admin-dis-a.active {\n    background-color: #f2f2f2;\n    color: #000;\n}\n\n.admin-dis-chat {\n    background-color: #fff;\n    padding: 20px;\n    border-radius: 4px;\n    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);\n}\n\n.admin-dis-chat form {\n    display: flex;\n    align-items: center;\n}\n\n.admin-dis-chat form input[type=\"text\"] {\n    flex: 1;\n    padding: 10px;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n    margin-right: 10px;\n}\n\n.admin-dis-chat form button {\n    padding: 10px 20px;\n    background-color: #007BFF;\n    color: #fff;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n\n.admin-dis-chat form button:hover {\n    background-color: #0056b3;\n}\n\n.dis-post {\n    display: flex;\n    flex-shrink: 0\n}\n\n.admin-dis-post {\n    margin-top: 20px;\n    background: #fff;\n    padding: 20px;\n}\n\n    " }} />
          <Navigationbar/>
          <div className="all-content">
            <div className="row">
              {/* <div className="col-lg-12 col-sm-12 flex"> */}
                <div className="view-client-title my-3 col-lg-8 col-sm-10">
                  {/* <Link to="/orderList"><span style={{fontSize: '30px'}}>
                      &lt; </span> View Order Details</Link> */}
                      <span onClick={handleBack} style={{ fontSize: '30px', cursor: 'pointer' }}>
      &lt; Back
    </span>
                </div> 
                <div className='flex col-lg-4 col-sm-2 '>
               
        
         <div style={{display:""}}>
                          
                          <select
                          id="status-filter"
                          className="status-btn"
                          style={{
                            border: "none",
                            padding: "10px",
                          
                          marginRight:"20px",
                           
                            backgroundColor: getViewClientColor(
                              deliverAssign
                            ),
                          }}
                          onChange={(e) => handleDeliverAssignChange(e)}
                        >
                  {
                    deliverAssign ?
                    <option value={deliverAssign}>
                    {deliverAssign=== "pathao"&& "Pathao" }
                    {deliverAssign=== "delivery tiger"&& "Delivery Tiger" }
                    {deliverAssign=== "others"&& "Others" }
                    {deliverAssign=== "no service"&& "No service" }
                   
                
                  </option>
                    :
                    <>
                     <option value="no service"> No service</option>
                    <option value="pathao"> Pathao</option>
                          <option value="delivery tiger">Delivery Tiger</option>
                          <option value="others">Others</option>
                    </>
                     
                  }
                    
                       


{deliverAssign === "pathao" && (
                            <>
                            
                              <option value="delivery tiger">Delivery Tiger</option>
                              <option value="others">Others</option>
                              <option value="no service">No service</option>
                            </>
                          )}

{deliverAssign === "delivery tiger" && (
                            <>
                            <option value="pathao">Pathao</option>
                         
                            <option value="others">Others</option>
                            <option value="no service">No service</option>
                              
                            </>
                          )} 
                          {deliverAssign === "others" && (
                            <>
                            <option value="pathao">Pathao</option>
                         
                            <option value="delivery tiger">Delivery Tiger</option>
                            <option value="no service">No service</option>
                              
                            </>
                          )}
                           {deliverAssign === "no service" && (
                            <>
                            <option value="pathao">Pathao</option>
                         
                            <option value="delivery tiger">Delivery Tiger</option>
                            <option value="others">Others</option>
                              
                            </>
                          )}
                        </select>
                      
                    
                      </div>
             
              <div className="view-client-title " style={{marginRight:"10px"}}>
          <Button variant="warning" onClick={downloadShippingDetail}><span><img style={{width:"23px",hight:"20px"}} src="/images/download.png" alt='download'/></span>Shipping Detail</Button>
          <div id="shipping-detail" style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
              <ShippingDetail getSpecificOrderById={getSpecificOrderById} />
          </div>
        
      </div>
{
                value_count?.edit_Order &&
                <div className="view-client-title my-3  " >
                <Button variant="success" onClick={handleUpdatePopUp}>Edit Order</Button>
                </div>
              }
        
                  
              
                </div>
                 
              {/* </div> */}
            </div>
            
            <div className="row">
              <div className="col-12">
                <div className="order-id bg-white p-4  shadow-sm" >
                <div style={{display:""}} className="row">
                  <div className='col-lg-6'>
                  <h3 className=" font-weight-bold col-lg-12 font_16" onClick={copyOrderId}>ORDER ID: {id} &nbsp;<span style={{cursor:"pointer",padding:"5px",fontSize:"16px"}} ref={target}  onClick={copyOrderId}><i class="fa fa-copy ml-2 mt-1 text-green cursor-pointer text-sm"></i></span> 
                <h5 className='font_16' style={{marginTop:"10px"}}>{formattedDate}</h5>
                </h3>
                  {
                    fetchTrackingId ?
                    <div className='d-flex'>
                    <label htmlFor="Tracking-number-filter" style={{marginBottom:"8px"}}>Tracking Id: </label>
                   <h5 style={{color:"Blue",marginLeft:"10px"}}>{fetchTrackingId} <i onClick={()=>setEdit(!edit)} style={{fontSize:"15px",color:"black",cursor:"pointer"}} class="fa fa-edit"></i> </h5>
                   {
                     edit===true &&
                     <div className="col-lg-2 col-sm-12 mb-4" >
                     <label htmlFor="Tracking-number-filter" style={{}}>Tracking Id: </label>
                      <form onSubmit={handleTrackingIdSubmit} className="flex">
                     
                      <input type="text" id="Tracking-number-filter" style={{width:"auto"}} value={trackingId} onChange={(e) =>  handleInputTrackingID(e)}  className="form-control" />
                      <Button type="submit">submit</Button>
                      </form>
                    {
                      exitIdAlert && <span style={{color:'red'}}>Tracking id already exist</span>
                    }
                      </div>
                   }
                    </div>
                    :
                    <div className="col-lg-2 col-sm-12 mb-4" >
                    <label htmlFor="Tracking-number-filter" style={{}}>Tracking Id: </label>
                     <form onSubmit={handleTrackingIdSubmit} className="flex">
                    
                     <input type="text" id="Tracking-number-filter" style={{width:"auto"}} value={trackingId} onChange={(e) =>  handleInputTrackingID(e)}  className="form-control" />
                     <Button type="submit">submit</Button>
                     </form>
                     {
                      exitIdAlert && <span style={{color:'red'}}>Tracking id already exist</span>
                    }
                     </div>
                  }
                  </div>
              
            
                  {/* <button className="status-btn d-inline-block py-2 px-3 font-weight-bold">{viewOrder?.orderStatus}</button> */}
                  <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
           copied!
          </Tooltip>
        )}
      </Overlay>
   
{
  (previewURL && fileId) &&
  <div className="col-lg-2" style={{display:"flex"}}>
     <div className="qr-container " style={{marginBottom:"10px"}}>
     <iframe src={previewURL}  style={{ textDecoration: "none" }} height="200" width="200" title="orcode"></iframe>
    <a href={qrDownLoadURL} download className="qr-download-link">Download QR code</a>
  </div>
</div>
 
}
    
                  <div
                        className="   font-weight-bold col-lg-4 "
                        style={{ marginBottom: "20px",display:"flex",justifyContent:"flex-end" }}
                      >
                        <div style={{display:""}}>
                          {
                            value_count?.payment_Status ?
                            <select
                            id="status-filter"
                            className="status-btn"
                            style={{
                              border: "none",
                              padding: "8px",
                            
                              marginRight:'20px',
                              marginBottom:"5px",
                              backgroundColor: getViewClientColor(
                                paymentStatus
                              ),
                            }}
                            onChange={(e) => handleInputPaymentChange(e)}
                          >
                            <option value={orderStatus}>
                              {paymentStatus=== "paid"&& "Paid" }
                              {paymentStatus=== "Unpaid"&& "Unpaid" }
                             
                          
                            </option>
                        
                        
  
                         
  
  
  {paymentStatus === "paid" && (
                              <>
                                {/* <option value="paid">Paid</option> */}
                                <option value="Unpaid">Unpaid</option>
                             
                              </>
                            )}
  
  {paymentStatus === "Unpaid" && (
                              <>
                              <option value="paid">Paid</option>
                              {/* <option value="Unpaid">Unpaid</option> */}
                             
                                
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
                          
                            marginRight:'20px',
                            marginBottom:"5px",
                            backgroundColor: getViewClientColor(
                              paymentStatus
                            ),
                          }}
                          onChange={(e) => handleInputPaymentChange(e)}
                        >
                          <option value={orderStatus}>
                            {paymentStatus=== "paid"&& "Paid" }
                            {paymentStatus=== "Unpaid"&& "Unpaid" }
                           
                        
                          </option>
                      
                      

                       


{paymentStatus === "paid" && (
                            <>
                              {/* <option value="paid">Paid</option> */}
                              <option value="Unpaid">Unpaid</option>
                           
                            </>
                          )}

{paymentStatus === "Unpaid" && (
                            <>
                            <option value="paid">Paid</option>
                            {/* <option value="Unpaid">Unpaid</option> */}
                           
                              
                            </>
                          )}
                        </select>
                          }
                       {
                         value_count?.orderStatus ?
                         <select
                         id="status-filter"
                         className="status-btn"
                         style={{
                           border: "none",
                           padding: "8px",
                           backgroundColor: getViewClientColor(
                             orderStatus
                           ),
                         }}
                         onChange={(e) => handleInputChange(e)}
                       >
                         <option value={orderStatus}>
                           {orderStatus=== "Pending"&& "Pending" }
                           {orderStatus=== "confirmed"&& "Confirmed" }
                           {orderStatus=== "Approved"&& "Approved" }
                           {orderStatus=== "in-production"&& "In Production" }
                           {orderStatus=== "out for delivery"&& "Out for delivery" }
                           {orderStatus=== "delivered"&& "Delivered" }
                           {orderStatus=== "payment-released"&& "Payment Released" }
                           {orderStatus=== "returned"&& "Returned" }
                           {orderStatus=== "on hold artwork issue"&& "On hold -Artwork issue" }
                           {orderStatus=== "on hold billing issue"&& "On hold - Billing issue" }
                           {orderStatus=== "on hold out of stock"&& "On hold - Out of stock" }
                           {orderStatus=== "cancel"&& "Cancel" }
                       
                         </option>
                         {orderStatus === "Approved" && (
                           <>
                             <option value="Pending">Pending</option>
                             
                             <option value="on hold artwork issue">On hold -  Artwork issue</option>
                 <option value="on hold billing issue">On hold - Billing Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                 <option value="confirmed">Confirmed</option>
                             <option value="in-production">In Production</option>
                             <option value="out for delivery">Out for delivery</option>
                             <option value="delivered">Delivered</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="returned">Returned</option>
                             <option value="cancel">Cancel</option>
                           </>
                         )}
                         {orderStatus === "Pending" && (
                           <>
                            
                           
                             <option value="on hold artwork issue">On hold -  Artwork issue</option>
                 <option value="on hold billing issue">On hold - Billing Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                             <option value="Approved">Approved</option>
                             <option value="confirmed">Confirmed</option>
                             <option value="in-production">In Production</option>
                             <option value="out for delivery">Out for delivery</option>
                             <option value="delivered">Delivered</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="returned">Returned</option>
                             <option value="cancel">Cancel</option>
                           </>
                         )}
                         {orderStatus === "confirmed" && (
                           <>
                            <option value="Pending">Pending</option>
                            <option value="on hold artwork issue">On hold -  Artwork issue</option>
                 <option value="on hold billing issue">On hold - Billing Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                            <option value="Approved">Approved</option>
                             <option value="in-production">In Production</option>
                             <option value="out for delivery">Out for delivery</option>
                             <option value="delivered">Delivered</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="returned">Returned</option>
                             <option value="cancel">Cancel</option>
                           </>
                         )}  
                           {orderStatus === "in-production" && (
                           <>
                               
                               <option value="on hold artwork issue">On hold -  Artwork issue</option>
                 <option value="on hold billing issue">On hold - Billing Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="confirmed">Confirmed</option>
                             <option value="out for delivery">Out for delivery</option>
                             <option value="delivered">Delivered</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="returned">Returned</option>
                             <option value="cancel">Cancel</option>
                           </>
                         )}  
                             {orderStatus === "out for delivery" && (
                           <>
                                
                               <option value="on hold artwork issue">On hold -  Artwork issue</option>
                 <option value="on hold billing issue">On hold - Billing Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in-production">In Production</option>
                             <option value="delivered">Delivered</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="returned">Returned</option>
                             <option value="cancel">Cancel</option>
                           </>
                         )}
                           {orderStatus === "delivered" && (
                           <>
                                
                               <option value="on hold artwork issue">On hold -  Artwork issue</option>
                 <option value="on hold billing issue">On hold - Billing Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in-production">In Production</option>
                            <option value="out for delivery">Out for delivery</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="returned">Returned</option>
                             <option value="cancel">Cancel</option>
                           </>
                         )} 
                          {orderStatus === "payment-released" && (
                           <>
                                
                               <option value="on hold artwork issue">On hold -  Artwork issue</option>
                 <option value="on hold billing issue">On hold - Billing Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in-production">In Production</option>
                            <option value="out for delivery">Out for delivery</option>
                            <option value="delivered">Delivered</option>
                             <option value="returned">Returned</option>
                             <option value="cancel">Cancel</option>
                           </>
                         )}  
                         {orderStatus === "returned" && (
                           <>
                              
                               <option value="on hold artwork issue">On hold -  Artwork issue</option>
                 <option value="on hold billing issue">On hold - Billing Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in-production">In Production</option>
                            <option value="out for delivery">Out for delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="payment-released">Payment Released</option>
                            <option value="cancel">Cancel</option>
                            
                           </>
                         )}

                         {orderStatus === "on hold artwork issue" && (
                           <>
                             <option value="Pending">Pending</option>
                              
                             <option value="on hold billing issue">On hold - Billing Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                             <option value="Approved">Approved</option>
                             <option value="confirmed">Confirmed</option>
                             <option value="in-production">In Production</option>
                             <option value="out for delivery">Out for delivery</option>
                             <option value="delivered">Delivered</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="returned">Returned</option>
                             <option value="cancel">Cancel</option>
                           </>
                         )}

{orderStatus === "on hold billing issue" && (
                           <>
                             <option value="Pending">Pending</option>
                              
                             <option value="on hold artwork issue">On hold - Artwork Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                             <option value="Approved">Approved</option>
                             <option value="confirmed">Confirmed</option>
                             <option value="in-production">In Production</option>
                             <option value="out for delivery">Out for delivery</option>
                             <option value="delivered">Delivered</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="returned">Returned</option>
                             <option value="cancel">Cancel</option>
                           </>
                         )}

{orderStatus === "on hold out of stock" && (
                           <>
                             <option value="Pending">Pending</option>
                              
                             <option value="on hold artwork issue">On hold - Artwork Issue</option>
                             <option value="on hold billing issue">On hold - Billing Issue</option>
                             <option value="Approved">Approved</option>
                             <option value="confirmed">Confirmed</option>
                             <option value="in-production">In Production</option>
                             <option value="out for delivery">Out for delivery</option>
                             <option value="delivered">Delivered</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="returned">Returned</option>
                             <option value="cancel">Cancel</option>
                           </>
                         )}

{orderStatus === "cancel" && (
                           <>
                             <option value="Pending">Pending</option>
                              
                             <option value="on hold artwork issue">On hold - Artwork Issue</option>
                             <option value="on hold billing issue">On hold - Billing Issue</option>
                             <option value="on hold out of stock">On hold - Out Of Stock</option>
                             <option value="Approved">Approved</option>
                             <option value="confirmed">Confirmed</option>
                             <option value="in-production">In Production</option>
                             <option value="out for delivery">Out for delivery</option>
                             <option value="delivered">Delivered</option>
                             <option value="payment-released">Payment Released</option>
                             <option value="returned">Returned</option>
                             
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
    orderStatus
  ),
}}
onChange={(e) => handleInputChange(e)}
>
<option value={orderStatus}>
  {orderStatus=== "Pending"&& "Pending" }
  {orderStatus=== "confirmed"&& "Confirmed" }
  {orderStatus=== "Approved"&& "Approved" }
  {orderStatus=== "in-production"&& "In Production" }
  {orderStatus=== "out for delivery"&& "Out for delivery" }
  {orderStatus=== "delivered"&& "Delivered" }
  {orderStatus=== "payment-released"&& "Payment Released" }
  {orderStatus=== "returned"&& "Returned" }
  {orderStatus=== "on hold artwork issue"&& "On hold -Artwork issue" }
  {orderStatus=== "on hold billing issue"&& "On hold - Billing issue" }
  {orderStatus=== "on hold out of stock"&& "On hold - Out of stock" }
  {orderStatus=== "cancel"&& "Cancel" }

</option>
{orderStatus === "Approved" && (
  <>
    <option value="Pending">Pending</option>
    
    <option value="on hold artwork issue">On hold -  Artwork issue</option>
<option value="on hold billing issue">On hold - Billing Issue</option>
<option value="on hold out of stock">On hold - Out of Stock</option>
<option value="confirmed">Confirmed</option>
    <option value="in-production">In Production</option>
    <option value="out for delivery">Out for delivery</option>
    <option value="delivered">Delivered</option>
    <option value="payment-released">Payment Released</option>
    <option value="returned">Returned</option>
    <option value="cancel">Cancel</option>
  </>
)}
{orderStatus === "Pending" && (
  <>
   
  
    <option value="on hold artwork issue">On hold -  Artwork issue</option>
<option value="on hold billing issue">On hold - Billing Issue</option>
<option value="on hold out of stock">On hold - Out of Stock</option>
    <option value="Approved">Approved</option>
    <option value="confirmed">Confirmed</option>
    <option value="in-production">In Production</option>
    <option value="out for delivery">Out for delivery</option>
    <option value="delivered">Delivered</option>
    <option value="payment-released">Payment Released</option>
    <option value="returned">Returned</option>
    <option value="cancel">Cancel</option>
  </>
)}
{orderStatus === "confirmed" && (
  <>
   <option value="Pending">Pending</option>
   <option value="on hold artwork issue">On hold -  Artwork issue</option>
<option value="on hold billing issue">On hold - Billing Issue</option>
<option value="on hold out of stock">On hold - Out of Stock</option>
   <option value="Approved">Approved</option>
    <option value="in-production">In Production</option>
    <option value="out for delivery">Out for delivery</option>
    <option value="delivered">Delivered</option>
    <option value="payment-released">Payment Released</option>
    <option value="returned">Returned</option>
    <option value="cancel">Cancel</option>
  </>
)}  
  {orderStatus === "in-production" && (
  <>
      
      <option value="on hold artwork issue">On hold -  Artwork issue</option>
<option value="on hold billing issue">On hold - Billing Issue</option>
<option value="on hold out of stock">On hold - Out of Stock</option>
   <option value="Pending">Pending</option>
   <option value="Approved">Approved</option>
   <option value="confirmed">Confirmed</option>
    <option value="out for delivery">Out for delivery</option>
    <option value="delivered">Delivered</option>
    <option value="payment-released">Payment Released</option>
    <option value="returned">Returned</option>
    <option value="cancel">Cancel</option>
  </>
)}  
    {orderStatus === "out for delivery" && (
  <>
       
      <option value="on hold artwork issue">On hold -  Artwork issue</option>
<option value="on hold billing issue">On hold - Billing Issue</option>
<option value="on hold out of stock">On hold - Out of Stock</option>
   <option value="Pending">Pending</option>
   <option value="Approved">Approved</option>
   <option value="confirmed">Confirmed</option>
   <option value="in-production">In Production</option>
    <option value="delivered">Delivered</option>
    <option value="payment-released">Payment Released</option>
    <option value="returned">Returned</option>
    <option value="cancel">Cancel</option>
  </>
)}
  {orderStatus === "delivered" && (
  <>
       
      <option value="on hold artwork issue">On hold -  Artwork issue</option>
<option value="on hold billing issue">On hold - Billing Issue</option>
<option value="on hold out of stock">On hold - Out of Stock</option>
   <option value="Pending">Pending</option>
   <option value="Approved">Approved</option>
   <option value="confirmed">Confirmed</option>
   <option value="in-production">In Production</option>
   <option value="out for delivery">Out for delivery</option>
    <option value="payment-released">Payment Released</option>
    <option value="returned">Returned</option>
    <option value="cancel">Cancel</option>
  </>
)} 
 {orderStatus === "payment-released" && (
  <>
       
      <option value="on hold artwork issue">On hold -  Artwork issue</option>
<option value="on hold billing issue">On hold - Billing Issue</option>
<option value="on hold out of stock">On hold - Out of Stock</option>
   <option value="Pending">Pending</option>
   <option value="Approved">Approved</option>
   <option value="confirmed">Confirmed</option>
   <option value="in-production">In Production</option>
   <option value="out for delivery">Out for delivery</option>
   <option value="delivered">Delivered</option>
    <option value="returned">Returned</option>
    <option value="cancel">Cancel</option>
  </>
)}  
{orderStatus === "returned" && (
  <>
     
      <option value="on hold artwork issue">On hold -  Artwork issue</option>
<option value="on hold billing issue">On hold - Billing Issue</option>
<option value="on hold out of stock">On hold - Out of Stock</option>
   <option value="Pending">Pending</option>
   <option value="Approved">Approved</option>
   <option value="confirmed">Confirmed</option>
   <option value="in-production">In Production</option>
   <option value="out for delivery">Out for delivery</option>
   <option value="delivered">Delivered</option>
   <option value="payment-released">Payment Released</option>
   <option value="cancel">Cancel</option>
   
  </>
)}

{orderStatus === "on hold artwork issue" && (
  <>
    <option value="Pending">Pending</option>
     
    <option value="on hold billing issue">On hold - Billing Issue</option>
<option value="on hold out of stock">On hold - Out of Stock</option>
    <option value="Approved">Approved</option>
    <option value="confirmed">Confirmed</option>
    <option value="in-production">In Production</option>
    <option value="out for delivery">Out for delivery</option>
    <option value="delivered">Delivered</option>
    <option value="payment-released">Payment Released</option>
    <option value="returned">Returned</option>
    <option value="cancel">Cancel</option>
  </>
)}

{orderStatus === "on hold billing issue" && (
  <>
    <option value="Pending">Pending</option>
     
    <option value="on hold artwork issue">On hold - Artwork Issue</option>
<option value="on hold out of stock">On hold - Out of Stock</option>
    <option value="Approved">Approved</option>
    <option value="confirmed">Confirmed</option>
    <option value="in-production">In Production</option>
    <option value="out for delivery">Out for delivery</option>
    <option value="delivered">Delivered</option>
    <option value="payment-released">Payment Released</option>
    <option value="returned">Returned</option>
    <option value="cancel">Cancel</option>
  </>
)}

{orderStatus === "on hold out of stock" && (
  <>
    <option value="Pending">Pending</option>
     
    <option value="on hold artwork issue">On hold - Artwork Issue</option>
    <option value="on hold billing issue">On hold - Billing Issue</option>
    <option value="Approved">Approved</option>
    <option value="confirmed">Confirmed</option>
    <option value="in-production">In Production</option>
    <option value="out for delivery">Out for delivery</option>
    <option value="delivered">Delivered</option>
    <option value="payment-released">Payment Released</option>
    <option value="returned">Returned</option>
    <option value="cancel">Cancel</option>
  </>
)}

{orderStatus === "cancel" && (
  <>
    <option value="Pending">Pending</option>
     
    <option value="on hold artwork issue">On hold - Artwork Issue</option>
    <option value="on hold billing issue">On hold - Billing Issue</option>
    <option value="on hold out of stock">On hold - Out Of Stock</option>
    <option value="Approved">Approved</option>
    <option value="confirmed">Confirmed</option>
    <option value="in-production">In Production</option>
    <option value="out for delivery">Out for delivery</option>
    <option value="delivered">Delivered</option>
    <option value="payment-released">Payment Released</option>
    <option value="returned">Returned</option>
    
  </>
)}
</select>
                       }
                     
                        <p className='text_Align_Left' style={{textAlign:"center",marginTop:'10px'}}>Status changed at: {getSpecificOrderById?.statusDate}</p>
                        </div>
                        
                       
               

                      </div>
                </div>
              
                     
                </div>
            
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="trak-info bg-white p-4 my-3 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title mb-4">Tracking Details</h3>
                    </div>
                  </div>
                  <div className="row trak-status">
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868453112680478/ic-confirmed-red.f41e73a9.png" alt="" />
                     {
                      orderStatus==="returned"|| orderStatus==="Approved" || orderStatus==="in-production" ||  orderStatus==="out for delivery" ||  orderStatus==="payment-released"||   orderStatus==="delivered"    ?
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                      :
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} />

                     }
                     
                      <p>Accepted</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                                         orderStatus==="returned" || orderStatus==="in-production" ||  orderStatus==="out for delivery" ||  orderStatus==="payment-released"||   orderStatus==="delivered"   ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>In Production</p>
                    </div>  
                      <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                       orderStatus==="returned"|| orderStatus==="out for delivery" || orderStatus==="payment-released"||  orderStatus==="delivered"   ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>Out for Delivery</p>
                    </div>  
                     <div className="col-lg-3 col-md-6 col-sm-12 text-center mb-3">
                      <img src="https://media.discordapp.net/attachments/1069579536842379305/1102868452777140255/ic-picked-red.94cd32af.png" alt="" />
                      {
                   orderStatus==="returned"||   orderStatus==="payment-released"|| orderStatus==="delivered"  ?
                     
                       
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711228821544/check_2.png" alt="" style={{width: '25px'}} />
                       :
                       <img src="https://media.discordapp.net/attachments/1069579536842379305/1102872711610515456/remove.png" alt="" style={{width: '25px'}} /> 
                      }
                     
                      <p>Delivered</p>
                    </div>
                    
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-12 mb-3">
                {
                  value_count?.clientDetails &&
                  <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Client Details</h3>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Name</h5>
                      <p>{getSpecificOrderById?.clientName}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Brand Name</h5>
                      <p>{getSpecificOrderById?.clientbrandName}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Email</h5>
                      <p>{getSpecificOrderById?.userMail}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Contact Number</h5>
                      <p>{getSpecificOrderById?.clientPhone}</p>
                    </div>
                  </div>
                </div>
                }
                
              </div>
              <div className="col-lg-5 col-md-12 mb-3">
                {
                  value_count?.recipientDetails &&
<div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Recipient Details</h3>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Name</h5>
                      <p>{getSpecificOrderById?.name}</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h5>Phone</h5>
                      <p>{getSpecificOrderById?.phone}</p>
                    </div>
                    <div className="col-12">
                      <h5>Address</h5>
                      <p>{getSpecificOrderById?.address}</p>
                    </div>
                  </div>
                </div>
                }
                
              </div>
              <div className="col-lg-3 col-md-12">
                {
                  value_count?.costOfOrder_FullDetails &&
                  <div className="bg-white p-4 shadow-sm mb-3">
                  <div className="row amu-title">
                    <div className="col-12">
                      <h3 className="all-title">Cost of Order</h3>
                      <div className='flex'>
                      <h6>Printbaz Cost</h6>
                      <span style={{marginTop:"10px"}}>{getSpecificOrderById?.printbazcost} BDT</span>
                      </div>
                      <div className='flex'>
                      <h6>Delivery Fee</h6>
                      <span style={{marginTop:"10px"}}>{getSpecificOrderById?.deliveryFee} BDT</span>
                      </div> 
                      <div className='flex'>
                      <h6>Collect Amount</h6>
                      <span style={{marginTop:"10px"}}>{getSpecificOrderById?.collectAmount} BDT</span>
                      </div> 
                      <div className='flex'>
                      
                      <h6>Cash Handling Fee</h6>
                      <span style={{marginTop:"10px"}}>2% BDT</span>
                      </div>
                   
                  
                      <div className='flex'>
                      <h6>Receivable Amount</h6>
                      <span style={{marginTop:"10px"}}>{getSpecificOrderById?.recvMoney}BDT</span>
                      </div>
                      
                    </div>
                  </div>
                </div>
                }
                {
                  value_count?.costOfOrder_CollectAmount && !value_count?.costOfOrder_FullDetails &&
                  <div className="bg-white p-4 shadow-sm mb-3">
                  <div className="row amu-title">
                    <div className="col-12">
                      <h3 className="all-title">Cost of Order</h3>
                      
                      <div className='flex'>
                      <h6>Collect Amount</h6>
                      <span style={{marginTop:"10px"}}>{getSpecificOrderById?.collectAmount} BDT</span>
                      </div> 
                     </div>
                  </div>
                </div>
                }
               
              </div>
              {/* //instruction box  */}
              <div className="col-lg-12 col-md-12 mb-3">
                <div className="rec-info bg-white p-4 shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="all-title">Instruction</h3>
                    </div>
                  </div>
               
                  <div className="row order-list-title">
                    <div className="col-12">
                      <h4 className='font_16'>{getSpecificOrderById?.instruction}</h4>
                    </div>
              
                  </div>
               
                
                 
                </div>
              </div>
{
  value_count?.orderDetails &&

  <div className="col-lg-12 col-md-12 mb-3">
  <div className="rec-info bg-white p-4 shadow-sm">
    <div className="row">
      <div className="col-12">
        <h3 className="all-title">Order Details</h3>
      </div>
    </div>
 
    <div className="row order-list-title d-none-phone">
      
      <div className="col-3">
        <h4>Color</h4>
      </div>
      <div className="col-3" style={{display:"flex",justifyContent:"center"}}>
        <h4>T-shirt Size</h4>
      </div>
      <div className="col-3" style={{display:"flex",justifyContent:"center"}}>
        <h4>Quantity</h4>
      </div>
      {/* <div className="col-1" style={{display:"flex",justifyContent:"center"}}>
        <h4>Print Size</h4>
      </div> */}
      {/* <div className="col-3" style={{display:"flex",justifyContent:"center"}}>
        <h4>Main File</h4>
      </div> */}
      <div className="col-3" style={{display:"flex",justifyContent:"center"}}>
        <h4>Picture</h4>
      </div>
        {/* <div className="col-1">
        <h4>BrandLogo</h4>
      </div> */}
      {/* <div className="col-2">
        <h4>Picture</h4>
      </div> */}
    </div>
    {
      getSpecificOrderById?.orderDetailArr?.map((orderDetail,orderIndex)=><>
        <div className="row order-tab d-none-phone " key={orderIndex}>
        <h3 style={{color:"orange"}}>Line Item: {orderIndex+1}</h3>
        
      <div className="col-3">
        <p>{orderDetail?.color}</p>
      </div>
      <div className="col-3" style={{display:"flex",justifyContent:"center"}}>
        {orderDetail?.teshirtSize}
      </div>
      <div className="col-3" style={{display:"flex",justifyContent:"center"}}>
      {orderDetail?.quantity}
      </div>
 
    
      <div className="col-lg-2" style={{display:"flex",justifyContent:"right"}}>
      <div className="card file">
{
orderDetail?.image?.map(imageUrl => {
// Extract the file ID from the URL
//  let fileId = "";
//  if (imageUrl.includes("/file/d/")) {
//    fileId = imageUrl.split("/file/d/")[1].split("/")[0];
//  } else if (imageUrl.includes("id=")) {
//    fileId = imageUrl.split("id=")[1];
//  }

const fileId = imageUrl?.split('/d/')[1].split('/view')[0];
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;

return (
<div key={imageUrl}>

<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div>
</div>
)
})
}
</div>
      </div>
    
    </div>
    <div className="row  " >
      {/* <h3 style={{color:"orange"}}>Line Item: {orderIndex+1}</h3> */}
      <div className="col-12 "  key={orderIndex}>
    
      {/* {orderDetail?.printSide} */}
    
      <h4 >Print side : <span className='bold'> Both side   /   Front side   /    back side</span></h4>
      <h4 >FrontSide : <span className='bold'>{orderDetail?.printSize}</span></h4>
      <h4>BackSide:{orderDetail?.printSizeBack}</h4>
     
    
       
    
     <div className="col-lg-12" >
     <h4>Main File :</h4>
      <div className="card file">
{
orderDetail?.file?.map((fileUrl,fileIndex) => {
// Extract the file ID from the URL
//  let fileId = "";
//  if (fileUrl?.includes("/file/d/")) {
//    fileId = fileUrl?.split("/file/d/")[1]?.split("/")[0];
//  } else if (fileUrl?.includes("id=")) {
//    fileId = fileUrl?.split("id=")[1];
//  }

const fileId = fileUrl?.split('/d/')[1].split('/view')[0];
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
// Construct the direct download link
//  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
let dropdownId = `dropdown${orderIndex}-${fileIndex}`;
return (
<div key={fileIndex} style={{display:"flex"}}>

<div className="file-info" style={{marginLeft:"15px"}}>
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div>
</div>
)
})
}
</div>

</div>
     
     {/* <p >Main File :<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div></p> */}
   

{
orderDetail?.brandLogo &&
<>
<h4>Brang Logo :</h4>
<div className="card file">
      {
(() => {
// Extract the file ID from the URL
let fileId = "";
if (orderDetail?.brandLogo?.includes("/file/d/")) {
fileId = orderDetail?.brandLogo?.split("/file/d/")[1].split("/")[0];
} else if (orderDetail?.brandLogo?.includes("id=")) {
fileId = orderDetail?.brandLogo?.split("id=")[1];
}
// Construct the direct download link
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

return (
<div >

<div className="card-body file-info">
{
orderDetail?.brandLogo &&
<>

<div className="card file">
      {
(() => {
// Extract the file ID from the URL
let fileId = "";
if (orderDetail?.brandLogo?.includes("/file/d/")) {
fileId = orderDetail?.brandLogo?.split("/file/d/")[1].split("/")[0];
} else if (orderDetail?.brandLogo?.includes("id=")) {
fileId = orderDetail?.brandLogo?.split("id=")[1];
}
const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
// Construct the direct download link
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

return (
<div >

<div className="card-body file-info">
{
orderDetail?.brandLogo ?
<div>
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download> <p>Brand Logo</p></a>
</div>
:
""
}


{/* <span className="file-size">1009.2kb</span><br /> */}
</div>
</div>
)
})()
}

</div>
</>

}


{/* <span className="file-size">1009.2kb</span><br /> */}
</div>
</div>
)
})()
}

</div>
</>

}

      </div>
      <hr />
    </div>

{/* for mobile  */}
    <div className="row  diplay_none" >
      <h3 style={{color:"orange"}}>Line Item: {orderIndex+1}</h3>
      <div className="col-12 "  key={orderIndex}>
     <p >Color:  <span className='bold'>{orderDetail?.color}</span></p>
     <p >T-shirt Size : <span className='bold'> {orderDetail?.teshirtSize}</span></p>
     <p >Quantity : <span className='bold'> {orderDetail?.quantity}</span></p>
     <p >Print Size : <span className='bold'>{orderDetail?.printSize}</span></p>
     <div className="col-lg-12" >
     <p>Main File :</p>
      <div className="card file">
{
orderDetail?.file?.map((fileUrl,fileIndex) => {
// Extract the file ID from the URL
//  let fileId = "";
//  if (fileUrl?.includes("/file/d/")) {
//    fileId = fileUrl?.split("/file/d/")[1]?.split("/")[0];
//  } else if (fileUrl?.includes("id=")) {
//    fileId = fileUrl?.split("id=")[1];
//  }

const fileId = fileUrl?.split('/d/')[1].split('/view')[0];
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;
// Construct the direct download link
//  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
let dropdownId = `dropdown${orderIndex}-${fileIndex}`;
return (
<div key={fileIndex}>

<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div>
</div>
)
})
}
</div>

</div>
     
     {/* <p >Main File :<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div></p> */}
                <div className="col-lg-12" >
     <p>Picture :</p>
      <div className="card file">
      {
orderDetail?.image?.map(imageUrl => {


const fileId = imageUrl?.split('/d/')[1].split('/view')[0];
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
const previewURL = `https://drive.google.com/file/d/${fileId}/preview`;

return (
<div key={imageUrl}>

<div className="file-info">
<iframe src={previewURL}  style={{ textDecoration: "none" }} height="auto" width="auto" title="orcode"></iframe>
<a className="dropdown-item" href={downloadUrl} download><p style={{cursor:"pointer"}} href={downloadUrl} download>download</p></a>

</div>
</div>
)
})
}
</div>

</div>

{
orderDetail?.brandLogo &&
<>
<p>Brang Logo :</p>
<div className="card file">
      {
(() => {
// Extract the file ID from the URL
let fileId = "";
if (orderDetail?.brandLogo?.includes("/file/d/")) {
fileId = orderDetail?.brandLogo?.split("/file/d/")[1].split("/")[0];
} else if (orderDetail?.brandLogo?.includes("id=")) {
fileId = orderDetail?.brandLogo?.split("id=")[1];
}
// Construct the direct download link
const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

return (
<div >

<div className="card-body file-info">
{
orderDetail?.brandLogo ?
<a className="dropdown-item" href={downloadUrl} download> <p>Brand Logo</p></a>
:
""
}


{/* <span className="file-size">1009.2kb</span><br /> */}
</div>
</div>
)
})()
}

</div>
</>

}

      </div>
      <hr />
    </div>
      </>)
    }
  
   
  </div>
</div>
}

            </div>
            <div className="row">
              <div className="col-12">
                <div className="admin-dis section">
                  <div className="row admin-dis-tab">
                    <div className="col-12">
                      <TabForViewOrder orderId={id} email={getSpecificOrderById?.userMail} viewOrder={viewOrder} clientName={getSpecificOrderById?.clientName}  ></TabForViewOrder>
                      {/* <Ticket style={{visibility:"none"}}  email={viewClient?.email}/> */}
                      {/* <ul className="nav nav-tabs admin-dis">
                        <li className="nav-item admin-dis-li">
                          <a className="nav-link admin-dis-a active" aria-current="page" href="#">Discussion</a>
                        </li>
                        <li className="nav-item admin-dis-li">
                          <a className="nav-link admin-dis-a" href="#">Support Tickets</a>
                        </li>
                        <li className="nav-item admin-dis-li">
                          <a className="nav-link admin-dis-a" href="#">File Manager</a>
                        </li>
                      </ul> */}
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
          {
            updateOrder===true &&
            <UpdateOrder onClose={() => setUpdateOrder(false)}
            viewOrder={viewOrder}
            getSpecificOrderById={getSpecificOrderById}
            setGetSpecificOrderById={setGetSpecificOrderById}
            viewClient={viewClient}/>
          }
        </div>
    );
};

export default ViewOrder;



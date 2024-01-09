import React, { useContext, useEffect, useMemo, useState } from "react";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/style.css";
import ReactDOM from 'react-dom';

import useGetMongoData from "../../hooks/useGetMongoData";
import { useRoleAsignData } from "../../hooks/useRoleAsignData";
import Navigationbar from "../navigationBar/Navigationbar";
import SendUserApproveMail from "../sendUserApproveMail/SendUserApproveMail";
import * as XLSX from 'xlsx';
import GetMercahntOrderXl from "../GetMercahntOrderXl";
import useSingleMercahntorder from "../../hooks/useSingleMercahntorder";
import { AuthContext } from "../../authProvider/AuthProvider";
import { Button, Spinner, Table } from "react-bootstrap";
import PaymentReleasedPopUp from "../alert/PaymentReleasedPopUp";
import axios from "axios";
import ConfirmationPopUp from "../alert/ConfirmationPopUp";
import MsgALert from "../alert/MsgALert";
import OrderUpdateAlert from "../alert/OrderUpdateAlert";
import GetReleaseOrderXl from "../GetReleaseOrderXl";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceDetail from "../invoiceDetail/InvoiceDetail";
const ViewClient = () => {
  // const { orderAll } = useGetMongoData();
  
  const [orderAll, setOrderAll] = useState([]);
  const location = useLocation();
  const viewClient = location.state ? location?.state?.merchants :location.state ? location?.state?.getDataById : null;
  const [getUserById, setGetUserById] = useState();
  const [paymentReleasedPopUp, setPaymentReleasedPopUp] = useState(false);
  const [paymentRelasedOrders, setPaymentRelasedOrders] = useState([]);
  const [getPaymentDetailById, setGetPaymentDetailById] = useState([]);
  const {value_count}=useRoleAsignData()
  const {adminUser}=useContext(AuthContext);
  const navigate=useNavigate()
  const getOrders = async () => {
    //  await fetch(`https://mserver.printbaz.com/getmyorder/${viewClient?.email}`) //for main site
    await fetch(`http://localhost:5000/getmyorder/${viewClient?.email}`)
    .then(res=>res.json())
    .then(data => setOrderAll(data))
    }
    const getPaymentReleasedOrdersByRefId = async () => {
      //  await fetch(`https://mserver.printbaz.com/getPaymentReleasedOrderByRegId/${viewClient?._id}`) //for main site
      await fetch(`http://localhost:5000/getPaymentReleasedOrderByRegId/${viewClient?._id}`)
      .then(res=>res.json())
      .then(data => setPaymentRelasedOrders(data))
      }
      console.log("paymentRelasedOrders....",paymentRelasedOrders)
      console.log("viewClient....",viewClient)
  useEffect(()=>{
 
    getOrders()
    // getPaymentReleasedOrdersByRefId()
},[orderAll])
  useEffect(()=>{
 getPaymentReleasedOrdersByRefId()
},[])
console.log("paymentRelasedOrders")
const [isenableOrderToReleasepaym,setIsenableOrderToReleasepaym]=useState(false)
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
// console.log("totalReturn",totalReturn)
// console.log("deliveryFee",deliveryFee)
// console.log("totalReturnAmmountBase",totalReturnAmmountBase)

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

// Fetch the latest payment made by user
let lastPayementDetail = getUserById?.payments?.length > 0 ? 
                         getUserById.payments[getUserById.payments.length-1] : null;
// console.log("getUserById",getUserById)
// Calculate the grand due amount
let grandDueNow = dueAmount;

if (lastPayementDetail && lastPayementDetail.paymentReleasedAmount) {
    grandDueNow -= lastPayementDetail.totalReleasedAmount;
}
// State to store selected orders
const [selectedOrders, setSelectedOrders] = useState([]);

// Function to handle order selection
const handleOrderSelect = (orderInfo) => {
  // Check if the order is already selected
  const isSelected = selectedOrders.some((selectedOrder) => selectedOrder.orderId === orderInfo._id);

  // If not selected, add it to the array; if selected, remove it
  if (!isSelected) {
    const selectedOrderData = {
      orderId: orderInfo._id,
      reciepientFirstname: orderInfo.name,
      clientName: orderInfo.clientName,
      regId: viewClient._id,
      userMail: orderInfo.userMail,
      recvMoney: orderInfo.recvMoney,
      collectAmount: orderInfo.collectAmount,
      address: orderInfo.address,
      areas: orderInfo.areas,
      districts: orderInfo.districts,
      zones: orderInfo.zones,
      phone: orderInfo.phone,
      printbazcost: orderInfo.printbazcost,
      reciepientLastname: orderInfo.lastName,
      discountToClient: orderInfo.discount,
      additionalCost: orderInfo.additionalCost,
      companyName: orderInfo.companyName,
      clientbrandName: orderInfo.clientbrandName,
      clientPaymentStatus:orderInfo.clientPaymentStatus,
      paymentStatus:orderInfo.paymentStatus,
      orderStatus:orderInfo.orderStatus,
      deliveryFee:orderInfo.deliveryFee
      


      
      // Add other properties you want to store
    };

    // Update state with the new selected order
    setSelectedOrders([...selectedOrders, selectedOrderData]);
  } else {
    // If already selected, remove it from the array
    const updatedSelectedOrders = selectedOrders.filter((selectedOrder) => selectedOrder.orderId !== orderInfo._id);
    setSelectedOrders(updatedSelectedOrders);
  }
};
 //sum of selected orders rcv amount
 let sumOfselectedRcvAMounToPaymentRelease = 0;
 let sumOfCollectAmount = 0;
 let sumOfdeliveryFee = 0;
 let newTotalBill=0
 const filteredOrdersOfSelectOrder = selectedOrders.filter(
  (order) =>
    order.orderStatus === 'delivered' &&
    order.paymentStatus === 'paid' 
    // order.clientPaymentStatus ==="paidToClient" 
    //  !order.clientPaymentStatus 
);
if (filteredOrdersOfSelectOrder?.length !== 0) {
  sumOfselectedRcvAMounToPaymentRelease = filteredOrdersOfSelectOrder?.reduce((sum, receiveAmount) => {
    let amount = parseInt(receiveAmount?.recvMoney);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0); // Initialize sum to 0
}
if (filteredOrdersOfSelectOrder?.length !== 0) {
  sumOfCollectAmount= filteredOrdersOfSelectOrder?.reduce((sum, collectAmount) => {
    let amount = parseInt(collectAmount?.collectAmount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0); // Initialize sum to 0
}
if (filteredOrdersOfSelectOrder?.length !== 0) {
  sumOfdeliveryFee = filteredOrdersOfSelectOrder?.reduce((sum, delivfee) => {
    let amount = parseInt(delivfee?.deliveryFee);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0); // Initialize sum to 0
}
console.log("sumOfselectedRcvAMounToPaymentRelease.....",sumOfselectedRcvAMounToPaymentRelease)
console.log("sumOfCollectAmount......",sumOfCollectAmount)
console.log("sumOfdeliveryFee......",sumOfdeliveryFee)
//totalbill is sum of all rcv money
if (PaymentStausPaid?.length !== 0) {
  newTotalBill = PaymentStausPaid?.reduce((sum, receiveAmount) => {
    let amount = parseInt(receiveAmount?.recvMoney);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0); // Initialize sum to 0
}
//total payment released
let getreleasedreleseAmountFromDb=0
if(getUserById?.paymentReleasedAmount){
  getreleasedreleseAmountFromDb=getUserById?.paymentReleasedAmount
}
else{
  getreleasedreleseAmountFromDb=0
}
let newReleasePaym=parseInt(getreleasedreleseAmountFromDb)+parseInt(sumOfselectedRcvAMounToPaymentRelease)
let newTotalPaymentReleased=(newReleasePaym>0?newReleasePaym:0);
// total return [sumofPrintbazcost+deliveryFee+deliveryFee/2]
let sumofReturnOrderPrintbazcost=0;
let sumofReturnOrderDeliveryFee=0
if (orderSatatusReturned?.length !== 0) {
  sumofReturnOrderPrintbazcost = orderSatatusReturned?.reduce((sum, pbCost) => {
    let amount = parseInt(pbCost?.printbazcost);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0); // Initialize sum to 0
}
if (orderSatatusReturned?.length !== 0) {
  sumofReturnOrderDeliveryFee = orderSatatusReturned?.reduce((sum, delivFee) => {
    let amount = parseInt(delivFee?.deliveryFee);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0); // Initialize sum to 0
}
let newTotalReturn=sumofReturnOrderPrintbazcost+sumofReturnOrderDeliveryFee+sumofReturnOrderDeliveryFee/2
//due amount=totalbill-(totalPaymentReleased+totalReturn)
let newTotalDue=newTotalBill-(newTotalPaymentReleased+newTotalReturn)
let totalnewDueAmount=newTotalDue>0?newTotalDue:0
const getOrderById=async()=>{
  // Fetch the updated order details
// await fetch(`https://mserver.printbaz.com/getUser/${viewClient?._id}`)
await fetch(`http://localhost:5000/getUser/${viewClient?._id}`)
.then(res=>res.json())
.then(data => {setGetUserById(data)})
}
const getPerSegmentPaymentDetailById=async()=>{
  // Fetch the updated order details
// await fetch(`https://mserver.printbaz.com/getPaymentDetailRegId/${viewClient?._id}`)
await fetch(`http://localhost:5000/getPaymentDetailRegId/${viewClient?._id}`)
.then(res=>res.json())
.then(data => {setGetPaymentDetailById(data)})
}
console.log("getPaymentDetailById.........",getPaymentDetailById)
useEffect(()=>{
  getPerSegmentPaymentDetailById()
       getOrderById()
      },[getUserById])
 

  const handleInputChange = async (e) => {
    const status = e.target.value; // the new status
    // status === "request" && setApprovalRequest("request");
    // status === "ban" && setApprovalRequest("ban");
    // status === "approved" && setApprovalRequest("approved");
 
    //  await fetch('https://mserver.printbaz.com/update-approval/${viewClient?._id') //for main site

    //   await fetch(`http://localhost:5000/update-approval/${viewClient?._id}`, { //for testing site
    try {
      const response = await fetch(
        // `https://mserver.printbaz.com/update-approval/${viewClient?._id}`,
        `http://localhost:5000/update-approval/${viewClient?._id}`,
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
    if (status === "paidToClient") {
      return "blue";
    }
    if (status === "returned") {
      return "red";
    }
    if (status === "cancel") {
      return "maroon";
    }
    if (status === "Pending") {
      return "orange";
    }

    // you can add more conditions here or just return a default color
    return "defaultColor";
  };
  const styles = {
    tabContainer: {
      display: 'flex',
      // justifyContent: 'space-between',
      marginBottom: '20px',
    },
    tabButton: {
      flex: 1,
      padding: '10px',
      textAlign: 'center',
      cursor: 'pointer',
      border: '1px solid #ddd',
      backgroundColor: '#f9f9f9',
      color: '#333',
      borderRadius:"10px",
      width:"100%",
      marginLeft:"10px"
    },
    activeTab: {
      backgroundColor: '#0d1552',
      color: 'white',
      borderRadius:"10px",
      width:"100%",
      marginLeft:"10px"
    },
  };
const handleDoPaymentPopUp=()=>{
  setPaymentReleasedPopUp(true)
}
const handlePaymentHistory=()=>{
  const merchantId = viewClient?._id;
  navigate(`/paymentHistory/${merchantId}`);
}
 

const [showPopUp,setShowPopUp]=useState(false)
const [isSuccess,setIsSuccess]=useState(false)
const [isLoading, setIsLoading] = useState(false);
const  showReleasePaymentpopUP=()=>{
  setShowPopUp(true)
}
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

  //  released order amiunt oer segment 

  
const  handleReleasePayment=async()=>{
  // console.log("totalnewDueAmount",totalnewDueAmount)
  // console.log("newTotalPaymentReleased",newTotalPaymentReleased)
  // console.log("newTotalBill",newTotalBill)
  // console.log("newTotalReturn",newTotalReturn)
  setIsLoading(true)
  try {

    // Create the repeated data structure
    const paymentData = {
      totalReturnAmmountBase: newTotalReturn,
      totalBill: newTotalBill,
      paymentReleasedAmount: newTotalPaymentReleased,
      paymentReleasedBy: viewClient?.email,
      paymentReleasedDate:formattedCurrentDate,
      dueAmountNow:totalnewDueAmount
    };
    const perSegmetReleasedOrderAmount={
      totalRecvableAmount:sumOfselectedRcvAMounToPaymentRelease,
      totalCollectAmount:sumOfCollectAmount,
      totalDeliveryFee:sumOfdeliveryFee,
      paymentReleasedBy: viewClient?.email,
      regId: viewClient?._id,
      clientNumber: viewClient?.phone,
      clinetBrandName: viewClient?.brandName,
      clientBrandLogo: viewClient?.brandLogoURL,
      clientName: viewClient?.name,
      clientAddress: viewClient?.address,
      clientEmail: viewClient?.email,
      paymentReleasedDate:formattedCurrentDate,
      segmentPayStatus:"Paid"
    }
  
     // Filter orders based on criteria (orderStatus delivered, payment status paid, and no clientPaymentStatus)
     const filteredOrders = selectedOrders.filter(
      (order) =>
        order.orderStatus === 'delivered' &&
        order.paymentStatus === 'paid' 
        // order.clientPaymentStatus ==="paidToClient" 
        //  !order.clientPaymentStatus 
    );
    if(filteredOrders.length===0){
      setIsenableOrderToReleasepaym(true)
      return
    }
  
    fetch(`http://localhost:5000/updateUserbyReleasedPay/${viewClient?._id}`, {
    // fetch(`https://mserver.printbaz.com/updateUserbyReleasedPay/${viewClient?._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server responded with a ${response.status} status.`);
      }
     if(response.ok){
      getOrderById()
      // Update clientPaymentStatus for specific orders in orderAll
    const updatedOrderAll = orderAll.map((orderAllData) => {
      // Check if orderAllData contains any orders that match the criteria
      if (filteredOrders.some((filteredOrder) => filteredOrder.orderId === orderAllData._id)) {
        orderAllData.clientPaymentStatus = "paidToClient";
      }
      return orderAllData;
    });

    // Send updated orderAll to the server or handle as needed
    const sendOrderAllResponse =  fetch(
      "http://localhost:5000/sendUpdatedOrderAll",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrderAll),
      }
    );

    if (sendOrderAllResponse.ok) {
      console.log("Orders and orderAll updated successfully:", updatedOrderAll);
      getOrders()
    } else {
      console.error("Error sending orders and orderAll:", sendOrderAllResponse.message);
    }
     }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    filteredOrders.forEach(async (order) => {
      order.clientPaymentStatus = 'paidToClient';
      order.paymentReleasedBy= adminUser?.email;
      order.paymentReleasedDate=formattedCurrentDate
    });

    const response = await fetch(
      // Replace the URL with your actual endpoint
      'http://localhost:5000/sendpaymentReleasedOrders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredOrders),
      }
    );

    const data = await response.json();
    if (response.status === 200) {
      // Handle success, for instance:
      setIsSuccess(true)
      const sendTotalPaymentReleasedData = await fetch(
        // Replace the URL with your actual endpoint
        'http://localhost:5000/sendpaymentDetail',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(perSegmetReleasedOrderAmount),
        }
      );
      const reselasedPayDetail = await sendTotalPaymentReleasedData.json();
  
    } else {
      // Handle error
      console.error('Error sending orders:', data.message);
    }
  } catch (error) {
    console.error('Network or server error:', error);
  }
  finally {
    setIsLoading(false); // Set loading status to false
  }
}
const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
  const [filterOrderId, setFilterOrderId] = useState('');
  const [filterName, setFilterName] = useState('');
const applyFilters = () => {
  return orderAll.filter((order) => {
    // Filter by status
    if (filterStatus !== 'all' && order.orderStatus !== filterStatus) {
      return false;
    }


    // Filter by payment status
    if (filterPaymentStatus && order.clientPaymentStatus !== filterPaymentStatus) {
      return false;
    }

    // Filter by order ID
    if (filterOrderId && !order._id.includes(filterOrderId)) {
      return false;
    } 
  
   
  
    // Filter by recipient name
    // if (filterName && !order.phone.includes(filterName)) {
    //   return false;
    // }
    if (filterName && order.phone.indexOf(filterName) === -1) return false;

    return true;
  });
};
const orderMap=applyFilters()
const sortedOrders = useMemo(() => {
  return orderMap
    .sort((a, b) => {
      const statusDateA = new Date(a.updatedAt || a.statusDate?.replace(" at ", " "));
      const statusDateB = new Date(b.updatedAt || b.statusDate?.replace(" at ", " "));
      const createdAtA = new Date(a.createdAt);
      const createdAtB = new Date(b.createdAt);

      const latestA = statusDateA > createdAtA ? statusDateA : createdAtA;
      const latestB = statusDateB > createdAtB ? statusDateB : createdAtB;

      return latestB - latestA; // Descending sort
    });
}, [orderMap]);
const handleInputSearchChange = (event) => {
  const { id, value } = event.target;
  switch (id) {
    case 'status-filter':
      setFilterStatus(value);
      break; 
       case 'paymentStatus-filter':
      setFilterPaymentStatus(value);
      break; 
       
    case 'id-filter':
      setFilterOrderId(value);
      break;
      case 'name-filter':
  setFilterName(value);
  break; 
 
    // ...other cases
    default:
      break;
  }
  
};
console.log("sortedOrders",sortedOrders)
 // State to track the active tab
 const [activeTab, setActiveTab] = useState('allOrders'); // 'allOrders' or 'invoice'

 // Function to handle tab change
 const handleTabChange = (tab) => {
   setActiveTab(tab);
 };
 const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
 const [selectedReleaseOrderId, setSelectedReleaseOrderId] = useState(null);
 const [selectedReleaseOrderRegId, setSelectedReleaseOrderRegId] = useState(null);
 
// Inside InvoiceDetail component
useEffect(() => {
  // Signal that the component has been rendered
  window.dispatchEvent(new Event('component-rendered'));
}, [selectedReleaseOrderId,
  selectedReleaseOrderRegId]);

// Inside your downloadInvoiceDetail function
const downloadInvoiceDetail = async (releaseOrderId, releaseOrderRegId) => {
  const tempElement = document.createElement('div');
  document.body.appendChild(tempElement);

  // Render InvoiceDetail in the temporary element
  ReactDOM.render(
    <InvoiceDetail
      releaseOrderId={releaseOrderId}
      releaseOrderRegId={releaseOrderRegId}
    />,
    tempElement
  );

  // Wait for the component to be rendered
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Capture a screenshot of the temporary element with html2canvas
  html2canvas(tempElement, { scale: 1 })
    .then((canvas) => {
      // Convert the canvas to a data URL
      const imgData = canvas.toDataURL('image/png');

      // Create a new PDF with jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Set the selected release order IDs before saving the PDF
      setSelectedReleaseOrderId(releaseOrderId);
      setSelectedReleaseOrderRegId(releaseOrderRegId);

      // Show the InvoiceDetail component
      setShowInvoiceDetail(true);

      // Save the PDF
      pdf.save("InvoiceDetail.pdf");

      // Remove the temporary element
      document.body.removeChild(tempElement);
    });
};



console.log("selectedReleaseOrderId",selectedReleaseOrderId)
console.log("selectedReleaseOrderRegId",selectedReleaseOrderRegId)



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
              
          
          <div className="bg-white p-4 shadow-sm mb-3 client-details">
                  <div className="row amu-title">
                    <div className="col-12">
                      <h3 className="all-title">Payments</h3>
                      <div className='flex' style={{alignItems:"center",justifyContent:"space-between"}}>
                      <h6>Total Payment Released:</h6>
                      <span style={{marginTop:"",color:"orange",fontSize:'16px'}}>{getUserById?.paymentReleasedAmount?getUserById?.paymentReleasedAmount:0} TK</span>
                      </div>
                      {
                      (lastPayementDetail &&  lastPayementDetail?.paymentReleasedAmount ) &&
                      <div className='flex' style={{alignItems:"center",justifyContent:"space-between"}}>
                      <p style={{color:"gray"}}>Previous Payment Released:</p>
                      <span style={{marginTop:"",color:"gray",fontSize:'16px'}}>{lastPayementDetail?.paymentReleasedAmount} TK</span>
                      </div>
                      }
                    <hr style={{color:"#c8c5c5"}}/>
                      <div className='flex' style={{alignItems:"center",justifyContent:"space-between"}}>
                      <h6>Total Bill:</h6>
                      <span style={{marginTop:"",color:"orange",fontSize:'16px'}}>{parseInt(getUserById?.totalBill?getUserById?.totalBill:0)} TK</span>
                      {/* <span style={{marginTop:"10px",color:"orange",fontSize:'16px'}}>{parseInt(getUserById?.totalBill?getUserById?.totalBill :statusPaidbase)} TK</span> */}
                      </div> 
                      <hr  style={{color:"#c8c5c5"}}/>
                      <div className='flex' style={{alignItems:"center",justifyContent:"space-between"}}>
                      <h6>Return Value:</h6>
                      <span style={{marginTop:"",color:"orange",fontSize:'16px'}}> {Number(getUserById?.totalReturnAmmountBase?getUserById?.totalReturnAmmountBase:0)} TK</span>
                      </div> 
                 <hr style={{color:"#c8c5c5"}}/>
                      <div className='flex'style={{alignItems:"center",justifyContent:"space-between"}}>
                      
                      <h6>Due Amount:</h6>
                      <span style={{marginTop:"",color:"orange",fontSize:'16px'}}>{Math.floor(getUserById?.dueAmount?getUserById?.dueAmount:0)} TK</span>
                      </div>
                   
                      
                    </div>
                    
                  </div>
                </div>
              
              </div>
             
             {/* ///////////////////////////////// */}
              <div className="col-lg-9 col-sm-12">
      <div className="client-order-list">
        <div className="mb-3">
     
        <div style={styles.tabContainer}>
            {/* Tab for All Orders */}
            <div className="col-lg-2 col-sm-12">
              <button
                style={{ ...styles.tabButton, ...(activeTab === 'allOrders' ? styles.activeTab : {}) }}
                onClick={() => handleTabChange('allOrders')}
              >
                All Orders
              </button>
            </div>
            {/* Tab for Invoice */}
            <div className="col-lg-2 col-sm-12">
              <button
                style={{ ...styles.tabButton, ...(activeTab === 'invoice' ? styles.activeTab : {}) }}
                onClick={() => handleTabChange('invoice')}
              >
                Invoice
              </button>
            </div>
          </div>
          {/* Content based on the active tab */}
          {activeTab === 'allOrders' && (
            <div className="allOrders">
              {/* ... (your existing code for displaying all orders) */}
              <div className="row mt-4 mb-4">
              <div className="col-12">
                <h2>All Orders</h2>
              </div>
            </div>
              <div className="row order-filter">
             
             <div className="col-lg-3 col-sm-12">
               <label htmlFor="id-filter" style={{marginBottom:"8px"}}>Order Id:</label>
               <input type="text" id="id-filter" className="form-control" value={filterOrderId}  onChange={handleInputSearchChange} />
             </div>
           
             <div className="col-lg-2 col-sm-12">
               <label htmlFor="paymentStatus-filter" style={{marginBottom:"8px"}}>Payment:</label>
               <select id="paymentStatus-filter" value={filterPaymentStatus} className="form-control" onChange={(e) =>  handleInputSearchChange(e)}>
                 <option value=''>none</option>
                 {/* <option value="">Unpaid</option> */}
                 <option value="paidToClient">Paid To Client</option>
               </select>
             </div>  
            
             <div className="col-lg-3 col-sm-12">
               <label htmlFor="status-filter" style={{marginBottom:"8px"}}>Status:</label>
               <select id="status-filter"  className="form-control" value={filterStatus} onChange={(e) =>  handleInputSearchChange(e)}>
                 <option   value="all">All</option>
                 <option value="Pending">Pending</option>
                 <option value="on hold artwork issue">On hold -  Artwork issue</option>
                 <option value="on hold billing issue">On hold - Billing Issue</option>
                 <option value="on hold out of stock">On hold - Out of Stock</option>
                 <option value="Approved">Approved</option>
                 <option value="confirmed">Confirmed</option>
                 <option value="in-production">In Production</option>
                 <option value="out for delivery">Out for delivery</option>
                <option value="delivered">Delivered</option>
                 {/* <option value="payment-released">Payment Released</option> */}
                 <option value="returned">Returned</option>
                 <option value="cancel">Cancel</option>
                 
               </select>
             </div>
             <div className="col-lg-3 col-sm-12">
             <div style={{marginBottom:"6px"}}></div>
             <br />
             {selectedOrders.length !== 0 ? (
   <button
   onClick={showReleasePaymentpopUP}
     style={{
       backgroundColor: '#4CAF50', // Green color for enabled state
       color: 'white',
       padding: '8px 20px',
       border: 'none',
       borderRadius: '4px',
       cursor: 'pointer',
       width:"100%"
     }}
   >
     Release Payment
   </button>
 ) : (
   <button
     disabled
     style={{
       backgroundColor: '#ccc', // Light gray color for disabled state
       color: '#666',
       padding: '8px 20px',
       border: 'none',
       borderRadius: '4px',
       cursor: 'not-allowed',
       width:"100%"
     }}
   >
     Release Payment
   </button>
 )}
             </div>  
              <div className="col-lg-1 col-sm-12 " style={{marginTop:"36px"}} >
             <span style={{cursor:"pointer",border:"1px solid #dad5d5",padding:"10px",borderRadius:"4px"}} onClick={downloadInfIntoXl} data-order-id="view-order-detail"><img style={{width:"30px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
             <div id="view-order-detail"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
             <GetMercahntOrderXl merchOrders={[merchOrders]}/>
         </div> 
         </div> 
             </div>
              <div className="allOrders">
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
                  {sortedOrders?.map((orderInfo, index) => {
     // You can conditionally update returnedAmount based on the orderStatus
     if (orderInfo?.orderStatus === "returned") {
      updateReturnedAmount(orderInfo._id, orderInfo.printbazcost, orderInfo.deliveryFee);
    }
     return(
                      <div className="row client-list">
                         <div className="col-lg-1 col-sm-12">
            <input
              type="checkbox"
              checked={selectedOrders.some((selectedOrder) => selectedOrder.orderId === orderInfo._id)}
              onChange={() => handleOrderSelect(orderInfo)}
            />
          </div>
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
                          <p className="p-status-btn" style={{backgroundColor: getViewClientColor(
                              orderInfo?.clientPaymentStatus
                            )}}>
                            {/* {orderInfo?.paymentStatus} */}
                            {orderInfo?.clientPaymentStatus?orderInfo?.clientPaymentStatus:"Unpaid To Client"}
                          </p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p>{Math.floor(orderInfo?.recvMoney)}TK</p>
                        </div>
                        <div className="col-lg-1 col-sm-12">
                          <p className="status-btn" style={{backgroundColor: getViewClientColor(
                              orderInfo?.orderStatus
                            )}}>{orderInfo?.orderStatus}</p>
                        </div>
                      </div>
                    )})}

</div>
            </div>
          )}

          {activeTab === 'invoice' && (
            <div className="invoice">
          {/* <div className="col-lg-1 col-sm-12 " style={{marginTop:"36px"}} >
             <span style={{cursor:"pointer",border:"1px solid #dad5d5",padding:"10px",borderRadius:"4px"}} onClick={downloadInfIntoXl} data-order-id="view-order-detail"><img style={{width:"30px",hight:"25px"}} src="/images/download.png" alt='download'/></span>
             <div id="view-order-detail"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
             <GetReleaseOrderXl paymentRelasedOrders={paymentRelasedOrders}/>
         </div> 
         </div>  */}
                   <Table responsive>
  <thead>
    <tr>
      <th>Payment Release Date</th>
      <th>Collect Amount</th>
      <th>Delivery Fee</th>
      <th>Rcv Amount</th>
      <th>Payment Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {getPaymentDetailById?.map((releaseOrder, index) => (
     
        <tr key={index}>
          
          <td>{releaseOrder?.paymentReleasedDate}</td>
          <td style={{ textAlign: "center" }}>{releaseOrder?.totalCollectAmount}</td>
          <td style={{ textAlign: "center" }}>{releaseOrder?.totalDeliveryFee}</td>
          <td style={{ textAlign: "center" }}>{releaseOrder?.totalRecvableAmount}</td>
          <td style={{ textAlign: "center" }}>{releaseOrder?.segmentPayStatus}</td>
          <td style={{ textAlign: "center" }}>
            <div className="view-client-title " style={{ marginRight: "10px" }}>
         
              <Button variant="warning" onClick={() => downloadInvoiceDetail(releaseOrder?._id, releaseOrder?.regId)}>
                <span><img style={{ width: "23px", height: "20px" }} src="/images/download.png" alt='download' /></span>PDF
              </Button>
           
             
             
              <Link to={`/invoice/${releaseOrder?._id}/${releaseOrder?.regId}`} state={{ releaseOrder }} key={index}> 
            
              <Button style={{backgroundColor:"#012970",marginTop:"8px",marginLeft:"5px"}} >
               View
              </Button>
              </Link>
             
            </div>
            {showInvoiceDetail && (
                <div  style={{ position: 'absolute', left: '-10000px', top: '-10000px' }}> 
        <InvoiceDetail
      
          releaseOrderId={selectedReleaseOrderId}
          releaseOrderRegId={selectedReleaseOrderRegId}
        />
        </div>
      )}
          </td>
        </tr>
    
    ))}
  </tbody>
</Table>

              
              {/* ... (your code for displaying invoices) */}
            </div>
          )}
        </div>
      </div>
    </div>
            </div>
            {
              showPopUp &&
              <ConfirmationPopUp
                isOpen={()=>setShowPopUp(true)}
                onClose={()=>setShowPopUp(false)}
                onConfirm={handleReleasePayment}
                message ="Do you want to release payment?"
              />
            }
            {
              isenableOrderToReleasepaym &&
              <MsgALert 
              message="you can release payments only for delivered,paid and unpaid to client orders!"
              onClose={()=>setIsenableOrderToReleasepaym(false)}
              />
            }
               {
  isLoading===true &&(
    <>
     <div className="alert-overlay"  />
       <div className="alert-box" >
     
         <Spinner  style={{padding:"20px"}} animation="grow" variant="warning" />
         
         <h2>Please wait!</h2>
       </div>
    </>
  )
  
}
      {isSuccess===true && (
          
          <OrderUpdateAlert
          message="Payment released successfully!"
          onClose={() => setIsSuccess(false)}
       
          
          
          />
          
          
          )
          
          
          }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;

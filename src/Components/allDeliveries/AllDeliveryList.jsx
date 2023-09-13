import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useGetDeliveryList from '../../hooks/useGetDeliveryList';
import Navigationbar from '../navigationBar/Navigationbar';
import DatePicker from 'react-datepicker';
import useGetMongoData from '../../hooks/useGetMongoData';
import ConfirmRole from '../alert/ConfirmRole';
import ConfirmDelete from '../alert/ConfirmDelete';
const AllDeliveryList = () => {
    const {deliveryAll}=useGetDeliveryList()
    const {orderAll}=useGetMongoData()
    const [isModalOpen, setModalOpen]= useState(false);
   console.log("deliveryAll",deliveryAll);
    const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDeliveryAssignStatus, setFilterDeliveryAssignStatus] = useState('');
    const [filterTrackingId, setFilterTrackingId] = useState('');
    const [orderIdFilter, setOrderIdFilter] = useState('');
    const [startDate,setStartDate]=useState(null);
    const [endDate,setEndDate]=useState(null);
    const [editing, setEditing] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20); 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const navigate=useNavigate()
    const backToDelivReport=()=>{
        navigate("/deliverySystem")
  }
  const handleChangeStartDate=(date)=>{
    setStartDate(date)
   
  }
  const handleChangeEndDate=(date)=>{
    setEndDate(date)
   
  }
  

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case 'deliveryStatus-filter':
        setFilterStatus(value);
        break; 
         case 'payment-filter':
        setFilterPaymentStatus(value);
        break;
   
    case 'deliveryAiign-filter':
      setFilterDeliveryAssignStatus(value);
    break; 
    case 'trackingId-filter':
    setFilterTrackingId(value);
    break;
     case 'orderId-filter':
      setOrderIdFilter(value);
    break;
      // ...other cases
      default:
        break;
    }
    
  };
  let deliveriesDeliverySystem=deliveryAll
  let ordersForDeliverySystem=orderAll
  function syncArrays(sourceArray, targetItem) {
    const sourceItem = sourceArray.find(item => item._id === targetItem.orderId);
    return sourceItem && sourceItem.orderStatus !== targetItem.orderStatus
      ? { ...targetItem, orderStatus: sourceItem.orderStatus }
      : targetItem;
  }
  function parseStatusDate(statusDate) {
    // Replace 'at' with ',' to unify the format
    const cleanedStatusDate = statusDate.replace(' at ', ', ');
  
    // Try to parse it into a JavaScript Date object
    const parsedDate = new Date(cleanedStatusDate);
  
    // Check if the date is valid
    if (isNaN(parsedDate)) {
      console.error("Invalid date format");
      return null;
    }
  
    return parsedDate;
  }
  
   
  const applyFilters = () => {
    deliveriesDeliverySystem = syncArrays(ordersForDeliverySystem, deliveriesDeliverySystem);
    return deliveryAll.filter((order) => {
      
      // console.log("order from applyFilters",order?.trackingId);
      // Filter by status
      if (filterStatus !== 'all' && order.orderStatus !== filterStatus) {
        return false;
      }
   // Filter by delivery assign
      if (filterDeliveryAssignStatus !== '' && order?.deliveryAssignTo !== filterDeliveryAssignStatus) {
        return false;
      }
  
      // Filter by payment status
      if (filterPaymentStatus && order?.paymentStatus !== filterPaymentStatus) {
        return false;
      }
  
      // Filter by order ID
      if (orderIdFilter && !order.orderId.includes(orderIdFilter)) {
        return false;

      } 
      
     
         // Filter by tracking ID
    if (filterTrackingId) {
      if (!order?.trackingId) {
        return false; // Skip this order if trackingId is undefined or null
      }
      if (!order.trackingId.includes(filterTrackingId)) {
        return false; // Skip this order if trackingId doesn't match the filter
      }
    }

      if (order && order?.statusDate) {
        const formattedStatusDate = order.statusDate;
    
        // Check if formattedStatusDate is not an empty string
        if (formattedStatusDate.trim() === '') {
          console.error("statusDate is empty.");
          return false;
        }
    
        const userDate = parseStatusDate(formattedStatusDate);
        if (!userDate) return false;
    // 
        // console.log("User Date:", userDate); // Debugging line
    
        if (startDate && endDate) {
          // Both start and end dates are selected
          const start = new Date(startDate);
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999); // Set to end of the day
          
          // console.log("Start and End Dates:", start, end); // Debugging line
    
          if (userDate < start || userDate > end) return false;
    
        } else if (startDate) {
          // Only start date is selected
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0); // Set to start of the day
    
          // console.log("Start Date:", start); // Debugging line
    
          if (userDate < start) return false;
    
        } else if (endDate) {
          // Only end date is selected
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999); // Set to end of the day
    
          // console.log("End Date:", end); // Debugging line
    
          if (userDate > end) return false;
        }
    
        return true;  // Return true if none of the conditions to return false are met
    
      }
   
  
      return true;
    });
  };
  const deliveryMap=applyFilters()
  console.log("orderAll",orderAll);
  // Utility function to calculate delivery fee
function calculateDeliveryFee(list) {
  console.log("Input to calculateDeliveryFee", list);
  let deliveryFeeForOthers = 0;
  let deliveryFeeForPathao = 0;

  // Initialize variables for the logic
  let deliveryFeeInsideDhaka = 0;
  let deliveryFeeInsideDhakaForPathao = 0;
  const baseDeliveryFee = 70;
  const baseDeliveryFeeForPathao = 70 + (list?.collectAmount * 0.01);
  const additionalDeliveryFee = 15;
  let QuantityBase = 0;
  let totalQuantity = 0;

  let deliveryFeeOutSideDhaka = 0;
  let deliveryFeeOutSideDhakaForPathao = 0;
  const baseDeliveryFeeOutSideDhaka = 100;
  const baseDeliveryFeeOutSideDhakaForPathao = 100 + (list?.collectAmount * 0.01);
  const additionalDeliveryFeeOutSideDhaka = 25;

  for (let j = 0; j < list?.orderDetailArr?.length; j++) {
    QuantityBase = Number(list?.orderDetailArr[j]?.quantity);
    totalQuantity = Number(QuantityBase + totalQuantity);

    // Calculate delivery fee inside Dhaka
    if (list?.orderDetailArr?.length > 0) {
      const groups = Math.floor(totalQuantity / 5);
      const remainder = totalQuantity % 5;

      if (groups === 0) {
        deliveryFeeInsideDhaka = baseDeliveryFee;
        deliveryFeeInsideDhakaForPathao = baseDeliveryFeeForPathao;
      } else if (remainder === 0) {
        deliveryFeeInsideDhaka = baseDeliveryFee + (groups - 1) * additionalDeliveryFee;
        deliveryFeeInsideDhakaForPathao = baseDeliveryFeeForPathao + (groups - 1) * additionalDeliveryFee;
      } else {
        deliveryFeeInsideDhaka = baseDeliveryFee + groups * additionalDeliveryFee;
        deliveryFeeInsideDhakaForPathao = baseDeliveryFeeForPathao + groups * additionalDeliveryFee;
      }
    }

    // Calculate delivery fee outside Dhaka
    if (list?.orderDetailArr[j]?.quantity > 0) {
      const groups = Math.floor(totalQuantity / 5);
      const remainder = totalQuantity % 5;

      if (groups === 0) {
        deliveryFeeOutSideDhaka = baseDeliveryFeeOutSideDhaka;
        deliveryFeeOutSideDhakaForPathao = baseDeliveryFeeOutSideDhakaForPathao;
      } else if (remainder === 0) {
        deliveryFeeOutSideDhaka = baseDeliveryFeeOutSideDhaka + (groups - 1) * additionalDeliveryFeeOutSideDhaka;
        deliveryFeeOutSideDhakaForPathao = baseDeliveryFeeOutSideDhakaForPathao + (groups - 1) * additionalDeliveryFeeOutSideDhaka;
      } else {
        deliveryFeeOutSideDhaka = baseDeliveryFeeOutSideDhaka + groups * additionalDeliveryFeeOutSideDhaka;
        deliveryFeeOutSideDhakaForPathao = baseDeliveryFeeOutSideDhakaForPathao + groups * additionalDeliveryFeeOutSideDhaka;
      }
    }
  }

  if (list?.deliveryArea === "outside dhaka") {
    deliveryFeeForOthers = deliveryFeeOutSideDhaka;
    deliveryFeeForPathao = deliveryFeeOutSideDhakaForPathao;
  } else {
    deliveryFeeForOthers = deliveryFeeInsideDhaka;
    deliveryFeeForPathao = deliveryFeeInsideDhakaForPathao;
  }


  // Return the calculated fees
  return { deliveryFeeForOthers,
     deliveryFeeForPathao,
     deliveryFeeOutSideDhaka,
     deliveryFeeOutSideDhakaForPathao,
     deliveryFeeInsideDhaka,
     deliveryFeeInsideDhakaForPathao
    };
}

  let printbazRcv=0
  useEffect(()=>{
    console.log("Test call to calculateDeliveryFee", calculateDeliveryFee({/* dummy data */}));
    const fetchData = async () => {
    // Process and update the delivery list here
const allPromises=orderAll.map(async (getSpecificOrderById) => {
  console.log("getSpecificOrderById", getSpecificOrderById);

  const {  deliveryFeeOutSideDhaka,
    deliveryFeeOutSideDhakaForPathao,
    deliveryFeeInsideDhaka,
    deliveryFeeInsideDhakaForPathao } = calculateDeliveryFee(getSpecificOrderById);
    const deliveryFee = (getSpecificOrderById.deliveryAssignTo === "pathao" 
  && getSpecificOrderById?.area === "outside dhaka") ? deliveryFeeOutSideDhakaForPathao 
  : (getSpecificOrderById.deliveryAssignTo === "pathao" 
  && getSpecificOrderById?.area === "inside dhaka") ? deliveryFeeInsideDhakaForPathao
  : (getSpecificOrderById.deliveryAssignTo === "others" 
  && getSpecificOrderById?.area === "inside dhaka") ? deliveryFeeInsideDhaka
  : (getSpecificOrderById.deliveryAssignTo === "others" 
  && getSpecificOrderById?.area === "outside dhaka") ? deliveryFeeOutSideDhaka
  : 0; // Default value if none of the conditions match

  // console.log("deliveryFeeForOthers from funct", deliveryFeeOutSideDhakaForPathao); // make sure this logs the expected value
   const returnValue=Number(getSpecificOrderById?.printbazcost)+Number(getSpecificOrderById?.deliveryFee)
   const deliveryData = {
       orderId: getSpecificOrderById._id,
       statusDate: getSpecificOrderById.statusDate,
       collectAmount: getSpecificOrderById.collectAmount,
       trackingId: getSpecificOrderById?.trackingId,
       recvMoney: getSpecificOrderById.recvMoney,
       printbazcost: getSpecificOrderById.printbazcost,
       orderStatus: getSpecificOrderById.orderStatus,
       paymentStatus: getSpecificOrderById.paymentStatus,
       deliveryAssignTo: getSpecificOrderById.deliveryAssignTo,
       deliveryArea:getSpecificOrderById?.area,
       orderDetailArrr:getSpecificOrderById?.orderDetailArr,
       deliveryFee:deliveryFee,
      
      // deliveryFeeForDeliveryTiger:"",
      printBazRcvable: printbazRcv,
       returnValue: getSpecificOrderById.orderStatus === "returned" ? returnValue : 0,
      //  deliveryFeeForAdmin: deliveryAll?.deliveryFeeForAdmin?deliveryAll?.deliveryFeeForAdmin:'',
       deliveryFeeForClient: getSpecificOrderById.deliveryFee
   };

   if (['out for delivery', 'delivered', 'returned'].includes(getSpecificOrderById.orderStatus.toLowerCase())) {
       // Add/update the data in the DeliveryList
       const deliveryResponse = await fetch('https://mserver.printbaz.com/addOrUpdateDeliveryList', {
          //  const deliveryResponse = await fetch('http://localhost:5000/addOrUpdateDeliveryList', {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(deliveryData),
       });
       // console.log("Success:", getSpecificOrderById);
       // Update your state or perform any other necessary operations with the updated viewClient object
   // Fetch delivery list from the API and update local storage
   // Similar to how you fetch orders and update the delivery list in your previous code
   // Update local storage for delivery list
  //  localStorage.setItem('deliveryList', JSON.stringify(deliveryResponse));
   }
});

   
    // Wait for all fetch requests to complete
    await Promise.all(allPromises);
    }

    fetchData();
},[ orderAll ])
  console.log("deliveryMap",deliveryMap);
  console.log("indexOfLastItem",indexOfLastItem);
  const actualIndexOfLastItem = indexOfLastItem > deliveryMap.length ? deliveryMap.length : indexOfLastItem;
     //  calculate the total sum of printbazRcv
     const totalPrintbazRcv = (deliveryMap || []).reduce((acc, list) => {
      let amount = 0;
    
      // Debug: Print list object and its properties to console to inspect
      console.log("List: ", list);
      console.log("orderStatus: ", list?.orderStatus);
      console.log("deliveryAssignTo: ", list?.deliveryAssignTo);
      console.log("collectAmount: ", list?.collectAmount);
      console.log("deliveryFee: ", list?.deliveryFee);
      console.log("deliveryFeeForDeliveryTiger: ", list?.deliveryFeeForDeliveryTiger);
    
      if (list?.orderStatus === "returned") {
        if(list?.deliveryAssignTo === "delivery tiger") {
          amount = 0 - (list?.deliveryFeeForDeliveryTiger ? Number(list?.deliveryFeeForDeliveryTiger) : 0);
        } else {
          amount = 0 - Number(list?.deliveryFee || 0); // Fallback to 0 if list?.deliveryFee is null or undefined
        }
      } else {
        if(list?.deliveryAssignTo === "delivery tiger") {
          amount = Number(list?.collectAmount || 0) - (list?.deliveryFeeForDeliveryTiger ? Number(list?.deliveryFeeForDeliveryTiger) : 0);
        } else {
          amount = Number(list?.collectAmount || 0) - Number(list?.deliveryFee || 0); // Fallback to 0 if list?.deliveryFee is null or undefined
        }
      }
    
      // Debug: Print calculated amount to console
      console.log("Calculated amount: ", amount);
    
      return acc + amount;
    }, 0);
    
    // Debug: Print totalPrintbazRcv to console
    console.log("Total Printbaz Received: ", totalPrintbazRcv);
console.log("totalPrintbazRcv",totalPrintbazRcv);
const totalReceivable = (deliveryMap || []).reduce((acc, list) => {
  if (list?.paymentStatus === "paid") {
    // Skip this value and continue with the accumulation
    return acc;
  }

  let amount = 0;
  if (list?.orderStatus === "returned") {
    if(list?.deliveryAssignTo === "delivery tiger"){
      amount = 0 - (list?.deliveryFeeForDeliveryTiger ? Number(list?.deliveryFeeForDeliveryTiger) : 0);
    } else {
      amount = 0 - Number(list?.deliveryFee || 0); // Use fallback value of 0
    }
  } else {
    if(list?.deliveryAssignTo === "delivery tiger"){
      amount = Number(list?.collectAmount || 0) - (list?.deliveryFeeForDeliveryTiger ? Number(list?.deliveryFeeForDeliveryTiger) : 0);
    } else {
      amount = Number(list?.collectAmount || 0) - Number(list?.deliveryFee || 0); // Use fallback value of 0
    }
  }

  return acc + amount;
}, 0);

console.log("Total Receivable: ", totalReceivable);

  const deleteDelivery = async (orderId) => {
    try {
      // const response = await fetch(`http://localhost:5000/deleteDelivery/${orderId}`, {
      const response = await fetch(`https://mserver.printbaz.com/deleteDelivery/${orderId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log("Successfully deleted");
        
        // Refresh your data or remove the item from your local state to reflect the deletion
      } else {
        console.error('Delete Error:', response);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const handleModalClose = () => {
    // Close the modal when the "Cancel" button is clicked
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // Show the modal when the "Create Role" button is clicked
    setModalOpen(true);
  };
  function convertDatabaseDateToJSDate(dbDate) {
    // remove the 'at' and extra commas
    const cleanedDate = dbDate.replace(' at ', ', ').replace(',', '');
    return new Date(cleanedDate);
  }
  
  // update delivery admin 

  const handleEditChange = async (e, orderId) => {
    const updatedDeliveryFee = e.target.value;
    console.log("updatedDeliveryFee",updatedDeliveryFee);
    try {
      const response = await fetch(`https://mserver.printbaz.com/updateDeliveryFee/${orderId}`, {
      // const response = await fetch(`http://localhost:5000/updateDeliveryFee/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deliveryFeeForDeliveryTiger: updatedDeliveryFee }),
      });
    
      if (response.ok) {
        console.log("Successfully updated");
        // Here you can also update your local state to reflect the change
        // For example: setDeliveryMap(updatedMap)
      } else {
        console.error('Update Error:', response);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const toggleEditing = (orderId) => {
    setEditing(editing === orderId ? null : orderId);
  };
  const totalCollectAmount = deliveryMap?.reduce((acc, curr) => acc +parseFloat (curr.collectAmount || 0), 0);
  const totalDeliveryAmount = deliveryMap?.reduce((acc, curr) => {
    if (curr?.deliveryAssignTo === "delivery tiger") {
      return acc + parseFloat(curr.deliveryFeeForDeliveryTiger || 0);
    } else {
      return acc + parseFloat(curr.deliveryFee || 0);
    }
  }, 0);
  
  const totalCollectAmountByCourier = deliveryMap?.reduce((acc, curr) => acc + parseFloat(curr.cashCollectNyCourier || 0), 0);
  const totalReturnAmount = deliveryMap?.reduce((acc, curr) => acc + parseFloat(curr.returnValue || 0), 0);
   return (
        <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n        * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n.status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #4caf50;\n    color: #fff !important;\n    font-weight: bold;\n    border: none;\n}\n\n\n.sales_report {\n    margin: 50px;\n}\n\n.seals_report_title h1{\n    margin-bottom: 50px;\n    font-weight: 600;\n}\n\n#cardbox1 {\n    -moz-box-shadow: 0 0 5px #888;\n    -webkit-box-shadow: 0 0 5px #888;\n    box-shadow: 0 0 5px #888;\n    color: #e4e5e7;\n    cursor: pointer;\n    background-color: #001846;\n    height: 130px;\n    margin-bottom: 25px;\n    border-radius: 4px;\n}\n\n.statistic-box {\n    padding: 25px;\n}\n\n.pull-right {\n    font-size: 22px !important;\n}\n\n.statistic-box h3 {\n    margin-top: 5px;\n    font-weight: 600;\n    font-size: 22px;\n}\n\n/* Total Number Of Tee Shirts Sold */\n\n.lobipanel {\n    background: white;\n    padding: 25px;\n    margin-top: 25px;\n    margin-bottom: 25px;\n    box-shadow: 0 0 5px #88888850;\n    border-radius: 4px;\n}\n\n.panel-title{\n    padding-bottom: 15px;\n    border-bottom: #001846 1px solid;\n}\n\n.panel-title h4{\n    font-size: 25px;\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n.panel-button button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 48%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n}\n\n.panel-button button:hover {\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n}\n\n#overlay {\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: #999;\n    width: 100%;\n    height: 100%;\n    opacity: 0.5;\n    z-index: 100;\n  }\n  #popup {\n    display: none;\n    position: absolute;\n    top: 25%;\n    background: #fff;\n    width: 90%;\n    height: 35%;\n    z-index: 200;\n    border-radius: 15px;\n  }\n  #popupclose {\n    float: right;\n    font-weight: 700;\n    font-size: 20px;\n    padding: 10px;\n    cursor: pointer;\n  }\n  .popupcontent {\n    padding: 10px;\n  }\n  #button {\n    cursor: pointer;\n  }\n\n  /* popup box */\n\n  .popupcontent {\n    padding: 40px;\n  }\n\n  .popup-title-01 {\n    margin-bottom: 50px;\n  }\n\n  .popup-title-01 h2{\n    font-size: 30px;\n    font-weight: 600;\n    color: #001846;\n    text-transform: uppercase;\n    position: relative;\n    text-align: center;\n  }\n\n  .popup-title-01 h2::before{\n        content: \"\";\n        display: block;\n        width: 100%;\n        height: 3px;\n        background: #001846;\n        left: 0;\n        top: 100%;\n        position: absolute;\n  }\n\n   .popup-title-02 h3{\n    font-size: 20px;\n    font-weight: 600;\n  }\n\n  .popup-title-03 h4{\n    font-size: 18px;\n    margin-bottom: 20px;\n  }\n\n  .popupcontent input{\n    width: 100px;\n  }\n\n   .popupcontent button{\n    margin-top: 20px;\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 100%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .popupcontent button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n\n    .panel-button-tr input {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 32%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .panel-button-tr button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 32%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n   .panel-button-tr button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n    " }} />
       <Navigationbar/>
        <section className="sales_report">
        <div className="row">
              <div className="col-12">
                <div className="seals_report_title">
                  <h1>Delivery Report</h1>
                </div>
              </div>
            </div>
            <div className="row non-input-bar-01">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3>Amount Receivable</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">{totalReceivable.toFixed(2)}</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        <div className="row">
           <div  className="row col-lg-12 col-sm-12" >
           <div className="col-lg-2 col-sm-12">
              <label htmlFor="trackingId-filter" className="form-label">Tracking Id:</label>
              <input type="text" id="trackingId-filter" value={filterTrackingId} className="form-control" onChange={(e) =>  handleInputChange(e)} />
            </div> 
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="orderId-filter" className="form-label">Order Id:</label>
              <input type="text" id="orderId-filter" value={orderIdFilter} className="form-control" onChange={(e) =>  handleInputChange(e)} />
            </div><div className="col-lg-1 col-sm-12">
              <label htmlFor="deliveryStatus-filter" className="form-label">Delivery Status:</label>
              <select id="deliveryStatus-filter"  className="form-control" onChange={(e) =>  handleInputChange(e)}>
                <option value="all"> All</option>
                <option value="out for delivery">Out for delivery</option>
                 <option value="delivered">Delivered</option>
                 <option value="returned">Returned</option>
                </select>
            </div><div className="col-lg-1 col-sm-12">
              <label htmlFor="payment-filter" className="form-label">Payment status:</label>
              <select id="payment-filter" value={filterPaymentStatus} className="form-control" onChange={(e) =>  handleInputChange(e)}>
              <option value=''>none</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="paid">Paid</option>  
                </select>
            </div><div className="col-lg-2 col-sm-12">
              <label htmlFor="deliveryAiign-filter" className="form-label">Delivery Assign To:</label>
              <select id="deliveryAiign-filter" value={filterDeliveryAssignStatus} className="form-control" onChange={(e) =>  handleInputChange(e)}>
                <option value=""> None</option>
                <option value="pathao"> Pathao</option>
                          <option value="delivery tiger">Delivery Tiger</option>
                          <option value="others">Others</option>
                </select>
            </div>
            
            <div className="col-lg-2 col-sm-12">
                  <label htmlFor="startDate" className="form-label">Start Date</label>

                                   <DatePicker className='form-control' value={startDate} selected={startDate} onChange={handleChangeStartDate} selectsStart startDate={startDate} endDate={endDate} />
                
                  </div>   
                   <div className="col-lg-2 col-sm-12">
               
                 
                  <label style={{textAlign:"start"}} htmlFor="endDate" className="form-label">End Date</label>
                  <DatePicker className='form-control' selected={endDate} value={endDate} onChange={handleChangeEndDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
                  </div>
           </div>
            
                
          </div>
       
          <div className="row input-bar-01">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="lobipanel">
                <div className="panel-title flex">
                  <h4>Delivery List</h4>
                  <div style={{textAlign:"right"}}>
          <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItem  } of {deliveryMap.length}</span>
    <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
    <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(deliveryMap.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
   
          </div>
                </div>
            
                <div className="panel-body" >
                  <table className="table" >
                    <thead>
                    <tr>
                          <th>Date</th>
                          <th>Order ID</th>
                          <th>Tracking ID</th>
                          <th>Cash Collection Amount</th>
                          <th>Area</th>
                          <th>Delivery Assign To</th>
                          <th>Delivery Fee</th>
                          <th>Delivery Status</th>
                          <th>Printbaz Receivable</th>
                          <th>Payment Status</th>
                          <th>Return Value</th>
                        </tr>
                    </thead>
                    <tbody>
                   
                    {
   deliveryMap
   ?.slice(indexOfFirstItem, indexOfLastItem)
   .sort((a, b) => {
    const dateA = convertDatabaseDateToJSDate(a?.statusDate);
    const dateB = convertDatabaseDateToJSDate(b?.statusDate);
    if(dateA && dateB) {
      return dateB - dateA; // sort in descending order
    } else if (dateA) {
      return -1; // If dateA exists but dateB does not, place A before B
    } else if (dateB) {
      return 1; // If dateB exists but dateA does not, place B before A
    }
    return 0; // If neither exist, don't sort them
  })
   ?.map((list, index) => {
    // const syncedListItem = syncArrays(orderAll, list);
    // console.log("syncedListItem",syncedListItem);
       let date = new Date(list?.date); 
       let options = { year: 'numeric', month: 'long', day: 'numeric' }; 
       let formattedDate = date.toLocaleDateString('en-US', options); 
    
     
    
    // delivery fee for admin 
    let deliveryFeeForOthers,deliveryFeeForPathao;
  let deliveryFeeInsideDhaka = 0;
  let deliveryFeeInsideDhakaForPathao = 0;
  const baseDeliveryFee = 70;
  const baseDeliveryFeeForPathao = 70+(list?.collectAmount*0.01);
  const additionalDeliveryFee = 15;
  let QuantityBase=0
  let totalQuantity=0;

  let deliveryFeeOutSideDhaka = 0;
  let deliveryFeeOutSideDhakaForPathao = 0;
  const baseDeliveryFeeOutSideDhaka = 100;
  const baseDeliveryFeeOutSideDhakaForPathao = 100+(list?.collectAmount*0.01);
  const additionalDeliveryFeeOutSideDhaka = 25;
  console.log("list",list?.orderDetailArrr);
  for  (var j = 0; j < list?.orderDetailArrr?.length; j++) {
    QuantityBase=Number( list?.orderDetailArrr[j]?.quantity)
    totalQuantity =Number(QuantityBase+totalQuantity)
 
 console.log("QuantityBase",QuantityBase);
 // Calculate delivery fee inside Dhaka
if (list?.orderDetailArrr?.length > 0) {
  const groups = Math.floor(totalQuantity / 5);
  const remainder = totalQuantity % 5;

  if (groups === 0) {
    deliveryFeeInsideDhaka = baseDeliveryFee;
    deliveryFeeInsideDhakaForPathao = baseDeliveryFeeForPathao;
  } else if (remainder === 0) {
    deliveryFeeInsideDhaka = baseDeliveryFee + (groups - 1) * additionalDeliveryFee;
    deliveryFeeInsideDhakaForPathao = baseDeliveryFeeForPathao + (groups - 1) * additionalDeliveryFee;
  } else {
    deliveryFeeInsideDhaka = baseDeliveryFee + groups * additionalDeliveryFee;
    deliveryFeeInsideDhakaForPathao = baseDeliveryFeeForPathao + groups * additionalDeliveryFee;
  }
  }

// outside dhaka

  if (list?.orderDetailArrr[j]?.quantity > 0) {
    // Calculate the number of groups of 5 items in the order
    const groups = Math.floor(totalQuantity / 5);

    // Calculate the remainder
    const remainder = totalQuantity % 5;

    // Calculate the delivery fee
    if (groups === 0) {
      deliveryFeeOutSideDhaka = baseDeliveryFeeOutSideDhaka;
      deliveryFeeOutSideDhakaForPathao = baseDeliveryFeeOutSideDhakaForPathao;
    } else if (remainder === 0) {
      deliveryFeeOutSideDhaka =baseDeliveryFeeOutSideDhaka +(groups - 1) * additionalDeliveryFeeOutSideDhaka;
      deliveryFeeOutSideDhakaForPathao =baseDeliveryFeeOutSideDhakaForPathao +(groups - 1) * additionalDeliveryFeeOutSideDhaka;
    } else {
      deliveryFeeOutSideDhaka =baseDeliveryFeeOutSideDhaka +groups * additionalDeliveryFeeOutSideDhaka;
      deliveryFeeOutSideDhakaForPathao =baseDeliveryFeeOutSideDhakaForPathao +groups * additionalDeliveryFeeOutSideDhaka;
    }
  }
  }

  if (list?.deliveryArea === "outside dhaka") {
    console.log("out side",list?.deliveryArea);
    deliveryFeeForOthers = deliveryFeeOutSideDhaka;
    deliveryFeeForPathao = deliveryFeeOutSideDhakaForPathao;
  } else {
    console.log("inside",list?.deliveryArea);
    deliveryFeeForOthers = deliveryFeeInsideDhaka;
    deliveryFeeForPathao = deliveryFeeInsideDhakaForPathao;
  }
console.log("deliveryFeeForOthers",deliveryFeeForOthers + list?.deliveryArea);
console.log("deliveryFeeForPathao",deliveryFeeForPathao + list?.deliveryArea);
if(list?.orderStatus==="returned"){
  if(list?.deliveryAssignTo==="delivery tiger"){
    printbazRcv=0-(list?.deliveryFeeForDeliveryTiger)
  }
  else{
    printbazRcv=0-(list?.deliveryFee)
  }
   
 }
 else{

   if(list?.deliveryAssignTo==="delivery tiger"){
    printbazRcv=(list?.collectAmount)-(list?.deliveryFeeForDeliveryTiger)
   
   } 
   else{
    printbazRcv=(list?.collectAmount)-(list?.deliveryFee)
   }
  // else if(list?.deliveryAssignTo==="pathao"){
  //   printbazRcv=(list?.collectAmount)-(deliveryFeeForPathao)
   
  //  }else if(list?.deliveryAssignTo==="delivery tiger"){
  //   printbazRcv=(list?.collectAmount)-(list?.deliveryFeeForAdmin)
   
  //  }

 }
       return (
           <tr className="info" >
               <td>{list?.statusDate}</td>
               <td><a href={`/viewOrder/${list?.orderId}`} target="_blank" rel="noreferrer">{list?.orderId}</a></td>
             
               <td>{list?.trackingId}</td>
               <td>{list?.collectAmount} TK</td>
               <td>{list?.deliveryArea}</td>
               <td>{list?.deliveryAssignTo}</td>
               <td>
  {(() => {
    if (list?.deliveryAssignTo==="others") {
      return deliveryFeeForOthers;
    } else if (list?.deliveryAssignTo==="delivery tiger") {
      return editing === list?.orderId ? (
        <input
          type="number"
          defaultValue={list?.deliveryFeeForDeliveryTiger}
          onBlur={() => toggleEditing(null)} // Stop editing when focus is lost
          onChange={(e) => handleEditChange(e, list?.orderId)}
        />
      )
       : (
        `${list?.deliveryFeeForDeliveryTiger?list?.deliveryFeeForDeliveryTiger : ''} TK`
      );
    } 
    else if (list?.deliveryAssignTo==="pathao") {
      return deliveryFeeForPathao;
    }
  })()}
  {
    list?.deliveryAssignTo==="delivery tiger" &&
    <button
    style={{
      fontSize: "15px",
      color: "black",
      cursor: "pointer",
      border: "none",
      backgroundColor: "none",
      marginLeft: "10px",
    }}
    onClick={() => toggleEditing(list?.orderId)}
  >
    {editing === list?.orderId ? "Save" : <i className="fa fa-edit"></i>}
  </button>
  }

</td>
    {
      list?.orderStatus==="returned" &&
      <td><p className="status-btn" style={{backgroundColor:"red",color:"white"}}>{list?.orderStatus}</p></td>
   
    } 
    {
      list?.orderStatus==="out for delivery" &&
      <td><p className="status-btn" style={{backgroundColor:"orange",color:"white"}}>{list?.orderStatus}</p></td>
   
    }
    {
      list?.orderStatus==="delivered" &&
      <td><p className="status-btn" >{list?.orderStatus}</p></td>
   
    }
             
               <td>{printbazRcv ? printbazRcv: Number(0)} TK</td>
           
               <td > <p className="status-btn" > {list?.paymentStatus}</p> </td>
               <td style={{color:"red"}}>{list?.returnValue} TK</td>
               {/* <td> <button onClick={handleSubmit} style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button></td>
               <ConfirmDelete isOpen={ isModalOpen} onClose={handleModalClose} orderId={list?.orderId} onConfirm={() => deleteDelivery(list?.orderId)}/> */}

           </tr>
       );
   })
   
}
  <tr className="info">
                        <td style={{fontWeight: 700}}>Total</td>
                        <td style={{fontWeight: 700}} />
                        <td style={{fontWeight: 700}} />
                        <td style={{fontWeight: 700}}>{totalCollectAmount} TK</td>
                        <td style={{fontWeight: 700}} />
                        <td style={{fontWeight: 700}} />
                        <td style={{fontWeight: 700}}>{totalDeliveryAmount.toFixed(2)} TK</td>
                        <td style={{fontWeight: 700}} />
                        <td style={{fontWeight: 700}}>{Number(totalPrintbazRcv).toFixed(2)} TK</td>
                        <td style={{fontWeight: 700}} />
                        <td style={{fontWeight: 700}}>{totalReturnAmount} TK</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              
              
              
              
              </div>
            </div>
          </div>
      
       
        </section>
      </div>
    );
};

export default AllDeliveryList;
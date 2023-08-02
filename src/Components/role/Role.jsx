import { async } from '@firebase/util';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmRole from '../alert/ConfirmRole';
import Navigationbar from '../navigationBar/Navigationbar';

const Role = () => {
    const [activeTab, setActiveTab] = useState('London');
    const [isModalOpen, setModalOpen] = useState(false);
    const [getAllRoles, setGetAllRoles] = useState([]);
    const [getRoleById, setGetRoleById] = useState();
    const [isDataSent, setDataSent] = useState(false);
    const [showCreateRole, setShowCreateRole] = useState(false);
const [formRoleData,setFormRoleData]=useState({
    roleName:"",
    Dashboard:false,
    Merchants:false,
    Orders:false,
    Ticket:false,
    MerchantView:false,
    OrderView:false,
    ticketView:false,
    analytics:false,
    mailBox:false,
    liveChat:false,
    fileManager:false,
    clientDetails:false,
    recipientDetails:false,
    costOfOrder_FullDetails:false,
    costOfOrder_CollectAmount:false,
    orderDetails:false,
    discussionView:false,
    supportTickets:false,
    basicInformation:false,
    personalInformation:false,
    brandInformation:false,
    paymentInformation:false,
    orderList:false,
    merchant_approval:false,
    merchant_Info_Edit:false,
    edit_Order:false,
    payment_Status:false,
    orderStatus:false,
    discussion:false,
    ticketCreateAndResponse:false,
    fileUpload_download:false,

   

})

const [isButtonDisabled, setButtonDisabled] = useState(true);
console.log("showCreateRole",showCreateRole);
// Effect to update the disabled status of the button whenever formRoleData changes
useEffect(() => {
  fetchAllRoles()
  const roleNameSelected = formRoleData.roleName !== "";
  const atLeastOneToggleSelected = Object.values(formRoleData).some(
    (value) => value === true
  );

  setButtonDisabled(!(roleNameSelected && atLeastOneToggleSelected));
}, [formRoleData]);

const handleSubmit = () => {
  // Show the modal when the "Create Role" button is clicked
  setModalOpen(true);
};
const handleModalClose = () => {
  // Close the modal when the "Cancel" button is clicked
  setModalOpen(false);
};
    const clickCreateRole=(e)=>{
        e.preventDefault()
        console.log("click create role");
       setShowCreateRole(true)
       setGetRoleById("")
    } 
    const clickDelect=(e)=>{
        e.preventDefault()
        console.log("delete clicked");
    }
console.log("form data",formRoleData);
    const handleInputChange = (event) => {
        const { name, value, checked, type } = event.target;
      
        // If the input is a checkbox, update the state based on 'checked'
        if (type === 'checkbox') {
          setFormRoleData((prevState) => ({
            ...prevState,
            [name]: checked,
          }));
        } else {
          // For text inputs, update the state based on 'value'
          setFormRoleData((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
      };

   
    const openCity = (cityName) => {
       
        setActiveTab(cityName); // Update the active tab in the component state
      };
      const fetchAllRoles= async () => {
        try {
          const response = await axios.get("http://localhost:5000/getAllRole");
          // const response = await axios.get(`https://mserver.printbaz.com/getAllRole`);
 
          setGetAllRoles(response?.data);
       
        } catch (err) {
          console.error(err);
        }
      };
  const handleCreateRole = (e) => {
    e.preventDefault()
    console.log("createROl;e call");
    // Making an HTTP POST request to send formRoleData to the server
    fetch("http://localhost:5000/roleFromAdminPanel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRoleData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log(data);
        fetchAllRoles()
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      })
      .finally(() => {
        // Set the state to indicate data is sent and the modal should close
        setDataSent(true);
      });
  };
  const handleUpdateRole=(itemId)=>{
    console.log("click update button");
    fetch(`http://localhost:5000/updateRole${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRoleData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log(data);
        fetchAllRoles()
       
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      })
      .finally(() => {
        // Set the state to indicate data is sent and the modal should close
        setDataSent(true);
      });
  }
  const handleDeleteItem = (itemId) => {
    console.log("click Delete button ");
    // Filter the items to remove the one with the given itemId
    const updatedItems = getAllRoles.filter((item) => item.id !== itemId);
    setGetAllRoles(updatedItems);
  };

  const handleItemClick = (itemId) => {
    // Perform another activity when clicking the name
    console.log("Clicked item:", itemId);
 
        // Fetch the updated order details
//  fetch(`https://mserver.printbaz.com/getRoleById/${itemId}`)
 fetch(`http://localhost:5000/getRoleById${itemId}`)
.then(res=>res.json())
.then(data => {setGetRoleById(data)})
   
  };
console.log("setGetRoleById",getRoleById);
    return (
        <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n        /* Nav Bar CSS Start */\n\n        .navbar {\n            background: #001846 !important;\n            padding: 0 20px 0 20px;\n        }\n\n        .navbar-brand img {\n            width: 120px;\n        }\n\n        .nav-link {\n            color: #ffffff !important;\n            font-size: 18px;\n            font-weight: 500;\n            text-align: center;\n            text-transform: uppercase;\n            padding: 20px 20px 20px 20px;\n            margin: 0 10px 0 10px;\n        }\n\n        .nav-link:hover {\n            background-color: #ffffff;\n            color: #001846 !important;\n            transition: linear 0.2s;\n        }\n\n        .nav-dropdown-menu {\n            background-color: #001846;\n        }\n\n        .nav-dropdown-item {\n            color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .navbar-toggler {\n            background-color: #ffffff !important;\n        }\n\n        /* Nav Bar CSS End */\n\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        ul,\n        li,\n        a {\n            text-decoration: none;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        .role-section {\n            margin: 50px;\n            padding: 20px;\n        }\n\n        h2,\n        h4 {\n            color: #333;\n            padding-bottom: 10px;\n            font-weight: 700;\n            text-transform: uppercase;\n        }\n\n        .row {\n            display: flex;\n            flex-wrap: wrap;\n            margin: 0 -15px;\n        }\n\n        .col-3,\n        .col-12 {\n            padding: 0 15px;\n            width: 100%;\n        }\n\n        .col-3 {\n            flex: 0 0 25%;\n            max-width: 25%;\n        }\n\n        .user-filter,\n        .user-list-title,\n        .user-list {\n            background: #fff;\n            margin-bottom: 2px;\n            padding: 15px;\n            border-radius: 5px;\n        }\n\n        .user-list {\n            cursor: pointer;\n        }\n\n        .user-list-title h4 {\n            text-transform: uppercase;\n            font-weight: bold;\n        }\n\n        .user-list p {\n            margin-bottom: 10px;\n            color: #000;\n        }\n\n        .user-list:hover {\n            background-color: aliceblue;\n            transition: linear 0.2s;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border: none;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff !important;\n            font-weight: bold;\n        }\n\n        .role-button:hover {\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50 !important;\n            color: #fff !important;\n        }\n\n        .form-control {\n            display: block;\n            width: 100%;\n            padding: 5px;\n            margin-bottom: 10px;\n            border: 1px solid #ccc;\n            border-radius: 5px;\n            font-size: 14px;\n        }\n\n        /* Style the tab */\n        .tab {\n            overflow: hidden;\n            border: 1px solid #ccc;\n            background-color: #f1f1f1;\n        }\n\n        /* Style the buttons inside the tab */\n        .tab button {\n            background-color: inherit;\n            float: left;\n            border: none;\n            outline: none;\n            cursor: pointer;\n            padding: 14px 16px;\n            transition: 0.3s;\n            font-size: 17px;\n        }\n\n        /* Change background color of buttons on hover */\n        .tab button:hover {\n            background-color: #ddd;\n        }\n\n        /* Create an active/current tablink class */\n        .tab button.active {\n            background-color: #ccc;\n        }\n\n        /* Style the tab content */\n        .tabcontent {\n            display: none;\n            padding: 6px 12px;\n            border: 1px solid #ccc;\n            border-top: none;\n        }\n\n        .switch {\n            position: relative;\n            display: inline-block;\n            width: 60px;\n            height: 34px;\n        }\n\n        .switch input {\n            opacity: 0;\n            width: 0;\n            height: 0;\n        }\n\n        .slider {\n            position: absolute;\n            cursor: pointer;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: #ccc;\n            -webkit-transition: .4s;\n            transition: .4s;\n        }\n\n        .slider:before {\n            position: absolute;\n            content: \"\";\n            height: 26px;\n            width: 26px;\n            left: 4px;\n            bottom: 4px;\n            background-color: white;\n            -webkit-transition: .4s;\n            transition: .4s;\n        }\n\n        input:checked+.slider {\n            background-color: #2196F3;\n        }\n\n        input:focus+.slider {\n            box-shadow: 0 0 1px #2196F3;\n        }\n\n        input:checked+.slider:before {\n            -webkit-transform: translateX(26px);\n            -ms-transform: translateX(26px);\n            transform: translateX(26px);\n        }\n\n        /* Rounded sliders */\n        .slider.round {\n            border-radius: 34px;\n        }\n\n        .slider.round:before {\n            border-radius: 50%;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {\n            .col-3 {\n                flex: 0 0 50%;\n                max-width: 50%;\n            }\n        }\n\n        @media screen and (max-width: 768px) {\n            .col-3 {\n                flex: 0 0 100%;\n                max-width: 100%;\n            }\n\n            .nav-link {\n                text-align: left;\n            }\n\n            .nav-link:hover {\n                width: 100%;\n\n            }\n\n            .all-user {\n                margin: 10px;\n            }\n\n        }\n\n    " }} />
        <Navigationbar/>
        <section className="role-section">
          <div className="row">
            <div className="col-lg-12">
              <div className="role-title" style={{marginBottom: '20px'}}>
                <h2>Role Management</h2>
              </div>
            </div>
          </div>
          <div className="row" style={{backgroundColor: 'white', padding: '30px 10px 30px 10px', borderRadius: '5px'}}>
            <div className="col-lg-2">
              <div className="role-list" style={{border: '#d8d8d8 1px solid', height: '1365px'}}>
            <div>
                <h3  className='col-10' style={{display: 'inline-block', textAlign: 'left', marginBottom: '10px', backgroundColor: 'white', color: '#000', fontSize: '20px', fontWeight: 800, padding: '15px 10px', textTransform: 'uppercase'}}>Role List </h3>
                <button className='col-2' style={{textAlign:"center",background:'none',border:"none",fontSize:"20px"}} onClick={clickCreateRole}>+</button>
                </div>
               <hr className='mt-0'/>
               {
                 getAllRoles?.map((role,index)=>
                 <p key={index}  className="role-button" onClick={() => handleItemClick(role._id)} style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                 <span >
                   {role?.roleName}
                 </span>
                 <button onClick={() => handleDeleteItem(role._id)} style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
               </p>
               
                 )
               }
             
              </div>
            </div>
            <div className="col-lg-8">
              <div className="TabForViewOrder">
              <button
        className={`tab ${activeTab === 'London' ? 'active' : ''}`}
        onClick={() => openCity('London')}
      >
       Display
      </button>
      <button
        className={`tab ${activeTab === 'Paris' ? 'active' : ''}`}
        onClick={() => openCity('Paris')}
      >
       Permissions
      </button>
              </div>

              <div id="London" className={`tab-content ${activeTab === 'London' ? 'active' : ''}`}>
            {
              getRoleById ?
              <form  onSubmit={()=>handleUpdateRole(getRoleById?._id)}>
                
              <label htmlFor="fname" style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Role Name
<input onChange={handleInputChange} type="text" id="fname" name="roleName" value={getRoleById.roleName} placeholder="Role Name..." style={{border: '#e0e0e0 1px solid', padding: '10px', width: '100%'}} />
</label>

                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Dashboard
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="Dashboard"  checked={getRoleById.Dashboard} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Merchants
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="Merchants"  checked={getRoleById.Merchants} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Orders
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="Orders"  checked={getRoleById.Orders} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Analytics
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="analytics"  checked={getRoleById.analytics} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Mail box
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="mailBox"  checked={getRoleById.mailBox} onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Live chat
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="liveChat"  checked={getRoleById.liveChat} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Ticket
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="Ticket"  checked={getRoleById.Ticket} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>File Manager
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="fileManager"  checked={getRoleById.fileManager} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Merchant View
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="MerchantView"  checked={getRoleById.MerchantView} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order View
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="OrderView"  checked={getRoleById.OrderView}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
              
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Ticket View
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="ticketView"  checked={getRoleById.ticketView}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Client Details
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="clientDetails"  checked={getRoleById.clientDetails}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Recipient Details
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="recipientDetails"  checked={getRoleById.recipientDetails}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Cost of Order (Full Details)
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="costOfOrder_FullDetails"  checked={getRoleById.costOfOrder_FullDetails}  onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Cost of order (Collect Amount)
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="costOfOrder_CollectAmount"  checked={getRoleById.costOfOrder_CollectAmount}  onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order Details
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="orderDetails"  checked={getRoleById.orderDetails}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Discussion View
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="discussionView"  checked={getRoleById.discussionView}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Support Tickets
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="supportTickets"  checked={getRoleById.supportTickets}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', borderBottom: '2px solid #d8d8d8', marginBottom: '10px', fontSize: '18px', paddingBottom: '20px'}}>File manager(view order)
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="fileManager"  checked={getRoleById.fileManager_viewOrder}  onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Basic Information
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="basicInformation"  checked={getRoleById.basicInformation}  onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Personal Information
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="personalInformation"  checked={getRoleById.personalInformation}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Brand Information
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="brandInformation"  checked={getRoleById.brandInformation}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Payment Information
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="paymentInformation"  checked={getRoleById.paymentInformation}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order list
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="orderList"  checked={getRoleById.orderList}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
              </form>
              :
              
                showCreateRole ?
                <form  onSubmit={handleCreateRole}>
                  
                <label htmlFor="fname" style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Role Name
  <input onChange={handleInputChange} type="text" id="fname" name="roleName" value={formRoleData.roleName} placeholder="Role Name..." style={{border: '#e0e0e0 1px solid', padding: '10px', width: '100%'}} />
  </label>
  
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Dashboard
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="Dashboard"  checked={formRoleData.Dashboard} onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Merchants
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="Merchants"  checked={formRoleData.Merchants} onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Orders
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="Orders"  checked={formRoleData.Orders} onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Analytics
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="analytics"  checked={formRoleData.analytics} onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Mail box
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="mailBox"  checked={formRoleData.mailBox} onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Live chat
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="liveChat"  checked={formRoleData.liveChat} onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Ticket
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="Ticket"  checked={formRoleData.Ticket} onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>File Manager
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="fileManager"  checked={formRoleData.fileManager} onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Merchant View
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="MerchantView"  checked={formRoleData.MerchantView} onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order View
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="OrderView"  checked={formRoleData.OrderView}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Ticket View
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="ticketView"  checked={formRoleData.ticketView}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Client Details
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="clientDetails"  checked={formRoleData.clientDetails}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Recipient Details
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="recipientDetails"  checked={formRoleData.recipientDetails}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Cost of Order (Full Details)
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="costOfOrder_FullDetails"  checked={formRoleData.costOfOrder_FullDetails}  onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Cost of order (Collect Amount)
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="costOfOrder_CollectAmount"  checked={formRoleData.costOfOrder_CollectAmount}  onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order Details
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="orderDetails"  checked={formRoleData.orderDetails}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Discussion View
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="discussionView"  checked={formRoleData.discussionView}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Support Tickets
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="supportTickets"  checked={formRoleData.supportTickets}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', borderBottom: '2px solid #d8d8d8', marginBottom: '10px', fontSize: '18px', paddingBottom: '20px'}}>File manager(view order)
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="fileManager"  checked={formRoleData.fileManager_viewOrder}  onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Basic Information
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox" name="basicInformation"  checked={formRoleData.basicInformation}  onChange={(e) => handleInputChange(e)} />
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Personal Information
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="personalInformation"  checked={formRoleData.personalInformation}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Brand Information
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="brandInformation"  checked={formRoleData.brandInformation}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Payment Information
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="paymentInformation"  checked={formRoleData.paymentInformation}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order list
                    <div className="switch" style={{float: 'right'}}>
                      <input type="checkbox"  name="orderList"  checked={formRoleData.orderList}  onChange={(e) => handleInputChange(e)}/>
                      <span className="slider round" />
                    </div>
                  </label>
                </form>
            
              :
              <form  onSubmit={handleCreateRole}>
                  
              <label htmlFor="fname" style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Role Name
<input onChange={handleInputChange} type="text" id="fname" name="roleName" value={formRoleData.roleName} placeholder="Role Name..." style={{border: '#e0e0e0 1px solid', padding: '10px', width: '100%'}} />
</label>

                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Dashboard
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="Dashboard"  checked={formRoleData.Dashboard} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Merchants
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="Merchants"  checked={formRoleData.Merchants} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Orders
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="Orders"  checked={formRoleData.Orders} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Analytics
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="analytics"  checked={formRoleData.analytics} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Mail box
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="mailBox"  checked={formRoleData.mailBox} onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Live chat
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="liveChat"  checked={formRoleData.liveChat} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Ticket
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="Ticket"  checked={formRoleData.Ticket} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>File Manager
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="fileManager"  checked={formRoleData.fileManager} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Merchant View
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="MerchantView"  checked={formRoleData.MerchantView} onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order View
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="OrderView"  checked={formRoleData.OrderView}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
              
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Ticket View
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="ticketView"  checked={formRoleData.ticketView}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>  <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Client Details
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="clientDetails"  checked={formRoleData.clientDetails}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Recipient Details
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="recipientDetails"  checked={formRoleData.recipientDetails}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Cost of Order (Full Details)
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="costOfOrder_FullDetails"  checked={formRoleData.costOfOrder_FullDetails}  onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Cost of order (Collect Amount)
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="costOfOrder_CollectAmount"  checked={formRoleData.costOfOrder_CollectAmount}  onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order Details
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="orderDetails"  checked={formRoleData.orderDetails}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Discussion View
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="discussionView"  checked={formRoleData.discussionView}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Support Tickets
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="supportTickets"  checked={formRoleData.supportTickets}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', borderBottom: '2px solid #d8d8d8', marginBottom: '10px', fontSize: '18px', paddingBottom: '20px'}}>File manager(view order)
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="fileManager"  checked={formRoleData.fileManager_viewOrder}  onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Basic Information
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox" name="basicInformation"  checked={formRoleData.basicInformation}  onChange={(e) => handleInputChange(e)} />
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Personal Information
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="personalInformation"  checked={formRoleData.personalInformation}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Brand Information
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="brandInformation"  checked={formRoleData.brandInformation}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Payment Information
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="paymentInformation"  checked={formRoleData.paymentInformation}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
                <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order list
                  <div className="switch" style={{float: 'right'}}>
                    <input type="checkbox"  name="orderList"  checked={formRoleData.orderList}  onChange={(e) => handleInputChange(e)}/>
                    <span className="slider round" />
                  </div>
                </label>
              </form>

            }
            
             
           
              </div>
              <div id="Paris" className={`tab-content ${activeTab === 'Paris' ? 'active' : ''}`}>
               {
                 getRoleById ?
                 <form onSubmit={handleCreateRole}>
                 <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Merchant Request Approval/Ban
                   <div className="switch" style={{float: 'right'}}>
                     <input type="checkbox" name="merchant_approval"  checked={getRoleById.merchant_approval} onChange={(e) => handleInputChange(e)} />
                     <span className="slider round" />
                   </div>
                 </label>
                 <label style={{display: 'block', borderBottom: '2px solid #d8d8d8', marginBottom: '10px', fontSize: '18px', paddingBottom: '20px'}}>Merchant Info Edit
                   <div className="switch" style={{float: 'right'}}>
                     <input type="checkbox" name="merchant_Info_Edit"  checked={getRoleById.merchant_Info_Edit} onChange={(e) => handleInputChange(e)} />
                     <span className="slider round" />
                   </div>
                 </label>
                 <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Edit Order
                   <div className="switch" style={{float: 'right'}}>
                     <input type="checkbox" name="edit_Order"  checked={getRoleById.edit_Order} onChange={(e) => handleInputChange(e)} />
                     <span className="slider round" />
                   </div>
                 </label>
                 <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Payment Status
                   <div className="switch" style={{float: 'right'}}>
                     <input type="checkbox" name="payment_Status"  checked={getRoleById.payment_Status} onChange={(e) => handleInputChange(e)} />
                     <span className="slider round" />
                   </div>
                 </label>
                 <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order status
                   <div className="switch" style={{float: 'right'}}>
                     <input type="checkbox" name="orderStatus"  checked={getRoleById.orderStatus} onChange={(e) => handleInputChange(e)} />
                     <span className="slider round" />
                   </div>
                 </label>
                 <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Discussion
                   <div className="switch" style={{float: 'right'}}>
                     <input type="checkbox" name="discussion"  checked={getRoleById.discussion} onChange={(e) => handleInputChange(e)} />
                     <span className="slider round" />
                   </div>
                 </label>
                 <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Ticket Create And Response
                   <div className="switch" style={{float: 'right'}}>
                     <input type="checkbox" name="ticketCreateAndResponse"  checked={getRoleById.ticketCreateAndResponse} onChange={(e) => handleInputChange(e)} />
                     <span className="slider round" />
                   </div>
                 </label>
                 <label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>File upload/download
                   <div className="switch" style={{float: 'right'}}>
                     <input type="checkbox" name="fileUpload_download"  checked={getRoleById.fileUpload_download} onChange={(e) => handleInputChange(e)} />
                     <span className="slider round" />
                   </div>
                 </label>
                
               </form>
:
<form onSubmit={handleCreateRole}>
<label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Merchant Request Approval/Ban
  <div className="switch" style={{float: 'right'}}>
    <input type="checkbox" name="merchant_approval"  checked={formRoleData.merchant_approval} onChange={(e) => handleInputChange(e)} />
    <span className="slider round" />
  </div>
</label>
<label style={{display: 'block', borderBottom: '2px solid #d8d8d8', marginBottom: '10px', fontSize: '18px', paddingBottom: '20px'}}>Merchant Info Edit
  <div className="switch" style={{float: 'right'}}>
    <input type="checkbox" name="merchant_Info_Edit"  checked={formRoleData.merchant_Info_Edit} onChange={(e) => handleInputChange(e)} />
    <span className="slider round" />
  </div>
</label>
<label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Edit Order
  <div className="switch" style={{float: 'right'}}>
    <input type="checkbox" name="edit_Order"  checked={formRoleData.edit_Order} onChange={(e) => handleInputChange(e)} />
    <span className="slider round" />
  </div>
</label>
<label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Payment Status
  <div className="switch" style={{float: 'right'}}>
    <input type="checkbox" name="payment_Status"  checked={formRoleData.payment_Status} onChange={(e) => handleInputChange(e)} />
    <span className="slider round" />
  </div>
</label>
<label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Order status
  <div className="switch" style={{float: 'right'}}>
    <input type="checkbox" name="orderStatus"  checked={formRoleData.orderStatus} onChange={(e) => handleInputChange(e)} />
    <span className="slider round" />
  </div>
</label>
<label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Discussion
  <div className="switch" style={{float: 'right'}}>
    <input type="checkbox" name="discussion"  checked={formRoleData.discussion} onChange={(e) => handleInputChange(e)} />
    <span className="slider round" />
  </div>
</label>
<label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>Ticket Create And Response
  <div className="switch" style={{float: 'right'}}>
    <input type="checkbox" name="ticketCreateAndResponse"  checked={formRoleData.ticketCreateAndResponse} onChange={(e) => handleInputChange(e)} />
    <span className="slider round" />
  </div>
</label>
<label style={{display: 'block', fontSize: '18px', marginBottom: '20px'}}>File upload/download
  <div className="switch" style={{float: 'right'}}>
    <input type="checkbox" name="fileUpload_download"  checked={formRoleData.fileUpload_download} onChange={(e) => handleInputChange(e)} />
    <span className="slider round" />
  </div>
</label>

</form>
               }
               
{
  getRoleById ?
<>
<button className="status-btn" style={{ padding: '10px 20px 10px 20px' }}   disabled={isButtonDisabled } onClick={handleSubmit}>Update Role</button>
  <ConfirmRole isOpen={!isDataSent && isModalOpen} onClose={handleModalClose} onConfirm={handleCreateRole} />

</>
 
  :
<>
<button className="status-btn" style={{ padding: '10px 20px 10px 20px' }}   disabled={isButtonDisabled } onClick={handleSubmit}>Create Role</button>
  <ConfirmRole isOpen={!isDataSent && isModalOpen} onClose={handleModalClose} onConfirm={handleCreateRole} />

</>
}
       
              </div>
            </div>
            <div className="col-lg-2">
              <div className="role-list" style={{border: '#d8d8d8 1px solid', height: '1365px'}}>
                
                <div>
                <h3  className='col-10' style={{display: 'inline-block', textAlign: 'left', marginBottom: '10px', backgroundColor: 'white', color: '#000', fontSize: '20px', fontWeight: 800, padding: '15px 10px', textTransform: 'uppercase'}}>Member List </h3>
                <button className='col-1' style={{textAlign:"right",background:'none',border:"none",fontSize:"20px"}}>+</button>
                </div>
                <hr className='mt-0' />
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Abir Ali Khan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Fariha Hasan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Shuvro Haque
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Tashfin Rahaman
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Abir Ali Khan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Fariha Hasan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Shuvro Haque
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Tashfin Rahaman
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Abir Ali Khan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Fariha Hasan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Shuvro Haque
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Tashfin Rahaman
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Abir Ali Khan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Fariha Hasan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Shuvro Haque
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Tashfin Rahaman
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Abir Ali Khan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Fariha Hasan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Shuvro Haque
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Tashfin Rahaman
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Abir Ali Khan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Fariha Hasan
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Shuvro Haque
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
                <p className="role-button" style={{display: 'block', width: '100%', textAlign: 'left', marginBottom: '10px', borderRadius: 0, border: 'none', backgroundColor: 'white', color: '#000', fontSize: '18px', fontWeight: 500, padding: '5px 10px'}}>
                  <span>
                    Tashfin Rahaman
                  </span>
                  <button style={{float: 'right', background: 'transparent', border: 'none', color: 'red', fontSize: '16px'}}><i className="fa fa-trash" aria-hidden="true" /></button>
                </p>
              </div>
            </div>
          </div>
        </section>
      
      </div>
    );
};

export default Role;



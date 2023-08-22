import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authProvider/AuthProvider';
import { useRoleAsignData } from '../../hooks/useRoleAsignData';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

const Navigationbar = () => {
    const {adminUser,loading,loginAdminUser,currentUser}=useContext(AuthContext);
    // console.log("adminUser",adminUser);
    const[fetchAllTicket,setFetchAllTicket]=useState([])
    const {value_count}=useRoleAsignData()
    let getAdminEmail=fetchAllTicket?.filter(ticket=>ticket.uniqueAdminEmails?.includes(adminUser?.email)|| ticket?.ticketStatus==="pending(created by client)")
    console.log("getAdminEmail navigation bar",getAdminEmail);

    useEffect(()=>{
      fetchTickets();
              // Fetch the chat log every 10 seconds
              const intervalId = setInterval(fetchTickets, 10000);

              // Clean up the interval on unmount
              return () => clearInterval(intervalId);
    },[])
    const fetchTickets = async () => {
      try {
          // const response = await axios.get(`http://localhost:5000/allTicket`);
        const response = await axios.get(`https://mserver.printbaz.com/allTicket`);
        setFetchAllTicket(response?.data);
     
      } catch (err) {
        console.error(err);
      }
    };
    let msgCount=0;
   
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" integrity="sha512-vKMx8UnXk60zUwyUnUPM3HbQo8QfmNx7+ltw8Pm5zLusl1XIfwcxo8DbWCqMGKaWeNxWA8yrx5v3SaVpMvR3CA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n        \n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n\n}\n\n.dashboard-container {\n    margin: 50px;\n    display: block;\n    -webkit-transition: all .2s ease-in-out;\n    -moz-transition: all .2s ease-in-out;\n    -o-transition: all .2s ease-in-out;\n    transition: all .2s ease-in-out\n}\n\n.card {\n    border: 0;\n    box-shadow: 0 3px 10px rgba(62, 85, 120, .045);\n    margin-bottom: 25px;\n    border-radius: 4px\n}\n\n.card .card-body {\n    padding: 25px\n}\n\n.card .card-body .card-title {\n    font-size: 14px;\n    margin-bottom: 20px;\n    color: #000\n}\n\n.card-img-top {\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px\n}\n\n.card-header {\n    padding: 10px 15px;\n    margin-bottom: 0;\n    background-color: #f2f2f2;\n    border-bottom: 1px solid #e6e6e6;\n    border-top-left-radius: 4px !important;\n    border-top-right-radius: 4px !important\n}\n\n.card-header-pills {\n    margin-right: 0;\n    margin-left: 0\n}\n\n.card-header-tabs {\n    margin-right: 0;\n    margin-bottom: -10px;\n    margin-left: 0;\n    border-bottom: 0\n}\n\n.card-footer {\n    padding: 10px 15px;\n    background-color: #f2f2f2;\n    border-top: 1px solid #e6e6e6\n}\n\n.card.text-white .card-title {\n    color: #fff\n}\n\n.card.card-transparent {\n    background: 0 0 !important;\n    box-shadow: none\n}\n\n.client-list {\n    cursor: pointer;\n    padding-top: 20px;\n}\n\n.client-list-title h4 {\n    text-transform: uppercase;\n    font-weight: bold;\n}\n\n.client-list p {\n    margin-bottom: 10px;\n}\n\n.client-list:hover {\n    background-color: aliceblue;\n    border-radius: 15px;\n    transition: linear 0.2s;\n}\n\n\n.p-status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #00aeff;\n    color: #fff;\n    font-weight: bold;\n    cursor: pointer;\n\n}\n\n\n.status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #4caf50;\n    color: #fff;\n    font-weight: bold;\n    cursor: pointer;\n}\n    " }} />
     
        {
        //  super admin role visibility 
        adminUser?.email==="shuvro.printbaz@gmail.com" ?
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            <img src="https://media.discordapp.net/attachments/1069579536842379305/1097040318043537449/Logo-02.png?width=1440&height=392" alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>

              </li> 
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/allMerchants">Merchants</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/orderList">Orders</Link>
              </li>
            
              <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Analytics
                  </a>
                  <ul className="dropdown-menu nav-dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item nav-dropdown-item" href="#">Merchants</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="#">Order</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="#">Transaction</a></li>
                  </ul>
                </li>
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/mailBox">Mail Box</Link>
              </li>
              <li className="nav-item">
            
                <Link className="nav-link active" aria-current="page" to="/liveChat">Live Chat</Link>
             
              </li>
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/ticket">Ticket</Link>
              {
   getAdminEmail?.forEach(readMsg => {
    //  <p>{readMsg?.ticketStatus} fgfdg</p>
    if(readMsg?.ticketStatus === "pending"){
  
      msgCount++
   }  if(readMsg?.ticketStatus === "pending(created by client)"){
  
      msgCount++
   }

  })
   }

   {
     msgCount>0 &&
     <>
         <span className='notification-badge'  >{msgCount}</span>
        
     </>
 
   }
              </li>
              <li className="nav-item">
                <p>{msgCount}</p>
                <Link className="nav-link active" aria-current="page" to="/filemanager">File Manager</Link>
        
              </li> 
               <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/deliverySystem">Delivery System</Link>
        
              </li> 
               <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/invitaionPage">Send Invitation</Link>
        
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/role">Role</Link>
        
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Log in</Link>
        
              </li>  
          
            </ul>
            <p style={{color:"white",marginTop:"13px"}}>{adminUser?.email}</p>
          </div>
        </div>
      </nav>
      :
    
      ///others role visibility
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
          <img src="https://media.discordapp.net/attachments/1069579536842379305/1097040318043537449/Logo-02.png?width=1440&height=392" alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
           
                    <>
   {
       value_count?.Dashboard && 
       <li className="nav-item" key={`${value_count?._id}-dashboard`}>
       <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>

     </li> 
   } 


{
    value_count?.Merchants && 
<li className="nav-item"  key={`${value_count?._id}-merchants`}>
                   <Link className="nav-link active" aria-current="page" to="/allMerchants">Merchants</Link>
                   </li>
}
                  
                {
                    value_count?.Orders && 
                    <li className="nav-item" key={`${value_count?._id}-orders`}>
                    <Link className="nav-link active" aria-current="page" to="/orderList">Orders</Link>
                    </li>
                }   
                  
                 {
                    value_count?.analytics && 
                    <li className="nav-item dropdown" key={`${value_count?._id}-analytics`}>
                   <Link className="nav-link active" aria-current="page" to="/analytics">Analytics</Link>
                  
                  </li>
                 }
                 { value_count?.mailBox && 
 <li className="nav-item" key={`${value_count?._id}-mailBox`}>
 <Link className="nav-link active" aria-current="page" to="/mailBox">Mail Box</Link>
 </li>
                 }
                  
                  {
                     value_count?.liveChat && 
                     <li className="nav-item" key={`${value_count?._id}-liveChat`}>
                 
                     <Link className="nav-link active" aria-current="page" to="/liveChat">Live Chat</Link>
                  
                   </li>
                  }
                   
                   {
                        value_count?.Ticket && 
  <li className="nav-item" key={`${value_count?._id}-Ticket`}>
  <Link className="nav-link active" aria-current="page" to="/ticket">Ticket</Link>
  {
   getAdminEmail?.forEach(readMsg => {
    //  <p>{readMsg?.ticketStatus} fgfdg</p>
    if(readMsg?.ticketStatus === "pending"){
  
      msgCount++
   }  if(readMsg?.ticketStatus === "pending(created by client)"){
  
      msgCount++
   }

  })
   }

   {
     msgCount>0 &&
     <>
         <span className='notification-badge'  >{msgCount}</span>
        
     </>
 
   }
  </li>
                   }
                 {
                          value_count?.fileManager && 
                          <li className="nav-item" key={`${value_count?._id}-fileManager`}>
                          <Link className="nav-link active" aria-current="page" to="/filemanager">File Manager</Link>
                  
                        </li>
                 } 
                 {value_count?.deliverySystem && 
                          <li className="nav-item" key={`${value_count?._id}-deliverySystem`}>
                          <Link className="nav-link active" aria-current="page" to="/deliverySystem">Delivery Syatem</Link>
                  
                        </li>
                 }
                  
                    <li className="nav-item">
                     <Link className="nav-link active" aria-current="page" to="/invitaionPage">Send Invitation</Link>
             
                   </li>
                   <li className="nav-item">
                     <Link className="nav-link active" aria-current="page" to="/role">Role</Link>
             
                   </li>
                   <li className="nav-item">
                     <Link className="nav-link active" aria-current="page" to="/login">Log in</Link>
             
                   </li> 
                    </>
            
         
            
        
          </ul>
          <p style={{color:"white",marginTop:"13px"}}>{adminUser?.email}</p>
        </div>
      </div>
    </nav>
       }
   

       
        </div>
    );
};

export default Navigationbar;